export type ModelFamily = "OpenAI" | "Anthropic" | "Google" | "Meta" | "DeepSeek" | "Mistral";

export interface ModelSpec {
  id: string;
  name: string;
  family: ModelFamily;
  emoji: string;
  /** Average characters per token, derived from public benchmarks. */
  charsPerToken: number;
  /** Maximum context window in tokens. */
  contextWindow: number;
  /** Cost per 1M input tokens, USD. */
  inputCost: number;
  /** Cost per 1M output tokens, USD. */
  outputCost: number;
  accent: {
    from: string;
    to: string;
    text: string;
    border: string;
  };
  tagline: string;
}

export const MODELS: ModelSpec[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    family: "OpenAI",
    emoji: "🟢",
    charsPerToken: 4.0,
    contextWindow: 128_000,
    inputCost: 2.5,
    outputCost: 10.0,
    accent: { from: "from-emerald-500/20", to: "to-cyan-500/10", text: "text-emerald-300", border: "border-emerald-500/30" },
    tagline: "Default OpenAI multimodal",
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o mini",
    family: "OpenAI",
    emoji: "🟢",
    charsPerToken: 4.0,
    contextWindow: 128_000,
    inputCost: 0.15,
    outputCost: 0.6,
    accent: { from: "from-emerald-500/15", to: "to-blue-500/10", text: "text-emerald-300", border: "border-emerald-500/25" },
    tagline: "Cheapest OpenAI tier",
  },
  {
    id: "claude-opus-4-7",
    name: "Claude 4.7 Opus",
    family: "Anthropic",
    emoji: "🧠",
    charsPerToken: 3.8,
    contextWindow: 1_000_000,
    inputCost: 15.0,
    outputCost: 75.0,
    accent: { from: "from-orange-500/20", to: "to-red-500/10", text: "text-orange-300", border: "border-orange-500/30" },
    tagline: "Frontier reasoning · 1M context",
  },
  {
    id: "claude-sonnet-4-6",
    name: "Claude 4.6 Sonnet",
    family: "Anthropic",
    emoji: "🎼",
    charsPerToken: 3.8,
    contextWindow: 200_000,
    inputCost: 3.0,
    outputCost: 15.0,
    accent: { from: "from-orange-500/15", to: "to-pink-500/10", text: "text-orange-300", border: "border-orange-500/25" },
    tagline: "Workhorse balance tier",
  },
  {
    id: "claude-haiku-4-5",
    name: "Claude 4.5 Haiku",
    family: "Anthropic",
    emoji: "🍃",
    charsPerToken: 3.8,
    contextWindow: 200_000,
    inputCost: 0.8,
    outputCost: 4.0,
    accent: { from: "from-pink-500/15", to: "to-orange-500/10", text: "text-pink-300", border: "border-pink-500/25" },
    tagline: "Fast + affordable Anthropic",
  },
  {
    id: "gemini-2-5-pro",
    name: "Gemini 2.5 Pro",
    family: "Google",
    emoji: "✨",
    charsPerToken: 4.2,
    contextWindow: 2_000_000,
    inputCost: 1.25,
    outputCost: 5.0,
    accent: { from: "from-blue-500/20", to: "to-purple-500/10", text: "text-blue-300", border: "border-blue-500/30" },
    tagline: "Largest context, multi-modal",
  },
  {
    id: "gemini-2-5-flash",
    name: "Gemini 2.5 Flash",
    family: "Google",
    emoji: "⚡",
    charsPerToken: 4.2,
    contextWindow: 1_000_000,
    inputCost: 0.075,
    outputCost: 0.3,
    accent: { from: "from-blue-500/15", to: "to-cyan-500/10", text: "text-blue-300", border: "border-blue-500/25" },
    tagline: "Ultra-cheap Google tier",
  },
  {
    id: "llama-3-1-405b",
    name: "Llama 3.1 405B",
    family: "Meta",
    emoji: "🦙",
    charsPerToken: 4.0,
    contextWindow: 128_000,
    inputCost: 3.5,
    outputCost: 3.5,
    accent: { from: "from-purple-500/20", to: "to-pink-500/10", text: "text-purple-300", border: "border-purple-500/30" },
    tagline: "Open-weight frontier · self-hostable",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    family: "DeepSeek",
    emoji: "🐳",
    charsPerToken: 3.5,
    contextWindow: 128_000,
    inputCost: 0.27,
    outputCost: 1.1,
    accent: { from: "from-cyan-500/20", to: "to-blue-500/10", text: "text-cyan-300", border: "border-cyan-500/30" },
    tagline: "Best price/perf for code",
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    family: "Mistral",
    emoji: "🌪",
    charsPerToken: 4.0,
    contextWindow: 128_000,
    inputCost: 2.0,
    outputCost: 6.0,
    accent: { from: "from-yellow-500/15", to: "to-orange-500/10", text: "text-yellow-300", border: "border-yellow-500/25" },
    tagline: "EU-based frontier model",
  },
];

export function tokensFor(text: string, charsPerToken: number): number {
  if (!text) return 0;
  return Math.max(1, Math.ceil(text.length / charsPerToken));
}

/** Cost in USD given input tokens and assumed output tokens. */
export function costFor(
  model: ModelSpec,
  inputTokens: number,
  outputTokens: number
): number {
  return (inputTokens * model.inputCost + outputTokens * model.outputCost) / 1_000_000;
}

export function projectCost(
  model: ModelSpec,
  inputTokens: number,
  outputTokens: number,
  requests: number
): number {
  return costFor(model, inputTokens, outputTokens) * requests;
}

export function formatUsd(value: number): string {
  if (value === 0) return "$0";
  if (value < 0.001) return `$${value.toExponential(2)}`;
  if (value < 1) return `$${value.toFixed(4)}`;
  if (value < 100) return `$${value.toFixed(2)}`;
  return `$${Math.round(value).toLocaleString()}`;
}

export function formatTokens(value: number): string {
  if (value < 1_000) return value.toLocaleString();
  if (value < 1_000_000) return `${(value / 1_000).toFixed(1)}k`;
  return `${(value / 1_000_000).toFixed(2)}M`;
}

export function contextPercent(tokens: number, contextWindow: number): number {
  return Math.min(100, Math.round((tokens / contextWindow) * 100));
}

export const SAMPLE_TEXT = `You are a senior backend engineer reviewing a pull request. The PR refactors our payment processing module to use the new Stripe webhook signing v2 API. Walk through the changes file-by-file. For each file, note: (1) potential correctness issues, (2) error-handling gaps, (3) any place where the new signing scheme is mis-applied. Flag any backward-incompatible behavior. Suggest concrete fixes inline. Return your review as a markdown document.`;
