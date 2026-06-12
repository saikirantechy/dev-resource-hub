"use client";

import { motion } from "framer-motion";
import { Layers, HardDrive, Bookmark, Database, Clock, RefreshCw, FileText, GitBranch } from "lucide-react";
import Navbar from "@/components/Navbar";

const contextFeatures = [
  { name: "Long Context Storage", description: "Store entire codebase context for AI agents to reference across sessions", icon: Database, color: "from-blue-500 to-cyan-500" },
  { name: "Project Memory", description: "Persistent memory of project decisions, architecture choices, and conventions", icon: HardDrive, color: "from-purple-500 to-pink-500" },
  { name: "Requirements Tracking", description: "Track requirements from inception to implementation with full traceability", icon: FileText, color: "from-emerald-500 to-teal-500" },
  { name: "Agent Memory", description: "Each agent maintains its own context window with task-specific knowledge", icon: Layers, color: "from-orange-500 to-red-500" },
  { name: "Context History", description: "View and restore previous context states with full version history", icon: Clock, color: "from-indigo-500 to-blue-500" },
  { name: "Auto-Refresh", description: "Context automatically refreshes when files change or new decisions are made", icon: RefreshCw, color: "from-rose-500 to-pink-500" },
  { name: "Bookmarked Contexts", description: "Save important context snapshots for quick recall", icon: Bookmark, color: "from-yellow-500 to-orange-500" },
  { name: "Diff Tracking", description: "See how context evolves over time with visual diffs", icon: GitBranch, color: "from-cyan-500 to-blue-500" },
];

export default function ContextManagerPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-blue inline-flex"><Layers size={11} /> Context Manager</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-hero">Advanced Context</span> Management
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Project-wide memory that persists across sessions. Every agent, every decision, every requirement tracked in one unified context layer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contextFeatures.map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl glass-strong border border-white/8 p-5 group"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color}/20 border ${f.color.replace("from-", "").split(" ")[0]}/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <f.icon size={18} className={`${f.color.replace("from-", "text-").split(" ")[0]}`} />
                  </div>
                  <h3 className="text-xs font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{f.name}</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
