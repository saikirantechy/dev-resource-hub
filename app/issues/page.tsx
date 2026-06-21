"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Search,
  Bug,
  Sparkles,
  MessageSquare,
  Clock,
  Filter,
  ChevronDown,
  ExternalLink,
  Loader2,
  AlertCircle,
  Info,
  RotateCcw,
  Tag,
  RefreshCw,
} from "lucide-react";
import { searchIssues, getGoodFirstIssues, GitHubIssue } from "@/lib/github";

const LANGUAGES = ["", "javascript", "typescript", "python", "rust", "go", "java", "ruby", "cpp", "swift"];

const SORT_OPTIONS = ["updated", "created", "comments", "reactions"];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function getRepoFromUrl(url: string): string {
  const m = url.match(/repos\/([^\/]+\/[^\/]+)/);
  return m ? m[1] : "";
}

export default function IssuesPage() {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState<"updated" | "created" | "comments" | "reactions">("updated");
  const [issues, setIssues] = useState<GitHubIssue[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");
  const [explainerUrl, setExplainerUrl] = useState("");
  const [explainerResult, setExplainerResult] = useState<{ summary: string; difficulty: string; skills: string[]; time: string } | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const doSearch = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const q = query || "state:open";
      const result = await searchIssues({ q, language, difficulty, sort, page });
      setIssues(result.items);
      setTotalCount(result.total_count);
    } catch {
      setError("GitHub API rate limit exceeded or network error. Try again in a minute.");
      setIssues([]);
    } finally {
      setLoading(false);
    }
  }, [query, language, difficulty, sort]);

  const loadGoodFirstIssues = useCallback(async () => {
    setLoading(true);
    setError("");
    setSearched(true);
    setQuery("");
    setDifficulty("good-first-issue");
    try {
      const items = await getGoodFirstIssues(language);
      setIssues(items);
      setTotalCount(items.length);
    } catch {
      setError("Could not load issues. Try again.");
    } finally {
      setLoading(false);
    }
  }, [language]);

  const doSearchWithParams = useCallback(async (
    q: string, lang: string, diff: string, s: string
  ) => {
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      const result = await searchIssues({
        q: q || "state:open",
        language: lang || undefined,
        difficulty: diff || undefined,
        sort: s as "updated" | "created" | "comments" | "reactions",
      });
      setIssues(result.items);
      setTotalCount(result.total_count);
    } catch {
      setError("GitHub API rate limit exceeded or network error. Try again in a minute.");
      setIssues([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const qParam = params.get("q") || "";
    const langParam = params.get("language") || "";
    const diffParam = params.get("difficulty") || "";
    const sortParam = params.get("sort") as "updated" | "created" | "comments" | "reactions" | null;

    if (qParam || langParam || diffParam || sortParam) {
      Promise.resolve().then(() => {
        setQuery(qParam);
        setLanguage(langParam);
        setDifficulty(diffParam);
        if (sortParam) setSort(sortParam as "updated" | "created" | "comments" | "reactions");
        doSearchWithParams(qParam, langParam, diffParam, sortParam || "updated");
      });
    } else {
      Promise.resolve().then(() => {
        loadGoodFirstIssues();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const analyzeIssue = async () => {
    const m = explainerUrl.match(/github\.com\/([^\/]+)\/([^\/]+)\/issues\/(\d+)/);
    if (!m) {
      setExplainerResult({
        summary: "Please enter a valid GitHub issue URL (e.g., https://github.com/owner/repo/issues/123)",
        difficulty: "—",
        skills: [],
        time: "—",
      });
      return;
    }

    setExplainerResult({
      summary: "Analyzing issue... This is a placeholder. In production, this would use an LLM to analyze the issue body, comments, and code context to provide a detailed breakdown.",
      difficulty: "Beginner-Intermediate",
      skills: ["JavaScript", "React", "Git", "Problem Solving"],
      time: "2-4 hours",
    });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-12">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="badge badge-blue inline-flex"><Sparkles size={11} /> GitHub Issues Explorer</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Find Your <span className="gradient-text-hero">Next Issue</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Search millions of open-source issues. Filter by language, difficulty, and activity. Start contributing today.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && doSearch()}
                  placeholder="Search issues... (e.g., 'good first issue react' or leave empty)"
                  className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                />
              </div>
              <button onClick={() => doSearch()} disabled={loading}
                className="btn-primary px-8 py-4 rounded-2xl text-sm whitespace-nowrap">
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                Search
              </button>
            </div>

            {/* Filter Toggle */}
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-gray-300 transition-colors font-medium">
              <Filter size={14} /> Filters <ChevronDown size={14} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </button>

            {/* Filters */}
            {showFilters && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl glass border border-white/8">
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Language</label>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50">
                    <option value="">All Languages</option>
                    {LANGUAGES.filter(Boolean).map((l) => (
                      <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Difficulty</label>
                  <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50">
                    <option value="">All Difficulties</option>
                    <option value="good-first-issue">Good First Issue</option>
                    <option value="help-wanted">Help Wanted</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Sort By</label>
                  <select value={sort} onChange={(e) => setSort(e.target.value as "updated" | "created" | "comments" | "reactions")}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50">
                    {SORT_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={() => { setQuery(""); setLanguage(""); setDifficulty(""); setSort("updated"); }}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </motion.div>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button onClick={loadGoodFirstIssues} className="badge badge-emerald hover:scale-105 transition-transform cursor-pointer">
                <Sparkles size={10} /> Good First Issues
              </button>
              <button onClick={() => { setQuery("help wanted"); doSearch(); }} className="badge badge-orange hover:scale-105 transition-transform cursor-pointer">
                <AlertCircle size={10} /> Help Wanted
              </button>
              <button onClick={() => { setQuery("state:open"); setLanguage("javascript"); doSearch(); }} className="badge badge-blue hover:scale-105 transition-transform cursor-pointer">
                JavaScript
              </button>
              <button onClick={() => { setQuery("state:open"); setLanguage("python"); doSearch(); }} className="badge badge-blue hover:scale-105 transition-transform cursor-pointer">
                Python
              </button>
              <button onClick={() => { setQuery("state:open"); setLanguage("rust"); doSearch(); }} className="badge badge-purple hover:scale-105 transition-transform cursor-pointer">
                Rust
              </button>
              <button onClick={() => { setQuery("state:open"); setLanguage("typescript"); doSearch(); }} className="badge badge-blue hover:scale-105 transition-transform cursor-pointer">
                TypeScript
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin text-blue-400" />
              </div>
            ) : error ? (
              <div className="max-w-xl mx-auto text-center py-16 space-y-4">
                <AlertCircle size={40} className="mx-auto text-orange-400" />
                <p className="text-gray-400">{error}</p>
                <button onClick={() => doSearch()} className="btn-secondary px-6 py-3 rounded-xl text-sm">
                  <RefreshCw size={16} /> Retry
                </button>
              </div>
            ) : searched && issues.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <Info size={40} className="mx-auto text-gray-600" />
                <p className="text-gray-500">No issues found. Try a different search or filter.</p>
              </div>
            ) : (
              <>
                {searched && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">{totalCount.toLocaleString()} issues found</p>
                    <button onClick={() => doSearch()} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                      <RefreshCw size={12} /> Refresh
                    </button>
                  </div>
                )}

                <div className="space-y-3">
                  {issues.map((issue) => (
                    <motion.a key={issue.id} href={issue.html_url} target="_blank" rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="group block p-5 rounded-2xl glass border border-white/8 hover:border-blue-500/30 transition-all card-hover">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Bug size={14} className="text-blue-400 shrink-0" />
                            <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                              {issue.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-3 text-[11px] text-gray-500 flex-wrap">
                            <span className="text-gray-400 font-medium">
                              {issue.repoName || getRepoFromUrl(issue.repository_url)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Tag size={10} />
                              #{issue.number}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={10} />
                              {timeAgo(issue.updated_at)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare size={10} />
                              {issue.comments}
                            </span>
                          </div>
                          {issue.labels && issue.labels.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {issue.labels.slice(0, 5).map((label) => (
                                <span key={label.name}
                                  className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                                  style={{
                                    backgroundColor: `#${label.color}20` || "rgba(255,255,255,0.05)",
                                    color: `#${label.color}` || "#888",
                                    border: `1px solid #${label.color}40` || "1px solid rgba(255,255,255,0.1)",
                                  }}>
                                  {label.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          {issue.user && (
                            <img src={issue.user.avatar_url} alt={issue.user.login} className="w-7 h-7 rounded-full border border-white/10" />
                          )}
                          <ExternalLink size={14} className="text-gray-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* AI Issue Explainer */}
          <section className="pt-12 border-t border-white/5 space-y-8">
            <div className="text-center space-y-4">
              <div className="badge badge-purple inline-flex"><Sparkles size={11} /> AI Issue Explainer</div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">Analyze Any Issue</h2>
              <p className="text-gray-500 max-w-xl mx-auto">Paste a GitHub issue URL and get a summary, difficulty rating, skills needed, and estimated time.</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={explainerUrl}
                  onChange={(e) => setExplainerUrl(e.target.value)}
                  placeholder="https://github.com/owner/repo/issues/123"
                  className="flex-1 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-all text-sm font-mono"
                />
                <button onClick={analyzeIssue} className="btn-primary px-8 py-4 rounded-2xl text-sm whitespace-nowrap bg-gradient-to-r from-purple-600 to-blue-600">
                  <Sparkles size={16} /> Analyze
                </button>
              </div>

              {explainerResult && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl glass border border-purple-500/20 space-y-4">
                  <div className="text-sm text-gray-300 leading-relaxed">{explainerResult.summary}</div>
                  <div className="grid grid-cols-3 gap-4 pt-2 border-t border-white/5">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Difficulty</div>
                      <div className="text-sm font-bold text-white mt-1">{explainerResult.difficulty}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Est. Time</div>
                      <div className="text-sm font-bold text-white mt-1">{explainerResult.time}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Skills</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {explainerResult.skills.map((s) => (
                          <span key={s} className="badge badge-blue text-[8px]">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
