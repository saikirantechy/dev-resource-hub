"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Layers, CheckCircle, ArrowRight, Plus, ListChecks } from "lucide-react";
import Navbar from "@/components/Navbar";

const sampleEpics = [
  {
    name: "User Authentication System",
    features: [
      { name: "Sign Up / Login", tasks: ["Email/password auth UI", "OAuth provider integration", "Session management", "Password reset flow"], subtasks: 12 },
      { name: "Authorization", tasks: ["Role-based access control", "Permission matrix", "Admin dashboard gates"], subtasks: 8 },
      { name: "Profile Management", tasks: ["Avatar upload", "Profile edit form", "Account deletion flow"], subtasks: 7 },
    ],
  },
  {
    name: "AI Agent Platform",
    features: [
      { name: "Agent Runner", tasks: ["Sandboxed execution env", "Tool registration system", "Memory persistence"], subtasks: 15 },
      { name: "Prompt Management", tasks: ["Version history", "Template library", "A/B testing"], subtasks: 10 },
      { name: "Monitoring", tasks: ["Token usage tracking", "Cost analytics", "Error logging"], subtasks: 9 },
    ],
  },
  {
    name: "Developer Dashboard",
    features: [
      { name: "Analytics", tasks: ["Usage charts", "Real-time metrics", "Export reports"], subtasks: 11 },
      { name: "API Keys", tasks: ["Key generation", "Rate limit config", "Usage per key"], subtasks: 6 },
    ],
  },
];

export default function TasksPage() {
  const [activeEpic, setActiveEpic] = useState(0);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-amber inline-flex"><Wrench size={11} /> Task Breakdown Engine</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                From <span className="gradient-text-hero">Epics</span> to <span className="gradient-text-blue">Actionable Tasks</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Break down large requirements into epics, features, tasks, and subtasks — ready for Agile, Scrum, or startup execution.
              </p>
            </div>

            {/* Epic Selector */}
            <div className="flex flex-wrap gap-2">
              {sampleEpics.map((epic, i) => (
                <button
                  key={epic.name}
                  onClick={() => setActiveEpic(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeEpic === i
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <Layers size={14} />
                  {epic.name}
                </button>
              ))}
            </div>

            {/* Epic Breakdown */}
            <div className="space-y-6">
              {sampleEpics[activeEpic].features.map((feat, fi) => (
                <motion.div
                  key={feat.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: fi * 0.1 }}
                  className="rounded-2xl glass-strong border border-white/8 overflow-hidden"
                >
                  <div className="p-5 bg-gradient-to-r from-amber-500/5 to-orange-500/5 border-b border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center">
                          <ListChecks size={14} className="text-amber-400" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{feat.name}</h3>
                          <div className="text-[10px] text-gray-500">{feat.subtasks} subtasks across {feat.tasks.length} tasks</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    {feat.tasks.map((task, ti) => (
                      <div key={task} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                        <CheckCircle size={12} className="text-gray-600 shrink-0" />
                        <span className="text-xs text-gray-300 flex-1">{task}</span>
                        <div className="flex items-center gap-1 text-[10px] text-gray-500">
                          <Plus size={10} /> {Math.floor(Math.random() * 3) + 1} subtasks
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Agile Workflow */}
            <div className="rounded-3xl glass border border-white/8 p-8 text-center">
              <h2 className="text-lg font-black mb-2">Agile-Ready Breakdown</h2>
              <p className="text-sm text-gray-400 mb-4">Epic → Feature → Task → Subtask</p>
              <div className="flex items-center justify-center gap-3 text-xs">
                <span className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold">Epic</span>
                <ArrowRight size={14} className="text-gray-600" />
                <span className="px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 font-bold">Feature</span>
                <ArrowRight size={14} className="text-gray-600" />
                <span className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold">Task</span>
                <ArrowRight size={14} className="text-gray-600" />
                <span className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold">Subtask</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
