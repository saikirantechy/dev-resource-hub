"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, Star, Activity, ArrowUp, ArrowDown, Search, X, ExternalLink, Trash2, Clock } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { getSearchAnalytics, clearSearchAnalytics } from "@/lib/searchAnalytics";

const METRICS = [
  { label: "Total Visitors", value: "24.8K", delta: "+12.3%", up: true, icon: Eye, color: "from-blue-500 to-cyan-500" },
  { label: "Active Users", value: "3,421", delta: "+8.7%", up: true, icon: Users, color: "from-emerald-500 to-teal-500" },
  { label: "Engagement Rate", value: "68.2%", delta: "+4.1%", up: true, icon: Activity, color: "from-purple-500 to-pink-500" },
  { label: "Avg. Session", value: "4m 32s", delta: "-2.1%", up: false, icon: Star, color: "from-amber-500 to-orange-500" },
];

const TRAFFIC_SOURCES = [
  { source: "Direct", percentage: 35, color: "from-blue-500 to-blue-400" },
  { source: "GitHub", percentage: 28, color: "from-gray-400 to-gray-300" },
  { source: "Social", percentage: 22, color: "from-purple-500 to-pink-500" },
  { source: "Search", percentage: 15, color: "from-emerald-500 to-teal-500" },
];

const TOP_PAGES = [
  { page: "/agents", views: "12.4K", change: "+18%" },
  { page: "/tools", views: "10.8K", change: "+12%" },
  { page: "/prompts", views: "8.2K", change: "+24%" },
  { page: "/dashboard", views: "6.7K", change: "+7%" },
  { page: "/login", views: "5.1K", change: "+3%" },
];

