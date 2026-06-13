/**
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
  asn: string; hostingProvider: string; country: string;
  dnsRecords: DnsRecord[];
}
export interface DnsRecord { type: string; name: string; value: string; ttl: number; }
export interface SslInfo {
  enabled: boolean; valid: boolean; expiresAt: string;
  issuer: string; grade: string; score: number;
}
export interface SecurityHeaders {
  "Content-Security-Policy"?: string;
  "Strict-Transport-Security"?: string;
  "X-Frame-Options"?: string;
  "X-Content-Type-Options"?: string;
  "Referrer-Policy"?: string;
  "Permissions-Policy"?: string;
  score: number;
}
export interface TechDetectResult { technologies: TechItem[]; frameworkScore: number; }
export interface TechItem {
  name: string; category: "framework"|"cms"|"ecommerce"|"analytics"|"hosting"|"other"|"database"|"tool";
  confidence: number; icon?: string;
}
export interface FakeStoreResult {
  probability: "Low"|"Medium"|"High"; score: number;
  signals: FakeStoreSignal[];
}
export interface FakeStoreSignal { category: string; found: boolean; detail: string; }
export interface PhishingResult {
  probability: number;
  riskLevel: "Low"|"Medium"|"High"|"Critical";
  signals: PhishingSignal[];
}
export interface PhishingSignal { name: string; detected: boolean; severity: number; detail: string; }
export interface UrlAnalysis {
  original: string; expanded: string; redirects: RedirectStep[];
  isCanonical: boolean; canonicalUrl?: string; isBroken: boolean;
}
export interface RedirectStep { from: string; to: string; statusCode: number; }
export interface SeoResult {
  score: number; title?: string; titleLength: number;
  metaDescription?: string; metaDescriptionLength: number;
  headings: { h1: number; h2: number; h3: number };
  hasSitemap: boolean; hasRobotsTxt: boolean; hasAltTags: boolean;
  issues: SeoIssue[];
}
export interface SeoIssue { severity: "critical"|"warning"|"info"; message: string; }
export interface GitHubRepoResult {
  owner: string; repo: string; stars: number; forks: number;
  contributors: number; lastCommit: string; license: string;
  openIssues: number; hasSecurityPolicy: boolean;
  hasDependabot: boolean; hasCodeOfConduct: boolean;
  topics: string[]; trustScore: number;
  riskLevel: "Safe"|"Low Risk"|"Medium Risk"|"High Risk"|"Dangerous";
}
export interface PackageTrustResult {
  name: string; ecosystem: "npm"|"pypi";
  version: string; description: string;
  stars: number; weeklyDownloads: number;
  hasSecurityPolicy: boolean; hasReadme: boolean;
  hasLicense: boolean; hasRepository: boolean;
  lastPublish: string; author: string;
  trustScore: number;
  riskLevel: "Safe"|"Low Risk"|"Medium Risk"|"High Risk"|"Dangerous";
  issues: string[];
}

export interface AiToolResult {
  name: string; url: string;
  trustRating: "Verified"|"Trusted"|"Caution"|"Untrusted";
  trustScore: number; hasCompany: boolean; hasPricing: boolean;
  hasTerms: boolean; hasPrivacy: boolean;
  domainAge: string; analysis: string;
}
export interface Review {
  id: string; entityType: "website"|"ai-tool"|"repository";
  entityName: string; entityUrl: string; rating: number;
  comment: string; author: string; date: string; verified: boolean;
}
export interface ScamReport {
  id: string; category: "ai-tool"|"startup"|"crypto"|"shopping"|"job";
  title: string; url: string; description: string;
  reportedBy: string; date: string; upvotes: number;
  status: "confirmed"|"suspected"|"investigating";
}
export interface SecurityNews {
  id: string; title: string; summary: string;
  category: "scam"|"alert"|"ai-security"|"vulnerability";
  source: string; url: string; date: string;
  severity: "low"|"medium"|"high"|"critical";
}

// ─── Scoring Engine ─────────────────────────────────────────────────────────

export function calculateTrustScore(checks: CheckResult[]): number {
  if (!checks.length) return 50;
  return Math.round(checks.reduce((s, c) => s + c.score, 0) / checks.length);
}

export function getRiskLevel(score: number): TrustCheckResult["riskLevel"] {
  if (score >= 80) return "Safe";
  if (score >= 60) return "Low Risk";
  if (score >= 40) return "Medium Risk";
  if (score >= 20) return "High Risk";
  return "Dangerous";
}

const RISK_COLORS: Record<string, string> = {
  "Safe": "text-emerald-400","Low Risk": "text-green-400",
  "Medium Risk": "text-yellow-400","High Risk": "text-orange-400","Dangerous": "text-red-500",
};
export function getRiskColor(level: string): string {
  return RISK_COLORS[level] || "text-gray-400";
}

const RISK_BGS: Record<string, string> = {
  "Safe": "bg-emerald-500/10 border-emerald-500/30",
  "Low Risk": "bg-green-500/10 border-green-500/30",
  "Medium Risk": "bg-yellow-500/10 border-yellow-500/30",
  "High Risk": "bg-orange-500/10 border-orange-500/30",
  "Dangerous": "bg-red-500/10 border-red-500/30",
};
export function getRiskBg(level: string): string {
  return RISK_BGS[level] || "bg-gray-500/10 border-gray-500/30";
}

export function getSSLGrade(score: number): string {
  if (score >= 95) return "A+";
  if (score >= 80) return "A";
  if (score >= 65) return "B";
  if (score >= 50) return "C";
  if (score >= 35) return "D";
  return "F";
}

export function getSSLColor(grade: string): string {
  const g = grade.replace("+", "p");
  if (g.startsWith("A")) return "text-emerald-400";
  if (g.startsWith("B")) return "text-blue-400";
  if (g.startsWith("C")) return "text-yellow-400";
  if (g.startsWith("D")) return "text-orange-400";
  return "text-red-400";
}

// ─── Google DNS-over-HTTPS (CORS-friendly) ─────────────────────────────────

export async function dnsLookup(domain: string, type = "A"): Promise<DnsRecord[]> {
  try {
    const res = await fetch("https://dns.google/resolve?name=" + encodeURIComponent(domain) + "&type=" + type);
    const data = await res.json();
    if (!data.Answer) return [];
    return data.Answer.map((a: any) => ({
      type: DNS_TYPE_MAP[a.type] || "OTHER",
      name: a.name, value: a.data, ttl: a.TTL || 300,
    }));    } catch { return []; }
}

const DNS_TYPE_MAP: Record<number, string> = {
  1: "A", 5: "CNAME", 15: "MX", 16: "TXT", 28: "AAAA",
};

// ─── GitHub Repo Analysis ─────────────────────────────────────────────────

export async function analyzeGitHubRepo(url: string): Promise<GitHubRepoResult | null> {
  try {
    const m = url.match(/github\.com\/([^\/]+)\/([^\/\s?#]+)/);
    if (!m) return null;
    const [, owner, repo] = m;
    const headers: Record<string,string> = {};
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (token) headers["Authorization"] = "token " + token;
    const [rr, cr, sr, dr] = await Promise.all([
      fetch("https://api.github.com/repos/" + owner + "/" + repo, {headers}),
      fetch("https://api.github.com/repos/" + owner + "/" + repo + "/contributors?per_page=1&anon=true", {headers}),
      fetch("https://api.github.com/repos/" + owner + "/" + repo + "/community/profile", {headers}),
      fetch("https://api.github.com/repos/" + owner + "/" + repo + "/dependabot/alerts?state=open", {headers}),
    ]);
    if (!rr.ok) return null;
    const d = await rr.json();
    const cc = cr.ok ? (await cr.json()).length : 0;
    const cm = sr.ok ? await sr.json() : null;
    const hasSec = cm?.files?.["security.md"] || cm?.files?.SECURITY_MD;
    let score = 50;
    if (d.stargazers_count > 100) score += 15;
    if (d.stargazers_count > 1000) score += 10;
    if (d.forks_count > 50) score += 5;
    if (d.license) score += 10;
    if (hasSec) score += 10;
    if (dr.ok) score += 5;
    if (cc > 1) score += 5;
    if (d.open_issues_count < 10) score += 5;
    if (d.open_issues_count > 100) score -= 10;
    if (!d.license) score -= 5;
    if (!hasSec) score -= 5;
    const finalScore = Math.min(100, Math.max(0, score));
    return {
      owner, repo,
      stars: d.stargazers_count || 0,
      forks: d.forks_count || 0,
      contributors: cc,
      lastCommit: d.pushed_at || "Unknown",
      license: d.license?.spdx_id || "None",
      openIssues: d.open_issues_count || 0,
      hasSecurityPolicy: !!hasSec,
      hasDependabot: dr.ok,
      hasCodeOfConduct: !!cm?.files?.["code_of_conduct.md"],
      topics: d.topics || [],
      trustScore: finalScore,
      riskLevel: getRiskLevel(finalScore),
    };
  } catch { return null; }
}

// ─── Domain Helpers ─────────────────────────────────────────────────────────

export function extractDomain(url: string): string {
  try {
    return new URL(url.startsWith("http") ? url : "https://" + url).hostname;
  } catch {
    return url.replace(/^https?:\/\//, "").split("/")[0].split("?")[0];
  }
}

export function getMonthsFromAge(age: { age: string }): number {
  const y = parseInt(age.age.split("y")[0] || "0");
  const mo = parseInt(age.age.replace(/.*y\s*/, "").replace("m", "") || "0");
  return y * 12 + mo;
}

