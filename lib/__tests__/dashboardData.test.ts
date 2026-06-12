import { describe, it, expect } from "vitest";
import {
  TRENDING_TOOLS,
  ACTIVITY_FEED,
  DASHBOARD_AGENTS,
  SHOWCASE_PROJECTS,
  USAGE_SERIES,
  CATEGORY_USAGE,
  ASSISTANT_SUGGESTIONS,
  STATS,
} from "@/lib/dashboardData";

const VALID_KINDS = ["launch", "prompt", "repo", "news"];
const VALID_STATUSES = ["idle", "running", "ready"];

describe("dashboardData", () => {
  describe("TRENDING_TOOLS", () => {
    it("has at least 4 tools", () => {
      expect(TRENDING_TOOLS.length).toBeGreaterThanOrEqual(4);
    });

    it("each tool has required fields", () => {
      for (const t of TRENDING_TOOLS) {
        expect(t.name).toBeTruthy();
        expect(t.emoji).toBeTruthy();
        expect(t.category).toBeTruthy();
        expect(t.stars).toMatch(/^[\d.]+k$/);
        expect(t.delta).toMatch(/^[+-]/);
        expect(t.description).toBeTruthy();
        expect(Array.isArray(t.models)).toBe(true);
        expect(t.models.length).toBeGreaterThan(0);
        expect(t.href).toMatch(/^https?:\/\//);
        expect(t.accent.from).toMatch(/^from-/);
        expect(t.accent.to).toMatch(/^to-/);
        expect(t.accent.text).toMatch(/^text-/);
      }
    });

    it("has unique names", () => {
      const names = TRENDING_TOOLS.map((t) => t.name);
      expect(new Set(names).size).toBe(names.length);
    });
  });

  describe("ACTIVITY_FEED", () => {
    it("has at least 4 items", () => {
      expect(ACTIVITY_FEED.length).toBeGreaterThanOrEqual(4);
    });

    it("each item has required fields", () => {
      for (const a of ACTIVITY_FEED) {
        expect(a.id).toBeTruthy();
        expect(VALID_KINDS).toContain(a.kind);
        expect(a.title).toBeTruthy();
        expect(a.meta).toBeTruthy();
        expect(a.when).toMatch(/\d+[mhd]/);
      }
    });

    it("has unique IDs", () => {
      const ids = ACTIVITY_FEED.map((a) => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("covers all 4 kind types", () => {
      const kinds = new Set(ACTIVITY_FEED.map((a) => a.kind));
      for (const k of VALID_KINDS) {
        expect(kinds.has(k as typeof VALID_KINDS[number])).toBe(true);
      }
    });
  });

  describe("DASHBOARD_AGENTS", () => {
    it("has at least 4 agents", () => {
      expect(DASHBOARD_AGENTS.length).toBeGreaterThanOrEqual(4);
    });

    it("each agent has required fields", () => {
      for (const a of DASHBOARD_AGENTS) {
        expect(a.id).toBeTruthy();
        expect(a.name).toBeTruthy();
        expect(a.role).toBeTruthy();
        expect(a.emoji).toBeTruthy();
        expect(VALID_STATUSES).toContain(a.status);
        expect(Array.isArray(a.capabilities)).toBe(true);
        expect(a.capabilities.length).toBeGreaterThan(0);
        expect(a.accent.from).toMatch(/^from-/);
        expect(a.accent.to).toMatch(/^to-/);
        expect(a.accent.text).toMatch(/^text-/);
        expect(a.accent.border).toMatch(/^border-/);
      }
    });

    it("has unique IDs", () => {
      const ids = DASHBOARD_AGENTS.map((a) => a.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    it("has at least one agent in each status", () => {
      const statuses = DASHBOARD_AGENTS.map((a) => a.status);
      expect(statuses).toContain("idle");
      expect(statuses).toContain("running");
      expect(statuses).toContain("ready");
    });
  });

  describe("SHOWCASE_PROJECTS", () => {
    it("has at least 2 projects", () => {
      expect(SHOWCASE_PROJECTS.length).toBeGreaterThanOrEqual(2);
    });

    it("each project has required fields", () => {
      for (const p of SHOWCASE_PROJECTS) {
        expect(p.id).toBeTruthy();
        expect(p.title).toBeTruthy();
        expect(p.author).toMatch(/^@/);
        expect(p.emoji).toBeTruthy();
        expect(p.built).toBeTruthy();
        expect(Array.isArray(p.tags)).toBe(true);
        expect(p.tags.length).toBeGreaterThan(0);
        expect(p.href).toMatch(/^\//);
      }
    });
  });

  describe("USAGE_SERIES", () => {
    it("has exactly 14 data points", () => {
      expect(USAGE_SERIES.length).toBe(14);
    });

    it("all values are positive numbers", () => {
      for (const v of USAGE_SERIES) {
        expect(v).toBeGreaterThan(0);
        expect(Number.isInteger(v)).toBe(true);
      }
    });

    it("shows an upward trend (last > first)", () => {
      expect(USAGE_SERIES[USAGE_SERIES.length - 1]).toBeGreaterThan(
        USAGE_SERIES[0],
      );
    });
  });

  describe("CATEGORY_USAGE", () => {
    it("has at least 4 categories", () => {
      expect(CATEGORY_USAGE.length).toBeGreaterThanOrEqual(4);
    });

    it("each category has required fields", () => {
      for (const c of CATEGORY_USAGE) {
        expect(c.label).toBeTruthy();
        expect(c.value).toBeGreaterThan(0);
        expect(c.value).toBeLessThanOrEqual(100);
        expect(c.color).toMatch(/^from-.+ to-.+$/);
      }
    });

    it("percentages sum to 100", () => {
      const sum = CATEGORY_USAGE.reduce((acc, c) => acc + c.value, 0);
      expect(sum).toBeGreaterThanOrEqual(98);
      expect(sum).toBeLessThanOrEqual(110);
    });
  });

  describe("ASSISTANT_SUGGESTIONS", () => {
    it("has at least 2 suggestions", () => {
      expect(ASSISTANT_SUGGESTIONS.length).toBeGreaterThanOrEqual(2);
    });

    it("each has label and emoji", () => {
      for (const s of ASSISTANT_SUGGESTIONS) {
        expect(s.label).toBeTruthy();
        expect(s.emoji).toBeTruthy();
      }
    });
  });

  describe("STATS", () => {
    it("has at least 4 stats", () => {
      expect(STATS.length).toBeGreaterThanOrEqual(4);
    });

    it("each stat has required fields", () => {
      for (const s of STATS) {
        expect(s.label).toBeTruthy();
        expect(s.value).toBeTruthy();
        expect(s.delta).toMatch(/^[+-]/);
        expect(s.color).toMatch(/^text-/);
      }
    });
  });
});
