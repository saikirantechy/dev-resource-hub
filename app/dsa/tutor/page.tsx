"use client";

import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Sparkles, BrainCircuit, Lightbulb, Beaker, Code2 } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import DSATutorChat from "@/components/dsa/DSATutorChat";
import DSATopicCard from "@/components/dsa/DSATopicCard";
import { TOPICS } from "@/lib/dsa/data";

export default function DSATutorPage() {
  const easyTopics = TOPICS.filter(t => t.difficulty === "Easy").slice(0, 6);
  const mediumTopics = TOPICS.filter(t => t.difficulty === "Medium").slice(0, 4);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16 relative z-10">

          {/* ─── Header ─── */}
          <section className="space-y-6">
            <Link href="/dsa" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={12} /> Back to DSA Arena
            </Link>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                <BookOpen size={12} /> Tutor Mode
              </div>
              <h1 className="text-5xl font-black tracking-tight">
                AI <span className="gradient-text-blue">DSA Tutor</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Learn with hints, explanations, visualizations, and AI guidance. Master any DSA concept at your own pace.
              </p>
            </div>
          </section>

          {/* ─── Features ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: BrainCircuit, label: "Concept Explanations", color: "from-blue-500 to-cyan-500" },
              { icon: Lightbulb, label: "AI Guidance", color: "from-amber-500 to-orange-500" },
              { icon: Beaker, label: "Visual Learning", color: "from-purple-500 to-pink-500" },
              { icon: Code2, label: "Code Examples", color: "from-emerald-500 to-teal-500" },
            ].map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-2xl glass border border-white/10 text-center space-y-2"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mx-auto`}>
                  <f.icon size={18} className="text-white" />
                </div>
                <div className="text-[10px] font-bold text-gray-400">{f.label}</div>
              </motion.div>
            ))}
          </div>

          {/* ─── AI Tutor Chat ─── */}
          <section className="max-w-4xl mx-auto">
            <DSATutorChat />
          </section>

          {/* ─── Suggested Topics ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-blue-400" />
              <h2 className="text-2xl font-black">Suggested Topics to Learn</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {easyTopics.slice(0, 3).map((topic, i) => (
                <DSATopicCard key={topic.id} topic={topic} index={i} />
              ))}
            </div>
          </section>

          {/* ─── Intermediate ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-amber-400" />
              <h2 className="text-2xl font-black">Level Up Your Skills</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mediumTopics.slice(0, 2).map((topic, i) => (
                <DSATopicCard key={topic.id} topic={topic} index={i} />
              ))}
            </div>
          </section>

          {/* ─── CTA ─── */}
          <section className="text-center">
            <div className="p-10 rounded-[2rem] glass border border-white/10">
              <h2 className="text-2xl font-black mb-2">Ready for a Challenge?</h2>
              <p className="text-gray-500 text-sm mb-6">Test your knowledge with our interview-style assessment.</p>
              <Link href="/dsa/assessment" className="btn-primary px-8 py-4 rounded-2xl inline-flex">
                Take Assessment <Sparkles size={16} className="ml-2" />
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
