"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  User as UserIcon,
  Settings,
  PlugZap,
  StopCircle,
} from "lucide-react";
import { ASSISTANT_SUGGESTIONS } from "@/lib/dashboardData";
import { chatCompleteStream, ChatMessage } from "@/lib/llm";
import { hasLLMConfig } from "@/lib/llm-config";
import LlmSettingsPanel from "./LlmSettingsPanel";
import ModelBadge from "./ModelBadge";

interface ChatMsg {
  id: string;
  role: "assistant" | "user";
  text: string;
  streaming?: boolean;
  error?: boolean;
}

let msgCounter = 0;
function generateId(): string {
  msgCounter += 1;
  return `msg-${msgCounter}-${Date.now()}`;
}

const INITIAL_MESSAGES: ChatMsg[] = [
  {
    id: "m1",
    role: "assistant",
    text: "Hey 👋 I'm your AI-powered dev assistant. I can optimize prompts, recommend models, draft workflows, and more. Connect your API key in settings to get started, or pick a suggestion below.",
  },
];

export default function AssistantPanel() {
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [configOpen, setConfigOpen] = useState(false);
  const [configured, setConfigured] = useState(hasLLMConfig());
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<ChatMsg[]>(messages);
  messagesRef.current = messages;

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  const handleConfigChange = useCallback(() => {
    setConfigured(hasLLMConfig());
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setStreaming(false);
    setMessages((prev) =>
      prev.map((m) => (m.streaming ? { ...m, streaming: false } : m)),
    );
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const v = text.trim();
      if (!v || streaming) return;

      const userMsg: ChatMsg = { id: generateId(), role: "user", text: v };
      const assistantMsgId = generateId();
      const assistantMsg: ChatMsg = {
        id: assistantMsgId,
        role: "assistant",
        text: "",
        streaming: true,
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setInput("");
      setStreaming(true);
      scrollToBottom();

      const controller = new AbortController();
      abortRef.current = controller;

      // Build conversation history from ref to avoid stale closures
      const history: ChatMessage[] = messagesRef.current
        .filter((m) => !m.streaming && !m.error)
        .slice(-10)
        .map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.text,
        }));
      history.push({ role: "user", content: v });

      try {
        const result = await chatCompleteStream(
          history,
          (chunk) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? { ...m, text: m.text + chunk }
                  : m,
              ),
            );
          },
          { signal: controller.signal },
        );

        if (result === null) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId
                ? {
                    ...m,
                    text: "⚠️ No API key configured. Click the settings icon ⚙️ to connect your LLM provider.",
                    streaming: false,
                    error: true,
                  }
                : m,
            ),
          );
        } else {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsgId ? { ...m, streaming: false } : m,
            ),
          );
        }
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  text: "⚠️ Something went wrong. Check your API key in settings or try again.",
                  streaming: false,
                  error: true,
                }
              : m,
          ),
        );
      } finally {
        setStreaming(false);
        abortRef.current = null;
        scrollToBottom();
      }
    },
    [streaming, scrollToBottom],
  );

  return (
    <>
      <LlmSettingsPanel
        open={configOpen}
        onClose={() => setConfigOpen(false)}
        onConfigChange={handleConfigChange}
      />

      <div className="rounded-3xl glass-strong border border-emerald-400/20 p-5 md:p-6 flex flex-col h-full min-h-[500px] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center gap-3 pb-4 border-b border-white/8">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.4)]">
              <Bot size={16} className="text-white" />
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#050508] ${
                configured
                  ? "bg-emerald-400 animate-pulse"
                  : "bg-gray-500"
              }`}
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">Dev Assistant</span>
              <ModelBadge />
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-300">
              {configured ? "Online · AI-Powered" : "Needs API Key"}
            </div>
          </div>
          <button
            onClick={() => setConfigOpen(true)}
            className={`relative group w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              configured
                ? "bg-white/5 border border-white/10 hover:bg-white/10"
                : "bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 animate-border-dance"
            }`}
            aria-label="LLM Settings"
          >
            {configured ? (
              <Settings size={13} className="text-gray-400 group-hover:text-white transition-colors" />
            ) : (
              <PlugZap size={13} className="text-emerald-300 group-hover:text-emerald-200 transition-colors" />
            )}
          </button>
        </div>

        {/* Messages */}
        <div className="relative flex-1 overflow-y-auto py-4 space-y-3 scrollbar-hide">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${
                    m.role === "assistant"
                      ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300"
                      : "bg-white/5 border-white/10 text-gray-300"
                  }`}
                >
                  {m.role === "assistant" ? <Bot size={12} /> : <UserIcon size={12} />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-wrap ${
                    m.error
                      ? "bg-pink-500/10 border border-pink-500/20 text-pink-200"
                      : m.role === "assistant"
                        ? "bg-black/30 border border-white/8 text-gray-200"
                        : "bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-blue-500/15 border border-emerald-400/30 text-white"
                  }`}
                >
                  {m.text}
                  {m.streaming && (
                    <span className="inline-flex ml-0.5">
                      <span className="animate-pulse">▊</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions (hide when streaming) */}
        {!streaming && (
          <div className="relative flex flex-wrap gap-1.5 mb-3">
            {ASSISTANT_SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => sendMessage(s.label)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-emerald-400/40 transition-all"
              >
                <span>{s.emoji}</span> {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="relative flex items-center gap-2 rounded-2xl bg-black/40 border border-white/10 focus-within:border-emerald-400/40 transition-colors"
        >
          <Sparkles size={14} className="text-emerald-300 ml-3 shrink-0" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              streaming
                ? "Waiting for response..."
                : configured
                  ? "Ask the dev assistant..."
                  : "Configure API key in settings ⚙️"
            }
            disabled={streaming}
            className="flex-1 bg-transparent py-3 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none disabled:opacity-50"
            aria-label="Ask the dev assistant a question"
          />
          {streaming ? (
            <button
              type="button"
              onClick={stopStreaming}
              className="m-1 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 text-white hover:scale-105 transition-transform"
              aria-label="Stop generating"
            >
              <StopCircle size={13} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="m-1 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
              aria-label="Send message"
            >
              <Send size={13} />
            </button>
          )}
        </form>

        {/* Configure prompt banner */}
        {!configured && !streaming && (
          <div className="mt-2 flex items-center justify-center gap-1.5">
            <button
              onClick={() => setConfigOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-300 hover:border-purple-400/40 hover:text-purple-200 transition-all"
            >
              <PlugZap size={12} />
              Connect your API Key to unlock the AI Assistant
            </button>
          </div>
        )}
      </div>
    </>
  );
}
