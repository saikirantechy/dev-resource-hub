import { describe, it, expect, beforeEach } from "vitest";
import {
  LLMConfig,
  LLM_MODELS,
  DEFAULT_MODEL,
  DEFAULT_BASE_URL,
  loadLLMConfig,
  saveLLMConfig,
  clearLLMConfig,
  hasLLMConfig,
} from "@/lib/llm-config";

const STORAGE_KEY = "dev-resource-hub-llm-config";

function setMockStoredConfig(config: LLMConfig): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

describe("llm-config", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("constants", () => {
    it("has a default model", () => {
      expect(DEFAULT_MODEL).toBeTruthy();
      expect(typeof DEFAULT_MODEL).toBe("string");
    });

    it("has a default base URL", () => {
      expect(DEFAULT_BASE_URL).toBe("https://api.openai.com/v1");
    });

    it("lists at least 8 models", () => {
      expect(LLM_MODELS.length).toBeGreaterThanOrEqual(8);
    });

    it("each model has id, label, and provider", () => {
      for (const m of LLM_MODELS) {
        expect(m.id).toBeTruthy();
        expect(m.label).toBeTruthy();
        expect(m.provider).toBeTruthy();
      }
    });

    it("covers multiple providers", () => {
      const providers = new Set(LLM_MODELS.map((m) => m.provider));
      expect(providers.has("OpenAI")).toBe(true);
      expect(providers.has("Anthropic")).toBe(true);
      expect(providers.has("DeepSeek")).toBe(true);
    });
  });

  describe("saveLLMConfig", () => {
    it("saves config to localStorage", () => {
      const config: LLMConfig = {
        apiKey: "sk-test-123",
        model: "gpt-4o-mini",
        baseUrl: "https://api.openai.com/v1",
      };
      saveLLMConfig(config);

      const raw = localStorage.getItem(STORAGE_KEY);
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw!);
      expect(parsed.apiKey).toBe("sk-test-123");
      expect(parsed.model).toBe("gpt-4o-mini");
    });

    it("overwrites existing config", () => {
      saveLLMConfig({
        apiKey: "sk-old",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      });
      saveLLMConfig({
        apiKey: "sk-new",
        model: "gpt-4o-mini",
        baseUrl: "https://api.openai.com/v1",
      });

      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
      expect(parsed.apiKey).toBe("sk-new");
    });
  });

  describe("loadLLMConfig", () => {
    it("returns undefined when nothing is stored", () => {
      expect(loadLLMConfig()).toBeUndefined();
    });

    it("returns undefined when stored value is empty string", () => {
      localStorage.setItem(STORAGE_KEY, "");
      expect(loadLLMConfig()).toBeUndefined();
    });

    it("returns undefined when stored value is invalid JSON", () => {
      localStorage.setItem(STORAGE_KEY, "not-json");
      expect(loadLLMConfig()).toBeUndefined();
    });

    it("returns undefined when apiKey is missing", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ model: "gpt-4o" }));
      expect(loadLLMConfig()).toBeUndefined();
    });

    it("loads a valid config", () => {
      setMockStoredConfig({
        apiKey: "sk-test",
        model: "gpt-4o-mini",
        baseUrl: "https://api.openai.com/v1",
      });

      const config = loadLLMConfig();
      expect(config).toBeDefined();
      expect(config!.apiKey).toBe("sk-test");
      expect(config!.model).toBe("gpt-4o-mini");
    });

    it("fills in default model when missing", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ apiKey: "sk-test" }),
      );
      const config = loadLLMConfig();
      expect(config!.model).toBe(DEFAULT_MODEL);
    });

    it("fills in default baseUrl when missing", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ apiKey: "sk-test", model: "gpt-4o" }),
      );
      const config = loadLLMConfig();
      expect(config!.baseUrl).toBe(DEFAULT_BASE_URL);
    });
  });

  describe("clearLLMConfig", () => {
    it("removes config from localStorage", () => {
      setMockStoredConfig({
        apiKey: "sk-test",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      });
      expect(loadLLMConfig()).toBeDefined();

      clearLLMConfig();
      expect(loadLLMConfig()).toBeUndefined();
    });

    it("is safe to call when nothing is stored", () => {
      expect(() => clearLLMConfig()).not.toThrow();
    });
  });

  describe("hasLLMConfig", () => {
    it("returns false when no config", () => {
      expect(hasLLMConfig()).toBe(false);
    });

    it("returns false for empty apiKey", () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ apiKey: "" }),
      );
      expect(hasLLMConfig()).toBe(false);
    });

    it("returns true when valid config exists", () => {
      setMockStoredConfig({
        apiKey: "sk-test",
        model: "gpt-4o",
        baseUrl: "https://api.openai.com/v1",
      });
      expect(hasLLMConfig()).toBe(true);
    });
  });
});
