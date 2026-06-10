"use client";

import Navbar from "@/components/Navbar";
import leaderboardData from "@/data/leaderboard.json";
import { Trophy, Star, Target, Zap, Medal, GitMerge, FileText } from "lucide-react";
import { motion } from "framer-motion";

export interface LeaderboardUser {
  username: string;
  displayName: string;
  avatar: string;
  xp: number;
  rank: string;
  streak: number;
  contributions: {
    workflows: number;
    prompts: number;
    articles: number;
  };
  badges: string[];
}

export default function LeaderboardPage() {
  const users = leaderboardData as LeaderboardUser[];
  
  // Sort by XP just in case
  const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return "from-yellow-400 to-amber-600 text-yellow-400 border-yellow-500/50 bg-yellow-500/10";
      case 1: return "from-gray-300 to-gray-500 text-gray-300 border-gray-400/50 bg-gray-400/10";
      case 2: return "from-orange-400 to-amber-700 text-orange-400 border-orange-500/50 bg-orange-500/10";
      default: return "from-blue-400 to-purple-500 text-gray-400 border-white/5 bg-white/5";
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-20 space-y-16 relative z-10">
        
        {/* Header */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-bold uppercase tracking-widest">
            <Trophy size={14} /> Contributors
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Fame</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The top builders, prompt engineers, and creators shaping the Open AI Developer Ecosystem.
          </p>
        </header>

        {/* Leaderboard Table */}
        <div className="space-y-4">
          {sortedUsers.map((user, index) => {
            const rankStyle = getRankColor(index);
            const isTop3 = index < 3;

            return (
              <motion.div
                key={user.username}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-3xl glass border transition-all hover:scale-[1.02] ${
                  isTop3 ? rankStyle : "border-white/10 bg-white/5 hover:border-blue-500/30"
                }`}
              >
                {/* Rank Number */}
                <div className="w-12 text-center flex-shrink-0">
                  <span className={`text-2xl md:text-4xl font-black ${isTop3 ? "" : "text-gray-600"}`}>
                    #{index + 1}
                  </span>
                </div>

                {/* Avatar */}
                <div className="relative">
                  <img src={user.avatar} alt={user.displayName} className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/10" />
                  {isTop3 && (
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center border border-white/20">
                      <Medal size={14} className={index === 0 ? "text-yellow-400" : index === 1 ? "text-gray-300" : "text-orange-400"} />
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg md:text-xl font-bold truncate text-white">{user.displayName}</h2>
                    <span className="hidden md:inline px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-gray-400 border border-white/5">
                      {user.rank}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                    <span>@{user.username}</span>
                  </div>

                  {/* Badges - Desktop only for space */}
                  <div className="hidden md:flex flex-wrap gap-1.5 mt-3">
                    {user.badges.map(badge => (
                      <span key={badge} className="px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 text-right">
                  <div className="hidden sm:block text-gray-400 space-y-1">
                    <div className="flex items-center justify-end gap-1.5 text-xs">
                      <GitMerge size={12} className="text-blue-400" /> {user.contributions.workflows} Workflows
                    </div>
                    <div className="flex items-center justify-end gap-1.5 text-xs">
                      <Target size={12} className="text-purple-400" /> {user.contributions.prompts} Prompts
                    </div>
                    <div className="flex items-center justify-end gap-1.5 text-xs">
                      <FileText size={12} className="text-emerald-400" /> {user.contributions.articles} Articles
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 border-l border-white/10 pl-6">
                    <div className="text-xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                      {user.xp.toLocaleString()}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">XP Points</div>
                    {user.streak > 0 && (
                      <div className="flex items-center gap-1 text-xs font-bold text-orange-400 mt-1 bg-orange-500/10 px-2 py-0.5 rounded-md">
                        <Zap size={10} className="fill-orange-400" /> {user.streak} Day Streak
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center pt-8">
          <p className="text-gray-500 mb-4">Want to climb the ranks?</p>
          <a href="/submit" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/10">
            Submit a Tool, Workflow or Prompt
          </a>
        </div>

      </main>
    </div>
  );
}
