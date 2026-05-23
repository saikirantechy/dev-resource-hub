"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Lightbulb,
  TrendingDown,
  Scale,
  ArrowRight,
  Cpu,
  AlertTriangle,
} from "lucide-react";

const TIPS = [
  {
    icon: TrendingDown,
    title: "Optimize before scaling",
    body: "Tighten your prompts first — a 30% reduction in tokens compounds across every call.",
    color: "text-orange-300",
    border: "border-orange-500/25",
  },
  {
    icon: Scale,
    title: "Output > input on cost",
    body: "Output tokens are 3–5× more expensive than input on most models. Cap max_tokens aggressively.",
    color: "text-pink-300",
    border: "border-pink-500/25",
  },
  {
    icon: Cpu,
    title: "Match model to job",
    body: "Reach for Opus/4o only when the task demands it. Haiku/4o-mini handle 80% of workloads for ~5% of cost.",
    color: "text-emerald-300",
    border: "border-emerald-500/25",
  },
  {
    icon: Lightbulb,
    title: "Cache identical prefixes",
    body: "If your system prompt is fixed, use prompt caching — most providers discount cached tokens up to 90%.",
    color: "text-cyan-300",
    border: "border-cyan-500/25",
  },
];

const FAQS = [
  {
    q: "Are these token counts exact?",
    a: "They're close approximations based on average chars-per-token ratios per model family. For exact counts use each provider's official tokenizer (tiktoken, anthropic-tokenizer, etc.).",
  },
  {
    q: "Where do the prices come from?",
    a: "Public API pricing per million tokens as of early 2026. Pricing can change — always cross-check with the provider's pricing page before committing to volume.",
  },
  {
    q: "Why does Claude show 3.8 chars/token but GPT shows 4.0?",
    a: "Different models use different tokenizers. Claude's is slightly denser than cl100k_base, Gemini's is slightly sparser. Same text → different token counts.",
  },
  {
    q: "What about prompt caching discounts?",
    a: "Cached tokens are typically 10–25% of the regular input price. This calculator shows full input cost — divide by ~4–10× to estimate steady-state with caching.",
  },
];

export default function Tips() {
  return (
    <section className="px-4 sm:px-6 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="badge badge-emerald inline-flex"><Sparkles size={11} /> Cost Engineering</div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
            Cut your bill <span className="gradient-text-calc">in half</span>.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Four levers that turn a $10k month into a $2k month without
            sacrificing quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {TIPS.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`group relative rounded-2xl glass border ${t.border} p-5 overflow-hidden`}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-3">
                <t.icon size={20} className={t.color} />
                <h3 className="text-base font-black text-white">{t.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{t.body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FAQS.map((f, i) => (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl glass border border-white/10 p-5 space-y-2"
            >
              <div className="flex items-center gap-2">
                <AlertTriangle size={13} className="text-yellow-300" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-500">
                  FAQ
                </span>
              </div>
              <div className="text-sm font-black text-white">{f.q}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{f.a}</div>
            </motion.div>
          ))}
        </div>

        {/* Cross-link */}
        <div className="rounded-3xl glass-strong border border-white/10 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-500">
              Pair with
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white">
              Run your prompt through the{" "}
              <span className="gradient-text-prompt">AI Prompt Optimizer</span>
            </h3>
            <p className="text-sm text-gray-400 max-w-md">
              Strip filler, preserve placeholders and code, and re-run this
              calculator to see the savings drop in real time.
            </p>
          </div>
          <Link
            href="/prompt-optimizer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 text-white hover:scale-[1.02] transition-transform shrink-0"
          >
            Optimize Prompts <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
