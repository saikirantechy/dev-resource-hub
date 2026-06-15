"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle2, Clock } from "lucide-react";
import type { DevRankBadge } from "@/lib/devrank/types";

interface Props {
  badge: DevRankBadge;
  index: number;
}

export default function DevRankBadgeCard({ badge, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className={`group p-5 rounded-2xl border transition-all duration-500 ${
        badge.unlocked ? `bg-gradient-to-br ${badge.gradient} border-white/10 hover:border-blue-500/30` : "bg-white/[0.02] border-white/5 opacity-50 hover:opacity-80"
      }`}
    >
      <div className="space-y-4 text-center">
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center mx-auto text-2xl ${badge.unlocked ? "group-hover:scale-110" : ""} transition-transform`}>
          {badge.unlocked ? badge.icon.split(" ")[0] || "🏆" : <Lock size={18} className="text-white/50" />}
        </div>
        <div>
          <h3 className={`font-bold text-sm ${badge.unlocked ? "text-white" : "text-gray-500"}`}>{badge.name}</h3>
          <p className="text-[10px] text-gray-500 mt-1">{badge.description}</p>
        </div>
        {badge.unlocked ? (
          <div className="flex items-center justify-center gap-1.5 text-[9px] text-emerald-400 font-bold">
            <CheckCircle2 size={10} /> Unlocked {badge.unlockedAt}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-[9px] text-gray-600 font-bold">
            <Clock size={10} /> {badge.condition}
          </div>
        )}
      </div>
    </motion.div>
  );
}
