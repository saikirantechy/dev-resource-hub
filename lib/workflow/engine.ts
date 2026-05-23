import { useWorkflowStore, AppNode } from '@/lib/workflow/store';
import { Edge } from '@xyflow/react';

// Basic simulated execution engine
export const simulateExecution = async (nodes: AppNode[], edges: Edge[]) => {
  const store = useWorkflowStore.getState();
  
  if (nodes.length === 0) {
    store.addExecutionLog('[ERROR] Workflow is empty. Add nodes to execute.');
    return;
  }

  // Find starting nodes (nodes with no incoming edges)
  const incomingEdgeTargets = new Set(edges.map(e => e.target));
  const startNodes = nodes.filter(n => !incomingEdgeTargets.has(n.id));

  if (startNodes.length === 0) {
    store.addExecutionLog('[ERROR] No clear starting node detected (cyclic graph without entry point).');
    return;
  }

  store.addExecutionLog(`[INFO] Starting workflow execution... (${nodes.length} nodes)`);

  // Basic BFS traversal for simulation
  let queue = [...startNodes];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const current = queue.shift()!;
    
    if (visited.has(current.id)) continue;
    visited.add(current.id);

    // Simulate work
    const nodeLabel = current.data?.label || current.type?.toUpperCase() || 'Unknown Node';
    store.addExecutionLog(`Running ${nodeLabel}...`);
    
    // Simulate async delay
    await new Promise(resolve => setTimeout(resolve, 800));

    if (current.type === 'output') {
      store.addExecutionLog(`[SUCCESS] Output generated successfully.`);
    } else {
      store.addExecutionLog(`[SUCCESS] ${nodeLabel} completed.`);
    }

    // Find next nodes
    const outgoingEdges = edges.filter(e => e.source === current.id);
    const nextNodeIds = outgoingEdges.map(e => e.target);
    const nextNodes = nodes.filter(n => nextNodeIds.includes(n.id));

    queue.push(...nextNodes);
  }

  store.addExecutionLog(`[INFO] Workflow execution finished.`);
};
