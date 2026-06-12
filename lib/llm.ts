import OpenAI from "openai";
import { loadLLMConfig, LLMConfig } from "./llm-config";

/** System prompt that makes the assistant context-aware about Dev Resource Hub. */
const SYSTEM_PROMPT = `You are the Dev Resource Hub AI Assistant — an intelligent coding companion embedded inside an open-source developer platform.

## Your Capabilities
- Answer questions about AI coding tools, agents, prompts, models, and workflows
- Help optimize prompts (strip filler, add structure, improve clarity)
- Recommend the right AI tool or model for a specific task
- Explain concepts in the AI / LLM developer ecosystem
- Draft workflow blueprints and agent configurations
- Analyze code quality, suggest improvements, and catch common bugs

## About Dev Resource Hub
The user is on the Dev Resource Hub platform (dev-resource-hub), which includes:
- **/dashboard**: Personalized hub with stats, quick actions, trending tools, analytics
- **/prompt-optimizer**: 6-mode prompt optimizer (Concise, Technical, Structured, Enterprise, Minimal, Agent-Friendly)
- **/token-calculator**: Cost calculator across 10+ frontier models
- **/compare**: Side-by-side comparison of 9 AI coding tools across 12 capabilities
- **/workflow**: Visual drag-and-drop AI workflow builder
- **/ai-agents**: Catalog of autonomous AI agents and frameworks
- **/tools**: Directory of AI-powered developer tools
- **/prompts**: Searchable prompt library
- **/trending**: Live ranking of resources
- **/showcase**: Community-built projects gallery
- **/blogs**: Editorial articles on AI development
- **/ai-finder**: Question-answered recommendation engine
- **/learning**: Learning paths and resources
- **/community**: Discord, contributors, Hall of Fame
- **/marketplace**: Unified marketplace for prompts, tools, and agents

## Response Style
- Be direct, concise, and technical — this is a developer audience
- Use markdown formatting when helpful (code blocks, lists, bold)
- When recommending tools/models, be specific and include reasoning
- When the user asks about optimizing prompts, suggest using the Prompt Optimizer at /prompt-optimizer
- When the user asks about cost, suggest the Token Calculator at /token-calculator
- When the user asks about comparing tools, guide them to /compare
- Keep responses under ~500 words unless the user asks for depth
- If you don't know something, say so honestly — don't fabricate`;

/** Create an OpenAI client from the stored config. */
function createClient(config: LLMConfig): OpenAI {
  return new OpenAI({
    apiKey: config.apiKey,
    baseURL: config.baseUrl,
    dangerouslyAllowBrowser: true,
  });
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/** Options for the chat completion. */
export interface ChatOptions {
  signal?: AbortSignal;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Send a chat message to the LLM and stream the response via onChunk callback.
 * Returns the full response text when complete.
 * Returns null if no config is saved.
 */
export async function chatCompleteStream(
  messages: ChatMessage[],
  onChunk: (chunk: string) => void,
  options?: ChatOptions,
): Promise<string | null> {
  const config = loadLLMConfig();
  if (!config) return null;

  const client = createClient(config);
  const stream = await client.chat.completions.create(
    {
      model: config.model,
      messages: [
        { role: "system" as const, content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role as "user" | "assistant", content: m.content })),
      ],
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 1024,
      stream: true,
    },
    { signal: options?.signal },
  );

  let fullText = "";
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) {
      fullText += delta;
      onChunk(delta);
    }
  }

  return fullText || "I'm sorry, I couldn't generate a response.";
}

/** Validate an API key by making a minimal chat completion request (1 token). */
export async function validateApiKey(config: LLMConfig): Promise<{ valid: boolean; error?: string }> {
  try {
    const client = createClient(config);
    await client.chat.completions.create(
      {
        model: config.model,
        messages: [{ role: "user", content: "hi" }],
        max_tokens: 1,
      },
      { signal: AbortSignal.timeout(10000) },
    );
    return { valid: true };
  } catch (err: unknown) {
    if (err instanceof Error) {
      if (err.name === "AbortError") {
        return { valid: false, error: "Request timed out. Check your base URL." };
      }
      const cause = err as { status?: number; message?: string };
      if (cause.status === 401) {
        return { valid: false, error: "Invalid API key. Please check and try again." };
      }
      return { valid: false, error: cause.message || err.message };
    }
    return { valid: false, error: "Unknown error validating API key." };
  }
}
