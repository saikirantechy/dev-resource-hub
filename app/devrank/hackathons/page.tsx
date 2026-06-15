"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swords, ArrowLeft, Search, Calendar, MapPin, Users, Code2, Trophy, Globe, Monitor } from "lucide-react";
import Navbar from "@/components/Navbar";
import { HACKATHONS } from "@/lib/devrank/data";

export default function DevRankHackathonsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filtered = HACKATHONS.filter(h => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && h.type !== typeFilter) return false;
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
              <Swords size={24} className="text-red-400" />
              <h1 className="text-3xl md:text-5xl font-black">Hackathon <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">Rankings</span></h1>
            </div>
          </div>

          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            {["", "Online", "In-Person", "Hybrid"].map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${typeFilter === t ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-white/5 text-gray-500 border border-white/10 hover:border-white/20"}`}>{t || "All"}</button>
            ))}
          </div>

          <div className="relative max-w-md"><Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hackathons..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/30 transition-all text-xs border border-white/10" />
          </div>

          <div className="grid gap-4">
            {filtered.map((h, i) => (
              <motion.div key={h.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group p-5 md:p-6 rounded-2xl glass border border-white/10 hover:border-red-500/30 card-hover transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 shrink-0 text-center"><span className={`text-lg font-black ${i < 3 ? "text-red-400" : "text-gray-600"}`}>#{h.rank}</span></div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-lg font-black text-white shrink-0">{h.name[0]}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white">{h.name}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${h.type === "Online" ? "text-cyan-400 bg-cyan-500/10 border border-cyan-500/20" : h.type === "In-Person" ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" : "text-purple-400 bg-purple-500/10 border border-purple-500/20"}`}>{h.type}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5">{h.description}</p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-500 mt-0.5">
                        <span className="flex items-center gap-1"><Calendar size={10} /> {h.date}</span>
                        <span className="flex items-center gap-1"><MapPin size={10} /> {h.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6 text-[10px]">
                    <div className="text-center"><div className="font-bold text-white">{h.participantCount.toLocaleString()}</div><div className="text-gray-500 uppercase tracking-wider">Participants</div></div>
                    <div className="text-center"><div className="font-bold text-white">{h.projectCount}</div><div className="text-gray-500 uppercase tracking-wider">Projects</div></div>
                    <div className="text-center"><div className="font-bold text-amber-400">{h.winnerScore}</div><div className="text-gray-500 uppercase tracking-wider">Winner Score</div></div>
                  </div>

                  <div className="text-right border-l border-white/10 pl-4 shrink-0 max-w-[200px]">
                    <div className="text-[10px] font-bold text-amber-400 truncate">{h.winner}</div>
                    <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">Winner</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 ml-14">
                  <Users size={10} className="text-gray-600" />
                  {h.topTeams.map(t => <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-gray-500 border border-white/5">{t}</span>)}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
