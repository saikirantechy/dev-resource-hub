import { parseGitHubPR } from "@/lib/pr-assistant";
import type { AnalysisResult } from "@/lib/pr-assistant";

const GITHUB_API = "https://api.github.com";

export interface GHFile {
  filename: string;
  status: "added" | "modified" | "removed" | "renamed" | "copied" | "changed";
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch?: string;
}

export interface GHCommit {
  sha: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
}

export interface GHPR {
  number: number;
  title: string;
  body: string;
  state: string;
  html_url: string;
  merge_commit_sha: string | null;
  head: { ref: string; sha: string };
  base: { ref: string; sha: string };
  user: { login: string; avatar_url: string };
  created_at: string;
  updated_at: string;
  merged: boolean;
  comments: number;
  review_comments: number;
  commits: number;
  additions: number;
  deletions: number;
  changed_files: number;
  labels: { name: string; color: string }[];
}

interface GHLanguage {
  [language: string]: number;
}

interface GHLicense {
  key: string;
  name: string;
}

interface GHRepo {
  language: string | null;
  languages_url: string;
  topics: string[];
  license: GHLicense | null;
}

function makeHeaders(token?: string): HeadersInit {
  const headers: Record<string, string> = { Accept: "application/vnd.github.v3+json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

async function ghFetch<T>(url: string, token?: string): Promise<T> {
  const res = await fetch(url, { headers: makeHeaders(token) });
  if (res.status === 403) {
    const reset = res.headers.get("X-RateLimit-Reset");
    const remaining = res.headers.get("X-RateLimit-Remaining");
    if (remaining === "0") {
      const resetDate = reset ? new Date(parseInt(reset) * 1000).toLocaleTimeString() : "soon";
      throw new Error(
        `GitHub API rate limit reached. Resets at ${resetDate}. Add a GitHub token for higher limits.`,
      );
    }
    throw new Error("GitHub API error 403: Forbidden. Check your token permissions.");
  }
  if (res.status === 404) throw new Error("PR not found. Check the URL and try again.");
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function fetchPRDetails(
  owner: string, repo: string, prNumber: string, token?: string,
): Promise<GHPR> {
  return ghFetch<GHPR>(`${GITHUB_API}/repos/${owner}/${repo}/pulls/${prNumber}`, token);
}

export async function fetchPRFiles(
  owner: string, repo: string, prNumber: string, token?: string,
): Promise<GHFile[]> {
  return ghFetch<GHFile[]>(
    `${GITHUB_API}/repos/${owner}/${repo}/pulls/${prNumber}/files?per_page=100`, token,
  );
}

export async function fetchPRCommits(
  owner: string, repo: string, prNumber: string, token?: string,
): Promise<GHCommit[]> {
  return ghFetch<GHCommit[]>(
    `${GITHUB_API}/repos/${owner}/${repo}/pulls/${prNumber}/commits?per_page=30`, token,
  );
}

export async function fetchRepoLanguages(
  owner: string, repo: string, token?: string,
): Promise<GHLanguage> {
  return ghFetch<GHLanguage>(`${GITHUB_API}/repos/${owner}/${repo}/languages`, token);
}

export async function fetchRepoDetails(
  owner: string, repo: string, token?: string,
): Promise<GHRepo> {
  return ghFetch<GHRepo>(`${GITHUB_API}/repos/${owner}/${repo}`, token);
}

export interface RealPRData {
  pr: GHPR;
  files: GHFile[];
  commits: GHCommit[];
  languages: string[];
  topics: string[];
}

export async function fetchRealPRData(
  prUrl: string, token?: string,
): Promise<RealPRData> {
  const parsed = parseGitHubPR(prUrl);
  if (!parsed.isValid) throw new Error("Invalid GitHub PR URL");

  const { repoName, prNumber } = parsed;
  const [owner, repo] = repoName.split("/");

  const [pr, files, commits, languages, repoDetails] = await Promise.all([
    fetchPRDetails(owner, repo, prNumber, token),
    fetchPRFiles(owner, repo, prNumber, token),
    fetchPRCommits(owner, repo, prNumber, token),
    fetchRepoLanguages(owner, repo, token),
    fetchRepoDetails(owner, repo, token),
  ]);

  const sortedLangs = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([lang]) => lang);

  return {
    pr,
    files,
    commits,
    languages: sortedLangs,
    topics: repoDetails.topics || [],
  };
}

export function generateAnalysisFromRealData(data: RealPRData, repoName: string): AnalysisResult {
  const { pr, files, commits, languages, topics } = data;

  const totalAdded = files.reduce((s, f) => s + f.additions, 0);
  const totalDeleted = files.reduce((s, f) => s + f.deletions, 0);

  const hasTests = files.some(
    (f) => f.filename.includes("test") || f.filename.includes("spec") || f.filename.includes("__tests__"),
  );
  const hasDocs = files.some(
    (f) => f.filename.startsWith("docs/") || f.filename.includes("README") || f.filename.includes("CHANGELOG"),
  );
  const hasConfig = files.some(
    (f) => f.filename.includes("config") || f.filename.includes(".json") || f.filename.includes(".yaml") || f.filename.includes(".yml"),
  );
  const hasSecurityFiles = files.some(
    (f) =>
      f.filename.includes("auth") || f.filename.includes("security") ||
      f.filename.includes("password") || f.filename.includes("credential"),
  );

  const riskLevel: "low" | "medium" | "high" =
    totalDeleted > 500 || totalAdded > 1000 ? "high" :
    totalDeleted > 100 || totalAdded > 200 ? "medium" : "low";

  const statusMap: Record<string, "added" | "modified" | "deleted"> = {
    added: "added", modified: "modified", removed: "deleted",
    renamed: "modified", copied: "added", changed: "modified",
  };

  const topDirs = new Set(files.map((f) => f.filename.split("/")[0]));
  const extSet = new Set(files.map((f) => f.filename.split(".").pop() || ""));

  const summary = [
    `## ${pr.title}`,
    pr.body ? `${pr.body.slice(0, 500)}${pr.body.length > 500 ? "..." : ""}` : "",
    "",
    `**State:** ${pr.state} | **Branch:** ${pr.head.ref} \u2192 ${pr.base.ref}`,
    `**Author:** ${pr.user.login} | **Created:** ${new Date(pr.created_at).toLocaleDateString()}`,
    `**${files.length} files changed** — ${totalAdded} additions, ${totalDeleted} deletions`,
    `**${commits.length} commits** — ${hasTests ? "\u2705 Tests included" : "\u26a0\ufe0f No tests detected"}`,
    hasDocs ? "\u2705 Documentation updated" : "",
    `**Labels:** ${pr.labels.map((l) => l.name).join(", ") || "None"}`,
  ]
    .filter(Boolean)
    .join("\n");

  const testFileCount = files.filter(
    (f) => f.filename.includes("test") || f.filename.includes("spec") || f.filename.includes("__tests__"),
  ).length;

  return {
    summary,
    changes: files.map((f) => ({
      file: f.filename,
      status: statusMap[f.status] || "modified",
      lines: f.changes,
    })),
    codeReview: [
      hasTests
        ? { category: "Testing", severity: "info" as const, message: `${testFileCount} test files modified. Review test coverage for edge cases.`, suggestion: "Ensure tests cover success paths, error states, and edge cases." }
        : { category: "Testing", severity: "warning" as const, message: "No test files detected in this PR. Consider adding tests for the changes.", suggestion: "Add unit tests for new functions and integration tests for API changes." },
      { category: "Code Quality", severity: "info" as const, message: `${files.length} files changed. ${totalAdded} lines added, ${totalDeleted} lines removed.`, suggestion: "Break large files into smaller focused modules when possible." },
      { category: "File Patterns", severity: "info" as const, message: `Modified ${pr.changed_files} files across ${topDirs.size} directories.`, suggestion: `Review directory structure — files span ${topDirs.size} top-level directories.` },
      hasConfig
        ? { category: "Configuration", severity: "info" as const, message: "Configuration files were modified. Verify settings are correct.", suggestion: "Double-check configuration values, especially in production environments." }
        : { category: "Configuration", severity: "info" as const, message: "No configuration files changed in this PR.", suggestion: "Ensure any new features have appropriate configuration options." },
      { category: "Dependencies", severity: "info" as const, message: `${commits.length} commits in this PR. Review commit messages for dependency changes.`, suggestion: "Check for any dependency updates or additions in the changed files." },
    ],
    security: [
      hasSecurityFiles
        ? { severity: "high" as const, issue: "Security-related files modified", impact: "Auth, credentials, or security files were changed. Each change must be reviewed carefully.", recommendation: "Conduct a thorough security review of all changes in security-related files." }
        : { severity: "low" as const, issue: "No immediate security concerns detected", impact: "No security-critical files were modified in this PR.", recommendation: "Standard review practices apply." },
      { severity: "medium" as const, issue: "Input handling in changed files", impact: `Files handling user input should use proper validation. Review ${files.slice(0, 3).map((f) => f.filename.split("/").pop()).join(", ")}${files.length > 3 ? "..." : ""} for input validation.`, recommendation: "Ensure all user inputs are validated and sanitized." },
      { severity: "low" as const, issue: "Dependency review", impact: `PR touches ${extSet.size} file types. Check for any new dependencies.`, recommendation: "Review any new dependencies for known vulnerabilities." },
      { severity: "low" as const, issue: "Error handling patterns", impact: `Review error handling in ${pr.changed_files} changed files to ensure graceful degradation.`, recommendation: "Verify try-catch blocks and error boundaries are in place." },
    ],
    docs: [
      { section: "PR Description", status: pr.body ? "good" as const : "needs-improvement" as const, details: pr.body ? `Title: "${pr.title}". Body length: ${pr.body.length} chars.` : "PR body is empty — add a description of the changes." },
      { section: "Commit Messages", status: commits.length > 0 ? "good" as const : "needs-improvement" as const, details: `${commits.length} commits with messages.${commits.length > 1 ? " Review for clarity." : ""}` },
      { section: "README / Docs", status: hasDocs ? "good" as const : "missing" as const, details: hasDocs ? "Documentation files were updated in this PR." : "No documentation files were modified. Consider updating docs for any new features." },
      { section: "Migration Notes", status: totalDeleted > 50 ? "needs-improvement" as const : "good" as const, details: totalDeleted > 50 ? `${totalDeleted} lines removed — if this includes breaking changes, a migration guide is needed.` : "No significant deletions that would require migration." },
      { section: "CHANGELOG", status: "needs-improvement" as const, details: "No CHANGELOG entry detected. Consider adding release notes for the changes." },
    ],
    improvements: [
      {
        area: "Test Coverage", priority: hasTests ? "low" as const : "high" as const,
        suggestion: hasTests ? "Tests are present. Consider adding edge case coverage." : "Add tests for the changes in this PR to prevent regressions.",
        effort: hasTests ? "1-2 hours" : "2-4 hours",
      },
      {
        area: "Documentation", priority: hasDocs ? "low" as const : "medium" as const,
        suggestion: hasDocs ? "Documentation updated. Ensure API changes are documented clearly." : "Update documentation to reflect the changes in this PR.",
        effort: "1-2 hours",
      },
      {
        area: "Code Organization", priority: "medium" as const,
        suggestion: `PR spans ${topDirs.size} top-level directories. Consider if changes can be better scoped.`,
        effort: "2-3 hours",
      },
      {
        area: "Performance", priority: totalAdded > 300 ? "medium" as const : "low" as const,
        suggestion: totalAdded > 300 ? `${totalAdded} lines added — review for performance impact, especially in hot paths.` : "No significant performance concerns based on change size.",
        effort: "1-3 hours",
      },
      {
        area: "Monitoring", priority: "medium" as const,
        suggestion: "Ensure new features include proper logging and monitoring for production observability.",
        effort: "1-2 hours",
      },
    ],
    stats: {
      totalFiles: pr.changed_files,
      linesAdded: totalAdded,
      linesRemoved: totalDeleted,
      commentsCount: pr.comments + pr.review_comments,
      riskLevel,
      estimatedReviewTime: `${Math.max(10, Math.min(60, Math.round(files.length * 1.5 + commits.length)))} minutes`,
    },
    techStack: [...new Set([...pr.labels.map((l) => l.name), ...languages, ...topics])].slice(0, 6),
  };
}
