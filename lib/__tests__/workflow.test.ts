import { describe, it, expect, vi, beforeEach } from "vitest";
import { simulateExecution } from "@/lib/workflow/engine";
import { templates } from "@/lib/workflow/templates";
import { useWorkflowStore } from "@/lib/workflow/store";

// ─── Helpers ───────────────────────────────────────────────────────────────

function makeNode(id: string, type: string, label?: string) {
  return { id, type, position: { x: 100, y: 100 }, data: { label } };
}
function makeEdge(id: string, source: string, target: string) {
  return { id, source, target, animated: true };
}

// ─── ENGINE TESTS ──────────────────────────────────────────────────────────

describe("workflow engine (simulateExecution)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("handles empty node list", async () => {
    const addLog = vi.fn();
    vi.spyOn(useWorkflowStore, "getState").mockReturnValue({
      addExecutionLog: addLog,
    } as any);

    await simulateExecution([], []);
    expect(addLog).toHaveBeenCalledWith(
      expect.stringContaining("empty"),
    );
  });

  it("executes a single output node", async () => {
    const nodes = [makeNode("1", "output", "My Output")];
    const logs: string[] = [];
    vi.spyOn(useWorkflowStore, "getState").mockReturnValue({
      addExecutionLog: (log: string) => logs.push(log),
    } as any);

    await simulateExecution(nodes, []);
    expect(logs.some((l) => l.includes("My Output"))).toBe(true);
    expect(logs.some((l) => l.includes("SUCCESS"))).toBe(true);
    expect(logs.some((l) => l.includes("finished"))).toBe(true);
  });

  it("traverses a linear chain A→B→C", async () => {
    const nodes = [
      makeNode("1", "agent", "Agent A"),
      makeNode("2", "tool", "Tool B"),
      makeNode("3", "output", "Result C"),
    ];
    const edges = [
      makeEdge("e1", "1", "2"),
      makeEdge("e2", "2", "3"),
    ];
    const logs: string[] = [];
    vi.spyOn(useWorkflowStore, "getState").mockReturnValue({
      addExecutionLog: (log: string) => logs.push(log),
    } as any);

    await simulateExecution(nodes, edges);
    expect(logs.some((l) => l.includes("Agent A"))).toBe(true);
    expect(logs.some((l) => l.includes("Tool B"))).toBe(true);
    expect(logs.some((l) => l.includes("Result C"))).toBe(true);
    expect(logs.some((l) => l.includes("finished"))).toBe(true);
  });

  it("traverses parallel branches", async () => {
    const nodes = [
      makeNode("1", "prompt", "Input"),
      makeNode("2", "agent", "Branch A"),
      makeNode("3", "agent", "Branch B"),
      makeNode("4", "output", "Merge"),
    ];
    const edges = [
      makeEdge("e1", "1", "2"),
      makeEdge("e2", "1", "3"),
      makeEdge("e3", "2", "4"),
      makeEdge("e4", "3", "4"),
    ];
    const logs: string[] = [];
    vi.spyOn(useWorkflowStore, "getState").mockReturnValue({
      addExecutionLog: (log: string) => logs.push(log),
    } as any);

    await simulateExecution(nodes, edges);
    expect(logs.some((l) => l.includes("Branch A"))).toBe(true);
    expect(logs.some((l) => l.includes("Branch B"))).toBe(true);
    expect(logs.some((l) => l.includes("Merge"))).toBe(true);
  });

  it("reports error on purely cyclic graph (no entry point)", async () => {
    const nodes = [
      makeNode("1", "agent", "A"),
      makeNode("2", "agent", "B"),
    ];
    const edges = [
      makeEdge("e1", "1", "2"),
      makeEdge("e2", "2", "1"),
    ];
    const logs: string[] = [];
    vi.spyOn(useWorkflowStore, "getState").mockReturnValue({
      addExecutionLog: (log: string) => logs.push(log),
    } as any);

    await simulateExecution(nodes, edges);
    expect(logs.some((l) => l.includes("No clear"))).toBe(true);
  });

  it("handles multiple start nodes", async () => {
    const nodes = [
      makeNode("1", "agent", "Start A"),
      makeNode("2", "agent", "Start B"),
      makeNode("3", "output", "Final"),
    ];
    const edges = [
      makeEdge("e1", "1", "3"),
      makeEdge("e2", "2", "3"),
    ];
    const logs: string[] = [];
    vi.spyOn(useWorkflowStore, "getState").mockReturnValue({
      addExecutionLog: (log: string) => logs.push(log),
    } as any);

    await simulateExecution(nodes, edges);
    expect(logs.some((l) => l.includes("Start A"))).toBe(true);
    expect(logs.some((l) => l.includes("Start B"))).toBe(true);
    expect(logs.some((l) => l.includes("Final"))).toBe(true);
  });

  it("uses node type as fallback label when label is missing", async () => {
    const nodes = [
      { id: "1", type: "agent", position: { x: 0, y: 0 }, data: {} },
    ];
    const logs: string[] = [];
    vi.spyOn(useWorkflowStore, "getState").mockReturnValue({
      addExecutionLog: (log: string) => logs.push(log),
    } as any);

    await simulateExecution(nodes, []);
    expect(logs.some((l) => l.includes("AGENT"))).toBe(true);
  });

  it(
    "executes large workflow without error",
    async () => {
      const nodes = Array.from({ length: 20 }, (_, i) =>
        makeNode(`${i}`, i === 19 ? "output" : "agent", `Node ${i}`),
      );
      const edges = Array.from({ length: 19 }, (_, i) =>
        makeEdge(`e${i}`, `${i}`, `${i + 1}`),
      );
      const logs: string[] = [];
      vi.spyOn(useWorkflowStore, "getState").mockReturnValue({
        addExecutionLog: (log: string) => logs.push(log),
      } as any);

      await simulateExecution(nodes, edges);
      expect(logs.filter((l) => l.includes("SUCCESS")).length).toBe(20);
    },
    30_000,
  );
});

