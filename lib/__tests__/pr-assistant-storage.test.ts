import { describe, it, expect, beforeEach } from "vitest";
import {
  saveReview,
  loadReviews,
  deleteReview,
  clearAllReviews,
  getReviewCount,
  type SavedReview,
} from "@/lib/pr-assistant-storage";
import type { AnalysisResult, ParsedPR } from "@/lib/pr-assistant";

function makeMockResult(overrides?: Partial<AnalysisResult>): AnalysisResult {
  return {
    summary: "Test summary",
    changes: [],
    codeReview: [],
    security: [],
    docs: [],
    improvements: [],
    stats: {
      totalFiles: 5,
      linesAdded: 100,
      linesRemoved: 20,
      commentsCount: 3,
      riskLevel: "low",
      estimatedReviewTime: "15 minutes",
    },
    techStack: ["TypeScript", "React"],
    ...overrides,
  };
}

const mockParsed: ParsedPR = {
  repoName: "facebook/react",
  prNumber: "28758",
  isValid: true,
};

describe("pr-assistant-storage", () => {
  beforeEach(() => {
    clearAllReviews();
  });

  describe("saveReview", () => {
    it("saves a review and returns a SavedReview object", () => {
      const result = makeMockResult();
      const saved = saveReview(
        "https://github.com/facebook/react/pull/28758",
        mockParsed,
        result,
      );

      expect(saved).toBeDefined();
      expect(saved.repoName).toBe("facebook/react");
      expect(saved.prNumber).toBe("28758");
      expect(saved.prUrl).toBe(
        "https://github.com/facebook/react/pull/28758",
      );
      expect(saved.id).toContain("facebook/react#28758");
      expect(saved.savedAt).toBeTruthy();
      expect(saved.result.stats.riskLevel).toBe("low");
    });

    it("replaces an existing review for the same PR", () => {
      const result1 = makeMockResult({
        summary: "First analysis",
      });
      const result2 = makeMockResult({
        summary: "Second analysis (updated)",
      });

      saveReview("https://github.com/facebook/react/pull/28758", mockParsed, result1);
      saveReview("https://github.com/facebook/react/pull/28758", mockParsed, result2);

      const reviews = loadReviews();
      expect(reviews).toHaveLength(1);
      expect(reviews[0].result.summary).toBe("Second analysis (updated)");
    });

    it("keeps multiple distinct PR reviews", () => {
      const result1 = makeMockResult();
      const result2 = makeMockResult();

      saveReview("https://github.com/facebook/react/pull/28758", mockParsed, result1);
      saveReview(
        "https://github.com/vercel/next.js/pull/65432",
        { repoName: "vercel/next.js", prNumber: "65432", isValid: true },
        result2,
      );

      const reviews = loadReviews();
      expect(reviews).toHaveLength(2);
    });
  });

  describe("loadReviews", () => {
    it("returns an empty array when no reviews saved", () => {
      const reviews = loadReviews();
      expect(reviews).toEqual([]);
    });

    it("returns saved reviews in reverse chronological order", () => {
      const result = makeMockResult();

      saveReview(
        "https://github.com/vercel/next.js/pull/100",
        { repoName: "vercel/next.js", prNumber: "100", isValid: true },
        result,
      );

      saveReview(
        "https://github.com/facebook/react/pull/200",
        { repoName: "facebook/react", prNumber: "200", isValid: true },
        result,
      );

      const reviews = loadReviews();
      expect(reviews).toHaveLength(2);
      expect(reviews[0].repoName).toBe("facebook/react"); // newest first (unshift)
    });
  });

  describe("deleteReview", () => {
    it("removes a specific review by id", () => {
      const result = makeMockResult();
      const saved = saveReview(
        "https://github.com/facebook/react/pull/28758",
        mockParsed,
        result,
      );

      expect(loadReviews()).toHaveLength(1);

      deleteReview(saved.id);
      expect(loadReviews()).toHaveLength(0);
    });

    it("does nothing when deleting a non-existent id", () => {
      const result = makeMockResult();
      saveReview("https://github.com/facebook/react/pull/28758", mockParsed, result);

      deleteReview("non-existent-id");
      expect(loadReviews()).toHaveLength(1);
    });
  });

  describe("clearAllReviews", () => {
    it("removes all saved reviews", () => {
      const result = makeMockResult();

      saveReview(
        "https://github.com/facebook/react/pull/28758",
        mockParsed,
        result,
      );
      saveReview(
        "https://github.com/vercel/next.js/pull/65432",
        { repoName: "vercel/next.js", prNumber: "65432", isValid: true },
        result,
      );

      expect(getReviewCount()).toBe(2);

      clearAllReviews();
      expect(getReviewCount()).toBe(0);
    });
  });

  describe("getReviewCount", () => {
    it("returns 0 when no reviews", () => {
      expect(getReviewCount()).toBe(0);
    });

    it("returns the correct count after saving", () => {
      const result = makeMockResult();

      saveReview(
        "https://github.com/facebook/react/pull/28758",
        mockParsed,
        result,
      );
      expect(getReviewCount()).toBe(1);

      saveReview(
        "https://github.com/vercel/next.js/pull/65432",
        { repoName: "vercel/next.js", prNumber: "65432", isValid: true },
        result,
      );
      expect(getReviewCount()).toBe(2);
    });
  });
});
