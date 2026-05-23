"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Cpu } from "lucide-react";

const particles = Array.from({ length: 14 }, (_, i) => i);

export default function Hero() {
  return (
    <section className="relative px-4 sm:px-6 pt-32 pb-20 overflow-hidden">
      {/* Animated background orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.5, 0.25],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.45, 0.2],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-40 right-1/4 w-[520px] h-[520px] bg-emerald-500/10 rounded-full blur-[140px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-cyan-500/10 rounded-full blur-[120px] -z-10"
      />

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((i) => (
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              x: `${(i * 73) % 100}%`,
              y: `${(i * 41) % 100}%`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [`${(i * 41) % 100}%`, `${((i * 41) % 100) - 20}%`],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
            className={`absolute w-1.5 h-1.5 rounded-full ${
              i % 4 === 0
                ? "bg-orange-400"
                : i % 4 === 1
                  ? "bg-emerald-400"
                  : i % 4 === 2
                    ? "bg-cyan-400"
                    : "bg-pink-400"
            } shadow-[0_0_12px_currentColor]`}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-10 relative">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-orange-500/25 text-orange-300 text-xs font-bold uppercase tracking-[0.18em]"
        >
          <Sparkles size={12} /> AI Prompt Optimizer
        </motion.div>

        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            <span className="gradient-text-prompt">Optimize your prompts.</span>
            <br />
            <span className="text-white/90">Save tokens and cost.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            Paste any AI prompt below. We intelligently rewrite it into a
            leaner, more efficient version while preserving meaning,
            placeholders, and constraints.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold">
            <Zap size={11} /> 78% Avg Reduction
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold">
            <Cpu size={11} /> Multi-Model Ready
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/25 text-pink-300 text-xs font-bold">
            <Sparkles size={11} /> Placeholder Safe
          </span>
        </motion.div>
      </div>
    </section>
  );
}
