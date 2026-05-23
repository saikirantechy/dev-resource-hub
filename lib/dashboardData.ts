export interface TrendingTool {
  name: string;
  emoji: string;
  category: string;
  stars: string;
  delta: string;
  description: string;
  models: string[];
  href: string;
  accent: { from: string; to: string; text: string };
}

export interface ActivityItem {
  id: string;
  kind: "launch" | "prompt" | "repo" | "news";
  title: string;
  meta: string;
  when: string;
  href?: string;
}

export interface DashboardAgent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  status: "idle" | "running" | "ready";
  capabilities: string[];
  accent: { from: string; to: string; text: string; border: string };
}

export interface ShowcaseProject {
  id: string;
  title: string;
  author: string;
  emoji: string;
  built: string;
  tags: string[];
  href: string;
}

export const TRENDING_TOOLS: TrendingTool[] = [
  {
    name: "Cursor",
    emoji: "⌨️",
    category: "AI IDE",
    stars: "62.4k",
    delta: "+12.8%",
    description: "Composer-driven multi-file edits and codebase-aware chat.",
    models: ["Claude 4.7", "GPT-4o"],
    href: "https://cursor.sh",
    accent: { from: "from-orange-500/20", to: "to-pink-500/10", text: "text-orange-300" },
  },
  {
    name: "Claude Code",
    emoji: "🧠",
    category: "CLI Agent",
    stars: "48.1k",
    delta: "+24.6%",
    description: "Terminal-native coding agent with 1M context.",
    models: ["Claude 4.7 Opus"],
    href: "https://claude.ai/claude-code",
    accent: { from: "from-orange-500/20", to: "to-red-500/10", text: "text-orange-300" },
  },
  {
    name: "v0",
    emoji: "🎨",
    category: "UI Builder",
    stars: "31.2k",
    delta: "+8.4%",
    description: "Generative UI for React + shadcn/ui.",
    models: ["v0 base"],
    href: "https://v0.dev",
    accent: { from: "from-blue-500/20", to: "to-cyan-500/10", text: "text-blue-300" },
  },
  {
    name: "Windsurf",
    emoji: "🌊",
    category: "AI IDE",
    stars: "27.8k",
    delta: "+18.2%",
    description: "Cascade flow + browser-preview built-in.",
    models: ["Claude 4.5", "GPT-4o"],
    href: "https://codeium.com/windsurf",
    accent: { from: "from-cyan-500/20", to: "to-blue-500/10", text: "text-cyan-300" },
  },
  {
    name: "Lovable",
    emoji: "💖",
    category: "Full-Stack",
    stars: "19.6k",
    delta: "+34.7%",
    description: "Full-stack app builder from natural language.",
    models: ["GPT-4o", "Claude 4.5"],
    href: "https://lovable.dev",
    accent: { from: "from-pink-500/20", to: "to-red-500/10", text: "text-pink-300" },
  },
  {
    name: "DeepSeek V3",
    emoji: "🐳",
    category: "LLM",
    stars: "44.5k",
    delta: "+41.0%",
    description: "Best price-to-perf model for code generation.",
    models: ["DeepSeek V3"],
    href: "https://deepseek.com",
    accent: { from: "from-cyan-500/20", to: "to-purple-500/10", text: "text-cyan-300" },
  },
];

export const ACTIVITY_FEED: ActivityItem[] = [
  { id: "1", kind: "launch", title: "Claude 4.7 Opus is now generally available", meta: "anthropic.com", when: "2m" },
  { id: "2", kind: "repo",   title: "vercel/next.js · 130k ★ (+312 today)",        meta: "github.com",  when: "11m" },
  { id: "3", kind: "prompt", title: "New top prompt: '7-step refactor agent v2'",  meta: "Prompt Library", when: "18m" },
  { id: "4", kind: "launch", title: "Lovable ships v2 with team workspaces",        meta: "lovable.dev", when: "42m" },
  { id: "5", kind: "news",   title: "OpenAI cuts GPT-4o pricing 30% across the board", meta: "openai.com", when: "1h" },
  { id: "6", kind: "repo",   title: "anthropics/claude-code · 48k ★ (+892 today)",  meta: "github.com",  when: "1h" },
  { id: "7", kind: "prompt", title: "Marketplace: 'JSON-safe extraction agent' hits 10k uses", meta: "Marketplace", when: "2h" },
  { id: "8", kind: "launch", title: "DeepSeek V3.1 launch — open weights",          meta: "deepseek.com", when: "3h" },
];

