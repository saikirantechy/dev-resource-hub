"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trophy, ArrowLeft, Search, Filter, ChevronDown, Globe, Code2, GraduationCap, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import { DEVELOPERS, ALL_LANGUAGES, ALL_COUNTRIES } from "@/lib/devrank/data";
import type { RankingPeriod } from "@/lib/devrank/types";
import DevRankCard from "@/components/devrank/DevRankCard";

const PERIODS: RankingPeriod[] = ["Daily", "Weekly", "Monthly", "Quarterly", "Yearly", "All-Time"];

const STATS = [
  { label: "Total Developers", value: "12,450", change: "+342 this week" },
  { label: "Total PRs", value: "48,230", change: "+1,892 this week" },
  { label: "Total Stars", value: "1.2M", change: "+12K this week" },
  { label: "Active Today", value: "3,450", change: "↑ 12%" },
];

export default function DevRankGlobalPage() {
  const [period, setPeriod] = useState<RankingPeriod>("All-Time");
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = DEVELOPERS.filter(d => {
    if (search && !d.displayName.toLowerCase().includes(search.toLowerCase()) && !d.username.toLowerCase().includes(search.toLowerCase())) return false;
    if (langFilter && !d.languages.includes(langFilter)) return false;
    if (countryFilter && d.country !== countryFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10 relative z-10">

          {/* Header */}
          <div className="space-y-4">
            <Link href="/devrank" className="inline-flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors">
              <ArrowLeft size={12} /> Back to DevRank
            </Link>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Trophy size={20} className="text-amber-400" />
                  <h1 className="text-3xl md:text-5xl font-black">Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Leaderboard</span></h1>
                </div>
                <p className="text-gray-500 text-sm mt-1">Top developers ranked by contribution score</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl glass border border-white/5 text-center"
              >
                <div className="text-lg font-black">{s.value}</div>
                <div className="text-[9px] text-gray-500">{s.label}</div>
                <div className="text-[8px] mt-1 text-emerald-400 font-bold">{s.change}</div>
              </motion.div>
            ))}
          </div>

          {/* Period Tabs */}
          <div className="flex flex-wrap gap-2">
            {PERIODS.map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                  period === p ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/5 text-gray-500 border border-white/10 hover:border-white/20"
                }`}
              >{p}</button>
            ))}
          </div>

          {/* Search + Filters */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search developers..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/30 transition-all text-xs border border-white/10"
                />
              </div>
              <button onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white transition-colors"
              ><Filter size={14} /> Filters <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} /></button>
            </div>

            {showFilters && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-3 p-4 rounded-xl glass border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Globe size={12} className="text-gray-500" />
                  <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/5 text-[10px] text-gray-400 border border-white/10 focus:outline-none focus:border-blue-500/30"
                  >
                    <option value="">All Countries</option>
                    {ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <Code2 size={12} className="text-gray-500" />
                  <select value={langFilter} onChange={e => setLangFilter(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/5 text-[10px] text-gray-400 border border-white/10 focus:outline-none focus:border-blue-500/30"
                  >
                    <option value="">All Languages</option>
                    {ALL_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                {(countryFilter || langFilter) && (
                  <button onClick={() => { setCountryFilter(""); setLangFilter(""); }}
                    className="px-3 py-2 rounded-lg bg-red-500/10 text-[10px] text-red-400 font-bold border border-red-500/20 hover:bg-red-500/20 transition-colors"
                  >Clear Filters</button>
                )}
              </motion.div>
            )}
          </div>

          {/* Leaderboard */}
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Trophy size={40} className="mx-auto text-gray-600 mb-4" />
                <p className="text-gray-500">No developers match your filters</p>
              </div>
            ) : (
              filtered.map((dev, i) => <DevRankCard key={dev.id} developer={dev} index={i} />)
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
