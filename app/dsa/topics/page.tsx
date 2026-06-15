"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, LayoutGrid, Search, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import DSATopicCard from "@/components/dsa/DSATopicCard";
import { TOPICS } from "@/lib/dsa/data";
import type { Difficulty, TopicCategory } from "@/lib/dsa/types";

const CATEGORIES: (TopicCategory | "All")[] = ["All", "Data Structures", "Algorithms", "Interview Preparation"];
const DIFFICULTIES: (Difficulty | "All")[] = ["All", "Easy", "Medium", "Hard", "Expert"];

export default function DSATopicsPage() {
  const [category, setCategory] = useState<TopicCategory | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return TOPICS.filter(t => {
      if (category !== "All" && t.category !== category) return false;
      if (difficulty !== "All" && t.difficulty !== difficulty) return false;
      if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [category, difficulty, search]);

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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                <LayoutGrid size={12} /> Topics
              </div>
              <h1 className="text-5xl font-black tracking-tight">
                DSA <span className="gradient-text-blue">Topics</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Browse all data structures and algorithms topics. Track your progress and master each topic systematically.
              </p>
            </div>
          </section>

          {/* ─── Filters ─── */}
          <div className="space-y-6">
            {/* Search */}
            <div className="flex gap-3 max-w-2xl">
              <div className="flex-1 relative">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search topics..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
              </div>
              <button onClick={() => { setCategory("All"); setDifficulty("All"); setSearch(""); }}
                className="px-5 py-3 rounded-2xl border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5">
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                    category === cat
                      ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2">
              {DIFFICULTIES.map(d => (
                <button key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                    difficulty === d
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-gray-500 hover:text-gray-300 border border-transparent"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Topics Grid ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((topic, i) => (
              <DSATopicCard key={topic.id} topic={topic} index={i} />
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-500">
                <Search size={40} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No topics found.</p>
                <p className="text-sm">Try different filters.</p>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
