"use client";

import { useState, useMemo } from "react";
import promptsData from "@/data/prompts.json";
import {
  Copy,
  CheckCircle2,
  Search,
  Terminal,
  Eye,
  ThumbsUp,
  Filter,
  Sparkles, Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const CATEGORIES = [
  "All",
  "Cursor Prompts",
  "Next.js",
  "Agent Prompts",
  "System Prompts",
  "Code Review",
  "Architecture",
  "Prompt Engineering",
  "Debugging",
];
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

const DIFF_COLORS: Record<string, string> = {
  Beginner: "badge-emerald",
  Intermediate: "badge-blue",
  Advanced: "badge-orange",
};

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filtered = useMemo(
    () =>
      promptsData.filter((p) => {
        const q = search.toLowerCase();
        const matchesSearch =
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCat =
          activeCategory === "All" || p.category === activeCategory;
        const matchesDiff =
          activeDifficulty === "All" || p.difficulty === activeDifficulty;
        return matchesSearch && matchesCat && matchesDiff;
      }),
    [search, activeCategory, activeDifficulty],
  );

  const formatNumber = (n: number) =>
    n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-14">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-purple">
            <Terminal size={12} /> Prompt Marketplace
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-purple">AI Prompt</span>
            <br />
            <span className="text-white/90">Library</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Battle-tested prompts for Cursor, Windsurf, Claude, GPT-4, and
            autonomous agents. Copy, use, and ship faster.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-2">
            <div className="text-center">
              <div className="text-2xl font-black text-white">
                {promptsData.length}
              </div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Prompts
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">
                {formatNumber(promptsData.reduce((acc, p) => acc + p.views, 0))}
              </div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Total Views
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-white">
                {formatNumber(promptsData.reduce((acc, p) => acc + p.likes, 0))}
              </div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
                Likes
              </div>
            </div>
          </div>
        </header>

        {/* Search & Filters */}
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search prompts, tags, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-600"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 mr-2">
              <Filter size={13} className="text-gray-500" />
              <span className="text-xs text-gray-500 font-bold">Category:</span>
            </div>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-purple-500/20 border border-purple-500/40 text-purple-300"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1 mr-2">
              <Sparkles size={13} className="text-gray-500" />
              <span className="text-xs text-gray-500 font-bold">
                Difficulty:
              </span>
            </div>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDifficulty(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeDifficulty === d
                    ? "bg-blue-500/20 border border-blue-500/40 text-blue-300"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="text-sm text-gray-500">
          Showing{" "}
          <span className="text-white font-bold">{filtered.length}</span> of{" "}
          {promptsData.length} prompts
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {filtered.map((prompt, i) => {
            const isExpanded = expandedId === prompt.id;
            return (
              <div
                key={prompt.id}
                className="group glass rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all duration-300 card-hover animate-fade-in flex flex-col"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="p-6 flex flex-col h-full">
                  {/* Top Row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span
                          className={`badge ${DIFF_COLORS[prompt.difficulty] || "badge-blue"}`}
                        >
                          {prompt.difficulty}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                          {prompt.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        {prompt.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleCopy(prompt.id, prompt.content)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                        copiedId === prompt.id
                          ? "bg-green-500/10 border-green-500/30 text-green-400"
                          : "bg-white/5 border-white/10 text-gray-400 hover:bg-purple-500/10 hover:border-purple-500/30 hover:text-purple-400"
                      }`}
                    >
                      {copiedId === prompt.id ? (
                        <>
                          <CheckCircle2 size={13} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={13} /> Copy
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    {prompt.description}
                  </p>

                  {/* Code Preview */}
                  <div
                    className={`terminal text-xs text-gray-300 leading-relaxed cursor-pointer transition-all ${
                      isExpanded ? "" : "max-h-32 overflow-hidden relative"
                    }`}
                    onClick={() => setExpandedId(isExpanded ? null : prompt.id)}
                  >
                    <div className="pt-4">{prompt.content}</div>
                    {!isExpanded && (
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0d0d14] to-transparent" />
                    )}
                  </div>
                  <div className="mt-6 flex gap-2">
                    <Link
                      href={`/prompts/${prompt.id}`}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold hover:bg-purple-500/20 transition-all group/btn"
                    >
                      <Zap
                        size={14}
                        className="group-hover:scale-110 transition-transform"
                      />{" "}
                      View Details & Playground
                    </Link>
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {prompt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-white/[0.04] border border-white/8 rounded text-[10px] text-gray-400 font-bold uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium">by {prompt.author}</span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye size={11} /> {formatNumber(prompt.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={11} className="text-pink-400" />{" "}
                        {formatNumber(prompt.likes)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <div className="text-5xl">✨</div>
            <p className="text-gray-400 text-xl">
              No prompts found for{" "}
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

        {/* CTA */}
        <div className="relative p-12 rounded-[2.5rem] glass border border-white/8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
          <div className="relative z-10 space-y-4">
            <div className="text-4xl">📝</div>
            <h2 className="text-3xl font-black">Have a killer prompt?</h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Share your best prompts with 10,000+ developers in the ecosystem.
            </p>
            <Link href="/submit" className="btn-primary inline-flex">
              <Zap size={16} /> Submit Your Prompt
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

