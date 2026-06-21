"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowLeft, Code2, Filter, ChevronDown, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import { DEVELOPERS, ALL_LANGUAGES, ALL_COUNTRIES } from "@/lib/devrank/data";
import DevRankCard from "@/components/devrank/DevRankCard";

export default function DevRankDevelopersPage() {
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

          <div className="space-y-4">
            <Link href="/devrank" className="inline-flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"><ArrowLeft size={12} /> Back to DevRank</Link>
            <div className="flex items-center gap-3">
              <Code2 size={24} className="text-emerald-400" />
              <h1 className="text-3xl md:text-5xl font-black"><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Developers</span></h1>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or username..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/30 transition-all text-xs border border-white/10" />
              </div>
              <button onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white transition-colors"
              ><Filter size={14} /> Filters <ChevronDown size={12} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} /></button>
            </div>

            {showFilters && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-3 p-4 rounded-xl glass border border-white/10"
              >
                <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/5 text-[10px] text-gray-400 border border-white/10 focus:outline-none focus:border-blue-500/30"
                ><option value="">All Countries</option>{ALL_COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}</select>
                <select value={langFilter} onChange={e => setLangFilter(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/5 text-[10px] text-gray-400 border border-white/10 focus:outline-none focus:border-blue-500/30"
                ><option value="">All Languages</option>{ALL_LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}</select>
                {(countryFilter || langFilter) && (
                  <button onClick={() => { setCountryFilter(""); setLangFilter(""); }}
                    className="px-3 py-2 rounded-lg bg-red-500/10 text-[10px] text-red-400 font-bold border border-red-500/20 hover:bg-red-500/20 transition-colors"
                  >Clear</button>
                )}
              </motion.div>
            )}
          </div>

          {/* Count */}
          <div className="text-[10px] text-gray-500 font-bold">
            Showing {filtered.length} developer{filtered.length !== 1 ? "s" : ""}
          </div>

          {/* Developer Cards */}
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16"><Users size={40} className="mx-auto text-gray-600 mb-4" /><p className="text-gray-500">No developers found</p></div>
            ) : (
              filtered.map((dev, i) => <DevRankCard key={dev.id} developer={dev} index={i} />)
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