export const DASHBOARD_AGENTS: DashboardAgent[] = [
  {
    id: "planner",
    name: "Planner",
    role: "Breaks goals into atomic tasks",
    emoji: "🧭",
    status: "ready",
    capabilities: ["Task decomposition", "Dependency graphs", "Estimation"],
    accent: { from: "from-blue-500/20", to: "to-cyan-500/10", text: "text-blue-300", border: "border-blue-500/30" },
  },
  {
    id: "architect",
    name: "Architect",
    role: "Designs systems before code lands",
    emoji: "📐",
    status: "running",
    capabilities: ["ADR drafting", "Diagram synthesis", "Tradeoff matrices"],
    accent: { from: "from-purple-500/20", to: "to-pink-500/10", text: "text-purple-300", border: "border-purple-500/30" },
  },
  {
    id: "qa",
    name: "QA",
    role: "Generates tests and audits coverage",
    emoji: "🧪",
    status: "ready",
    capabilities: ["Unit + e2e gen", "Flaky test triage", "Mutation testing"],
    accent: { from: "from-emerald-500/20", to: "to-cyan-500/10", text: "text-emerald-300", border: "border-emerald-500/30" },
  },
  {
    id: "security",
    name: "Security",
    role: "Scans for OWASP top 10 + secrets",
    emoji: "🛡",
    status: "idle",
    capabilities: ["SAST", "Secret detection", "Dep CVE check"],
    accent: { from: "from-pink-500/20" , to: "to-red-500/10", text: "text-pink-300", border: "border-pink-500/30" },
  },
  {
    id: "devops",
    name: "DevOps",
    role: "Owns deploys, infra, and rollbacks",
    emoji: "⚙️",
    status: "running",
    capabilities: ["IaC drafting", "CI/CD wiring", "Rollback plans"],
    accent: { from: "from-orange-500/20", to: "to-pink-500/10", text: "text-orange-300", border: "border-orange-500/30" },
  },
];

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "1",
    title: "Stackgen — instant SaaS scaffolder",
    author: "@kira",
    emoji: "⚡",
    built: "Cursor + v0 + Supabase",
    tags: ["MVP", "Next.js"],
    href: "/showcase",
  },
  {
    id: "2",
    title: "Promptly — prompt CI for teams",
    author: "@aman",
    emoji: "📝",
    built: "Claude + Workflow Builder",
    tags: ["DevTool", "Prompt CI"],
    href: "/showcase",
  },
  {
    id: "3",
    title: "ShipOps — autonomous on-call agent",
    author: "@noor",
    emoji: "🚀",
    built: "Devin + Warp + LangGraph",
    tags: ["Agent", "DevOps"],
    href: "/showcase",
  },
];

/** 14-day usage series for the analytics chart (prompts run per day). */
export const USAGE_SERIES: number[] = [
  120, 142, 165, 158, 184, 210, 232, 218, 246, 271, 263, 298, 322, 348,
];

/** Tool category usage breakdown for the bar chart. */
export const CATEGORY_USAGE: { label: string; value: number; color: string }[] = [
  { label: "IDE",       value: 42, color: "from-orange-400 to-pink-400" },
  { label: "Agent",     value: 28, color: "from-purple-400 to-pink-400" },
  { label: "LLM",       value: 18, color: "from-emerald-400 to-cyan-400" },
  { label: "Builder",   value: 12, color: "from-blue-400 to-cyan-400" },
  { label: "Terminal",  value: 8,  color: "from-pink-400 to-purple-400" },
];

/** Suggested AI assistant prompts shown in the sidebar. */
export const ASSISTANT_SUGGESTIONS: { label: string; emoji: string }[] = [
  { label: "Optimize my last prompt",         emoji: "⚡" },
  { label: "Which model is cheapest for me?", emoji: "💸" },
  { label: "Generate a workflow blueprint",   emoji: "🧬" },
  { label: "Find an agent for my use case",   emoji: "🤖" },
];

export const STATS = [
  { label: "Prompts Optimized", value: "248", delta: "+18%", color: "text-emerald-300" },
  { label: "Tokens Saved",      value: "1.2M", delta: "+27%", color: "text-cyan-300" },
  { label: "Cost Reduced",      value: "$842",  delta: "+12%", color: "text-orange-300" },
  { label: "Agents Active",     value: "5",     delta: "+2",    color: "text-purple-300" },
];
