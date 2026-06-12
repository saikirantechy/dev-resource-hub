"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Search, Globe, Lock, AlertTriangle, Bot,
  Code2, FileText, BarChart3, Fingerprint,
  CheckCircle2, XCircle, AlertCircle,
  Star, Hash, Github,
  Zap, Siren, ShoppingCart, Link2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  analyzeTrust, analyzeGitHubRepo, analyzeAiTool,
  analyzeFakeStoreRisk, analyzePhishingRisk, analyzeSSL,
  analyzeSecurityHeaders, detectTechnologies, analyzeSEO,
  analyzeURL, extractDomain,
  getRiskColor, getRiskBg, getSSLColor,
} from "@/lib/security";
import type {
  TrustCheckResult, GitHubRepoResult, AiToolResult,
  FakeStoreResult, PhishingResult, SslInfo,
  SecurityHeaders, TechDetectResult, SeoResult, UrlAnalysis,
} from "@/lib/security";

type ToolTab = "trust" | "github" | "ai" | "phishing" | "ssl" | "headers" | "tech" | "seo" | "url" | "fakestore";

interface ToolDef {
  id: ToolTab; label: string; icon: any; color: string; desc: string;
}

const TOOLS: ToolDef[] = [
  { id: "trust", label: "Website Trust", icon: Shield, color: "from-blue-500 to-cyan-500", desc: "Check any URL for trust score, risk level, and security summary" },
  { id: "github", label: "GitHub Repo", icon: Github, color: "from-gray-500 to-gray-300", desc: "Analyze GitHub repositories for trustworthiness" },
  { id: "ai", label: "AI Tool Trust", icon: Bot, color: "from-purple-500 to-pink-500", desc: "Evaluate AI tools for transparency and legitimacy" },
  { id: "ssl", label: "SSL Analyzer", icon: Lock, color: "from-emerald-500 to-teal-500", desc: "Check SSL certificate validity and grade" },
  { id: "headers", label: "Security Headers", icon: FileText, color: "from-orange-500 to-amber-500", desc: "Scan HTTP security headers posture" },
  { id: "phishing", label: "Phishing Detection", icon: Siren, color: "from-red-500 to-rose-500", desc: "Detect phishing attempts and lookalike domains" },
  { id: "fakestore", label: "Fake Store Detector", icon: ShoppingCart, color: "from-pink-500 to-red-500", desc: "Identify potentially fraudulent online stores" },
  { id: "tech", label: "Tech Detector", icon: Code2, color: "from-indigo-500 to-blue-500", desc: "Detect frameworks, CMS, and hosting providers" },
  { id: "seo", label: "SEO Analyzer", icon: BarChart3, color: "from-yellow-500 to-orange-500", desc: "Analyze SEO fundamentals and meta tags" },
  { id: "url", label: "URL Analyzer", icon: Link2, color: "from-cyan-500 to-blue-500", desc: "Expand, check redirects, and validate URLs" },
];