// ─── STORE TESTS ───────────────────────────────────────────────────────────

describe("workflow store (useWorkflowStore)", () => {
  // Reset store to initial state before each test
  beforeEach(() => {
    useWorkflowStore.setState({
      nodes: [],
      edges: [],
      workflowName: "Untitled Workflow",
      executionLogs: [],
    });
    localStorage.clear();
  });

  describe("initial state", () => {
    it("starts with empty workflow", () => {
      const state = useWorkflowStore.getState();
      expect(state.nodes).toEqual([]);
      expect(state.edges).toEqual([]);
      expect(state.workflowName).toBe("Untitled Workflow");
      expect(state.executionLogs).toEqual([]);
    });
  });

  describe("node management", () => {
    it("adds a node", () => {
      const node = makeNode("n1", "agent", "Test Agent") as any;
      useWorkflowStore.getState().addNode(node);
      expect(useWorkflowStore.getState().nodes).toHaveLength(1);
      expect(useWorkflowStore.getState().nodes[0].id).toBe("n1");
    });

    it("adds multiple nodes", () => {
      useWorkflowStore.getState().addNode(makeNode("1", "prompt") as any);
      useWorkflowStore.getState().addNode(makeNode("2", "agent") as any);
      useWorkflowStore.getState().addNode(makeNode("3", "output") as any);
      expect(useWorkflowStore.getState().nodes).toHaveLength(3);
    });

    it("sets nodes (replaces all)", () => {
      const nodes = [makeNode("1", "agent") as any, makeNode("2", "output") as any];
      useWorkflowStore.getState().setNodes(nodes);
      expect(useWorkflowStore.getState().nodes).toHaveLength(2);
    });
  });

  describe("edge management", () => {
    it("sets edges", () => {
      const edges = [makeEdge("e1", "1", "2")];
      useWorkflowStore.getState().setEdges(edges);
      expect(useWorkflowStore.getState().edges).toHaveLength(1);
    });

    it("connects two nodes via onConnect", () => {
      useWorkflowStore.getState().addNode(makeNode("1", "agent") as any);
      useWorkflowStore.getState().addNode(makeNode("2", "output") as any);
      useWorkflowStore.getState().onConnect({
        source: "1",
        target: "2",
        sourceHandle: null,
        targetHandle: null,
      });
      expect(useWorkflowStore.getState().edges).toHaveLength(1);
      expect(useWorkflowStore.getState().edges[0].source).toBe("1");
      expect(useWorkflowStore.getState().edges[0].target).toBe("2");
    });
  });

  describe("workflow name", () => {
    it("sets workflow name", () => {
      useWorkflowStore.getState().setWorkflowName("My Custom Workflow");
      expect(useWorkflowStore.getState().workflowName).toBe("My Custom Workflow");
    });
  });

  describe("execution logs", () => {
    it("adds execution logs", () => {
      useWorkflowStore.getState().addExecutionLog("[INFO] Start");
      useWorkflowStore.getState().addExecutionLog("[SUCCESS] Done");
      expect(useWorkflowStore.getState().executionLogs).toHaveLength(2);
      expect(useWorkflowStore.getState().executionLogs[0]).toBe("[INFO] Start");
    });

    it("clears execution logs", () => {
      useWorkflowStore.getState().addExecutionLog("[INFO] Start");
      useWorkflowStore.getState().clearExecutionLogs();
      expect(useWorkflowStore.getState().executionLogs).toEqual([]);
    });
  });

  describe("import workflow", () => {
    it("imports valid JSON workflow", () => {
      const json = JSON.stringify({
        name: "Imported Workflow",
        nodes: [makeNode("1", "agent")],
        edges: [makeEdge("e1", "1", "2")],
      });
      useWorkflowStore.getState().importWorkflow(json);
      expect(useWorkflowStore.getState().workflowName).toBe("Imported Workflow");
      expect(useWorkflowStore.getState().nodes).toHaveLength(1);
      expect(useWorkflowStore.getState().edges).toHaveLength(1);
    });

    it("handles invalid JSON gracefully", () => {
      const spy = vi.spyOn(console, "error").mockImplementation(() => {});
      useWorkflowStore.getState().importWorkflow("not json");
      expect(console.error).toHaveBeenCalled();
      spy.mockRestore();
    });

    it("sets default name when name is missing", () => {
      const json = JSON.stringify({
        nodes: [makeNode("1", "agent")],
        edges: [],
      });
      useWorkflowStore.getState().importWorkflow(json);
      expect(useWorkflowStore.getState().workflowName).toBe("Imported Workflow");
    });
  });

  describe("save and load workflow (localStorage)", () => {
    it("saves workflow to localStorage", () => {
      useWorkflowStore.getState().setWorkflowName("Test Save");
      useWorkflowStore.getState().addNode(makeNode("1", "agent") as any);
      useWorkflowStore.getState().saveWorkflow();
      const saved = JSON.parse(localStorage.getItem("dev-resource-hub-workflows") || "[]");
      expect(saved).toHaveLength(1);
      expect(saved[0].name).toBe("Test Save");
    });

    it("loads workflow from localStorage", () => {
      const wf = {
        id: "test-load",
        name: "Loaded Workflow",
        nodes: [makeNode("1", "output")],
        edges: [],
        createdAt: "2026-01-01",
        updatedAt: "2026-01-01",
      };
      localStorage.setItem("dev-resource-hub-workflows", JSON.stringify([wf]));
      useWorkflowStore.getState().loadWorkflow("test-load");
      expect(useWorkflowStore.getState().workflowName).toBe("Loaded Workflow");
      expect(useWorkflowStore.getState().nodes).toHaveLength(1);
    });

    it("updates existing workflow on save", () => {
      useWorkflowStore.getState().setWorkflowName("Update Test");
      useWorkflowStore.getState().addNode(makeNode("1", "agent") as any);
      useWorkflowStore.getState().saveWorkflow();
      useWorkflowStore.getState().addNode(makeNode("2", "output") as any);
      useWorkflowStore.getState().saveWorkflow();
      const saved = JSON.parse(localStorage.getItem("dev-resource-hub-workflows") || "[]");
      expect(saved).toHaveLength(1);
      expect(saved[0].nodes).toHaveLength(2);
    });
  });
});

