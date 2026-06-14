"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Sparkles, ArrowRight, Calendar, Users, Award, BookOpen,
  Zap, Star, CheckCircle, Clock, ExternalLink, Trophy,
  GitPullRequest, TrendingUp, Target, Gift, Bug, Code2,
} from "lucide-react";
import Link from "next/link";
import programs from "@/data/programs.json";

const hackathonProgram = programs.find(p => p.id === "hacktoberfest-2026");

const stats = [
  { label: "Participants", value: "400K+", icon: Users, color: "text-amber-400" },
  { label: "Repositories", value: "100K+", icon: GitPullRequest, color: "text-orange-400" },
  { label: "PRs Merged", value: "500K+", icon: Trophy, color: "text-yellow-400" },
  { label: "Swag Sent", value: "200K+", icon: Gift, color: "text-emerald-400" },
];

const tips = [
  { icon: Target, title: "Pick the Right Repos", desc: "Choose repositories with 'hacktoberfest' label and good first issues. Start with documentation improvements." },
  { icon: GitPullRequest, title: "Quality Over Quantity", desc: "Focus on meaningful contributions. Maintainers value quality PRs that solve real problems." },
  { icon: Users, title: "Engage with Maintainers", desc: "Comment on issues before working on them. Ask questions and get feedback early." },
  { icon: Award, title: "Track Your Progress", desc: "Use the Hacktoberfest dashboard to track your PR count and ensure they're accepted." },
];

export default function HacktoberfestPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
          {/* Hero */}
          <div className="text-center space-y-6">
            <div className="badge badge-orange inline-flex"><Zap size={11} /> Hacktoberfest Hub</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Hacktoberfest <span className="gradient-text-hero">2026</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              The month-long celebration of open source. Contribute to participating repositories, earn limited-edition swag, and level up your open source profile.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl glass border border-white/8">
                <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} />
                <div className="text-3xl font-black">{stat.value}</div>
                <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Program Overview */}
          {hackathonProgram && (
            <section className="max-w-4xl mx-auto">
              <div className="p-8 rounded-[2rem] glass border border-amber-500/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black">{hackathonProgram.name}</h2>
                      <p className="text-gray-400 leading-relaxed">{hackathonProgram.description}</p>
                    </div>
                    <a href={hackathonProgram.url} target="_blank" rel="noopener noreferrer"
                      className="btn-primary px-6 py-3 rounded-xl text-sm whitespace-nowrap shrink-0 bg-gradient-to-r from-amber-600 to-orange-600">
                      Official Site <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">{(hackathonProgram?.stats?.totalParticipants || 0).toLocaleString()}+</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Participants</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">{(hackathonProgram?.stats?.totalRepositories || 0).toLocaleString()}+</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Repositories</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">{hackathonProgram?.stats?.successRate || 'N/A'}</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Success Rate</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">🎁 Swag</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Rewards</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={14} className="text-amber-400" /> {hackathonProgram.timeline.projectsStart} - {hackathonProgram.timeline.projectsEnd}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {hackathonProgram.benefits.map((b) => (
                      <span key={b} className="badge badge-emerald text-[8px]"><CheckCircle size={7} /> {b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Tips */}
          <section className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="badge badge-blue inline-flex"><BookOpen size={11} /> Pro Tips</div>
              <h2 className="text-3xl font-black">Hacktoberfest Tips</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, i) => (
                <motion.div key={tip.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass border border-white/8 hover:border-amber-500/30 transition-all">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
                      <tip.icon size={18} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{tip.title}</h3>
                      <p className="text-sm text-gray-400">{tip.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Featured Repos */}
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <div className="badge badge-emerald inline-flex"><TrendingUp size={11} /> Quick Start</div>
              <h2 className="text-3xl font-black">Start Contributing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/issues" className="p-6 rounded-2xl glass border border-white/8 hover:border-emerald-500/30 card-hover text-center">
                <Bug size={24} className="text-emerald-400 mx-auto mb-3" />
                <h3 className="font-bold mb-1">Find Issues</h3>
                <p className="text-xs text-gray-400">Search for hacktoberfest-labeled issues</p>
              </Link>
              <Link href="/repositories" className="p-6 rounded-2xl glass border border-white/8 hover:border-blue-500/30 card-hover text-center">
                <Code2 size={24} className="text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold mb-1">Explore Repos</h3>
                <p className="text-xs text-gray-400">Discover participating repositories</p>
              </Link>
              <Link href="/leaderboard" className="p-6 rounded-2xl glass border border-white/8 hover:border-amber-500/30 card-hover text-center">
                <Trophy size={24} className="text-amber-400 mx-auto mb-3" />
                <h3 className="font-bold mb-1">Leaderboard</h3>
                <p className="text-xs text-gray-400">Track your contributions</p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 pt-8">
            <p className="text-gray-500">Ready to participate in Hacktoberfest?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={hackathonProgram?.url || "#"} target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600">
                <ExternalLink size={18} /> Register Now
              </a>
              <Link href="/issues?difficulty=good-first-issue" className="btn-secondary px-8 py-4 rounded-xl">
                <Bug size={18} /> Find Beginner Issues
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
