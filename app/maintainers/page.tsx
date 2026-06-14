"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Sparkles, ArrowRight, Users, Award, BarChart3, TrendingUp,
  GitFork, Star, Globe, ExternalLink, Plus,
  Bell, Settings, Activity, Eye, MessageSquare, Bug,
} from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Plus, title: "Submit Repository", desc: "Add your open-source repository to our directory for contributors to discover." },
  { icon: Star, title: "Highlight Issues", desc: "Feature specific issues that need attention — good first issues, help wanted, or bounties." },
  { icon: BarChart3, title: "Contributor Analytics", desc: "See who's contributing, how often, and which areas need more attention." },
  { icon: TrendingUp, title: "Repository Growth", desc: "Track stars, forks, contributors, and community engagement metrics over time." },
  { icon: Users, title: "Community Insights", desc: "Understand your community demographics, contribution patterns, and retention rates." },
  { icon: Bell, title: "Smart Notifications", desc: "Get notified about important events: new contributors, critical issues, and PR bottlenecks." },
];

const metrics = [
  { label: "Monthly Contributors", value: "1,284", change: "+12%", positive: true },
  { label: "Open Issues", value: "47", change: "-8%", positive: true },
  { label: "Avg. PR Merge Time", value: "2.4d", change: "-15%", positive: true },
  { label: "Community Score", value: "92", change: "+5%", positive: true },
];

const repos = [
  { name: "dev-resource-hub", stars: 5200, forks: 340, issues: 23, prs: 12, language: "TypeScript" },
  { name: "ai-agent-framework", stars: 1800, forks: 120, issues: 8, prs: 5, language: "Python" },
  { name: "prompt-library", stars: 3400, forks: 290, issues: 15, prs: 9, language: "TypeScript" },
];

export default function MaintainersPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "repos" | "analytics">("overview");

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
          {/* Hero */}
          <div className="text-center space-y-6">
            <div className="badge badge-indigo inline-flex"><Users size={11} /> Maintainer Dashboard</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Maintainer <span className="gradient-text-hero">Hub</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Tools for open-source maintainers. Submit repositories, highlight issues, and track community growth.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {metrics.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl glass border border-white/8 text-center">
                <div className="text-2xl font-black">{m.value}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-1">{m.label}</div>
                <div className={`text-[10px] font-bold mt-1 ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                  {m.change}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-2 max-w-4xl mx-auto">
            {(["overview", "repos", "analytics"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all capitalize ${
                  activeTab === tab
                    ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
                }`}>
                {tab === "overview" && <Globe size={16} className="inline mr-2" />}
                {tab === "repos" && <GitFork size={16} className="inline mr-2" />}
                {tab === "analytics" && <BarChart3 size={16} className="inline mr-2" />}
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, i) => (
                  <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="p-6 rounded-2xl glass border border-white/8 hover:border-indigo-500/30 card-hover transition-all">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center mb-3">
                      <feature.icon size={18} className="text-indigo-400" />
                    </div>
                    <h3 className="font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Repos Tab */}
          {activeTab === "repos" && (
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black">Your Repositories</h2>
                <button className="btn-primary px-5 py-3 rounded-xl text-xs">
                  <Plus size={14} /> Submit Repository
                </button>
              </div>
              {repos.map((repo) => (
                <div key={repo.name} className="p-5 rounded-2xl glass border border-white/8 hover:border-indigo-500/30 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-white">{repo.name}</h3>
                      <div className="flex items-center gap-4 text-[11px] text-gray-500">
                        <span className="flex items-center gap-1"><Star size={11} className="text-yellow-400" /> {repo.stars.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><GitFork size={11} /> {repo.forks}</span>
                        <span className="flex items-center gap-1"><Activity size={11} /> {repo.issues} issues</span>
                        <span className="flex items-center gap-1"><MessageSquare size={11} /> {repo.prs} PRs</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="badge badge-blue text-[8px]">{repo.language}</span>
                        <span className="badge badge-emerald text-[8px]"><Eye size={7} /> Active</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 rounded-xl border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all">
                      <Settings size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-xl font-black text-center">Contribution Analytics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl glass border border-white/8">
                  <h3 className="font-bold mb-4">Contributors Over Time</h3>
                  <div className="h-32 flex items-end gap-2">
                    {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-gradient-to-t from-indigo-500/30 to-indigo-500/10 rounded-t-md"
                        style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[8px] text-gray-500 font-bold">
                    <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                  </div>
                </div>
                <div className="p-6 rounded-2xl glass border border-white/8">
                  <h3 className="font-bold mb-4">Community Health</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Issue Response Time", value: 85 },
                      { label: "PR Merge Rate", value: 72 },
                      { label: "Contributor Retention", value: 68 },
                      { label: "Community Engagement", value: 91 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">{item.label}</span>
                          <span className="text-white font-bold">{item.value}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"
                            style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <section className="text-center space-y-6 pt-8 border-t border-white/5">
            <p className="text-gray-500">Ready to grow your open-source community?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-primary px-8 py-4 rounded-xl">
                <Plus size={18} /> Submit Your Repository
              </button>
              <Link href="/issues" className="btn-secondary px-8 py-4 rounded-xl">
                <Bug size={18} /> Find Contributors
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