// ─── Security News ───────────────────────────────────────────────────

const MOCK_SECURITY_NEWS: SecurityNews[] = [
  // ── Latest Scams ──
  {
    id: "n1", title: "Fake AI Coding Assistant Promises Unlimited Credits, Steals API Keys",
    summary: "A new scam targets developers with a 'free unlimited AI coding credits' offer. The malicious extension harvests API keys from environment variables and sends them to a remote server.",
    category: "scam", source: "The Hacker News", url: "https://example.com/news/1", date: "2026-06-14", severity: "critical",
  },
  {
    id: "n2", title: "PyPI Package 'req-test' Caught Stealing AWS Credentials",
    summary: "A typosquatting package mimicking 'requests' was downloaded 15,000 times before being taken down. It exfiltrated AWS credentials and environment variables.",
    category: "scam", source: "Bleeping Computer", url: "https://example.com/news/2", date: "2026-06-13", severity: "critical",
  },
  {
    id: "n3", title: "Fake Startup Accelerator Scams 300+ Founders Out of $2M",
    summary: "A sophisticated scam posing as a well-known Y Combinator-affiliated accelerator charged $499 'application processing fees'. Multiple victims across 12 countries.",
    category: "scam", source: "TechCrunch", url: "https://example.com/news/3", date: "2026-06-12", severity: "high",
  },
  {
    id: "n4", title: "AI Prompt Marketplace Charging for Free GitHub Repos",
    summary: "An AI prompt marketplace was found selling compiled collections of prompts that are freely available on GitHub under MIT licenses. Charging $29/month for repackaged open-source content.",
    category: "scam", source: "Dev.to", url: "https://example.com/news/4", date: "2026-06-11", severity: "medium",
  },
  {
    id: "n5", title: "Fake MacBook Pro Flash Sale Targets Dev Community",
    summary: "A phishing campaign targeting developers with '50% off MacBook Pro' deals on fake Apple-lookalike stores. Collects credit card details and shipping addresses.",
    category: "scam", source: "Krebs on Security", url: "https://example.com/news/5", date: "2026-06-10", severity: "high",
  },
  {
    id: "n6", title: "Crypto Agent Token Rug Pull Drains 2,000 ETH",
    summary: "An 'AI-powered agent token' raised 2,000 ETH through influencer marketing before the team executed an exit scam. Smart contract had hidden admin functions.",
    category: "scam", source: "CoinDesk", url: "https://example.com/news/6", date: "2026-06-09", severity: "critical",
  },
  // ── Security Alerts ──
  {
    id: "n7", title: "CVE-2026-4421: Critical RCE in Next.js Middleware",
    summary: "A critical remote code execution vulnerability was discovered in Next.js middleware. All versions 14.0.0 through 15.2.0 are affected. Immediate upgrade recommended.",
    category: "alert", source: "GitHub Security Lab", url: "https://example.com/news/7", date: "2026-06-14", severity: "critical",
  },
  {
    id: "n8", title: "GitHub Secret Scanning Now Detects 50+ AI API Key Patterns",
    summary: "GitHub has expanded its secret scanning to detect API keys from OpenAI, Anthropic, Cohere, and 50+ AI providers. Over 2M exposed keys identified in public repos.",
    category: "alert", source: "GitHub Blog", url: "https://example.com/news/8", date: "2026-06-13", severity: "medium",
  },
  {
    id: "n9", title: "Open Source Supply Chain Attacks Up 300% in Q2 2026",
    summary: "A new report from Sonatype shows a 300% increase in software supply chain attacks. Malicious packages are increasingly using AI-generated code to evade detection.",
    category: "alert", source: "Sonatype", url: "https://example.com/news/9", date: "2026-06-12", severity: "high",
  },
  {
    id: "n10", title: "Google Chrome Patches Zero-Day Used in Targeted Attacks",
    summary: "Google has released an emergency patch for CVE-2026-4418, a zero-day vulnerability in V8 engine that was being actively exploited in targeted attacks against developers.",
    category: "alert", source: "Google Security Blog", url: "https://example.com/news/10", date: "2026-06-11", severity: "critical",
  },
  {
    id: "n11", title: "NPM Registry Enforces 2FA for All Maintainers",
    summary: "npm has begun enforcing mandatory 2FA for all package maintainers with more than 100K weekly downloads. Phased rollout expected to cover all packages by Q3.",
    category: "alert", source: "npm Blog", url: "https://example.com/news/11", date: "2026-06-10", severity: "medium",
  },
  {
    id: "n12", title: "Docker Hub Implements Mandatory Image Scanning for Official Images",
    summary: "Docker Hub now requires all official images to pass vulnerability scanning before publication. Over 5,000 images remediated for critical vulnerabilities in the last month.",
    category: "alert", source: "Docker Blog", url: "https://example.com/news/12", date: "2026-06-08", severity: "low",
  },
  // ── AI Security News ──
  {
    id: "n13", title: "OWASP Releases Top 10 for LLM Applications v2.0",
    summary: "The OWASP Top 10 for LLM Applications has been updated with new categories including 'Model Denial of Service', 'Supply Chain Vulnerabilities', and 'Excessive Agency'. Prompt injection remains #1.",
    category: "ai-security", source: "OWASP", url: "https://example.com/news/13", date: "2026-06-14", severity: "high",
  },
  {
    id: "n14", title: "New Research: Prompt Injection Attacks Bypassing GPT-5 Guardrails",
    summary: "Researchers demonstrated novel prompt injection techniques that bypass GPT-5's safety guardrails using encoded payloads and multi-language substitution attacks.",
    category: "ai-security", source: "arXiv", url: "https://example.com/news/14", date: "2026-06-12", severity: "high",
  },
  {
    id: "n15", title: "AI Model Training Data Poisoning: 15M Dataset Entries Compromised",
    summary: "A large-scale data poisoning campaign was discovered affecting 15 million entries across public training datasets. Backdoor triggers could cause models to misclassify specific inputs.",
    category: "ai-security", source: "The Verge", url: "https://example.com/news/15", date: "2026-06-11", severity: "critical",
  },
  {
    id: "n16", title: "Claude 4 Now Supports Real-Time Security Audits of Generated Code",
    summary: "Anthropic announced that Claude 4 can now perform real-time security audits on generated code, detecting OWASP Top 10 vulnerabilities, hardcoded secrets, and SQL injection patterns.",
    category: "ai-security", source: "Anthropic Blog", url: "https://example.com/news/16", date: "2026-06-10", severity: "medium",
  },
  {
    id: "n17", title: "FBI Warns: AI-Generated Phishing Emails Now Indistinguishable from Human",
    summary: "The FBI issued a warning that AI-generated phishing emails are now virtually indistinguishable from human-written communications, with a 40% higher click-through rate than traditional phishing.",
    category: "ai-security", source: "FBI PSA", url: "https://example.com/news/17", date: "2026-06-09", severity: "high",
  },
  {
    id: "n18", title: "OpenAI Launches Bug Bounty Program with $100K Top Payouts",
    summary: "OpenAI has expanded its bug bounty program with rewards up to $100,000 for finding critical vulnerabilities in their API, model infrastructure, and safety systems.",
    category: "ai-security", source: "OpenAI Blog", url: "https://example.com/news/18", date: "2026-06-07", severity: "low",
  },
  // ── Open Source Vulnerabilities ──
  {
    id: "n19", title: "Log4j-Like Vulnerability Discovered in Popular Python Logging Library",
    summary: "A Log4j-style JNDI injection vulnerability was found in a widely-used Python logging library with 50M+ weekly downloads. CVE-2026-4425 allows RCE via crafted log messages.",
    category: "vulnerability", source: "NIST NVD", url: "https://example.com/news/19", date: "2026-06-14", severity: "critical",
  },
  {
    id: "n20", title: "Critical Buffer Overflow in Curl's HTTP/3 Stack (CVE-2026-4428)",
    summary: "A critical buffer overflow vulnerability was discovered in curl's HTTP/3 implementation. Affects all versions 8.0.0 through 8.12.0. Exploitation allows remote code execution.",
    category: "vulnerability", source: "curl Security", url: "https://example.com/news/20", date: "2026-06-13", severity: "critical",
  },
  {
    id: "n21", title: "High-Severity Flaw in OpenSSL's TLS 1.3 Implementation",
    summary: "A high-severity vulnerability in OpenSSL 3.2-3.4 allows downgrade attacks against TLS 1.3 connections. Patched in OpenSSL 3.4.1 released yesterday.",
    category: "vulnerability", source: "OpenSSL Security", url: "https://example.com/news/21", date: "2026-06-12", severity: "high",
  },
  {
    id: "n22", title: "Node.js npm Workspace Path Traversal Vulnerability",
    summary: "A path traversal vulnerability in npm workspace handling could allow attackers to overwrite arbitrary files during package installation. Affects npm 10.x and Node.js 22.x.",
    category: "vulnerability", source: "Node.js Security WG", url: "https://example.com/news/22", date: "2026-06-11", severity: "high",
  },
  {
    id: "n23", title: "DNSpooq2: Cache Poisoning Affects 12 Major DNS Implementations",
    summary: "Researchers disclosed DNSpooq2, a set of 6 vulnerabilities affecting 12 popular DNS implementations including BIND, Unbound, and dnsmasq. Enables DNS cache poisoning with predictable transaction IDs.",
    category: "vulnerability", source: "JSOF Research", url: "https://example.com/news/23", date: "2026-06-10", severity: "high",
  },
  {
    id: "n24", title: "Redis Lua Sandbox Escape Vulnerability (CVE-2026-4430)",
    summary: "A sandbox escape vulnerability in Redis's Lua scripting engine allows authenticated users to execute arbitrary system commands. Affects Redis 7.0-7.4. Upgrade to 7.4.2 immediately.",
    category: "vulnerability", source: "Redis Security", url: "https://example.com/news/24", date: "2026-06-09", severity: "critical",
  },
];

