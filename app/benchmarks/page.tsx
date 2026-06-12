"use client";

import { useState } from "react";
import { motion } from "framer-motion";import { BarChart3, Cpu, Brain, Code, Clock, Award, Search, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";

const benchmarkCategories = [
  {
    id: "coding",
    label: "Coding Benchmarks",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    metrics: [
      { name: "HumanEval Pass@1", leader: "Claude Opus 4", score: "92.4%", runnerUp: "GPT-4.1", runnerScore: "89.2%" },
      { name: "SWE-Bench Verified", leader: "Claude 4.5 Sonnet", score: "71.8%", runnerUp: "GPT-4o", runnerScore: "65.2%" },
      { name: "LiveCodeBench", leader: "Claude Opus 4", score: "68.3%", runnerUp: "o4-mini", runnerScore: "64.1%" },
      { name: "CodeContests", leader: "GPT-4.1", score: "47.2%", runnerUp: "Claude Opus 4", runnerScore: "44.6%" },
    ],
  },
  {
    id: "reasoning",
    label: "Reasoning & Math",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    metrics: [
      { name: "GPQA Diamond", leader: "Claude Opus 4", score: "79.2%", runnerUp: "GPT-4.1", runnerScore: "74.8%" },
      { name: "MATH-500", leader: "o3", score: "96.1%", runnerUp: "Claude Opus 4", runnerScore: "94.3%" },
      { name: "MMLU-Pro", leader: "Claude Opus 4", score: "84.5%", runnerUp: "Gemini 2.5 Pro", runnerScore: "82.1%" },
      { name: "ARC AGI", leader: "o3", score: "87.5%", runnerUp: "GPT-4.1", runnerScore: "72.3%" },
    ],
  },
  {
    id: "agents",
    label: "Agent Benchmarks",
    icon: Cpu,
    color: "from-emerald-500 to-teal-500",
    metrics: [
      { name: "GAIA (Avg)", leader: "AutoGen + GPT-4o", score: "64.8%", runnerUp: "LangGraph + Claude", runnerScore: "59.2%" },
      { name: "AgentBench", leader: "CrewAI + Claude", score: "72.3%", runnerUp: "AutoGen + GPT-4o", runnerScore: "68.1%" },
      { name: "WebArena", leader: "Claude Code", score: "48.5%", runnerUp: "Devin", runnerScore: "43.2%" },
      { name: "MINT-1.0", leader: "OpenHands + GPT-4o", score: "56.7%", runnerUp: "Claude Opus 4", runnerScore: "52.1%" },
    ],
  },
  {
    id: "speed",
    label: "Speed & Cost",
    icon: Clock,
    color: "from-orange-500 to-red-500",
    metrics: [
      { name: "Tokens/sec (Output)", leader: "GPT-4o Mini", score: "482 t/s", runnerUp: "Claude 4.5 Haiku", runnerScore: "398 t/s" },
      { name: "TTFT (Time-to-First-Token)", leader: "GPT-4o Mini", score: "212ms", runnerUp: "DeepSeek V3", runnerScore: "284ms" },
      { name: "Cost / 1M Tokens (Input)", leader: "DeepSeek V3", score: "$0.27", runnerUp: "GPT-4o Mini", runnerScore: "$0.15" },
      { name: "Cost / 1M Tokens (Output)", leader: "DeepSeek V3", score: "$1.10", runnerUp: "GPT-4o Mini", runnerScore: "$0.60" },
    ],
  },
];

const topPerformers = [
  { rank: 1, name: "Claude Opus 4", score: 94, category: "Overall", color: "from-purple-500 to-pink-500" },
  { rank: 2, name: "GPT-4.1", score: 91, category: "Overall", color: "from-green-500 to-teal-500" },
  { rank: 3, name: "Claude 4.5 Sonnet", score: 87, category: "Overall", color: "from-blue-500 to-cyan-500" },
  { rank: 4, name: "Gemini 2.5 Pro", score: 83, category: "Overall", color: "from-orange-500 to-yellow-500" },
  { rank: 5, name: "o4-mini", score: 79, category: "Overall", color: "from-emerald-500 to-teal-500" },
];

const ideBenchmarks = [
  { name: "Cursor", score: 94, category: "AI IDE", speed: 88, accuracy: 95, features: 96 },
  { name: "Windsurf", score: 89, category: "AI IDE", speed: 90, accuracy: 87, features: 91 },
  { name: "Claude Code", score: 92, category: "CLI Agent", speed: 86, accuracy: 94, features: 93 },
  { name: "GitHub Copilot", score: 85, category: "AI IDE", speed: 92, accuracy: 83, features: 84 },
  { name: "Devin", score: 78, category: "Autonomous", speed: 72, accuracy: 81, features: 88 },
  { name: "Replit Agent", score: 76, category: "Autonomous", speed: 80, accuracy: 74, features: 79 },
  { name: "Kiro", score: 82, category: "AI IDE", speed: 88, accuracy: 80, features: 83 },
  { name: "v0", score: 86, category: "UI Builder", speed: 91, accuracy: 84, features: 87 },
  { name: "Bolt.new", score: 80, category: "UI Builder", speed: 85, accuracy: 78, features: 82 },
  { name: "Lovable", score: 79, category: "Full-Stack", speed: 82, accuracy: 76, features: 85 },
];

export default function BenchmarksPage() {
  const [activeCategory, setActiveCategory] = useState("coding");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIDEs = ideBenchmarks.filter((ide) =>
    ide.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        {/* Hero */}
        <section className="px-4 sm:px-6 pt-24 pb-12 text-center relative overflow-hidden">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-orange-500/8 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="badge badge-orange inline-flex"><BarChart3 size={11} /> Benchmark Center</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
              <span className="gradient-text-blue">AI Benchmark</span> Center
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Real performance data across models, coding tools, agents, and IDEs. Updated weekly.
            </p>
          </div>
        </section>

        {/* Top Performers Podium */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2">
              <Award size={20} className="text-yellow-400" /> Top Performers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {topPerformers.map((p) => (
                <motion.div
                  key={p.rank}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: p.rank * 0.1 }}
                  className={`rounded-2xl p-5 bg-gradient-to-br ${p.color}/10 border ${p.color.replace("from-", "").split(" ")[0]}/20 text-center relative overflow-hidden`}
                >
                  <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-lg font-black text-white shadow-lg`}>
                    #{p.rank}
                  </div>
                  <div className="text-2xl font-black mt-2">{p.score}</div>
                  <div className="text-sm font-bold text-white mt-1">{p.name}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{p.category}</div>
                  <div className="mt-3 w-full bg-black/30 rounded-full h-1.5">
                    <div className={`h-full rounded-full bg-gradient-to-r ${p.color}`} style={{ width: `${p.score}%` }} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="px-4 sm:px-6 pb-16">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-wrap gap-2">
              {benchmarkCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white`
                      : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <cat.icon size={14} />
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {benchmarkCategories
                .find((c) => c.id === activeCategory)
                ?.metrics.map((m, i) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl glass-strong border border-white/8 p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-white">{m.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
                        <Trophy size={16} className="text-emerald-400 shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Leader</div>
                          <div className="text-sm font-bold text-white">{m.leader}</div>
                          <div className="text-xs font-bold text-emerald-400">{m.score}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
                        <Award size={16} className="text-gray-400 shrink-0" />
                        <div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider">Runner Up</div>
                          <div className="text-sm font-bold text-white">{m.runnerUp}</div>
                          <div className="text-xs font-bold text-gray-400">{m.runnerScore}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* IDE / Tool Benchmarks */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-6xl mx-auto space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Code size={20} className="text-blue-400" /> IDE & Tool Benchmarks
            </h2>
            <div className="relative">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-blue-400/40"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-gray-500 border-b border-white/5">
                    <th className="text-left py-3 px-2 font-bold">Tool</th>
                    <th className="text-left py-3 px-2 font-bold">Category</th>
                    <th className="text-center py-3 px-2 font-bold">Overall</th>
                    <th className="text-center py-3 px-2 font-bold">Speed</th>
                    <th className="text-center py-3 px-2 font-bold">Accuracy</th>
                    <th className="text-center py-3 px-2 font-bold">Features</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIDEs.map((ide, i) => (
                    <motion.tr
                      key={ide.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-3 px-2">
                        <span className="font-bold text-white">{ide.name}</span>
                      </td>
                      <td className="py-3 px-2 text-gray-400">{ide.category}</td>
                      <td className="py-3 px-2 text-center">
                        <span className={`font-bold ${ide.score >= 90 ? "text-emerald-400" : ide.score >= 80 ? "text-blue-400" : "text-orange-400"}`}>
                          {ide.score}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-black/30 rounded-full h-1.5">
                            <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" style={{ width: `${ide.speed}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 w-6 text-right">{ide.speed}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-black/30 rounded-full h-1.5">
                            <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: `${ide.accuracy}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 w-6 text-right">{ide.accuracy}</span>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-16 bg-black/30 rounded-full h-1.5">
                            <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${ide.features}%` }} />
                          </div>
                          <span className="text-xs text-gray-400 w-6 text-right">{ide.features}</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
