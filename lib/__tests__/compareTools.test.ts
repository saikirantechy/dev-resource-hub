import { describe, it, expect } from "vitest";
import { COMPARE_TOOLS, getToolById, performanceAverage, TOOL_CATEGORIES, TIERS } from "@/lib/compareTools";

describe("compareTools", () => {
  describe("data integrity", () => {
    it("has at least 8 tools", () => expect(COMPARE_TOOLS.length).toBeGreaterThanOrEqual(8));
    it("each has required fields", () => {
      for (const t of COMPARE_TOOLS) {
        expect(t.id).toBeTruthy();
        expect(t.name).toBeTruthy();
        expect(t.rating).toBeGreaterThanOrEqual(0);
        expect(t.rating).toBeLessThanOrEqual(5);
        expect(t.pros.length).toBeGreaterThan(0);
        expect(t.cons.length).toBeGreaterThan(0);
      }
    });
    it("all categories valid", () => {
      for (const t of COMPARE_TOOLS) expect(TOOL_CATEGORIES).toContain(t.category);
    });
    it("all tiers valid", () => {
      for (const t of COMPARE_TOOLS) expect(TIERS).toContain(t.tier);
    });
    it("unique IDs", () => {
      const ids = COMPARE_TOOLS.map((t) => t.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe("getToolById", () => {
    it("returns tool", () => {
      expect(getToolById("cursor")?.name).toBe("Cursor");
    });
    it("returns undefined for unknown", () => {
      expect(getToolById("nonexistent")).toBeUndefined();
    });
  });

  describe("performanceAverage", () => {
    it("calculates average of 5 dims", () => {
      const t = COMPARE_TOOLS[0];
      const avg = performanceAverage(t);
      const expected = Math.round((t.performance.speed + t.performance.accuracy + t.performance.autonomy + t.performance.ecosystem + t.performance.learning) / 5);
      expect(avg).toBe(expected);
    });
    it("returns 0-100", () => {
      for (const t of COMPARE_TOOLS) {
        expect(performanceAverage(t)).toBeGreaterThanOrEqual(0);
        expect(performanceAverage(t)).toBeLessThanOrEqual(100);
      }
    });
  });
});
