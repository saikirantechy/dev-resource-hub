"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Target, Sparkles, Clock, Shield, BarChart3, Zap } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import DSAExaminerChat from "@/components/dsa/DSAExaminerChat";

export default function DSAAssessmentPage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                <Target size={12} /> Assessment Mode
              </div>
              <h1 className="text-5xl font-black tracking-tight">
                AI Interview <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Simulation</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Simulate real interview conditions with timed challenges, AI evaluation, and performance scoring.
              </p>
            </div>
          </section>

          {/* ─── Features ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Clock, label: "Timed Challenges", color: "from-red-500 to-orange-500" },
              { icon: Shield, label: "No Hints Allowed", color: "from-amber-500 to-red-500" },
              { icon: BarChart3, label: "Performance Score", color: "from-blue-500 to-purple-500" },
              { icon: Zap, label: "AI Feedback", color: "from-emerald-500 to-teal-500" },
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

          {/* ─── AI Examiner ─── */}
          <section className="max-w-4xl mx-auto">
            <DSAExaminerChat />
          </section>

          {/* ─── Info Cards ─── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Question Types",
                items: ["MCQs", "Coding Problems", "Debugging Questions", "Optimization Tasks", "System Thinking"],
              },
              {
                title: "Evaluation Criteria",
                items: ["Correctness", "Time Complexity", "Space Complexity", "Edge Cases", "Code Quality"],
              },
              {
                title: "Difficulty Levels",
                items: ["Easy", "Medium", "Hard", "Expert"],
              },
            ].map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-5 rounded-2xl glass border border-white/10"
              >
                <h3 className="font-bold text-sm text-white mb-3">{section.title}</h3>
                <div className="space-y-2">
                  {section.items.map(item => (
                    <div key={item} className="flex items-center gap-2 text-[11px] text-gray-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-red-400 to-orange-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ─── CTA ─── */}
          <section className="text-center pb-8">
            <div className="p-10 rounded-[2rem] glass border border-white/10">
              <h2 className="text-2xl font-black mb-2">Need to Learn First?</h2>
              <p className="text-gray-500 text-sm mb-6">Use Tutor Mode to master concepts before taking the assessment.</p>
              <Link href="/dsa/tutor" className="btn-secondary px-8 py-4 rounded-2xl inline-flex">
                Open Tutor Mode <Sparkles size={16} className="ml-2" />
              </Link>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
