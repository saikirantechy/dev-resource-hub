"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { STATS } from "@/lib/dashboardData";

export interface DashboardHeroProps {
  userName?: string | null;
}

const particles = Array.from({ length: 10 }, (_, i) => i);

export default function DashboardHero({ userName }: DashboardHeroProps) {
  const greeting = userName ? userName.split(" ")[0] : "Developer";

  return (
    <section className="relative px-4 sm:px-6 pt-24 pb-10 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 left-1/4 w-[480px] h-[480px] bg-emerald-500/12 rounded-full blur-[140px] -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.18, 0.4, 0.18] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-32 right-1/4 w-[520px] h-[520px] bg-cyan-500/10 rounded-full blur-[160px] -z-10"
      />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: `${(i * 71) % 100}%`, y: `${(i * 43) % 100}%` }}
            animate={{ opacity: [0, 0.6, 0], y: [`${(i * 43) % 100}%`, `${((i * 43) % 100) - 14}%`] }}
            transition={{ duration: 7 + (i % 4), repeat: Infinity, delay: i * 0.45, ease: "easeInOut" }}
            className={`absolute w-1.5 h-1.5 rounded-full ${
              i % 3 === 0 ? "bg-emerald-400" : i % 3 === 1 ? "bg-cyan-400" : "bg-purple-400"
            } shadow-[0_0_12px_currentColor]`}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-[0.18em]"
            >
              <Sparkles size={11} /> Dev OS · Online
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95]"
            >
              <span className="text-white/95">Welcome back,</span>{" "}
              <span className="gradient-text-dash">{greeting}</span>.
            </motion.h1>
            <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
              Your AI developer dashboard. Prompts, tokens, agents, workflows —
              the whole stack, one screen.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl glass border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <div className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
              All systems
            </div>
            <div className="text-sm font-black text-emerald-300">Operational</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="rounded-2xl glass border border-white/8 p-4 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.25em] font-black">
                <span className="text-gray-500">{s.label}</span>
                <span className="inline-flex items-center gap-0.5 text-emerald-300">
                  <TrendingUp size={9} /> {s.delta}
                </span>
              </div>
              <div className={`text-3xl md:text-4xl font-black tabular-nums mt-2 ${s.color}`}>
                {s.value}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
