"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, User as UserIcon } from "lucide-react";
import { ASSISTANT_SUGGESTIONS } from "@/lib/dashboardData";

interface ChatMsg {
  id: string;
  role: "assistant" | "user";
  text: string;
}

const INITIAL_MESSAGES: ChatMsg[] = [
  {
    id: "m1",
    role: "assistant",
    text: "Hey 👋 I'm your dev assistant. I can optimize prompts, recommend models, draft workflows, and more. Pick a suggestion below or ask me anything.",
  },
];

function fakeReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("optimize")) {
    return "Open /prompt-optimizer — paste your prompt, pick Concise mode, and you'll usually save 40–70% of tokens with no loss of intent.";
  }
  if (p.includes("cheap") || p.includes("cost") || p.includes("model")) {
    return "For most coding tasks, DeepSeek V3 ($0.27/M in) or Claude 4.5 Haiku ($0.80/M in) crush the cost/perf curve. Reach for Opus only when reasoning truly matters.";
  }
  if (p.includes("workflow") || p.includes("agent")) {
    return "Try the Workflow Builder — chain Planner → Architect → QA → Security agents. I can scaffold the YAML for you when you're ready.";
  }
  return "Got it. I'd start by clarifying the goal in one sentence, then break it into 3–5 atomic tasks. Want me to draft those?";
}

export default function AssistantPanel() {
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    const v = text.trim();
    if (!v) return;
    const userMsg: ChatMsg = { id: crypto.randomUUID(), role: "user", text: v };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: crypto.randomUUID(), role: "assistant", text: fakeReply(v) },
      ]);
    }, 380);
  };

  return (
    <div className="rounded-3xl glass-strong border border-emerald-400/20 p-5 md:p-6 flex flex-col h-full min-h-[440px] relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center gap-3 pb-4 border-b border-white/8">
        <div className="relative">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.4)]">
            <Bot size={16} className="text-white" />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#050508] animate-pulse" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-black text-white">Dev Assistant</div>
          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-emerald-300">
            Online · Multi-model
          </div>
        </div>
        <span className="text-[10px] font-bold text-gray-500 hidden sm:inline">v0.1</span>
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
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
                  m.role === "assistant"
                    ? "bg-black/30 border border-white/8 text-gray-200"
                    : "bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-blue-500/15 border border-emerald-400/30 text-white"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Suggestions */}
      <div className="relative flex flex-wrap gap-1.5 mb-3">
        {ASSISTANT_SUGGESTIONS.map((s) => (
          <button
            key={s.label}
            onClick={() => send(s.label)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-emerald-400/40 transition-all"
          >
            <span>{s.emoji}</span> {s.label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="relative flex items-center gap-2 rounded-2xl bg-black/40 border border-white/10 focus-within:border-emerald-400/40 transition-colors"
      >
        <Sparkles size={14} className="text-emerald-300 ml-3" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the dev assistant…"
          className="flex-1 bg-transparent py-3 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="m-1 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 via-cyan-500 to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 transition-transform"
        >
          <Send size={13} />
        </button>
      </form>
    </div>
  );
}