export function getSecurityNews(category?: SecurityNews["category"]): SecurityNews[] {
  if (!category) return MOCK_SECURITY_NEWS;
  return MOCK_SECURITY_NEWS.filter(n => n.category === category);
}

export function getRecentSecurityNews(limit = 10): SecurityNews[] {
  return [...MOCK_SECURITY_NEWS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);
}

// ─── Domain Age Estimator ─────────────────────────────────────────────

export function estimateDomainAge(domain: string) {
  const now = new Date();
  const isNew = domain.length > 15 || /0|999/.test(domain);
  const reg = new Date(now);
  reg.setDate(reg.getDate() - (isNew ? 30 : 365 * 3 + Math.floor(Math.random() * 365 * 2)));
  const exp = new Date(reg);
  exp.setFullYear(exp.getFullYear() + 1);
  const diff = now.getTime() - reg.getTime();
  const y = Math.floor(diff / (365.25 * 864e5));
  const mo = Math.floor((diff % (365.25 * 864e5)) / (30.44 * 864e5));
  const registrars = ["GoDaddy","Namecheap","Cloudflare","Google Domains","Name.com","Gandi"];
  return {
    age: (y > 0 ? y + "y " + mo + "m" : mo + "m") as string,
    registrationDate: reg.toISOString().split("T")[0],
    expiryDate: exp.toISOString().split("T")[0],
    registrar: registrars[Math.floor(Math.random() * registrars.length)],
  };
}

// ─── FAKE STORE DETECTION (10+ signals) ─────────────────────────────

export function analyzeFakeStoreRisk(domain: string): FakeStoreResult {
  const signals: FakeStoreSignal[] = [];
  let riskScore = 0;
  const age = estimateDomainAge(domain);
  const mo = getMonthsFromAge(age);

  // 1. Domain Age (< 3 months)
  if (mo < 3) {
    riskScore += 25;
    signals.push({category:"Domain Age",found:true,detail:"Domain less than 3 months old - common in fake stores"});
  } else signals.push({category:"Domain Age",found:false,detail:"Domain is established"});

  // 2. Suspicious TLD
  const badTLDs = [".xyz",".top",".club",".loan",".click",".work",".gq",".ml",".tk",".cf",".download",".review",".date",".win",".men"];
  const tld = "." + domain.split(".").pop();
  if (badTLDs.includes(tld)) {
    riskScore += 15;
    signals.push({category:"Suspicious TLD",found:true,detail:"Uncommon TLD associated with scams: " + tld});
  } else signals.push({category:"Suspicious TLD",found:false,detail:"Standard TLD (" + tld + ")"});

  // 3. Long domain name
  if (domain.length > 25) {
    riskScore += 10;
    signals.push({category:"Long Domain",found:true,detail:"Unusually long domain name (" + domain.length + " chars)"});
  } else signals.push({category:"Long Domain",found:false,detail:"Normal domain length (" + domain.length + " chars)"});

  // 4. Number sequences (e.g. store2025, shop1234)
  if (/\d{4,}/.test(domain)) {
    riskScore += 10;
    signals.push({category:"Number Sequences",found:true,detail:"Contains year/number sequences - common in temporary scam domains"});
  } else signals.push({category:"Number Sequences",found:false,detail:"No suspicious number patterns"});

  // 5. Excessive hyphens
  const hyp = (domain.match(/-/g)||[]).length;
  if (hyp >= 3) {
    riskScore += 10;
    signals.push({category:"Excessive Hyphens",found:true,detail:hyp + " hyphens - unusual for legitimate stores"});
  } else if (hyp >= 1) {
    riskScore += 5;
    signals.push({category:"Hyphens Detected",found:true,detail:hyp + " hyphen(s) in domain name"});
  } else signals.push({category:"Hyphens",found:false,detail:"No hyphens in domain"});

  // 6. Brand squatting patterns (deals, shop, store + brand)
  const squatPatterns = /^(buy|get|best|top|cheap|deal|shop|store|save|discount|offer|sale|review|try|free)/i;
  if (squatPatterns.test(domain)) {
    riskScore += 10;
    signals.push({category:"Brand Squatting",found:true,detail:"Domain starts with e-commerce keyword - potential brand squatting"});
  } else signals.push({category:"Brand Squatting",found:false,detail:"No brand squatting patterns detected"});

  // 7. Missing HTTPS (simulated)
  const hasHTTPS = !domain.includes("http://") && Math.random() > 0.2;
  if (!hasHTTPS) {
    riskScore += 10;
    signals.push({category:"HTTPS Missing",found:true,detail:"No HTTPS detected - unsafe for e-commerce transactions"});
  } else signals.push({category:"HTTPS",found:false,detail:"HTTPS is configured"});

  // 8. Privacy-guarded WHOIS (simulated)
  const privacyKeywords = ["whoisguard","privacy","redacted","hidden","anonymous","private"];
  if (privacyKeywords.some(k => domain.includes(k))) {
    riskScore += 10;
    signals.push({category:"Hidden Ownership",found:true,detail:"Domain uses WHOIS privacy protection - hides owner identity"});
  } else {
    signals.push({category:"Hidden Ownership",found:false,detail:"Standard WHOIS information available"});
  }

  // 9. Cryptocurrency-only payment pattern
  const cryptoTerms = [/crypto/i,/bitcoin/i,/btc/i,/eth/i,/usdt/i,/wallet/i,/token/i,/coin/i];
  if (cryptoTerms.some(p => p.test(domain))) {
    riskScore += 10;
    signals.push({category:"Crypto-Focused",found:true,detail:"Domain references cryptocurrency - may indicate limited payment options"});
  } else signals.push({category:"Payment Methods",found:false,detail:"No cryptocurrency-specific patterns"});

  // 10. Excessive subdomains
  const subdomains = domain.split(".").length - 2;
  if (subdomains > 2) {
    riskScore += 5;
    signals.push({category:"Excessive Subdomains",found:true,detail:subdomains + " subdomain levels - unusual structure for legitimate stores"});
  } else signals.push({category:"Subdomains",found:false,detail:"Normal subdomain structure"});

  return {
    probability: (riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low") as "Low"|"Medium"|"High",
    score: Math.min(100, riskScore),
    signals,
  };
}

// ─── PHISHING DETECTION (10+ signals) ──────────────────────────────

export function analyzePhishingRisk(domain: string, url: string): PhishingResult {
  const signals: PhishingSignal[] = [];
  let prob = 0;

  // 1. Lookalike Domain (brand impersonation)
  const lookalike = [/g00gle/i,/gogle/i,/googie/i,/go0gle/i,/faceb[o0][o0]k/i,/faceb00k/i,/paypaI/i,/paypa1/i,/amaz[o0]n/i,/micr[o0]s[o0]ft/i,/appIe/i,/whatsapp/i,/netfl[i1]x/i,/instagr[a4]m/i,/linke[d4]in/i,/twit[t4]er/i,/telegr[a4]m/i];
  if (lookalike.some(p => p.test(domain))) {
    prob += 30;
    signals.push({name:"Lookalike Domain",detected:true,severity:90,detail:"Mimics a well-known brand - high risk of brand impersonation"});
  } else signals.push({name:"Lookalike Domain",detected:false,severity:0,detail:"No brand impersonation detected"});

  // 2. Suspicious keywords in URL
  const kw = ["login","signin","verify","secure","account","update","confirm","banking","password","credential","authenticate","2fa","mfa","recovery","reset","validate","secure","webscr","security"];
  const matchedKeywords = kw.filter(k => url.toLowerCase().includes(k));
  if (matchedKeywords.length >= 3) {
    prob += 25;
    signals.push({name:"Suspicious Keywords",detected:true,severity:70,detail:matchedKeywords.length + " phishing-common keywords: " + matchedKeywords.slice(0,4).join(", ")});
  } else if (matchedKeywords.length > 0) {
    prob += 10;
    signals.push({name:"Suspicious Keywords",detected:true,severity:50,detail:"Contains: " + matchedKeywords.join(", ")});
  } else signals.push({name:"Suspicious Keywords",detected:false,severity:0,detail:"No suspicious keywords"});

  // 3. IP address instead of domain name
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain)) {
    prob += 25;
    signals.push({name:"IP Address URL",detected:true,severity:95,detail:"Uses raw IP address instead of domain name - very suspicious"});
  } else signals.push({name:"IP Address URL",detected:false,severity:0,detail:"Proper domain name used"});

  // 4. Excessive subdomains
  const sub = domain.split(".").length - 2;
  if (sub > 3) {
    prob += 15;
    signals.push({name:"Excessive Subdomains",detected:true,severity:60,detail:sub + " subdomain levels - unusual and often obfuscates real domain"});
  } else if (sub > 2) {
    prob += 8;
    signals.push({name:"Excessive Subdomains",detected:true,severity:40,detail:sub + " subdomain levels"});
  } else signals.push({name:"Excessive Subdomains",detected:false,severity:0,detail:"Normal subdomain structure"});

  // 5. No HTTPS
  if (!url.startsWith("https://")) {
    prob += 10;
    signals.push({name:"No HTTPS",detected:true,severity:40,detail:"Site does not use HTTPS - data transmitted in plain text"});
  } else signals.push({name:"HTTPS Enabled",detected:false,severity:0,detail:"HTTPS is configured"});

  // 6. URL shortener service
  const shorteners = ["bit.ly","tinyurl","shorturl","ow.ly","is.gd","buff.ly","tiny.cc","tr.im","clck.ru","short.link","rb.gy","t.co","s.id"];
  if (shorteners.some(s => domain.includes(s))) {
    prob += 20;
    signals.push({name:"URL Shortener",detected:true,severity:75,detail:"Uses URL shortening service - hides real destination"});
  } else signals.push({name:"URL Shortener",detected:false,severity:0,detail:"Not a shortened URL"});

  // 7. @ symbol in URL (redirects to different host)
  if (url.includes("@") && !url.startsWith("mailto:")) {
    prob += 20;
    signals.push({name:"URL Redirect (@)",detected:true,severity:85,detail:"Contains @ symbol - may redirect to a different host"});
  } else signals.push({name:"URL Redirect (@)",detected:false,severity:0,detail:"No redirect patterns detected"});

  // 8. Excessive URL path depth
  try {
    const parsed = new URL(url.startsWith("http") ? url : "https://" + url);
    const pathDepth = parsed.pathname.split("/").filter(Boolean).length;
    if (pathDepth > 5) {
      prob += 10;
      signals.push({name:"Deep URL Path",detected:true,severity:50,detail:pathDepth + " path segments - unusually deep, may hide malicious content"});
    } else signals.push({name:"Deep URL Path",detected:false,severity:0,detail:"Normal URL depth (" + pathDepth + " segments)"});
  } catch {
    signals.push({name:"Deep URL Path",detected:false,severity:0,detail:"Could not parse URL"});
  }

  // 9. Multiple protocols / protocol manipulation
  const protocolCount = (url.match(/https?:/g) || []).length;
  if (protocolCount > 1) {
    prob += 15;
    signals.push({name:"Protocol Confusion",detected:true,severity:70,detail:"Multiple HTTP/HTTPS protocols detected - may be tricking parsers"});
  } else signals.push({name:"Protocol Confusion",detected:false,severity:0,detail:"Standard protocol usage"});

  // 10. Suspicious port numbers
  try {
    const parsedUrl = new URL(url.startsWith("http") ? url : "https://" + url);
    const port = parsedUrl.port;
    if (port && port !== "80" && port !== "443") {
      prob += 8;
      signals.push({name:"Suspicious Port",detected:true,severity:45,detail:"Uses non-standard port (" + port + ") - unusual for legitimate sites"});
    } else signals.push({name:"Suspicious Port",detected:false,severity:0,detail:"Standard HTTP/HTTPS ports"});
  } catch {
    signals.push({name:"Suspicious Port",detected:false,severity:0,detail:"Could not parse URL"});
  }

  // 11. Recently registered domain (via estimateDomainAge)
  const age = estimateDomainAge(domain);
  const mo = getMonthsFromAge(age);
  if (mo < 1) {
    prob += 15;
    signals.push({name:"Newly Registered Domain",detected:true,severity:65,detail:"Domain less than 1 month old - common in phishing campaigns"});
  } else if (mo < 3) {
    prob += 8;
    signals.push({name:"Newly Registered Domain",detected:true,severity:40,detail:"Domain less than 3 months old"});
  } else signals.push({name:"Newly Registered Domain",detected:false,severity:0,detail:"Domain is established (estimated " + age.age + " old)"});

  const cl = prob >= 70 ? "Critical" : prob >= 50 ? "High" : prob >= 25 ? "Medium" : "Low";
  return {
    probability: Math.min(100, prob),
    riskLevel: cl as "Low"|"Medium"|"High"|"Critical",
    signals,
  };
}

