"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Code2, Search, RotateCcw, Building2, Sparkles, ThumbsUp, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import DSAChallengeCard from "@/components/dsa/DSAChallengeCard";
import { CHALLENGES, COMPANIES } from "@/lib/dsa/data";
import type { Difficulty } from "@/lib/dsa/types";

const DIFFICULTIES: (Difficulty | "All")[] = ["All", "Easy", "Medium", "Hard", "Expert"];

export default function DSAChallengesPage() {
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All");

  const filtered = useMemo(() => {
    return CHALLENGES.filter(c => {
      if (difficulty !== "All" && c.difficulty !== difficulty) return false;
      if (company !== "All" && !c.companies.includes(company)) return false;
      if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.topic.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [difficulty, company, search]);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12 relative z-10">

          {/* ─── Header ─── */}
          <section className="space-y-6">
            <Link href="/dsa" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={12} /> Back to DSA Arena
            </Link>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                <Code2 size={12} /> Challenges
              </div>
              <h1 className="text-5xl font-black tracking-tight">
                DSA <span className="gradient-text-blue">Challenges</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Practice with curated problems from real interviews. Filter by difficulty, topic, or company.
              </p>
            </div>
          </section>

          {/* ─── Stats ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Total Challenges", value: CHALLENGES.length, icon: Code2, color: "text-blue-400" },
              { label: "Companies", value: COMPANIES.length, icon: Building2, color: "text-purple-400" },
              { label: "Total Likes", value: `${(CHALLENGES.reduce((s, c) => s + c.likes, 0) / 1000).toFixed(0)}k`, icon: ThumbsUp, color: "text-pink-400" },
              { label: "Avg Acceptance", value: `${Math.round(CHALLENGES.reduce((s, c) => s + c.acceptanceRate, 0) / CHALLENGES.length)}%`, icon: CheckCircle2, color: "text-emerald-400" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl glass border border-white/10 text-center space-y-1"
              >
                <s.icon size={16} className={`mx-auto ${s.color}`} />
                <div className="text-lg font-black">{s.value}</div>
                <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* ─── Filters ─── */}
          <div className="space-y-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search challenges by title or topic..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all"
                />
              </div>
              <button onClick={() => { setDifficulty("All"); setCompany("All"); setSearch(""); }}
                className="px-5 py-3 rounded-2xl border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5">
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Difficulty */}
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(d => (
                <button key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                    difficulty === d
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Companies */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mr-1">Company:</span>
              <button onClick={() => setCompany("All")}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold transition-all ${
                  company === "All" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                All
              </button>
              {COMPANIES.slice(0, 8).map(c => (
                <button key={c.id} onClick={() => setCompany(c.name)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold transition-all ${
                    company === c.name ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Challenges Grid ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((challenge, i) => (
              <DSAChallengeCard key={challenge.id} challenge={challenge} index={i} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-500">
                <Search size={40} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No challenges found.</p>
                <p className="text-sm">Try different filters.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
