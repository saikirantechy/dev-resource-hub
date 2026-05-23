"use client";

import { motion } from "framer-motion";
import { Scale, Sparkles, Zap } from "lucide-react";

const particles = Array.from({ length: 12 }, (_, i) => i);

export default function Hero() {
  return (
    <section className="relative px-4 sm:px-6 pt-28 pb-16 overflow-hidden">
      {/* Animated orbs */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.25, 0.5, 0.25],
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.45, 0.2],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-40 right-1/4 w-[520px] h-[520px] bg-purple-500/10 rounded-full blur-[140px] -z-10"
      />

      {/* Particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((i) => (
          <motion.span
            key={i}
            initial={{
              opacity: 0,
              x: `${(i * 79) % 100}%`,
              y: `${(i * 47) % 100}%`,
            }}
            animate={{
              opacity: [0, 0.75, 0],
              y: [`${(i * 47) % 100}%`, `${((i * 47) % 100) - 18}%`],
            }}
            transition={{
              duration: 6 + (i % 4),
              repeat: Infinity,
              delay: i * 0.45,
              ease: "easeInOut",
            }}
            className={`absolute w-1.5 h-1.5 rounded-full ${
              i % 4 === 0
                ? "bg-cyan-400"
                : i % 4 === 1
                  ? "bg-emerald-400"
                  : i % 4 === 2
                    ? "bg-purple-400"
                    : "bg-orange-400"
            } shadow-[0_0_12px_currentColor]`}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center space-y-8 relative">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-[0.18em]"
        >
          <Scale size={12} /> AI Stack Comparison
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]"
        >
          <span className="gradient-text-stack">Pick your AI stack.</span>
          <br />
          <span className="text-white/90">Ship the right code.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Side-by-side breakdown of Cursor, Windsurf, Devin, Copilot, Claude,
          Replit, Warp, v0, and Lovable — capabilities, pricing, models, and
          ecosystem in one screen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-bold">
            <Zap size={11} /> 12 Capabilities
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold">
            <Sparkles size={11} /> 9 Tools
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-bold">
            <Scale size={11} /> Live Filtering
          </span>
        </motion.div>
      </div>
    </section>
  );
}
