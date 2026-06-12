"use client";

import Link from "next/link";
import {
  Bot,
  Terminal,
  Package,
  Flame,
  Scale,
  MonitorPlay,
  BookOpen,
  Users,
  ArrowRight,
  Star,
  Globe,
  TrendingUp,
  Sparkles,
  Trophy,
  BarChart3,
  GraduationCap,
  GitBranch,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import NewsletterSignup from "@/components/NewsletterSignup";
import { motion } from "framer-motion";

const platformSections = [
  {
    href: "/ai-agents",
    icon: Bot,
    emoji: "🤖",
    title: "AI Agents",
    description:
      "Explore autonomous agents — from Devin AI to CrewAI. Full cards with GitHub links, docs, and copy-to-clipboard.",
    color: "blue",
    gradient: "from-blue-500/20 to-purple-500/10",
    border: "border-blue-500/20 hover:border-blue-500/40",
    badge: "8 Agents",
  },
  {
    href: "/prompts",
    icon: Terminal,
    emoji: "✨",
    title: "Prompt Library",
    description:
      "Searchable AI prompt marketplace with copy button, syntax highlighting, categories, and difficulty ratings.",
    color: "purple",
    gradient: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/20 hover:border-purple-500/40",
    badge: "8 Prompts",
  },
  {
    href: "/tools",
    icon: Package,
    emoji: "🛠",
    title: "Tools Hub",
    description:
      "Curated AI-powered tools across IDEs, UI builders, frameworks, and open-source categories.",
    color: "emerald",
    gradient: "from-emerald-500/20 to-blue-500/10",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    badge: "102 Tools",
  },
  {
    href: "/trending",
    icon: Flame,
    emoji: "🔥",
    title: "Trending",
    description:
      "Live rankings with podium top-3, trending scores, most starred and most viewed resources.",
    color: "orange",
    gradient: "from-orange-500/20 to-red-500/10",
    border: "border-orange-500/20 hover:border-orange-500/40",
    badge: "Live Pulse",
  },
  {
    href: "/tools?category=AI+Coding",
    icon: Bot,
    emoji: "🤖",
    title: "AI Coding Agents",
    description:
      "Explore 100+ free AI coding agents and platforms. From God Tier tools to VS Code extensions.",
    color: "orange",
    gradient: "from-orange-500/20 to-red-500/10",
    border: "border-orange-500/20 hover:border-orange-500/40",
    badge: "102 Tools",
  },
  {
    href: "/compare",
    icon: Scale,
    emoji: "⚔️",
    title: "Compare",
    description:
      "Side-by-side comparison tables for IDEs, UI builders, and agent frameworks with ratings.",
    color: "cyan",
    gradient: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    badge: "3 Categories",
  },
  {
    href: "/showcase",
    icon: MonitorPlay,
    emoji: "🚀",
    title: "Showcase",
    description:
      "Community-built AI projects, workflows, and automation systems. Built with Dev Resource Hub.",
    color: "pink",
    gradient: "from-pink-500/20 to-purple-500/10",
    border: "border-pink-500/20 hover:border-pink-500/40",
    badge: "Community",
  },
  {
    href: "/blogs",
    icon: BookOpen,
    emoji: "📰",
    title: "Blog",
    description:
      "Deep dives: Cursor vs Windsurf, agent frameworks, prompt engineering, and local AI setups.",
    color: "yellow",
    gradient: "from-yellow-500/20 to-orange-500/10",
    border: "border-yellow-500/20 hover:border-yellow-500/40",
    badge: "7 Articles",
  },
  {
    href: "/community",
    icon: Users,
    emoji: "🌍",
    title: "Community",
    description:
      "Discord, GitFork discussions, contributor leaderboard, open issues, and Hall of Fame.",
    color: "indigo",
    gradient: "from-indigo-500/20 to-blue-500/10",
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    badge: "2k Members",
  },
];

const featuredTools = [
  {
    name: "Cursor",
    emoji: "⌨️",
    desc: "AI-first code editor",
    href: "https://cursor.sh",
    tag: "IDE",
  },
  {
    name: "v0 by Vercel",
    emoji: "🎨",
    desc: "Generative UI",
    href: "https://v0.dev",
    tag: "UI",
  },
  {
    name: "Antigravity",
    emoji: "🚀",
    desc: "Google AI coding",
    href: "https://antigravity.google",
    tag: "God Tier",
  },
  {
    name: "DeepSeek",
    emoji: "🔍",
    desc: "Open-source coding LLM",
    href: "https://coder.deepseek.com",
    tag: "AI",
  },
  {
    name: "Bolt.new",
    emoji: "⚡",
    desc: "Browser-based dev",
    href: "https://bolt.new",
    tag: "Builder",
  },
  {
    name: "Windsurf",
    emoji: "🌪️",
    desc: "AI IDE with Cascade",
    href: "https://codeium.com/windsurf",
    tag: "God Tier",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative px-4 sm:px-6 pt-32 pb-20 overflow-hidden">
        {/* Animated Background Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -70, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10"
        />

        <div className="max-w-6xl mx-auto text-center space-y-12 relative">
          {/* Top badges */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/beginner-guide"
              className="badge badge-blue hover:scale-105 transition-transform cursor-pointer"
            >
              <GraduationCap size={10} /> Student Path
            </Link>
            <Link
              href="/ai-finder"
              className="badge badge-purple hover:scale-105 transition-transform cursor-pointer"
            >
              <Sparkles size={10} /> AI Finder
            </Link>
            <Link
              href="/contributors"
              className="badge badge-orange hover:scale-105 transition-transform cursor-pointer"
            >
              <Trophy size={10} /> Leaderboard
            </Link>
          </motion.div>

          {/* Hero Headline */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85]"
            >
              <span className="gradient-text-hero">The Open AI</span>
              <br />
              <span className="text-white opacity-90">Developer</span>
              <br />
              <span className="gradient-text-blue">Universe</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Build, discover, and scale in the global AI ecosystem. Explore{" "}
              <span className="text-white">agents</span>,{" "}
              <span className="text-white">prompts</span>, and{" "}
              <span className="text-white">tools</span> in one unified platform.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/tools"
              className="btn-primary text-base px-10 py-5 rounded-2xl group"
            >
              <Package size={20} /> Get Started{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/ai-agents"
              className="btn-secondary text-base px-10 py-5 rounded-2xl"
            >
              <Bot size={20} /> Browse Agents
            </Link>
          </motion.div>

          {/* Terminal Code Snippet */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-xl mx-auto"
          >
            <div className="terminal text-left text-sm group hover:border-blue-500/30 transition-colors shadow-2xl">
              <div className="pt-6 space-y-1.5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/50" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <span className="w-3 h-3 rounded-full bg-green-500/50" />
                  <span className="ml-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                    ai-ecosystem.ts
                  </span>
                </div>
                <div className="font-mono">
                  <span className="text-gray-500">
                    # Initializing the universe...
                  </span>
                  <br />
                  <span className="text-purple-400">const</span>
                  <span className="text-white"> platform </span>
                  <span className="text-gray-500">= </span>
                  <span className="text-emerald-400">await</span>
                  <span className="text-white"> Ecosystem</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-blue-400">connect</span>
                  <span className="text-gray-400">();</span>
                  <br />
                  <span className="text-white">platform</span>
                  <span className="text-gray-400">.</span>
                  <span className="text-yellow-400">enableAnimations</span>
                  <span className="text-gray-400">();</span>
                  <br />
                  <span className="text-gray-500">{'// Ecosystem ready 🚀'}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                label: "Resources",
                value: "200+",
                icon: Package,
                color: "text-blue-400",
              },
              {
                label: "Contributors",
                value: "200+",
                icon: Users,
                color: "text-emerald-400",
              },
              {
                label: "GitHub Stars",
                value: "5k+",
                icon: Star,
                color: "text-yellow-400",
              },
              {
                label: "Open Source",
                value: "100%",
                icon: Globe,
                color: "text-purple-400",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-2 group"
              >
                <div className="text-5xl font-black group-hover:scale-110 transition-transform duration-500">
                  {stat.value}
                </div>
                <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORM SECTIONS ─── */}
      <section className="py-32 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="badge badge-purple inline-flex"
            >
              <BarChart3 size={11} /> Platform Pages
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              Everything in One Ecosystem
            </h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">
              8 specialized platform sections built for developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformSections.map((section, i) => (
              <motion.div
                key={section.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={section.href}
                  className={`group relative h-full p-8 rounded-[2rem] bg-gradient-to-br ${section.gradient} border ${section.border} card-hover transition-all duration-500 flex flex-col overflow-hidden`}
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-4xl group-hover:scale-125 group-hover:-rotate-12 transition-transform duration-500">
                      {section.emoji}
                    </span>
                    <span className="badge badge-blue text-[9px]">
                      {section.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium group-hover:text-gray-300 transition-colors flex-1">
                    {section.description}
                  </p>
                  <div className="mt-8 flex items-center text-blue-400 text-xs font-bold group-hover:translate-x-3 transition-transform duration-500">
                    Explore Experience <ArrowRight size={14} className="ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED TOOLS ─── */}
      <section className="py-32 px-4 sm:px-6 bg-white/[0.01] border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="badge badge-orange inline-flex">
                <Flame size={11} /> Hot Right Now
              </div>
              <h2 className="text-5xl font-black tracking-tight">
                Featured Tools
              </h2>
            </div>
            <Link
              href="/trending"
              className="btn-secondary px-8 py-4 rounded-2xl group"
            >
              <TrendingUp size={16} /> View Trending{" "}
              <ArrowRight
                size={14}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {featuredTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={tool.href}
                  target="_blank"
                  className="group p-8 rounded-3xl glass border border-white/8 hover:border-blue-500/40 card-hover text-center flex flex-col items-center gap-4 h-full"
                >
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-500">
                    {tool.emoji}
                  </span>
                  <div className="space-y-1">
                    <div className="font-black text-base text-white group-hover:text-blue-300 transition-colors">
                      {tool.name}
                    </div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                      {tool.tag}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROADMAP ─── */}
      <section className="py-32 px-4 sm:px-6 border-t border-white/5 relative">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-24 rounded-[3rem] glass border border-white/10 overflow-hidden text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-emerald-600/10 animate-gradient" />
            <div className="relative z-10 space-y-10">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 animate-float">
                <GitBranch size={40} className="text-blue-400" />
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                  Phase 2 Coming Soon
                </h2>
                <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                  We&apos;re building the future of AI development
                  infrastructure. Expect deep integrations, smarter tools, and
                  persistent user environments.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "Auth",
                  "Bookmarks",
                  "AI Recommendations",
                  "Supabase DB",
                  "Stack Engine",
                ].map((f) => (
                  <span key={f} className="badge badge-purple px-4 py-1.5">
                    {f}
                  </span>
                ))}
              </div>
              <div className="pt-6">
                <Link
                  href="/docs"
                  className="btn-primary px-10 py-5 rounded-2xl"
                >
                  <BookOpen size={18} /> View Platform Roadmap
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-32 px-4 sm:px-6 bg-[#030305]">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="badge badge-blue inline-flex"
          >
            <Sparkles size={11} /> Stay Updated
          </motion.div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tight">
              Join the Ecosystem
            </h2>
            <p className="text-gray-500 text-xl max-w-md mx-auto">
              Weekly drops: best AI tools, trending resources, and open-source
              opportunities.
            </p>
          </div>
          <NewsletterSignup />
          <p className="text-[10px] text-gray-700 uppercase font-black tracking-[0.3em]">
            Join 2,000+ developers already subscribed
          </p>
        </div>
      </section>
    </div>
  );
}
