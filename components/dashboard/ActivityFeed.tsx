"use client";

import { motion } from "framer-motion";
import {
  Rocket,
  Newspaper,
  GitFork,
  Terminal,
  CircleDot,
} from "lucide-react";
import { ACTIVITY_FEED, ActivityItem } from "@/lib/dashboardData";

const KIND_META: Record<
  ActivityItem["kind"],
  { icon: React.ComponentType<{ size?: number; className?: string }>; tint: string; bg: string; border: string }
> = {
  launch: { icon: Rocket,    tint: "text-orange-300", bg: "bg-orange-500/10",  border: "border-orange-500/25" },
  repo:   { icon: GitFork,   tint: "text-cyan-300",   bg: "bg-cyan-500/10",    border: "border-cyan-500/25" },
  prompt: { icon: Terminal,  tint: "text-purple-300", bg: "bg-purple-500/10",  border: "border-purple-500/25" },
  news:   { icon: Newspaper, tint: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-500/25" },
};

export default function ActivityFeed() {
  return (
    <div className="rounded-3xl glass-strong border border-white/10 p-5 md:p-6 h-full flex flex-col" aria-label="Live activity feed">
      <div className="flex items-center justify-between pb-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <CircleDot size={12} className="text-emerald-300 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
            Live Activity
          </span>
        </div>
        <span className="text-[10px] font-bold text-gray-600">past 24h</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 pt-4 scrollbar-hide max-h-[420px]">
        {ACTIVITY_FEED.map((a, i) => {
          const meta = KIND_META[a.kind];
          const Icon = meta.icon;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-start gap-3"
            >
              <span
                className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-xl ${meta.bg} border ${meta.border} ${meta.tint}`}
              >
                <Icon size={14} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold text-white leading-snug">
                  {a.title}
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>{a.meta}</span>
                  <span className="text-gray-700">•</span>
                  <span className="text-emerald-300">{a.when} ago</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
