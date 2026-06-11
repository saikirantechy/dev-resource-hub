import { describe, it, expect } from "vitest";
import { templates } from "@/lib/workflow/templates";

describe("workflow templates", () => {
  it("has at least 3 templates", () => {
    expect(templates.length).toBeGreaterThanOrEqual(3);
  });

  it("each has a name, nodes, and edges", () => {
    for (const t of templates) {
      expect(t.name).toBeTruthy();
      expect(t.nodes.length).toBeGreaterThan(0);
      expect(t.edges.length).toBeGreaterThan(0);
    }
  });

  it("each node has valid fields", () => {
    for (const t of templates) {
      for (const n of t.nodes) {
        expect(n.id).toBeTruthy();
        expect(n.type).toBeTruthy();
        expect(n.data?.label).toBeTruthy();
      }
    }
  });

  it("edge sources/targets reference existing nodes", () => {
    for (const t of templates) {
      const nodeIds = new Set(t.nodes.map((n) => n.id));
      for (const e of t.edges) {
        expect(nodeIds.has(e.source)).toBe(true);
        expect(nodeIds.has(e.target)).toBe(true);
      }
    }
  });
});
