"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How does prompt optimization work?",
    a: "Our engine applies linguistic transformations — removing filler words, swapping verbose phrases for tighter equivalents, and rewriting sentence structures — while preserving intent, placeholders, and code. The result: same instruction, fewer tokens.",
  },
  {
    q: "Does it preserve placeholders like {{variable}}?",
    a: "Yes. Anything matching {{var}}, {var}, or <var> is detected before optimization runs and re-inserted untouched after. Your templates remain safe.",
  },
  {
    q: "Is code formatting maintained?",
    a: "Triple-backtick code blocks and inline backtick spans are extracted, set aside, and reinserted verbatim. The optimizer never touches the contents of code blocks.",
  },
  {
    q: "Which AI models are supported?",
    a: "The output is model-agnostic — it works with GPT, Claude, Gemini, Mistral, Llama, and any LLM that consumes text prompts. Token counts use an approximate cl100k-style estimate.",
  },
  {
    q: "Can I optimize system prompts?",
    a: "Yes. Switch to the Enterprise or Agent-Friendly mode for system-prompt-grade output. Structural delimiters like Objective:, Instructions:, and Output: are preserved.",
  },
  {
    q: "Will this break my multi-agent workflow?",
    a: "No — Agent-Friendly mode is tuned for tool-using agents and multi-step pipelines. It keeps imperative verbs, structured headers, and dynamic parameters intact.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 sm:px-6 py-24">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <div className="badge badge-blue inline-flex"><HelpCircle size={11} /> Questions</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Frequently <span className="gradient-text-prompt">asked</span>.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? "glass-strong border-orange-400/30"
                    : "glass border-white/8 hover:border-white/15"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-base font-bold ${isOpen ? "text-white" : "text-gray-200"}`}
                  >
                    {f.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      isOpen
                        ? "bg-orange-500/15 text-orange-300 border border-orange-400/30"
                        : "bg-white/5 text-gray-400 border border-white/8"
                    }`}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">
                        {f.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
