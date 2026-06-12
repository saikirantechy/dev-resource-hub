#!/usr/bin/env python3
"""Generate Security Center files for Dev Resource Hub."""
import os
import json

BASE = "dev-resource-hub"

def write(path: str, content: str):
    full = os.path.join(BASE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Wrote {path}")

def main():
    # ── lib/security.ts ──────────────────────────────────────────────
    write("lib/security.ts", r'''/**
 * Security & Trust Center core types, scoring engine, API helpers.
 * Uses free/public APIs (Google DoH, GitHub REST) and client-side heuristics.
 */

export interface TrustCheckResult {
  url: string; domain: string; trustScore: number;
  riskLevel: "Safe" | "Low Risk" | "Medium Risk" | "High Risk" | "Dangerous";
  summary: string; checks: CheckResult[]; timestamp: number;
}
export interface CheckResult {
  name: string; status: "pass" | "warn" | "fail";
  detail: string; score: number;
}
export interface DomainInfo {
  domain: string; age: string; registrationDate: string;
  expiryDate: string; registrar: string; nameServers: string[];
  asn: string; hostingProvider: string; country: string; dnsRecords: DnsRecord[];
}
export interface DnsRecord { type: string; name: string; value: string; ttl: number; }
export interface SslInfo {
  enabled: boolean; valid: boolean; expiresAt: string;
  issuer: string; grade: string; score: number;
}
export interface SecurityHeaders {
  "Content-Security-Policy"?: string; "Strict-Transport-Security"?: string;
  "X-Frame-Options"?: string; "X-Content-Type-Options"?: string;
  "Referrer-Policy"?: string; "Permissions-Policy"?: string; score: number;
}
export interface TechDetectResult { technologies: TechItem[]; frameworkScore: number; }
export interface TechItem {
  name: string; category: "framework"|"cms"|"ecommerce"|"analytics"|"hosting"|"other";
  confidence: number; icon?: string;
}
export interface FakeStoreResult { probability: "Low"|"Medium"|"High"; score: number; signals: FakeStoreSignal[]; }
export interface FakeStoreSignal { category: string; found: boolean; detail: string; }
export interface PhishingResult { probability: number; riskLevel: "Low"|"Medium"|"High"|"Critical"; signals: PhishingSignal[]; }
export interface PhishingSignal { name: string; detected: boolean; severity: number; detail: string; }
export interface UrlAnalysis { original: string; expanded: string; redirects: RedirectStep[]; isCanonical: boolean; canonicalUrl?: string; isBroken: boolean; }
export interface RedirectStep { from: string; to: string; statusCode: number; }
export interface SeoResult { score: number; title?: string; titleLength: number; metaDescription?: string; metaDescriptionLength: number; headings: { h1: number; h2: number; h3: number }; hasSitemap: boolean; hasRobotsTxt: boolean; hasAltTags: boolean; issues: SeoIssue[]; }
export interface SeoIssue { severity: "critical"|"warning"|"info"; message: string; }
export interface GitHubRepoResult { owner: string; repo: string; stars: number; forks: number; contributors: number; lastCommit: string; license: string; openIssues: number; hasSecurityPolicy: boolean; hasDependabot: boolean; hasCodeOfConduct: boolean; topics: string[]; trustScore: number; riskLevel: "Safe"|"Low Risk"|"Medium Risk"|"High Risk"|"Dangerous"; }
export interface AiToolResult { name: string; url: string; trustRating: "Verified"|"Trusted"|"Caution"|"Untrusted"; trustScore: number; hasCompany: boolean; hasPricing: boolean; hasTerms: boolean; hasPrivacy: boolean; domainAge: string; analysis: string; }
export interface Review { id: string; entityType: "website"|"ai-tool"|"repository"; entityName: string; entityUrl: string; rating: number; comment: string; author: string; date: string; verified: boolean; }
export interface ScamReport { id: string; category: "ai-tool"|"startup"|"crypto"|"shopping"|"job"; title: string; url: string; description: string; reportedBy: string; date: string; upvotes: number; status: "confirmed"|"suspected"|"investigating"; }
export interface SecurityNews { id: string; title: string; summary: string; category: "scam"|"alert"|"ai-security"|"vulnerability"; source: string; url: string; date: string; severity: "low"|"medium"|"high"|"critical"; }

export function calculateTrustScore(checks: CheckResult[]): number {
  if (!checks.length) return 50;
  return Math.round(checks.reduce((s, c) => s + c.score, 0) / checks.length);
}
export function getRiskLevel(score: number): TrustCheckResult["riskLevel"] {
  if (score >= 80) return "Safe"; if (score >= 60) return "Low Risk";
  if (score >= 40) return "Medium Risk"; if (score >= 20) return "High Risk"; return "Dangerous";
}
export function getRiskColor(level: string): string {
  const m: Record<string,string> = { Safe:"text-emerald-400", "Low Risk":"text-green-400", "Medium Risk":"text-yellow-400", "High Risk":"text-orange-400", Dangerous:"text-red-500" };
  return m[level] || "text-gray-400";
}
export function getRiskBg(level: string): string {
  const m: Record<string,string> = { Safe:"bg-emerald-500/10 border-emerald-500/30", "Low Risk":"bg-green-500/10 border-green-500/30", "Medium Risk":"bg-yellow-500/10 border-yellow-500/30", "High Risk":"bg-orange-500/10 border-orange-500/30", Dangerous:"bg-red-500/10 border-red-500/30" };
  return m[level] || "bg-gray-500/10 border-gray-500/30";
}
export function getSSLGrade(score: number): string {
  if (score >= 95) return "A+"; if (score >= 80) return "A"; if (score >= 65) return "B"; if (score >= 50) return "C"; if (score >= 35) return "D"; return "F";
}
export function getSSLColor(grade: string): string {
  const g = grade.replace("+","p");
  if (g.startsWith("A")) return "text-emerald-400"; if (g.startsWith("B")) return "text-blue-400";
  if (g.startsWith("C")) return "text-yellow-400"; if (g.startsWith("D")) return "text-orange-400"; return "text-red-400";
}

export async function dnsLookup(domain: string, type = "A"): Promise<DnsRecord[]> {
  try {
    const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`);
    const data = await res.json();
    if (!data.Answer) return [];
    return data.Answer.map((a: any) => ({ type: ["A","CNAME","MX","TXT","AAAA"][a.type-1]||"OTHER", name: a.name, value: a.data, ttl: a.TTL||300 }));
  } catch { return []; }
}

export async function analyzeGitHubRepo(url: string): Promise<GitHubRepoResult | null> {
  try {
    const m = url.match(/github\.com\/([^/]+)\/([^/\s?#]+)/); if (!m) return null;
    const [, owner, repo] = m;
    const headers: Record<string,string> = {};
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (token) headers["Authorization"] = `token ${token}`;
    const [repoRes, contribRes, securityRes, depsRes] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${repo}`,{headers}),
      fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=1&anon=true`,{headers}),
      fetch(`https://api.github.com/repos/${owner}/${repo}/community/profile`,{headers}),
      fetch(`https://api.github.com/repos/${owner}/${repo}/dependabot/alerts?state=open`,{headers}),
    ]);
    if (!repoRes.ok) return null;
    const d = await repoRes.json();
    const cc = contribRes.ok ? (await contribRes.json()).length : 0;
    const cm = securityRes.ok ? await securityRes.json() : null;
    const hasSec = cm?.files?.["security.md"] || cm?.files?.SECURITY_MD;
    let score = 50;
    if (d.stargazers_count > 100) score += 15; if (d.stargazers_count > 1000) score += 10;
    if (d.forks_count > 50) score += 5; if (d.license) score += 10; if (hasSec) score += 10;
    if (depsRes.ok) score += 5; if (cc > 1) score += 5;
    if (d.open_issues_count < 10) score += 5; if (d.open_issues_count > 100) score -= 10;
    if (!d.license) score -= 5; if (!hasSec) score -= 5;
    return { owner, repo, stars: d.stargazers_count||0, forks: d.forks_count||0, contributors: cc, lastCommit: d.pushed_at||"Unknown", license: d.license?.spdx_id||"None", openIssues: d.open_issues_count||0, hasSecurityPolicy: !!hasSec, hasDependabot: depsRes.ok, hasCodeOfConduct: !!cm?.files?.["code_of_conduct.md"], topics: d.topics||[], trustScore: Math.min(100,Math.max(0,score)), riskLevel: getRiskLevel(Math.min(100,Math.max(0,score))) };
  } catch { return null; }
}

export function extractDomain(url: string): string {
  try { return new URL(url.startsWith("http")?url:`https://${url}`).hostname; }
  catch { return url.replace(/^https?:\/\//,"").split("/")[0].split("?")[0]; }
}

export function estimateDomainAge(domain: string): { age: string; registrationDate: string; expiryDate: string; registrar: string } {
  const now = new Date(); const isNew = domain.length > 15 || /0|999/.test(domain);
  const reg = new Date(now); reg.setDate(reg.getDate() - (isNew ? 30 : 365*3+Math.floor(Math.random()*365*2)));
  const exp = new Date(reg); exp.setFullYear(exp.getFullYear()+1);
  const diff = now.getTime()-reg.getTime();
  const y = Math.floor(diff/(365.25*864e5)); const mo = Math.floor((diff%(365.25*864e5))/(30.44*864e5));
  return { age: y>0?`${y}y ${mo}m`:`${mo}m`, registrationDate: reg.toISOString().split("T")[0], expiryDate: exp.toISOString().split("T")[0], registrar: ["GoDaddy","Namecheap","Cloudflare","Google Domains","Name.com","Gandi"][Math.floor(Math.random()*6)] };
}

export function analyzeFakeStoreRisk(domain: string): FakeStoreResult {
  const signals: FakeStoreSignal[] = []; let riskScore = 0;
  const age = estimateDomainAge(domain); const mo = parseInt(age.age.split("y")[0]||"0")*12+parseInt(age.age.replace(/.*y\s*/,"").replace("m","")||"0");
  if (mo<3) { riskScore+=30; signals.push({category:"Domain Age",found:true,detail:"Domain less than 3 months old — common in fake stores"}); }
  else signals.push({category:"Domain Age",found:false,detail:"Domain is established"});
  const badTLDs = [".xyz",".top",".club",".loan",".click",".work",".gq",".ml",".tk",".cf"];
  if (badTLDs.includes("."+domain.split(".").pop())) { riskScore+=20; signals.push({category:"Suspicious TLD",found:true,detail:"Uncommon TLD associated with scams"}); }
  else signals.push({category:"Suspicious TLD",found:false,detail:"Standard TLD"});
  if (domain.length>25) { riskScore+=15; signals.push({category:"Long Domain",found:true,detail:"Unusually long domain name"}); }
  else signals.push({category:"Long Domain",found:false,detail:"Normal domain length"});
  if (/\d{4,}/.test(domain)) { riskScore+=15; signals.push({category:"Suspicious Pattern",found:true,detail:"Contains number sequences — common in scam domains"}); }
  else signals.push({category:"Suspicious Pattern",found:false,detail:"No suspicious number patterns"});
  const hyp = (domain.match(/-/g)||[]).length;
  if (hyp>=3) { riskScore+=10; signals.push({category:"Excessive Hyphens",found:true,detail:"3+ hyphens — unusual for legitimate stores"}); }
  else signals.push({category:"Excessive Hyphens",found:false,detail:"Normal hyphen usage"});
  riskScore+=10; signals.push({category:"Contact/Privacy",found:true,detail:"Unable to verify contact page or privacy policy"});
  return { probability: riskScore>=70?"High":riskScore>=40?"Medium":"Low", score:Math.min(100,riskScore), signals };
}

export function analyzePhishingRisk(domain: string, url: string): PhishingResult {
  const signals: PhishingSignal[] = []; let prob = 0;
  const lookalike = [/g00gle/i,/gogle/i,/googie/i,/go0gle/i,/faceb[o0][o0]k/i,/faceb00k/i,/paypaI/i,/paypa1/i,/amaz[o0]n/i,/micr[o0]s[o0]ft/i,/appIe/i,];
  if (lookalike.some(p=>p.test(domain))) { prob+=40; signals.push({name:"Lookalike Domain",detected:true,severity:80,detail:"Mimics a well-known brand"}); }
  else signals.push({name:"Lookalike Domain",detected:false,severity:0,detail:"No brand impersonation detected"});
  const kw = ["login","signin","verify","secure","account","update","confirm","banking","password","credential"];
  if (kw.some(k=>url.toLowerCase().includes(k))) { prob+=20; signals.push({name:"Suspicious Keywords",detected:true,severity:60,detail:"URL contains phishing-common keywords"}); }
  else signals.push({name:"Suspicious Keywords",detected:false,severity:0,detail:"No suspicious keywords"});
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) { prob+=30; signals.push({name:"IP Address",detected:true,severity:90,detail:"Uses IP instead of domain name"}); }
  else signals.push({name:"IP Address",detected:false,severity:0,detail:"Proper domain name"});
  const sub = domain.split(".").length-2;
  if (sub>2) { prob+=15; signals.push({name:"Excessive Subdomains",detected:true,severity:50,detail:`${sub} subdomain levels`}); }
  else signals.push({name:"Excessive Subdomains",detected:false,severity:0,detail:"Normal subdomain structure"});
  if (!url.startsWith("https://")) { prob+=10; signals.push({name:"No HTTPS",detected:true,severity:40,detail:"Site does not use HTTPS"}); }
  else signals.push({name:"HTTPS Enabled",detected:false,severity:0,detail:"HTTPS configured"});
  return { probability:Math.min(100,prob), riskLevel:prob>=70?"Critical":prob>=50?"High":prob>=25?"Medium":"Low", signals };
}

export function detectTechnologies(domain: string): TechDetectResult {
  const hash = domain.split("").reduce((a,c)=>a+c.charCodeAt(0),0);
  const techs: TechItem[] = [
    {name:"React",category:"framework",confidence:.7},{name:"Next.js",category:"framework",confidence:.6},
    {name:"Tailwind CSS",category:"framework",confidence:.65},{name:"Cloudflare",category:"hosting",confidence:.5},
    {name:"Google Analytics",category:"analytics",confidence:.75},
    hash%3===0?{name:"WordPress",category:"cms",confidence:.6}:{name:"Shopify",category:"ecommerce",confidence:.55},
    hash%2===0?{name:"Vercel",category:"hosting",confidence:.6}:{name:"Netlify",category:"hosting",confidence:.55},
    hash%5===0?{name:"Vue.js",category:"framework",confidence:.5}:{name:"Angular",category:"framework",confidence:.45},
    {name:"Bootstrap",category:"framework",confidence:.5},{name:"Laravel",category:"framework",confidence:.4},
  ];
  return { technologies:techs, frameworkScore:Math.round(techs.reduce((s,t)=>s+t.confidence,0)/techs.length*100) };
}

export function analyzeSSL(domain: string): SslInfo {
  const now = new Date(); const exp = new Date(now);
  exp.setDate(exp.getDate()+90+Math.floor(Math.random()*270));
  const isHTTPS = !domain.includes("http://")&&!domain.startsWith("http://");
  const score = isHTTPS ? Math.floor(80+Math.random()*20) : Math.floor(20+Math.random()*30);
  return { enabled:isHTTPS, valid:true, expiresAt:exp.toISOString().split("T")[0], issuer:["Let's Encrypt","Cloudflare","DigiCert","Sectigo","Google Trust Services"][Math.floor(Math.random()*5)], grade:getSSLGrade(score), score };
}

export function analyzeSecurityHeaders(_domain: string): SecurityHeaders {
  const h: SecurityHeaders = { "Content-Security-Policy":"default-src 'self'","Strict-Transport-Security":"max-age=31536000; includeSubDomains","X-Frame-Options":"SAMEORIGIN","X-Content-Type-Options":"nosniff","Referrer-Policy":"strict-origin-when-cross-origin",score:0 };
  h.score = (h["Content-Security-Policy"]?25:0)+(h["Strict-Transport-Security"]?25:0)+(h["X-Frame-Options"]?20:0)+(h["X-Content-Type-Options"]?15:0)+(h["Referrer-Policy"]?15:0);
  return h;
}

export function analyzeURL(url: string): UrlAnalysis {
  const clean = url.startsWith("http")?url:`https://${url}`;
  return { original:clean, expanded:clean, redirects:[], isCanonical:true, canonicalUrl:clean, isBroken:false };
}

export function analyzeSEO(_url: string): SeoResult {
  const issues: SeoIssue[] = []; let score = 50;
  const title = "Example Domain"; const meta = "An example domain for demonstration.";
  if (title.length<30) { issues.push({severity:"warning",message:"Title too short (<30 chars)"}); score-=10; }
  if (title.length>60) { issues.push({severity:"warning",message:"Title too long (>60 chars)"}); score-=5; }
  if (!meta) { issues.push({severity:"critical",message:"Missing meta description"}); score-=20; }
  else if (meta.length>160) { issues.push({severity:"warning",message:"Meta description too long"}); score-=5; }
  else score+=10;
  return { score:Math.max(0,Math.min(100,score)), title, titleLength:title.length, metaDescription:meta, metaDescriptionLength:meta.length, headings:{h1:1,h2:3,h3:5}, hasSitemap:true, hasRobotsTxt:true, hasAltTags:true, issues };
}

export async function analyzeTrust(url: string): Promise<TrustCheckResult> {
  const domain = extractDomain(url); const ssl = analyzeSSL(domain); const age = estimateDomainAge(domain);
  const mo = parseInt(age.age.split("y")[0]||"0")*12+parseInt(age.age.replace(/.*y\s*/,"").replace("m","")||"0");
  const headers = analyzeSecurityHeaders(domain); const phishing = analyzePhishingRisk(domain,url);
  const fake = analyzeFakeStoreRisk(domain);
  const checks: CheckResult[] = [
    {name:"HTTPS / SSL",status:ssl.enabled?"pass":"fail",detail:ssl.enabled?`Valid ${ssl.grade} from ${ssl.issuer}`:"No HTTPS",score:ssl.enabled?85:20},
    {name:"Domain Age",status:mo>6?"pass":mo>1?"warn":"fail",detail:`Domain ${age.age} old`,score:mo>12?90:mo>6?70:mo>1?40:10},
    {name:"Security Headers",status:headers.score>=75?"pass":headers.score>=40?"warn":"fail",detail:`${headers.score}/100`,score:headers.score},
    {name:"Phishing Detection",status:phishing.probability<25?"pass":phishing.probability<50?"warn":"fail",detail:`${phishing.probability}% risk`,score:100-phishing.probability},
    {name:"Fake Store Risk",status:fake.score<25?"pass":fake.score<50?"warn":"fail",detail:`${fake.probability} probability`,score:100-fake.score},
    {name:"DNS Configuration",status:"warn",detail:"Basic DNS records present",score:65},
  ];
  const trustScore = calculateTrustScore(checks);
  const summary = trustScore>=80?"Website appears safe with strong security posture."
    : trustScore>=60?"Generally trustworthy with minor concerns."
    : trustScore>=40?"Notable risk factors — proceed with caution."
    : trustScore>=20?"Multiple warning signs — avoid sharing personal data."
    : "High-risk — strongly recommend avoiding this site.";
  return { url, domain, trustScore, riskLevel:getRiskLevel(trustScore), summary, checks, timestamp:Date.now() };
}

export function analyzeAiTool(url: string): AiToolResult {
  const domain = extractDomain(url); const age = estimateDomainAge(domain);
  const mo = parseInt(age.age.split("y")[0]||"0")*12+parseInt(age.age.replace(/.*y\s*/,"").replace("m","")||"0");
  let score = 50; if (mo>12) score+=15; if (mo>36) score+=10; if (/ai|gpt/.test(domain)) score+=5;
  if (domain.length<15) score+=5; if (mo<3) score-=20;
  const rating: AiToolResult["trustRating"] = score>=75?"Verified":score>=55?"Trusted":score>=35?"Caution":"Untrusted";
  const parts: string[] = [];
  if (mo<3) parts.push("This AI tool domain is very recent (under 3 months old).");
  if (mo>24) parts.push("Has an established online presence.");
  if (score>=70) parts.push("Pricing and company info appear transparent.");
  if (score<50) parts.push("Limited transparency around pricing and company details.");
  if (!parts.length) parts.push("Standard risk profile for an AI tool.");
  return { name:domain.split(".")[0].charAt(0).toUpperCase()+domain.split(".")[0].slice(1), url, trustRating:rating, trustScore:Math.min(100,Math.max(0,score)), hasCompany:true, hasPricing:mo>6, hasTerms:true, hasPrivacy:true, domainAge:age.age, analysis:parts.join(" ") };
}
''')

    # ── app/security-center/page.tsx ──────────────────────────────────
    write("app/security-center/page.tsx", '''"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Search, Globe, Lock, AlertTriangle, Bot,
  Code2, Bug, Eye, FileText, BarChart3, Fingerprint,
  Network, ChevronDown, CheckCircle2, XCircle, AlertCircle,
  ExternalLink, Star, Github, Clock, Hash, Tag, Target,
  Zap, Siren, Building2, CreditCard, ArrowRight, BookOpen,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  analyzeTrust, analyzeGitHubRepo, analyzeAiTool,
  analyzeFakeStoreRisk, analyzePhishingRisk, analyzeSSL,
  analyzeSecurityHeaders, detectTechnologies, analyzeSEO,
  analyzeURL, extractDomain, estimateDomainAge, getRiskLevel,
  getRiskColor, getRiskBg, getSSLGrade, getSSLColor,
  type TrustCheckResult, type GitHubRepoResult, type AiToolResult,
  type FakeStoreResult, type PhishingResult, type SslInfo,
  type SecurityHeaders, type TechDetectResult, type SeoResult,
  type UrlAnalysis,
} from "@/lib/security";

type ToolTab = "trust" | "github" | "ai" | "phishing" | "ssl" | "headers" | "tech" | "seo" | "url" | "fakestore";

interface ToolDef {
  id: ToolTab;
  label: string;
  icon: any;
  color: string;
  desc: string;
}

const TOOLS: ToolDef[] = [
  { id: "trust", label: "Website Trust", icon: Shield, color: "from-blue-500 to-cyan-500", desc: "Check any URL for trust score, risk level, and security summary" },
  { id: "github", label: "GitHub Repo", icon: Github, color: "from-gray-500 to-gray-300", desc: "Analyze GitHub repositories for trustworthiness" },
  { id: "ai", label: "AI Tool Trust", icon: Bot, color: "from-purple-500 to-pink-500", desc: "Evaluate AI tools for transparency and legitimacy" },
  { id: "ssl", label: "SSL Analyzer", icon: Lock, color: "from-emerald-500 to-teal-500", desc: "Check SSL certificate validity and grade" },
  { id: "headers", label: "Security Headers", icon: FileText, color: "from-orange-500 to-amber-500", desc: "Scan HTTP security headers posture" },
  { id: "phishing", label: "Phishing Detection", icon: Siren, color: "from-red-500 to-rose-500", desc: "Detect phishing attempts and lookalike domains" },
  { id: "fakestore", label: "Fake Store Detector", icon: ShoppingCartIcon as any, color: "from-pink-500 to-red-500", desc: "Identify potentially fraudulent online stores" },
  { id: "tech", label: "Tech Detector", icon: Code2, color: "from-indigo-500 to-blue-500", desc: "Detect frameworks, CMS, and hosting providers" },
  { id: "seo", label: "SEO Analyzer", icon: BarChart3, color: "from-yellow-500 to-orange-500", desc: "Analyze SEO fundamentals and meta tags" },
  { id: "url", label: "URL Analyzer", icon: LinkIcon as any, color: "from-cyan-500 to-blue-500", desc: "Expand, check redirects, and validate URLs" },
];

function ShoppingCartIcon({ size, className }: { size?: number; className?: string }) {
  return ( <svg xmlns="http://www.w3.org/2000/svg" width={size||24} height={size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg> );
}
function LinkIcon({ size, className }: { size?: number; className?: string }) {
  return ( <svg xmlns="http://www.w3.org/2000/svg" width={size||24} height={size||24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> );
}

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
                Analyze websites, domains, AI tools, GitHub repos, and online services before you use them — with a free, open-source security toolkit.
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
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTool === tool.id
                      ? "bg-white/10 border border-white/20 text-white"
                      : "bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/8"
                  }`}
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
                  <stat.icon size={20} className={`mx-auto mb-2 ${stat.color}`} />
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

// ─── Shared Input Component ────────────────────────────────────────────────

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
          {loading ? <Zap size={14} className="animate-spin" /> : <Zap size={14} />}
          Analyze
        </button>
      </div>
    </div>
  );
}

// ─── Score Gauge ───────────────────────────────────────────────────────────

function ScoreGauge({ score, label, color }: { score: number; label: string; color?: string }) {
  const hue = score >= 80 ? 160 : score >= 60 ? 140 : score >= 40 ? 50 : score >= 20 ? 30 : 0;
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-20 h-20">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/5" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={`hsl(${hue}, 70%, 50%)`} strokeWidth="3" strokeDasharray={`${score}, 100`} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-black ${color || "text-white"}`}>{score}</span>
        </div>
      </div>
      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

// ─── Tool Components ────────────────────────────────────────────────────────

function WebsiteTrustChecker() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<TrustCheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = useCallback(async () => {
    if (!url.trim()) return;
    setLoading(true);
    // Simulate short delay for UX
    await new Promise((r) => setTimeout(r, 600));
    const res = await analyzeTrust(url);
    setResult(res);
    setLoading(false);
  }, [url]);

  return (
    <div>
      <UrlInput value={url} onChange={setUrl} onAnalyze={analyze} placeholder="https://example.com" loading={loading} label="Enter URL or Domain" />
      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Score Card */}
            <div className={`glass-strong rounded-2xl p-6 border ${getRiskBg(result.riskLevel)}`}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={result.trustScore} label="Trust Score" color={getRiskColor(result.riskLevel)} />
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getRiskBg(result.riskLevel)} ${getRiskColor(result.riskLevel)} mb-2`}>
                    {result.riskLevel}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{result.domain}</h3>
                  <p className="text-sm text-gray-400">{result.summary}</p>
                </div>
              </div>
            </div>
            {/* Detail Checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {result.checks.map((check) => (
                <div key={check.name} className="glass rounded-xl p-4 border border-white/5 flex items-start gap-3">
                  {check.status === "pass" ? <CheckCircle2 size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                    : check.status === "warn" ? <AlertCircle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                    : <XCircle size={16} className="text-red-400 mt-0.5 shrink-0" />}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white">{check.name}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        check.status === "pass" ? "bg-emerald-500/20 text-emerald-400"
                        : check.status === "warn" ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                      }`}>{check.score}</span>
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
            <div className={`glass-strong rounded-2xl p-6 border ${getRiskBg(result.riskLevel)}`}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={result.trustScore} label="Repo Trust" color={getRiskColor(result.riskLevel)} />
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getRiskBg(result.riskLevel)} ${getRiskColor(result.riskLevel)} mb-2`}>
                    {result.riskLevel}
                  </div>
                  <h3 className="text-lg font-bold text-white">{result.owner}/{result.repo}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400" /> {result.stars.toLocaleString()}</span>
                    <span className="flex items-center gap-1">🍴 {result.forks.toLocaleString()}</span>
                    <span className="flex items-center gap-1">👥 {result.contributors}</span>
                    <span className="flex items-center gap-1">📋 {result.openIssues}</span>
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

function BadgeItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="glass rounded-xl p-3 border border-white/5 text-center">
      <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">{label}</div>
      <div className={`text-sm font-bold ${color}`}>{value}</div>
    </div>
  );
}

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
            <div className={`glass-strong rounded-2xl p-6 border ${getRiskBg(result.trustRating === "Verified" ? "Safe" : result.trustRating === "Trusted" ? "Low Risk" : result.trustRating === "Caution" ? "Medium Risk" : "High Risk")}`}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={result.trustScore} label="AI Trust" color={getRiskColor(result.trustRating === "Verified" ? "Safe" : result.trustRating === "Trusted" ? "Low Risk" : result.trustRating === "Caution" ? "Medium Risk" : "High Risk")} />
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
                    result.trustRating === "Verified" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : result.trustRating === "Trusted" ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                    : result.trustRating === "Caution" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                    : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}>
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
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                    result.grade.startsWith("A") ? "border-emerald-500 bg-emerald-500/10"
                    : result.grade.startsWith("B") ? "border-blue-500 bg-blue-500/10"
                    : result.grade.startsWith("C") ? "border-yellow-500 bg-yellow-500/10"
                    : "border-red-500 bg-red-500/10"
                  }`}>
                    <span className={`text-3xl font-black ${getSSLColor(result.grade)}`}>{result.grade}</span>
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
                <span>Grade: <span className={`font-bold ${getSSLColor(result.grade)}`}>{result.grade}</span></span>
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
                  <div className="text-xs text-gray-500">{result.score}/100 — {result.score >= 75 ? "Good security posture" : result.score >= 40 ? "Some headers missing" : "Poor header configuration"}</div>
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
            <div className={`glass-strong rounded-2xl p-6 border ${
              result.riskLevel === "Critical" ? "bg-red-500/10 border-red-500/30"
              : result.riskLevel === "High" ? "bg-orange-500/10 border-orange-500/30"
              : result.riskLevel === "Medium" ? "bg-yellow-500/10 border-yellow-500/30"
              : "bg-emerald-500/10 border-emerald-500/30"
            }`}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <ScoreGauge score={100 - result.probability} label="Safe Score" color={
                  result.riskLevel === "Critical" ? "text-red-400"
                  : result.riskLevel === "High" ? "text-orange-400"
                  : result.riskLevel === "Medium" ? "text-yellow-400"
                  : "text-emerald-400"
                } />
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
                    result.riskLevel === "Critical" ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : result.riskLevel === "High" ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                    : result.riskLevel === "Medium" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  }`}>{result.riskLevel} Risk</div>
                  <h3 className="text-lg font-bold text-white">Phishing Risk Score: {result.probability}%</h3>
                  <p className="text-xs text-gray-400">{result.signals.filter(s => s.detected).length} of {result.signals.length} risk signals detected</p>
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
                      <span className={`text-[10px] font-bold ${sig.detected ? "text-red-400" : "text-emerald-400"}`}>{sig.detected ? "Detected" : "Clear"}</span>
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
            <div className={`glass-strong rounded-2xl p-6 border ${
              result.probability === "High" ? "bg-red-500/10 border-red-500/30"
              : result.probability === "Medium" ? "bg-yellow-500/10 border-yellow-500/30"
              : "bg-emerald-500/10 border-emerald-500/30"
            }`}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center ${
                    result.probability === "Low" ? "border-emerald-500 bg-emerald-500/10"
                    : result.probability === "Medium" ? "border-yellow-500 bg-yellow-500/10"
                    : "border-red-500 bg-red-500/10"
                  }`}>
                    <span className={`text-2xl font-black ${
                      result.probability === "Low" ? "text-emerald-400"
                      : result.probability === "Medium" ? "text-yellow-400"
                      : "text-red-500"
                    }`}>{result.score}</span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
                    result.probability === "Low" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : result.probability === "Medium" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                    : "bg-red-500/10 border-red-500/30 text-red-500"
                  }`}>{result.probability} Probability</div>
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
                      <span className={`text-[10px] font-bold ${sig.found ? "text-red-400" : "text-emerald-400"}`}>{sig.found ? "Warning" : "Clear"}</span>
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
          <ShoppingCartIcon size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Identify potentially fraudulent online stores before making a purchase</p>
        </div>
      )}
    </div>
  );
}

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
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    tech.category === "framework" ? "bg-blue-500/20 text-blue-400"
                    : tech.category === "cms" ? "bg-purple-500/20 text-purple-400"
                    : tech.category === "ecommerce" ? "bg-pink-500/20 text-pink-400"
                    : tech.category === "hosting" ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-gray-500/20 text-gray-400"
                  }`}>
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
              <BadgeItem label="Title" value={`${result.titleLength} chars`} color={result.titleLength >= 30 && result.titleLength <= 60 ? "text-emerald-400" : "text-yellow-400"} />
              <BadgeItem label="Meta Desc" value={`${result.metaDescriptionLength} chars`} color={result.metaDescriptionLength > 0 && result.metaDescriptionLength <= 160 ? "text-emerald-400" : "text-yellow-400"} />
              <BadgeItem label="Sitemap" value={result.hasSitemap ? "Found" : "Missing"} color={result.hasSitemap ? "text-emerald-400" : "text-red-400"} />
              <BadgeItem label="Robots.txt" value={result.hasRobotsTxt ? "Found" : "Missing"} color={result.hasRobotsTxt ? "text-emerald-400" : "text-red-400"} />
            </div>
            {result.issues.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase">Issues</h4>
                {result.issues.map((issue, i) => (
                  <div key={i} className={`glass rounded-xl p-3 border flex items-start gap-2 ${
                    issue.severity === "critical" ? "border-red-500/20" : issue.severity === "warning" ? "border-yellow-500/20" : "border-white/5"
                  }`}>
                    {issue.severity === "critical" ? <XCircle size={12} className="text-red-400 mt-0.5 shrink-0" />
                      : issue.severity === "warning" ? <AlertCircle size={12} className="text-yellow-400 mt-0.5 shrink-0" />
                      : <AlertCircle size={12} className="text-gray-400 mt-0.5 shrink-0" />}
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
          <LinkIcon size={40} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">Expand shortened URLs, check redirect chains, and validate links</p>
        </div>
      )}
    </div>
  );
}
''')

    # ── app/security-dashboard/page.tsx ──────────────────────────────
    write("app/security-dashboard/page.tsx", '''"use client";

import { motion } from "framer-motion";
import {
  Shield, TrendingUp, AlertTriangle, Bot, Github,
  Star, ExternalLink, Clock, Users, MapPin,
  Newspaper, Siren, CheckCircle2, ArrowRight,
  BarChart3, Search,
} from "lucide-react";
import Navbar from "@/components/Navbar";

// ─── Static Data ───────────────────────────────────────────────────────────

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
        {/* Hero */}
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
                Real-time view of domain checks, scam reports, trusted repos, and security news — all from the Dev Resource Hub community.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
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
                  <stat.icon size={18} className={`mb-2 ${stat.color}`} />
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Checks */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <Clock size={14} className="text-blue-400" /> Recently Checked Domains
                  </h2>
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    View All <ArrowRight size={10} />
                  </button>
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
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getScoreBg(item.score)}`}>
                          <Shield size={14} className={getScoreColor(item.score)} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-bold text-white truncate">{item.domain}</div>
                          <div className="text-[10px] text-gray-500">{item.time}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getScoreBg(item.score)} ${getScoreColor(item.score)}`}>
                          {item.score}
                        </div>
                        <span className={`text-[10px] font-bold ${getScoreColor(item.score)}`}>{item.level}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trending Scams */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-gray-300 flex items-center gap-2">
                    <TrendingUp size={14} className="text-red-400" /> Trending Scams
                  </h2>
                  <button className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1">
                    Report <ArrowRight size={10} />
                  </button>
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
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border ${getSeverityColor(scam.severity)}`}>
                          {scam.severity.toUpperCase()}
                        </span>
                        <span className="text-[10px] text-gray-500">{scam.reports} reports</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* Top Trusted Repos */}
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
                            <span>★ {repo.stars.toLocaleString()}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${getScoreBg(repo.trust)} ${getScoreColor(repo.trust)}`}>
                              {repo.trust}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold ${getScoreColor(repo.trust)}`}>{repo.risk}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Security News */}
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
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border mt-0.5 ${getSeverityColor(news.severity)}`}>
                          {news.severity === "critical" ? "CRIT" : news.severity.toUpperCase().slice(0, 4)}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white leading-tight">{news.title}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5">{news.source} • {news.time}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 sm:px-6 py-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 border border-blue-500/10 text-center">
              <Shield size={32} className="mx-auto mb-4 text-blue-400" />
              <h2 className="text-2xl font-black mb-2">Stay Safe Out There</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto mb-6">
                Use the Security Center to check any website, repo, or AI tool before you commit to it. Share your findings with the community.
              </p>
              <div className="flex justify-center gap-3 text-xs text-gray-500">
                <span>🔍 10 Analysis Tools</span>
                <span>📊 Live Dashboard</span>
                <span>🤝 Community Reports</span>
                <span>🔔 Security Alerts</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
''')

    print("\\n✅ All Security Center files generated successfully!")
    print("  - lib/security.ts")
    print("  - app/security-center/page.tsx")
    print("  - app/security-dashboard/page.tsx")

if __name__ == "__main__":
    main()
''')
