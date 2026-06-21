"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles, BookOpen, Target, Swords, Trophy, Map, LayoutGrid,
  GraduationCap, ArrowRight, Star, Zap, TrendingUp, Users, Code2,
  BrainCircuit, Award, BarChart3, Flame
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { DEFAULT_STATS, AI_AGENTS } from "@/lib/dsa/data";
import DSAAchievementCard from "@/components/dsa/DSAAchievementCard";
import NeonGlowCard from "@/components/NeonGlowCard";
import { ACHIEVEMENTS } from "@/lib/dsa/data";

const QUICK_LINKS = [
  { href: "/dsa/tutor", label: "AI Tutor", icon: BookOpen, desc: "Learn with AI guidance", color: "from-blue-500 to-cyan-500", textColor: "text-blue-400" },
  { href: "/dsa/assessment", label: "Assessment", icon: Target, desc: "Interview simulation", color: "from-red-500 to-orange-500", textColor: "text-red-400" },
  { href: "/dsa/arena", label: "Arena", icon: Swords, desc: "Live coding battles", color: "from-purple-500 to-pink-500", textColor: "text-purple-400" },
  { href: "/dsa/challenges", label: "Challenges", icon: Code2, desc: "Practice problems", color: "from-emerald-500 to-teal-500", textColor: "text-emerald-400" },
  { href: "/dsa/topics", label: "Topics", icon: LayoutGrid, desc: "Browse DSA topics", color: "from-indigo-500 to-blue-500", textColor: "text-indigo-400" },
  { href: "/dsa/roadmaps", label: "Roadmaps", icon: Map, desc: "Learning paths", color: "from-amber-500 to-orange-500", textColor: "text-amber-400" },
  { href: "/dsa/leaderboard", label: "Leaderboard", icon: Trophy, desc: "Top coders", color: "from-yellow-500 to-amber-500", textColor: "text-yellow-400" },
  { href: "/dsa/rankings", label: "Rankings", icon: BarChart3, desc: "Tier rankings", color: "from-rose-500 to-pink-500", textColor: "text-rose-400" },
];

const MODES = [
  {
    id: "tutor",
    title: "Tutor Mode",
    subtitle: "Learning",
    description: "Learn with hints, explanations, visualizations, and AI guidance.",
    icon: BookOpen,
    gradient: "from-blue-600 to-cyan-500",
    bgGradient: "from-blue-500/10 to-cyan-500/5",
    hoverBorder: "hover:border-blue-500/40",
    features: [
      "Concept Explanations", "AI Tutor", "Step-by-Step Solutions",
      "Visual Learning", "Difficulty Progression", "Learning Paths"
    ],
    bestFor: "Beginners, Students, Practice",
    buttonText: "Start Learning",
    href: "/dsa/tutor",
  },
  {
    id: "assessment",
    title: "Assessment Mode",
    subtitle: "Interview",
    description: "Simulate real interview conditions with timed challenges and AI evaluation.",
    icon: Target,
    gradient: "from-red-600 to-orange-500",
    bgGradient: "from-red-500/10 to-orange-500/5",
    hoverBorder: "hover:border-red-500/40",
    features: [
      "Timed Challenges", "AI Examiner", "No Hints",
      "Performance Scoring", "Interview Feedback"
    ],
    bestFor: "Placements, Interviews, Competitive Coding",
    buttonText: "Start Assessment",
    href: "/dsa/assessment",
  },
];

