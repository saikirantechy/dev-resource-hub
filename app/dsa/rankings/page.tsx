"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart3, Users, Globe, GraduationCap } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import DSARankingCard from "@/components/dsa/DSARankingCard";
import { RANKING_USERS } from "@/lib/dsa/data";
import type { RankingTier } from "@/lib/dsa/types";

type Filter = "Global" | "College" | "Friends";

const TIERS: RankingTier[] = ["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master", "Grandmaster", "Legend"];

export default function DSARankingsPage() {
  const [filter, setFilter] = useState<Filter>("Global");

  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    RANKING_USERS.forEach(u => {
      counts[u.tier] = (counts[u.tier] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16 relative z-10">

          {/* ─── Header ─── */}
          <section className="space-y-6">
            <Link href="/dsa" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={12} /> Back to DSA Arena
            </Link>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-widest">
                <BarChart3 size={12} /> Rankings
              </div>
              <h1 className="text-5xl font-black tracking-tight">
                DSA <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">Rankings</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                View player distribution across ranking tiers. From Bronze to Legend — climb the ranks!
              </p>
            </div>
          </section>

          {/* ─── Filters ─── */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {(["Global", "College", "Friends"] as Filter[]).map(f => (
                <button key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                    filter === f
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {f === "Global" && <Globe size={11} className="inline mr-1" />}
                  {f === "College" && <GraduationCap size={11} className="inline mr-1" />}
                  {f === "Friends" && <Users size={11} className="inline mr-1" />}
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Tier Cards ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIERS.map((tier, i) => (
              <DSARankingCard key={tier} tier={tier} index={i} userCount={tierCounts[tier] || 0} />
            ))}
          </div>

          {/* ─── Player Distribution ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Users size={16} className="text-blue-400" />
              <h2 className="text-2xl font-black">Player Distribution</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...RANKING_USERS].sort((a, b) => a.rank - b.rank).map((user, i) => {
                const tierColors = {
                  Bronze: "bg-amber-900/30 border-amber-700/30",
                  Silver: "bg-gray-300/10 border-gray-400/20",
                  Gold: "bg-yellow-500/10 border-yellow-500/20",
                  Platinum: "bg-cyan-500/10 border-cyan-500/20",
                  Diamond: "bg-blue-500/10 border-blue-500/20",
                  Master: "bg-purple-500/10 border-purple-500/20",
                  Grandmaster: "bg-red-500/10 border-red-500/20",
                  Legend: "bg-amber-500/10 border-amber-500/20",
                }[user.tier];

                return (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`flex items-center gap-3 p-4 rounded-xl glass border ${tierColors} transition-all hover:scale-[1.02]`}
                  >
                    {/* Rank */}
                    <span className="text-lg font-black text-gray-500 w-7 text-center shrink-0">#{user.rank}</span>

                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-black text-white shrink-0">
                      {user.displayName[0]}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-white truncate">{user.displayName}</div>
                      <div className="text-[9px] text-gray-500 truncate">@{user.username}</div>
                    </div>

                    {/* Points */}
                    <div className="text-right shrink-0">
                      <div className="text-sm font-black text-amber-400">{user.points.toLocaleString()}</div>
                      <div className="text-[7px] uppercase tracking-widest text-gray-600 font-bold">Pts</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ─── Info ─── */}
          <section className="text-center pb-8">
            <div className="p-8 rounded-[2rem] glass border border-white/10">
              <BarChart3 size={32} className="mx-auto text-rose-400 mb-4" />
              <h2 className="text-2xl font-black mb-2">How Rankings Work</h2>
              <p className="text-gray-500 text-sm max-w-xl mx-auto">
                Earn points by solving challenges and winning arena matches. Higher tiers unlock exclusive rewards, badges, and community recognition. Rankings reset monthly but all-time records are preserved.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
