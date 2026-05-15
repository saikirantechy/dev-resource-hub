"use client";

import Navbar from "@/components/Navbar";
import { GraduationCap, BookOpen, Trophy, CheckCircle2, ChevronRight, Zap, Target, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const learningPaths = [
  {
    title: "AI Engineer Path",
    desc: "Master LLMs, RAG, and agent orchestration from scratch.",
    level: "Advanced",
    modules: 12,
    students: "1.2k",
    color: "blue",
    icon: Target,
    steps: ["LLM Fundamentals", "Prompt Engineering", "Vector Databases", "LangChain/LangGraph", "Agentic Workflows"]
  },
  {
    title: "AI UI/UX Mastery",
    desc: "Build next-gen interfaces with Generative UI and v0.",
    level: "Intermediate",
    modules: 8,
    students: "800",
    color: "purple",
    icon: Zap,
    steps: ["v0.dev Basics", "Bolt.new Workflows", "Animated AI UI", "Token Streaming UX", "Personalized Portals"]
  },
  {
    title: "Autonomous Agent Ops",
    desc: "Deploy and manage swarms of autonomous agents.",
    level: "Pro",
    modules: 15,
    students: "500",
    color: "emerald",
    icon: Users,
    steps: ["AutoGPT & CrewAI", "Task Decomposition", "Multi-agent Protocols", "Evaluation Frameworks", "Production Scaling"]
  },
];

export default function LearningPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-20">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-purple">
            <GraduationCap size={12} /> Learning Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Master the <span className="gradient-text-hero">AI Stack</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Curated learning paths designed to take you from a traditional developer to an AI-first builder.
          </p>
        </header>

        {/* Learning Paths */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {learningPaths.map((path, i) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-[2.5rem] glass border border-white/8 hover:border-blue-500/30 transition-all card-hover flex flex-col h-full overflow-hidden relative"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-${path.color}-500/10 blur-[60px] -z-10`} />
              
              <div className="flex items-start justify-between mb-8">
                <div className={`p-4 rounded-2xl bg-${path.color}-500/10 border border-${path.color}-500/20 text-${path.color}-400 group-hover:scale-110 transition-transform`}>
                  <path.icon size={24} />
                </div>
                <div className="text-right">
                  <div className="badge badge-blue mb-1">{path.level}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase">{path.modules} Modules</div>
                </div>
              </div>

              <h3 className="text-2xl font-black mb-4 group-hover:text-blue-300 transition-colors">{path.title}</h3>
              <p className="text-sm text-gray-400 mb-8 leading-relaxed">{path.desc}</p>

              <div className="space-y-3 flex-1 mb-10">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Curriculum Preview</div>
                {path.steps.map((step) => (
                  <div key={step} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 size={14} className="text-emerald-500/70" />
                    {step}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Users size={12} /> {path.students} enrolled
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-blue-400 group-hover:translate-x-2 transition-transform">
                  Start Path <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Certificate Section */}
        <section className="relative p-12 md:p-24 rounded-[3rem] glass border border-white/10 overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-emerald-600/10 animate-gradient" />
          <div className="relative z-10 space-y-10">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 animate-float">
              <Trophy size={40} className="text-yellow-400" />
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                Get Certified
              </h2>
              <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                Complete any learning path and receive a verified ecosystem certificate to showcase your AI development expertise.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/docs" className="btn-primary px-10 py-5 rounded-2xl">
                Explore Curriculum
              </Link>
              <button className="btn-secondary px-10 py-5 rounded-2xl flex items-center gap-2">
                <BookOpen size={18} /> View Syllabus
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter / Join */}
        <div className="max-w-4xl mx-auto text-center space-y-10 py-20">
          <h2 className="text-4xl font-black tracking-tight">Ready to start your journey?</h2>
          <p className="text-gray-500 text-xl max-w-md mx-auto">
            Weekly tutorials and learning resources delivered straight to your inbox.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
             <Link href="/community" className="btn-secondary px-8 py-4 rounded-2xl group flex items-center gap-2">
               Join Community <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
