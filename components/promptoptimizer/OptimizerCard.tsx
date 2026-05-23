"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Sparkles,
  Copy,
  Download,
  ClipboardPaste,
  Trash2,
  Wand2,
  Check,
  GitCompare,
  Loader2,
} from "lucide-react";
import {
  optimize,
  countTokens,
  OPTIMIZE_MODES,
  OptimizeMode,
  SAMPLE_PROMPT,
} from "@/lib/promptOptimizer";

const MAX_CHARS = 12000;

export interface OptimizerCardProps {
  onResult?: (input: string, optimized: string, mode: OptimizeMode) => void;
}

export default function OptimizerCard({ onResult }: OptimizerCardProps) {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<OptimizeMode>("concise");
  const [optimized, setOptimized] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [compare, setCompare] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 520) + "px";
  }, [input]);

  // Live preview of optimized output for already-optimized text
  useEffect(() => {
    if (optimized) {
      onResult?.(input, optimized, mode);
    }
  }, [optimized, input, mode, onResult]);

  const charCount = input.length;
  const tokenIn = useMemo(() => countTokens(input), [input]);
  const tokenOut = useMemo(() => countTokens(optimized), [optimized]);

  const handleOptimize = async () => {
    if (!input.trim()) return;
    setLoading(true);
    // Brief delay so animation feels real
    await new Promise((r) => setTimeout(r, 420));
    const result = optimize(input, mode);
    setOptimized(result);
    setLoading(false);
  };

  const handleCopy = async () => {
    if (!optimized) return;
    try {
      await navigator.clipboard.writeText(optimized);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput((prev) => (prev ? prev + "\n" + text : text).slice(0, MAX_CHARS));
    } catch {
      /* ignore */
    }
  };

  const handleDownload = () => {
    if (!optimized) return;
    const blob = new Blob([optimized], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "optimized-prompt.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="relative px-4 sm:px-6 pb-16">
      <div className="max-w-7xl mx-auto">
        {/* Mode selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {OPTIMIZE_MODES.map((m) => {
            const active = mode === m.value;
            return (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`group relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
                  active
                    ? "bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-cyan-500/20 text-white border-orange-400/50 shadow-[0_0_24px_rgba(249,115,22,0.25)]"
                    : "bg-white/[0.03] text-gray-400 border-white/8 hover:text-white hover:border-white/20"
                }`}
              >
                <span className="text-sm">{m.emoji}</span>
                {m.label}
              </button>
            );
          })}
        </div>

        <div className="relative rounded-[2rem] overflow-hidden">
          {/* Gradient border glow */}
          <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-orange-500/30 via-pink-500/20 to-cyan-500/30 opacity-60 blur-sm pointer-events-none" />
          <div className="relative glass-strong rounded-[2rem] border border-white/10 p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
              {/* INPUT SIDE */}
              <div className="flex flex-col rounded-2xl bg-black/40 border border-white/8 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 shadow-[0_0_8px_currentColor]" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                      Your Prompt
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold tabular-nums ${
                      charCount > MAX_CHARS * 0.9 ? "text-orange-400" : "text-gray-500"
                    }`}
                  >
                    {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()}
                  </span>
                </div>

                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value.slice(0, MAX_CHARS))
                  }
                  placeholder="e.g. Please be so kind as to write a detailed python function that sums {{a}} and {{b}}. Thanks!"
                  className="flex-1 min-h-[220px] max-h-[520px] resize-none bg-transparent px-4 py-4 text-[15px] font-mono leading-relaxed text-gray-100 placeholder:text-gray-600 focus:outline-none"
                  spellCheck={false}
                />

                <div className="flex items-center gap-2 flex-wrap px-4 py-3 border-t border-white/5 bg-white/[0.02]">
                  <button
                    onClick={() => setInput(SAMPLE_PROMPT)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-orange-400/40 transition-all"
                  >
                    <Sparkles size={12} /> Sample
                  </button>
                  <button
                    onClick={handlePaste}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-cyan-400/40 transition-all"
                  >
                    <ClipboardPaste size={12} /> Paste
                  </button>
                  <button
                    onClick={() => {
                      setInput("");
                      setOptimized("");
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-pink-400/40 transition-all"
                  >
                    <Trash2 size={12} /> Clear
                  </button>
                  <span className="ml-auto text-[10px] text-gray-500 font-bold tabular-nums">
                    ~{tokenIn.toLocaleString()} tokens
                  </span>
                </div>
              </div>

              {/* CENTER ACTION */}
              <div className="flex lg:flex-col items-center justify-center gap-4 lg:px-2 py-2">
                <motion.button
                  onClick={handleOptimize}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: input.trim() ? 1.04 : 1 }}
                  whileTap={{ scale: input.trim() ? 0.96 : 1 }}
                  className="relative group inline-flex flex-col items-center justify-center gap-1 px-6 py-5 rounded-2xl font-black text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-cyan-500" />
                  <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 via-pink-500 to-cyan-500 blur-xl opacity-60 group-hover:opacity-90 transition-opacity" />
                  <span className="relative flex items-center gap-2 text-sm uppercase tracking-widest">
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Zap size={16} className="drop-shadow" />
                    )}
                    {loading ? "Optimizing" : "Optimize"}
                  </span>
                  <span className="relative text-[10px] font-bold opacity-80">
                    Prompt
                  </span>
                </motion.button>

                <button
                  onClick={() => setCompare((c) => !c)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border transition-all ${
                    compare
                      ? "bg-cyan-500/15 border-cyan-400/40 text-cyan-300"
                      : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                  }`}
                >
                  <GitCompare size={11} /> Compare
                </button>
              </div>

              {/* OUTPUT SIDE */}
              <div className="flex flex-col rounded-2xl bg-black/40 border border-white/8 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_currentColor]" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                      Optimized
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tabular-nums text-gray-500">
                    {optimized
                      ? `~${tokenOut.toLocaleString()} tokens`
                      : "awaiting input"}
                  </span>
                </div>

                <div className="flex-1 min-h-[220px] max-h-[520px] overflow-auto px-4 py-4">
                  <AnimatePresence mode="wait">
                    {compare && optimized ? (
                      <motion.div
                        key="compare"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3 text-[13px] font-mono leading-relaxed"
                      >
                        <div className="px-3 py-2 rounded-lg bg-orange-500/8 border border-orange-500/20 text-orange-200/80">
                          <div className="text-[9px] font-black uppercase tracking-widest mb-1 text-orange-300">
                            Before
                          </div>
                          <div className="whitespace-pre-wrap break-words line-through opacity-70">
                            {input}
                          </div>
                        </div>
                        <div className="px-3 py-2 rounded-lg bg-emerald-500/8 border border-emerald-500/20 text-emerald-100">
                          <div className="text-[9px] font-black uppercase tracking-widest mb-1 text-emerald-300">
                            After
                          </div>
                          <div className="whitespace-pre-wrap break-words">
                            {optimized}
                          </div>
                        </div>
                      </motion.div>
                    ) : optimized ? (
                      <motion.pre
                        key="result"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="whitespace-pre-wrap break-words text-[15px] font-mono leading-relaxed text-emerald-100"
                      >
                        {optimized}
                      </motion.pre>
                    ) : (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center text-center gap-3 text-gray-600 py-8"
                      >
                        <Wand2 size={28} className="opacity-50" />
                        <p className="text-sm font-medium max-w-xs">
                          Your optimized prompt will appear here. Try the{" "}
                          <span className="text-orange-300">sample</span> to see
                          it in action.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-2 flex-wrap px-4 py-3 border-t border-white/5 bg-white/[0.02]">
                  <button
                    onClick={handleCopy}
                    disabled={!optimized}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-emerald-400/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!optimized}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-cyan-400/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <Download size={12} /> Download
                  </button>
                  {optimized && tokenIn > 0 && (
                    <span className="ml-auto text-[10px] font-black uppercase tracking-widest text-emerald-300">
                      − {Math.max(0, Math.round(((tokenIn - tokenOut) / tokenIn) * 100))}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
