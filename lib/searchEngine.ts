"use client";

import Fuse from "fuse.js";
import { loadLLMConfig } from "./llm-config";

// ─── Data imports (JSON data, safe for client) ───
import toolsData from "@/data/tools.json";
import agentsData from "@/data/agents.json";
import aiCodingToolsData from "@/data/ai-coding-tools.json";
import aiToolsData from "@/data/ai-tools.json";
import promptsData from "@/data/prompts.json";
import eventsData from "@/data/events.json";
import showcaseData from "@/data/showcase.json";
import benchmarksData from "@/data/benchmarks.json";
import learningResourcesData from "@/data/learning-resources.json";
import marketplaceData from "@/data/marketplace.json";
import designToolsData from "@/data/design-tools.json";
import devopsData from "@/data/devops.json";
import productivityToolsData from "@/data/productivity-tools.json";
import webDevData from "@/data/web-dev.json";
import openSourceOpportunitiesData from "@/data/open-source-opportunities.json";
import programsData from "@/data/programs.json";

// ─── Types ───
export type ResultType =
  | "tool" | "agent" | "ai-coding-tool" | "ai-tool" | "prompt"
  | "event" | "showcase" | "benchmark" | "learning" | "marketplace"
  | "design-tool" | "devops" | "productivity" | "web-dev"
  | "opportunity" | "program" | "blog" | "page" | "category";

export interface SearchResult {
  id: string;
  name: string;
  description: string;
  href: string;
  type: ResultType;
  category: string;
  tags: string[];
  icon?: string;
  stars?: number;
  views?: number;
  score?: number;
}

interface SearchableItem {
  id: string;
  name: string;
  description: string;
  href: string;
  type: ResultType;
  category: string;
  tags: string[];
  stars?: number;
  views?: number;
}

