"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Newspaper, AlertTriangle, Siren,
  Bot, Bug, Search, ExternalLink,
  Clock, Calendar, TrendingUp, Zap,
  CheckCircle2, AlertCircle, XCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { getSecurityNews } from "@/lib/security";
import type { SecurityNews as SecurityNewsType } from "@/lib/security";

type NewsCategory = "all" | "scam" | "alert" | "ai-security" | "vulnerability";

const CATEGORIES: { id: NewsCategory; label: string; icon: any; color: string; desc: string }[] = [
  { id: "all", label: "All News", icon: Newspaper, color: "from-blue-500 to-cyan-500", desc: "All security news and updates" },
  { id: "scam", label: "Latest Scams", icon: Siren, color: "from-red-500 to-rose-500", desc: "Recent scams targeting developers" },
  { id: "alert", label: "Security Alerts", icon: AlertTriangle, color: "from-orange-500 to-amber-500", desc: "Critical security advisories" },
  { id: "ai-security", label: "AI Security", icon: Bot, color: "from-purple-500 to-pink-500", desc: "AI-specific security news" },
  { id: "vulnerability", label: "Vulnerabilities", icon: Bug, color: "from-yellow-500 to-orange-500", desc: "Open source vulnerability disclosures" },
];

const CATEGORY_META: Record<string, { label: string; singular: string }> = {
  scam: { label: "Scams", singular: "Scam" },
  alert: { label: "Alerts", singular: "Alert" },
  "ai-security": { label: "AI Security", singular: "AI News" },
  vulnerability: { label: "Vulnerabilities", singular: "Vulnerability" },
};

function getSeverityColor(severity: string): string {
  const m: Record<string, string> = {
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };
  return m[severity] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
}

function getSeverityBadgeBg(severity: string): string {
  const m: Record<string, string> = {
    critical: "bg-red-500/10 border-red-500/20",
    high: "bg-orange-500/10 border-orange-500/20",
    medium: "bg-yellow-500/10 border-yellow-500/20",
    low: "bg-blue-500/10 border-blue-500/20",
  };
  return m[severity] || "bg-gray-500/10 border-gray-500/20";
}

function getSeverityIcon(severity: string) {
  if (severity === "critical") return <XCircle size={14} className="text-red-400 shrink-0" />;
  if (severity === "high") return <AlertTriangle size={14} className="text-orange-400 shrink-0" />;
  if (severity === "medium") return <AlertCircle size={14} className="text-yellow-400 shrink-0" />;
  return <CheckCircle2 size={14} className="text-blue-400 shrink-0" />;
}

export default function SecurityNewsPage() {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allNews = getSecurityNews();
  const filtered = activeCategory === "all"
    ? allNews
    : allNews.filter(n => n.category === activeCategory);

  const searched = searchQuery.trim()
    ? filtered.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.source.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filtered;

  const topStories = [...allNews].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  }).slice(0, 3);

  const categoryCounts = allNews.reduce((acc: Record<string, number>, n) => {
    acc[n.category] = (acc[n.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="px-4 sm:px-6 pt-24 pb-16 relative z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="badge badge-orange inline-flex">
                  <Newspaper size={11} /> Security News
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                    <span className="gradient-text-hero">Security</span> Intelligence
                  </h1>
                  <p className="text-gray-400 text-lg max-w-2xl">
                    Stay ahead of threats with curated security news — latest scams, critical alerts, AI security developments, and open-source vulnerability disclosures.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">Curated</span>
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">Daily Updates</span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">Free</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Stories Bar */}
        <section className="px-4 sm:px-6 py-6 border-b border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp size={14} className="text-red-400" />
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Top Stories</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {topStories.map((story, i) => (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="glass rounded-xl p-4 border border-red-500/10 hover:border-red-500/30 transition-all card-hover"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${getSeverityColor(story.severity)}`}>
                      {story.severity === "critical" ? "CRITICAL" : story.severity.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-gray-600 capitalize">
                      {CATEGORY_META[story.category]?.singular || story.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">{story.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-600">
                    <Calendar size={10} />
                    <span>{story.date}</span>
                    <span>·</span>
                    <span>{story.source}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="px-4 sm:px-6 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Category Tabs with counts */}
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? "bg-white/10 border border-white/20 text-white"
                      : "bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <cat.icon size={14} />
                  {cat.label}
                  {cat.id !== "all" && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-gray-400">
                      {categoryCounts[cat.id] || 0}
                    </span>
                  )}
                  {cat.id === "all" && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-gray-400">
                      {allNews.length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-8 max-w-md">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news by title, summary, or source..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
                aria-label="Search security news"
              />
            </div>

            {/* News Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {searched.length === 0 ? (
                  <div className="text-center py-20 text-gray-600">
                    <Search size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No news articles found matching your search</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {searched.map((news, i) => (
                      <motion.div
                        key={news.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="glass rounded-xl p-5 border border-white/5 hover:border-white/10 transition-all card-hover"
                      >
                        <div className="flex items-start gap-4">
                          {/* Severity Icon */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${getSeverityBadgeBg(news.severity)}`}>
                            {getSeverityIcon(news.severity)}
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Top Row */}
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${getSeverityColor(news.severity)}`}>
                                {news.severity.toUpperCase()}
                              </span>
                              <span className="text-[10px] font-bold text-gray-500 capitalize">
                                {CATEGORY_META[news.category]?.singular || news.category}
                              </span>
                              <span className="text-[10px] text-gray-600 flex items-center gap-1">
                                <Calendar size={9} /> {news.date}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-sm font-bold text-white mb-1.5 leading-snug">
                              {news.title}
                            </h3>

                            {/* Summary */}
                            <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                              {news.summary}
                            </p>

                            {/* Footer */}
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                              <div className="flex items-center gap-2 text-[10px] text-gray-600">
                                <Newspaper size={10} />
                                <span>{news.source}</span>
                              </div>
                              <a
                                href={news.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-[10px] text-blue-400 hover:text-blue-300 transition-colors font-bold"
                              >
                                Read More <ExternalLink size={9} />
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Stats Footer */}
        <section className="px-4 sm:px-6 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Newspaper, label: "News Articles", value: allNews.length.toString(), color: "text-blue-400" },
                { icon: AlertTriangle, label: "Critical Alerts", value: allNews.filter(n => n.severity === "critical").length.toString(), color: "text-red-400" },
                { icon: Bot, label: "AI Security", value: allNews.filter(n => n.category === "ai-security").length.toString(), color: "text-purple-400" },
                { icon: Bug, label: "Vulnerabilities", value: allNews.filter(n => n.category === "vulnerability").length.toString(), color: "text-yellow-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-strong rounded-2xl p-5 border border-white/5 text-center"
                >
                  <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 border border-orange-500/10 text-center">
              <Shield size={32} className="mx-auto mb-4 text-orange-400" />
              <h2 className="text-2xl font-black mb-2">Stay Informed, Stay Safe</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
                Bookmark this page for daily security news. Use the Security Center to analyze any website, repo, or AI tool before you trust it.
              </p>
              <div className="flex justify-center gap-3 text-xs text-gray-500">
                <span>{allNews.length} Articles</span>
                <span>4 Categories</span>
                <span>Daily Updates</span>
                <span>Free & Open Source</span>
              </div>
              <a
                href="/security-center"
                className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-all"
              >
                <Shield size={14} />
                Open Security Center
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
