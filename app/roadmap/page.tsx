"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, ThumbsUp, MessageSquare, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

const roadmapItems = [
  { phase: "Now", items: [{ name: "LLM-Powered AI Assistant", description: "Replace rule-based mock with real LLM integration", votes: 342, status: "in-progress" }, { name: "Prompt Marketplace", description: "Community prompt sharing with ratings + remix", votes: 289, status: "planned" }, { name: "Agent Marketplace", description: "Marketplace for Planner, Architect, QA, Security agents", votes: 256, status: "planned" }] },
  { phase: "Next", items: [{ name: "Workflow Builder v2", description: "LangGraph-style enhanced canvas", votes: 198, status: "planned" }, { name: "User Profiles", description: "Per-user profile pages with portfolio", votes: 167, status: "planned" }, { name: "VS Code Extension", description: "Inline token preview extension", votes: 145, status: "planned" }] },
  { phase: "Later", items: [{ name: "SaaS Tier", description: "Pro features — history, versioning, workspaces", votes: 98, status: "planned" }, { name: "Browser Extension", description: "Optimize prompts in any text field", votes: 87, status: "planned" }, { name: "API Access", description: "Tokens for third-party integration", votes: 65, status: "planned" }] },
];

export default function RoadmapPage() {
  const [voted, setVoted] = useState<Set<string>>(new Set());

  const toggleVote = (name: string) => {
    setVoted((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-blue inline-flex"><Compass size={11} /> Roadmap Portal</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-hero">Platform</span> Roadmap
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Vote on features, track progress, and influence what we build next.
              </p>
            </div>

            <div className="space-y-8">
              {roadmapItems.map((phase) => (
                <div key={phase.phase}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-lg font-black ${phase.phase === "Now" ? "text-emerald-400" : phase.phase === "Next" ? "text-blue-400" : "text-gray-400"}`}>
                      {phase.phase}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {phase.items.map((item) => (
                      <motion.div key={item.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl glass-strong border border-white/8 p-5 group">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-sm font-bold text-white">{item.name}</h3>
                          <span className={`badge ${item.status === "in-progress" ? "badge-emerald" : "badge-blue"} text-[8px]`}>{item.status}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 mb-4">{item.description}</p>
                        <button onClick={() => toggleVote(item.name)} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${voted.has(item.name) ? "bg-blue-500/20 border border-blue-500/30 text-blue-300" : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"}`}>
                          <ThumbsUp size={10} /> {voted.has(item.name) ? "Voted" : "Vote"} · {item.votes + (voted.has(item.name) ? 1 : 0)}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
