"use client";

import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import type { Developer } from "@/lib/devrank/types";
import { TIER_THRESHOLDS } from "@/lib/devrank/data";

interface Props {
  developer: Developer;
  index: number;
  compact?: boolean;
}

export default function DevRankCard({ developer: d, index, compact }: Props) {
  const tierInfo = TIER_THRESHOLDS.find(t => t.tier === d.tier) || TIER_THRESHOLDS[0];
  const isTop3 = index < 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`group flex items-center gap-4 p-4 md:p-5 rounded-2xl glass border transition-all hover:scale-[1.01] ${
        isTop3 ? "border-amber-500/20" : "border-white/10"
      } ${isTop3 ? "animate-neon-glow" : ""}`}
    >
      {/* Rank */}
      <div className="w-10 shrink-0 text-center">
        <span className={`text-xl font-black ${index === 0 ? "text-amber-400" : index === 1 ? "text-gray-300" : index === 2 ? "text-orange-400" : "text-gray-600"}`}>
          #{d.rank}
        </span>
      </div>

      {/* Avatar */}
      <div className="relative shrink-0">
        <div className={`w-11 h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-black text-white`}>
          {d.displayName[0]}
        </div>
        {isTop3 && (
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center border border-white/10">
            <Medal size={10} className={index === 0 ? "text-amber-400" : index === 1 ? "text-gray-300" : "text-orange-400"} />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-white truncate">{d.displayName}</span>
          <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${tierInfo.textColor} ${tierInfo.bgColor} border border-white/10`}>
            {d.tier}
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
          <span>@{d.username}</span>
          {d.college && <span>• {d.college}</span>}
          <span>• {d.country}</span>
        </div>
        {!compact && (
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            {d.languages.slice(0, 3).map(lang => (
              <span key={lang} className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-bold text-gray-400 border border-white/5">{lang}</span>
            ))}
            {d.badges.slice(0, 2).map(badge => (
              <span key={badge} className="px-1.5 py-0.5 rounded bg-blue-500/10 text-[8px] font-bold text-blue-400 border border-blue-500/20">{badge}</span>
            ))}
          </div>
        )}
      </div>

      {/* Stats */}
      {!compact && (
        <div className="hidden md:flex items-center gap-5 text-[10px] text-gray-500">
          <div className="text-center"><div className="font-bold text-white">{d.prs}</div><div className="uppercase tracking-wider">PRs</div></div>
          <div className="text-center"><div className="font-bold text-white">{d.mergedPrs}</div><div className="uppercase tracking-wider">Merged</div></div>
          <div className="text-center"><div className="font-bold text-white">{(d.stars/1000).toFixed(1)}k</div><div className="uppercase tracking-wider">Stars</div></div>
          <div className="text-center"><div className="font-bold text-white">{d.followers >= 1000 ? `${(d.followers/1000).toFixed(1)}k` : d.followers}</div><div className="uppercase tracking-wider">Follow</div></div>
        </div>
      )}

      {/* Score */}
      <div className="text-right border-l border-white/10 pl-4 shrink-0">
        <div className={`text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${tierInfo.color}`}>
          {d.score.toLocaleString()}
        </div>
        <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">Score</div>
      </div>
    </motion.div>
  );
}