// ─── Static Pages ───
const STATIC_PAGES: SearchableItem[] = [
  { id: "page-home", name: "Home", description: "Dev Resource Hub — AI Operating System", href: "/", type: "page", category: "Pages", tags: ["home", "dashboard"] },
  { id: "page-dashboard", name: "Dashboard", description: "Personalized hub with stats, quick actions, trending tools", href: "/dashboard", type: "page", category: "Pages", tags: ["dashboard", "stats"] },
  { id: "page-tools", name: "Tools", description: "Directory of AI-powered developer tools", href: "/tools", type: "page", category: "Pages", tags: ["tools", "directory"] },
  { id: "page-agents", name: "Agents", description: "Catalog of autonomous AI agents and frameworks", href: "/agents", type: "page", category: "Pages", tags: ["agents", "ai"] },
  { id: "page-ai-agents", name: "AI Agents", description: "Explore autonomous builders and coding agents", href: "/ai-agents", type: "page", category: "Pages", tags: ["ai", "agents", "coding"] },
  { id: "page-prompts", name: "Prompts", description: "Searchable prompt library for AI coding", href: "/prompts", type: "page", category: "Pages", tags: ["prompts", "library"] },
  { id: "page-compare", name: "Compare Tools", description: "Side-by-side comparison of AI coding tools", href: "/compare", type: "page", category: "Pages", tags: ["compare", "tools"] },
  { id: "page-events", name: "Events", description: "AI conferences, meetups, and hackathons", href: "/events", type: "page", category: "Pages", tags: ["events", "conferences"] },
  { id: "page-blog", name: "Blog", description: "Editorial articles on AI development", href: "/blogs", type: "page", category: "Pages", tags: ["blog", "articles"] },
  { id: "page-showcase", name: "Showcase", description: "Community-built projects gallery", href: "/showcase", type: "page", category: "Pages", tags: ["showcase", "projects"] },
  { id: "page-marketplace", name: "Marketplace", description: "Unified marketplace for prompts, tools, and agents", href: "/marketplace", type: "page", category: "Pages", tags: ["marketplace", "store"] },
  { id: "page-trending", name: "Trending", description: "Hottest resources this week", href: "/trending", type: "page", category: "Pages", tags: ["trending", "popular"] },
  { id: "page-workflow", name: "Workflows", description: "Visual drag-and-drop AI workflow builder", href: "/workflow", type: "page", category: "Pages", tags: ["workflow", "builder"] },
  { id: "page-benchmarks", name: "Benchmarks", description: "Performance benchmarks for AI coding tools", href: "/benchmarks", type: "page", category: "Pages", tags: ["benchmarks", "scores"] },
  { id: "page-dsa", name: "DSA Arena", description: "Data structures and algorithms practice", href: "/dsa", type: "page", category: "Pages", tags: ["dsa", "algorithms", "practice"] },
  { id: "page-devrank", name: "DevRank AI", description: "AI-powered developer ranking system", href: "/devrank", type: "page", category: "Pages", tags: ["rank", "developer", "score"] },
  { id: "page-open-source", name: "Open Source Hub", description: "Open source projects and opportunities", href: "/open-source", type: "page", category: "Pages", tags: ["open source", "oss"] },
  { id: "page-community", name: "Community", description: "Connect with builders and developers", href: "/community", type: "page", category: "Pages", tags: ["community", "connect"] },
  { id: "page-leaderboard", name: "Leaderboard", description: "Top contributors and rankings", href: "/leaderboard", type: "page", category: "Pages", tags: ["leaderboard", "rankings"] },
  { id: "page-security", name: "Security Center", description: "Security tools, news, and best practices", href: "/security-center", type: "page", category: "Pages", tags: ["security", "vulnerability"] },
  { id: "page-prompt-optimizer", name: "Prompt Optimizer", description: "6-mode prompt optimizer for better AI responses", href: "/prompt-optimizer", type: "page", category: "Pages", tags: ["optimizer", "prompt"] },
  { id: "page-learning", name: "Learning Resources", description: "Learning paths and educational resources", href: "/learning", type: "page", category: "Pages", tags: ["learning", "education"] },
  { id: "page-map", name: "Dev Map", description: "Interactive global developer community map", href: "/map", type: "page", category: "Pages", tags: ["map", "global"] },
  { id: "page-prompt-prd", name: "Prompt to PRD", description: "Convert prompts to product requirement documents", href: "/prompt-to-prd", type: "page", category: "Pages", tags: ["prd", "requirements"] },
  { id: "page-webagentcore", name: "WebAgentCore", description: "Web agent core for building AI web agents", href: "/webagentcore", type: "page", category: "Pages", tags: ["webagent", "agent"] },
  { id: "page-students", name: "For Students", description: "Resources and tools for students", href: "/students", type: "page", category: "Pages", tags: ["students", "education"] },
  { id: "page-developers", name: "For Developers", description: "Resources and tools for developers", href: "/developers", type: "page", category: "Pages", tags: ["developers", "coding"] },
  { id: "page-founders", name: "For Founders", description: "Resources and tools for startup founders", href: "/founders", type: "page", category: "Pages", tags: ["founders", "startup"] },
  { id: "page-agencies", name: "For Agencies", description: "Resources and tools for AI agencies", href: "/agencies", type: "page", category: "Pages", tags: ["agencies", "ai"] },
];

// ─── Build Index ───
let _searchIndex: SearchableItem[] | null = null;
let _fuse: Fuse<SearchableItem> | null = null;

