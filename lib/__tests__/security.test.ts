import { describe, it, expect } from "vitest";
import {
  calculateTrustScore, getRiskLevel, getRiskColor, getRiskBg,
  getSSLGrade, getSSLColor,
  extractDomain, estimateDomainAge,
  analyzeSSL, analyzeSecurityHeaders,
  analyzeFakeStoreRisk, analyzePhishingRisk,
  detectTechnologies, analyzeSEO, analyzeURL,
  analyzeAiTool, analyzeTrust,
  generateSecurityReport, generatePackageReport,
  analyzeDomainIntelligence,
  getCommunityReviews, getScamReports, getTopRated,
  dnsLookup,
} from "@/lib/security";
import type { PackageTrustResult, TrustCheckResult } from "@/lib/security";

describe("security module", () => {
  // ─── Scoring Engine ───────────────────────────────────────────────────

  describe("calculateTrustScore", () => {
    it("returns 50 for empty checks", () => {
      expect(calculateTrustScore([])).toBe(50);
    });
    it("averages check scores", () => {
      const checks = [
        { name: "a", status: "pass" as const, detail: "", score: 80 },
        { name: "b", status: "pass" as const, detail: "", score: 60 },
      ];
      expect(calculateTrustScore(checks)).toBe(70);
    });
  });

  describe("getRiskLevel", () => {
    it("Safe for 80+", () => expect(getRiskLevel(80)).toBe("Safe"));
    it("Low Risk for 60-79", () => expect(getRiskLevel(65)).toBe("Low Risk"));
    it("Medium Risk for 40-59", () => expect(getRiskLevel(50)).toBe("Medium Risk"));
    it("High Risk for 20-39", () => expect(getRiskLevel(30)).toBe("High Risk"));
    it("Dangerous for <20", () => expect(getRiskLevel(10)).toBe("Dangerous"));
  });

  describe("getRiskColor / getRiskBg", () => {
    it("returns color strings for all levels", () => {
      ["Safe", "Low Risk", "Medium Risk", "High Risk", "Dangerous"].forEach((l) => {
        expect(getRiskColor(l)).toBeTruthy();
        expect(getRiskBg(l)).toBeTruthy();
      });
    });
    it("returns fallback for unknown level", () => {
      expect(getRiskColor("Unknown")).toBe("text-gray-400");
      expect(getRiskBg("Unknown")).toBe("bg-gray-500/10 border-gray-500/30");
    });
  });

  describe("getSSLGrade", () => {
    it("A+ for 95+", () => expect(getSSLGrade(98)).toBe("A+"));
    it("A for 80-94", () => expect(getSSLGrade(85)).toBe("A"));
    it("B for 65-79", () => expect(getSSLGrade(70)).toBe("B"));
    it("C for 50-64", () => expect(getSSLGrade(55)).toBe("C"));
    it("D for 35-49", () => expect(getSSLGrade(40)).toBe("D"));
    it("F for <35", () => expect(getSSLGrade(20)).toBe("F"));
  });

  // ─── Domain Helpers ───────────────────────────────────────────────────

  describe("extractDomain", () => {
    it("extracts from https URL", () => expect(extractDomain("https://www.example.com/page")).toBe("www.example.com"));
    it("adds scheme if missing", () => expect(extractDomain("example.com")).toBe("example.com"));
    it("handles raw domain", () => expect(extractDomain("sub.example.com")).toBe("sub.example.com"));
  });

  describe("estimateDomainAge", () => {
    it("returns structured age data", () => {
      const age = estimateDomainAge("example.com");
      expect(age).toHaveProperty("age");
      expect(age).toHaveProperty("registrationDate");
      expect(age).toHaveProperty("expiryDate");
      expect(age).toHaveProperty("registrar");
      expect(typeof age.age).toBe("string");
    });
    it("short domains get longer age estimate", () => {
      const short = estimateDomainAge("short.com");
      const long = estimateDomainAge("a-very-long-domain-name-that-exceeds-25-chars.com");
      expect(short.age).not.toBe(long.age);
    });
  });

  // ─── Fake Store Risk ──────────────────────────────────────────────────

  describe("analyzeFakeStoreRisk", () => {
    it("returns result with signals and probability", () => {
      const r = analyzeFakeStoreRisk("suspicious-store.top");
      expect(r.signals.length).toBeGreaterThan(0);
      expect(["Low", "Medium", "High"]).toContain(r.probability);
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r.score).toBeLessThanOrEqual(100);
    });
    it("flags bad TLDs", () => {
      const r = analyzeFakeStoreRisk("shady-shop.xyz");
      expect(r.signals.some((s) => s.category === "Suspicious TLD" && s.found)).toBe(true);
    });
  });

  // ─── Phishing Detection ──────────────────────────────────────────────

  describe("analyzePhishingRisk", () => {
    it("detects lookalike domains", () => {
      const r = analyzePhishingRisk("g00gle.com", "https://g00gle.com/login");
      expect(r.signals.some((s) => s.name === "Lookalike Domain" && s.detected)).toBe(true);
    });
    it("detects IP-based domains", () => {
      const r = analyzePhishingRisk("192.168.1.1", "http://192.168.1.1");
      expect(r.signals.some((s) => s.name === "IP Address URL" && s.detected)).toBe(true);
    });
    it("returns riskLevel", () => {
      const r = analyzePhishingRisk("safe.com", "https://safe.com");
      expect(["Low", "Medium", "High", "Critical"]).toContain(r.riskLevel);
    });
  });

  // ─── SSL ──────────────────────────────────────────────────────────────

  describe("analyzeSSL", () => {
    it("returns SSL info for HTTPS domain", () => {
      const r = analyzeSSL("example.com");
      expect(r).toHaveProperty("enabled");
      expect(r).toHaveProperty("grade");
      expect(r).toHaveProperty("issuer");
      expect(r).toHaveProperty("score");
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r.score).toBeLessThanOrEqual(100);
    });
    it("detects HTTP as disabled SSL", () => {
      const r = analyzeSSL("http://insecure-site.com");
      expect(r.enabled).toBe(false);
    });
  });

  // ─── Security Headers ────────────────────────────────────────────────

  describe("analyzeSecurityHeaders", () => {
    it("returns headers with score", () => {
      const r = analyzeSecurityHeaders("example.com");
      expect(r.score).toBeGreaterThan(0);
      expect(r["Content-Security-Policy"]).toBeTruthy();
    });
  });

  // ─── Tech Detection ──────────────────────────────────────────────────

  describe("detectTechnologies", () => {
    it("returns technologies and score", () => {
      const r = detectTechnologies("example.com");
      expect(r.technologies.length).toBeGreaterThan(0);
      expect(r.frameworkScore).toBeGreaterThanOrEqual(0);
    });
  });

  // ─── SEO ──────────────────────────────────────────────────────────────

  describe("analyzeSEO", () => {
    it("returns SEO analysis with issues", () => {
      const r = analyzeSEO("https://example.com");
      expect(r.score).toBeGreaterThanOrEqual(0);
      expect(r).toHaveProperty("title");
      expect(r).toHaveProperty("issues");
    });
  });

  // ─── URL Analysis ────────────────────────────────────────────────────

  describe("analyzeURL", () => {
    it("returns URL analysis", () => {
      const r = analyzeURL("https://example.com/path");
      expect(r.original).toContain("https://");
      expect(r.isCanonical).toBe(true);
    });
    it("adds https if missing", () => {
      const r = analyzeURL("example.com");
      expect(r.original).toContain("https://");
    });
  });

  // ─── AI Tool Checker ─────────────────────────────────────────────────

  describe("analyzeAiTool", () => {
    it("returns trust rating for a URL", () => {
      const r = analyzeAiTool("https://cursor.sh");
      expect(r.trustScore).toBeGreaterThanOrEqual(0);
      expect(["Verified", "Trusted", "Caution", "Untrusted"]).toContain(r.trustRating);
    });
    it("analyzes recent domain with lower score", () => {
      const r = analyzeAiTool("https://brandnew-ai-tool-with-a-very-long-domain.xyz");
      expect(r.trustScore).toBeLessThanOrEqual(70);
    });
  });

  // ─── Security Report ─────────────────────────────────────────────────

  describe("generateSecurityReport", () => {
    it("generates structured report from trust result", () => {
      const trust = {
        url: "https://example.com",
        domain: "example.com",
        trustScore: 75,
        riskLevel: "Low Risk" as const,
        summary: "Looks safe",
        checks: [
          { name: "SSL", status: "pass" as const, detail: "Valid", score: 85 },
          { name: "Domain Age", status: "warn" as const, detail: "3 months", score: 40 },
          { name: "Headers", status: "fail" as const, detail: "Missing CSP", score: 20 },
        ],
        timestamp: Date.now(),
      };
      const report = generateSecurityReport(trust);
      expect(report.title).toContain("example.com");
      expect(report.overallScore).toBe(75);
      expect(report.sections.length).toBeGreaterThanOrEqual(3);
      expect(report.recommendations.length).toBeGreaterThan(0);
    });
    it("includes all check types in sections", () => {
      const trust: TrustCheckResult = {
        url: "https://test.com", domain: "test.com",
        trustScore: 50, riskLevel: "Medium Risk",
        summary: "Mixed", checks: [
          { name: "A", status: "pass", detail: "Ok", score: 80 },
          { name: "B", status: "warn", detail: "Caution", score: 50 },
          { name: "C", status: "fail", detail: "Bad", score: 10 },
        ], timestamp: Date.now(),
      };
      const report = generateSecurityReport(trust);
      const sectionNames = report.sections.map((s) => s.title);
      expect(sectionNames).toContain("Passed Checks");
      expect(sectionNames).toContain("Warnings");
      expect(sectionNames).toContain("Failed Checks");
    });
  });

  describe("generatePackageReport", () => {
    it("generates report from package result", () => {
      const pkg: PackageTrustResult = {
        name: "lodash", ecosystem: "npm", version: "4.17.21",
        description: "A modern JS utility library",
        stars: 50000, weeklyDownloads: 10000000,
        hasSecurityPolicy: false, hasReadme: true,
        hasLicense: true, hasRepository: true,
        lastPublish: "2026-01-01", author: "jdalton",
        trustScore: 85, riskLevel: "Safe", issues: [],
      };
      const report = generatePackageReport(pkg);
      expect(report.title).toContain("lodash");
      expect(report.overallScore).toBe(85);
      expect(report.sections.length).toBeGreaterThanOrEqual(2);
    });
    it("flags packages with issues", () => {
      const pkg: PackageTrustResult = {
        name: "bad-pkg", ecosystem: "pypi", version: "0.0.1",
        description: "", stars: 0, weeklyDownloads: 5,
        hasSecurityPolicy: false, hasReadme: false,
        hasLicense: false, hasRepository: false,
        lastPublish: "2026-04-01", author: "unknown",
        trustScore: 20, riskLevel: "Dangerous",
        issues: ["No license", "No README", "No repository"],
      };
      const report = generatePackageReport(pkg);
      expect(report.riskLevel).toBe("Dangerous");
      expect(report.recommendations.some((r) => r.includes("avoid"))).toBe(true);
    });
  });

  // ─── Domain Intelligence ──────────────────────────────────────────────

  describe("analyzeDomainIntelligence", () => {
    it("returns consolidated domain intelligence", async () => {
      const r = await analyzeDomainIntelligence("example.com");
      expect(r.domain).toBe("example.com");
      expect(r.ssl).toBeTruthy();
      expect(r.headers).toBeTruthy();
      expect(r.tech).toBeTruthy();
      expect(r.domainInfo).toBeTruthy();
      expect(r.overallScore).toBeGreaterThanOrEqual(0);
      expect(r.overallScore).toBeLessThanOrEqual(100);
      expect(r.recommendations.length).toBeGreaterThan(0);
    });
  });

  // ─── Community Reviews ────────────────────────────────────────────────

  describe("getCommunityReviews", () => {
    it("returns all reviews when no filter (expanded dataset: ~25 entries)", () => {
      const reviews = getCommunityReviews();
      expect(reviews.length).toBeGreaterThanOrEqual(20);
      expect(reviews.length).toBeLessThanOrEqual(30);
    });
    it("filters by entity type — website", () => {
      const websites = getCommunityReviews("website");
      expect(websites.every((r) => r.entityType === "website")).toBe(true);
      expect(websites.length).toBeGreaterThanOrEqual(5);
    });
    it("filters by entity type — ai-tool", () => {
      const aiTools = getCommunityReviews("ai-tool");
      expect(aiTools.every((r) => r.entityType === "ai-tool")).toBe(true);
      expect(aiTools.length).toBeGreaterThanOrEqual(5);
    });
    it("filters by entity type — repository", () => {
      const repos = getCommunityReviews("repository");
      expect(repos.every((r) => r.entityType === "repository")).toBe(true);
      expect(repos.length).toBeGreaterThanOrEqual(6);
    });
    it("includes varied ratings", () => {
      const reviews = getCommunityReviews();
      const ratings = reviews.map((r) => r.rating);
      expect(new Set(ratings).size).toBeGreaterThanOrEqual(2); // at least 2 distinct ratings
    });
  });

  describe("getScamReports", () => {
    it("returns all scam reports (expanded dataset: ~17 entries)", () => {
      const reports = getScamReports();
      expect(reports.length).toBeGreaterThanOrEqual(14);
      expect(reports.length).toBeLessThanOrEqual(20);
    });
    it("filters by category — crypto", () => {
      const crypto = getScamReports("crypto");
      expect(crypto.every((s) => s.category === "crypto")).toBe(true);
      expect(crypto.length).toBeGreaterThanOrEqual(3);
    });
    it("filters by category — ai-tool", () => {
      const aiTools = getScamReports("ai-tool");
      expect(aiTools.every((s) => s.category === "ai-tool")).toBe(true);
      expect(aiTools.length).toBeGreaterThanOrEqual(3);
    });
    it("filters by category — job", () => {
      const jobs = getScamReports("job");
      expect(jobs.every((s) => s.category === "job")).toBe(true);
      expect(jobs.length).toBeGreaterThanOrEqual(3);
    });
    it("filters by category — shopping", () => {
      const shopping = getScamReports("shopping");
      expect(shopping.every((s) => s.category === "shopping")).toBe(true);
      expect(shopping.length).toBeGreaterThanOrEqual(2);
    });
    it("filters by category — startup", () => {
      const startups = getScamReports("startup");
      expect(startups.every((s) => s.category === "startup")).toBe(true);
      expect(startups.length).toBeGreaterThanOrEqual(3);
    });
    it("covers all statuses", () => {
      const reports = getScamReports();
      const statuses = new Set(reports.map((s) => s.status));
      expect(statuses.has("confirmed")).toBe(true);
      expect(statuses.has("suspected")).toBe(true);
      expect(statuses.has("investigating")).toBe(true);
    });
  });

  describe("getTopRated", () => {
    it("returns top 3 by default", () => {
      const top = getTopRated();
      expect(top.length).toBe(3);
      expect(top[0].rating).toBeGreaterThanOrEqual(top[1].rating);
    });
    it("respects limit parameter", () => {
      expect(getTopRated(2).length).toBe(2);
    });
    it("top-rated items are sorted descending", () => {
      const top = getTopRated(8);
      for (let i = 1; i < top.length; i++) {
        expect(top[i - 1].rating).toBeGreaterThanOrEqual(top[i].rating);
      }
    });
  });

  // ─── DNS Lookup ───────────────────────────────────────────────────────

  describe("dnsLookup", () => {
    it("returns array of DNS records", async () => {
      const records = await dnsLookup("google.com");
      expect(Array.isArray(records)).toBe(true);
    });
  });

  // ─── Trust Check Integration ─────────────────────────────────────────

  describe("analyzeTrust", () => {
    it("returns complete trust check result", async () => {
      const r = await analyzeTrust("https://example.com");
      expect(r).toHaveProperty("url");
      expect(r).toHaveProperty("domain");
      expect(r).toHaveProperty("trustScore");
      expect(r.trustScore).toBeGreaterThanOrEqual(0);
      expect(r.trustScore).toBeLessThanOrEqual(100);
      expect(r.checks.length).toBeGreaterThan(0);
      expect(["Safe", "Low Risk", "Medium Risk", "High Risk", "Dangerous"]).toContain(r.riskLevel);
    });
  });
});
