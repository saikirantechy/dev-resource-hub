"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Workflow,
  Cpu,
  ArrowRight,
  Sparkles,
  Siren,
  GitBranch,
  Layers,
  Bot,
  Users,
  MonitorPlay,
  Zap,
  Globe,
} from "lucide-react";

const agencyModules = [
  {
    title: "AI Workflow Builder",
    desc: "Visual drag-and-drop canvas for designing multi-agent workflows. Add agents, tools, and triggers, connect them, and simulate execution.",
    icon: Workflow,
    href: "/workflow",
    color: "from-teal-500 to-emerald-500",
    badge: "Visual Canvas",
  },
  {
    title: "Autonomous Workflows",
    desc: "Set-and-forget automation: auto-generate tests, docs, changelogs, PR descriptions, and release notes for your clients.",
    icon: Cpu,
    href: "/automation",
    color: "from-violet-500 to-purple-500",
    badge: "5 Stages",
  },
  {
    title: "Agent Hooks",
    desc: "Trigger autonomous agents on events — file save, git commit, PR created, deploy, or issue opened. Perfect for client delivery pipelines.",
    icon: GitBranch,
    href: "/agent-hooks",
    color: "from-teal-500 to-cyan-500",
    badge: "6 Triggers",
  },
  {
    title: "Agent Hub",
    desc: "9 specialized AI agents — Planner, Architect, Developer, QA, Security, DevOps, Documentation, SEO, Marketing. Deploy for client projects.",
    icon: Bot,
    href: "/agents",
    color: "from-blue-500 to-purple-500",
    badge: "9 Agents",
  },
  {
    title: "Error Diagnostics",
    desc: "Analyze stack traces, build failures, and runtime errors. Get root cause analysis and suggested fixes — faster client issue resolution.",
    icon: Siren,
    href: "/errors",
    color: "from-red-500 to-rose-500",
    badge: "Smart Analysis",
  },
  {
    title: "Context Manager",
    desc: "Long-context storage, project memory, requirement tracking, and agent memory for persistent multi-client workflows.",
    icon: Layers,
    href: "/context",
    color: "from-sky-500 to-blue-500",
    badge: "8 Features",
  },
  {
    title: "Showcase",
    desc: "Feature your agency's work. Community-built AI projects, workflows, and automation systems built with Dev Resource Hub.",
    icon: MonitorPlay,
    href: "/showcase",
    color: "from-pink-500 to-purple-500",
    badge: "Community",
  },
  {
    title: "Community",
    desc: "Connect with other agencies, find partners, hire talent, and showcase your expertise in the global AI ecosystem.",
    icon: Users,
    href: "/community",
    color: "from-indigo-500 to-blue-500",
    badge: "2k Members",
  },
];

const agencyTools = [
  { name: "n8n", emoji: "🔗", use: "Workflow automation" },
  { name: "CrewAI", emoji: "🤝", use: "Multi-agent orchestration" },
  { name: "LangGraph", emoji: "⛓️", use: "Agent state machines" },
  { name: "Cursor", emoji: "⌨️", use: "AI-native coding" },
  { name: "v0", emoji: "🎨", use: "Rapid UI generation" },
  { name: "Bolt.new", emoji: "⚡", use: "Full-stack in browser" },
];

export default function AgenciesPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        {/* ─── HERO ─── */}
        <section className="relative px-4 sm:px-6 pt-28 pb-20 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[100px] -z-10"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, -60, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10"
          />
          <div className="absolute inset-0 -z-20 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

          <div className="max-w-6xl mx-auto text-center space-y-10 relative">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-emerald"><Workflow size={10} /> Agency Stack</span>
              <span className="badge badge-purple"><Cpu size={10} /> Automation</span>
              <span className="badge badge-blue"><Globe size={10} /> Scale</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                <span className="gradient-text-hero">Scale Your</span>
                <br />
                <span className="text-white opacity-90">AI Agency</span>
                <br />
                <span className="gradient-text-blue">with Automation</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed font-medium">
                  From multi-agent workflows to client delivery pipelines — automate, scale, and{" "}
                  deliver faster with Dev Resource Hub's agency-grade toolset.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4">
              <Link href="/workflow" className="btn-primary text-base px-10 py-5 rounded-2xl group">
                <Workflow size={20} /> Open Workflow Builder{" "}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/automation" className="btn-secondary text-base px-10 py-5 rounded-2xl">
                <Cpu size={20} /> Explore Automation
              </Link>
            </motion.div>
          </div>
        </section>

        {/* ─── TOOLS ─── */}
        <section className="py-20 px-4 sm:px-6 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <div className="badge badge-emerald inline-flex"><Zap size={11} /> Agency Tool Stack</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight">Tools for Scaling</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">The essential toolkit for modern AI agencies delivering at scale.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {agencyTools.map((tool, i) => (
                <motion.div key={tool.name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group p-6 rounded-2xl glass border border-white/8 hover:border-teal-500/40 card-hover text-center flex flex-col items-center gap-3 h-full">
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-500">{tool.emoji}</span>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-teal-300 transition-colors">{tool.name}</div>
                    <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest mt-1">{tool.use}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── MODULES ─── */}
        <section className="py-28 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="badge badge-blue inline-flex"><Layers size={11} /> Agency Modules</div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Enterprise-Grade Infrastructure</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">8 specialized modules to power your AI agency's delivery and operations.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agencyModules.map((mod, i) => (
                <motion.div key={mod.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}>
                  <Link href={mod.href}
                    className="group relative h-full p-8 rounded-[2rem] glass border border-white/8 hover:border-teal-500/30 card-hover transition-all duration-500 flex flex-col overflow-hidden">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${mod.color} opacity-5 blur-[60px] rounded-full`} />
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${mod.color} bg-opacity-10`}>
                        <mod.icon size={22} className="text-white" />
                      </div>
                      <span className="badge badge-blue text-[9px]">{mod.badge}</span>
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 group-hover:text-teal-300 transition-colors">{mod.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium group-hover:text-gray-300 transition-colors flex-1">{mod.desc}</p>
                    <div className="mt-6 flex items-center text-teal-400 text-xs font-bold group-hover:translate-x-3 transition-transform duration-500">
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
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 via-blue-600/5 to-purple-600/10 animate-gradient" />
              <div className="relative z-10 space-y-8">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 animate-float">
                  <Globe size={40} className="text-teal-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Ready to Scale?</h2>
                  <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Automate your delivery pipeline, deploy multi-agent workflows, and scale your AI agency with enterprise-grade tools.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/workflow" className="btn-primary px-10 py-5 rounded-2xl">
                    <Workflow size={18} /> Start Building Workflows
                  </Link>
                  <Link href="/community" className="btn-secondary px-10 py-5 rounded-2xl">
                    <Users size={18} /> Connect with Agencies
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
