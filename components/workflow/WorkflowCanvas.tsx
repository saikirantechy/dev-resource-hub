import { useCallback, useRef, useState, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useWorkflowStore } from "@/lib/workflow/store";
import { nodeTypes } from "@/lib/workflow/nodeTypes";

function Canvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } =
    useWorkflowStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<{ screenToFlowPosition: (pos: { x: number; y: number }) => { x: number; y: number } } | null>(null);

  useEffect(() => {
    // Check if we have a forked workflow to load
    const forkedJSON = localStorage.getItem("forkedWorkflow");
    if (forkedJSON) {
      try {
        const parsed = JSON.parse(forkedJSON);
        if (parsed.nodes && parsed.edges) {
          useWorkflowStore.getState().setNodes(parsed.nodes);
          useWorkflowStore.getState().setEdges(parsed.edges);
          useWorkflowStore
            .getState()
            .setWorkflowName(parsed.name || "Forked Workflow");
          localStorage.removeItem("forkedWorkflow"); // Clean up after loading
        }
      } catch (e) {
        console.error("Failed to load forked workflow", e);
      }
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      const label = event.dataTransfer.getData("application/reactflow-label");

      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!reactFlowInstance) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: label },
      };

      addNode(newNode);
    },
    [reactFlowInstance, addNode],
  );

  return (
    <div className="w-full h-full flex-1 relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-black/90"
        defaultEdgeOptions={{
          animated: true,
          style: {
            stroke: "#22d3ee",
            strokeWidth: 2,
            filter: "drop-shadow(0 0 5px rgba(34,211,238,0.5))",
          },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="#333"
        />
        <Controls className="!bg-black/50 !border-white/10 !fill-gray-400" />
        <MiniMap
          className="!bg-black/80 !border !border-white/10 !rounded-xl"
          nodeColor={(n) => {
            if (n.type === "prompt") return "#c084fc"; // purple
            if (n.type === "agent") return "#22d3ee"; // cyan
            if (n.type === "memory") return "#facc15"; // yellow
            if (n.type === "tool") return "#fb923c"; // orange
            if (n.type === "logic") return "#818cf8"; // indigo
            if (n.type === "output") return "#34d399"; // emerald
            return "#555";
          }}
          maskColor="rgba(0, 0, 0, 0.7)"
        />
      </ReactFlow>
    </div>
  );
}

export default function WorkflowCanvas() {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
}
