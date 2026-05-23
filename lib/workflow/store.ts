import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';

// Custom types for our workflows
export type WorkflowData = {
  id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  createdAt: string;
  updatedAt: string;
};

export type AppNode = Node & {
  data: {
    label?: string;
    description?: string;
    config?: any; // Additional configuration for the node
  };
};

type RFState = {
  nodes: AppNode[];
  edges: Edge[];
  workflowName: string;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: AppNode) => void;
  setWorkflowName: (name: string) => void;
  
  // Storage & Export
  saveWorkflow: () => void;
  loadWorkflow: (id: string) => void;
  exportWorkflow: () => void;
  importWorkflow: (jsonString: string) => void;
  
  // Simulation
  executionLogs: string[];
  addExecutionLog: (log: string) => void;
  clearExecutionLogs: () => void;
};

const LOCAL_STORAGE_KEY = 'dev-resource-hub-workflows';

export const useWorkflowStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  workflowName: 'Untitled Workflow',

  onNodesChange: (changes: NodeChange<AppNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge({ ...connection, animated: true }, get().edges),
    });
  },
  setNodes: (nodes: AppNode[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  addNode: (node: AppNode) => {
    set({ nodes: [...get().nodes, node] });
  },
  setWorkflowName: (name: string) => {
    set({ workflowName: name });
  },

  // Save to LocalStorage
  saveWorkflow: () => {
    const { nodes, edges, workflowName } = get();
    const existingStr = localStorage.getItem(LOCAL_STORAGE_KEY) || '[]';
    let existingWorkflows: WorkflowData[] = [];
    try {
      existingWorkflows = JSON.parse(existingStr);
    } catch (e) {
      existingWorkflows = [];
    }

    // Determine ID based on name (slugify)
    const id = workflowName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const existingIndex = existingWorkflows.findIndex(w => w.id === id);

    const now = new Date().toISOString();
    const newWorkflow: WorkflowData = {
      id,
      name: workflowName,
      nodes,
      edges,
      createdAt: existingIndex >= 0 ? existingWorkflows[existingIndex].createdAt : now,
      updatedAt: now,
    };

    if (existingIndex >= 0) {
      existingWorkflows[existingIndex] = newWorkflow;
    } else {
      existingWorkflows.push(newWorkflow);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingWorkflows));
    // Could dispatch a toast here
  },

  // Load from LocalStorage
  loadWorkflow: (id: string) => {
    const existingStr = localStorage.getItem(LOCAL_STORAGE_KEY) || '[]';
    try {
      const existingWorkflows: WorkflowData[] = JSON.parse(existingStr);
      const target = existingWorkflows.find(w => w.id === id);
      if (target) {
        set({
          nodes: target.nodes,
          edges: target.edges,
          workflowName: target.name,
        });
      }
    } catch (e) {
      console.error('Failed to load workflow', e);
    }
  },

  // Export JSON file
  exportWorkflow: () => {
    const { nodes, edges, workflowName } = get();
    const data: Omit<WorkflowData, 'id' | 'createdAt' | 'updatedAt'> = {
      name: workflowName,
      nodes,
      edges,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflowName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Import JSON string
  importWorkflow: (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.nodes && parsed.edges) {
        set({
          nodes: parsed.nodes,
          edges: parsed.edges,
          workflowName: parsed.name || 'Imported Workflow',
        });
      }
    } catch (e) {
      console.error('Failed to import workflow', e);
    }
  },

  executionLogs: [],
  addExecutionLog: (log: string) => {
    set({ executionLogs: [...get().executionLogs, log] });
  },
  clearExecutionLogs: () => {
    set({ executionLogs: [] });
  }
}));