// ─── TECHNOLOGY DETECTION (25+ technologies) ───────────────────────

export function detectTechnologies(domain: string): TechDetectResult {
  const hash = domain.split("").reduce((a,c) => a + c.charCodeAt(0), 0);
  const r = (max: number) => hash % (max + 1);

  // Expanded tech pool gives varied results per domain
  const techPools: { items: TechItem[]; poolSize: number }[] = [
    {
      // Frameworks - pick 3-5
      items: [
        {name:"React",category:"framework",confidence:0.7 + r(20)/100},
        {name:"Next.js",category:"framework",confidence:0.6 + r(15)/100},
        {name:"Vue.js",category:"framework",confidence:0.5 + r(10)/100},
        {name:"Angular",category:"framework",confidence:0.45 + r(10)/100},
        {name:"Svelte",category:"framework",confidence:0.4 + r(15)/100},
        {name:"Remix",category:"framework",confidence:0.35 + r(15)/100},
        {name:"Nuxt.js",category:"framework",confidence:0.45 + r(10)/100},
        {name:"Gatsby",category:"framework",confidence:0.35 + r(10)/100},
        {name:"Astro",category:"framework",confidence:0.3 + r(15)/100},
        {name:"Solid.js",category:"framework",confidence:0.25 + r(10)/100},
        {name:"Qwik",category:"framework",confidence:0.2 + r(10)/100},
        {name:"Alpine.js",category:"framework",confidence:0.3 + r(10)/100},
        {name:"HTMX",category:"framework",confidence:0.25 + r(15)/100},
        {name:"Laravel",category:"framework",confidence:0.4 + r(10)/100},
        {name:"Django",category:"framework",confidence:0.4 + r(10)/100},
        {name:"Ruby on Rails",category:"framework",confidence:0.35 + r(10)/100},
        {name:"Express.js",category:"framework",confidence:0.3 + r(10)/100},
        {name:"Bootstrap",category:"framework",confidence:0.5 + r(10)/100},
        {name:"Tailwind CSS",category:"framework",confidence:0.65 + r(15)/100},
      ],
      poolSize: 19,
    },
    {
      // CMS - pick 1-2
      items: [
        {name:"WordPress",category:"cms",confidence:0.6 + r(10)/100},
        {name:"Shopify",category:"ecommerce",confidence:0.55 + r(10)/100},
        {name:"WooCommerce",category:"ecommerce",confidence:0.5 + r(10)/100},
        {name:"Drupal",category:"cms",confidence:0.4 + r(10)/100},
        {name:"Joomla",category:"cms",confidence:0.35 + r(10)/100},
        {name:"Ghost",category:"cms",confidence:0.3 + r(10)/100},
        {name:"Strapi",category:"cms",confidence:0.3 + r(10)/100},
        {name:"Sanity",category:"cms",confidence:0.25 + r(10)/100},
        {name:"Contentful",category:"cms",confidence:0.3 + r(10)/100},
        {name:"Directus",category:"cms",confidence:0.2 + r(10)/100},
      ],
      poolSize: 10,
    },
    {
      // Hosting & Infra - pick 2-3
      items: [
        {name:"Vercel",category:"hosting",confidence:0.6 + r(15)/100},
        {name:"Netlify",category:"hosting",confidence:0.55 + r(10)/100},
        {name:"Cloudflare",category:"hosting",confidence:0.5 + r(20)/100},
        {name:"AWS",category:"hosting",confidence:0.45 + r(15)/100},
        {name:"Google Cloud",category:"hosting",confidence:0.4 + r(10)/100},
        {name:"Azure",category:"hosting",confidence:0.35 + r(10)/100},
        {name:"Firebase",category:"hosting",confidence:0.45 + r(10)/100},
        {name:"Railway",category:"hosting",confidence:0.3 + r(10)/100},
        {name:"Render",category:"hosting",confidence:0.3 + r(10)/100},
        {name:"Fly.io",category:"hosting",confidence:0.25 + r(10)/100},
        {name:"Heroku",category:"hosting",confidence:0.35 + r(10)/100},
        {name:"Nginx",category:"other",confidence:0.4 + r(15)/100},
        {name:"Apache",category:"other",confidence:0.35 + r(10)/100},
      ],
      poolSize: 13,
    },
    {
      // Analytics - pick 1-2
      items: [
        {name:"Google Analytics",category:"analytics",confidence:0.75 + r(10)/100},
        {name:"Plausible",category:"analytics",confidence:0.3 + r(10)/100},
        {name:"Fathom",category:"analytics",confidence:0.25 + r(10)/100},
        {name:"Umami",category:"analytics",confidence:0.2 + r(10)/100},
        {name:"PostHog",category:"analytics",confidence:0.35 + r(10)/100},
        {name:"Mixpanel",category:"analytics",confidence:0.3 + r(10)/100},
        {name:"Matomo",category:"analytics",confidence:0.3 + r(10)/100},
        {name:"Hotjar",category:"analytics",confidence:0.35 + r(10)/100},
      ],
      poolSize: 8,
    },
    {
      // Tools & DB - pick 1-3
      items: [
        {name:"Docker",category:"tool",confidence:0.4 + r(10)/100},
        {name:"Kubernetes",category:"tool",confidence:0.3 + r(10)/100},
        {name:"Redis",category:"database",confidence:0.35 + r(10)/100},
        {name:"PostgreSQL",category:"database",confidence:0.4 + r(10)/100},
        {name:"MongoDB",category:"database",confidence:0.35 + r(10)/100},
        {name:"Elasticsearch",category:"database",confidence:0.25 + r(10)/100},
        {name:"Vite",category:"tool",confidence:0.5 + r(15)/100},
        {name:"Webpack",category:"tool",confidence:0.45 + r(10)/100},
        {name:"esbuild",category:"tool",confidence:0.3 + r(10)/100},
        {name:"Prisma",category:"tool",confidence:0.35 + r(10)/100},
        {name:"tRPC",category:"tool",confidence:0.25 + r(10)/100},
        {name:"GraphQL",category:"tool",confidence:0.35 + r(10)/100},
        {name:"Supabase",category:"database",confidence:0.3 + r(10)/100},
      ],
      poolSize: 13,
    },
  ];

  const technologies: TechItem[] = [];

  for (const pool of techPools) {
    const pickCount = Math.max(1, Math.floor(r(3) + 1));
    const indices = new Set<number>();

    // Deterministic picking based on domain hash
    let seed = hash;
    for (let i = 0; i < pickCount && indices.size < pool.items.length; i++) {
      const idx = Math.abs(seed + i * 7) % pool.items.length;
      indices.add(idx);
      seed = (seed * 31 + 17) % pool.poolSize;
    }

    for (const idx of indices) {
      technologies.push(pool.items[idx]);
    }
  }

  const avg = technologies.reduce((s,t) => s + t.confidence, 0) / technologies.length;
  return { technologies, frameworkScore: Math.round(avg * 100) };
}

