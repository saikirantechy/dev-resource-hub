"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BarChart3, ArrowLeft, TrendingUp, Star, Code2, Users, GitFork, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import DevRankChart from "@/components/devrank/DevRankChart";
import { DEFAULT_GITHUB_STATS, DEVELOPERS } from "@/lib/devrank/data";

const stats = DEFAULT_GITHUB_STATS;

const trendData = stats.repoGrowth.map(r => ({ label: r.date.split("-")[1] + "/" + r.date.split("-")[0].slice(2), value: r.count }));
const heatmapData = stats.activityHeatmap.slice(0, 52).map((v, i) => ({ label: `W${i + 1}`, value: v }));

const METRICS = [
  { label: "Productivity Score", value: "92", icon: Activity, color: "text-emerald-400", desc: "Above 95% of developers" },
  { label: "Influence Score", value: "88", icon: TrendingUp, color: "text-blue-400", desc: "Top 5% influence rank" },
  { label: "Community Score", value: "78", icon: Users, color: "text-purple-400", desc: "Active community engagement" },
  { label: "Innovation Score", value: "85", icon: Code2, color: "text-amber-400", desc: "Novel contributions" },
];

export default function DevRankAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10 relative z-10">

          <div className="space-y-4">
            <Link href="/devrank" className="inline-flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"><ArrowLeft size={12} /> Back to DevRank</Link>
            <div className="flex items-center gap-3">
              <BarChart3 size={24} className="text-violet-400" />
              <h1 className="text-3xl md:text-5xl font-black">Analytics <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500">Dashboard</span></h1>
            </div>
          </div>

          {/* Score Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {METRICS.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl glass border border-white/10 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <m.icon size={16} className={m.color} />
                  <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">{m.value}</span>
                </div>
                <div className="text-[10px] font-bold text-white">{m.label}</div>
                <div className="text-[8px] text-gray-600">{m.desc}</div>
              </motion.div>
            ))}
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Repository Growth */}
            <div className="p-6 rounded-2xl glass border border-white/10">
              <div className="flex items-center gap-2 mb-4"><GitFork size={14} className="text-cyan-400" /><h3 className="text-sm font-bold text-white">Repository Growth</h3></div>
              <DevRankChart data={trendData} height={140} barColor="from-cyan-500 to-blue-500" />
            </div>

            {/* Language Distribution */}
            <div className="p-6 rounded-2xl glass border border-white/10">
              <div className="flex items-center gap-2 mb-4"><Code2 size={14} className="text-amber-400" /><h3 className="text-sm font-bold text-white">Language Distribution</h3></div>
              <div className="space-y-3">
                {stats.languageDistribution.map((lang, i) => (
                  <motion.div key={lang.language} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="space-y-1">
                    <div className="flex justify-between text-[10px]"><span className="text-gray-400">{lang.language}</span><span className="text-gray-500">{lang.percentage}%</span></div>
                    <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${lang.percentage}%` }} transition={{ duration: 1, ease: "easeOut", delay: i * 0.1 }}
                        className="h-full rounded-full" style={{ backgroundColor: lang.color }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Activity Heatmap */}
            <div className="p-6 rounded-2xl glass border border-white/10">
              <div className="flex items-center gap-2 mb-4"><Activity size={14} className="text-emerald-400" /><h3 className="text-sm font-bold text-white">Activity Heatmap (Weekly)</h3></div>
              <DevRankChart data={heatmapData} height={100} barColor="from-emerald-500 to-teal-500" showLabels={false} />
              <div className="flex justify-between text-[7px] text-gray-600 font-bold mt-1"><span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span></div>
            </div>

            {/* Key Metrics */}
            <div className="p-6 rounded-2xl glass border border-white/10">
              <div className="flex items-center gap-2 mb-4"><Star size={14} className="text-amber-400" /><h3 className="text-sm font-bold text-white">Key Metrics</h3></div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "PR Success Rate", value: `${stats.prSuccessRate}%`, color: "text-emerald-400" },
                  { label: "Issue Resolution", value: `${stats.issueResolutionRate}%`, color: "text-blue-400" },
                  { label: "Current Streak", value: `${stats.contributionStreak} days`, color: "text-orange-400" },
                  { label: "Longest Streak", value: `${stats.longestStreak} days`, color: "text-amber-400" },
                  { label: "Avg PRs/Week", value: `${Math.round(stats.totalPRs / 52)}`, color: "text-purple-400" },
                  { label: "Avg Commits/Week", value: `${Math.round(stats.totalCommits / 52)}`, color: "text-cyan-400" },
                  { label: "Review Participation", value: `${stats.mergedPRs}/${stats.totalPRs}`, color: "text-violet-400" },
                  { label: "Followers/Repo", value: (stats.totalFollowers / stats.totalRepos).toFixed(1), color: "text-rose-400" },
                ].map((m, i) => (
                  <motion.div key={m.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <div className={`text-sm font-bold ${m.color}`}>{m.value}</div>
                    <div className="text-[7px] uppercase tracking-widest text-gray-600 font-bold mt-0.5">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Developer Comparison Section */}
          <div className="p-6 md:p-8 rounded-[2rem] glass border border-white/10 space-y-4">
            <h3 className="font-bold text-white flex items-center gap-2"><Users size={16} className="text-blue-400" /> Developer Comparison Tool</h3>
            <p className="text-gray-500 text-xs max-w-xl">Compare your stats with other developers across key metrics like PRs, stars, and contribution scores.</p>
            <div className="flex flex-wrap gap-3">
              {DEVELOPERS.slice(0, 4).map(d => (
                <Link key={d.id} href={`/devrank/profile/${d.username}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 text-[10px] font-bold text-gray-400 hover:text-white transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[8px] font-black text-white">{d.displayName[0]}</div>
                  {d.displayName}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
