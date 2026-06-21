"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowLeft, Search, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import { COMMUNITIES } from "@/lib/devrank/data";
import type { CommunityType } from "@/lib/devrank/types";

const COMMUNITY_TYPES: CommunityType[] = ["Student", "GDSC", "MLSA", "AWS User Group", "GDG", "Open Source", "Developer", "Startup"];

export default function DevRankCommunitiesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = COMMUNITIES.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && c.type !== typeFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10 relative z-10">

          <div className="space-y-4">
            <Link href="/devrank" className="inline-flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"><ArrowLeft size={12} /> Back to DevRank</Link>
            <div className="flex items-center gap-3">
              <Users size={24} className="text-emerald-400" />
              <h1 className="text-3xl md:text-5xl font-black">Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Rankings</span></h1>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setTypeFilter("")}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${!typeFilter ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-gray-500 border border-white/10 hover:border-white/20"}`}>All</button>
            {COMMUNITY_TYPES.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${typeFilter === t ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-gray-500 border border-white/10 hover:border-white/20"}`}>{t}</button>
            ))}
          </div>

          {/* Search */}
          <div className="relative max-w-md"><Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search communities..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/30 transition-all text-xs border border-white/10" />
          </div>

          {/* Community Cards */}
          <div className="grid gap-4">
            {filtered.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group p-5 md:p-6 rounded-2xl glass border border-white/10 hover:border-emerald-500/30 card-hover transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 shrink-0 text-center"><span className={`text-lg font-black ${i < 3 ? "text-emerald-400" : "text-gray-600"}`}>#{c.rank}</span></div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg font-black text-white shrink-0">{c.name[0]}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white truncate">{c.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-[8px] font-bold text-emerald-400 border border-emerald-500/20">{c.type}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5 truncate">{c.description}</p>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5"><Globe size={10} /> {c.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6 text-[10px]">
                    <div className="text-center"><div className="font-bold text-white">{c.memberCount.toLocaleString()}</div><div className="text-gray-500 uppercase tracking-wider">Members</div></div>
                    <div className="text-center"><div className="font-bold text-white">{c.projects}</div><div className="text-gray-500 uppercase tracking-wider">Projects</div></div>
                    <div className="text-center"><div className="font-bold text-white">{c.events}</div><div className="text-gray-500 uppercase tracking-wider">Events</div></div>
                    <div className="text-center"><div className="font-bold text-emerald-400">+{c.growth}%</div><div className="text-gray-500 uppercase tracking-wider">Growth</div></div>
                  </div>

                  <div className="text-right border-l border-white/10 pl-4 shrink-0">
                    <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">{c.totalScore.toLocaleString()}</div>
                    <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">Score</div>
                  </div>
                </div>

                {c.topMembers.length > 0 && (
                  <div className="flex items-center gap-2 mt-3 ml-14">
                    <Users size={10} className="text-gray-600" />
                    {c.topMembers.map(m => <span key={m} className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-gray-500 border border-white/5">{m}</span>)}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
