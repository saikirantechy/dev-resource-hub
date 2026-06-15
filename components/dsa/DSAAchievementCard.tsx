"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle2, Clock } from "lucide-react";
import type { Achievement } from "@/lib/dsa/types";

interface Props {
  achievement: Achievement;
  index: number;
}

export default function DSAAchievementCard({ achievement, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.08 }}
      className={`group p-5 rounded-2xl border transition-all duration-500 ${
        achievement.unlocked
          ? "glass border-blue-500/20 hover:border-blue-500/40"
          : "bg-white/[0.02] border-white/5 opacity-50 hover:opacity-80"
      }`}
    >
      <div className="space-y-4 text-center">
        {/* Icon */}
        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mx-auto text-2xl ${
          achievement.unlocked ? "group-hover:scale-110" : ""
        } transition-transform`}>
          {achievement.unlocked ? achievement.icon : <Lock size={20} className="text-white/50" />}
        </div>

        {/* Info */}
        <div>
          <h3 className={`font-bold text-sm ${achievement.unlocked ? "text-white" : "text-gray-500"}`}>{achievement.title}</h3>
          <p className="text-[10px] text-gray-500 mt-1">{achievement.description}</p>
        </div>

        {/* Condition / Unlocked At */}
        {achievement.unlocked ? (
          <div className="flex items-center justify-center gap-1.5 text-[9px] text-emerald-400 font-bold">
            <CheckCircle2 size={10} /> Unlocked {achievement.unlockedAt}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-1.5 text-[9px] text-gray-600 font-bold">
            <Clock size={10} /> {achievement.condition}
          </div>
        )}
      </div>
    </motion.div>
  );
}
