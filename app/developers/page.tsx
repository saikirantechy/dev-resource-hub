"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Code2,
  Package,
  ArrowRight,
  Sparkles,
  BarChart3,
  Scale,
  Bot,
  Terminal,
  Cpu,
  Building2,
  MessageSquare,
  Gauge,
  Zap,
  Rocket,
} from "lucide-react";

const devModules = [
  {
    title: "Tools Hub",
    desc: "100+ AI-powered developer tools — IDEs, UI builders, frameworks, and open-source libraries. Filter, compare, and discover your stack.",
    icon: Package,
    href: "/tools",
    color: "from-emerald-500 to-teal-500",
    badge: "100+ Tools",
  },
  {
    title: "AI Agents Catalog",
    desc: "Explore Devin, Cursor, Windsurf, CrewAI, AutoGen, and more. Full cards with GitHub stats, docs, and pricing.",
    icon: Bot,
    href: "/ai-agents",
    color: "from-blue-500 to-cyan-500",
    badge: "8+ Agents",
  },
  {
    title: "Prompt Library",
    desc: "Production-ready prompts for coding, debugging, code review, and architecture. Copy, customize, and ship.",
    icon: Terminal,
    href: "/prompts",
    color: "from-purple-500 to-pink-500",
    badge: "8 Prompts",
  },
  {
    title: "Compare Tools",
    desc: "Side-by-side comparison of Cursor vs Windsurf vs Copilot vs Claude Code across 12 capabilities with pricing.",
    icon: Scale,
    href: "/compare",
    color: "from-orange-500 to-red-500",
    badge: "9 Tools",
  },
  {
    title: "Benchmark Center",
    desc: "AI model, coding, agent, and IDE benchmarks. Compare speed, cost, and quality across 30+ providers.",
    icon: BarChart3,
    href: "/benchmarks",
    color: "from-amber-500 to-yellow-500",
    badge: "4 Categories",
  },
  {
    title: "Architecture Studio",
    desc: "Generate system designs, microservices, SaaS, and AI agent architectures with best practices and diagrams.",
    icon: Building2,
    href: "/architecture",
    color: "from-indigo-500 to-blue-500",
    badge: "4 Patterns",
  },
  {
    title: "Prompt Optimizer",
    desc: "6 optimization modes, token estimation, quality scoring, and before/after comparison. Ship better prompts.",
    icon: Gauge,
    href: "/prompt-optimizer",
    color: "from-orange-500 to-amber-500",
    badge: "6 Modes",
  },
  {
    title: "Prompt → PRD",
    desc: "Convert natural language into structured PRDs with requirements, user stories, roadmap, and tech stack.",
    icon: Cpu,
    href: "/prompt-to-prd",
    color: "from-rose-500 to-pink-500",
    badge: "One-Click",
  },
];

const recommendedStack = [
  { name: "Cursor", emoji: "⌨️", desc: "AI-native code editor", href: "https://cursor.sh" },
  { name: "Windsurf", emoji: "🌪️", desc: "AI IDE with Cascade", href: "https://codeium.com/windsurf" },
  { name: "Claude Code", emoji: "🧠", desc: "Terminal AI agent", href: "https://claude.ai" },
  { name: "LangChain", emoji: "⛓️", desc: "LLM framework", href: "https://langchain.com" },
  { name: "CrewAI", emoji: "🤝", desc: "Multi-agent platform", href: "https://crewai.com" },
  { name: "DeepSeek", emoji: "🔍", desc: "Open coding LLM", href: "https://deepseek.com" },
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        {/* ─── HERO ─── */}
        <section className="relative px-4 sm:px-6 pt-28 pb-20 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] -z-10"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, -60, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"
          />
          <div className="absolute inset-0 -z-20 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

          <div className="max-w-6xl mx-auto text-center space-y-10 relative">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-emerald"><Code2 size={10} /> Developer Tools</span>
              <span className="badge badge-purple"><BarChart3 size={10} /> Benchmarks</span>
              <span className="badge badge-orange"><Scale size={10} /> Comparisons</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                <span className="gradient-text-hero">Build Faster</span>
                <br />
                <span className="text-white opacity-90">with AI-Powered</span>
                <br />
                <span className="gradient-text-blue">Developer Tools</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed font-medium">
                  Discover, compare, and master the best AI coding tools. From AI IDEs to agent frameworks —{" "}
                  everything you need to ship better code, faster.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4">
              <Link href="/tools" className="btn-primary text-base px-10 py-5 rounded-2xl group">
                <Package size={20} /> Explore Tools{" "}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/compare" className="btn-secondary text-base px-10 py-5 rounded-2xl">
                <Scale size={20} /> Compare IDEs
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── RECOMMENDED STACK ─── */}
        <section className="py-20 px-4 sm:px-6 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="badge badge-orange inline-flex"><Zap size={11} /> Developer Stack 2026</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">The Modern AI Dev Stack</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">The tools powering today's most productive AI engineers.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recommendedStack.map((tool, i) => (
                <motion.div key={tool.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Link href={tool.href} target="_blank"
                    className="group p-6 rounded-2xl glass border border-white/8 hover:border-blue-500/40 card-hover text-center flex flex-col items-center gap-3 h-full">
                    <span className="text-4xl group-hover:scale-110 transition-transform duration-500">{tool.emoji}</span>
                    <div>
                      <div className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">{tool.name}</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">{tool.desc}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MODULES ─── */}
        <section className="py-28 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="badge badge-blue inline-flex"><Cpu size={11} /> Developer Modules</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Everything for Developers</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">8 specialized modules to supercharge your AI development workflow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {devModules.map((mod, i) => (
                <motion.div key={mod.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}>
                  <Link href={mod.href}
                    className="group relative h-full p-8 rounded-[2rem] glass border border-white/8 hover:border-blue-500/30 card-hover transition-all duration-500 flex flex-col overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} opacity-5 blur-[60px] rounded-full`} />
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${mod.color} bg-opacity-10`}>
                        <mod.icon size={22} className="text-white" />
                      </div>
                      <span className="badge badge-blue text-[9px]">{mod.badge}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors">{mod.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors flex-1">{mod.desc}</p>
                    <div className="mt-6 flex items-center text-blue-400 text-xs font-bold group-hover:translate-x-3 transition-transform duration-500">
                      Explore <ArrowRight size={14} className="ml-2" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-28 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative p-12 md:p-20 rounded-[3rem] glass border border-white/10 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-blue-600/5 to-purple-600/10 animate-gradient" />
              <div className="relative z-10 space-y-8">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 animate-float">
                  <Rocket size={40} className="text-emerald-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Ready to Ship?</h2>
                  <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Your AI-powered development workflow starts here. Explore the best tools, compare them, and build something amazing.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/tools" className="btn-primary px-10 py-5 rounded-2xl">
                    <Package size={18} /> Browse All Tools
                  </Link>
                  <Link href="/benchmarks" className="btn-secondary px-10 py-5 rounded-2xl">
                    <BarChart3 size={18} /> View Benchmarks
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
