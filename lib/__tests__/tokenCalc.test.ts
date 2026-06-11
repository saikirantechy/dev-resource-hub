import { describe, it, expect } from "vitest";
import { MODELS, tokensFor, costFor, projectCost, formatUsd, formatTokens, contextPercent } from "@/lib/tokenCalc";

describe("tokenCalc", () => {
  describe("MODELS", () => {
    it("has at least 8 models", () => expect(MODELS.length).toBeGreaterThanOrEqual(8));
    it("each has required fields", () => {
      for (const m of MODELS) {
        expect(m.id).toBeTruthy();
        expect(m.name).toBeTruthy();
        expect(m.family).toBeTruthy();
        expect(m.contextWindow).toBeGreaterThan(0);
      }
    });
    it("covers OpenAI, Anthropic, Google", () => {
      const families = new Set(MODELS.map((m) => m.family));
      expect(families.has("OpenAI")).toBe(true);
      expect(families.has("Anthropic")).toBe(true);
      expect(families.has("Google")).toBe(true);
    });
  });

  describe("tokensFor", () => {
    it("returns 0 for empty", () => expect(tokensFor("", 4)).toBe(0));
    it("returns ceiling of length / charsPerToken", () => expect(tokensFor("Hello", 4)).toBe(2));
    it("uses charsPerToken divisor", () => {
      expect(tokensFor("Hello world", 4)).toBe(3);
      expect(tokensFor("Hello world", 2)).toBe(6);
    });
  });

  describe("costFor", () => {
    it("returns 0 for 0 tokens", () => expect(costFor(MODELS[0], 0, 0)).toBe(0));
    it("calculates input + output", () => {
      const m = MODELS[0];
      const c = costFor(m, 1000, 500);
      expect(c).toBeCloseTo((1000 * m.inputCost + 500 * m.outputCost) / 1_000_000, 8);
    });
  });

  describe("projectCost", () => {
    it("scales by request count", () => {
      expect(projectCost(MODELS[0], 1000, 500, 10)).toBeCloseTo(costFor(MODELS[0], 1000, 500) * 10, 6);
    });
  });

  describe("formatUsd", () => {
    it("zero", () => expect(formatUsd(0)).toBe("$0"));
    it("formats <1 with 4 decimals", () => expect(formatUsd(0.5)).toBe("$0.5000"));
    it("formats <100 with 2 decimals", () => expect(formatUsd(1.5)).toBe("$1.50"));
    it("formats >=100 with commas", () => expect(formatUsd(1234)).toBe("$1,234"));
  });

  describe("formatTokens", () => {
    it("formats small", () => expect(formatTokens(500)).toBe("500"));
    it("formats k", () => expect(formatTokens(1500)).toBe("1.5k"));
    it("formats M", () => expect(formatTokens(2_500_000)).toBe("2.50M"));
  });

  describe("contextPercent", () => {
    it("calculates", () => expect(contextPercent(64000, 128000)).toBe(50));
    it("caps at 100", () => expect(contextPercent(999999, 128000)).toBe(100));
  });
});
