"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Search, Bug, ArrowRight, Sparkles, Star, Code2, Globe,
  GraduationCap, Zap, Trophy, Users, BookOpen, Rocket, TrendingUp,
  Filter, Layers, ExternalLink, Award, Calendar, DollarSign, GitFork,
} from "lucide-react";
import opportunities from "@/data/open-source-opportunities.json";
import programs from "@/data/programs.json";
import OpportunityCard from "@/components/open-source/OpportunityCard";
import ProgramCard from "@/components/open-source/ProgramCard";
import StatCard from "@/components/open-source/StatCard";

const quickLinks = [
  { label: "GitHub Issues Explorer", href: "/issues", icon: Bug, color: "from-blue-500 to-cyan-500", badge: "Live" },
  { label: "Repository Explorer", href: "/repositories", icon: Code2, color: "from-emerald-500 to-teal-500", badge: "Live" },
  { label: "GSoC Hub", href: "/gsoc", icon: GraduationCap, color: "from-orange-500 to-red-500", badge: "Live" },
  { label: "Outreachy Hub", href: "/outreachy", icon: Globe, color: "from-purple-500 to-pink-500", badge: "Live" },
  { label: "Hacktoberfest Hub", href: "/hacktoberfest", icon: Zap, color: "from-amber-500 to-yellow-500", badge: "Live" },
  { label: "Open Source Bounties", href: "/bounties", icon: DollarSign, color: "from-green-500 to-emerald-500", badge: "Live" },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy, color: "from-yellow-500 to-orange-500", badge: "Live" },
  { label: "AI Contribution Coach", href: "/ai-contribution-coach", icon: Sparkles, color: "from-indigo-500 to-blue-500", badge: "AI" },
];

const featuredPrograms = programs.filter(p => p.isFeatured).slice(0, 3);
const featuredOpportunities = opportunities.filter(o => o.isFeatured || o.isTrending).slice(0, 6);

export default function OpenSourceHubPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        {/* ─── HERO ─── */}
        <section className="relative px-4 sm:px-6 pt-28 pb-20 overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 40, 0], y: [0, -40, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] -z-10"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], x: [0, -60, 0], y: [0, 30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"
          />
          <div className="absolute inset-0 -z-20 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)", backgroundSize: "40px 40px" }} />

          <div className="max-w-6xl mx-auto text-center space-y-10 relative">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-3">
              <span className="badge badge-emerald"><Sparkles size={10} /> Open Source</span>
              <span className="badge badge-blue"><Search size={10} /> Opportunities Hub</span>
              <span className="badge badge-purple"><Star size={10} /> AI-Powered</span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85]">
                <span className="gradient-text-hero">Open Source</span>
                <br />
                <span className="text-white opacity-90">Opportunities</span>
                <br />
                <span className="gradient-text-blue">Hub</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}
                className="text-xl md:text-2xl text-gray-500 max-w-4xl mx-auto leading-relaxed font-medium">
                Discover. Contribute. Grow. Build Your Open Source Career — from your first pull request to becoming a top contributor.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4">
              <Link href="/issues" className="btn-primary text-base px-10 py-5 rounded-2xl group">
                <Search size={20} /> Explore Issues <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/opportunities" className="btn-secondary text-base px-10 py-5 rounded-2xl">
                <Sparkles size={20} /> All Opportunities
              </Link>
              <Link href="/ai-contribution-coach" className="hidden sm:inline-flex items-center gap-2 px-6 py-5 rounded-2xl border border-white/10 text-sm font-bold text-gray-400 hover:text-white hover:border-blue-500/30 transition-all">
                <Sparkles size={18} /> AI Coach
              </Link>
            </motion.div>

            {/* Quick Links */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="group p-3 rounded-xl glass border border-white/8 hover:border-emerald-500/30 transition-all text-center">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${link.color} bg-opacity-10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                    <link.icon size={14} className="text-white" />
                  </div>
                  <div className="text-[10px] font-bold text-gray-300 group-hover:text-white transition-colors">{link.label}</div>
                  <span className="badge badge-blue text-[7px] mt-1">{link.badge}</span>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── STATS ─── */}
        <section className="py-20 border-y border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatCard label="Issues Available" value="2M+" icon={Bug} color="from-blue-500 to-cyan-500" index={0} />
              <StatCard label="Repositories" value="500K+" icon={Code2} color="from-emerald-500 to-teal-500" index={1} />
              <StatCard label="Programs Listed" value="6+" icon={Award} color="from-purple-500 to-pink-500" index={2} />
              <StatCard label="Contributors" value="10K+" icon={Users} color="from-orange-500 to-red-500" index={3} />
            </div>
          </div>
        </section>

        {/* ─── TAGLINE ─── */}
        <section className="py-16 px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="max-w-3xl mx-auto">
            <span className="text-3xl md:text-5xl font-black tracking-tight gradient-text-hero">
              Discover. Contribute. Grow.
            </span>
            <p className="text-xl text-gray-400 mt-6 leading-relaxed">
              Build Your Open Source Career — from your first pull request to becoming a top contributor.
            </p>
          </motion.div>
        </section>

        {/* ─── FEATURED PROGRAMS ─── */}
        <section className="py-20 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="badge badge-orange inline-flex"><Award size={11} /> Featured Programs</div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Open Source Programs</h2>
                <p className="text-gray-500 max-w-xl">GSoC, Outreachy, Hacktoberfest, MLH Fellowship, and more.</p>
              </div>
              <Link href="/opportunities" className="btn-secondary px-6 py-3 rounded-xl text-sm group">
                View All <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPrograms.map((program, i) => (
                <ProgramCard key={program.id} program={program} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── FEATURED OPPORTUNITIES ─── */}
        <section className="py-20 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-3">
                <div className="badge badge-purple inline-flex"><TrendingUp size={11} /> Trending Resources</div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight">Popular Tools & Resources</h2>
                <p className="text-gray-500 max-w-xl">Curated open-source tools, issue finders, and learning platforms.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredOpportunities.map((opp, i) => (
                <OpportunityCard key={opp.id} opportunity={opp} index={i} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/opportunities" className="btn-secondary px-8 py-4 rounded-xl text-sm group">
                <Layers size={16} /> Browse All Opportunities <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-28 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="relative p-12 md:p-20 rounded-[3rem] glass border border-white/10 overflow-hidden text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-blue-600/5 to-purple-600/10 animate-gradient" />
              <div className="relative z-10 space-y-8">
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto border border-white/10 animate-float">
                  <Rocket size={40} className="text-emerald-400" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Start Your Open Source Journey</h2>
                  <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Your first PR is just a click away. Explore issues, find projects, and join a global community of contributors.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/issues" className="btn-primary px-10 py-5 rounded-2xl">
                    <Search size={18} /> Find Issues
                  </Link>
                  <Link href="/opportunities" className="btn-secondary px-10 py-5 rounded-2xl">
                    <Rocket size={18} /> Explore All
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
