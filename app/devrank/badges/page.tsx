"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, ArrowLeft, Trophy, Code2, Star, Medal, Lock, CheckCircle2, Share2, Flame } from "lucide-react";
import Navbar from "@/components/Navbar";
import { BADGES } from "@/lib/devrank/data";
import DevRankBadgeCard from "@/components/devrank/DevRankBadge";

const CATEGORIES = ["all", "contribution", "achievement", "community", "skill", "hackathon"];

const categoryIcons: Record<string, typeof Trophy> = {
  contribution: Trophy, achievement: Flame, community: Star, skill: Code2, hackathon: Medal,
};

export default function DevRankBadgesPage() {
  const [category, setCategory] = useState("all");
  const [showUnlocked, setShowUnlocked] = useState(false);

  const filtered = BADGES.filter(b => {
    if (category !== "all" && b.category !== category) return false;
    if (showUnlocked && !b.unlocked) return false;
    return true;
  });

  const unlockedCount = BADGES.filter(b => b.unlocked).length;

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10 relative z-10">

          <div className="space-y-4">
            <Link href="/devrank" className="inline-flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"><ArrowLeft size={12} /> Back to DevRank</Link>
            <div className="flex items-center gap-3">
              <Award size={24} className="text-amber-400" />
              <h1 className="text-3xl md:text-5xl font-black">Achievement <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Badges</span></h1>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-2xl glass border border-white/10 text-center">
              <div className="text-2xl font-black text-white">{unlockedCount}/{BADGES.length}</div>
              <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold mt-1">Unlocked</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="p-5 rounded-2xl glass border border-white/10 text-center">
              <div className="text-2xl font-black text-emerald-400">{Math.round((unlockedCount / BADGES.length) * 100)}%</div>
              <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold mt-1">Completion</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl glass border border-white/10 text-center">
              <div className="text-2xl font-black text-blue-400">5</div>
              <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold mt-1">Categories</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl glass border border-white/10 text-center">
              <div className="text-2xl font-black text-purple-400">{BADGES.length - unlockedCount}</div>
              <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold mt-1">Locked</div>
            </motion.div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                  category === c ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : "bg-white/5 text-gray-500 border border-white/10 hover:border-white/20"
                } flex items-center gap-1.5`}
              >
                {c !== "all" && categoryIcons[c] && (
                  <span>{(() => { const Icon = categoryIcons[c]; return <Icon size={10} />; })()}</span>
                )}
                {c === "all" ? "All" : c}
              </button>
            ))}
            <button onClick={() => setShowUnlocked(!showUnlocked)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all border ${
                showUnlocked ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" : "bg-white/5 text-gray-500 border-white/10 hover:border-white/20"
              }`}
            ><CheckCircle2 size={10} className="inline mr-1" /> Unlocked</button>
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filtered.map((badge, i) => <DevRankBadgeCard key={badge.id} badge={badge} index={i} />)}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16"><Lock size={40} className="mx-auto text-gray-600 mb-4" /><p className="text-gray-500">No badges match your filters</p></div>
          )}

          {/* Badge Generator CTA */}
          <div className="p-8 md:p-12 rounded-[2rem] glass border border-white/10 text-center space-y-4">
            <Share2 size={32} className="mx-auto text-blue-400" />
            <h2 className="text-2xl font-black">Dynamic Badge Generator</h2>
            <p className="text-gray-400 max-w-lg mx-auto text-sm">Generate shareable SVG badges for your profile, README, or portfolio.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <code className="px-4 py-2 rounded-xl bg-white/5 text-[10px] text-gray-400 border border-white/10 font-mono">/devrank/badge/[username].svg</code>
              <code className="px-4 py-2 rounded-xl bg-white/5 text-[10px] text-gray-400 border border-white/10 font-mono">/devrank/badge/open-source.svg</code>
              <code className="px-4 py-2 rounded-xl bg-white/5 text-[10px] text-gray-400 border border-white/10 font-mono">/devrank/badge/community.svg</code>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
