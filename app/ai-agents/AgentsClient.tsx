"use client";

import { useState, useMemo } from "react";
import agentsData from "@/data/agents.json";
import {
  Bot,
  GitFork,
  BookOpen,
  Copy,
  CheckCircle2,
  Star,
  Eye,
  Search,
  Filter,
  Code2,
  Globe,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const CATEGORIES = [
  "All",
  "Autonomous Agents",
  "Coding Agents",
  "Agent Frameworks",
  "Research Agents",
];

const CATEGORY_COLORS: Record<string, string> = {
  "Autonomous Agents": "badge-orange",
  "Coding Agents": "badge-blue",
  "Agent Frameworks": "badge-purple",
  "Research Agents": "badge-emerald",
};

export default function AgentsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      agentsData.filter((a) => {
        const matchesSearch =
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.description.toLowerCase().includes(search.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
        const matchesCat =
          activeCategory === "All" || a.category === activeCategory;
        return matchesSearch && matchesCat;
      }),
    [search, activeCategory],
  );

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatNumber = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-blue">
            <Bot size={12} /> Autonomous Ecosystem
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-hero">AI Agent</span>
            <br />
            <span className="text-white/90">Explorer</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explore the frontier of autonomous AI. From solo coding agents to
            orchestrated multi-agent frameworks — find your perfect agent stack.
          </p>

          {/* Stats Row */}
          <div className="flex items-center justify-center gap-8 pt-4">
            {[
              { label: "Agents Listed", value: agentsData.length, icon: Bot },
              { label: "Total Stars", value: "500k+", icon: Star },
              { label: "Categories", value: 4, icon: Filter },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-sm">
                <stat.icon size={14} className="text-blue-400" />
                <span className="font-bold text-white">{stat.value}</span>
                <span className="text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Search & Filter */}
        <div className="space-y-4">
          <div className="relative max-w-2xl mx-auto">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search agents, frameworks, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-500/20 border border-blue-500/40 text-blue-300"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/8"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((agent, i) => (
            <div
              key={agent.id}
              className="group relative glass rounded-3xl p-6 card-hover border border-white/5 hover:border-blue-500/30 animate-fade-in flex flex-col"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Featured / Trending badges */}
              <div className="absolute top-4 right-4 flex gap-1.5">
                {agent.isFeatured && (
                  <span className="badge badge-orange">
                    <Zap size={9} /> Featured
                  </span>
                )}
                {agent.isTrending && (
                  <span className="badge badge-blue animate-pulse">🔥 Hot</span>
                )}
                {agent.isOpenSource && (
                  <span className="badge badge-emerald">
                    <Code2 size={9} /> OSS
                  </span>
                )}
              </div>

              {/* Agent Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Bot size={22} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors truncate">
                    {agent.name}
                  </h3>
                  <span
                    className={`badge ${CATEGORY_COLORS[agent.category] || "badge-blue"} text-[9px] mt-1`}
                  >
                    {agent.category}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-4">
                {agent.description}
              </p>

              {/* Strength */}
              <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">
                  💡 Strength
                </div>
                <div className="text-xs text-gray-300">{agent.strength}</div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {agent.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/5 border border-white/8 rounded text-[10px] text-gray-400 font-bold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-5">
                {agent.stars > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-yellow-500" />
                    {formatNumber(agent.stars)}
                  </span>
                )}
                {agent.views > 0 && (
                  <span className="flex items-center gap-1">
                    <Eye size={11} className="text-gray-400" />
                    {formatNumber(agent.views)}
                  </span>
                )}
                <span className="ml-auto font-semibold text-gray-400">
                  {agent.pricing}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-auto">
                <Link
                  href={agent.url}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-all"
                >
                  <Globe size={12} /> Visit
                </Link>
                {agent.github && (
                  <Link
                    href={agent.github}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold hover:bg-white/10 transition-all"
                  >
                    <GitFork size={12} />
                  </Link>
                )}
                {agent.docs && (
                  <Link
                    href={agent.docs}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold hover:bg-white/10 transition-all"
                  >
                    <BookOpen size={12} />
                  </Link>
                )}
                <button
                  onClick={() => handleCopy(agent.id, agent.url)}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold hover:bg-white/10 transition-all"
                  title="Copy URL"
                >
                  {copiedId === agent.id ? (
                    <CheckCircle2 size={12} className="text-green-400" />
                  ) : (
                    <Copy size={12} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <div className="text-5xl">🤖</div>
            <p className="text-gray-400 text-xl">
              No agents found for{" "}
              <span className="text-white font-bold">&quot;{search}&quot;</span>
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="btn-secondary mt-4"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="relative p-12 rounded-[2.5rem] glass border border-white/8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl font-black">Know an AI Agent we missed?</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Help grow the ecosystem. Submit any tool, framework, or agent to
              be featured.
            </p>
            <Link href="/submit" className="btn-primary inline-flex">
              <Zap size={16} /> Submit an Agent
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
