"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, ArrowLeft, Search, Code2, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import { ORGANIZATIONS } from "@/lib/devrank/data";

export default function DevRankOrgsPage() {
  const [search, setSearch] = useState("");

  const filtered = ORGANIZATIONS.filter(o => o.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10 relative z-10">

          <div className="space-y-4">
            <Link href="/devrank" className="inline-flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"><ArrowLeft size={12} /> Back to DevRank</Link>
            <div className="flex items-center gap-3">
              <Building2 size={24} className="text-amber-400" />
              <h1 className="text-3xl md:text-5xl font-black">Organization <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Analytics</span></h1>
            </div>
          </div>

          <div className="relative max-w-md"><Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search organizations..." className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/30 transition-all text-xs border border-white/10" />
          </div>

          <div className="grid gap-4">
            {filtered.map((o, i) => (
              <motion.div key={o.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="group p-5 md:p-6 rounded-2xl glass border border-white/10 hover:border-amber-500/30 card-hover transition-all duration-500"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-10 shrink-0 text-center"><span className={`text-lg font-black ${i < 3 ? "text-amber-400" : "text-gray-600"}`}>#{o.rank}</span></div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-lg font-black text-white shrink-0">{o.name[0]}</div>
                    <div className="min-w-0">
                      <div className="font-bold text-sm text-white">{o.name}</div>
                      <p className="text-[10px] text-gray-500 mt-0.5">{o.description}</p>
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {o.topLanguages.slice(0, 4).map(l => <span key={l} className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-bold text-gray-500 border border-white/5">{l}</span>)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 md:gap-6 text-[10px]">
                    <div className="text-center"><div className="font-bold text-white">{o.memberCount}</div><div className="text-gray-500 uppercase tracking-wider">Members</div></div>
                    <div className="text-center"><div className="font-bold text-white">{o.repoCount.toLocaleString()}</div><div className="text-gray-500 uppercase tracking-wider">Repos</div></div>
                    <div className="text-center"><div className="font-bold text-amber-400">{(o.totalStars / 1e6).toFixed(1)}M</div><div className="text-gray-500 uppercase tracking-wider">Stars</div></div>
                    <div className="text-center"><div className="font-bold text-white">{o.contributorCount.toLocaleString()}</div><div className="text-gray-500 uppercase tracking-wider">Contributors</div></div>
                  </div>

                  <div className="text-right border-l border-white/10 pl-4 shrink-0">
                    <div className="flex items-center gap-1 text-lg font-black text-amber-400"><TrendingUp size={16} /> {o.growth}%</div>
                    <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">Growth</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 ml-14">
                  <Code2 size={10} className="text-gray-600" />
                  {o.topRepos.slice(0, 5).map(r => <span key={r} className="px-2 py-0.5 rounded bg-blue-500/10 text-[8px] font-bold text-blue-400 border border-blue-500/20">{r}</span>)}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
