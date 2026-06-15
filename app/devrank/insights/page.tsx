"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BrainCircuit, ArrowLeft, TrendingUp, TrendingDown, Lightbulb, Target, Sparkles, Star, BarChart3, ArrowRight, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import { INSIGHTS, DEVELOPERS } from "@/lib/devrank/data";
import type { Insight } from "@/lib/devrank/types";

const insightIcons: Record<Insight["type"], typeof Star> = {
  strength: TrendingUp, weakness: TrendingDown, opportunity: Lightbulb, recommendation: Target,
};

const insightColors: Record<Insight["type"], string> = {
  strength: "from-emerald-500 to-teal-500", weakness: "from-amber-500 to-orange-500",
  opportunity: "from-blue-500 to-indigo-500", recommendation: "from-purple-500 to-pink-500",
};

const insightLabels: Record<Insight["type"], string> = {
  strength: "Strength", weakness: "Area to Improve", opportunity: "Opportunity", recommendation: "Recommendation",
};

export default function DevRankInsightsPage() {
  const [activeTab, setActiveTab] = useState<Insight["type"] | "all">("all");

  const filtered = activeTab === "all" ? INSIGHTS : INSIGHTS.filter(i => i.type === activeTab);

  const scores = {
    strengths: INSIGHTS.filter(i => i.type === "strength").reduce((a, i) => a + i.score, 0) / Math.max(INSIGHTS.filter(i => i.type === "strength").length, 1),
    weaknesses: INSIGHTS.filter(i => i.type === "weakness").reduce((a, i) => a + i.score, 0) / Math.max(INSIGHTS.filter(i => i.type === "weakness").length, 1),
    overall: INSIGHTS.reduce((a, i) => a + i.score, 0) / INSIGHTS.length,
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-10 relative z-10">

          <div className="space-y-4">
            <Link href="/devrank" className="inline-flex items-center gap-1 text-[10px] text-gray-500 hover:text-gray-300 transition-colors"><ArrowLeft size={12} /> Back to DevRank</Link>
            <div className="flex items-center gap-3">
              <BrainCircuit size={24} className="text-sky-400" />
              <h1 className="text-3xl md:text-5xl font-black">AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Insights</span></h1>
            </div>
          </div>

          {/* Profile Selector */}
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl glass border border-white/10">
            <BrainCircuit size={16} className="text-blue-400" />
            <span className="text-[10px] font-bold text-gray-400">Analyzing profile:</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[8px] font-black text-white">{DEVELOPERS[0].displayName[0]}</div>
              <span className="text-xs font-bold text-white">{DEVELOPERS[0].displayName}</span>
              <span className="text-[10px] text-gray-500">@{DEVELOPERS[0].username}</span>
            </div>
            <Link href="/devrank/profile/alexchen" className="ml-auto text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">View Full Profile <ArrowRight size={10} /></Link>
          </div>

          {/* Score Overview */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Overall Score", value: Math.round(scores.overall), color: "from-blue-400 to-purple-500", icon: BrainCircuit },
              { label: "Strengths Avg", value: Math.round(scores.strengths), color: "from-emerald-400 to-teal-500", icon: TrendingUp },
              { label: "To Improve", value: Math.round(scores.weaknesses), color: "from-amber-400 to-orange-500", icon: TrendingDown },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl glass border border-white/10 text-center space-y-2"
              >
                <s.icon size={20} className={`mx-auto text-transparent bg-clip-text bg-gradient-to-br ${s.color}`} />
                <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${s.color}`}>{s.value}</div>
                <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Tab Filter */}
          <div className="flex flex-wrap gap-2">
            {(["all", "strength", "weakness", "opportunity", "recommendation"] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  activeTab === t ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-white/5 text-gray-500 border border-white/10 hover:border-white/20"
                }`}
              >{t === "all" ? "All Insights" : t}</button>
            ))}
          </div>

          {/* Insight Cards */}
          <div className="grid gap-4">
            {filtered.map((insight, i) => {
              const Icon = insightIcons[insight.type];
              return (
                <motion.div key={insight.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="group p-5 md:p-6 rounded-2xl glass border border-white/10 hover:border-blue-500/30 card-hover transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insightColors[insight.type]} flex items-center justify-center shrink-0`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${insight.type === "strength" ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" : insight.type === "weakness" ? "text-amber-400 bg-amber-500/10 border border-amber-500/20" : insight.type === "opportunity" ? "text-blue-400 bg-blue-500/10 border border-blue-500/20" : "text-purple-400 bg-purple-500/10 border border-purple-500/20"}`}>
                          {insightLabels[insight.type]}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-white mt-1">{insight.title}</h3>
                      <p className="text-[10px] text-gray-500 mt-1">{insight.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${insight.score}%` }} transition={{ duration: 1, delay: i * 0.1 }}
                            className={`h-full rounded-full bg-gradient-to-r ${insightColors[insight.type]}`} />
                        </div>
                        <span className={`text-lg font-black text-transparent bg-clip-text bg-gradient-to-r ${insightColors[insight.type]}`}>{insight.score}</span>
                      </div>
                      <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold mt-0.5">Confidence</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Career Roadmap CTA */}
          <div className="p-8 md:p-12 rounded-[2rem] glass border border-white/10 text-center space-y-4">
            <Sparkles size={32} className="mx-auto text-blue-400" />
            <h2 className="text-2xl font-black">Personalized Career Roadmap</h2>
            <p className="text-gray-400 max-w-lg mx-auto text-sm">Get a tailored growth plan with skill gap analysis, project recommendations, and open source opportunities.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button className="btn-primary px-6 py-3 rounded-xl text-[10px] font-bold"><Zap size={14} /> Generate Career Roadmap</button>
              <button className="btn-secondary px-6 py-3 rounded-xl text-[10px] font-bold"><BarChart3 size={14} /> Skill Gap Analysis</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
