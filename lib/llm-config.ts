/** LLM provider configuration stored in localStorage. */

export interface LLMConfig {
  apiKey: string;
  model: string;
  baseUrl: string;
}

const STORAGE_KEY = "dev-resource-hub-llm-config";

export const DEFAULT_MODEL = "gpt-4o";
export const DEFAULT_BASE_URL = "https://api.openai.com/v1";

/** Predefined model list with display names. */
export const LLM_MODELS: { id: string; label: string; provider: string }[] = [
  // OpenAI
  { id: "gpt-4o", label: "GPT-4o", provider: "OpenAI" },
  { id: "gpt-4o-mini", label: "GPT-4o Mini", provider: "OpenAI" },
  { id: "gpt-4.1", label: "GPT-4.1", provider: "OpenAI" },
  { id: "o4-mini", label: "o4-mini", provider: "OpenAI" },
  { id: "o3", label: "o3", provider: "OpenAI" },
  // Anthropic (OpenAI-compatible via proxy)
  { id: "claude-sonnet-4-20250514", label: "Claude Sonnet 4", provider: "Anthropic" },
  { id: "claude-4-5-sonnet-20250522", label: "Claude 4.5 Sonnet", provider: "Anthropic" },
  { id: "claude-opus-4-20250514", label: "Claude Opus 4", provider: "Anthropic" },
  // Common open / third-party models
  { id: "deepseek-chat", label: "DeepSeek V3", provider: "DeepSeek" },
  { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro", provider: "Google" },
  { id: "mistral-large-2507", label: "Mistral Large", provider: "Mistral" },
];

/** Load config from localStorage. Returns undefined if not set. */
export function loadLLMConfig(): LLMConfig | undefined {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Partial<LLMConfig>;
    if (!parsed.apiKey) return undefined;
    return {
      apiKey: parsed.apiKey,
      model: parsed.model || DEFAULT_MODEL,
      baseUrl: parsed.baseUrl || DEFAULT_BASE_URL,
    };
  } catch {
    return undefined;
  }
}

/** Save config to localStorage. */
export function saveLLMConfig(config: LLMConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

/** Clear config from localStorage. */
export function clearLLMConfig(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/** Check if a valid config is present. */
export function hasLLMConfig(): boolean {
  const cfg = loadLLMConfig();
  return !!cfg && cfg.apiKey.length > 0;
}
