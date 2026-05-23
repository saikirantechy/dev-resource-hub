export type ToolCategory =
  | "IDE"
  | "Agent"
  | "Assistant"
  | "Builder"
  | "Terminal"
  | "LLM";

export type Tier = "Free" | "Freemium" | "Paid" | "Enterprise" | "Open Source";

export interface PriceTier {
  name: string;
  price: string;
  highlight?: boolean;
}

export interface CompareTool {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  category: ToolCategory;
  tier: Tier;
  bestFor: string[];
  url: string;
  rating: number;
  reviews: number;
  /** 0–100 per capability */
  performance: {
    speed: number;
    accuracy: number;
    autonomy: number;
    ecosystem: number;
    learning: number;
  };
  pricing: PriceTier[];
  models: string[];
  pluginEcosystem: string;
  capabilities: {
    multiFileEdit: boolean;
    inlineChat: boolean;
    terminalAi: boolean;
    autonomousMode: boolean;
    codebaseContext: boolean;
    pluginSystem: boolean;
    freeTier: boolean;
    selfHostable: boolean;
    voiceMode: boolean;
    teamCollab: boolean;
    customAgents: boolean;
    browserPreview: boolean;
  };
  pros: string[];
  cons: string[];
  accent: {
    from: string;
    to: string;
    text: string;
    border: string;
  };
}

export const CAPABILITY_LABELS: Record<keyof CompareTool["capabilities"], string> = {
  multiFileEdit: "Multi-file Edit",
  inlineChat: "Inline Chat",
  terminalAi: "Terminal AI",
  autonomousMode: "Autonomous Mode",
  codebaseContext: "Codebase Context",
  pluginSystem: "Plugin System",
  freeTier: "Free Tier",
  selfHostable: "Self-Hostable",
  voiceMode: "Voice Mode",
  teamCollab: "Team Collab",
  customAgents: "Custom Agents",
  browserPreview: "Browser Preview",
};

export const TOOL_CATEGORIES: ToolCategory[] = [
  "IDE",
  "Agent",
  "Assistant",
  "Builder",
  "Terminal",
  "LLM",
];

export const TIERS: Tier[] = ["Free", "Freemium", "Paid", "Enterprise", "Open Source"];