export default function SecurityCenterPage() {
  const [activeTool, setActiveTool] = useState<ToolTab>("trust");

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="px-4 sm:px-6 pt-24 pb-16 relative z-10">
            <div className="max-w-7xl mx-auto text-center space-y-6">
              <div className="badge badge-red inline-flex">
                <Shield size={11} /> Security & Trust Center
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-hero">Trust</span> at Every Layer
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Analyze websites, domains, AI tools, GitHub repos, and online services before you use them.
              </p>
              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">100% Free</span>
                <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">Client-Side</span>
                <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold">No Sign Up</span>
                <span className="px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">Open Source</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Tabs */}
        <section className="px-4 sm:px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-8">
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id)}
                  className={"flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all " + (
                    activeTool === tool.id
                      ? "bg-white/10 border border-white/20 text-white"
                      : "bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/8"
                  )}
                >
                  <tool.icon size={14} />
                  {tool.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTool === "trust" && <WebsiteTrustChecker />}
                {activeTool === "github" && <GitHubRepoChecker />}
                {activeTool === "ai" && <AiToolChecker />}
                {activeTool === "ssl" && <SSLViewer />}
                {activeTool === "headers" && <HeaderViewer />}
                {activeTool === "phishing" && <PhishingViewer />}
                {activeTool === "fakestore" && <FakeStoreViewer />}
                {activeTool === "tech" && <TechViewer />}
                {activeTool === "seo" && <SEOViewer />}
                {activeTool === "url" && <URLViewer />}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Stats Footer */}
        <section className="px-4 sm:px-6 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "Tools Available", value: "10", color: "text-blue-400" },
                { icon: CheckCircle2, label: "Free Checks", value: "Unlimited", color: "text-emerald-400" },
                { icon: Github, label: "GitHub Analyzed", value: "10M+", color: "text-gray-300" },
                { icon: Zap, label: "Powered By", value: "Client-Side", color: "text-yellow-400" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-strong rounded-2xl p-5 border border-white/5 text-center"
                >
                  <stat.icon size={20} className={"mx-auto mb-2 " + stat.color} />
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ─── Shared Components ─────────────────────────────────────────────────

function UrlInput({ value, onChange, onAnalyze, placeholder, loading, label }: {
  value: string; onChange: (v: string) => void; onAnalyze: () => void;
  placeholder: string; loading: boolean; label: string;
}) {
  return (
    <div className="glass-strong rounded-2xl p-5 border border-white/5 mb-6">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">{label}</label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAnalyze()}
            placeholder={placeholder}
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
            aria-label={label}
          />
        </div>
        <button
          onClick={onAnalyze}
          disabled={loading || !value.trim()}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-500 text-white text-xs font-bold transition-all flex items-center gap-1.5"
        >
          {loading ? <span className="animate-spin inline-block">&#x21bb;</span> : <Zap size={14} />}
          Analyze
        </button>
      </div>
    </div>
  );
}

function ScoreGauge({ score, label, color }: { score: number; label: string; color?: string }) {
  const hue = score >= 80 ? 160 : score >= 60 ? 140 : score >= 40 ? 50 : score >= 20 ? 30 : 0;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/5" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={"hsl(" + hue + ", 70%, 50%)"} strokeWidth="3" strokeDasharray={score + ", 100"} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={"text-lg font-black " + (color || "text-white")}>{score}</span>
        </div>
      </div>
      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function BadgeItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="glass rounded-xl p-3 border border-white/5 text-center">
      <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">{label}</div>
      <div className={"text-sm font-bold " + color}>{value}</div>
    </div>
  );
}

// ─── Website Trust Checker ──────────────────────────────────────────────

function WebsiteTrustChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<TrustCheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setResult(await analyzeTrust(url));
    setLoading(false);
  }, [url]);

  return (
    <div>
      <UrlInput value={url} onChange={setUrl} onAnalyze={analyze} placeholder="https://example.com" loading={loading} label="Enter URL or Domain" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className={"glass-strong rounded-2xl p-6 border " + getRiskBg(result.riskLevel)}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={result.trustScore} label="Trust Score" color={getRiskColor(result.riskLevel)} />
                <div className="flex-1 text-center md:text-left">
                  <div className={"inline-flex px-3 py-1 rounded-full text-xs font-bold border " + getRiskBg(result.riskLevel) + " " + getRiskColor(result.riskLevel) + " mb-2"}>
                    {result.riskLevel}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{result.domain}</h3>
                  <p className="text-sm text-gray-400">{result.summary}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.checks.map((check) => (
                <div key={check.name} className="glass rounded-xl p-4 border border-white/5 flex items-start gap-3">
                  {check.status === "pass"
                    ? <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    : check.status === "warn"
                    ? <AlertCircle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                    : <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{check.name}</span>
                      <span className={"text-[10px] font-bold px-1.5 py-0.5 rounded " + (
                        check.status === "pass" ? "bg-emerald-500/20 text-emerald-400"
                        : check.status === "warn" ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                      )}>{check.score}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{check.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && (
        <div className="text-center py-16 text-gray-600">
          <Shield size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Enter a URL and click Analyze to check its trustworthiness</p>
        </div>
      )}
    </div>
  );
}

// ─── GitHub Repo Checker ───────────────────────────────────────────────

function GitHubRepoChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<GitHubRepoResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const res = await analyzeGitHubRepo(url);
      if (!res) { setError("Invalid GitHub URL or repository not found"); return; }
      setResult(res);
    } catch { setError("Failed to analyze repository"); }
    setLoading(false);
  }, [url]);

  return (
    <div>
      <UrlInput value={url} onChange={setUrl} onAnalyze={analyze} placeholder="https://github.com/owner/repo" loading={loading} label="GitHub Repository URL" />
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={"glass-strong rounded-2xl p-6 border " + getRiskBg(result.riskLevel)}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={result.trustScore} label="Repo Trust" color={getRiskColor(result.riskLevel)} />
                <div className="flex-1 text-center md:text-left">
                  <div className={"inline-flex px-3 py-1 rounded-full text-xs font-bold border " + getRiskBg(result.riskLevel) + " " + getRiskColor(result.riskLevel) + " mb-2"}>
                    {result.riskLevel}
                  </div>
                  <h3 className="text-lg font-bold text-white">{result.owner}/{result.repo}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400" /> {result.stars.toLocaleString()}</span>
                    <span className="flex items-center gap-1">· {result.forks.toLocaleString()}</span>
                    <span className="flex items-center gap-1">· {result.contributors}</span>
                    <span className="flex items-center gap-1">· {result.openIssues}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <BadgeItem label="License" value={result.license} color="text-blue-400" />
              <BadgeItem label="Last Commit" value={result.lastCommit.split("T")[0]} color="text-gray-400" />
              <BadgeItem label="Security Policy" value={result.hasSecurityPolicy ? "Yes" : "No"} color={result.hasSecurityPolicy ? "text-emerald-400" : "text-red-400"} />
              <BadgeItem label="Dependabot" value={result.hasDependabot ? "Enabled" : "N/A"} color={result.hasDependabot ? "text-emerald-400" : "text-gray-500"} />
            </div>
            {result.topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {result.topics.map((t) => <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 border border-blue-500/20 text-blue-400">{t}</span>)}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && !error && (
        <div className="text-center py-16 text-gray-600">
          <Github size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Paste a GitHub repo URL to analyze its trust score</p>
        </div>
      )}
    </div>
  );
}

