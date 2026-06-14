"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Search,
  Star,
  GitFork,
  ArrowRight,
  Sparkles,
  Clock,
  ExternalLink,
  Loader2,
  AlertCircle,
  Info,
  RefreshCw,
  TrendingUp,
  Code2,
  BookOpen,
} from "lucide-react";
import { searchRepos, getTrendingRepos, GitHubRepo } from "@/lib/github";

const LANGUAGES = ["", "javascript", "typescript", "python", "rust", "go", "java", "ruby", "cpp", "swift", "kotlin"];
const SORT_OPTIONS = ["stars", "forks", "updated", "help-wanted-issues"];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default function RepositoriesPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [sort, setSort] = useState<"stars" | "forks" | "updated" | "help-wanted-issues">("stars");
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [view, setView] = useState<"trending" | "search">("trending");

  const doSearch = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    setSearched(true);
    setView("search");
    try {
      const q = query || "stars:>1000";
      const result = await searchRepos({ q, language, sort, page });
      setRepos(result.items);
      setTotalCount(result.total_count);
    } catch {
      setError("GitHub API rate limit exceeded. Try again in a minute.");
      setRepos([]);
    } finally {
      setLoading(false);
    }
  }, [query, language, sort]);

  const loadTrending = useCallback(async () => {
    setLoading(true);
    setError("");
    setSearched(true);
    setView("trending");
    setQuery("");
    try {
      const items = await getTrendingRepos(language);
      setRepos(items);
      setTotalCount(items.length);
    } catch {
      setError("Could not load trending repos. Try again.");
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadTrending();
  }, []);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="badge badge-emerald inline-flex"><Sparkles size={11} /> Repository Explorer</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Discover <span className="gradient-text-hero">Great Repos</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Explore trending and popular open-source repositories. Find your next project to contribute to or learn from.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-2">
            <button onClick={loadTrending}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                view === "trending"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
              }`}>
              <TrendingUp size={16} className="inline mr-2" />Trending
            </button>
            <button onClick={() => { setQuery("stars:>1000"); doSearch(); }}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                view === "search"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:text-white"
              }`}>
              <Search size={16} className="inline mr-2" />Search
            </button>
          </div>

          {/* Search */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doSearch()}
                  placeholder="Search repositories..."
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-emerald-500/50 transition-all text-sm"
                />
              </div>
              <button onClick={() => doSearch()} disabled={loading}
                className="btn-primary px-8 py-4 rounded-2xl text-sm whitespace-nowrap bg-gradient-to-r from-emerald-600 to-teal-600">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                Search
              </button>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              <button onClick={() => { setLanguage(""); loadTrending(); }} className="badge badge-emerald hover:scale-105 transition-transform cursor-pointer">
                All Languages
              </button>
              <button onClick={() => { setLanguage("python"); loadTrending(); }} className="badge badge-blue hover:scale-105 transition-transform cursor-pointer">Python</button>
              <button onClick={() => { setLanguage("typescript"); loadTrending(); }} className="badge badge-blue hover:scale-105 transition-transform cursor-pointer">TypeScript</button>
              <button onClick={() => { setLanguage("javascript"); loadTrending(); }} className="badge badge-blue hover:scale-105 transition-transform cursor-pointer">JavaScript</button>
              <button onClick={() => { setLanguage("rust"); loadTrending(); }} className="badge badge-purple hover:scale-105 transition-transform cursor-pointer">Rust</button>
              <button onClick={() => { setLanguage("go"); loadTrending(); }} className="badge badge-orange hover:scale-105 transition-transform cursor-pointer">Go</button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Sort:</span>
              <div className="flex gap-1">
                {SORT_OPTIONS.map((s) => (
                  <button key={s} onClick={() => { setSort(s as "stars" | "forks" | "updated" | "help-wanted-issues"); doSearch(); }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
                      sort === s ? "bg-emerald-500/20 text-emerald-400" : "text-gray-500 hover:text-gray-300"
                    }`}>
                    {s.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {view === "trending" && !loading && repos.length > 0 && (
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-emerald-400" />
                <span className="text-sm text-gray-500">Trending repositories from the last 7 days</span>
              </div>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-emerald-400" />
              </div>
            ) : error ? (
              <div className="max-w-xl mx-auto text-center py-16 space-y-4">
                <AlertCircle size={40} className="mx-auto text-orange-400" />
                <p className="text-gray-400">{error}</p>
                <button onClick={loadTrending} className="btn-secondary px-6 py-3 rounded-xl text-sm">
                  <RefreshCw size={16} /> Retry
                </button>
              </div>
            ) : searched && repos.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Info size={40} className="mx-auto text-gray-600" />
                <p className="text-gray-500">No repositories found. Try different search terms.</p>
              </div>
            ) : (
              <>
                {searched && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{totalCount.toLocaleString()} repositories found</p>
                    <button onClick={() => doSearch()} className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                      <RefreshCw size={12} /> Refresh
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {repos.slice(0, 20).map((repo) => (
                    <motion.a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="group block p-6 rounded-2xl glass border border-white/8 hover:border-emerald-500/30 transition-all card-hover">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <BookOpen size={14} className="text-emerald-400 shrink-0" />
                            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                              {repo.full_name}
                            </h3>
                          </div>
                          {repo.description && (
                            <p className="text-xs text-gray-400 leading-relaxed mt-1 line-clamp-2">{repo.description}</p>
                          )}
                        </div>
                        <ExternalLink size={14} className="text-gray-600 group-hover:text-emerald-400 transition-colors shrink-0 mt-1" />
                      </div>

                      <div className="flex items-center gap-4 text-[11px] text-gray-500">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
                            <span>{repo.language}</span>
                          </div>
                        )}
                        <span className="flex items-center gap-1">
                          <Star size={11} className="text-yellow-400/70" /> {formatCount(repo.stargazers_count)}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork size={11} /> {formatCount(repo.forks_count)}
                        </span>
                        <span className="flex items-center gap-1">
                          <AlertCircle size={11} /> {repo.open_issues_count} issues
                        </span>
                      </div>

                      {repo.topics && repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {repo.topics.slice(0, 4).map((topic) => (
                            <span key={topic}
                              className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {topic}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