export const COMPARE_TOOLS: CompareTool[] = [
  {
    id: "cursor",
    name: "Cursor",
    tagline: "AI-first code editor",
    emoji: "⌨️",
    category: "IDE",
    tier: "Freemium",
    bestFor: ["Full codebase refactoring", "Multi-file edits", "Rapid prototyping"],
    url: "https://cursor.sh",
    rating: 4.8,
    reviews: 28400,
    performance: { speed: 92, accuracy: 90, autonomy: 70, ecosystem: 88, learning: 88 },
    pricing: [
      { name: "Hobby", price: "Free" },
      { name: "Pro", price: "$20 / mo", highlight: true },
      { name: "Business", price: "$40 / mo" },
    ],
    models: ["Claude 4.5", "GPT-4o", "Gemini 2.5", "DeepSeek"],
    pluginEcosystem: "VS Code extension ecosystem",
    capabilities: {
      multiFileEdit: true,
      inlineChat: true,
      terminalAi: true,
      autonomousMode: true,
      codebaseContext: true,
      pluginSystem: true,
      freeTier: true,
      selfHostable: false,
      voiceMode: true,
      teamCollab: true,
      customAgents: true,
      browserPreview: false,
    },
    pros: ["Best-in-class autocomplete", "Composer multi-file edits", "Fast indexing on large repos"],
    cons: ["Pro tier required for top models", "Closed source"],
    accent: { from: "from-orange-500/20", to: "to-pink-500/10", text: "text-orange-300", border: "border-orange-500/30" },
  },
  {
    id: "windsurf",
    name: "Windsurf",
    tagline: "Cascade-powered AI IDE",
    emoji: "🌊",
    category: "IDE",
    tier: "Freemium",
    bestFor: ["Deep codebase context", "Flow-state coding", "Long autonomous sessions"],
    url: "https://codeium.com/windsurf",
    rating: 4.7,
    reviews: 14200,
    performance: { speed: 90, accuracy: 88, autonomy: 82, ecosystem: 76, learning: 86 },
    pricing: [
      { name: "Free", price: "Free" },
      { name: "Pro", price: "$15 / mo", highlight: true },
      { name: "Teams", price: "$35 / mo" },
    ],
    models: ["Claude 4.5", "GPT-4o", "Cascade Base"],
    pluginEcosystem: "Codeium plugin family",
    capabilities: {
      multiFileEdit: true,
      inlineChat: true,
      terminalAi: true,
      autonomousMode: true,
      codebaseContext: true,
      pluginSystem: true,
      freeTier: true,
      selfHostable: false,
      voiceMode: false,
      teamCollab: true,
      customAgents: false,
      browserPreview: true,
    },
    pros: ["Cascade flow is unmatched for context", "Generous free tier", "Built-in browser preview"],
    cons: ["Smaller plugin ecosystem", "Younger product"],
    accent: { from: "from-cyan-500/20", to: "to-blue-500/10", text: "text-cyan-300", border: "border-cyan-500/30" },
  },
  {
    id: "devin",
    name: "Devin AI",
    tagline: "Autonomous AI engineer",
    emoji: "🤖",
    category: "Agent",
    tier: "Enterprise",
    bestFor: ["End-to-end task execution", "Long-horizon engineering", "Ticket automation"],
    url: "https://devin.ai",
    rating: 4.4,
    reviews: 6800,
    performance: { speed: 78, accuracy: 80, autonomy: 96, ecosystem: 68, learning: 72 },
    pricing: [
      { name: "Team", price: "$500 / mo", highlight: true },
      { name: "Enterprise", price: "Custom" },
    ],
    models: ["Claude 4.5", "GPT-4o", "Custom Devin core"],
    pluginEcosystem: "Slack + GitHub + Linear integrations",
    capabilities: {
      multiFileEdit: true,
      inlineChat: false,
      terminalAi: true,
      autonomousMode: true,
      codebaseContext: true,
      pluginSystem: false,
      freeTier: false,
      selfHostable: false,
      voiceMode: false,
      teamCollab: true,
      customAgents: false,
      browserPreview: true,
    },
    pros: ["True autonomous engineering", "Handles multi-hour tasks", "Self-runs tests + PRs"],
    cons: ["Expensive", "Slow vs interactive tools", "Limited fine control"],
    accent: { from: "from-purple-500/20", to: "to-pink-500/10", text: "text-purple-300", border: "border-purple-500/30" },
  },
  {
    id: "copilot",
    name: "GitHub Copilot",
    tagline: "Mature AI pair programmer",
    emoji: "🐙",
    category: "Assistant",
    tier: "Paid",
    bestFor: ["IDE-agnostic autocomplete", "Enterprise compliance", "Chat-driven coding"],
    url: "https://github.com/features/copilot",
    rating: 4.6,
    reviews: 56400,
    performance: { speed: 88, accuracy: 82, autonomy: 60, ecosystem: 96, learning: 92 },
    pricing: [
      { name: "Individual", price: "$10 / mo" },
      { name: "Business", price: "$19 / mo", highlight: true },
      { name: "Enterprise", price: "$39 / mo" },
    ],
    models: ["GPT-4o", "Claude 4.5", "Gemini 2.5"],
    pluginEcosystem: "VS Code, JetBrains, Neovim, Xcode",
    capabilities: {
      multiFileEdit: true,
      inlineChat: true,
      terminalAi: true,
      autonomousMode: true,
      codebaseContext: true,
      pluginSystem: true,
      freeTier: true,
      selfHostable: false,
      voiceMode: true,
      teamCollab: true,
      customAgents: true,
      browserPreview: false,
    },
    pros: ["Works in every IDE", "Strongest enterprise story", "GitHub-native context"],
    cons: ["Slower model adoption", "Autocomplete still primary mode"],
    accent: { from: "from-emerald-500/20", to: "to-cyan-500/10", text: "text-emerald-300", border: "border-emerald-500/30" },
  },
  {
    id: "claude",
    name: "Claude",
    tagline: "Frontier coding model + Claude Code",
    emoji: "🧠",
    category: "LLM",
    tier: "Freemium",
    bestFor: ["Long context reasoning", "Refactoring large files", "System design discussion"],
    url: "https://claude.ai",
    rating: 4.9,
    reviews: 41200,
    performance: { speed: 84, accuracy: 96, autonomy: 80, ecosystem: 82, learning: 78 },
    pricing: [
      { name: "Free", price: "Free" },
      { name: "Pro", price: "$20 / mo", highlight: true },
      { name: "Max", price: "$100 / mo" },
      { name: "API", price: "Usage" },
    ],
    models: ["Claude 4.7 Opus", "Claude 4.6 Sonnet", "Claude 4.5 Haiku"],
    pluginEcosystem: "MCP + Claude Code CLI + IDE plugins",
    capabilities: {
      multiFileEdit: true,
      inlineChat: true,
      terminalAi: true,
      autonomousMode: true,
      codebaseContext: true,
      pluginSystem: true,
      freeTier: true,
      selfHostable: false,
      voiceMode: true,
      teamCollab: true,
      customAgents: true,
      browserPreview: false,
    },
    pros: ["Best reasoning on hard code", "1M token context", "Claude Code is dev-grade"],
    cons: ["Not an IDE itself", "Rate limits on Free"],
    accent: { from: "from-orange-500/20", to: "to-red-500/10", text: "text-orange-300", border: "border-orange-500/30" },
  },
  {
    id: "replit",
    name: "Replit Ghostwriter",
    tagline: "AI inside the cloud IDE",
    emoji: "🚀",
    category: "Builder",
    tier: "Freemium",
    bestFor: ["Learning to code", "Browser-native projects", "Instant deploy"],
    url: "https://replit.com",
    rating: 4.5,
    reviews: 18900,
    performance: { speed: 86, accuracy: 78, autonomy: 74, ecosystem: 80, learning: 96 },
    pricing: [
      { name: "Starter", price: "Free" },
      { name: "Replit Core", price: "$20 / mo", highlight: true },
      { name: "Teams", price: "$33 / mo" },
    ],
    models: ["GPT-4o", "Claude 4.5"],
    pluginEcosystem: "Replit packages + DB + Deploy",
    capabilities: {
      multiFileEdit: true,
      inlineChat: true,
      terminalAi: true,
      autonomousMode: true,
      codebaseContext: true,
      pluginSystem: false,
      freeTier: true,
      selfHostable: false,
      voiceMode: false,
      teamCollab: true,
      customAgents: false,
      browserPreview: true,
    },
    pros: ["Zero-setup environment", "Great for students", "Built-in deploys"],
    cons: ["Best inside Replit only", "Heavier for pro workflows"],
    accent: { from: "from-yellow-500/20", to: "to-orange-500/10", text: "text-yellow-300", border: "border-yellow-500/30" },
  },
  {
    id: "warp",
    name: "Warp AI",
    tagline: "AI-native terminal",
    emoji: "⚡",
    category: "Terminal",
    tier: "Freemium",
    bestFor: ["Shell productivity", "Devops one-liners", "Command discovery"],
    url: "https://warp.dev",
    rating: 4.7,
    reviews: 9700,
    performance: { speed: 94, accuracy: 84, autonomy: 60, ecosystem: 70, learning: 84 },
    pricing: [
      { name: "Free", price: "Free" },
      { name: "Pro", price: "$15 / mo", highlight: true },
      { name: "Team", price: "$22 / mo" },
    ],
    models: ["GPT-4o", "Claude 4.5"],
    pluginEcosystem: "Warp Drive + workflows + notebooks",
    capabilities: {
      multiFileEdit: false,
      inlineChat: true,
      terminalAi: true,
      autonomousMode: false,
      codebaseContext: false,
      pluginSystem: true,
      freeTier: true,
      selfHostable: false,
      voiceMode: true,
      teamCollab: true,
      customAgents: false,
      browserPreview: false,
    },
    pros: ["Fastest terminal UX", "Excellent AI command suggestion", "Shared workflows"],
    cons: ["Not for editing code files", "macOS/Linux first"],
    accent: { from: "from-pink-500/20", to: "to-purple-500/10", text: "text-pink-300", border: "border-pink-500/30" },
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    tagline: "Generative UI for React + shadcn",
    emoji: "🎨",
    category: "Builder",
    tier: "Freemium",
    bestFor: ["UI generation", "shadcn/ui components", "Landing pages"],
    url: "https://v0.dev",
    rating: 4.7,
    reviews: 22100,
    performance: { speed: 90, accuracy: 86, autonomy: 70, ecosystem: 80, learning: 92 },
    pricing: [
      { name: "Free", price: "Free" },
      { name: "Premium", price: "$20 / mo", highlight: true },
      { name: "Team", price: "$30 / mo" },
    ],
    models: ["v0 base", "GPT-4o"],
    pluginEcosystem: "Vercel + shadcn/ui + Next.js",
    capabilities: {
      multiFileEdit: true,
      inlineChat: true,
      terminalAi: false,
      autonomousMode: false,
      codebaseContext: false,
      pluginSystem: false,
      freeTier: true,
      selfHostable: false,
      voiceMode: false,
      teamCollab: true,
      customAgents: false,
      browserPreview: true,
    },
    pros: ["Beautiful UI output", "Ships Next.js code", "Tight Vercel integration"],
    cons: ["Frontend-only", "Not a full IDE"],
    accent: { from: "from-blue-500/20", to: "to-cyan-500/10", text: "text-blue-300", border: "border-blue-500/30" },
  },
  {
    id: "lovable",
    name: "Lovable",
    tagline: "Full-stack AI app builder",
    emoji: "💖",
    category: "Builder",
    tier: "Freemium",
    bestFor: ["Full-stack apps from prompts", "Indie SaaS", "MVPs in minutes"],
    url: "https://lovable.dev",
    rating: 4.6,
    reviews: 11500,
    performance: { speed: 88, accuracy: 80, autonomy: 86, ecosystem: 74, learning: 90 },
    pricing: [
      { name: "Free", price: "Free" },
      { name: "Pro", price: "$25 / mo", highlight: true },
      { name: "Scale", price: "$50 / mo" },
    ],
    models: ["GPT-4o", "Claude 4.5"],
    pluginEcosystem: "Supabase + Stripe + GitHub",
    capabilities: {
      multiFileEdit: true,
      inlineChat: true,
      terminalAi: false,
      autonomousMode: true,
      codebaseContext: true,
      pluginSystem: false,
      freeTier: true,
      selfHostable: false,
      voiceMode: false,
      teamCollab: true,
      customAgents: false,
      browserPreview: true,
    },
    pros: ["Full-stack output", "Hosts + deploys", "Beginner-friendly"],
    cons: ["Less control over architecture", "Heavier per build"],
    accent: { from: "from-pink-500/20", to: "to-red-500/10", text: "text-pink-300", border: "border-pink-500/30" },
  },
];

export function getToolById(id: string): CompareTool | undefined {
  return COMPARE_TOOLS.find((t) => t.id === id);
}

export function performanceAverage(t: CompareTool): number {
  const p = t.performance;
  return Math.round((p.speed + p.accuracy + p.autonomy + p.ecosystem + p.learning) / 5);
}
