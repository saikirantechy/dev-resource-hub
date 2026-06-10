"use client";

import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import {
  Plus,
  Play,
  Save,
  Bot,
  Code2,
  Globe,
  Database,
  Trash2,
  Settings2,
  Sparkles,
  Wand2,
  Info,
  ArrowRight,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NodeTemplate {
  type: "agent" | "tool" | "trigger";
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  color: string;
}

interface Node extends NodeTemplate {
  id: string;
  x: number;
  y: number;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

const AVAILABLE_NODES: NodeTemplate[] = [
  { type: "agent", label: "Devin AI", icon: Bot, color: "blue" },
  { type: "agent", label: "Manus", icon: Bot, color: "purple" },
  { type: "tool", label: "v0.dev", icon: Code2, color: "emerald" },
  { type: "tool", label: "Supabase", icon: Database, color: "emerald" },
  { type: "trigger", label: "GitHub Webhook", icon: Globe, color: "orange" },
];

const NODE_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
};

let nodeCounter = 3;

function generateUniqueId(): string {
  return `node-${nodeCounter++}`;
}

export default function WorkflowClient() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      type: "trigger",
      label: "GitHub Webhook",
      x: 100,
      y: 200,
      icon: Globe,
      color: "orange",
    },
    {
      id: "2",
      type: "agent",
      label: "Devin AI",
      x: 400,
      y: 200,
      icon: Bot,
      color: "blue",
    },
  ]);
  const [connections, setConnections] = useState<Connection[]>([
    { id: "c1", from: "1", to: "2" },
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const addNode = (template: NodeTemplate) => {
    const newNode: Node = {
      id: generateUniqueId(),
      ...template,
      x: 250,
      y: 200,
    };
    setNodes([...nodes, newNode]);
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter((n) => n.id !== id));
    setConnections(connections.filter((c) => c.from !== id && c.to !== id));
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col lg:flex-row relative">
        {/* Sidebar: Node Library */}
        <aside className="w-full lg:w-72 bg-[#0a0a0f] border-r border-white/5 p-6 space-y-8 z-20">
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-500">
              Node Library
            </h2>
            <p className="text-xs text-gray-600">
              Drag or click to add components to your AI workflow.
            </p>
          </div>

          <div className="space-y-3">
            {AVAILABLE_NODES.map((node) => (
              <button
                key={node.label}
                onClick={() => addNode(node)}
                className="w-full p-4 rounded-2xl glass border border-white/5 hover:border-blue-500/30 transition-all text-left flex items-center gap-4 group"
              >
                <div
                  className={`p-2.5 rounded-xl ${NODE_COLORS[node.color]?.bg || "bg-white/5"} ${NODE_COLORS[node.color]?.border || "border-white/10"} ${NODE_COLORS[node.color]?.text || "text-gray-400"} group-hover:scale-110 transition-transform`}
                >
                  <node.icon size={18} />
                </div>
                <div>
                  <div className="text-sm font-bold">{node.label}</div>
                  <div className="text-[10px] text-gray-500 uppercase">
                    {node.type}
                  </div>
                </div>
                <Plus
                  size={14}
                  className="ml-auto text-gray-600 group-hover:text-white"
                />
              </button>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Sparkles size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">
                AI Suggestion
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Based on your stack, we recommend adding{" "}
              <span className="text-white">v0.dev</span> for the UI layer.
            </p>
          </div>
        </aside>

        {/* Main Canvas */}
        <main className="flex-1 relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-95">
          {/* Canvas Toolbar */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-none">
            <div className="flex items-center gap-3 p-1.5 glass rounded-2xl border border-white/10 pointer-events-auto">
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                <Settings2 size={18} />
              </button>
              <div className="w-px h-4 bg-white/10" />
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                <Layers size={18} />
              </button>
              <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white">
                <Info size={18} />
              </button>
            </div>

            <div className="flex items-center gap-3 pointer-events-auto">
              <button className="btn-secondary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                <Save size={14} /> Save Draft
              </button>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="btn-primary px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
              >
                {isRunning ? (
                  <Sparkles size={14} className="animate-spin" />
                ) : (
                  <Play size={14} />
                )}
                {isRunning ? "Executing..." : "Run Workflow"}
              </button>
            </div>
          </div>

          {/* Node Canvas */}
          <div
            className="absolute inset-0 overflow-auto cursor-crosshair"
            ref={canvasRef}
          >
            <div className="relative w-[2000px] h-[2000px]">
              {/* SVG Connections Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <linearGradient
                    id="line-grad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                {connections.map((conn) => {
                  const fromNode = nodes.find((n) => n.id === conn.from);
                  const toNode = nodes.find((n) => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  return (
                    <motion.path
                      key={conn.id}
                      d={`M ${fromNode.x + 150} ${fromNode.y + 40} C ${fromNode.x + 250} ${fromNode.y + 40}, ${toNode.x - 50} ${toNode.y + 40}, ${toNode.x} ${toNode.y + 40}`}
                      fill="none"
                      stroke="url(#line-grad)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: 1,
                        opacity: 0.3,
                        strokeDashoffset: isRunning ? [0, -20] : 0,
                      }}
                      transition={{
                        pathLength: { duration: 1 },
                        strokeDashoffset: {
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        },
                      }}
                    />
                  );
                })}
              </svg>

              {/* Nodes Layer */}
              <AnimatePresence>
                {nodes.map((node) => (
                  <motion.div
                    key={node.id}
                    drag
                    dragMomentum={false}
                    onDrag={(_, info) => {
                      setNodes(
                        nodes.map((n) =>
                          n.id === node.id
                            ? {
                                ...n,
                                x: n.x + info.delta.x,
                                y: n.y + info.delta.y,
                              }
                            : n,
                        ),
                      );
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute w-60 z-10"
                    style={{ left: node.x, top: node.y }}
                  >
                    <div className="p-5 rounded-2xl glass border border-white/10 hover:border-blue-500/40 transition-all cursor-grab active:cursor-grabbing shadow-2xl relative group">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`p-2.5 rounded-xl ${NODE_COLORS[node.color]?.bg || "bg-white/5"} ${NODE_COLORS[node.color]?.border || "border-white/10"} ${NODE_COLORS[node.color]?.text || "text-gray-400"}`}
                        >
                          <node.icon size={20} />
                        </div>
                        <button
                          onClick={() => removeNode(node.id)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                          {node.type}
                        </div>
                        <h3 className="font-bold text-white">{node.label}</h3>
                      </div>

                      {/* Connection Ports */}
                      <div className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#050508] -translate-y-1/2" />
                      <div className="absolute top-1/2 -right-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-[#050508] -translate-y-1/2" />

                      {/* Active State Glow */}
                      {isRunning && (
                        <motion.div
                          className="absolute inset-0 rounded-2xl border-2 border-blue-500/50 -z-10"
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Workflow Stats Overlay */}
          <div className="absolute bottom-6 left-6 p-4 glass rounded-2xl border border-white/5 space-y-2 z-30">
            <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              Workflow Metadata
            </div>
            <div className="flex gap-4">
              <div className="text-xs">
                <span className="text-white font-bold">{nodes.length}</span>{" "}
                Nodes
              </div>
              <div className="text-xs">
                <span className="text-white font-bold">
                  {connections.length}
                </span>{" "}
                Connections
              </div>
              <div className="text-xs text-emerald-400 font-bold">Valid</div>
            </div>
          </div>
        </main>

        {/* Right Sidebar: Execution Log */}
        <aside className="hidden xl:flex w-80 bg-[#0a0a0f] border-l border-white/5 flex-col z-20">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-500">
              Execution Log
            </h2>
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </div>
          <div className="flex-1 p-6 font-mono text-[11px] space-y-4 overflow-y-auto text-gray-500">
            {isRunning ? (
              <div className="space-y-3">
                <div className="text-blue-400 animate-pulse">
                  [0.1s] Triggering GitHub Webhook...
                </div>
                <div
                  className="text-white animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  [0.8s] Initializing Devin AI agent context
                </div>
                <div
                  className="text-white animate-fade-in"
                  style={{ animationDelay: "1.2s" }}
                >
                  [1.5s] Agent connected to repository. Analyzing issue #42...
                </div>
                <div
                  className="text-emerald-400 animate-fade-in font-bold"
                  style={{ animationDelay: "2.5s" }}
                >
                  [3.0s] Workflow execution completed successfully.
                </div>
              </div>
            ) : (
              <div className="text-center py-20 opacity-30">
                <Wand2 size={24} className="mx-auto mb-4" />
                Ready to execute
              </div>
            )}
          </div>
          <div className="p-6 border-t border-white/5 space-y-3">
            <h3 className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
              Deploy Options
            </h3>
            <button className="w-full py-3 rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-bold hover:bg-blue-600/20 transition-all flex items-center justify-center gap-2">
              Generate Cloud Config <ArrowRight size={14} />
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
