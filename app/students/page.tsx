"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  GraduationCap,
  BookOpen,
  ArrowRight,
  Sparkles,
  Map,
  Users,
  Code2,
  Terminal,
  Compass,
  Rocket,
  Brain,
  MessageSquare,
  Trophy,
} from "lucide-react";

const studentModules = [
  {
    title: "Beginner's Guide",
    desc: "Step-by-step path from zero to your first open-source contribution. HTML, CSS, JavaScript, and Git basics.",
    icon: Compass,
    href: "/beginner-guide",
    color: "from-blue-500 to-cyan-500",
    badge: "Start Here",
  },
  {
    title: "Learning Hub",
    desc: "Curated learning paths: AI Engineer, AI UI/UX, and Autonomous Agent Ops. From fundamentals to production.",
    icon: BookOpen,
    href: "/learning",
    color: "from-purple-500 to-pink-500",
    badge: "3 Paths",
  },
  {
    title: "Prompt Library",
    desc: "Battle-tested prompts for learning, coding, debugging, and more. Copy, practice, and master prompt engineering.",
    icon: Terminal,
    href: "/prompts",
    color: "from-orange-500 to-red-500",
    badge: "8 Prompts",
  },
  {
    title: "AI Agents Catalog",
    desc: "Explore autonomous agents like Devin, Cursor, and CrewAI. Understand how AI coding works under the hood.",
    icon: Brain,
    href: "/ai-agents",
    color: "from-emerald-500 to-teal-500",
    badge: "8+ Agents",
  },
  {
    title: "Tool Explorer",
    desc: "Discover 100+ AI-powered developer tools. Filter by category, compare features, and find your stack.",
    icon: Code2,
    href: "/tools",
    color: "from-indigo-500 to-blue-500",
    badge: "100+ Tools",
  },
  {
    title: "Community",
    desc: "Join 2,000+ developers. Ask questions, share projects, and grow your network in the AI ecosystem.",
    icon: Users,
    href: "/community",
    color: "from-pink-500 to-rose-500",
    badge: "2k Members",
  },
];

const learningMilestones = [
  { step: "Learn the fundamentals of web development", icon: BookOpen },
  { step: "Master prompt engineering basics", icon: MessageSquare },
  { step: "Build your first AI-powered app", icon: Rocket },
  { step: "Explore autonomous agent frameworks", icon: Brain },
  { step: "Contribute to open-source AI projects", icon: Trophy },
];

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        {/* ─── HERO ─── */}
        <section className="relative px-4 sm:px-6 pt-28 pb-20 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, -50, 0], y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10"
          />
          <div className="absolute inset-0 -z-20 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

          <div className="max-w-6xl mx-auto text-center space-y-10 relative">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-blue"><GraduationCap size={10} /> Student Journey</span>
              <span className="badge badge-emerald"><Sparkles size={10} /> Free Resources</span>
              <span className="badge badge-purple"><BookOpen size={10} /> Learning Paths</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                <span className="gradient-text-hero">Learn the</span>
                <br />
                <span className="text-white opacity-90">AI Stack</span>
                <br />
                <span className="gradient-text-blue">Zero to Hero</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed font-medium">
                Your complete learning journey — from absolute beginner to building with AI agents.{" "}
                All free, open-source, and community-supported.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4">
              <Link href="/beginner-guide" className="btn-primary text-base px-10 py-5 rounded-2xl group">
                <GraduationCap size={20} /> Start Learning{" "}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/learning" className="btn-secondary text-base px-10 py-5 rounded-2xl">
                <BookOpen size={20} /> View Learning Paths
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── LEARNING MILESTONES ─── */}
        <section className="py-20 px-4 sm:px-6 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="badge badge-blue inline-flex"><Map size={11} /> Your Learning Roadmap</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">5 Milestones to Mastery</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">A structured path designed to take you from curious beginner to confident AI developer.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {learningMilestones.map((m, i) => (
                <motion.div key={m.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-6 rounded-2xl glass border border-white/8 text-center group hover:border-blue-500/30 transition-all card-hover">
                  <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sm font-black text-blue-400">
                    {i + 1}
                  </div>
                  <div className="mb-3 mt-2">
                    <m.icon size={24} className="text-blue-400 mx-auto group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="text-sm text-gray-300 font-medium">{m.step}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MODULES ─── */}
        <section className="py-28 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="badge badge-purple inline-flex"><Code2 size={11} /> Explore the Platform</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Everything You Need</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Curated modules designed for students and self-learners at every stage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentModules.map((mod, i) => (
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-emerald-600/10 animate-gradient" />
              <div className="relative z-10 space-y-8">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 animate-float">
                  <Rocket size={40} className="text-blue-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Ready to Start?</h2>
                  <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Join thousands of students learning AI development. No credit card. All open-source.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/beginner-guide" className="btn-primary px-10 py-5 rounded-2xl">
                    <GraduationCap size={18} /> Begin Your Journey
                  </Link>
                  <Link href="/community" className="btn-secondary px-10 py-5 rounded-2xl">
                    <Users size={18} /> Join Community
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
