import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the zustand store before importing
const mockLogs: string[] = [];
const mockAddLog = (log: string) => { mockLogs.push(log); };

vi.mock("@/lib/workflow/store", () => ({
  useWorkflowStore: {
    getState: () => ({
      addExecutionLog: mockAddLog,
    }),
  },
}));

import { simulateExecution } from "@/lib/workflow/engine";

// Simple node/edge factories
function makeNode(id: string, type: string, label?: string) {
  return { id, type, data: { label } };
}
function makeEdge(id: string, source: string, target: string) {
  return { id, source, target };
}

describe("workflow engine", () => {
  beforeEach(() => {
    mockLogs.length = 0;
  });

  it("handles empty node list", async () => {
    await simulateExecution([], []);
    expect(mockLogs.some((l) => l.includes("empty"))).toBe(true);
  });

  it("executes a single node", async () => {
    const nodes = [makeNode("1", "output", "My Output")];
    await simulateExecution(nodes, []);
    expect(mockLogs.some((l) => l.includes("My Output"))).toBe(true);
    expect(mockLogs.some((l) => l.includes("SUCCESS"))).toBe(true);
  });

  it("traverses a linear chain", async () => {
    const nodes = [makeNode("1", "agent", "Agent A"), makeNode("2", "output", "Final")];
    const edges = [makeEdge("e1", "1", "2")];
    await simulateExecution(nodes, edges);
    expect(mockLogs.some((l) => l.includes("Agent A"))).toBe(true);
    expect(mockLogs.some((l) => l.includes("Final"))).toBe(true);
  });

  it("detects missing start nodes (cyclic only)", async () => {
    const nodes = [makeNode("1", "agent", "A"), makeNode("2", "agent", "B")];
    const edges = [makeEdge("e1", "1", "2"), makeEdge("e2", "2", "1")];
    await simulateExecution(nodes, edges);
    expect(mockLogs.some((l) => l.includes("No clear"))).toBe(true);
  });
});
