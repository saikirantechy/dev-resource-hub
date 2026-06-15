"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, ArrowLeft, Search, MapPin, Trophy, TrendingUp, TrendingDown, Users, BarChart3, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { COLLEGES, ALL_COUNTRIES } from "@/lib/devrank/data";
import DevRankChart from "@/components/devrank/DevRankChart";

const chartData = COLLEGES.slice(0, 10).map(c => ({ label: c.name.split(" ")[0], value: c.totalScore }));

export default function DevRankCollegesPage() {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [sortBy, setSortBy] = useState<"score" | "growth" | "students">("score");

  const filtered = COLLEGES.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (countryFilter && c.country !== countryFilter) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === "score") return b.totalScore - a.totalScore;
    if (sortBy === "growth") return b.growth - a.growth;
    return b.studentCount - a.studentCount;
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
              <GraduationCap size={24} className="text-purple-400" />
              <h1 className="text-3xl md:text-5xl font-black">College <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Rankings</span></h1>
            </div>
          </div>

          {/* Chart */}
          <div className="p-6 rounded-2xl glass border border-white/10">
            <h3 className="text-sm font-bold text-white mb-4">Top 10 Colleges by Total Score</h3>
            <DevRankChart data={chartData} height={160} />
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1"><Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search colleges..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/30 transition-all text-xs border border-white/10" />
            </div>
            <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white/5 text-[10px] text-gray-400 border border-white/10 focus:outline-none focus:border-blue-500/30"
            ><option value="">All Countries</option>{ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}</select>
            <div className="flex gap-2">
              {(["score", "growth", "students"] as const).map(s => (
                <button key={s} onClick={() => setSortBy(s)}
                  className={`px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                    sortBy === s ? "bg-purple-500/20 text-purple-400 border border-purple-500/30" : "bg-white/5 text-gray-500 border border-white/10"
                  }`}>{s === "score" ? "Score" : s === "growth" ? "Growth" : "Students"}</button>
              ))}
            </div>
          </div>

          {/* College Cards */}
          <div className="space-y-3">
            {filtered.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group p-5 md:p-6 rounded-2xl glass border border-white/10 hover:border-purple-500/30 card-hover transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 text-center shrink-0"><span className={`text-lg font-black ${i < 3 ? "text-purple-400" : "text-gray-600"}`}>#{c.rank}</span></div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-lg font-black text-white shrink-0">{c.name[0]}</div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white truncate">{c.name}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${c.trend === "up" ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : "text-gray-500 bg-white/5 border border-white/10"}`}>
                          {c.trend === "up" ? <TrendingUp size={10} className="inline" /> : <TrendingDown size={10} className="inline" />} {c.growth}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5"><MapPin size={10} /> {c.location}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-[10px]">
                    <div className="text-center"><div className="font-bold text-white">{c.contributorCount.toLocaleString()}</div><div className="text-gray-500 uppercase tracking-wider">Contributors</div></div>
                    <div className="hidden sm:block text-center"><div className="font-bold text-white">{c.studentCount.toLocaleString()}</div><div className="text-gray-500 uppercase tracking-wider">Students</div></div>
                    <div className="text-center"><div className="font-bold text-emerald-400">{c.placementReadiness}%</div><div className="text-gray-500 uppercase tracking-wider">Placement</div></div>
                    <div className="text-center"><div className="font-bold text-purple-400">{c.innovationScore}%</div><div className="text-gray-500 uppercase tracking-wider">Innovation</div></div>
                  </div>

                  <div className="text-right border-l border-white/10 pl-4 shrink-0">
                    <div className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{c.totalScore.toLocaleString()}</div>
                    <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">Score</div>
                  </div>
                </div>

                {/* Departments */}
                <div className="flex flex-wrap gap-1.5 mt-3 ml-14">
                  {c.departments.map(d => <span key={d} className="px-2 py-0.5 rounded bg-white/5 text-[8px] font-bold text-gray-500 border border-white/5">{d}</span>)}
                  <span className="text-[8px] text-gray-600 ml-1">Top: {c.topContributor} ({c.topContributorScore.toLocaleString()})</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
