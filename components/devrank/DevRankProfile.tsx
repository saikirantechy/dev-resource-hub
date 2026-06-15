"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, GraduationCap, Users, GitPullRequest, Star, GitFork, Eye, Flame, Code2, Award, TrendingUp, BarChart3 } from "lucide-react";
import type { Developer, GitHubStats } from "@/lib/devrank/types";
import { TIER_THRESHOLDS, DEFAULT_GITHUB_STATS } from "@/lib/devrank/data";

interface Props {
  developer: Developer;
  githubStats?: GitHubStats;
}

export default function DevRankProfile({ developer: d, githubStats }: Props) {
  const stats = githubStats || DEFAULT_GITHUB_STATS;
  const tierInfo = TIER_THRESHOLDS.find(t => t.tier === d.tier) || TIER_THRESHOLDS[0];

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative p-6 md:p-8 rounded-[2rem] glass border border-white/10 overflow-hidden"
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${tierInfo.bgColor}`} />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-black text-white shrink-0">
            {d.displayName[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-black text-white">{d.displayName}</h1>
              <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${tierInfo.textColor} ${tierInfo.bgColor} border border-white/10`}>
                {d.tier} Tier
              </span>
              <span className="badge badge-blue">Rank #{d.rank}</span>
            </div>
            <p className="text-gray-400 text-sm mt-1">@{d.username} • {d.bio}</p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-[10px] text-gray-500">
              {(d.city || d.country) && <span className="flex items-center gap-1"><MapPin size={12} /> {[d.city, d.country].filter(Boolean).join(", ")}</span>}
              {d.college && <span className="flex items-center gap-1"><GraduationCap size={12} /> {d.college}</span>}
              {d.organization && <span className="flex items-center gap-1"><Building2 size={12} /> {d.organization}</span>}
              {d.community && <span className="flex items-center gap-1"><Users size={12} /> {d.community}</span>}
              <span className="flex items-center gap-1"><Flame size={12} /> {d.streak} day streak</span>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${tierInfo.color}`}>{d.score.toLocaleString()}</div>
            <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">DevRank Score</div>
          </div>
        </div>
      </motion.div>

      {/* GitHub Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: "Commits", value: stats.totalCommits.toLocaleString(), icon: Code2, color: "text-blue-400" },
          { label: "PRs Merged", value: stats.mergedPRs.toLocaleString(), icon: GitPullRequest, color: "text-emerald-400" },
          { label: "Stars", value: stats.totalStars >= 1000 ? `${(stats.totalStars/1000).toFixed(1)}k` : stats.totalStars.toString(), icon: Star, color: "text-amber-400" },
          { label: "Followers", value: stats.totalFollowers >= 1000 ? `${(stats.totalFollowers/1000).toFixed(1)}k` : stats.totalFollowers.toString(), icon: Users, color: "text-purple-400" },
          { label: "Repos", value: stats.totalRepos.toString(), icon: GitFork, color: "text-cyan-400" },
          { label: "PR Rate", value: `${stats.prSuccessRate}%`, icon: TrendingUp, color: "text-emerald-400" },
          { label: "Issue Rate", value: `${stats.issueResolutionRate}%`, icon: BarChart3, color: "text-orange-400" },
          { label: "Streak", value: `${stats.contributionStreak}d`, icon: Flame, color: "text-red-400" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-3 rounded-xl glass border border-white/5 text-center space-y-1"
          >
            <s.icon size={14} className={`mx-auto ${s.color}`} />
            <div className="text-sm font-bold">{s.value}</div>
            <div className="text-[7px] uppercase tracking-widest text-gray-600 font-bold">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Language Distribution */}
      <div className="p-6 rounded-2xl glass border border-white/10">
        <h3 className="font-bold text-sm text-white mb-4">Language Distribution</h3>
        <div className="space-y-3">
          {stats.languageDistribution.map((lang) => (
            <div key={lang.language} className="space-y-1">
              <div className="flex justify-between text-[10px]">
                <span className="text-gray-400">{lang.language}</span>
                <span className="text-gray-500">{lang.percentage}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: lang.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="p-6 rounded-2xl glass border border-white/10">
        <h3 className="font-bold text-sm text-white mb-3">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {d.techStack.map(tech => (
            <span key={tech} className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-400 border border-blue-500/20">{tech}</span>
          ))}
        </div>
      </div>

      {/* Badges */}
      {d.badges.length > 0 && (
        <div className="p-6 rounded-2xl glass border border-white/10">
          <h3 className="font-bold text-sm text-white mb-3 flex items-center gap-2"><Award size={14} className="text-amber-400" /> Badges</h3>
          <div className="flex flex-wrap gap-2">
            {d.badges.map(b => (
              <span key={b} className="px-3 py-1.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/5 text-[10px] font-bold text-amber-400 border border-amber-500/20">{b}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
