"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import { countTokens } from "@/lib/promptOptimizer";

const EXAMPLES: { before: string; after: string }[] = [
  {
    before:
      "Please kindly generate a detailed summary of the following article for me. Thanks a lot!",
    after: "Summarize this article.",
  },
  {
    before:
      "I would like you to write a python function that calculates the factorial of {{n}}. Please include type hints.",
    after: "Write a Python function calculating the factorial of {{n}}. Include type hints.",
  },
  {
    before:
      "Could you please be so kind as to translate the following text into French in order to share it with my team.",
    after: "Translate this text into French.",
  },
];

function useTypewriter(text: string, speed: number, runKey: string | number) {
  const [state, setState] = useState<{ key: string | number; out: string }>(
    () => ({ key: runKey, out: "" })
  );

  // Reset synchronously during render when the run key changes (documented React pattern).
  if (state.key !== runKey) {
    setState({ key: runKey, out: "" });
  }

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setState((prev) =>
        prev.key === runKey ? { key: runKey, out: text.slice(0, i) } : prev
      );
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [runKey, text, speed]);

  return state.key === runKey ? state.out : "";
}

export default function LiveDemo() {
  const [idx, setIdx] = useState(0);
  const ex = EXAMPLES[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % EXAMPLES.length), 7000);
    return () => clearInterval(t);
  }, []);

  const before = useTypewriter(ex.before, 16, `before-${idx}`);
  const after = useTypewriter(ex.after, 22, `after-${idx}`);

  const beforeTokens = countTokens(ex.before);
  const afterTokens = countTokens(ex.after);
  const saved = beforeTokens - afterTokens;
  const pct = Math.round((saved / Math.max(1, beforeTokens)) * 100);

  return (
    <section className="px-4 sm:px-6 py-24 relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-cyan-500/10 blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="badge badge-orange inline-flex"><Sparkles size={11} /> Live Demo</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            See the <span className="gradient-text-prompt">transformation</span>.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Same intent. Less noise. Watch verbose prompts collapse into clean,
            efficient instructions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          <AnimatePresence mode="wait">
            <motion.div
              key={`before-${idx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl glass border border-orange-500/25 p-6 min-h-[160px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-300">
                  Before
                </span>
                <span className="text-[10px] font-bold tabular-nums text-gray-500">
                  ~{beforeTokens} tokens
                </span>
              </div>
              <p className="font-mono text-sm leading-relaxed text-gray-300 flex-1">
                {before}
                <span className="inline-block w-1.5 h-4 bg-orange-400 align-middle ml-0.5 animate-pulse" />
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex md:flex-col items-center justify-center gap-2 py-2 md:py-0">
            <motion.div
              key={idx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-[0_0_24px_rgba(249,115,22,0.5)]"
            >
              <Zap size={18} className="text-white" />
            </motion.div>
            <ArrowRight size={18} className="md:rotate-90 text-gray-500" />
            <motion.div
              key={`pct-${idx}`}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
            >
              −{pct}%
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`after-${idx}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl glass border border-emerald-500/25 p-6 min-h-[160px] flex flex-col"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-300">
                  After
                </span>
                <span className="text-[10px] font-bold tabular-nums text-emerald-300">
                  ~{afterTokens} tokens
                </span>
              </div>
              <p className="font-mono text-sm leading-relaxed text-emerald-100 flex-1">
                {after}
                {after.length < ex.after.length && (
                  <span className="inline-block w-1.5 h-4 bg-emerald-400 align-middle ml-0.5 animate-pulse" />
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2">
          {EXAMPLES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Show example ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? "w-8 bg-orange-400" : "w-1.5 bg-white/15 hover:bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