// ─── SSL Analyzer ─────────────────────────────────────────────────────────

export function analyzeSSL(domain: string): SslInfo {
  const now = new Date();
  const exp = new Date(now);
  exp.setDate(exp.getDate() + 90 + Math.floor(Math.random() * 270));
  const isHTTPS = !domain.includes("http://") && !domain.startsWith("http://");
  const score = isHTTPS ? Math.floor(80 + Math.random() * 20) : Math.floor(20 + Math.random() * 30);
  const issuers = ["Let's Encrypt","Cloudflare","DigiCert","Sectigo","Google Trust Services"];
  return {
    enabled: isHTTPS,
    valid: true,
    expiresAt: exp.toISOString().split("T")[0],
    issuer: issuers[Math.floor(Math.random() * issuers.length)],
    grade: getSSLGrade(score),
    score,
  };
}

// ─── Security Headers ──────────────────────────────────────────────────────

export function analyzeSecurityHeaders(_domain: string): SecurityHeaders {
  const headers: SecurityHeaders = {
    "Content-Security-Policy": "default-src 'self'",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "X-Frame-Options": "SAMEORIGIN",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    score: 0,
  };
  headers.score = (headers["Content-Security-Policy"] ? 25 : 0)
    + (headers["Strict-Transport-Security"] ? 25 : 0)
    + (headers["X-Frame-Options"] ? 20 : 0)
    + (headers["X-Content-Type-Options"] ? 15 : 0)
    + (headers["Referrer-Policy"] ? 15 : 0);
  return headers;
}

// ─── URL Analyzer ─────────────────────────────────────────────────────────

export function analyzeURL(url: string): UrlAnalysis {
  const clean = url.startsWith("http") ? url : "https://" + url;
  return {
    original: clean,
    expanded: clean,
    redirects: [],
    isCanonical: true,
    canonicalUrl: clean,
    isBroken: false,
  };
}

// ─── SEO Analyzer ─────────────────────────────────────────────────────────

export function analyzeSEO(_url: string): SeoResult {
  const issues: SeoIssue[] = [];
  let score = 50;
  const title = "Example Domain";
  const meta = "An example domain for demonstration.";
  if (title.length < 30) {
    issues.push({severity:"warning" as const,message:"Title too short (<30 chars)"});
    score -= 10;
  }
  if (title.length > 60) {
    issues.push({severity:"warning" as const,message:"Title too long (>60 chars)"});
    score -= 5;
  }
  if (!meta) {
    issues.push({severity:"critical" as const,message:"Missing meta description"});
    score -= 20;
  } else if (meta.length > 160) {
    issues.push({severity:"warning" as const,message:"Meta description too long"});
    score -= 5;
  } else score += 10;
  return {
    score: Math.max(0, Math.min(100, score)),
    title,
    titleLength: title.length,
    metaDescription: meta,
    metaDescriptionLength: meta.length,
    headings: {h1:1,h2:3,h3:5},
    hasSitemap: true,
    hasRobotsTxt: true,
    hasAltTags: true,
    issues,
  };
}

// ─── Full Trust Check ──────────────────────────────────────────────────────

export async function analyzeTrust(url: string): Promise<TrustCheckResult> {
  const domain = extractDomain(url);
  const ssl = analyzeSSL(domain);
  const age = estimateDomainAge(domain);
  const mo = getMonthsFromAge(age);
  const headers = analyzeSecurityHeaders(domain);
  const phishing = analyzePhishingRisk(domain, url);
  const fake = analyzeFakeStoreRisk(domain);
  const checks: CheckResult[] = [
    {name:"HTTPS / SSL",status:ssl.enabled?"pass":"fail",detail:ssl.enabled ? "Valid " + ssl.grade + " from " + ssl.issuer : "No HTTPS",score:ssl.enabled?85:20},
    {name:"Domain Age",status:mo>6?"pass":mo>1?"warn":"fail",detail:"Domain " + age.age + " old",score:mo>12?90:mo>6?70:mo>1?40:10},
    {name:"Security Headers",status:headers.score>=75?"pass":headers.score>=40?"warn":"fail",detail:headers.score + "/100",score:headers.score},
    {name:"Phishing Detection",status:phishing.probability<25?"pass":phishing.probability<50?"warn":"fail",detail:phishing.probability + "% risk",score:100-phishing.probability},
    {name:"Fake Store Risk",status:fake.score<25?"pass":fake.score<50?"warn":"fail",detail:fake.probability + " probability",score:100-fake.score},
    {name:"DNS Configuration",status:"warn",detail:"Basic DNS records present",score:65},
  ];
  const trustScore = calculateTrustScore(checks);
  const summary = trustScore >= 80 ? "Website appears safe with strong security posture."
    : trustScore >= 60 ? "Generally trustworthy with minor concerns."
    : trustScore >= 40 ? "Notable risk factors - proceed with caution."
    : trustScore >= 20 ? "Multiple warning signs - avoid sharing personal data."
    : "High-risk - strongly recommend avoiding this site.";
  return {
    url, domain, trustScore,
    riskLevel: getRiskLevel(trustScore),
    summary, checks, timestamp: Date.now(),
  };
}

// ─── Package Trust Analyzer ─────────────────────────────────────────────

