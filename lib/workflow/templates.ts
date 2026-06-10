import { WorkflowData } from "@/lib/workflow/store";

export const templates: Omit<WorkflowData, "id" | "createdAt" | "updatedAt">[] =
  [
    {
      name: "AI Research Workflow",
      nodes: [
        {
          id: "1",
          type: "prompt",
          position: { x: 250, y: 50 },
          data: {
            label: "Initial Prompt",
            description: "Analyze the state of AI agents in 2026.",
          },
        },
        {
          id: "2",
          type: "tool",
          position: { x: 250, y: 200 },
          data: {
            label: "Web Search",
            description: "Fetch latest papers & news.",
          },
        },
        {
          id: "3",
          type: "agent",
          position: { x: 250, y: 350 },
          data: {
            label: "Research Agent",
            description: "Synthesize findings into sections.",
          },
        },
        {
          id: "4",
          type: "output",
          position: { x: 250, y: 500 },
          data: {
            label: "Research Report",
            description: "Final compiled document.",
          },
        },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e2-3", source: "2", target: "3", animated: true },
        { id: "e3-4", source: "3", target: "4", animated: true },
      ],
    },
    {
      name: "Code Review Workflow",
      nodes: [
        {
          id: "1",
          type: "prompt",
          position: { x: 400, y: 50 },
          data: { label: "PR Diff Input", description: "Input code changes." },
        },
        {
          id: "2",
          type: "agent",
          position: { x: 200, y: 200 },
          data: {
            label: "Security Agent",
            description: "Check for vulnerabilities.",
          },
        },
        {
          id: "3",
          type: "agent",
          position: { x: 600, y: 200 },
          data: {
            label: "QA Agent",
            description: "Check for bugs & performance.",
          },
        },
        {
          id: "4",
          type: "agent",
          position: { x: 400, y: 400 },
          data: { label: "Lead Reviewer", description: "Compile feedback." },
        },
        {
          id: "5",
          type: "output",
          position: { x: 400, y: 550 },
          data: { label: "Review Comments", description: "Final PR comments." },
        },
      ],
      edges: [
        { id: "e1-2", source: "1", target: "2", animated: true },
        { id: "e1-3", source: "1", target: "3", animated: true },
        { id: "e2-4", source: "2", target: "4", animated: true },
        { id: "e3-4", source: "3", target: "4", animated: true },
        { id: "e4-5", source: "4", target: "5", animated: true },
      ],
    },
    {
      name: "AI Agent Chain",
      nodes: [
        {
          id: "1",
          type: "prompt",
          position: { x: 250, y: 50 },
          data: {
            label: "Task Definition",
            description: "What needs to be done?",
          },
        },
        {
          id: "2",
          type: "memory",
          position: { x: 50, y: 200 },
          data: {
            label: "Global Context",
            description: "Shared memory space.",
          },
        },
        {
          id: "3",
          type: "agent",
          position: { x: 250, y: 200 },
          data: {
            label: "Planner Agent",
            description: "Breaks task into steps.",
          },
        },
        {
          id: "4",
          type: "agent",
          position: { x: 250, y: 350 },
          data: { label: "Worker Agent", description: "Executes the plan." },
        },
        {
          id: "5",
          type: "output",
          position: { x: 250, y: 500 },
          data: { label: "Result", description: "Finished execution." },
        },
      ],
      edges: [
        { id: "e1-3", source: "1", target: "3", animated: true },
        { id: "e2-3", source: "2", target: "3", animated: true },
        { id: "e3-4", source: "3", target: "4", animated: true },
        { id: "e4-5", source: "4", target: "5", animated: true },
      ],
    },
  ];