export default function DSAPage() {
  const stats = DEFAULT_STATS;

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-24 relative z-10">

          {/* ─── HERO ─── */}
          <section className="text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={12} /> Powered by Dev Resource Hub AI
            </motion.div>

            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]"
            >
              <span className="gradient-text-hero">DSA Arena</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed"
            >
              Master Data Structures & Algorithms through <span className="text-white">AI Coaching</span>,{' '}
              <span className="text-white">Live Challenges</span>,{' '}
              <span className="text-white">Rankings</span>, and{' '}
              <span className="text-white">Interview Simulations</span>.
            </motion.p>

            {/* Quick Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {[
                { label: "Problems Solved", value: stats.problemsSolved, icon: Code2, color: "text-blue-400" },
                { label: "Current Streak", value: `${stats.currentStreak} days`, icon: Flame, color: "text-orange-400" },
                { label: "Global Rank", value: `#${stats.globalRank}`, icon: Trophy, color: "text-yellow-400" },
                { label: "Success Rate", value: `${stats.successRate}%`, icon: TrendingUp, color: "text-emerald-400" },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-white/5">
                  <s.icon size={14} className={s.color} />
                  <span className="text-xs font-bold">{s.value}</span>
                  <span className="text-[8px] text-gray-600 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </section>

          {/* ─── MODE SELECTION ─── */}
          <section className="space-y-8">
            <div className="text-center space-y-4">
              <div className="badge badge-purple inline-flex"><Star size={11} /> Choose Your DSA Mode</div>
              <h2 className="text-4xl font-black">Select the experience that matches your goal right now.</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {MODES.map((mode, i) => (
                <motion.div
                  key={mode.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  <NeonGlowCard className={`group relative h-full p-8 md:p-10 rounded-[2rem] bg-gradient-to-br ${mode.bgGradient} border border-white/10 ${mode.hoverBorder} card-hover transition-all duration-500 overflow-hidden`}>
                    {/* Background glow */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10 bg-gradient-to-br ${mode.gradient} blur-3xl`} />

                    <div className="relative z-10 space-y-8">
                      {/* Mode Header */}
                      <div className="flex items-start justify-between">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${mode.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                          <mode.icon size={32} className="text-white" />
                        </div>
                        <span className="badge badge-blue">{mode.subtitle}</span>
                      </div>

                      <div>
                        <h3 className="text-3xl font-black text-white mb-2">{mode.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{mode.description}</p>
                      </div>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {mode.features.map(f => (
                          <div key={f} className="flex items-center gap-2 text-[10px] text-gray-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
                            {f}
                          </div>
                        ))}
                      </div>

                      {/* Best For */}
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Users size={12} /> Best For: {mode.bestFor}
                      </div>

                      {/* CTA */}
                      <Link href={mode.href} className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r ${mode.gradient} text-white font-bold text-sm hover:opacity-90 transition-all group/btn`}>
                        {mode.buttonText}
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </NeonGlowCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ─── QUICK LINKS ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Zap size={16} className="text-amber-400" />
              <h2 className="text-2xl font-black text-white">Quick Access</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {QUICK_LINKS.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={link.href} className="group p-4 rounded-2xl glass border border-white/10 hover:border-blue-500/30 card-hover transition-all duration-500 flex flex-col items-center text-center gap-3 h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                      <link.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${link.textColor} group-hover:text-white transition-colors`}>{link.label}</div>
                      <div className="text-[9px] text-gray-600 mt-0.5">{link.desc}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ─── AI AGENTS ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <BrainCircuit size={16} className="text-purple-400" />
              <h2 className="text-2xl font-black text-white">AI Agents</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {AI_AGENTS.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-4 rounded-2xl glass border border-white/10 hover:border-purple-500/30 card-hover transition-all duration-500 text-center"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} flex items-center justify-center mx-auto mb-3 text-xl group-hover:scale-110 transition-transform`}>
                    {agent.icon}
                  </div>
                  <div className="font-bold text-[11px] text-white group-hover:text-purple-300 transition-colors">{agent.name}</div>
                  <div className="text-[8px] text-gray-600 uppercase tracking-widest mt-1">{agent.role}</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ─── ACHIEVEMENTS ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Award size={16} className="text-amber-400" />
              <h2 className="text-2xl font-black text-white">Achievements</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {ACHIEVEMENTS.map((ach, i) => (
                <DSAAchievementCard key={ach.id} achievement={ach} index={i} />
              ))}
            </div>
          </section>

          {/* ─── TOP COMPANIES ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <GraduationCap size={16} className="text-blue-400" />
              <h2 className="text-2xl font-black text-white">Interview Prep for Top Companies</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {["Amazon", "Google", "Microsoft", "Meta", "Apple", "Netflix"].map((company, i) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group p-4 rounded-2xl glass border border-white/10 hover:border-blue-500/30 card-hover transition-all duration-500 text-center"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-2 text-lg font-black text-gray-400 group-hover:text-white transition-colors">
                    {company[0]}
                  </div>
                  <div className="font-bold text-xs text-gray-300 group-hover:text-white transition-colors">{company}</div>
                  <div className="text-[8px] text-gray-600 mt-1">{15 + i * 13} Questions</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ─── CTA ─── */}
          <section className="pb-8">
            <div className="relative p-12 md:p-16 rounded-[2rem] glass border border-white/10 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-blue-600/5 to-cyan-600/10 animate-gradient" />
              <div className="relative z-10 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center mx-auto">
                  <Swords size={32} className="text-white" />
                </div>
                <h2 className="text-4xl font-black">Ready to Master DSA?</h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Start with the AI Tutor for guided learning, or jump straight into the Assessment Arena for real interview practice.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/dsa/tutor" className="btn-primary px-8 py-4 rounded-2xl">
                    <BookOpen size={18} /> Start Learning
                  </Link>
                  <Link href="/dsa/assessment" className="btn-secondary px-8 py-4 rounded-2xl">
                    <Target size={18} /> Start Assessment
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
