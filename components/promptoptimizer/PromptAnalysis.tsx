"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Gauge,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { analyze } from "@/lib/promptOptimizer";

export interface PromptAnalysisProps {
  input: string;
  optimized: string;
}

const METRIC_COLORS: Record<string, { bar: string; text: string; border: string }> = {
  verbosity: { bar: "from-orange-500 to-pink-500", text: "text-orange-300", border: "border-orange-500/25" },
  redundancy: { bar: "from-pink-500 to-purple-500", text: "text-pink-300", border: "border-pink-500/25" },
  ambiguity: { bar: "from-yellow-500 to-orange-500", text: "text-yellow-300", border: "border-yellow-500/25" },
  formatting: { bar: "from-cyan-500 to-emerald-500", text: "text-cyan-300", border: "border-cyan-500/25" },
};

export default function PromptAnalysis({ input, optimized }: PromptAnalysisProps) {
  const analysis = useMemo(() => analyze(input, optimized), [input, optimized]);

  const metrics: { key: keyof typeof METRIC_COLORS; label: string; value: number; hint: string }[] = [
    { key: "verbosity", label: "Verbosity", value: analysis.verbosity, hint: "lower is better" },
    { key: "redundancy", label: "Redundancy", value: analysis.redundancy, hint: "compression potential" },
    { key: "ambiguity", label: "Ambiguity", value: analysis.ambiguity, hint: "lower is better" },
    { key: "formatting", label: "Formatting", value: analysis.formatting, hint: "higher is better" },
  ];

  const score = analysis.score;
  const scoreColor =
    score >= 80 ? "text-emerald-300" : score >= 60 ? "text-cyan-300" : score >= 40 ? "text-yellow-300" : "text-orange-300";

  return (
    <section className="px-4 sm:px-6 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 relative overflow-hidden rounded-2xl glass border border-white/10 p-6"
          >
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="relative space-y-5">
              <div className="flex items-center gap-2">
                <Gauge size={16} className="text-emerald-300" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
                  Optimization Score
                </span>
              </div>

              <div className="flex items-end gap-2">
                <div className={`text-7xl font-black tabular-nums ${scoreColor}`}>{score}</div>
                <div className="pb-3 text-gray-500 text-lg font-bold">/100</div>
              </div>

              <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-emerald-500"
                />
              </div>

              <p className="text-sm text-gray-400 leading-relaxed">
                {score >= 80
                  ? "This prompt is already efficient. Minor tweaks may still help."
                  : score >= 60
                    ? "Solid prompt — a few optimizations will sharpen it."
                    : score >= 40
                      ? "Noticeable bloat detected. Optimization will save tokens."
                      : "Heavy verbosity. Run the optimizer for major savings."}
              </p>
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl glass border border-white/10 p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck size={16} className="text-cyan-300" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
                Prompt Diagnostics
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metrics.map((m, i) => {
                const color = METRIC_COLORS[m.key];
                return (
                  <div
                    key={m.key}
                    className={`rounded-xl p-4 bg-white/[0.03] border ${color.border}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-black uppercase tracking-widest ${color.text}`}>
                        {m.label}
                      </span>
                      <span className="text-xl font-black tabular-nums text-white">
                        {Math.round(m.value)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(100, Math.max(0, m.value))}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.08, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${color.bar} rounded-full`}
                      />
                    </div>
                    <div className="text-[10px] mt-2 text-gray-500 font-bold uppercase tracking-widest">
                      {m.hint}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Warnings */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="rounded-2xl glass border border-white/10 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={16} className="text-orange-300" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
                Warnings
              </span>
            </div>
            {analysis.warnings.length === 0 ? (
              <p className="text-sm text-gray-500">No warnings — clean prompt.</p>
            ) : (
              <ul className="space-y-2">
                {analysis.warnings.map((w, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300 bg-orange-500/5 border border-orange-500/15 rounded-lg px-3 py-2"
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 rounded-2xl glass border border-white/10 p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={16} className="text-yellow-300" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
                Recommendations
              </span>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {analysis.recommendations.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-300 bg-cyan-500/5 border border-cyan-500/15 rounded-lg px-3 py-2"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