export default function AdminAnalyticsPage() {
  useAdmin();

  const [searchData, setSearchData] = useState<ReturnType<typeof getSearchAnalytics> | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    setSearchData(getSearchAnalytics());
  }, []);

  const handleClear = () => {
    clearSearchAnalytics();
    setSearchData(getSearchAnalytics());
    setShowConfirmClear(false);
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch {
      return iso;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2"><TrendingUp size={24} className="text-blue-400" /> Analytics Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Platform metrics and usage statistics</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {METRICS.map((m, i) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl glass border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center`}>
                <m.icon size={16} className="text-white" />
              </div>
              <span className={`flex items-center gap-0.5 text-[10px] font-bold ${m.up ? "text-emerald-400" : "text-red-400"}`}>
                {m.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />} {m.delta}
              </span>
            </div>
            <div className="text-2xl font-black">{m.value}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{m.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl glass border border-white/5">
          <h2 className="text-sm font-black mb-4">Traffic Sources</h2>
          <div className="space-y-4">
            {TRAFFIC_SOURCES.map((s) => (
              <div key={s.source}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{s.source}</span>
                  <span className="text-gray-500">{s.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${s.color}`} style={{ width: `${s.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Pages */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="p-6 rounded-2xl glass border border-white/5">
          <h2 className="text-sm font-black mb-4">Top Pages (30d)</h2>
          <div className="space-y-2">
            {TOP_PAGES.map((p) => (
              <div key={p.page} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-blue-400">{p.page}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold">{p.views} views</span>
                  <span className="text-[10px] text-emerald-400">{p.change}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Growth Chart Placeholder */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="p-6 rounded-2xl glass border border-white/5">
        <h2 className="text-sm font-black mb-4">User Growth (30 days)</h2>
        <div className="flex items-end gap-2 h-32">
          {[30, 45, 38, 52, 48, 65, 72, 68, 85, 92, 88, 105, 110, 98, 120, 135, 128, 142, 150, 138, 155, 168, 172, 180, 185, 178, 195, 210, 205, 220].map((v, i) => (
            <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-blue-500/30 to-blue-500/10 hover:from-blue-500/50 transition-all"
              style={{ height: `${(v / 220) * 100}%` }} />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-[9px] text-gray-600">
          <span>Day 1</span>
          <span>Day 10</span>
          <span>Day 20</span>
          <span>Day 30</span>
        </div>
      </motion.div>

      {/* ── Search Analytics ── */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-black flex items-center gap-2"><Search size={16} className="text-blue-400" /> Search Analytics</h2>
            <p className="text-[10px] text-gray-500 mt-0.5">Tracked from the /search page and Cmd+K palette</p>
          </div>
          {searchData && searchData.totalSearches > 0 && (
            <button onClick={() => setShowConfirmClear(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all text-[10px] font-bold">
              <Trash2 size={12} /> Clear Data
            </button>
          )}
        </div>

        {showConfirmClear && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-3">
            <p className="text-sm text-red-400 font-medium">Clear all search analytics data? This cannot be undone.</p>
            <div className="flex gap-2">
              <button onClick={handleClear}
                className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all text-xs font-bold">
                Yes, Clear Everything
              </button>
              <button onClick={() => setShowConfirmClear(false)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all text-xs font-bold">
                Cancel
              </button>
            </div>
          </div>
        )}

        {!searchData ? (
          <div className="p-8 text-center text-gray-500 text-sm">Loading...</div>
        ) : searchData.totalSearches === 0 ? (
          <div className="p-12 text-center space-y-3 rounded-2xl glass border border-white/5">
            <Search size={32} className="mx-auto text-gray-600" />
            <p className="text-gray-400 font-medium">No search data yet</p>
            <p className="text-xs text-gray-600">Searches will appear here after users search on the /search page or Cmd+K palette.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "Total Searches", value: searchData.totalSearches.toLocaleString(), icon: Search, color: "from-blue-500 to-cyan-500" },
                { label: "Unique Queries", value: searchData.uniqueQueries.toLocaleString(), icon: Search, color: "from-purple-500 to-pink-500" },
                { label: "Result Clicks", value: searchData.totalClicks.toLocaleString(), icon: ExternalLink, color: "from-emerald-500 to-teal-500" },
                { label: "No-Result Queries", value: searchData.noResultQueries.length.toLocaleString(), icon: X, color: "from-amber-500 to-orange-500" },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-2xl glass border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                      <s.icon size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="text-xl font-black">{s.value}</div>
                  <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Queries */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="p-5 rounded-2xl glass border border-white/5">
                <h3 className="text-xs font-black mb-3 flex items-center gap-2">
                  <TrendingUp size={14} className="text-blue-400" /> Top Searches
                </h3>
                <div className="space-y-1">
                  {searchData.topQueries.slice(0, 15).map((q, i) => (
                    <div key={q.query} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.03] transition-all">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`text-[10px] font-bold w-5 text-right ${i < 3 ? "text-yellow-500" : "text-gray-600"}`}>#{i + 1}</span>
                        <span className="text-xs truncate">{q.query}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-[10px] font-bold text-blue-400">{q.count}</span>
                        <span className={`text-[9px] ${q.clickThroughRate > 30 ? "text-emerald-400" : "text-gray-600"}`}>{q.clickThroughRate}% CTR</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* No Result Queries */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="p-5 rounded-2xl glass border border-white/5">
                <h3 className="text-xs font-black mb-3 flex items-center gap-2">
                  <X size={14} className="text-amber-400" /> Queries With No Results
                </h3>
                {searchData.noResultQueries.length === 0 ? (
                  <p className="text-xs text-gray-600 py-4 text-center">No queries returned zero results — all searches found something! 🎉</p>
                ) : (
                  <div className="space-y-1">
                    {searchData.noResultQueries.slice(0, 10).map((q) => (
                      <div key={q.query} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.03] transition-all">
                        <span className="text-xs truncate text-gray-400">{q.query}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-bold text-amber-400">{q.count}x</span>
                          <span className="text-[9px] text-gray-600">{formatDate(q.lastSearched)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Search Volume Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="p-5 rounded-2xl glass border border-white/5">
              <h3 className="text-xs font-black mb-4 flex items-center gap-2">
                <Activity size={14} className="text-blue-400" /> Search Volume (30 days)
              </h3>
              <div className="flex items-end gap-1 h-24">
                {searchData.searchVolumeByDay.map((d) => {
                  const max = Math.max(...searchData.searchVolumeByDay.map((x) => x.count), 1);
                  const height = (d.count / max) * 100;
                  return (
                    <div key={d.date} className="flex-1 relative group">
                      <div
                        className={`rounded-t-sm transition-all ${
                          d.count > 0
                            ? "bg-gradient-to-t from-blue-500/60 to-blue-500/20 hover:from-blue-500/80"
                            : "bg-white/[0.02]"
                        }`}
                        style={{ height: `${Math.max(height, d.count > 0 ? 4 : 0)}%` }}
                      />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {d.count} on {d.date.slice(5)}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-[8px] text-gray-600">
                <span>{searchData.searchVolumeByDay[0]?.date.slice(5) || ""}</span>
                <span>{searchData.searchVolumeByDay[14]?.date.slice(5) || ""}</span>
                <span>{searchData.searchVolumeByDay[29]?.date.slice(5) || ""}</span>
              </div>
            </motion.div>

            {/* Top Clicked Results */}
            {searchData.topClickedResults.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="p-5 rounded-2xl glass border border-white/5">
                <h3 className="text-xs font-black mb-3 flex items-center gap-2">
                  <ExternalLink size={14} className="text-emerald-400" /> Most Clicked Results
                </h3>
                <div className="space-y-1">
                  {searchData.topClickedResults.slice(0, 10).map((r, i) => (
                    <div key={r.href} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.03] transition-all">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] font-bold text-gray-600 w-4">{i + 1}.</span>
                        <span className="text-xs truncate">{r.name}</span>
                        <span className="text-[9px] text-gray-600 truncate hidden sm:inline">{r.href}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400 shrink-0">{r.clicks} clicks</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recent Searches */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-5 rounded-2xl glass border border-white/5">
              <h3 className="text-xs font-black mb-3 flex items-center gap-2">
                <Clock size={14} className="text-gray-400" /> Recent Searches (last 50)
              </h3>
              <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
                {searchData.recentSearches.slice(0, 50).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.03] transition-all">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`text-[9px] font-bold uppercase ${entry.type === "search" ? "text-blue-400" : "text-emerald-400"}`}>
                        {entry.type === "search" ? "🔍" : "👆"}
                      </span>
                      <span className="text-xs truncate">{entry.query}</span>
                      {entry.type === "click" && entry.clickedName && (
                        <span className="text-[9px] text-gray-600 truncate hidden sm:inline">→ {entry.clickedName}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {entry.type === "search" && (
                        <span className="text-[9px] text-gray-600">{entry.resultCount} results</span>
                      )}
                      <span className="text-[9px] text-gray-600">{formatDate(entry.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div >
  );
}
