"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Sparkles, ArrowRight, GitFork, Trophy,
  Code2, Bug,
  Share2,
  Medal, Flame, CheckCircle, Timer, Users, Eye,
} from "lucide-react";
import Link from "next/link";

const achievements = [
  { label: "Bronze Contributor", icon: Medal, emoji: "🥉", color: "text-orange-400", unlocked: true },
  { label: "Silver Contributor", icon: Medal, emoji: "🥈", color: "text-gray-300", unlocked: true },
  { label: "Gold Contributor", icon: Medal, emoji: "🥇", color: "text-yellow-400", unlocked: false },
  { label: "Open Source Champion", icon: Trophy, emoji: "🏆", color: "text-emerald-400", unlocked: false },
  { label: "Community Leader", icon: Users, emoji: "👑", color: "text-purple-400", unlocked: false },
];

const contributionStats = [
  { label: "Pull Requests", value: 12, icon: GitFork, color: "text-purple-400" },
  { label: "Issues Closed", value: 8, icon: CheckCircle, color: "text-emerald-400" },
  { label: "Reviews Given", value: 24, icon: Eye, color: "text-blue-400" },
  { label: "Streak Days", value: 5, icon: Flame, color: "text-orange-400" },
];

const contributions = [
  { repo: "dev-resource-hub", type: "PR", title: "Add dark mode toggle component", status: "merged", date: "2 days ago" },
  { repo: "dev-resource-hub", type: "Issue", title: "Fix navigation scroll on mobile", status: "closed", date: "5 days ago" },
  { repo: "react-hook-form", type: "PR", title: "Fix TypeScript types for nested arrays", status: "merged", date: "2 weeks ago" },
  { repo: "shadcn-ui/ui", type: "PR", title: "Add hover card animation", status: "open", date: "3 weeks ago" },
  { repo: "tailwindlabs/tailwindcss", type: "Issue", title: "Container query support suggestion", status: "open", date: "1 month ago" },
];

export default function MyContributionsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
          {/* Hero */}
          <div className="text-center space-y-6">
            <div className="badge badge-purple inline-flex"><Sparkles size={11} /> My Contributions</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Your Open Source <span className="gradient-text-hero">Profile</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Track your contributions, earn achievements, and build your open-source portfolio.
            </p>
          </div>

          {/* Profile Card */}
          <div className="max-w-2xl mx-auto">
            <div className="p-8 rounded-[2rem] glass border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[80px] rounded-full" />
              <div className="relative z-10 flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center border-2 border-white/10">
                  <Users size={32} className="text-purple-400" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">Your Profile</h2>
                  <p className="text-sm text-gray-400 mt-1">Connect your GitHub account to see your full profile</p>
                  <div className="flex gap-3 mt-4">
                    <button className="btn-primary px-5 py-3 rounded-xl text-xs">
                      <Code2 size={14} /> Connect GitHub
                    </button>
                    <button className="px-5 py-3 rounded-xl border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all">
                      <Share2 size={14} /> Share Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {contributionStats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl glass border border-white/8 text-center">
                <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
                <div className="text-3xl font-black">{stat.value}</div>
                <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Achievements */}
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <div className="badge badge-amber inline-flex"><Trophy size={11} /> Achievements</div>
              <h2 className="text-3xl font-black">Your Badges</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {achievements.map((ach, i) => (
                <motion.div key={ach.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-xl text-center border transition-all ${
                    ach.unlocked ? "glass border-white/10 hover:border-amber-500/30" : "bg-white/[0.01] border-white/5 opacity-40"
                  }`}>
                  <span className="text-3xl block mb-2">{ach.emoji}</span>
                  <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{ach.label}</div>
                  {!ach.unlocked && <div className="text-[8px] text-gray-600 mt-1">Locked</div>}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="badge badge-blue inline-flex"><Timer size={11} /> Activity</div>
                <h2 className="text-3xl font-black mt-3">Recent Contributions</h2>
              </div>
              <Link href="/leaderboard" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                View Leaderboard <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {contributions.map((c, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl glass border border-white/8 hover:border-blue-500/30 transition-all flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      c.type === "PR" ? "bg-purple-500/20" : "bg-emerald-500/20"
                    }`}>
                      {c.type === "PR" ? <GitFork size={14} className="text-purple-400" /> : <Bug size={14} className="text-emerald-400" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400">{c.repo}</span>
                        <span className={`badge text-[7px] ${
                          c.status === "merged" ? "badge-purple" :
                          c.status === "closed" ? "badge-emerald" : "badge-blue"
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mt-1">{c.title}</h3>
                      <span className="text-[10px] text-gray-500">{c.date}</span>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-lg bg-white/5 text-[9px] font-bold uppercase tracking-wider text-gray-400">
                    {c.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 pt-8">
            <p className="text-gray-500">Track your open-source journey and build your portfolio.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary px-8 py-4 rounded-xl">
                <Code2 size={18} /> Connect GitHub
              </button>
              <Link href="/issues" className="btn-secondary px-8 py-4 rounded-xl">
                <Bug size={18} /> Find Issues
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