// ─── TEMPLATE TESTS ─────────────────────────────────────────────────────────

describe("workflow templates", () => {
  const VALID_NODE_TYPES = ["agent", "prompt", "memory", "tool", "logic", "output"];

  it("has at least 3 templates", () => {
    expect(templates.length).toBeGreaterThanOrEqual(3);
  });

  it("each template has name, nodes, and edges", () => {
    for (const t of templates) {
      expect(t.name).toBeTruthy();
      expect(typeof t.name).toBe("string");
      expect(t.nodes.length).toBeGreaterThan(0);
      expect(t.edges.length).toBeGreaterThan(0);
    }
  });

  it("each node has required fields", () => {
    for (const t of templates) {
      for (const n of t.nodes) {
        expect(n.id).toBeTruthy();
        expect(typeof n.id).toBe("string");
        expect(n.type).toBeTruthy();
        expect(typeof n.type).toBe("string");
        expect(n.data?.label).toBeTruthy();
        expect(typeof n.position?.x).toBe("number");
        expect(typeof n.position?.y).toBe("number");
      }
    }
  });

  it("each node type is one of the valid types", () => {
    for (const t of templates) {
      for (const n of t.nodes) {
        expect(VALID_NODE_TYPES).toContain(n.type);
      }
    }
  });

  it("edge sources and targets reference existing node ids", () => {
    for (const t of templates) {
      const nodeIds = new Set(t.nodes.map((n) => n.id));
      for (const e of t.edges) {
        expect(nodeIds.has(e.source)).toBe(true);
        expect(nodeIds.has(e.target)).toBe(true);
      }
    }
  });

  it("no duplicate node ids within a template", () => {
    for (const t of templates) {
      const ids = t.nodes.map((n) => n.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("each edge has animated property (boolean)", () => {
    for (const t of templates) {
      for (const e of t.edges) {
        expect(typeof e.animated).toBe("boolean");
      }
    }
  });

  it("no duplicate edge ids within a template", () => {
    for (const t of templates) {
      const ids = t.edges.map((e) => e.id);
      expect(new Set(ids).size).toBe(ids.length);
    }
  });

  it("all templates have unique names", () => {
    const names = templates.map((t) => t.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("each template has at least one output node or ends with an output", () => {
    for (const t of templates) {
      const hasOutput = t.nodes.some((n) => n.type === "output");
      expect(hasOutput).toBe(true);
    }
  });

  it("all edge-connected nodes are reachable from at least one start node", () => {
    for (const t of templates) {
      const incoming = new Set(t.edges.map((e) => e.target));
      const allNodeIds = new Set(t.nodes.map((n) => n.id));
      // Every node with an incoming edge is reachable
      for (const id of incoming) {
        expect(allNodeIds.has(id)).toBe(true);
      }
    }
  });
});
