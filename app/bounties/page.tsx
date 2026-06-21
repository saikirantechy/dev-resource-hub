"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  DollarSign, ExternalLink,
  Search, RotateCcw,
  Code2, Globe,
} from "lucide-react";
import Link from "next/link";

const bounties = [
  { id: "1", repo: "facebook/react", issue: "Improve Suspense behavior with concurrent rendering", reward: "$500", difficulty: "Advanced", skills: ["React", "JavaScript", "Concurrent Mode"], url: "https://github.com/facebook/react/issues" },
  { id: "2", repo: "vercel/next.js", issue: "Add middleware support for edge runtime", reward: "$300", difficulty: "Intermediate", skills: ["Next.js", "TypeScript", "Edge"], url: "https://github.com/vercel/next.js/issues" },
  { id: "3", repo: "tailwindlabs/tailwindcss", issue: "Add dark mode variant for container queries", reward: "$200", difficulty: "Beginner", skills: ["CSS", "Tailwind", "PostCSS"], url: "https://github.com/tailwindlabs/tailwindcss/issues" },
  { id: "4", repo: "langchain-ai/langchain", issue: "Implement streaming support for custom LLM wrapper", reward: "$750", difficulty: "Advanced", skills: ["Python", "LangChain", "Async"], url: "https://github.com/langchain-ai/langchain/issues" },
  { id: "5", repo: "shadcn-ui/ui", issue: "Add DatePicker component with range support", reward: "$250", difficulty: "Intermediate", skills: ["React", "Radix UI", "Date"], url: "https://github.com/shadcn-ui/ui/issues" },
  { id: "6", repo: "supabase/supabase", issue: "Improve realtime subscription error handling", reward: "$350", difficulty: "Intermediate", skills: ["TypeScript", "WebSockets", "PostgreSQL"], url: "https://github.com/supabase/supabase/issues" },
  { id: "7", repo: "prisma/prisma", issue: "Add support for composite primary keys in MySQL", reward: "$600", difficulty: "Advanced", skills: ["TypeScript", "Prisma", "MySQL"], url: "https://github.com/prisma/prisma/issues" },
  { id: "8", repo: "honojs/hono", issue: "Implement middleware for request validation with Zod", reward: "$150", difficulty: "Beginner", skills: ["TypeScript", "Zod", "Hono"], url: "https://github.com/honojs/hono/issues" },
  { id: "9", repo: "microsoft/vscode", issue: "Add git stash integration in Source Control view", reward: "$1000", difficulty: "Advanced", skills: ["TypeScript", "VS Code API", "Git"], url: "https://github.com/microsoft/vscode/issues" },
  { id: "10", repo: "biomejs/biome", issue: "Add import sorting configuration options", reward: "$400", difficulty: "Intermediate", skills: ["Rust", "Biome", "Parser"], url: "https://github.com/biomejs/biome/issues" },
];

const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
const rewardRanges = ["All", "Under $200", "$200 - $500", "$500+"];

export default function BountiesPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [rewardRange, setRewardRange] = useState("All");

  const filtered = bounties.filter(b => {
    if (search && !b.repo.toLowerCase().includes(search.toLowerCase()) && !b.issue.toLowerCase().includes(search.toLowerCase())) return false;
    if (difficulty !== "All" && b.difficulty !== difficulty) return false;
    if (rewardRange === "Under $200") {
      const val = parseInt(b.reward.replace("$", ""));
      if (val >= 200) return false;
    } else if (rewardRange === "$200 - $500") {
      const val = parseInt(b.reward.replace("$", ""));
      if (val < 200 || val > 500) return false;
    } else if (rewardRange === "$500+") {
      const val = parseInt(b.reward.replace("$", ""));
      if (val < 500) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-12">
          {/* Hero */}
          <div className="text-center space-y-6">
            <div className="badge badge-emerald inline-flex"><DollarSign size={11} /> Open Source Bounties</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Get Paid for <span className="gradient-text-hero">Open Source</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Solve real issues and earn rewards. Browse bounties from top open-source projects and start contributing.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search bounties by repo or issue..."
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all text-sm" />
              </div>
              <button onClick={() => { setSearch(""); setDifficulty("All"); setRewardRange("All"); }}
                className="px-6 py-4 rounded-2xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
                <RotateCcw size={14} /> Reset
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Difficulty:</span>
                <div className="flex gap-1">
                  {difficulties.map((d) => (
                    <button key={d} onClick={() => setDifficulty(d)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${difficulty === d ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-gray-500 hover:text-gray-300"}`}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Reward:</span>
                <div className="flex gap-1">
                  {rewardRanges.map((r) => (
                    <button key={r} onClick={() => setRewardRange(r)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${rewardRange === r ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "text-gray-500 hover:text-gray-300"}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bounties Grid */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Search size={40} className="mx-auto text-gray-600" />
                <p className="text-gray-500 mt-4">No bounties match your filters.</p>
              </div>
            ) : (
              filtered.map((bounty, i) => (
                <motion.a key={bounty.id} href={bounty.url} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group block p-5 rounded-2xl glass border border-white/8 hover:border-emerald-500/30 card-hover transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-2">
                        <Code2 size={14} className="text-emerald-400 shrink-0" />
                        <span className="text-[11px] text-emerald-400 font-bold">{bounty.repo}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {bounty.issue}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {bounty.skills.map((s) => (
                          <span key={s} className="badge badge-blue text-[8px]">{s}</span>
                        ))}
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border ${
                          bounty.difficulty === "Beginner" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                          bounty.difficulty === "Intermediate" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                          "bg-red-500/10 text-red-400 border-red-500/20"
                        }`}>
                          {bounty.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xl font-black text-emerald-400">{bounty.reward}</div>
                      <ExternalLink size={12} className="text-gray-600 group-hover:text-emerald-400 transition-colors ml-auto mt-1" />
                    </div>
                  </div>
                </motion.a>
              ))
            )}
          </div>

          {/* Platforms */}
          <section className="max-w-4xl mx-auto space-y-8 pt-8 border-t border-white/5">
            <div className="text-center space-y-3">
              <div className="badge badge-purple inline-flex"><Globe size={11} /> Bounty Platforms</div>
              <h2 className="text-3xl font-black">Popular Bounty Platforms</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="https://issuehunt.io" target="_blank" rel="noopener noreferrer"
                className="p-6 rounded-2xl glass border border-white/8 hover:border-blue-500/30 card-hover text-center space-y-3">
                <div className="text-3xl">💰</div>
                <h3 className="font-bold">IssueHunt</h3>
                <p className="text-xs text-gray-400">Fund and earn from open-source issues</p>
              </a>
              <a href="https://polar.sh" target="_blank" rel="noopener noreferrer"
                className="p-6 rounded-2xl glass border border-white/8 hover:border-emerald-500/30 card-hover text-center space-y-3">
                <div className="text-3xl">🔄</div>
                <h3 className="font-bold">Polar.sh</h3>
                <p className="text-xs text-gray-400">Modern open-source funding platform</p>
              </a>
              <a href="https://www.bountysource.com" target="_blank" rel="noopener noreferrer"
                className="p-6 rounded-2xl glass border border-white/8 hover:border-amber-500/30 card-hover text-center space-y-3">
                <div className="text-3xl">🏆</div>
                <h3 className="font-bold">BountySource</h3>
                <p className="text-xs text-gray-400">The original open-source bounty platform</p>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
