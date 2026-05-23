"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Terminal,
  Scale,
  Sparkles,
  Bot,
  Layers,
  Calculator,
  ArrowRight,
} from "lucide-react";

const ACTIONS = [
  {
    href: "/prompt-optimizer",
    icon: Sparkles,
    label: "Optimize Prompt",
    desc: "Strip filler, save tokens",
    from: "from-orange-500/25",
    to: "to-pink-500/15",
    text: "text-orange-300",
    border: "border-orange-500/30",
  },
  {
    href: "/compare",
    icon: Scale,
    label: "Compare Tools",
    desc: "9 AI tools, side-by-side",
    from: "from-cyan-500/25",
    to: "to-blue-500/15",
    text: "text-cyan-300",
    border: "border-cyan-500/30",
  },
  {
    href: "/token-calculator",
    icon: Calculator,
    label: "Token Calculator",
    desc: "Live cost across 10 models",
    from: "from-emerald-500/25",
    to: "to-cyan-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
  },
  {
    href: "/ai-agents",
    icon: Bot,
    label: "Explore Agents",
    desc: "Browse autonomous agents",
    from: "from-purple-500/25",
    to: "to-pink-500/15",
    text: "text-purple-300",
    border: "border-purple-500/30",
  },
  {
    href: "/prompts",
    icon: Terminal,
    label: "Create Prompt",
    desc: "Open the prompt library",
    from: "from-pink-500/25",
    to: "to-red-500/15",
    text: "text-pink-300",
    border: "border-pink-500/30",
  },
  {
    href: "/workflow",
    icon: Layers,
    label: "Generate Workflow",
    desc: "Visual agent pipelines",
    from: "from-blue-500/25",
    to: "to-purple-500/15",
    text: "text-blue-300",
    border: "border-blue-500/30",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-3xl glass-strong border border-white/10 p-5 md:p-6 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-emerald-300" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
            Quick Actions
          </span>
        </div>
        <span className="text-[10px] text-gray-600 font-bold">6 shortcuts</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ACTIONS.map((a, i) => (
          <motion.div
            key={a.href}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              href={a.href}
              className={`group flex items-center gap-3 p-3.5 rounded-2xl bg-gradient-to-br ${a.from} ${a.to} border ${a.border} hover:border-white/30 transition-all`}
            >
              <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-black/30 border border-white/10 shrink-0 ${a.text}`}>
                <a.icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black text-white truncate">{a.label}</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest truncate">
                  {a.desc}
                </div>
              </div>
              <ArrowRight
                size={14}
                className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