// ─── AI Tool Checker ───────────────────────────────────────────────────

function AiToolChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<AiToolResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(() => {
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeAiTool(url));
      setLoading(false);
    }, 500);
  }, [url]);

  return (
    <div>
      <UrlInput value={url} onChange={setUrl} onAnalyze={analyze} placeholder="https://example-ai-tool.com" loading={loading} label="AI Tool URL" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={"glass-strong rounded-2xl p-6 border " + getRiskBg(result.trustRating === "Verified" ? "Safe" : result.trustRating === "Trusted" ? "Low Risk" : result.trustRating === "Caution" ? "Medium Risk" : "High Risk")}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={result.trustScore} label="AI Trust" color={getRiskColor(result.trustRating === "Verified" ? "Safe" : result.trustRating === "Trusted" ? "Low Risk" : result.trustRating === "Caution" ? "Medium Risk" : "High Risk")} />
                <div className="flex-1 text-center md:text-left">
                  <div className={"inline-flex px-3 py-1 rounded-full text-xs font-bold border mb-2 " + (
                    result.trustRating === "Verified" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : result.trustRating === "Trusted" ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                    : result.trustRating === "Caution" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                  )}>
                    {result.trustRating}
                  </div>
                  <h3 className="text-lg font-bold text-white">{result.name}</h3>
                  <p className="text-xs text-gray-400 break-all">{result.url}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <BadgeItem label="Company Info" value={result.hasCompany ? "Available" : "Hidden"} color={result.hasCompany ? "text-emerald-400" : "text-red-400"} />
              <BadgeItem label="Pricing" value={result.hasPricing ? "Transparent" : "Hidden"} color={result.hasPricing ? "text-emerald-400" : "text-yellow-400"} />
              <BadgeItem label="Terms of Service" value={result.hasTerms ? "Found" : "Missing"} color={result.hasTerms ? "text-emerald-400" : "text-red-400"} />
              <BadgeItem label="Domain Age" value={result.domainAge} color="text-blue-400" />
            </div>
            <div className="glass rounded-xl p-4 border border-white/5">
              <div className="flex items-start gap-2">
                <Bot size={16} className="text-purple-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-400">{result.analysis}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && (
        <div className="text-center py-16 text-gray-600">
          <Bot size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Enter an AI tool URL to verify its trust rating</p>
        </div>
      )}
    </div>
  );
}