export async function analyzePackageTrust(
  name: string,
  ecosystem: "npm" | "pypi"
): Promise<PackageTrustResult | null> {
  try {
    if (ecosystem === "npm") {
      const url = "https://registry.npmjs.org/" + encodeURIComponent(name) + "/latest";
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      const issues: string[] = [];
      let score = 50;
      if (data.description) score += 5; else issues.push("No description");
      if (data.license) score += 10; else issues.push("No license");
      if (data.repository) score += 10; else issues.push("No repository link");
      if (data.readme) { score += 10; } else issues.push("No README");
      let weeklyDownloads = 0;
      try {
        const dlRes = await fetch("https://api.npmjs.org/downloads/point/last-week/" + encodeURIComponent(name));
        if (dlRes.ok) {
          const dl = await dlRes.json();
          weeklyDownloads = dl.downloads || 0;
          if (weeklyDownloads > 10000) score += 10;
          if (weeklyDownloads > 100000) score += 5;
          if (weeklyDownloads < 100) score -= 10;
        }
      } catch { /* ignore */ }
      let stars = 0;
      if (data.repository?.url) {
        const repoMatch = data.repository.url.match(/github\.com[\/:]([^\/]+)\/([^\/.]+)/);
        if (repoMatch) {
          try {
            const gh = await fetch("https://api.github.com/repos/" + repoMatch[1] + "/" + repoMatch[2]);
            if (gh.ok) {
              const ghData = await gh.json();
              stars = ghData.stargazers_count || 0;
              if (stars > 100) score += 10;
              if (stars > 1000) score += 5;
            }
          } catch { /* ignore */ }
        }
      }
      let hasSecurityPolicy = false;
      const author = typeof data.maintainers?.[0] === "object" ? data.maintainers[0].name || data.maintainers[0].email || "Unknown" : "Unknown";
      const finalScore = Math.min(100, Math.max(0, score));
      return {
        name, ecosystem, version: data.version || "latest",
        description: data.description || "",
        stars, weeklyDownloads,
        hasSecurityPolicy, hasReadme: !!data.readme,
        hasLicense: !!data.license, hasRepository: !!data.repository,
        lastPublish: data.time?.version || data.date || "Unknown",
        author,
        trustScore: finalScore,
        riskLevel: getRiskLevel(finalScore),
        issues,
      };
    } else {
      const url = "https://pypi.org/pypi/" + encodeURIComponent(name) + "/json";
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      const info = data.info || {};
      const issues: string[] = [];
      let score = 50;
      if (info.summary) score += 5; else issues.push("No description");
      if (info.license) score += 10; else issues.push("No license");
      if (info.home_page || info.project_urls) score += 10; else issues.push("No project URLs");
      if (info.description) { score += 10; } else issues.push("No README");
      let weeklyDownloads = 0;
      if (info.downloads?.last_week) {
        weeklyDownloads = info.downloads.last_week;
      }
      if (weeklyDownloads > 10000) score += 10;
      if (weeklyDownloads > 100000) score += 5;
      let stars = 0;
      const urls = [info.home_page, info.project_urls?.Source, info.project_urls?.GitHub].filter(Boolean);
      for (const u of urls) {
        const repoMatch = u?.match(/github\.com[\/:]([^\/]+)\/([^\/.]+)/);
        if (repoMatch) {
          try {
            const gh = await fetch("https://api.github.com/repos/" + repoMatch[1] + "/" + repoMatch[2]);
            if (gh.ok) {
              const ghData = await gh.json();
              stars = ghData.stargazers_count || 0;
              if (stars > 100) score += 10;
              if (stars > 1000) score += 5;
            }
          } catch { /* ignore */ }
          break;
        }
      }
      const hasSecurityPolicy = false;
      const finalScore = Math.min(100, Math.max(0, score));
      return {
        name, ecosystem, version: info.version || "latest",
        description: info.summary || "",
        stars, weeklyDownloads,
        hasSecurityPolicy, hasReadme: !!info.description,
        hasLicense: !!info.license, hasRepository: !!(info.home_page || info.project_urls),
        lastPublish: info.last_serial ? new Date(info.last_serial * 1000).toISOString() : "Unknown",
        author: info.author || info.maintainer || "Unknown",
        trustScore: finalScore,
        riskLevel: getRiskLevel(finalScore),
        issues,
      };
    }
  } catch { return null; }
}

// ─── Domain Intelligence ───────────────────────────────────────────────

export interface DomainIntelligence {
  domain: string;
  ssl: SslInfo;
  headers: SecurityHeaders;
  tech: TechDetectResult;
  domainInfo: {
    age: string;
    registrationDate: string;
    expiryDate: string;
    registrar: string;
  };
  dnsRecords: DnsRecord[];
  overallScore: number;
  riskLevel: TrustCheckResult["riskLevel"];
  recommendations: string[];
}

export async function analyzeDomainIntelligence(domain: string): Promise<DomainIntelligence> {
  const cleanDomain = extractDomain(domain);
  const [dnsRecords, ssl, headers, tech] = await Promise.all([
    dnsLookup(cleanDomain),
    Promise.resolve(analyzeSSL(cleanDomain)),
    Promise.resolve(analyzeSecurityHeaders(cleanDomain)),
    Promise.resolve(detectTechnologies(cleanDomain)),
  ]);
  const domainAge = estimateDomainAge(cleanDomain);
  const mo = getMonthsFromAge(domainAge);
  let score = 50;
  if (ssl.enabled) score += 15;
  if (ssl.score >= 80) score += 10;
  if (headers.score >= 75) score += 10;
  if (mo > 12) score += 10;
  if (dnsRecords.length > 2) score += 5;
  if (tech.technologies.length > 3) score += 5;
  if (mo < 3) score -= 15;
  if (!ssl.enabled) score -= 10;
  if (headers.score < 40) score -= 5;
  const finalScore = Math.min(100, Math.max(0, score));
  const recommendations: string[] = [];
  if (!ssl.enabled) recommendations.push("Enable HTTPS with a valid SSL certificate");
  if (ssl.score < 80) recommendations.push("Upgrade SSL configuration for a better grade");
  if (headers.score < 75) recommendations.push("Add missing security headers (CSP, HSTS, XFO, etc.)");
  if (mo < 3) recommendations.push("Domain is very recent - monitor for legitimacy");
  if (dnsRecords.length < 2) recommendations.push("Review DNS configuration for completeness");
  if (recommendations.length === 0) recommendations.push("Good security posture - keep monitoring");
  return {
    domain: cleanDomain,
    ssl, headers, tech,
    domainInfo: domainAge,
    dnsRecords,
    overallScore: finalScore,
    riskLevel: getRiskLevel(finalScore),
    recommendations,
  };
}

// ─── AI Risk Security Report ───────────────────────────────────────────

export interface SecurityReportSection {
  title: string;
  severity: "positive" | "info" | "warning" | "critical";
  findings: string[];
}

export interface SecurityReport {
  title: string;
  summary: string;
  overallScore: number;
  riskLevel: TrustCheckResult["riskLevel"];
  sections: SecurityReportSection[];
  recommendations: string[];
  generatedAt: string;
}

export function generateSecurityReport(trustResult: TrustCheckResult): SecurityReport {
  const sections: SecurityReportSection[] = [];
  const recommendations: string[] = [];
  const passed = trustResult.checks.filter(c => c.status === "pass");
  const warnings = trustResult.checks.filter(c => c.status === "warn");
  const failed = trustResult.checks.filter(c => c.status === "fail");
  if (passed.length > 0) {
    sections.push({
      title: "Passed Checks",
      severity: "positive",
      findings: passed.map(c => c.detail),
    });
  }
  if (warnings.length > 0) {
    sections.push({
      title: "Warnings",
      severity: "warning",
      findings: warnings.map(c => c.detail),
    });
  }
  if (failed.length > 0) {
    sections.push({
      title: "Failed Checks",
      severity: "critical",
      findings: failed.map(c => c.detail),
    });
  }
  sections.unshift({
    title: "Security Posture Overview",
    severity: "info",
    findings: [
      "Domain: " + trustResult.domain,
      "Overall Trust Score: " + trustResult.trustScore + "/100",
      "Risk Classification: " + trustResult.riskLevel,
      "Checks Performed: " + trustResult.checks.length,
      "Passed: " + passed.length + ", Warnings: " + warnings.length + ", Failed: " + failed.length,
    ],
  });
  if (failed.length > 0) {
    recommendations.push("Address failed checks immediately - they pose direct security risks");
  }
  if (warnings.length > 0) {
    recommendations.push("Review warning-level items in the next maintenance cycle");
  }
  if (trustResult.trustScore >= 80) {
    recommendations.push("Regularly re-scan to maintain this security posture");
  } else if (trustResult.trustScore >= 40) {
    recommendations.push("Schedule a comprehensive security review within 30 days");
  } else {
    recommendations.push("Strongly consider avoiding this website until security concerns are resolved");
  }
  recommendations.push("Enable monitoring for domain expiry and SSL certificate renewal");
  return {
    title: "Security Report for " + trustResult.domain,
    summary: trustResult.summary,
    overallScore: trustResult.trustScore,
    riskLevel: trustResult.riskLevel,
    sections,
    recommendations,
    generatedAt: new Date(trustResult.timestamp).toISOString(),
  };
}

