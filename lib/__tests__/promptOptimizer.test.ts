import { describe, it, expect } from "vitest";
import { optimize, countTokens, estimateCostUsd, analyze } from "@/lib/promptOptimizer";

describe("promptOptimizer", () => {
  describe("optimize", () => {
    it("handles empty input", () => {
      expect(optimize("")).toBe("");
      expect(optimize("   ")).toBe("");
    });

    it("removes polite fillers", () => {
      const result = optimize("Please write a function. Thanks a lot!");
      expect(result).not.toContain("Please");
      expect(result).not.toContain("Thanks");
      expect(result.toLowerCase()).toContain("write a function");
    });

    it("replaces verbose phrases", () => {
      const result = optimize("Make use of the API in order to fetch data.");
      expect(result).not.toContain("Make use of");
      expect(result).not.toContain("in order to");
    });

    it("removes weak modifiers", () => {
      const result = optimize("This is a very detailed and really comprehensive analysis.");
      expect(result).not.toContain("very");
      expect(result).not.toContain("really");
    });

    it("preserves code blocks", () => {
      const input = "Here is a function:\n```python\ndef hello():\n    print('world')\n```\nThanks!";
      const result = optimize(input);
      expect(result).toContain("```python");
      expect(result).toContain("def hello()");
    });

    it("preserves placeholders", () => {
      const result = optimize("Sum {{a}} and {{b}} please.");
      expect(result).toContain("{{a}}");
      expect(result).toContain("{{b}}");
    });

    it("formats structured mode with bullet points", () => {
      const result = optimize("Do step one. Then step two. Finally step three.", "structured");
      expect(result).toContain("- Do step one");
      expect(result).toContain("- Then step two");
    });

    it("adds Objective prefix in enterprise mode", () => {
      const result = optimize("Build a login system.", "enterprise");
      expect(result).toMatch(/^Objective:/);
    });

    it("handles sample prompt", () => {
      const input = "Please be so kind as to write a very detailed python function that sums {{a}} and {{b}}. I would really like you to include type hints and docstrings, in order to make it more readable. Thanks a lot!";
      const result = optimize(input, "concise");
      expect(result).toBeTruthy();
      expect(result.length).toBeLessThan(input.length);
      expect(result).toContain("{{a}}");
      expect(result).toContain("{{b}}");
      expect(result).not.toMatch(/^Please/i);
    });
  });

  describe("countTokens", () => {
    it("returns 0 for empty string", () => expect(countTokens("")).toBe(0));
    it("returns at least 1 for any non-empty input", () => expect(countTokens("a")).toBe(1));
    it("estimates tokens as length / 4", () => {
      expect(countTokens("abcd")).toBe(1);
      expect(countTokens("abcdefgh")).toBe(2);
    });
  });

  describe("estimateCostUsd", () => {
    it("returns 0 for 0 tokens", () => expect(estimateCostUsd(0)).toBe(0));
    it("calculates cost at default rate", () => expect(estimateCostUsd(1000)).toBeCloseTo(0.005, 5));
  });

  describe("analyze", () => {
    it("returns zeros for empty input", () => {
      const r = analyze("", "");
      expect(r.verbosity).toBe(0);
      expect(r.score).toBe(0);
    });

    it("detects fillers", () => {
      const r = analyze("Please kindly write a function. Thanks!", optimize("Please kindly write a function. Thanks!"));
      expect(r.warnings.length).toBeGreaterThan(0);
    });
  });
});