// ─── SSL Analyzer ──────────────────────────────────────────────────────

function SSLViewer() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<SslInfo | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(() => {
    if (!domain.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeSSL(extractDomain(domain)));
      setLoading(false);
    }, 400);
  }, [domain]);

  return (
    <div>
      <UrlInput value={domain} onChange={setDomain} onAnalyze={analyze} placeholder="example.com" loading={loading} label="Domain" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="glass-strong rounded-2xl p-6 border border-white/5">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className={"w-20 h-20 rounded-full border-4 flex items-center justify-center " + (
                    result.grade.startsWith("A") ? "border-emerald-500 bg-emerald-500/10"
                    : result.grade.startsWith("B") ? "border-blue-500 bg-blue-500/10"
                    : result.grade.startsWith("C") ? "border-yellow-500 bg-yellow-500/10"
                    : "border-red-500 bg-red-500/10"
                  )}>
                    <span className={"text-3xl font-black " + getSSLColor(result.grade)}>{result.grade}</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock size={16} className={result.enabled ? "text-emerald-400" : "text-red-400"} />
                    <span className="text-sm font-bold text-white">{result.enabled ? "HTTPS Enabled" : "HTTPS Not Detected"}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-400">
                    <span>Issuer: <span className="text-white">{result.issuer}</span></span>
                    <span>Expires: <span className="text-white">{result.expiresAt}</span></span>
                    <span>Score: <span className="text-white">{result.score}/100</span></span>
                    <span>Valid: <span className={result.valid ? "text-emerald-400" : "text-red-400"}>{result.valid ? "Yes" : "No"}</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <Fingerprint size={14} className="text-gray-400" />
                <span className="text-xs font-bold text-gray-400 uppercase">SSL Certificate Info</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Grade: <span className={"font-bold " + getSSLColor(result.grade)}>{result.grade}</span></span>
                <span>Score: <span className="font-bold text-white">{result.score}/100</span></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && (
        <div className="text-center py-16 text-gray-600">
          <Lock size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Check SSL certificate validity and grade for any domain</p>
        </div>
      )}
    </div>
  );
}

// ─── Security Headers Scanner ──────────────────────────────────────────