function buildIndex(): SearchableItem[] {
  const items: SearchableItem[] = [
    ...STATIC_PAGES,

    // Tools
    ...(toolsData as any[]).map((t) => ({
      id: "tool-" + t.id, name: t.name, description: t.description,
      href: "/tools?id=" + t.id, type: "tool" as ResultType,
      category: t.category || "Tools", tags: t.tags || [], stars: t.stars, views: t.views,
    })),

    // Agents
    ...(agentsData as any[]).map((a) => ({
      id: "agent-" + a.id, name: a.name, description: a.description,
      href: "/ai-agents?id=" + a.id, type: "agent" as ResultType,
      category: a.category || "Agents", tags: a.tags || [], stars: a.stars, views: a.views,
    })),

    // AI Coding Tools
    ...(aiCodingToolsData as any[]).map((t) => ({
      id: "ai-coding-" + t.id, name: t.name, description: t.description,
      href: "/tools?id=" + t.id, type: "ai-coding-tool" as ResultType,
      category: t.category || "AI Coding", tags: t.tags || [], stars: t.stars,
    })),

    // AI Tools
    ...(aiToolsData as any[]).map((t, i) => ({
      id: "ai-tool-" + (t.id || i), name: t.name, description: t.description,
      href: "/tools?q=" + encodeURIComponent(t.name), type: "ai-tool" as ResultType,
      category: "AI Tools", tags: t.tags || [],
    })),

    // Prompts
    ...(promptsData as any[]).map((p) => ({
      id: "prompt-" + p.id, name: p.title, description: p.description,
      href: "/prompts?id=" + p.id, type: "prompt" as ResultType,
      category: p.category || "Prompts", tags: p.tags || [], views: p.views,
    })),

    // Events
    ...((eventsData as any)?.events || []).map((e: any) => ({
      id: "event-" + e.id, name: e.name,
      description: e.description + " - " + (e.city || "") + ", " + (e.country || ""),
      href: "/events?id=" + e.id, type: "event" as ResultType,
      category: e.category || "Events",
      tags: [...(e.tags || []), e.city || "", e.country || ""].filter(Boolean),
    })),

    // Showcase
    ...(showcaseData as any[]).map((s) => ({
      id: "showcase-" + s.id, name: s.title, description: s.description,
      href: "/showcase?id=" + s.id, type: "showcase" as ResultType,
      category: s.category || "Showcase", tags: s.tags || [], views: s.views,
    })),

    // Benchmarks
    ...(benchmarksData as any[]).map((b) => ({
      id: "benchmark-" + b.id, name: b.name + " Benchmarks",
      description: "AI coding tool benchmark - " + (b.bestFor || ""),
      href: "/benchmarks?id=" + b.id, type: "benchmark" as ResultType,
      category: b.category || "Benchmarks",
      tags: ["benchmark", ...(b.strengths || []), b.provider || ""].filter(Boolean),
    })),

    // Learning Resources
    ...(learningResourcesData as any[]).map((l, i) => ({
      id: "learning-" + i, name: l.name, description: l.description,
      href: "/learning", type: "learning" as ResultType,
      category: "Learning", tags: l.tags || [],
    })),

    // Marketplace
    ...(marketplaceData as any[]).map((m) => ({
      id: "marketplace-" + m.id, name: m.title, description: m.description,
      href: "/marketplace?id=" + m.id, type: "marketplace" as ResultType,
      category: m.category || "Marketplace", tags: m.tags || [], stars: m.stars,
    })),

    // Design Tools
    ...(designToolsData as any[]).map((d, i) => ({
      id: "design-tool-" + i, name: d.name, description: d.description,
      href: "/tools", type: "design-tool" as ResultType,
      category: "Design Tools", tags: ["design", d.name.toLowerCase()],
    })),

    // DevOps
    ...(devopsData as any[]).map((d) => ({
      id: "devops-" + (d.id || d.name.toLowerCase().replace(/\s+/g, "-")),
      name: d.name, description: d.description,
      href: "/tools", type: "devops" as ResultType,
      category: "DevOps", tags: d.tags || [],
    })),

    // Productivity
    ...(productivityToolsData as any[]).map((p) => ({
      id: "productivity-" + (p.id || p.name.toLowerCase().replace(/\s+/g, "-")),
      name: p.name, description: p.description,
      href: "/tools", type: "productivity" as ResultType,
      category: "Productivity", tags: p.tags || [],
    })),

    // Web Dev
    ...(webDevData as any[]).map((w, i) => ({
      id: "web-dev-" + i, name: w.name, description: w.description,
      href: "/tools", type: "web-dev" as ResultType,
      category: "Web Dev", tags: ["web", w.name.toLowerCase()],
    })),

    // Open Source Opportunities
    ...(openSourceOpportunitiesData as any[]).map((o) => ({
      id: "opportunity-" + o.id, name: o.name, description: o.description,
      href: "/opportunities?id=" + o.id, type: "opportunity" as ResultType,
      category: o.category || "Open Source", tags: o.tags || [],
    })),

    // Programs
    ...(programsData as any[]).map((p) => ({
      id: "program-" + p.id, name: p.name,
      description: p.description + " - " + (p.organization || ""),
      href: "/opportunities?id=" + p.id, type: "program" as ResultType,
      category: "Programs",
      tags: [...(p.tags || []), p.organization || ""].filter(Boolean),
    })),
  ];

  _searchIndex = items;
  return items;
}

