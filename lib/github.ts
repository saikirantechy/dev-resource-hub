// ─── Types ────────────────────────────────────────────────────────────────

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  state: string;
  labels: { name: string; color: string }[];
  body: string;
  created_at: string;
  updated_at: string;
  comments: number;
  repository_url: string;
  repoName?: string;
  user: { login: string; avatar_url: string } | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  owner: { login: string; avatar_url: string };
}

export interface IssueSearchParams {
  q: string;
  labels?: string;
  language?: string;
  difficulty?: string;
  sort?: "comments" | "reactions" | "updated" | "created";
  order?: "asc" | "desc";
  per_page?: number;
  page?: number;
}

export interface RepoSearchParams {
  q: string;
  language?: string;
  sort?: "stars" | "forks" | "updated" | "help-wanted-issues";
  order?: "asc" | "desc";
  per_page?: number;
  page?: number;
}

const GITHUB_API = "https://api.github.com";
const DEFAULT_HEADERS: HeadersInit = { Accept: "application/vnd.github.v3+json" };

export async function searchIssues(params: IssueSearchParams): Promise<{ items: GitHubIssue[]; total_count: number }> {
  const parts: string[] = [params.q];
  if (params.language) parts.push(`language:${params.language}`);
  if (params.labels) {
    params.labels.split(",").forEach((l) => parts.push(`label:"${l.trim()}"`));
  }
  if (params.difficulty === "good-first-issue") parts.push('label:"good first issue"');
  if (params.difficulty === "help-wanted") parts.push('label:"help wanted"');
  const query = parts.join("+");
  const sort = params.sort || "updated";
  const order = params.order || "desc";
  const per_page = params.per_page || 30;
  const page = params.page || 1;
  const url = `${GITHUB_API}/search/issues?q=${encodeURIComponent(query)}&sort=${sort}&order=${order}&per_page=${per_page}&page=${page}`;
  const res = await fetch(url, { headers: DEFAULT_HEADERS });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return { items: data.items as GitHubIssue[], total_count: data.total_count };
}

export async function searchRepos(params: RepoSearchParams): Promise<{ items: GitHubRepo[]; total_count: number }> {
  const parts: string[] = [params.q];
  if (params.language) parts.push(`language:${params.language}`);
  const query = parts.join("+");
  const sort = params.sort || "stars";
  const order = params.order || "desc";
  const per_page = params.per_page || 30;
  const page = params.page || 1;
  const url = `${GITHUB_API}/search/repositories?q=${encodeURIComponent(query)}&sort=${sort}&order=${order}&per_page=${per_page}&page=${page}`;
  const res = await fetch(url, { headers: DEFAULT_HEADERS });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return { items: data.items as GitHubRepo[], total_count: data.total_count };
}

export async function getTrendingRepos(language?: string, per_page = 12): Promise<GitHubRepo[]> {
  const date = new Date();
  date.setDate(date.getDate() - 7);
  const dateStr = date.toISOString().split("T")[0];
  let q = `created:>${dateStr}`;
  if (language) q += `+language:${language}`;
  const url = `${GITHUB_API}/search/repositories?q=${encodeURIComponent(q)}&sort=stars&order=desc&per_page=${per_page}`;
  const res = await fetch(url, { headers: DEFAULT_HEADERS });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return data.items as GitHubRepo[];
}

export async function getGoodFirstIssues(language?: string, per_page = 20): Promise<GitHubIssue[]> {
  let q = 'label:"good first issue" state:open';
  if (language) q += `+language:${language}`;
  const url = `${GITHUB_API}/search/issues?q=${encodeURIComponent(q)}&sort=updated&order=desc&per_page=${per_page}`;
  const res = await fetch(url, { headers: DEFAULT_HEADERS });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const data = await res.json();
  return data.items as GitHubIssue[];
}

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const m = url.match(/github\.com\/([^\/]+)\/([^\/\s?#]+)/);
  if (!m) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, "") };
}
