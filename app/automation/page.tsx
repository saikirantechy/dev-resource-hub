"use client";

import { motion } from "framer-motion";
import { Cpu, FileText, Beaker, GitCompare, RefreshCw, FileCode, BookOpen, BarChart, Zap, Download } from "lucide-react";
import Navbar from "@/components/Navbar";

const automations = [
  { name: "Auto Unit Tests", description: "Generate unit tests for every new or changed function", icon: Beaker, color: "from-emerald-500 to-teal-500", frequency: "On file save", output: "test/*.test.ts" },
  { name: "Auto Documentation", description: "Generate JSDoc, README updates, and API docs from code", icon: BookOpen, color: "from-blue-500 to-cyan-500", frequency: "On commit", output: "docs/" },
  { name: "Auto Refactoring", description: "Detect code smells and apply refactoring patterns", icon: GitCompare, color: "from-purple-500 to-pink-500", frequency: "Weekly", output: "Refactored files" },
  { name: "Auto Performance", description: "Identify bottlenecks and suggest optimizations", icon: BarChart, color: "from-orange-500 to-red-500", frequency: "On PR", output: "perf-report.md" },
  { name: "Auto PR Description", description: "Generate comprehensive PR descriptions from diffs", icon: FileCode, color: "from-indigo-500 to-blue-500", frequency: "On PR open", output: "PR body" },
  { name: "Auto Release Notes", description: "Generate release notes from commit history", icon: Download, color: "from-rose-500 to-pink-500", frequency: "On tag", output: "CHANGELOG.md" },
];

const workflowStages = [
  { step: 1, name: "Trigger", description: "Event occurs (file save, commit, PR, schedule)", icon: Zap },
  { step: 2, name: "Detect", description: "Agent detects the change and determines context", icon: Cpu },
  { step: 3, name: "Execute", description: "Agent runs pre-defined prompt against codebase", icon: FileText },
  { step: 4, name: "Verify", description: "Output is validated (tests pass, lint clean)", icon: Beaker },
  { step: 5, name: "Apply", description: "Changes are applied or PR is created", icon: RefreshCw },
];

export default function AutomationPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-violet inline-flex"><Cpu size={11} /> Autonomous Workflows</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-hero">Automate Tasks</span> in Seconds
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                AI agents autonomously execute in the background based on triggers — generating docs, unit tests, or optimizing performance while you focus on building.
              </p>
            </div>

            {/* Workflow Stages */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {workflowStages.map((stage) => (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: stage.step * 0.08 }}
                  className="rounded-2xl glass border border-white/8 p-4 text-center group hover:border-emerald-400/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <stage.icon size={16} className="text-emerald-400" />
                  </div>
                  <div className="text-xs font-bold text-white">{stage.name}</div>
                  <div className="text-[9px] text-gray-500 mt-1">{stage.description}</div>
                </motion.div>
              ))}
            </div>

            {/* Automation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {automations.map((a, i) => (
                <motion.div
                  key={a.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl glass-strong border border-white/8 p-5 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.color}/20 border ${a.color.replace("from-", "").split(" ")[0]}/20 flex items-center justify-center`}>
                      <a.icon size={18} className={`${a.color.replace("from-", "text-").split(" ")[0]}`} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{a.name}</div>
                      <div className="text-[10px] text-gray-500">{a.frequency}</div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mb-3">{a.description}</p>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-gray-500">Output:</span>
                    <span className="font-mono text-emerald-400">{a.output}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