function getFuse(): Fuse<SearchableItem> {
  if (_fuse) return _fuse;
  const items = buildIndex();
  _fuse = new Fuse(items, {
    keys: [
      { name: "name", weight: 2 },
      { name: "description", weight: 1 },
      { name: "category", weight: 1.5 },
      { name: "tags", weight: 1.5 },
    ],
    threshold: 0.35,
    distance: 100,
    minMatchCharLength: 1,
  });
  return _fuse;
}

export function getIndexCount(): number {
  return buildIndex().length;
}

export function getCategoryCounts(): Record<string, number> {
  const items = buildIndex();
  const counts: Record<string, number> = {};
  for (const item of items) {
    counts[item.category] = (counts[item.category] || 0) + 1;
  }
  return counts;
}

export function getTrendingResults(limit = 20): SearchResult[] {
  const items = buildIndex();
  return items
    .sort((a, b) => (b.stars || 0) - (a.stars || 0) || (b.views || 0) - (a.views || 0))
    .slice(0, limit)
    .map((item, i) => ({ ...item, icon: getTypeIcon(item.type), score: 1 - i * 0.01 }));
}

export function getTypeIcon(type: ResultType): string {
  const icons: Record<string, string> = {
    tool: "🔧", agent: "🤖", "ai-coding-tool": "⚡", "ai-tool": "🧠",
    prompt: "💬", event: "📅", showcase: "⭐", benchmark: "📊",
    learning: "📚", marketplace: "🏪", "design-tool": "🎨", devops: "🛠️",
    productivity: "⚙️", "web-dev": "🌐", opportunity: "🔓",
    program: "🎓", blog: "📝", page: "📄", category: "📂",
  };
  return icons[type] || "🔍";
}

export function getTypeColor(type: ResultType): string {
  const colors: Record<string, string> = {
    tool: "text-emerald-400", agent: "text-blue-400", "ai-coding-tool": "text-yellow-400", "ai-tool": "text-purple-400",
    prompt: "text-violet-400", event: "text-pink-400", showcase: "text-amber-400", benchmark: "text-orange-400",
    learning: "text-sky-400", marketplace: "text-rose-400", "design-tool": "text-fuchsia-400", devops: "text-cyan-400",
    productivity: "text-teal-400", "web-dev": "text-green-400", opportunity: "text-lime-400", program: "text-indigo-400",
    blog: "text-yellow-400", page: "text-gray-300", category: "text-gray-400",
  };
  return colors[type] || "text-gray-400";
}

export function getTypeLabel(type: ResultType): string {
  const labels: Record<string, string> = {
    tool: "Tools", agent: "AI Agents", "ai-coding-tool": "AI Coding Tools", "ai-tool": "AI Tools",
    prompt: "Prompts", event: "Events", showcase: "Showcase", benchmark: "Benchmarks",
    learning: "Learning", marketplace: "Marketplace", "design-tool": "Design", devops: "DevOps",
    productivity: "Productivity", "web-dev": "Web Dev", opportunity: "Opportunities", program: "Programs",
    blog: "Blog Posts", page: "Pages", category: "Categories",
  };
  return labels[type] || type;
}

