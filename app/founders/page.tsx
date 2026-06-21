"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Rocket,
  Lightbulb,
  ArrowRight,
  Building2,
  GitBranch,
  Wrench,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Gauge,
  BarChart3,
  Zap,
} from "lucide-react";

const founderModules = [
  {
    title: "Vibe → Production",
    desc: "The complete journey from idea to production: Ideate → Prototype → MVP → Test → Deploy → Scale with AI guidance at every stage.",
    icon: Rocket,
    href: "/vibe-to-production",
    color: "from-green-500 to-emerald-500",
    badge: "6 Stages",
  },
  {
    title: "Architecture Studio",
    desc: "Generate production-ready system designs for your startup. Microservices, SaaS, AI agents — with best practices and diagrams.",
    icon: Building2,
    href: "/architecture",
    color: "from-indigo-500 to-blue-500",
    badge: "4 Patterns",
  },
  {
    title: "Prompt → PRD",
    desc: "Turn your idea into a structured PRD with requirements, user stories, roadmap, and tech stack. One click from concept to spec.",
    icon: GitBranch,
    href: "/prompt-to-prd",
    color: "from-rose-500 to-pink-500",
    badge: "One-Click",
  },
  {
    title: "Task Breakdown Engine",
    desc: "Deconstruct your product roadmap into Epics → Features → Tasks → Subtasks. Agile-ready with Scrum support for your team.",
    icon: Wrench,
    href: "/tasks",
    color: "from-amber-500 to-orange-500",
    badge: "4 Levels",
  },
  {
    title: "Tools Hub",
    desc: "Discover the best AI tools for your startup stack — from no-code builders to production-grade frameworks. Filter by use case and pricing.",
    icon: Gauge,
    href: "/tools",
    color: "from-emerald-500 to-teal-500",
    badge: "100+ Tools",
  },
  {
    title: "Compare",
    desc: "Make informed build-vs-buy decisions with side-by-side comparisons of AI coding tools, IDEs, and agent frameworks.",
    icon: BarChart3,
    href: "/compare",
    color: "from-cyan-500 to-blue-500",
    badge: "9 Tools",
  },
  {
    title: "Benchmarks",
    desc: "Data-driven model and tool benchmarks. Compare speed, cost, accuracy, and quality across providers to optimize your stack.",
    icon: TrendingUp,
    href: "/benchmarks",
    color: "from-orange-500 to-red-500",
    badge: "4 Categories",
  },
  {
    title: "Dashboard",
    desc: "Your personalized command center with stats, AI assistant, trending tools, analytics, and community showcase — all in one place.",
    icon: Target,
    href: "/dashboard",
    color: "from-purple-500 to-pink-500",
    badge: "Live",
  },
];

const founderPrinciples = [
  { icon: Lightbulb, text: "Validate ideas fast with AI prototyping tools", color: "text-yellow-400" },
  { icon: DollarSign, text: "Optimize costs with model and token calculators", color: "text-emerald-400" },
  { icon: Rocket, text: "Ship MVPs in days, not months with vibe coding", color: "text-blue-400" },
  { icon: Users, text: "Build the right product with data-driven benchmarks", color: "text-purple-400" },
];

export default function FoundersPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        {/* ─── HERO ─── */}
        <section className="relative px-4 sm:px-6 pt-28 pb-20 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] -z-10"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, -60, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] -z-10"
          />
          <div className="absolute inset-0 -z-20 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

          <div className="max-w-6xl mx-auto text-center space-y-10 relative">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-orange"><Rocket size={10} /> Founder Track</span>
              <span className="badge badge-emerald"><Lightbulb size={10} /> Idea to MVP</span>
              <span className="badge badge-purple"><Building2 size={10} /> Architecture</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                <span className="gradient-text-hero">Ship Faster</span>
                <br />
                <span className="text-white opacity-90">Build Smarter</span>
                <br />
                <span className="gradient-text-blue">Scale with AI</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed font-medium">
                From idea to production in record time. Use AI-powered tools to validate, build, and scale your startup —{" "}
                without a massive engineering team.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4">
              <Link href="/vibe-to-production" className="btn-primary text-base px-10 py-5 rounded-2xl group">
                <Rocket size={20} /> Go from Vibe to Production{" "}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/architecture" className="btn-secondary text-base px-10 py-5 rounded-2xl">
                <Building2 size={20} /> Start with Architecture
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── PRINCIPLES ─── */}
        <section className="py-20 px-4 sm:px-6 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="text-center space-y-4">
              <div className="badge badge-orange inline-flex"><Zap size={11} /> Founder Principles</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Build Lean with AI</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Four principles to take your startup from concept to scale with AI at every step.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {founderPrinciples.map((p, i) => (
                <motion.div key={p.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass border border-white/8 flex items-start gap-4 group hover:border-orange-500/30 transition-all card-hover">
                  <div className={`p-2.5 rounded-xl bg-white/5 ${p.color} shrink-0`}>
                    <p.icon size={20} />
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed font-medium">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MODULES ─── */}
        <section className="py-28 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="badge badge-blue inline-flex"><Building2 size={11} /> Founder Modules</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Your Startup Toolkit</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Everything you need to go from idea to production and beyond.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {founderModules.map((mod, i) => (
                <motion.div key={mod.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}>
                  <Link href={mod.href}
                    className="group relative h-full p-8 rounded-[2rem] glass border border-white/8 hover:border-orange-500/30 card-hover transition-all duration-500 flex flex-col overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} opacity-5 blur-[60px] rounded-full`} />
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${mod.color} bg-opacity-10`}>
                        <mod.icon size={22} className="text-white" />
                      </div>
                      <span className="badge badge-blue text-[9px]">{mod.badge}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-orange-300 transition-colors">{mod.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors flex-1">{mod.desc}</p>
                    <div className="mt-6 flex items-center text-orange-400 text-xs font-bold group-hover:translate-x-3 transition-transform duration-500">
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
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-emerald-600/5 to-blue-600/10 animate-gradient" />
              <div className="relative z-10 space-y-8">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 animate-float">
                  <Rocket size={40} className="text-orange-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Your Idea, Shipped</h2>
                  <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Stop overthinking. Start building. Use AI to go from concept to production faster than ever.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/prompt-to-prd" className="btn-primary px-10 py-5 rounded-2xl">
                    <GitBranch size={18} /> Turn Idea into PRD
                  </Link>
                  <Link href="/vibe-to-production" className="btn-secondary px-10 py-5 rounded-2xl">
                    <Rocket size={18} /> View Full Journey
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
