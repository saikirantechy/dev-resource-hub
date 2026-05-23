"use client";

import { motion } from "framer-motion";
import { Calculator, Sparkles, DollarSign } from "lucide-react";

const particles = Array.from({ length: 12 }, (_, i) => i);

export default function Hero() {
  return (
    <section className="relative px-4 sm:px-6 pt-28 pb-12 overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[120px] -z-10"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.18, 0.4, 0.18], x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="absolute top-32 right-1/4 w-[520px] h-[520px] bg-blue-500/10 rounded-full blur-[140px] -z-10"
      />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        {particles.map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: `${(i * 67) % 100}%`, y: `${(i * 53) % 100}%` }}
            animate={{
              opacity: [0, 0.7, 0],
              y: [`${(i * 53) % 100}%`, `${((i * 53) % 100) - 15}%`],
            }}
            transition={{ duration: 6 + (i % 4), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            className={`absolute w-1.5 h-1.5 rounded-full ${
              i % 4 === 0
                ? "bg-emerald-400"
                : i % 4 === 1
                  ? "bg-blue-400"
                  : i % 4 === 2
                    ? "bg-purple-400"
                    : "bg-pink-400"
            } shadow-[0_0_12px_currentColor]`}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto text-center space-y-7 relative">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-[0.18em]"
        >
          <Calculator size={12} /> Token & Cost Calculator
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9]"
        >
          <span className="gradient-text-calc">Count tokens.</span>
          <br />
          <span className="text-white/90">Predict your bill.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          Paste a prompt and see live token counts and dollar cost across 10
          frontier models — GPT, Claude, Gemini, Llama, DeepSeek and Mistral —
          side by side.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold">
            <Sparkles size={11} /> 10 Models
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-xs font-bold">
            <DollarSign size={11} /> Live Cost
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-bold">
            <Calculator size={11} /> Scale Projection
          </span>
        </motion.div>
      </div>
    </section>
  );
}
