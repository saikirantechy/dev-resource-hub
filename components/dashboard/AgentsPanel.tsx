"use client";

import { motion } from "framer-motion";
import { Bot, ArrowRight } from "lucide-react";
import Link from "next/link";
import { DASHBOARD_AGENTS } from "@/lib/dashboardData";

const STATUS_META: Record<string, { label: string; color: string; dot: string }> = {
  idle:    { label: "Idle",    color: "text-gray-400",     dot: "bg-gray-500" },
  ready:   { label: "Ready",   color: "text-cyan-300",     dot: "bg-cyan-400" },
  running: { label: "Running", color: "text-emerald-300",  dot: "bg-emerald-400 animate-pulse" },
};

export default function AgentsPanel() {
  return (
    <div className="rounded-3xl glass-strong border border-white/10 p-5 md:p-6 h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-white/8">
        <div className="flex items-center gap-2">
          <Bot size={14} className="text-purple-300" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
            Agent Crew
          </span>
        </div>          <Link
            href="/ai-agents"
            className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            aria-label="View all agents"
          >
            All Agents <ArrowRight size={11} aria-hidden="true" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5 pt-4 scrollbar-hide max-h-[420px]">
        {DASHBOARD_AGENTS.map((a, i) => {
          const s = STATUS_META[a.status];
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl bg-gradient-to-br ${a.accent.from} ${a.accent.to} border ${a.accent.border} p-3.5 group hover:border-white/30 transition-all`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-2xl shrink-0">{a.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-black text-white truncate">
                      {a.name} Agent
                    </div>
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${a.accent.text}`}>
                      {a.role}
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/30 border border-white/10 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                  <span className={`text-[9px] font-black uppercase tracking-widest ${s.color}`}>
                    {s.label}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {a.capabilities.map((c) => (
                  <span
                    key={c}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/30 border border-white/8 text-gray-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
