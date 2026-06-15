"use client";

import { motion } from "framer-motion";
import { Crown, Users, TrendingUp } from "lucide-react";
import { TIER_COLORS } from "@/lib/dsa/data";
import type { RankingTier } from "@/lib/dsa/types";

const TIER_BADGES: Record<string, string> = {
  Bronze: "🥉", Silver: "🥈", Gold: "🥇", Platinum: "💎", Diamond: "🔷", Master: "👑", Grandmaster: "🔥", Legend: "⭐",
};

const TIER_POINTS: Record<string, string> = {
  Bronze: "0 - 1,499", Silver: "1,500 - 2,999", Gold: "3,000 - 4,999", Platinum: "5,000 - 7,499",
  Diamond: "7,500 - 9,999", Master: "10,000 - 14,999", Grandmaster: "15,000 - 19,999", Legend: "20,000+",
};

interface Props {
  tier: RankingTier;
  index: number;
  userCount: number;
}

export default function DSARankingCard({ tier, index, userCount }: Props) {
  const colors = TIER_COLORS[tier];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`group p-5 rounded-2xl ${colors.bg} border ${colors.border} hover:scale-[1.02] transition-all duration-500 cursor-pointer`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-3xl">{TIER_BADGES[tier]}</span>
          <div className={`text-[8px] font-bold uppercase tracking-widest ${colors.text}`}>{tier}</div>
        </div>
        <div className={`h-1.5 rounded-full bg-gradient-to-r ${colors.gradient}`} />
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <Users size={11} /> {userCount} players
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500">
            <TrendingUp size={11} /> {TIER_POINTS[tier]} points
          </div>
        </div>
      </div>
    </motion.div>
  );
}