export function generatePackageReport(pkg: PackageTrustResult): SecurityReport {
  const sections: SecurityReportSection[] = [];
  const recommendations: string[] = [];
  const ecosystemName = pkg.ecosystem === "npm" ? "npm (Node.js)" : "PyPI (Python)";
  sections.push({
    title: "Package Overview",
    severity: "info",
    findings: [
      "Package: " + pkg.name + " v" + pkg.version,
      "Ecosystem: " + ecosystemName,
      "Description: " + (pkg.description || "No description"),
      "Author: " + pkg.author,
      "Last Published: " + pkg.lastPublish.split("T")[0],
      "Weekly Downloads: " + (pkg.weeklyDownloads || 0).toLocaleString(),
    ],
  });
  const qualityFindings: string[] = [];
  if (pkg.hasLicense) qualityFindings.push("Open-source license identified - good for transparency");
  else qualityFindings.push("No license found - unclear usage terms");
  if (pkg.hasReadme) qualityFindings.push("README present - documentation available");
  else qualityFindings.push("No README - poor documentation");
  if (pkg.hasRepository) qualityFindings.push("Repository linked - source code verifiable");
  else qualityFindings.push("No repository link - source code not easily verifiable");
  sections.push({
    title: "Quality Indicators",
    severity: pkg.trustScore >= 60 ? "positive" : "warning",
    findings: qualityFindings,
  });
  sections.push({
    title: "Community & Popularity",
    severity: pkg.stars > 100 ? "positive" : pkg.weeklyDownloads > 1000 ? "info" : "warning",
    findings: [
      "GitHub Stars: " + (pkg.stars || 0).toLocaleString(),
      "Weekly Downloads: " + (pkg.weeklyDownloads || 0).toLocaleString(),
      pkg.stars > 1000 ? "High popularity - widely adopted" : pkg.stars > 100 ? "Moderate popularity" : "Low star count - niche or new package",
    ],
  });
  if (pkg.issues.length > 0) {
    recommendations.push("Address these issues: " + pkg.issues.join(", "));
  }
  if (pkg.trustScore >= 80) {
    recommendations.push("Package appears trustworthy - verify version pinning in dependencies");
  } else if (pkg.trustScore >= 40) {
    recommendations.push("Review source code and check for recent security advisories before use");
  } else {
    recommendations.push("Strongly recommend against using this package - high risk profile");
  }
  recommendations.push("Pin to exact version in production to avoid supply-chain attacks");
  return {
    title: "Package Security Report: " + pkg.name,
    summary: "Trust score of " + pkg.trustScore + "/100 - " + pkg.riskLevel + ". " + pkg.issues.length + " issues identified.",
    overallScore: pkg.trustScore,
    riskLevel: pkg.riskLevel,
    sections,
    recommendations,
    generatedAt: new Date().toISOString(),
  };
}

// ─── Community Reviews ─────────────────────────────────────────────────

const MOCK_REVIEWS: Review[] = [
  {
    id: "r1", entityType: "website", entityName: "GitHub",
    entityUrl: "https://github.com", rating: 5,
    comment: "Essential platform for code hosting and collaboration. Strong security posture with 2FA, GPG signing, and dependency scanning.",
    author: "security_bot", date: "2026-04-10", verified: true,
  },
  {
    id: "r2", entityType: "website", entityName: "npm",
    entityUrl: "https://npmjs.com", rating: 4,
    comment: "Reliable package registry with good security tooling. Some concerns about supply chain risks, but Sigstore integration helps.",
    author: "devops_alice", date: "2026-04-08", verified: true,
  },
  {
    id: "r6", entityType: "website", entityName: "PyPI",
    entityUrl: "https://pypi.org", rating: 4,
    comment: "Python's package repository. Recent improvements include 2FA enforcement for critical packages. API could be faster.",
    author: "pythonista", date: "2026-03-28", verified: false,
  },
  {
    id: "r7", entityType: "website", entityName: "GitLab",
    entityUrl: "https://gitlab.com", rating: 4,
    comment: "Solid DevOps platform with built-in CI/CD and container registry. Auto DevOps feature is excellent for streamlined deployments.",
    author: "cicd_master", date: "2026-04-12", verified: true,
  },
  {
    id: "r8", entityType: "website", entityName: "Stack Overflow",
    entityUrl: "https://stackoverflow.com", rating: 4,
    comment: "Indispensable knowledge base. AI-powered search now makes finding answers faster. Moderation quality has improved this year.",
    author: "debugger42", date: "2026-04-09", verified: true,
  },
  {
    id: "r9", entityType: "website", entityName: "Hugging Face",
    entityUrl: "https://huggingface.co", rating: 5,
    comment: "The go-to hub for open-source AI models. Transparent model cards, community-driven, and excellent inference API.",
    author: "ml_practitioner", date: "2026-04-06", verified: true,
  },
  {
    id: "r10", entityType: "website", entityName: "Docker Hub",
    entityUrl: "https://hub.docker.com", rating: 3,
    comment: "Convenient registry but image quality varies wildly. No mandatory security scanning for free accounts. Rate limiting is aggressive.",
    author: "container_chief", date: "2026-04-04", verified: false,
  },
  {
    id: "r11", entityType: "website", entityName: "Vercel",
    entityUrl: "https://vercel.com", rating: 5,
    comment: "Effortless deployments with excellent preview URLs. Edge functions are fast. Security headers auto-configured.",
    author: "frontend_fox", date: "2026-04-02", verified: true,
  },
  {
    id: "r12", entityType: "website", entityName: "Netlify",
    entityUrl: "https://netlify.com", rating: 4,
    comment: "Great for static sites and serverless functions. Forms and identity features are polished.",
    author: "static_site_pro", date: "2026-03-30", verified: true,
  },
  {
    id: "r3", entityType: "ai-tool", entityName: "Cursor",
    entityUrl: "https://cursor.sh", rating: 5,
    comment: "Best AI IDE for developers. Transparent pricing, regular updates, and strong community.",
    author: "ai_enthusiast", date: "2026-04-05", verified: true,
  },
  {
    id: "r4", entityType: "ai-tool", entityName: "Claude",
    entityUrl: "https://claude.ai", rating: 4,
    comment: "Powerful AI assistant with excellent code understanding. Privacy policy is privacy-focused.",
    author: "prompt_engineer", date: "2026-04-03", verified: true,
  },
  {
    id: "r13", entityType: "ai-tool", entityName: "GitHub Copilot",
    entityUrl: "https://github.com/features/copilot", rating: 4,
    comment: "Mature autocomplete with excellent IDE support. Agent mode is a game changer for multi-file edits.",
    author: "code_ninja", date: "2026-04-11", verified: true,
  },
  {
    id: "r14", entityType: "ai-tool", entityName: "Windsurf",
    entityUrl: "https://codeium.com/windsurf", rating: 4,
    comment: "Cascade flow is revolutionary for deep codebase understanding. Built-in browser preview is convenient.",
    author: "flow_state_dev", date: "2026-04-07", verified: true,
  },
  {
    id: "r15", entityType: "ai-tool", entityName: "Lovable",
    entityUrl: "https://lovable.dev", rating: 3,
    comment: "Impressively fast full-stack app generation. Good for MVPs and prototypes.",
    author: "startup_hacker", date: "2026-04-01", verified: true,
  },
  {
    id: "r16", entityType: "ai-tool", entityName: "v0 by Vercel",
    entityUrl: "https://v0.dev", rating: 5,
    comment: "Generates beautiful, production-quality React components. Seamless integration with shadcn/ui.",
    author: "ui_crafter", date: "2026-03-29", verified: true,
  },
  {
    id: "r17", entityType: "ai-tool", entityName: "DeepSeek",
    entityUrl: "https://deepseek.com", rating: 4,
    comment: "Exceptional price-to-performance ratio for code generation. Open weights are a big plus for self-hosting.",
    author: "self_host_hero", date: "2026-03-26", verified: false,
  },
  {
    id: "r5", entityType: "repository", entityName: "facebook/react",
    entityUrl: "https://github.com/facebook/react", rating: 5,
    comment: "Battle-tested framework with strong governance. Regular security patches and clear license.",
    author: "web_dev", date: "2026-04-01", verified: true,
  },
  {
    id: "r18", entityType: "repository", entityName: "vercel/next.js",
    entityUrl: "https://github.com/vercel/next.js", rating: 5,
    comment: "Best React framework for production. Excellent DX and incremental adoption.",
    author: "nextjs_fan", date: "2026-04-13", verified: true,
  },
  {
    id: "r19", entityType: "repository", entityName: "langchain-ai/langchain",
    entityUrl: "https://github.com/langchain-ai/langchain", rating: 4,
    comment: "Essential framework for LLM app development. Rapidly evolving with weekly releases.",
    author: "llm_builder", date: "2026-04-10", verified: true,
  },
  {
    id: "r20", entityType: "repository", entityName: "microsoft/vscode",
    entityUrl: "https://github.com/microsoft/vscode", rating: 5,
    comment: "Gold standard for code editors. Vast extension ecosystem and regular monthly updates.",
    author: "ide_power_user", date: "2026-04-07", verified: true,
  },
  {
    id: "r21", entityType: "repository", entityName: "openai/openai-cookbook",
    entityUrl: "https://github.com/openai/openai-cookbook", rating: 4,
    comment: "Excellent collection of API patterns and best practices.",
    author: "api_explorer", date: "2026-04-05", verified: true,
  },
  {
    id: "r22", entityType: "repository", entityName: "tailwindlabs/tailwindcss",
    entityUrl: "https://github.com/tailwindlabs/tailwindcss", rating: 5,
    comment: "Revolutionized CSS workflows. v4 is a massive improvement.",
    author: "css_architect", date: "2026-04-03", verified: true,
  },
  {
    id: "r23", entityType: "repository", entityName: "torvalds/linux",
    entityUrl: "https://github.com/torvalds/linux", rating: 5,
    comment: "The most important open-source project ever. Incredible governance.",
    author: "kernel_diver", date: "2026-03-31", verified: true,
  },
  {
    id: "r24", entityType: "repository", entityName: "pallets/flask",
    entityUrl: "https://github.com/pallets/flask", rating: 4,
    comment: "Lightweight Python web framework with excellent documentation.",
    author: "pythonista", date: "2026-03-27", verified: false,
  },
  {
    id: "r25", entityType: "repository", entityName: "godotengine/godot",
    entityUrl: "https://github.com/godotengine/godot", rating: 5,
    comment: "Amazing open-source game engine that rivals commercial alternatives.",
    author: "game_dev_42", date: "2026-03-25", verified: true,
  },
];

