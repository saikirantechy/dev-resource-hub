"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Brain,
  Lock,
  Code2,
  Bot,
  Globe,
  Users,
  TrendingUp,
  Activity,
  Trophy,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    emoji: "⚡",
    title: "Token Reduction",
    desc: "Reduce unnecessary words and save API costs across every call.",
    gradient: "from-orange-500/20 to-pink-500/10",
    border: "border-orange-500/25 hover:border-orange-400/50",
    text: "text-orange-300",
  },
  {
    icon: Brain,
    emoji: "🧠",
    title: "Smart Compression",
    desc: "Preserve intent and meaning while minimizing token footprint.",
    gradient: "from-pink-500/20 to-purple-500/10",
    border: "border-pink-500/25 hover:border-pink-400/50",
    text: "text-pink-300",
  },
  {
    icon: Lock,
    emoji: "🔒",
    title: "Placeholder Safe",
    desc: "Maintain {{variables}}, dynamic inputs, and template tokens intact.",
    gradient: "from-emerald-500/20 to-cyan-500/10",
    border: "border-emerald-500/25 hover:border-emerald-400/50",
    text: "text-emerald-300",
  },
  {
    icon: Code2,
    emoji: "📦",
    title: "JSON & Code Aware",
    desc: "Optimize without ever breaking code blocks, JSON, or formatting.",
    gradient: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/25 hover:border-cyan-400/50",
    text: "text-cyan-300",
  },
  {
    icon: Bot,
    emoji: "🤖",
    title: "Agent Optimized",
    desc: "Generate prompts tuned for AI agents, workflows, and multi-step systems.",
    gradient: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/25 hover:border-purple-400/50",
    text: "text-purple-300",
  },
  {
    icon: Globe,
    emoji: "🌐",
    title: "Multi-Model Compatible",
    desc: "Works with GPT, Claude, Gemini, Mistral, and any modern LLM.",
    gradient: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/25 hover:border-blue-400/50",
    text: "text-blue-300",
  },
];

const stats = [
  { icon: Activity, label: "Prompts Optimized", value: "1M+", color: "text-orange-300" },
  { icon: TrendingUp, label: "Avg Token Reduction", value: "78%", color: "text-emerald-300" },
  { icon: Users, label: "Developers", value: "25K+", color: "text-cyan-300" },
  { icon: Trophy, label: "Accuracy", value: "99.9%", color: "text-pink-300" },
];

export default function FeatureGrid() {
  return (
    <section className="px-4 sm:px-6 py-24 border-y border-white/5">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-4">
          <div className="badge badge-purple inline-flex"><Brain size={11} /> Built for Prompt Engineers</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Smarter prompts.{" "}
            <span className="gradient-text-prompt">Cleaner output.</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Every transformation is lossless to intent — placeholders, code, and
            structure stay intact while bloat disappears.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className={`group relative h-full p-7 rounded-3xl bg-gradient-to-br ${f.gradient} border ${f.border} card-hover overflow-hidden`}
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/5 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-500">
                    {f.emoji}
                  </span>
                  <f.icon size={18} className={f.text} />
                </div>
                <h3 className="text-xl font-black text-white">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Advanced AI features */}
        <div className="rounded-3xl glass border border-white/10 p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="badge badge-blue inline-flex mb-3"><Brain size={11} /> Advanced</div>
              <h3 className="text-2xl font-black tracking-tight">Engine Capabilities</h3>
              <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                Production-grade transformations built for real prompt engineering workloads.
              </p>
            </div>
            <ul className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Placeholder preservation",
                "Markdown formatting",
                "Code block awareness",
                "System prompt optimization",
                "Multi-agent optimization",
                "JSON-safe optimization",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/8 text-sm text-gray-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-orange-400 to-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl glass border border-white/8 p-6 text-center group hover:border-white/20 transition-colors"
            >
              <s.icon size={20} className={`${s.color} mx-auto mb-3`} />
              <div className="text-3xl md:text-4xl font-black tabular-nums text-white group-hover:scale-110 transition-transform">
                {s.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
