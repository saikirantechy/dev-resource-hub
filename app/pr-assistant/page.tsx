"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Sparkles, GitPullRequest,
  Code2, Shield, FileText, TrendingUp,
  Bug, CheckCircle, AlertTriangle, Info, X,
  Loader2, RefreshCw, Copy, BookOpen, Clock,
  MessageSquare, Zap, Target,
  Lightbulb, AlertCircle, GitBranch,
  BookmarkPlus, BookmarkCheck, History, Trash2, Key, Database,
} from "lucide-react";
import Link from "next/link";
import { type AnalysisType, type AnalysisResult, parseGitHubPR, generateAnalysis } from "@/lib/pr-assistant";
import { saveReview, loadReviews, deleteReview, type SavedReview } from "@/lib/pr-assistant-storage";
import { fetchRealPRData, generateAnalysisFromRealData, type RealPRData } from "@/lib/github-pr";

const API_ROUTE = "/dev-resource-hub/api/pr-assistant";

// ─── SEVERITY BADGE ───────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    critical: "bg-red-500/20 text-red-400 border-red-500/30",
    high: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    good: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "needs-improvement": "bg-amber-500/20 text-amber-400 border-amber-500/30",
    missing: "bg-red-500/20 text-red-400 border-red-500/30",
    added: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    modified: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    deleted: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  const colorKey = severity.toLowerCase();
  const colorClass = colors[colorKey] || colors.info;
  const label = severity.charAt(0).toUpperCase() + severity.slice(1).replace("-", " ");

  return (
    <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border ${colorClass}`}>
      {label}
    </span>
  );
}

// ─── ANALYSIS TAB ─────────────────────────────────────────────────────

const analysisTabs: { id: AnalysisType; label: string; icon: React.ElementType; color: string }[] = [
  { id: "summary", label: "Summary", icon: FileText, color: "from-blue-500 to-cyan-500" },
  { id: "code-review", label: "Code Review", icon: Code2, color: "from-purple-500 to-pink-500" },
  { id: "security", label: "Security", icon: Shield, color: "from-red-500 to-orange-500" },
  { id: "docs", label: "Documentation", icon: BookOpen, color: "from-emerald-500 to-teal-500" },
  { id: "improvements", label: "Improvements", icon: TrendingUp, color: "from-amber-500 to-yellow-500" },
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────

export default function PRAssistantPage() {
  const [prUrl, setPrUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [activeTab, setActiveTab] = useState<AnalysisType>("summary");
  const [repoName, setRepoName] = useState("");
  const [prNumber, setPrNumber] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedReviews, setSavedReviews] = useState<SavedReview[]>([]);
  const [showSavedReviews, setShowSavedReviews] = useState(false);
  const [githubToken, setGithubToken] = useState("");
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [dataSource, setDataSource] = useState<"mock" | "live" | "error">("mock");
  const [apiRouteAvailable, setApiRouteAvailable] = useState(false);

  useEffect(() => {
    setSavedReviews(loadReviews());
    // Check if server-side API route is available (skipped on static export)
    fetch(API_ROUTE, { method: "OPTIONS" })
      .then(() => setApiRouteAvailable(true))
      .catch(() => setApiRouteAvailable(false));
  }, []);

  const handleSaveReview = () => {
    if (!result || !prUrl) return;
    const parsed = parseGitHubPR(prUrl);
    if (!parsed.isValid) return;
    const review = saveReview(prUrl, parsed, result);
    setSaved(true);
    setSavedReviews(loadReviews());
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLoadReview = (review: SavedReview) => {
    setPrUrl(review.prUrl);
    setRepoName(review.repoName);
    setPrNumber(review.prNumber);
    setResult(review.result);
    setActiveTab("summary");
    setShowSavedReviews(false);
  };

  const handleDeleteReview = (id: string) => {
    deleteReview(id);
    setSavedReviews(loadReviews());
  };

  const handleAnalyze = async () => {
    setError("");
    const parsed = parseGitHubPR(prUrl);
    if (!parsed.isValid) {
      setError("Please enter a valid GitHub PR URL (e.g., https://github.com/owner/repo/pull/123)");
      return;
    }

    setRepoName(parsed.repoName);
    setPrNumber(parsed.prNumber);
    setAnalyzing(true);
    setResult(null);
    setDataSource("mock");

    let realData: RealPRData | null = null;
    let realError: string | null = null;
    let viaApiRoute = false;

    // Try server-side API route first (keeps token off client)
    if (apiRouteAvailable) {
      try {
        const res = await fetch(API_ROUTE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prUrl, token: githubToken || undefined }),
        });
        if (res.ok) {
          const data = await res.json();
          viaApiRoute = true;
          setResult(data.result);
          setDataSource(data.dataSource);
          if (data.error) realError = data.error;
        }
      } catch {
        // API route unavailable, fall through
      }
    }

    // Fall back to direct client-side GitHub API fetch
    if (!viaApiRoute) {
      try {
        realData = await fetchRealPRData(prUrl, githubToken || undefined);
      } catch (e) {
        realError = e instanceof Error ? e.message : "Unknown error";
      }

      if (realData) {
        const analysis = generateAnalysisFromRealData(realData, parsed.repoName);
        setResult(analysis);
        setDataSource("live");
      } else {
        const analysis = generateAnalysis(prUrl, parsed.repoName, parsed.prNumber);
        setResult(analysis);
        setDataSource("mock");
        if (realError) {
          setError(realError);
        }
      }
    }

    setAnalyzing(false);
    setActiveTab("summary");
  };

  const resetAnalysis = () => {
    setPrUrl("");
    setResult(null);
    setAnalyzing(false);
    setError("");
    setRepoName("");
    setPrNumber("");
    setActiveTab("summary");
  };

  const copyResults = () => {
    if (!result) return;
    const text = `# PR Analysis: ${repoName}#${prNumber}\n\n${result.summary}\n\n---\n\nGenerated by Dev Resource Hub AI PR Assistant`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getRiskColor = (risk: string) => {
    if (risk === "low") return "text-emerald-400";
    if (risk === "medium") return "text-amber-400";
    return "text-red-400";
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
          {/* ─── HERO ─── */}
          <div className="text-center space-y-6">
            <div className="badge badge-purple inline-flex">
              <GitPullRequest size={11} /> AI PR Assistant
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              AI Pull Request <span className="gradient-text-hero">Reviewer</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              Paste any GitHub pull request URL and get an instant AI-powered analysis — summary, code review, security audit,
              documentation check, and improvement suggestions.
            </p>
          </div>

          {/* ─── INPUT SECTION ─── */}
          <section className="max-w-3xl mx-auto">
            <div className="p-8 rounded-[2rem] glass border border-white/10 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[80px] rounded-full" />

              <div className="relative z-10 space-y-6">
                {!result ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 flex items-center gap-2">
                        <GitBranch size={14} /> GitHub Pull Request URL
                      </label>
                      <div className="flex gap-3">
                        <div className="flex-1 relative">
                          <GitPullRequest size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                          <input
                            type="text"
                            value={prUrl}
                            onChange={(e) => setPrUrl(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                            placeholder="https://github.com/owner/repo/pull/123"
                            className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-all text-sm font-mono"
                            disabled={analyzing}
                          />
                        </div>
                        <button onClick={handleAnalyze} disabled={!prUrl || analyzing}
                          className={`btn-primary px-8 py-4 rounded-2xl text-sm whitespace-nowrap ${(!prUrl || analyzing) ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          {analyzing ? (
                            <><Loader2 size={18} className="animate-spin" /> Analyzing</>
                          ) : (
                            <><Sparkles size={18} /> Analyze PR</>
                          )}
                        </button>
                      </div>
                      {error && (
                        <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-400 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} /> {error}
                        </motion.p>
                      )}
                    </div>

                    {/* Examples */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                      <span>Try an example:</span>
                      {[
                        "https://github.com/facebook/react/pull/28758",
                        "https://github.com/vercel/next.js/pull/65432",
                        "https://github.com/shadcn-ui/ui/pull/3456",
                      ].map((ex) => (
                        <button key={ex} onClick={() => setPrUrl(ex)}
                          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all text-[10px] font-mono">
                          example #{ex.match(/pull\/(\d+)/)?.[1]}
                        </button>
                      ))}
                    </div>

                    {/* Feature badges */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="badge badge-emerald text-[8px]"><Zap size={7} /> 5 Analysis Types</span>
                      <span className="badge badge-blue text-[8px]"><Shield size={7} /> Security Audit</span>
                      <span className="badge badge-amber text-[8px]"><Target size={7} /> Actionable Insights</span>
                      <span className="badge badge-blue text-[8px]"><GitBranch size={7} /> GitHub API</span>
                    </div>

                    {/* GitHub Token Toggle */}
                    <div className="pt-1">
                      <button onClick={() => setShowTokenInput(!showTokenInput)}
                        className="flex items-center gap-1.5 text-[10px] text-gray-500 hover:text-gray-300 transition-all">
                        <Key size={10} />
                        {showTokenInput ? "Hide" : "Add"} GitHub Token <span className="text-gray-600">(optional, higher rate limits)</span>
                      </button>
                      {showTokenInput && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                          className="mt-2 overflow-hidden">
                          <input
                            type="password"
                            value={githubToken}
                            onChange={(e) => setGithubToken(e.target.value)}
                            placeholder="ghp_... or github_pat_..."
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-all text-xs font-mono"
                          />
                          <p className="text-[9px] text-gray-600 mt-1.5">
                            Token is stored only in memory and used for this session. Create one at{' '}
                            <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 underline">
                              github.com/settings/tokens
                            </a>{" "}(no scopes needed for public repos).
                          </p>
                        </motion.div>
                      )}
                    </div>

                    {/* Saved Reviews Button */}
                    {savedReviews.length > 0 && (
                      <div className="pt-2 border-t border-white/5">
                        <button onClick={() => setShowSavedReviews(!showSavedReviews)}
                          className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-all">
                          <History size={12} />
                          {showSavedReviews ? "Hide" : "View"} Saved Reviews ({savedReviews.length})
                        </button>

                        <AnimatePresence>
                          {showSavedReviews && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              className="mt-3 space-y-2 overflow-hidden">
                              {savedReviews.map((review) => (
                                <div key={review.id}
                                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all group">
                                  <div className="flex-1 min-w-0">
                                    <button onClick={() => handleLoadReview(review)}
                                      className="text-xs text-left text-gray-300 hover:text-white font-bold truncate block w-full">
                                      {review.repoName} — PR #{review.prNumber}
                                    </button>
                                    <p className="text-[9px] text-gray-500 mt-0.5">
                                      {new Date(review.savedAt).toLocaleDateString()}
                                    </p>
                                  </div>
                                  <button onClick={() => handleDeleteReview(review.id)}
                                    className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all shrink-0">
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </>
                ) : (
                  /* ─── POST-ANALYSIS ─── */
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                        <CheckCircle size={22} className="text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white flex items-center gap-2">
                          Analysis Complete
                          <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border ${
                            dataSource === "live"
                              ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                          }`}>
                            {dataSource === "live" ? <><Database size={7} /> Live</> : <><Sparkles size={7} /> Simulated</>}
                          </span>
                        </h3>
                        <p className="text-xs text-gray-400">
                          <span className="text-emerald-400">{repoName}</span> — PR #{prNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={handleSaveReview}
                        className={`p-3 rounded-xl border transition-all ${saved ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'}`}
                        title={saved ? "Saved!" : "Save Review"}>
                        {saved ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                      </button>
                      <button onClick={copyResults}
                        className="p-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">
                        {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                      <button onClick={resetAnalysis}
                        className="p-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ─── LOADING STATE ─── */}
          {analyzing && (
            <section className="max-w-3xl mx-auto">
              <div className="p-8 rounded-[2rem] glass border border-purple-500/20 overflow-hidden">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Loader2 size={24} className="animate-spin text-purple-400" />
                    <div>
                      <h3 className="font-bold text-white">Analyzing Pull Request</h3>
                      <p className="text-xs text-gray-500">
                        {githubToken ? "Fetching real data from GitHub API" : "Generating simulated analysis"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {[
                      githubToken ? "Connecting to GitHub API..." : "Parsing PR URL...",
                      githubToken ? "Fetching PR details..." : "Analyzing code structure...",
                      githubToken ? "Getting changed files..." : "Running security scan...",
                      githubToken ? "Loading commit history..." : "Checking documentation...",
                      "Generating analysis report...",
                    ].map((step, i) => (
                      <motion.div key={step} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }}
                        className="flex items-center gap-2 text-xs text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full ${i <= 2 ? 'bg-purple-400 animate-pulse' : 'bg-gray-600'}`} />
                        {step}
                      </motion.div>
                    ))}
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, ease: "easeInOut" }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
                  </div>
                  {!githubToken && (
                    <p className="text-[9px] text-gray-600 text-center">
                      Add a GitHub token for live data.{' '}
                      <button onClick={() => setShowTokenInput(true)} className="text-blue-400 hover:text-blue-300 underline">
                        Configure
                      </button>
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ─── RESULTS ─── */}
          <AnimatePresence>
            {result && (
              <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto space-y-8">
                {/* Stats Bar */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { label: "Files Changed", value: result.stats.totalFiles.toString(), icon: Code2, color: "text-blue-400" },
                    { label: "Lines Added", value: `+${result.stats.linesAdded}`, icon: TrendingUp, color: "text-emerald-400" },
                    { label: "Risk Level", value: result.stats.riskLevel.toUpperCase(), icon: Shield, color: getRiskColor(result.stats.riskLevel) },
                    { label: "Review Time", value: result.stats.estimatedReviewTime, icon: Clock, color: "text-amber-400" },
                    { label: "Comments", value: result.stats.commentsCount.toString(), icon: MessageSquare, color: "text-purple-400" },
                  ].map((stat, i) => (
                    <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      className="p-4 rounded-xl glass border border-white/8 text-center">
                      <stat.icon size={16} className={`mx-auto mb-1 ${stat.color}`} />
                      <div className={`text-lg font-black ${stat.label === "Risk Level" ? getRiskColor(result.stats.riskLevel) : 'text-white'}`}>
                        {stat.value}
                      </div>
                      <div className="text-[8px] text-gray-500 font-bold uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Files Changed */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl glass border border-white/8">
                  <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <Code2 size={14} className="text-blue-400" /> Changed Files
                  </h3>
                  <div className="space-y-2">
                    {result.changes.map((file) => (
                      <div key={file.file} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className={`w-2 h-2 rounded-full ${
                            file.status === "added" ? "bg-emerald-400" :
                            file.status === "modified" ? "bg-blue-400" : "bg-red-400"
                          }`} />
                          <span className="text-xs text-gray-300 font-mono truncate">{file.file}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <SeverityBadge severity={file.status} />
                          <span className="text-[10px] text-gray-500">+{file.lines} lines</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/5 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" /> Added</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> Modified</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> Deleted</span>
                  </div>
                </motion.div>

                {/* Analysis Tabs */}
                <div className="flex flex-wrap gap-2">
                  {analysisTabs.map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all ${
                        activeTab === tab.id
                          ? "bg-white/10 text-white border border-white/20"
                          : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                      }`}>
                      <tab.icon size={14} />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Summary Tab */}
                {activeTab === "summary" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="p-8 rounded-2xl glass border border-white/8">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <FileText size={16} className="text-blue-400" /> Summary
                    </h3>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{result.summary}</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <h4 className="text-xs font-bold text-white mb-3">Tech Stack Detected</h4>
                      <div className="flex flex-wrap gap-2">
                        {result.techStack.map((tech) => (
                          <span key={tech} className="badge badge-blue text-[8px]">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-500">
                      <Info size={10} /> Analysis based on PR metadata, diff structure, and code patterns
                    </div>
                  </motion.div>
                )}

                {/* Code Review Tab */}
                {activeTab === "code-review" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Code2 size={16} className="text-purple-400" /> Code Review
                    </h3>
                    {result.codeReview.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                        className="p-5 rounded-2xl glass border border-white/8 hover:border-white/20 transition-all">
                        <div className="flex items-start gap-4">
                          <div className={`mt-0.5 ${
                            item.severity === "critical" ? "text-red-400" :
                            item.severity === "warning" ? "text-amber-400" : "text-blue-400"
                          }`}>
                            {item.severity === "critical" ? <AlertCircle size={16} /> :
                             item.severity === "warning" ? <AlertTriangle size={16} /> : <Info size={16} />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <SeverityBadge severity={item.severity} />
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{item.category}</span>
                            </div>
                            <p className="text-sm text-gray-200 mb-2">{item.message}</p>
                            <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                              <p className="text-[11px] text-blue-300"><span className="font-bold">Suggestion:</span> {item.suggestion}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Shield size={16} className="text-red-400" /> Security Audit
                    </h3>
                    {result.security.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                        className={`p-5 rounded-2xl glass border transition-all ${
                          item.severity === "critical" ? "border-red-500/30 hover:border-red-500/50" :
                          item.severity === "high" ? "border-orange-500/20 hover:border-orange-500/40" :
                          "border-white/8 hover:border-white/20"
                        }`}>
                        <div className="flex items-start gap-4">
                          <div className={`mt-0.5 ${
                            item.severity === "critical" ? "text-red-400" :
                            item.severity === "high" ? "text-orange-400" :
                            item.severity === "medium" ? "text-amber-400" : "text-blue-400"
                          }`}>
                            {item.severity === "critical" || item.severity === "high" ? <AlertCircle size={16} /> : <Info size={16} />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <SeverityBadge severity={item.severity} />
                            </div>
                            <h4 className="text-sm font-bold text-white mb-1">{item.issue}</h4>
                            <p className="text-xs text-gray-400 mb-2"><span className="font-bold text-gray-300">Impact:</span> {item.impact}</p>
                            <div className={`p-3 rounded-xl border ${
                              item.severity === "critical" ? "bg-red-500/5 border-red-500/10" :
                              "bg-blue-500/5 border-blue-500/10"
                            }`}>
                              <p className={`text-[11px] ${item.severity === "critical" ? 'text-red-300' : 'text-blue-300'}`}>
                                <span className="font-bold">Recommendation:</span> {item.recommendation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Docs Tab */}
                {activeTab === "docs" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <BookOpen size={16} className="text-emerald-400" /> Documentation Review
                    </h3>
                    {result.docs.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                        className="p-5 rounded-2xl glass border border-white/8 hover:border-white/20 transition-all">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <SeverityBadge severity={item.status} />
                              <span className="text-xs font-bold text-white">{item.section}</span>
                            </div>
                            <p className="text-sm text-gray-400">{item.details}</p>
                          </div>
                          <div className={`shrink-0 ${
                            item.status === "good" ? "text-emerald-400" :
                            item.status === "needs-improvement" ? "text-amber-400" : "text-red-400"
                          }`}>
                            {item.status === "good" ? <CheckCircle size={16} /> :
                             item.status === "needs-improvement" ? <AlertTriangle size={16} /> : <X size={16} />}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <div className="flex items-center gap-4 text-[10px] text-gray-500 pt-2">
                      <span className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-400" /> Good</span>
                      <span className="flex items-center gap-1"><AlertTriangle size={10} className="text-amber-400" /> Needs Improvement</span>
                      <span className="flex items-center gap-1"><X size={10} className="text-red-400" /> Missing</span>
                    </div>
                  </motion.div>
                )}

                {/* Improvements Tab */}
                {activeTab === "improvements" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <TrendingUp size={16} className="text-amber-400" /> Improvement Suggestions
                    </h3>
                    {result.improvements.map((item, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                        className="p-5 rounded-2xl glass border border-white/8 hover:border-white/20 transition-all">
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                            item.priority === "high" ? "bg-red-500/20" :
                            item.priority === "medium" ? "bg-amber-500/20" : "bg-blue-500/20"
                          }`}>
                            <Lightbulb size={14} className={
                              item.priority === "high" ? "text-red-400" :
                              item.priority === "medium" ? "text-amber-400" : "text-blue-400"
                            } />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-white">{item.area}</span>
                              <SeverityBadge severity={item.priority === "high" ? "high" : item.priority === "medium" ? "medium" : "low"} />
                              <span className="text-[9px] text-gray-500">{item.effort}</span>
                            </div>
                            <p className="text-sm text-gray-400">{item.suggestion}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <button onClick={resetAnalysis}
                    className="btn-secondary px-8 py-4 rounded-xl">
                    <RefreshCw size={16} /> Analyze Another PR
                  </button>
                  <button onClick={copyResults}
                    className="btn-secondary px-8 py-4 rounded-xl">
                    <Copy size={16} /> {copied ? "Copied!" : "Copy Report"}
                  </button>
                  <Link href="/issues"
                    className="btn-secondary px-8 py-4 rounded-xl">
                    <Bug size={16} /> Find Issues to Fix
                  </Link>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