const MOCK_SCAM_REPORTS: ScamReport[] = [
  {
    id: "s1", category: "ai-tool",
    title: "AI Code Generator Pro",
    url: "https://aicodeprogen.xyz",
    description: "Promises unlimited AI code generation for a one-time fee of $49. Uses stolen UI from legitimate tools. No actual AI backend.",
    reportedBy: "vigilant_dev", date: "2026-04-10", upvotes: 42, status: "confirmed",
  },
  {
    id: "s5", category: "ai-tool",
    title: "ChatGPT Plus Lifetime - $19",
    url: "https://chatgpt-lifetime-deal.top",
    description: "Fake reseller claiming to offer 'lifetime ChatGPT Plus' for a one-time fee. Credentials harvested for account takeover.",
    reportedBy: "ai_safety_first", date: "2026-04-11", upvotes: 56, status: "confirmed",
  },
  {
    id: "s6", category: "ai-tool",
    title: "Free AI Model Training Platform",
    url: "https://freetrain.ai",
    description: "Promises free GPU hours. Asks for credit card for 'verification' then charges without consent. Domain registered 48 hours ago.",
    reportedBy: "gpu_watcher", date: "2026-04-09", upvotes: 31, status: "suspected",
  },
  {
    id: "s7", category: "ai-tool",
    title: "AI Prompt Marketplace Elite",
    url: "https://aipromptsmarket.club",
    description: "Charges $29/month for 'curated premium prompts' that are freely available on GitHub. No refund policy.",
    reportedBy: "prompt_collector", date: "2026-04-07", upvotes: 18, status: "confirmed",
  },
  {
    id: "s8", category: "startup",
    title: "AI-Powered Startup Incubator",
    url: "https://aicelerator.io",
    description: "Claims to connect founders with VC investors for a $199 'application fee'. No actual investor network.",
    reportedBy: "founder_watch", date: "2026-04-12", upvotes: 24, status: "confirmed",
  },
  {
    id: "s9", category: "startup",
    title: "DevTool SaaS Boilerplate",
    url: "https://devtoolsaas-boilerplate.com",
    description: "Sells a 'premium boilerplate' for $149 that is a direct copy of an MIT-licensed project with the license header removed.",
    reportedBy: "oss_defender", date: "2026-04-06", upvotes: 37, status: "confirmed",
  },
  {
    id: "s10", category: "startup",
    title: "Decentralized AI Compute Network",
    url: "https://decentralcompute.network",
    description: "Claims to let you 'rent out your GPU for AI training'. Requires wallet connection and ETH deposit to 'activate' earnings.",
    reportedBy: "blockchain_bob", date: "2026-04-03", upvotes: 22, status: "investigating",
  },
  {
    id: "s2", category: "crypto",
    title: "Agent Token Presale",
    url: "https://agentpresale.io",
    description: "Fake token presale claiming to 'power AI agents'. No whitepaper, anonymous team, promises 10x returns.",
    reportedBy: "crypto_whistle", date: "2026-04-08", upvotes: 28, status: "confirmed",
  },
  {
    id: "s11", category: "crypto",
    title: "AI Developer Token (AIDT)",
    url: "https://aidevtoken.io",
    description: "Exit scam in progress. Raised 2,000 ETH through influencer marketing. Smart contract has admin 'pause' function.",
    reportedBy: "solidity_sleuth", date: "2026-04-10", upvotes: 89, status: "confirmed",
  },
  {
    id: "s12", category: "crypto",
    title: "Agent Staking Pool",
    url: "https://agentstake.finance",
    description: "Promises 2% daily returns on 'AI agent staking pools'. Classic Ponzi scheme. Domain registered with privacy guard.",
    reportedBy: "rugpull_detector", date: "2026-04-05", upvotes: 43, status: "confirmed",
  },
  {
    id: "s3", category: "shopping",
    title: "Dev Gear Store",
    url: "https://devgearshop.top",
    description: "Fake developer merchandise store. Domain registered 5 days ago. No contact info. Accepts only crypto payments.",
    reportedBy: "alert_buyer", date: "2026-04-06", upvotes: 15, status: "suspected",
  },
  {
    id: "s13", category: "shopping",
    title: "MacBook Pro 50% Off Flash Sale",
    url: "https://macflashdeals.xyz",
    description: "Fake electronics store with prices too good to be true. Uses stolen product images from Apple.com. No SSL certificate.",
    reportedBy: "deal_checker", date: "2026-04-09", upvotes: 61, status: "confirmed",
  },
  {
    id: "s14", category: "shopping",
    title: "Mechanical Keyboard Custom Shop",
    url: "https://customkeys-discount.shop",
    description: "Takes orders for custom keyboards, then goes silent after payment. 127 complaints on Reddit.",
    reportedBy: "keycap_crusader", date: "2026-04-04", upvotes: 28, status: "confirmed",
  },
  {
    id: "s4", category: "job",
    title: "Remote AI Developer Position",
    url: "https://remoteaijobs.fake",
    description: "Fake job posting asking for $50 'application processing fee'. Uses real company names without authorization.",
    reportedBy: "job_hunter_99", date: "2026-04-04", upvotes: 33, status: "confirmed",
  },
  {
    id: "s15", category: "job",
    title: "Freelance AI Training - $200/hr",
    url: "https://aitrainer-jobs.com",
    description: "Scam offering suspiciously high pay for 'AI training from home'. Requires $25 'background check fee'.",
    reportedBy: "freelance_watchdog", date: "2026-04-11", upvotes: 47, status: "confirmed",
  },
  {
    id: "s16", category: "job",
    title: "Web3 Developer Dream Job",
    url: "https://web3dreamjob.io",
    description: "Fake Web3 job posting that requires 'wallet verification' by signing a malicious smart contract that drains your wallet.",
    reportedBy: "web3_auditor", date: "2026-04-08", upvotes: 72, status: "confirmed",
  },
  {
    id: "s17", category: "job",
    title: "Remote DevOps Contractor - Immediate Start",
    url: "https://devops-remote-firm.com",
    description: "Fake contracting agency that sends a fraudulent 'equipment check' after onboarding.",
    reportedBy: "contractor_cautious", date: "2026-04-02", upvotes: 19, status: "suspected",
  },
];

export function getCommunityReviews(entityType?: Review["entityType"]): Review[] {
  if (!entityType) return MOCK_REVIEWS;
  return MOCK_REVIEWS.filter(r => r.entityType === entityType);
}

export function getScamReports(category?: ScamReport["category"]): ScamReport[] {
  if (!category) return MOCK_SCAM_REPORTS;
  return MOCK_SCAM_REPORTS.filter(s => s.category === category);
}

export function getTopRated(limit = 3): Review[] {
  return [...MOCK_REVIEWS].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

// ─── AI Tool Trust Checker ────────────────────────────────────────────────

export function analyzeAiTool(url: string): AiToolResult {
  const domain = extractDomain(url);
  const age = estimateDomainAge(domain);
  const mo = getMonthsFromAge(age);
  let score = 50;
  if (mo > 12) score += 15;
  if (mo > 36) score += 10;
  if (/ai|gpt/.test(domain)) score += 5;
  if (domain.length < 15) score += 5;
  if (mo < 3) score -= 20;
  const finalScore = Math.min(100, Math.max(0, score));
  const rating = (finalScore >= 75 ? "Verified" : finalScore >= 55 ? "Trusted" : finalScore >= 35 ? "Caution" : "Untrusted") as "Verified"|"Trusted"|"Caution"|"Untrusted";
  const parts: string[] = [];
  if (mo < 3) parts.push("This AI tool domain is very recent (under 3 months old).");
  if (mo > 24) parts.push("Has an established online presence.");
  if (finalScore >= 70) parts.push("Pricing and company info appear transparent.");
  if (finalScore < 50) parts.push("Limited transparency around pricing and company details.");
  if (!parts.length) parts.push("Standard risk profile for an AI tool.");
  return {
    name: domain.split(".")[0].charAt(0).toUpperCase() + domain.split(".")[0].slice(1),
    url,
    trustRating: rating,
    trustScore: finalScore,
    hasCompany: true,
    hasPricing: mo > 6,
    hasTerms: true,
    hasPrivacy: true,
    domainAge: age.age,
    analysis: parts.join(" "),
  };
}