function HeaderViewer() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<SecurityHeaders | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(() => {
    if (!domain.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeSecurityHeaders(extractDomain(domain)));
      setLoading(false);
    }, 300);
  }, [domain]);

  const headerEntries = result ? Object.entries(result).filter(([k]) => k !== "score") : [];

  return (
    <div>
      <UrlInput value={domain} onChange={setDomain} onAnalyze={analyze} placeholder="example.com" loading={loading} label="Domain" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="glass-strong rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-6">
                <ScoreGauge score={result.score} label="Header Score" color={result.score >= 75 ? "text-emerald-400" : result.score >= 40 ? "text-yellow-400" : "text-red-400"} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={16} className="text-blue-400" />
                    <span className="text-sm font-bold text-white">Security Headers</span>
                  </div>
                  <div className="text-xs text-gray-500">{result.score}/100 &mdash; {result.score >= 75 ? "Good security posture" : result.score >= 40 ? "Some headers missing" : "Poor header configuration"}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {headerEntries.map(([key, val]) => (
                <div key={key} className="glass rounded-xl p-4 border border-white/5 flex items-start gap-3">
                  {val ? <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" /> : <XCircle size={14} className="text-red-400 mt-0.5 shrink-0" />}
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white mb-0.5">{key}</div>
                    <code className="text-[10px] text-gray-500 break-all">{val || "Not set"}</code>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && (
        <div className="text-center py-16 text-gray-600">
          <FileText size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Scan HTTP security headers for any domain</p>
        </div>
      )}
    </div>
  );
}

// ─── Phishing Detection ────────────────────────────────────────────────

function PhishingViewer() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<PhishingResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(() => {
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzePhishingRisk(extractDomain(url), url));
      setLoading(false);
    }, 400);
  }, [url]);

  return (
    <div>
      <UrlInput value={url} onChange={setUrl} onAnalyze={analyze} placeholder="https://suspicious-link.com" loading={loading} label="URL to Check" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={"glass-strong rounded-2xl p-6 border " + (
              result.riskLevel === "Critical" ? "bg-red-500/10 border-red-500/30"
              : result.riskLevel === "High" ? "bg-orange-500/10 border-orange-500/30"
              : result.riskLevel === "Medium" ? "bg-yellow-500/10 border-yellow-500/30"
              : "bg-emerald-500/10 border-emerald-500/30"
            )}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={100 - result.probability} label="Safe Score" color={
                  result.riskLevel === "Critical" ? "text-red-400"
                  : result.riskLevel === "High" ? "text-orange-400"
                  : result.riskLevel === "Medium" ? "text-yellow-400"
                  : "text-emerald-400"
                } />
                <div className="flex-1 text-center md:text-left">
                  <div className={"inline-flex px-3 py-1 rounded-full text-xs font-bold border mb-2 " + (
                    result.riskLevel === "Critical" ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : result.riskLevel === "High" ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                    : result.riskLevel === "Medium" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  )}>{result.riskLevel} Risk</div>
                  <h3 className="text-lg font-bold text-white">Phishing Risk: {result.probability}%</h3>
                  <p className="text-xs text-gray-400">{result.signals.filter(s => s.detected).length} of {result.signals.length} risk signals</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {result.signals.map((sig) => (
                <div key={sig.name} className="glass rounded-xl p-4 border border-white/5 flex items-start gap-3">
                  {sig.detected ? <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" /> : <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{sig.name}</span>
                      <span className={"text-[10px] font-bold " + (sig.detected ? "text-red-400" : "text-emerald-400")}>{sig.detected ? "Detected" : "Clear"}</span>
                    </div>
                    <p className="text-[11px] text-gray-500">{sig.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && (
        <div className="text-center py-16 text-gray-600">
          <Siren size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Detect phishing attempts, lookalike domains, and suspicious URLs</p>
        </div>
      )}
    </div>
  );
}

// ─── Fake Store Detector ───────────────────────────────────────────────

function FakeStoreViewer() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<FakeStoreResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(() => {
    if (!domain.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeFakeStoreRisk(extractDomain(domain)));
      setLoading(false);
    }, 400);
  }, [domain]);

  return (
    <div>
      <UrlInput value={domain} onChange={setDomain} onAnalyze={analyze} placeholder="example-store.com" loading={loading} label="Store Domain" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className={"glass-strong rounded-2xl p-6 border " + (
              result.probability === "High" ? "bg-red-500/10 border-red-500/30"
              : result.probability === "Medium" ? "bg-yellow-500/10 border-yellow-500/30"
              : "bg-emerald-500/10 border-emerald-500/30"
            )}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className={"w-20 h-20 rounded-full border-4 flex items-center justify-center " + (
                    result.probability === "Low" ? "border-emerald-500 bg-emerald-500/10"
                    : result.probability === "Medium" ? "border-yellow-500 bg-yellow-500/10"
                    : "border-red-500 bg-red-500/10"
                  )}>
                    <span className={"text-2xl font-black " + (
                      result.probability === "Low" ? "text-emerald-400"
                      : result.probability === "Medium" ? "text-yellow-400"
                      : "text-red-500"
                    )}>{result.score}</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className={"inline-flex px-3 py-1 rounded-full text-xs font-bold border mb-2 " + (
                    result.probability === "Low" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : result.probability === "Medium" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                    : "bg-red-500/10 border-red-500/30 text-red-500"
                  )}>{result.probability} Probability</div>
                  <h3 className="text-lg font-bold text-white">Fake Store Risk Assessment</h3>
                  <p className="text-xs text-gray-400">{result.signals.filter(s => s.found).length} warning signals from {result.signals.length} checks</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {result.signals.map((sig) => (
                <div key={sig.category} className="glass rounded-xl p-4 border border-white/5 flex items-start gap-3">
                  {sig.found ? <AlertTriangle size={14} className="text-red-400 mt-0.5 shrink-0" /> : <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{sig.category}</span>
                      <span className={"text-[10px] font-bold " + (sig.found ? "text-red-400" : "text-emerald-400")}>{sig.found ? "Warning" : "Clear"}</span>
                    </div>
                    <p className="text-[11px] text-gray-500">{sig.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && (
        <div className="text-center py-16 text-gray-600">
          <ShoppingCart size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Identify potentially fraudulent online stores before making a purchase</p>
        </div>
      )}
    </div>
  );
}

// ─── Tech Detector ─────────────────────────────────────────────────────

function TechViewer() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<TechDetectResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(() => {
    if (!domain.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(detectTechnologies(extractDomain(domain)));
      setLoading(false);
    }, 350);
  }, [domain]);

  return (
    <div>
      <UrlInput value={domain} onChange={setDomain} onAnalyze={analyze} placeholder="example.com" loading={loading} label="Domain" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="glass-strong rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-6">
                <ScoreGauge score={result.frameworkScore} label="Tech Score" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 size={16} className="text-indigo-400" />
                    <span className="text-sm font-bold text-white">Detected Technologies</span>
                  </div>
                  <p className="text-xs text-gray-500">{result.technologies.length} technologies detected</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {result.technologies.map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass rounded-xl p-3 border border-white/5 flex items-center gap-3"
                >
                  <div className={"w-8 h-8 rounded-lg flex items-center justify-center " + (
                    tech.category === "framework" ? "bg-blue-500/20 text-blue-400"
                    : tech.category === "cms" ? "bg-purple-500/20 text-purple-400"
                    : tech.category === "ecommerce" ? "bg-pink-500/20 text-pink-400"
                    : tech.category === "hosting" ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-gray-500/20 text-gray-400"
                  )}>
                    <Hash size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white">{tech.name}</div>
                    <div className="text-[9px] text-gray-500 capitalize">{tech.category}</div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-[10px] font-bold text-gray-500">{Math.round(tech.confidence * 100)}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && (
        <div className="text-center py-16 text-gray-600">
          <Code2 size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Detect frameworks, CMS platforms, hosting providers, and analytics</p>
        </div>
      )}
    </div>
  );
}

// ─── SEO Analyzer ──────────────────────────────────────────────────────

function SEOViewer() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<SeoResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(() => {
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeSEO(url));
      setLoading(false);
    }, 350);
  }, [url]);

  return (
    <div>
      <UrlInput value={url} onChange={setUrl} onAnalyze={analyze} placeholder="https://example.com" loading={loading} label="URL" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="glass-strong rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-6">
                <ScoreGauge score={result.score} label="SEO Score" color={result.score >= 70 ? "text-emerald-400" : result.score >= 40 ? "text-yellow-400" : "text-red-400"} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 size={16} className="text-yellow-400" />
                    <span className="text-sm font-bold text-white">SEO Analysis</span>
                  </div>
                  <p className="text-xs text-gray-500">{result.issues.length} issues found</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <BadgeItem label="Title" value={result.titleLength + " chars"} color={result.titleLength >= 30 && result.titleLength <= 60 ? "text-emerald-400" : "text-yellow-400"} />
              <BadgeItem label="Meta Desc" value={result.metaDescriptionLength + " chars"} color={result.metaDescriptionLength > 0 && result.metaDescriptionLength <= 160 ? "text-emerald-400" : "text-yellow-400"} />
              <BadgeItem label="Sitemap" value={result.hasSitemap ? "Found" : "Missing"} color={result.hasSitemap ? "text-emerald-400" : "text-red-400"} />
              <BadgeItem label="Robots.txt" value={result.hasRobotsTxt ? "Found" : "Missing"} color={result.hasRobotsTxt ? "text-emerald-400" : "text-red-400"} />
            </div>
            {result.issues.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase">Issues</h4>
                {result.issues.map((issue, i) => (
                  <div key={i} className={"glass rounded-xl p-3 border flex items-start gap-2 " + (
                    issue.severity === "critical" ? "border-red-500/20" : issue.severity === "warning" ? "border-yellow-500/20" : "border-white/5"
                  )}>
                    {issue.severity === "critical" ? <XCircle size={12} className="text-red-400 mt-0.5 shrink-0" />
                      : <AlertCircle size={12} className="text-yellow-400 mt-0.5 shrink-0" />}
                    <span className="text-xs text-gray-400">{issue.message}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="glass rounded-xl p-4 border border-white/5">
              <div className="text-xs font-bold text-gray-400 mb-2">Headings Structure</div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>H1: <span className="font-bold text-white">{result.headings.h1}</span></span>
                <span>H2: <span className="font-bold text-white">{result.headings.h2}</span></span>
                <span>H3: <span className="font-bold text-white">{result.headings.h3}</span></span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && (
        <div className="text-center py-16 text-gray-600">
          <BarChart3 size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Analyze SEO fundamentals: title, meta, headings, sitemap, and robots.txt</p>
        </div>
      )}
    </div>
  );
}

// ─── URL Analyzer ──────────────────────────────────────────────────────

function URLViewer() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<UrlAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(() => {
    if (!url.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(analyzeURL(url));
      setLoading(false);
    }, 300);
  }, [url]);

  return (
    <div>
      <UrlInput value={url} onChange={setUrl} onAnalyze={analyze} placeholder="https://example.com/some/long/url" loading={loading} label="URL" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="glass-strong rounded-2xl p-6 border border-white/5">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-blue-400" />
                  <span className="text-xs font-bold text-gray-400 uppercase">URL Analysis</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-gray-500">Original</div>
                  <code className="text-xs text-white break-all bg-white/5 rounded-lg px-2 py-1 block">{result.original}</code>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 size={12} className={result.isCanonical ? "text-emerald-400" : "text-yellow-400"} />
                      <span className="font-bold text-white">{result.isCanonical ? "Canonical" : "Non-Canonical"}</span>
                    </div>
                    <span className="text-[10px] text-gray-500">Canonical URL</span>
                  </div>
                  <div className="glass rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 size={12} className={!result.isBroken ? "text-emerald-400" : "text-red-400"} />
                      <span className="font-bold text-white">{!result.isBroken ? "Valid" : "Broken"}</span>
                    </div>
                    <span className="text-[10px] text-gray-500">Link Status</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!result && !loading && (
        <div className="text-center py-16 text-gray-600">
          <Link2 size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Expand shortened URLs, check redirect chains, and validate links</p>
        </div>
      )}
    </div>
  );
}
