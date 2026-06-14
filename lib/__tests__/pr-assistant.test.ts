import { describe, it, expect } from "vitest";
import { parseGitHubPR, generateAnalysis, type AnalysisResult } from "@/lib/pr-assistant";

// ─── parseGitHubPR ────────────────────────────────────────────────────

describe("parseGitHubPR", () => {
  it("parses a valid GitHub PR URL", () => {
    const result = parseGitHubPR("https://github.com/facebook/react/pull/28758");
    expect(result.isValid).toBe(true);
    expect(result.repoName).toBe("facebook/react");
    expect(result.prNumber).toBe("28758");
  });

  it("parses a URL with a different owner and repo", () => {
    const result = parseGitHubPR("https://github.com/vercel/next.js/pull/65432");
    expect(result.isValid).toBe(true);
    expect(result.repoName).toBe("vercel/next.js");
    expect(result.prNumber).toBe("65432");
  });

  it("parses a URL with single-digit PR number", () => {
    const result = parseGitHubPR("https://github.com/owner/repo/pull/1");
    expect(result.isValid).toBe(true);
    expect(result.repoName).toBe("owner/repo");
    expect(result.prNumber).toBe("1");
  });

  it("returns invalid for empty string", () => {
    const result = parseGitHubPR("");
    expect(result.isValid).toBe(false);
    expect(result.repoName).toBe("");
    expect(result.prNumber).toBe("");
  });

  it("returns invalid for non-GitHub URL", () => {
    const result = parseGitHubPR("https://gitlab.com/owner/repo/merge-requests/123");
    expect(result.isValid).toBe(false);
  });

  it("returns invalid for GitHub URL without /pull/ segment", () => {
    const result = parseGitHubPR("https://github.com/owner/repo/issues/123");
    expect(result.isValid).toBe(false);
  });

  it("returns invalid for GitHub URL with non-numeric PR", () => {
    const result = parseGitHubPR("https://github.com/owner/repo/pull/abc");
    expect(result.isValid).toBe(false);
  });

  it("returns invalid for malformed URL", () => {
    const result = parseGitHubPR("not-a-url");
    expect(result.isValid).toBe(false);
  });

  it("handles URL with trailing slash", () => {
    const result = parseGitHubPR("https://github.com/owner/repo/pull/123/");
    expect(result.isValid).toBe(true);
    expect(result.repoName).toBe("owner/repo");
    expect(result.prNumber).toBe("123");
  });

  it("handles URL with extra path segments", () => {
    const result = parseGitHubPR("https://github.com/owner/repo/pull/123/files");
    expect(result.isValid).toBe(true);
    expect(result.repoName).toBe("owner/repo");
    expect(result.prNumber).toBe("123");
  });
});

// ─── generateAnalysis ─────────────────────────────────────────────────

