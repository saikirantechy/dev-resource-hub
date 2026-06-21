"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Map, GraduationCap, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { ROADMAPS } from "@/lib/dsa/data";
import NeonGlowCard from "@/components/NeonGlowCard";

export default function DSARoadmapsPage() {
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
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                <Map size={12} /> Learning Roadmaps
              </div>
              <h1 className="text-5xl font-black tracking-tight">
                DSA <span className="gradient-text-blue">Roadmaps</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Structured learning paths from beginner to advanced. Each roadmap includes topics, practice counts, projects, and expected timelines.
              </p>
            </div>
          </section>

          {/* ─── Roadmaps ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ROADMAPS.map((roadmap, i) => (
              <motion.div
                key={roadmap.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="group relative p-8 rounded-[2rem] bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 hover:border-blue-500/30 card-hover transition-all duration-500 overflow-hidden"
              >
                <NeonGlowCard className="h-full">
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${roadmap.gradient}`} />
                <div className="relative z-10 space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${roadmap.gradient} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-500`}>
                        {roadmap.icon}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-white group-hover:text-blue-300 transition-colors">{roadmap.title}</h2>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{roadmap.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-400 leading-relaxed">{roadmap.description}</p>

                  {/* Topics */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Topics Covered</div>
                    <div className="flex flex-wrap gap-1.5">
                      {roadmap.topics.map(t => (
                        <span key={t} className="px-2.5 py-1 rounded-lg bg-white/5 text-[10px] font-bold text-gray-300 border border-white/5 group-hover:border-blue-500/20 transition-all">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Projects</div>
                    <div className="flex flex-wrap gap-1.5">
                      {roadmap.projects.map(p => (
                        <span key={p} className="px-2.5 py-1 rounded-lg bg-blue-500/10 text-[10px] font-bold text-blue-400 border border-blue-500/20">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 text-xs text-gray-500 pt-2 border-t border-white/5">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap size={14} className="text-blue-400" />
                      {roadmap.practiceCount} Practice Problems
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-amber-400" />
                      {roadmap.timeline}
                    </span>
                  </div>
                </div>
                </NeonGlowCard>
              </motion.div>
            ))}
          </div>

          {/* ─── Custom Roadmap CTA ─── */}
          <section className="text-center pb-8">
            <div className="p-10 rounded-[2rem] glass border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
              <div className="relative z-10 space-y-4">
                <Sparkles size={32} className="mx-auto text-blue-400" />
                <h2 className="text-2xl font-black">Need a Custom Roadmap?</h2>
                <p className="text-gray-500 text-sm max-w-lg mx-auto">Let the AI Roadmap Generator create a personalized learning path based on your goals, current skill level, and target timeline.</p>
                <button className="btn-primary px-8 py-4 rounded-2xl inline-flex">
                  Generate Custom Roadmap <Sparkles size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