export function getTypeOrder(type: ResultType): number {
  const order: Record<string, number> = {
    tool: 0, agent: 1, "ai-coding-tool": 2, "ai-tool": 3, prompt: 4, page: 5, event: 6,
    showcase: 7, benchmark: 8, blog: 9, marketplace: 10, learning: 11, "design-tool": 11,
    devops: 11, productivity: 11, "web-dev": 11, opportunity: 12, program: 12, category: 13,
  };
  return order[type] ?? 99;
}

export function searchFuse(query: string): SearchResult[] {
  if (!query.trim()) return [];
  const fuse = getFuse();
  const results = fuse.search(query);
  return results.slice(0, 50).map((r) => ({
    ...r.item,
    icon: getTypeIcon(r.item.type),
    score: r.score !== undefined ? 1 - r.score : 0,
  }));
}

export async function searchWithAI(query: string): Promise<{
  results: SearchResult[];
  intent?: string;
  usedAI: boolean;
}> {
  const fuseResults = searchFuse(query);
  if (fuseResults.length === 0) return { results: [], usedAI: false };

  const config = loadLLMConfig();
  if (!config) return { results: fuseResults, usedAI: false };

  try {
    const { OpenAI } = await import("openai");
    const client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseUrl,
      dangerouslyAllowBrowser: true,
    });

    const types = [...new Set(fuseResults.map((r) => r.type))].slice(0, 8);
    const topNames = fuseResults.slice(0, 10).map((r) => r.name).join(", ");

    const response = await client.chat.completions.create({
      model: config.model,
      messages: [
        {
          role: "system",
          content:
            "You are a search intent classifier for a developer resource hub. " +
            "Given a search query and matched result types/names, " +
            "determine what the user is looking for. " +
            "Return ONLY a JSON object with: " +
            '{ "intent": "short description", "priorityTypes": ["type1"] } ' +
            "where priorityTypes is 1-3 types ordered by relevance. " +
            "Available types: tool, agent, prompt, event, showcase, " +
            "benchmark, learning, marketplace, blog, page, opportunity, program.",
        },
        {
          role: "user",
          content: "Query: \"" + query + "\"\nMatched types: " + types.join(", ") + "\nTop results: " + topNames,
        },
      ],
      temperature: 0.1,
      max_tokens: 200,
    });

    const content = response.choices[0]?.message?.content || "{}";
    const parsed = JSON.parse(content.replace(/```json|```/g, "").trim()) as {
      intent?: string;
      priorityTypes?: string[];
    };

    const priorityTypes = parsed.priorityTypes || [];
    const scored = fuseResults.map((r) => ({
      ...r,
      score: (r.score || 0) + (priorityTypes.includes(r.type) ? 0.5 : 0),
    }));
    scored.sort((a, b) => (b.score || 0) - (a.score || 0));

    return { results: scored, intent: parsed.intent, usedAI: true };
  } catch {
    return { results: fuseResults, usedAI: false };
  }
}

export function groupResultsByType(
  results: SearchResult[],
): Array<{ type: ResultType; label: string; icon: string; color: string; items: SearchResult[] }> {
  const groups = new Map<ResultType, SearchResult[]>();
  for (const r of results) {
    if (!groups.has(r.type)) groups.set(r.type, []);
    groups.get(r.type)!.push(r);
  }
  return Array.from(groups.entries())
    .map(([type, items]) => ({
      type,
      label: getTypeLabel(type),
      icon: getTypeIcon(type),
      color: getTypeColor(type),
      items: items.slice(0, 8),
    }))
    .sort((a, b) => getTypeOrder(a.type) - getTypeOrder(b.type));
}

export function resetIndex(): void {
  _searchIndex = null;
  _fuse = null;
}
