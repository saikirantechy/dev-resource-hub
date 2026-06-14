"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Search, Sparkles, ArrowRight, Globe,
  TrendingUp, Award, ExternalLink, BookOpen, Code2, Bot,
  DollarSign, GraduationCap, Users, Zap, Star, RotateCcw, Bug,
} from "lucide-react";
import Link from "next/link";
import opportunities from "@/data/open-source-opportunities.json";
import programs from "@/data/programs.json";
import OpportunityCard from "@/components/open-source/OpportunityCard";
import ProgramCard from "@/components/open-source/ProgramCard";

const allCategories = ["All", "Learning", "Issue Finder", "AI Tools", "Programs", "Tools", "Bounties", "Community"];
const allDifficulties = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"];

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const filteredPrograms = useMemo(() => {
    return programs.filter(p => {
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && !p.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (difficulty !== "All" && p.difficulty !== difficulty) return false;
      return true;
    });
  }, [searchQuery, difficulty]);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(o => {
      if (searchQuery && !o.name.toLowerCase().includes(searchQuery.toLowerCase()) && !o.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      if (category !== "All" && o.category !== category) return false;
      if (difficulty !== "All" && o.difficulty !== difficulty) return false;
      return true;
    });
  }, [searchQuery, category, difficulty]);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="badge badge-emerald inline-flex"><Sparkles size={11} /> Open Source Opportunities</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              All <span className="gradient-text-hero">Opportunities</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Discover programs, tools, issue finders, and learning resources to start or grow your open-source journey.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search opportunities, programs, tools..."
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                />
              </div>
              <button onClick={() => { setSearchQuery(""); setCategory("All"); setDifficulty("All"); }}
                className="px-6 py-4 rounded-2xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
                <RotateCcw size={14} /> Reset
              </button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button key={cat} onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                    category === cat
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}>
                  {cat}
                </button>
              ))}
            </div>

            {/* Difficulty Filters */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Difficulty:</span>
              <div className="flex gap-1">
                {allDifficulties.map((d) => (
                  <button key={d} onClick={() => setDifficulty(d)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      difficulty === d
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "text-gray-500 hover:text-gray-300"
                    }`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Programs Section */}
          {filteredPrograms.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Award size={18} className="text-orange-400" />
                <h2 className="text-2xl font-black">Open Source Programs</h2>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrograms.map((program, i) => (
                  <ProgramCard key={program.id} program={program} index={i} />
                ))}
              </div>
            </section>
          )}

          {/* Opportunities Section */}
          {filteredOpportunities.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-emerald-400" />
                <h2 className="text-2xl font-black">Tools & Resources</h2>
                <div className="flex-1 h-px bg-white/5" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOpportunities.map((opp, i) => (
                  <OpportunityCard key={opp.id} opportunity={opp} index={i} />
                ))}
              </div>
            </section>
          )}

          {filteredPrograms.length === 0 && filteredOpportunities.length === 0 && (
            <div className="text-center py-20 space-y-4">
              <Search size={40} className="mx-auto text-gray-600" />
              <p className="text-gray-500 text-lg">No results found. Try different filters.</p>
            </div>
          )}

          {/* Quick Links */}
          <section className="pt-12 border-t border-white/5 space-y-6">
            <h2 className="text-2xl font-black text-center">Explore Specialized Hubs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { href: "/issues", label: "Issues Explorer", icon: Bug, color: "from-blue-500 to-cyan-500" },
                { href: "/repositories", label: "Repository Explorer", icon: Code2, color: "from-emerald-500 to-teal-500" },
                { href: "/gsoc", label: "GSoC Hub", icon: GraduationCap, color: "from-orange-500 to-red-500" },
                { href: "/outreachy", label: "Outreachy Hub", icon: Globe, color: "from-purple-500 to-pink-500" },
                { href: "/hacktoberfest", label: "Hacktoberfest", icon: Zap, color: "from-amber-500 to-yellow-500" },
                { href: "/bounties", label: "Bounties", icon: DollarSign, color: "from-green-500 to-emerald-500" },
                { href: "/maintainers", label: "Maintainer Hub", icon: Users, color: "from-indigo-500 to-blue-500" },
                { href: "/ai-contribution-coach", label: "AI Coach", icon: Bot, color: "from-pink-500 to-rose-500" },
              ].map((link) => (
                <Link key={link.href} href={link.href}
                  className="group p-4 rounded-xl glass border border-white/8 hover:border-emerald-500/30 card-hover text-center flex flex-col items-center gap-2 transition-all duration-500">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <link.icon size={16} className="text-white" />
                  </div>
                  <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{link.label}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
