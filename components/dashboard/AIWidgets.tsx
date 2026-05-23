"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Calculator,
  Layers,
  ArrowRight,
  Wand2,
  CircleDollarSign,
  CircleDot,
} from "lucide-react";

const WIDGETS = [
  {
    href: "/prompt-optimizer",
    icon: Wand2,
    title: "Prompt Optimizer",
    body: "Compress prompts up to 70% while preserving placeholders and code.",
    cta: "Optimize",
    accent: {
      from: "from-orange-500/25",
      to: "to-pink-500/15",
      text: "text-orange-300",
      border: "border-orange-500/30",
      glow: "shadow-[0_0_28px_rgba(249,115,22,0.18)]",
    },
    sparks: ["6 modes", "JSON safe", "Placeholders intact"],
  },
  {
    href: "/token-calculator",
    icon: Calculator,
    title: "Token & Cost Calculator",
    body: "Live token + dollar projection across 10 frontier models.",
    cta: "Calculate",
    accent: {
      from: "from-emerald-500/25",
      to: "to-cyan-500/15",
      text: "text-emerald-300",
      border: "border-emerald-500/30",
      glow: "shadow-[0_0_28px_rgba(16,185,129,0.18)]",
    },
    sparks: ["10 models", "Volume preset", "Context bars"],
  },
  {
    href: "/compare",
    icon: CircleDollarSign,
    title: "Pricing & Tool Compare",
    body: "Side-by-side capabilities, pricing tiers, models, ecosystems.",
    cta: "Compare",
    accent: {
      from: "from-cyan-500/25",
      to: "to-purple-500/15",
      text: "text-cyan-300",
      border: "border-cyan-500/30",
      glow: "shadow-[0_0_28px_rgba(34,211,238,0.18)]",
    },
    sparks: ["9 tools", "12 capabilities", "Live filter"],
  },
  {
    href: "/workflow",
    icon: Layers,
    title: "Workflow Generator",
    body: "Drag-and-drop agent chains and prompt pipelines.",
    cta: "Open Builder",
    accent: {
      from: "from-purple-500/25",
      to: "to-pink-500/15",
      text: "text-purple-300",
      border: "border-purple-500/30",
      glow: "shadow-[0_0_28px_rgba(168,85,247,0.18)]",
    },
    sparks: ["LangGraph-style", "Node canvas", "Prompt chains"],
  },
];

export default function AIWidgets() {
  return (
    <section className="px-4 sm:px-6 pb-10">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <div className="badge badge-purple inline-flex mb-2">
              <Sparkles size={11} /> Workspace Widgets
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Tools at your <span className="gradient-text-dash">fingertips</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          {WIDGETS.map((w, i) => (
            <motion.div
              key={w.href}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={w.href}
                className={`group relative block h-full p-5 rounded-2xl bg-gradient-to-br ${w.accent.from} ${w.accent.to} border ${w.accent.border} hover:${w.accent.glow} hover:border-white/30 transition-all overflow-hidden`}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-black/30 border border-white/10 ${w.accent.text}`}>
                      <w.icon size={16} />
                    </span>
                    <CircleDot size={12} className="text-gray-600" />
                  </div>
                  <h3 className="text-base font-black text-white leading-tight">
                    {w.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{w.body}</p>
                  <div className="flex flex-wrap gap-1">
                    {w.sparks.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/30 border border-white/8 text-gray-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${w.accent.text} group-hover:translate-x-1 transition-transform`}>
                    {w.cta} <ArrowRight size={11} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