describe("generateAnalysis", () => {
  const frontendUrl = "https://github.com/facebook/react/pull/28758";
  const backendUrl = "https://github.com/expressjs/api-server/pull/456";
  const mlUrl = "https://github.com/tensorflow/models/pull/789";

  const verifyResultShape = (result: AnalysisResult) => {
    expect(result).toBeDefined();
    expect(result).toHaveProperty("summary");
    expect(result).toHaveProperty("changes");
    expect(result).toHaveProperty("codeReview");
    expect(result).toHaveProperty("security");
    expect(result).toHaveProperty("docs");
    expect(result).toHaveProperty("improvements");
    expect(result).toHaveProperty("stats");
    expect(result).toHaveProperty("techStack");
  };

  describe("result shape", () => {
    it("returns a complete AnalysisResult object", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      verifyResultShape(result);
    });

    it("includes the repo name and PR number in the summary", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      expect(result.summary).toContain("facebook/react");
      expect(result.summary).toContain("28758");
    });

    it("returns 5 changed files", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      expect(result.changes).toHaveLength(5);
    });

    it("returns 5 code review findings", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      expect(result.codeReview).toHaveLength(5);
    });

    it("returns 4 security findings", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      expect(result.security).toHaveLength(4);
    });

    it("returns 5 documentation sections", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      expect(result.docs).toHaveLength(5);
    });

    it("returns 5 improvement suggestions", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      expect(result.improvements).toHaveLength(5);
    });

    it("returns valid stats", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      const { stats } = result;
      expect(stats.totalFiles).toBeGreaterThanOrEqual(5);
      expect(stats.totalFiles).toBeLessThanOrEqual(12);
      expect(stats.linesAdded).toBeGreaterThanOrEqual(80);
      expect(stats.linesRemoved).toBeGreaterThanOrEqual(10);
      expect(stats.commentsCount).toBeGreaterThanOrEqual(2);
      expect(["low", "medium", "high"]).toContain(stats.riskLevel);
      expect(stats.estimatedReviewTime).toMatch(/^\d+ minutes$/);
    });
  });

  describe("changes", () => {
    it("has correct status values for each change", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      for (const change of result.changes) {
        expect(["added", "modified", "deleted"]).toContain(change.status);
        expect(change.lines).toBeGreaterThan(0);
      }
    });
  });

  describe("code review", () => {
    it("has valid severity values", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      for (const item of result.codeReview) {
        expect(["critical", "warning", "info"]).toContain(item.severity);
        expect(item.category).toBeTruthy();
        expect(item.message).toBeTruthy();
        expect(item.suggestion).toBeTruthy();
      }
    });
  });

  describe("security", () => {
    it("has valid severity values", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      for (const item of result.security) {
        expect(["critical", "high", "medium", "low"]).toContain(item.severity);
        expect(item.issue).toBeTruthy();
        expect(item.impact).toBeTruthy();
        expect(item.recommendation).toBeTruthy();
      }
    });
  });

  describe("documentation", () => {
    it("has valid status values", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      for (const item of result.docs) {
        expect(["good", "needs-improvement", "missing"]).toContain(item.status);
        expect(item.section).toBeTruthy();
      }
    });

    it("includes README and CHANGELOG sections", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      const sections = result.docs.map((d) => d.section);
      expect(sections).toContain("README");
      expect(sections).toContain("CHANGELOG");
    });
  });

  describe("improvements", () => {
    it("has valid priority values", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      for (const item of result.improvements) {
        expect(["high", "medium", "low"]).toContain(item.priority);
        expect(item.area).toBeTruthy();
        expect(item.suggestion).toBeTruthy();
        expect(item.effort).toMatch(/\d+-\d+ hours/);
      }
    });
  });

  describe("tech stack detection", () => {
    it("detects frontend tech stack from react URL", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      expect(result.techStack).toContain("React");
      expect(result.techStack).toContain("Next.js");
      expect(result.techStack).toContain("TypeScript");
    });

    it("detects frontend tech stack from next URL", () => {
      const result = generateAnalysis("https://github.com/vercel/next.js/pull/123", "vercel/next.js", "123");
      expect(result.techStack).toContain("React");
      expect(result.techStack).toContain("Next.js");
    });

    it("detects frontend tech stack from UI URL", () => {
      const result = generateAnalysis("https://github.com/shadcn-ui/ui/pull/3456", "shadcn-ui/ui", "3456");
      expect(result.techStack).toContain("TypeScript");
      expect(result.techStack).toContain("Tailwind CSS");
    });

    it("detects backend tech stack from api URL", () => {
      const result = generateAnalysis(backendUrl, "expressjs/api-server", "456");
      expect(result.techStack).toContain("Python");
      expect(result.techStack).toContain("FastAPI");
      expect(result.techStack).toContain("PostgreSQL");
    });

    it("detects backend tech stack from python URL", () => {
      const result = generateAnalysis("https://github.com/python/cpython/pull/321", "python/cpython", "321");
      expect(result.techStack).toContain("Python");
      expect(result.techStack).toContain("FastAPI");
    });

    it("detects ML tech stack from ML URL", () => {
      const result = generateAnalysis(mlUrl, "tensorflow/models", "789");
      expect(result.techStack).toContain("TensorFlow");
      expect(result.techStack).toContain("PyTorch");
      expect(result.techStack).toContain("CUDA");
    });

    it("detects ML tech stack from AI URL", () => {
      const result = generateAnalysis("https://github.com/openai/whisper/pull/100", "openai/whisper", "100");
      expect(result.techStack).toContain("TensorFlow");
      expect(result.techStack).toContain("PyTorch");
    });

    it("detects ML tech stack from model URL", () => {
      const result = generateAnalysis("https://github.com/openai/whisper-model/pull/200", "openai/whisper-model", "200");
      expect(result.techStack).toContain("TensorFlow");
      expect(result.techStack).toContain("PyTorch");
    });

    it("uses default tech stack for unrecognized URL", () => {
      const result = generateAnalysis("https://github.com/unknown/random/pull/999", "unknown/random", "999");
      expect(result.techStack).toEqual(["TypeScript", "Node.js", "React", "PostgreSQL", "AWS"]);
    });
  });

  describe("frontend vs backend file paths", () => {
    it("uses .tsx paths for frontend URLs", () => {
      const result = generateAnalysis(frontendUrl, "facebook/react", "28758");
      const files = result.changes.map((c) => c.file);
      expect(files.some((f) => f.endsWith(".tsx"))).toBe(true);
      expect(files.some((f) => f.endsWith(".py"))).toBe(false);
    });

    it("uses .py paths for backend URLs", () => {
      const result = generateAnalysis(backendUrl, "expressjs/api-server", "456");
      const files = result.changes.map((c) => c.file);
      expect(files.some((f) => f.endsWith(".py"))).toBe(true);
      expect(files.some((f) => f.endsWith(".tsx"))).toBe(false);
    });

    it("uses backend-style paths for ML URLs (no DataTable.tsx)", () => {
      const result = generateAnalysis(mlUrl, "tensorflow/models", "789");
      const files = result.changes.map((c) => c.file);
      expect(files.every((f) => !f.includes("DataTable.tsx"))).toBe(true);
      expect(files.some((f) => f.endsWith(".py") || f.endsWith(".ts"))).toBe(true);
    });
  });
});
