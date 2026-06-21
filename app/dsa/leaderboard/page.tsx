"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Search, Users, Globe, GraduationCap, Star } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { RANKING_USERS, TIER_COLORS } from "@/lib/dsa/data";
import NeonGlowCard from "@/components/NeonGlowCard";

type Filter = "Global" | "College" | "Friends" | "Community";
type Period = "Weekly" | "Monthly" | "All Time";

export default function DSALeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("Global");
  const [period, setPeriod] = useState<Period>("All Time");
  const [search, setSearch] = useState("");

  const sorted = useMemo(() => {
    return [...RANKING_USERS].sort((a, b) => b.points - a.points);
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return sorted;
    return sorted.filter(u =>
      u.displayName.toLowerCase().includes(search.toLowerCase()) ||
      u.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [sorted, search]);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-12 relative z-10">

          {/* ─── Header ─── */}
          <section className="space-y-6">
            <Link href="/dsa" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={12} /> Back to DSA Arena
            </Link>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                <Trophy size={12} /> Leaderboard
              </div>
              <h1 className="text-5xl font-black tracking-tight">
                DSA <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Leaderboard</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Top performers ranked by points, wins, and consistency. Compete to climb the ranks.
              </p>
            </div>
          </section>

          {/* ─── Filters ─── */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {(["Global", "College", "Friends", "Community"] as Filter[]).map(f => (
                <button key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                    activeFilter === f
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
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
            <div className="flex items-center gap-2">
              {(["Weekly", "Monthly", "All Time"] as Period[]).map(p => (
                <button key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                    period === p
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Search ─── */}
          <div className="relative max-w-md">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search players..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition-all"
            />
          </div>

          {/* ─── Leaderboard Items ─── */}
          <div className="space-y-3">
            {filtered.map((user, index) => {
              const tierColors = TIER_COLORS[user.tier];
              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 md:p-6 rounded-2xl glass border transition-all hover:scale-[1.01] ${
                    index < 3 ? "border-amber-500/20" : "border-white/10"
                  }`}
                >
                  <NeonGlowCard className="flex items-center gap-4 w-full">
                  {/* Rank */}
                  <div className="w-10 text-center shrink-0">
                    <span className={`text-xl font-black ${index === 0 ? "text-amber-400" : index === 1 ? "text-gray-300" : index === 2 ? "text-orange-400" : "text-gray-600"}`}>
                      #{index + 1}
                    </span>
                  </div>

                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-black text-white">
                      {user.displayName[0]}
                    </div>
                    {index < 3 && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center border border-white/10">
                        <Medal size={10} className={index === 0 ? "text-amber-400" : index === 1 ? "text-gray-300" : "text-orange-400"} />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white truncate">{user.displayName}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${tierColors.text} ${tierColors.bg} border ${tierColors.border}`}>
                        {user.tier}
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-500">@{user.username} • {user.streak > 0 && `${user.streak} day streak`}</div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 text-[10px] text-gray-500">
                    <div className="text-center">
                      <div className="font-bold text-white">{user.wins}</div>
                      <div className="uppercase tracking-wider">Wins</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white">{user.totalMatches}</div>
                      <div className="uppercase tracking-wider">Matches</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-white">{Math.round((user.wins / user.totalMatches) * 100)}%</div>
                      <div className="uppercase tracking-wider">Win Rate</div>
                    </div>
                  </div>

                  {/* Points */}
                  <div className="text-right border-l border-white/10 pl-4 shrink-0">
                    <div className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                      {user.points.toLocaleString()}
                    </div>
                    <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">Points</div>
                  </div>
                  </NeonGlowCard>
                </motion.div>
              );
            })}
          </div>

          {/* ─── The Goal ─── */}
          <section className="text-center pb-8">
            <div className="p-8 rounded-[2rem] glass border border-white/10">
              <Star size={32} className="mx-auto text-amber-400 mb-4" />
              <h2 className="text-2xl font-black mb-2">Climb to Legend</h2>
              <p className="text-gray-500 text-sm max-w-lg mx-auto">Solve problems, win arena matches, and earn points to reach the highest tier. Only the best become Legends.</p>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
