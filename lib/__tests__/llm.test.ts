import { describe, it, expect, vi, beforeEach } from "vitest";

// Shared mock function that tests can access
const { mockCreate } = vi.hoisted(() => ({
  mockCreate: vi.fn(),
}));

// Mock OpenAI module with a proper class constructor
vi.mock("openai", () => {
  class MockOpenAI {
    chat = {
      completions: {
        create: mockCreate,
      },
    };
  }
  return {
    default: MockOpenAI,
    OpenAI: MockOpenAI,
  };
});

// Mock llm-config
vi.mock("@/lib/llm-config", () => ({
  loadLLMConfig: vi.fn(),
}));

import { chatCompleteStream, validateApiKey } from "@/lib/llm";
import { loadLLMConfig } from "@/lib/llm-config";
import type { LLMConfig } from "@/lib/llm-config";

const makeAsyncIterable = (chunks: Array<{ delta: { content?: string | null } }>) => ({
  async *[Symbol.asyncIterator]() {
    for (const chunk of chunks) {
      yield { choices: [chunk] };
    }
  },
});

describe("llm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("chatCompleteStream", () => {
    it("returns null when no config is saved", async () => {
      vi.mocked(loadLLMConfig).mockReturnValue(undefined);

      const onChunk = vi.fn();
      const result = await chatCompleteStream(
        [{ role: "user", content: "Hello" }],
        onChunk,
      );

      expect(result).toBeNull();
      expect(onChunk).not.toHaveBeenCalled();
    });

    it("returns fallback when stream yields no content", async () => {
      vi.mocked(loadLLMConfig).mockReturnValue({
        apiKey: "sk-test",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      });

      mockCreate.mockResolvedValue(
        makeAsyncIterable([
          { delta: { content: null } },
          { delta: {} },
        ]),
      );

      const onChunk = vi.fn();
      const result = await chatCompleteStream(
        [{ role: "user", content: "Hello" }],
        onChunk,
      );

      expect(onChunk).not.toHaveBeenCalled();
      expect(result).toBe("I'm sorry, I couldn't generate a response.");
    });

    it("calls onChunk with each delta from the stream", async () => {
      vi.mocked(loadLLMConfig).mockReturnValue({
        apiKey: "sk-test",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      });

      mockCreate.mockResolvedValue(
        makeAsyncIterable([
          { delta: { content: "Hello" } },
          { delta: { content: " world" } },
        ]),
      );

      const onChunk = vi.fn();
      const result = await chatCompleteStream(
        [{ role: "user", content: "Hello" }],
        onChunk,
      );

      expect(onChunk).toHaveBeenCalledTimes(2);
      expect(onChunk).toHaveBeenNthCalledWith(1, "Hello");
      expect(onChunk).toHaveBeenNthCalledWith(2, " world");
      expect(result).toBe("Hello world");
    });
  });

  describe("validateApiKey", () => {
    it("returns valid=true on successful API call", async () => {
      mockCreate.mockResolvedValue({
        choices: [{ message: { content: "ok" } }],
      });

      const cfg: LLMConfig = {
        apiKey: "sk-valid",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      };
      const result = await validateApiKey(cfg);
      expect(result.valid).toBe(true);
    });

    it("returns valid=false with 401 error", async () => {
      const err = new Error("Incorrect API key provided");
      (err as any).status = 401;
      mockCreate.mockRejectedValue(err);

      const cfg: LLMConfig = {
        apiKey: "sk-invalid",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      };
      const result = await validateApiKey(cfg);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Invalid API key");
    });

    it("returns valid=false with timeout error", async () => {
      const abortError = new Error("The operation was aborted");
      abortError.name = "AbortError";
      mockCreate.mockRejectedValue(abortError);

      const cfg: LLMConfig = {
        apiKey: "sk-test",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      };
      const result = await validateApiKey(cfg);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("timed out");
    });

    it("returns valid=false with generic error", async () => {
      mockCreate.mockRejectedValue(new Error("Network error"));

      const cfg: LLMConfig = {
        apiKey: "sk-test",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      };
      const result = await validateApiKey(cfg);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Network error");
    });

    it("handles non-Error rejections gracefully", async () => {
      mockCreate.mockRejectedValue("some string error");

      const cfg: LLMConfig = {
        apiKey: "sk-test",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      };
      const result = await validateApiKey(cfg);
      expect(result.valid).toBe(false);
      expect(result.error).toContain("Unknown error");
    });
  });
});
