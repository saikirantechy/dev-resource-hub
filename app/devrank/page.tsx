"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Trophy, Globe, Building2, Users, GraduationCap, Swords, BarChart3, BrainCircuit, Zap, Code2, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import { DEVELOPERS, COLLEGES } from "@/lib/devrank/data";
import DevRankCard from "@/components/devrank/DevRankCard";
import DevRankChart from "@/components/devrank/DevRankChart";

const QUICK_LINKS = [
  { href: "/devrank/global", label: "Global", icon: Globe, desc: "Worldwide rankings", color: "from-blue-500 to-cyan-500" },
  { href: "/devrank/developers", label: "Developers", icon: Code2, desc: "Top dev profiles", color: "from-emerald-500 to-teal-500" },
  { href: "/devrank/colleges", label: "Colleges", icon: GraduationCap, desc: "College rankings", color: "from-purple-500 to-pink-500" },
  { href: "/devrank/communities", label: "Communities", icon: Users, desc: "Community scores", color: "from-indigo-500 to-blue-500" },
  { href: "/devrank/organizations", label: "Orgs", icon: Building2, desc: "Org analytics", color: "from-amber-500 to-orange-500" },
  { href: "/devrank/hackathons", label: "Hackathons", icon: Swords, desc: "Event rankings", color: "from-red-500 to-rose-500" },
  { href: "/devrank/badges", label: "Badges", icon: Award, desc: "Achievement system", color: "from-yellow-500 to-amber-500" },
  { href: "/devrank/analytics", label: "Analytics", icon: BarChart3, desc: "Deep analytics", color: "from-violet-500 to-purple-500" },
  { href: "/devrank/insights", label: "Insights", icon: BrainCircuit, desc: "AI career insights", color: "from-sky-500 to-blue-500" },
];

const top3 = DEVELOPERS.slice(0, 3);
const chartData = COLLEGES.slice(0, 10).map(c => ({ label: c.name.split(" ")[0], value: c.totalScore }));

export default function DevRankPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-24 relative z-10">

          {/* HERO */}
          <section className="text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles size={12} /> Powered by Dev Resource Hub
            </motion.div>
            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
              className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              <span className="gradient-text-hero">DevRank AI</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              The Ultimate Developer Reputation &amp; <span className="text-white">Open Source Intelligence</span> Platform.
              Track contributions, community leadership, hackathon achievements, and AI-powered career growth.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4">
              <Link href="/devrank/global" className="btn-primary px-8 py-4 rounded-2xl"><Trophy size={18} /> View Rankings</Link>
              <Link href="/devrank/analytics" className="btn-secondary px-8 py-4 rounded-2xl"><BarChart3 size={18} /> Analyze Profile</Link>
              <Link href="/devrank/badges" className="btn-secondary px-8 py-4 rounded-2xl"><Award size={18} /> Generate Badge</Link>
            </motion.div>
          </section>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { label: "Developers Tracked", value: "12,450+", icon: Code2, color: "text-blue-400" },
              { label: "Colleges Ranked", value: "2,800+", icon: GraduationCap, color: "text-purple-400" },
              { label: "Communities", value: "1,200+", icon: Users, color: "text-emerald-400" },
              { label: "Badges Awarded", value: "45,000+", icon: Award, color: "text-amber-400" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl glass border border-white/10 text-center space-y-2"
              >
                <s.icon size={20} className={`mx-auto ${s.color}`} />
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* TOP 3 */}
          <section className="space-y-6">
            <div className="flex items-center gap-3"><Trophy size={16} className="text-amber-400" /><h2 className="text-2xl font-black">Top Developers</h2><div className="flex-1 h-px bg-white/5" /></div>
            <div className="space-y-3">
              {top3.map((dev, i) => <DevRankCard key={dev.id} developer={dev} index={i} />)}
            </div>
            <div className="text-center"><Link href="/devrank/global" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors">View Full Rankings →</Link></div>
          </section>

          {/* COLLEGE RANKINGS CHART */}
          <section className="space-y-6">
            <div className="flex items-center gap-3"><GraduationCap size={16} className="text-purple-400" /><h2 className="text-2xl font-black">Top Colleges by Score</h2><div className="flex-1 h-px bg-white/5" /></div>
            <div className="p-6 rounded-2xl glass border border-white/10">
              <DevRankChart data={chartData} height={180} />
            </div>
            <div className="text-center"><Link href="/devrank/colleges" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors">View All Colleges →</Link></div>
          </section>

          {/* QUICK LINKS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3"><Zap size={16} className="text-amber-400" /><h2 className="text-2xl font-black">Explore DevRank</h2><div className="flex-1 h-px bg-white/5" /></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {QUICK_LINKS.map((link, i) => (
                <motion.div key={link.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={link.href} className="group p-4 rounded-2xl glass border border-white/10 hover:border-blue-500/30 card-hover transition-all duration-500 flex flex-col items-center text-center gap-3 h-full">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <link.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{link.label}</div>
                      <div className="text-[9px] text-gray-600 mt-0.5">{link.desc}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="pb-8">
            <div className="relative p-12 md:p-16 rounded-[2rem] glass border border-white/10 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-cyan-600/10 animate-gradient" />
              <div className="relative z-10 space-y-6">
                <BrainCircuit size={40} className="mx-auto text-blue-400" />
                <h2 className="text-4xl font-black">Know Your DevRank</h2>
                <p className="text-gray-400 max-w-xl mx-auto">Connect your GitHub profile to get personalized AI insights, track your growth, and earn badges.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/devrank/insights" className="btn-primary px-8 py-4 rounded-2xl"><BrainCircuit size={18} /> Get AI Insights</Link>
                  <Link href="/devrank/global" className="btn-secondary px-8 py-4 rounded-2xl"><Trophy size={18} /> View Rankings</Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
