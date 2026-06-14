import { describe, it, expect } from "vitest";
import { generateAnalysisFromRealData, type RealPRData, type GHPR, type GHFile, type GHCommit } from "@/lib/github-pr";

function makeMockRealPRData(overrides?: Partial<RealPRData>): RealPRData {
  const pr: GHPR = {
    number: 28758,
    title: "feat: add new component system",
    body: "This PR adds a new component system with virtual DOM diffing and hydration support.",
    state: "open",
    html_url: "https://github.com/facebook/react/pull/28758",
    merge_commit_sha: null,
    head: { ref: "feat/new-component-system", sha: "abc123" },
    base: { ref: "main", sha: "def456" },
    user: { login: "facebook-github-bot", avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4" },
    created_at: "2026-06-01T10:00:00Z",
    updated_at: "2026-06-14T12:00:00Z",
    merged: false,
    comments: 5,
    review_comments: 3,
    commits: 4,
    additions: 350,
    deletions: 80,
    changed_files: 12,
    labels: [{ name: "enhancement", color: "a2eeef" }, { name: "React Core", color: "fbca04" }],
    ...overrides?.pr,
  };

  const files: GHFile[] = [
    { filename: "src/index.ts", status: "modified", additions: 50, deletions: 20, changes: 70, blob_url: "", raw_url: "", contents_url: "" },
    { filename: "src/components/App.tsx", status: "modified", additions: 120, deletions: 30, changes: 150, blob_url: "", raw_url: "", contents_url: "" },
    { filename: "src/lib/vdom.ts", status: "added", additions: 150, deletions: 0, changes: 150, blob_url: "", raw_url: "", contents_url: "" },
    { filename: "src/__tests__/vdom.test.ts", status: "added", additions: 30, deletions: 0, changes: 30, blob_url: "", raw_url: "", contents_url: "" },
    { filename: "docs/api.md", status: "modified", additions: 15, deletions: 5, changes: 20, blob_url: "", raw_url: "", contents_url: "" },
    { filename: "README.md", status: "modified", additions: 5, deletions: 2, changes: 7, blob_url: "", raw_url: "", contents_url: "" },
  ];

  const commits: GHCommit[] = [
    { sha: "abc", commit: { message: "feat: add virtual DOM engine", author: { name: "Test Author", date: "2026-06-01T10:00:00Z" } } },
    { sha: "def", commit: { message: "feat: implement component hydration", author: { name: "Test Author", date: "2026-06-02T10:00:00Z" } } },
  ];

  return {
    pr,
    files,
    commits,
    languages: ["TypeScript", "JavaScript", "CSS"],
    topics: ["react", "virtual-dom", "frontend"],
    ...overrides,
  };
}

describe("generateAnalysisFromRealData", () => {
  it("returns a complete AnalysisResult", () => {
    const data = makeMockRealPRData();
    const result = generateAnalysisFromRealData(data, "facebook/react");

    expect(result).toBeDefined();
    expect(result.summary).toContain("feat: add new component system");
    expect(result.summary).toContain("6 files changed");
    expect(result.summary).toContain("enhancement");
    expect(result).toHaveProperty("changes");
    expect(result).toHaveProperty("codeReview");
    expect(result).toHaveProperty("security");
    expect(result).toHaveProperty("docs");
    expect(result).toHaveProperty("improvements");
    expect(result).toHaveProperty("stats");
    expect(result).toHaveProperty("techStack");
  });

  it("maps real file changes correctly", () => {
    const data = makeMockRealPRData();
    const result = generateAnalysisFromRealData(data, "facebook/react");

    expect(result.changes).toHaveLength(6);
    expect(result.changes[0].file).toBe("src/index.ts");
    expect(result.changes[0].status).toBe("modified");
    expect(result.changes[0].lines).toBe(70);

    expect(result.changes[2].file).toBe("src/lib/vdom.ts");
    expect(result.changes[2].status).toBe("added");
  });

  it("detects test files from real data", () => {
    const data = makeMockRealPRData();
    const result = generateAnalysisFromRealData(data, "facebook/react");

    const testingReview = result.codeReview.find((r) => r.category === "Testing");
    expect(testingReview).toBeDefined();
    expect(testingReview?.severity).toBe("info");
    expect(testingReview?.message).toContain("test files modified");
  });

  it("warns when no tests are present", () => {
    const data = makeMockRealPRData();
    data.files = data.files.filter((f) => !f.filename.includes("__tests__"));
    data.pr.changed_files = data.files.length;

    const result = generateAnalysisFromRealData(data, "facebook/react");

    const testingReview = result.codeReview.find((r) => r.category === "Testing");
    expect(testingReview).toBeDefined();
    expect(testingReview?.severity).toBe("warning");
    expect(testingReview?.message).toContain("No test files detected");
  });

  it("detects documentation updates", () => {
    const data = makeMockRealPRData();
    const result = generateAnalysisFromRealData(data, "facebook/react");

    const docsReview = result.docs.find((d) => d.section === "README / Docs");
    expect(docsReview).toBeDefined();
    expect(docsReview?.status).toBe("good");
  });

  it("flags missing documentation", () => {
    const data = makeMockRealPRData();
    data.files = data.files.filter((f) => !f.filename.startsWith("docs/") && !f.filename.includes("README"));

    const result = generateAnalysisFromRealData(data, "facebook/react");

    const docsReview = result.docs.find((d) => d.section === "README / Docs");
    expect(docsReview).toBeDefined();
    expect(docsReview?.status).toBe("missing");
  });

  it("detects security-related files", () => {
    const data = makeMockRealPRData();
    data.files.push({
      filename: "src/lib/auth.ts", status: "modified",
      additions: 30, deletions: 10, changes: 40,
      blob_url: "", raw_url: "", contents_url: "",
    });
    data.pr.changed_files = data.files.length;

    const result = generateAnalysisFromRealData(data, "facebook/react");

    const securityItem = result.security.find((s) => s.severity === "high");
    expect(securityItem).toBeDefined();
    expect(securityItem?.issue).toContain("Security-related");
  });

  it("sets risk level based on real change volume", () => {
    const smallData = makeMockRealPRData();
    smallData.files = smallData.files.map((f) => ({ ...f, additions: 10, deletions: 2, changes: 12 }));
    smallData.pr.changed_files = 2;
    const smallResult = generateAnalysisFromRealData(smallData, "facebook/react");
    expect(smallResult.stats.riskLevel).toBe("low");

    const mediumData = makeMockRealPRData();
    mediumData.files = mediumData.files.map((f) => ({ ...f, additions: 50, deletions: 30, changes: 80 }));
    mediumData.pr.changed_files = 5;
    const mediumResult = generateAnalysisFromRealData(mediumData, "facebook/react");
    expect(["medium", "high"]).toContain(mediumResult.stats.riskLevel);
  });

  it("uses real stats from PR data", () => {
    const data = makeMockRealPRData();
    const result = generateAnalysisFromRealData(data, "facebook/react");

    expect(result.stats.totalFiles).toBe(data.pr.changed_files);
    expect(result.stats.linesAdded).toBe(data.files.reduce((s, f) => s + f.additions, 0));
    expect(result.stats.linesRemoved).toBe(data.files.reduce((s, f) => s + f.deletions, 0));
    expect(result.stats.commentsCount).toBe(data.pr.comments + data.pr.review_comments);
  });

  it("includes PR labels in tech stack", () => {
    const data = makeMockRealPRData();
    const result = generateAnalysisFromRealData(data, "facebook/react");

    expect(result.techStack).toContain("enhancement");
    expect(result.techStack).toContain("React Core");
  });

  it("includes repo languages in tech stack", () => {
    const data = makeMockRealPRData();
    const result = generateAnalysisFromRealData(data, "facebook/react");

    expect(result.techStack).toContain("TypeScript");
    expect(result.techStack).toContain("JavaScript");
  });

  it("handles empty PR body gracefully", () => {
    const data = makeMockRealPRData();
    data.pr.body = "";

    const result = generateAnalysisFromRealData(data, "facebook/react");

    const doc = result.docs.find((d) => d.section === "PR Description");
    expect(doc?.status).toBe("needs-improvement");
    expect(result.summary).not.toContain("undefined");
  });

  it("estimates review time based on file count", () => {
    const data = makeMockRealPRData();
    const result = generateAnalysisFromRealData(data, "facebook/react");

    expect(result.stats.estimatedReviewTime).toMatch(/^\d+ minutes$/);
    const minutes = parseInt(result.stats.estimatedReviewTime);
    expect(minutes).toBeGreaterThanOrEqual(10);
    expect(minutes).toBeLessThanOrEqual(60);
  });
});
