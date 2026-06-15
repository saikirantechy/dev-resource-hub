"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, Star, Activity, ArrowUp, ArrowDown } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

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
  const { can } = useAdmin();

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
    </div>
  );
}
