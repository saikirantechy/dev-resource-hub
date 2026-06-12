"use client";

import { motion } from "framer-motion";
import {
  Shield, TrendingUp, AlertTriangle,
  Star, Clock, Users, Github,
  Newspaper, Siren,
  BarChart3,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const RECENT_DOMAINS = [
  { domain: "github.com", score: 95, level: "Safe", time: "2 min ago" },
  { domain: "huggingface.co", score: 92, level: "Safe", time: "15 min ago" },
  { domain: "pypi.org", score: 88, level: "Safe", time: "1 hr ago" },
  { domain: "example-ai-tool.xyz", score: 23, level: "High Risk", time: "2 hrs ago" },
  { domain: "suspicious-store.top", score: 12, level: "Dangerous", time: "3 hrs ago" },
  { domain: "npmjs.com", score: 90, level: "Safe", time: "5 hrs ago" },
];

const TRENDING_SCAMS = [
  { title: "Fake AI Coding Assistant Promises Unlimited Credits", category: "AI Tool Scam", reports: 47, severity: "high" },
  { title: "Phishing Campaign Targeting GitHub OAuth Tokens", category: "Security Alert", reports: 32, severity: "critical" },
  { title: "Fake Startup Accelerator Asking for ETH Deposit", category: "Startup Scam", reports: 28, severity: "high" },
  { title: "PyPI Package Typosquatting Popular Libraries", category: "Vulnerability", reports: 19, severity: "medium" },
  { title: "Fake Job Posting on Dev Communities", category: "Job Scam", reports: 15, severity: "medium" },
];

const TOP_REPOS = [
  { name: "facebook/react", stars: 235000, trust: 98, risk: "Safe" },
  { name: "vercel/next.js", stars: 131000, trust: 96, risk: "Safe" },
  { name: "langchain-ai/langchain", stars: 102000, trust: 92, risk: "Safe" },
  { name: "openai/openai-cookbook", stars: 62000, trust: 95, risk: "Safe" },
  { name: "microsoft/vscode", stars: 168000, trust: 97, risk: "Safe" },
];

const SECURITY_NEWS = [
  { title: "New AI Voice Cloning Scam Targets Developers", source: "Security Weekly", severity: "critical", time: "1 hr ago" },
  { title: "Open Source Supply Chain Attacks Up 300% in 2026", source: "The Hacker News", severity: "high", time: "3 hrs ago" },
  { title: "Major npm Package Compromise Affects 15M Downloads", source: "Bleeping Computer", severity: "critical", time: "6 hrs ago" },
  { title: "GitHub Secret Scanning Now Detects AI API Keys", source: "GitHub Blog", severity: "medium", time: "12 hrs ago" },
  { title: "New OWASP Top 10 for LLM Applications Released", source: "OWASP", severity: "medium", time: "1 day ago" },
];

function getSeverityColor(severity: string): string {
  const m: Record<string,string> = {
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };
  return m[severity] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-yellow-400";
  if (score >= 40) return "text-orange-400";
  return "text-red-400";
}

function getScoreBg(score: number): string {
  if (score >= 80) return "bg-emerald-500/10 border-emerald-500/30";
  if (score >= 60) return "bg-yellow-500/10 border-yellow-500/30";
  if (score >= 40) return "bg-orange-500/10 border-orange-500/30";
  return "bg-red-500/10 border-red-500/30";
}

export default function SecurityDashboardPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="px-4 sm:px-6 pt-24 pb-12">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="badge badge-blue inline-flex"><BarChart3 size={11} /> Security Dashboard</div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-3">
                Security <span className="gradient-text-blue">Overview</span>
              </h1>
              <p className="text-gray-500 text-base max-w-2xl">
                Real-time view of domain checks, scam reports, trusted repos, and security news.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Shield, label: "Domains Checked", value: "12,847", color: "text-blue-400" },
                { icon: AlertTriangle, label: "Scams Reported", value: "342", color: "text-red-400" },
                { icon: Github, label: "Repos Analyzed", value: "58,291", color: "text-gray-300" },
                { icon: Users, label: "Community Reports", value: "1,239", color: "text-emerald-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-strong rounded-2xl p-5 border border-white/5"
                >
                  <stat.icon size={18} className={"mb-2 " + stat.color} />
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <Clock size={14} className="text-blue-400" /> Recently Checked Domains
                  </h2>
                </div>
                <div className="space-y-2">
                  {RECENT_DOMAINS.map((item, i) => (
                    <motion.div
                      key={item.domain}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-4 border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={"w-8 h-8 rounded-lg flex items-center justify-center " + getScoreBg(item.score)}>
                          <Shield size={14} className={getScoreColor(item.score)} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white truncate">{item.domain}</div>
                          <div className="text-[10px] text-gray-500">{item.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={"px-2 py-0.5 rounded-full text-[10px] font-bold border " + getScoreBg(item.score) + " " + getScoreColor(item.score)}>
                          {item.score}
                        </div>
                        <span className={"text-[10px] font-bold " + getScoreColor(item.score)}>{item.level}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <TrendingUp size={14} className="text-red-400" /> Trending Scams
                  </h2>
                </div>
                <div className="space-y-2">
                  {TRENDING_SCAMS.map((scam, i) => (
                    <motion.div
                      key={scam.title}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <Siren size={12} className="text-red-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-white leading-tight">{scam.title}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{scam.category}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={"text-[9px] font-bold px-1.5 py-0.5 rounded-full border " + getSeverityColor(scam.severity)}>
                          {scam.severity.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-gray-500">{scam.reports} reports</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <Github size={14} className="text-gray-400" /> Top Trusted Repositories
                  </h2>
                </div>
                <div className="space-y-2">
                  {TOP_REPOS.map((repo, i) => (
                    <motion.div
                      key={repo.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-4 border border-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Star size={14} className="text-yellow-400 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white truncate">{repo.name}</div>
                          <div className="flex items-center gap-2 text-[10px] text-gray-500">
                            <span>{repo.stars.toLocaleString()} stars</span>
                          </div>
                        </div>
                      </div>
                      <div className={"px-2 py-0.5 rounded-full text-[10px] font-bold border " + getScoreBg(repo.trust) + " " + getScoreColor(repo.trust)}>
                        {repo.trust}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <Newspaper size={14} className="text-blue-400" /> Security News
                  </h2>
                </div>
                <div className="space-y-2">
                  {SECURITY_NEWS.map((news, i) => (
                    <motion.div
                      key={news.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex items-start gap-2 mb-1">
                        <span className={"text-[9px] font-bold px-1.5 py-0.5 rounded-full border mt-0.5 " + getSeverityColor(news.severity)}>
                          {news.severity === "critical" ? "CRIT" : news.severity.toUpperCase().slice(0, 4)}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white leading-tight">{news.title}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{news.source} &middot; {news.time}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 border border-blue-500/10 text-center">
              <Shield size={32} className="mx-auto mb-4 text-blue-400" />
              <h2 className="text-2xl font-black mb-2">Stay Safe Out There</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
                Use the Security Center to check any website, repo, or AI tool before you commit to it.
              </p>
              <div className="flex justify-center gap-3 text-xs text-gray-500">
                <span>10 Analysis Tools</span>
                <span>Live Dashboard</span>
                <span>Community Reports</span>
                <span>Security Alerts</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
