"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, MapPin, Building2, GraduationCap, Users, Globe, Award, Calendar } from "lucide-react";
import { DEVELOPERS, TIER_THRESHOLDS, DEFAULT_GITHUB_STATS, INSIGHTS } from "@/lib/devrank/data";
import DevRankProfileComponent from "@/components/devrank/DevRankProfile";
import DevRankChart from "@/components/devrank/DevRankChart";

interface Props {
  username?: string;
}

export default function DevRankProfilePage({ username }: Props) {
  const params = useParams();
  const resolvedUsername = username || (params?.username as string);

  const developer = DEVELOPERS.find(d => d.username === resolvedUsername) || DEVELOPERS[0];
  const isRealUser = DEVELOPERS.some(d => d.username === resolvedUsername);
  const tierInfo = TIER_THRESHOLDS.find(t => t.tier === developer.tier) || TIER_THRESHOLDS[0];

  const stats = DEFAULT_GITHUB_STATS;
  const trendData = stats.repoGrowth.map(r => ({ label: r.date.split("-")[1] + "/" + r.date.split("-")[0].slice(2), value: r.count }));
  const heatmapData = stats.activityHeatmap.slice(0, 52).map((v, i) => ({ label: `W${i + 1}`, value: v }));
  const relatedInsights = INSIGHTS.slice(0, 4);

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <Link href="/devrank" className="inline-flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"><ArrowLeft size={12} /> Back to DevRank</Link>
        {!isRealUser && (
          <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 font-bold">
            Profile for &quot;{resolvedUsername}&quot; not found — showing sample profile for {developer.displayName}
          </div>
        )}
      </div>

      <DevRankProfileComponent developer={developer} githubStats={stats} />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass border border-white/10">
          <div className="flex items-center gap-2 mb-4"><Calendar size={14} className="text-cyan-400" /><h3 className="text-sm font-bold text-white">Repository Growth</h3></div>
          <DevRankChart data={trendData} height={120} barColor="from-cyan-500 to-blue-500" />
        </div>
        <div className="p-6 rounded-2xl glass border border-white/10">
          <div className="flex items-center gap-2 mb-4"><Globe size={14} className="text-emerald-400" /><h3 className="text-sm font-bold text-white">Contribution Activity (Weekly)</h3></div>
          <DevRankChart data={heatmapData} height={120} barColor="from-emerald-500 to-teal-500" showLabels={false} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-black flex items-center gap-2"><Award size={18} className="text-amber-400" /> AI Insights</h2>
        <div className="grid gap-3">
          {relatedInsights.map((insight, i) => (
            <motion.div key={insight.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl glass border border-white/10"
            >
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                  insight.type === "strength" ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" :
                  insight.type === "weakness" ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" :
                  insight.type === "opportunity" ? "text-blue-400 bg-blue-500/10 border border-blue-500/20" :
                  "text-purple-400 bg-purple-500/10 border border-purple-500/20"
                }`}>{insight.type}</span>
                <span className="text-xs font-bold text-white flex-1">{insight.title}</span>
                <span className={`text-sm font-black text-transparent bg-clip-text bg-gradient-to-r ${
                  insight.type === "strength" ? "from-emerald-400 to-teal-500" :
                  insight.type === "weakness" ? "from-amber-400 to-orange-500" :
                  insight.type === "opportunity" ? "from-blue-400 to-indigo-500" :
                  "from-purple-400 to-pink-500"
                }`}>{insight.score}</span>
              </div>
              <p className="text-[10px] text-gray-500 mt-1 ml-1">{insight.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/devrank/insights" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors">View All Insights →</Link>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-black flex items-center gap-2"><Users size={18} className="text-blue-400" /> Similar Developers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DEVELOPERS.filter(d => d.id !== developer.id).slice(0, 4).map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link href={`/devrank/profile/${d.username}`}
                className="group p-4 rounded-xl glass border border-white/10 hover:border-blue-500/30 card-hover transition-all duration-500 block text-center"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-black text-white mx-auto">{d.displayName[0]}</div>
                <div className="text-[10px] font-bold text-white mt-2 truncate">{d.displayName}</div>
                <div className="text-[8px] text-gray-500">@{d.username}</div>
                <div className={`text-xs font-black text-transparent bg-clip-text bg-gradient-to-r ${tierInfo.color} mt-1`}>#{d.rank}</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 rounded-[2rem] glass border border-white/10 text-center space-y-4">
        <Globe size={24} className="mx-auto text-blue-400" />
        <h2 className="text-xl font-black">Connect Your GitHub</h2>
        <p className="text-gray-500 text-xs max-w-lg mx-auto">Get your personalized DevRank profile with real-time analytics, AI insights, and shareable badges.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <button className="btn-primary px-6 py-3 rounded-xl text-[10px] font-bold"><ExternalLink size={14} /> Connect GitHub</button>
          <Link href="/devrank" className="btn-secondary px-6 py-3 rounded-xl text-[10px] font-bold">Back to DevRank</Link>
        </div>
      </div>
    </div>
  );
}
