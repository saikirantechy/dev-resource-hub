"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users, Building2, Heart, Star, Briefcase, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

const positions = [
  { title: "AI Engineer", type: "Full-time", location: "Remote", dept: "Engineering", emoji: "🤖" },
  { title: "Frontend Developer", type: "Full-time", location: "Remote", dept: "Engineering", emoji: "🎨" },
  { title: "Developer Experience Lead", type: "Full-time", location: "Remote", dept: "Product", emoji: "🚀" },
  { title: "Open Source Community Manager", type: "Part-time", location: "Remote", dept: "Community", emoji: "🌍" },
  { title: "AI Research Intern", type: "Internship", location: "Remote", dept: "Research", emoji: "🔬" },
  { title: "Documentation Writer", type: "Contract", location: "Remote", dept: "Content", emoji: "📝" },
];

const agencies = [
  { name: "AI Builders Collective", focus: "AI Agent Development", members: "120+", region: "Global" },
  { name: "Next.js Experts", focus: "Full-Stack Next.js", members: "85+", region: "India" },
  { name: "Prompt Engineering Agency", focus: "LLM Optimization", members: "50+", region: "US/EU" },
  { name: "DevOps Automation Hub", focus: "CI/CD & Infrastructure", members: "65+", region: "Global" },
];

const benefits = [
  { icon: Star, label: "Equity Options", desc: "Own a piece of the platform" },
  { icon: Globe, label: "Remote-First", desc: "Work from anywhere" },
  { icon: Heart, label: "Health Coverage", desc: "Comprehensive health plans" },
  { icon: GraduationCap, label: "Learning Budget", desc: "$5k/year for courses & tools" },
  { icon: Briefcase, label: "Flexible Hours", desc: "Async-first culture" },
  { icon: Users, label: "Team Retreats", desc: "Quarterly offsites" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-6">
              <div className="badge badge-blue inline-flex"><GraduationCap size={11} /> Careers</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                Join the <span className="gradient-text-hero">AI Developer</span> Movement
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Help us build the operating system for AI developers. Remote-first, open source, and community-driven.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {positions.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl glass-strong border border-white/8 p-5 group cursor-pointer hover:border-blue-400/30 transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <span className="badge badge-blue text-[8px]">{p.type}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{p.title}</h3>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-500">
                    <span>{p.location}</span>
                    <span>·</span>
                    <span>{p.dept}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Agencies */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2"><Building2 size={20} className="text-purple-400" /> Partner Agencies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {agencies.map((a, i) => (
                  <motion.div key={a.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="rounded-2xl glass border border-white/8 p-5">
                    <div className="text-sm font-bold text-white mb-1">{a.name}</div>
                    <div className="text-[10px] text-gray-500">{a.focus}</div>
                    <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-400">
                      <Users size={10} /> {a.members} · {a.region}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2"><Heart size={20} className="text-pink-400" /> Perks & Benefits</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {benefits.map((b) => (
                  <div key={b.label} className="rounded-2xl glass border border-white/8 p-4 text-center">
                    <b.icon size={20} className="text-emerald-400 mx-auto mb-2" />
                    <div className="text-xs font-bold text-white">{b.label}</div>
                    <div className="text-[9px] text-gray-500 mt-0.5">{b.desc}</div>
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
