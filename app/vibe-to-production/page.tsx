"use client";

import { motion } from "framer-motion";
import { Lightbulb, Beaker, Rocket, FlaskConical, CheckCircle, Sparkles, Cpu } from "lucide-react";
import Navbar from "@/components/Navbar";

const stages = [
  { phase: "Idea", icon: Lightbulb, color: "from-yellow-500 to-orange-500", description: "Start with a concept. Use AI to brainstorm, validate, and refine your vision into a clear product idea.", duration: "Day 1-3" },
  { phase: "Prototype", icon: FlaskConical, color: "from-purple-500 to-pink-500", description: "Rapidly prototype with vibe coding. Use Cursor, v0, Bolt, or Lovable to create working prototypes in hours.", duration: "Day 3-7" },
  { phase: "MVP", icon: Beaker, color: "from-blue-500 to-cyan-500", description: "Build a minimum viable product with core features. Add auth, database, and basic CI/CD.", duration: "Week 2-3" },
  { phase: "Test", icon: CheckCircle, color: "from-emerald-500 to-teal-500", description: "Write tests, run QA, fix bugs. Use AI agents to generate test suites and automate quality checks.", duration: "Week 3-4" },
  { phase: "Deploy", icon: Rocket, color: "from-green-500 to-emerald-500", description: "Deploy to production. Set up monitoring, analytics, and error tracking. Go live.", duration: "Week 4" },
  { phase: "Scale", icon: Cpu, color: "from-indigo-500 to-blue-500", description: "Optimize performance, add features, scale infrastructure. Continuous iteration.", duration: "Ongoing" },
];

const vibeTools = [
  { name: "Cursor", emoji: "⌨️", use: "AI-native code editor with multi-file editing" },
  { name: "v0", emoji: "🎨", use: "Generative UI from text prompts" },
  { name: "Bolt.new", emoji: "⚡", use: "Full-stack app from prompt" },
  { name: "Lovable", emoji: "💖", use: "Full-stack app builder from natural language" },
  { name: "Replit Agent", emoji: "🔄", use: "Browser-based full-stack AI development" },
  { name: "Claude Code", emoji: "🧠", use: "Terminal-native coding agent" },
];

export default function VibeToProductionPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-blue inline-flex"><Sparkles size={11} /> Vibe Coding → Production</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                From <span className="gradient-text-hero">Vibe Coding</span> to <span className="gradient-text-blue">Viable Code</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                The complete journey from idea to production. Built for working with agents at every stage.
              </p>
            </div>

            {/* Pipeline */}
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-yellow-500/40 via-blue-500/40 to-emerald-500/40 hidden md:block" />
              <div className="space-y-6">
                {stages.map((stage, i) => (
                  <motion.div
                    key={stage.phase}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-0 md:pl-20"
                  >
                    <div className={`hidden md:flex absolute left-4 top-5 w-9 h-9 rounded-xl bg-gradient-to-br ${stage.color} items-center justify-center shadow-lg`}>
                      <stage.icon size={16} className="text-white" />
                    </div>
                    <div className="rounded-2xl glass-strong border border-white/8 p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`md:hidden w-8 h-8 rounded-lg bg-gradient-to-br ${stage.color} flex items-center justify-center`}>
                          <stage.icon size={14} className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-white">{stage.phase}</span>
                            <span className="badge badge-blue text-[8px]">{stage.duration}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 ml-0 md:ml-11">{stage.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Vibe Coding Tools */}
            <div>
              <h2 className="text-xl font-black mb-6">Vibe Coding Tool Stack</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {vibeTools.map((t) => (
                  <div key={t.name} className="rounded-2xl glass border border-white/8 p-4 text-center group">
                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">{t.emoji}</span>
                    <div className="text-xs font-bold text-white mb-1">{t.name}</div>
                    <div className="text-[9px] text-gray-500">{t.use}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
