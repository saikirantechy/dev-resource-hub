"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ClipboardPaste,
  Trash2,
  Repeat,
  Cpu,
} from "lucide-react";
import {
  MODELS,
  SAMPLE_TEXT,
  contextPercent,
  costFor,
  formatTokens,
  formatUsd,
  projectCost,
  tokensFor,
} from "@/lib/tokenCalc";

const MAX_CHARS = 50_000;
const PRESETS = [
  { label: "1 call", value: 1 },
  { label: "100 calls", value: 100 },
  { label: "1k calls", value: 1_000 },
  { label: "10k calls", value: 10_000 },
  { label: "1M calls", value: 1_000_000 },
];

export default function Calculator() {
  const [text, setText] = useState(SAMPLE_TEXT);
  const [outputTokens, setOutputTokens] = useState(400);
  const [requests, setRequests] = useState(1);
  const [sortBy, setSortBy] = useState<"cost" | "tokens" | "context">("cost");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 360) + "px";
  }, [text]);

  const rows = useMemo(() => {
    return MODELS.map((m) => {
      const input = tokensFor(text, m.charsPerToken);
      const perCall = costFor(m, input, outputTokens);
      const total = projectCost(m, input, outputTokens, requests);
      return { model: m, inputTokens: input, perCall, total };
    });
  }, [text, outputTokens, requests]);

  const sorted = useMemo(() => {
    const copy = [...rows];
    if (sortBy === "cost") copy.sort((a, b) => a.total - b.total);
    if (sortBy === "tokens") copy.sort((a, b) => a.inputTokens - b.inputTokens);
    if (sortBy === "context")
      copy.sort((a, b) => b.model.contextWindow - a.model.contextWindow);
    return copy;
  }, [rows, sortBy]);

  const cheapest = useMemo(
    () => [...rows].sort((a, b) => a.total - b.total)[0]?.model,
    [rows]
  );
  const mostExpensive = useMemo(
    () => [...rows].sort((a, b) => b.total - a.total)[0]?.model,
    [rows]
  );

  const handlePaste = async () => {
    try {
      const t = await navigator.clipboard.readText();
      setText((prev) => (prev ? prev + "\n" + t : t).slice(0, MAX_CHARS));
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="px-4 sm:px-6 pb-16">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Input + controls */}
        <div className="relative rounded-[2rem] overflow-hidden">
          <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-br from-emerald-500/30 via-blue-500/20 to-purple-500/30 opacity-50 blur-sm pointer-events-none" />
          <div className="relative glass-strong rounded-[2rem] border border-white/10 p-5 md:p-7 space-y-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_currentColor]" />
                <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                  Your Prompt
                </span>
              </div>
              <span className="text-[10px] font-bold tabular-nums text-gray-500">
                {text.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
              </span>
            </div>

            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Paste any prompt, system message, document, or conversation here…"
              spellCheck={false}
              className="w-full min-h-[160px] max-h-[360px] resize-none rounded-2xl bg-black/40 border border-white/8 px-4 py-3.5 text-sm font-mono leading-relaxed text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-emerald-400/40 transition-colors"
            />

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setText(SAMPLE_TEXT)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-emerald-400/40 transition-all"
              >
                <Sparkles size={12} /> Sample
              </button>
              <button
                onClick={handlePaste}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-cyan-400/40 transition-all"
              >
                <ClipboardPaste size={12} /> Paste
              </button>
              <button
                onClick={() => setText("")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-pink-400/40 transition-all"
              >
                <Trash2 size={12} /> Clear
              </button>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 flex items-center justify-between">
                  Output tokens (est.)
                  <span className="text-emerald-300 font-black tabular-nums">
                    {outputTokens.toLocaleString()}
                  </span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={4000}
                  step={50}
                  value={outputTokens}
                  onChange={(e) => setOutputTokens(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 flex items-center justify-between">
                  Volume
                  <span className="text-blue-300 font-black tabular-nums">
                    {requests.toLocaleString()} calls
                  </span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setRequests(p.value)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                        requests === p.value
                          ? "bg-gradient-to-r from-emerald-500/25 via-blue-500/20 to-purple-500/20 text-white border-emerald-400/40"
                          : "bg-white/[0.03] text-gray-400 border-white/10 hover:text-white hover:border-white/25"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cheapest / most expensive summary */}
        {text.trim() && cheapest && mostExpensive && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SummaryCard
              label="Cheapest at this volume"
              model={cheapest.name}
              emoji={cheapest.emoji}
              accent="text-emerald-300"
              border="border-emerald-500/30"
              value={formatUsd(
                projectCost(
                  cheapest,
                  tokensFor(text, cheapest.charsPerToken),
                  outputTokens,
                  requests
                )
              )}
            />
            <SummaryCard
              label="Most expensive"
              model={mostExpensive.name}
              emoji={mostExpensive.emoji}
              accent="text-pink-300"
              border="border-pink-500/30"
              value={formatUsd(
                projectCost(
                  mostExpensive,
                  tokensFor(text, mostExpensive.charsPerToken),
                  outputTokens,
                  requests
                )
              )}
            />
          </div>
        )}

        {/* Sort + matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Cpu size={14} className="text-purple-300" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
                Model Matrix
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest">
              <span className="text-gray-500 mr-1 inline-flex items-center gap-1">
                <Repeat size={11} /> Sort
              </span>
              {(["cost", "tokens", "context"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`px-2.5 py-1 rounded-full border transition-all ${
                    sortBy === s
                      ? "bg-white/10 text-white border-white/25"
                      : "bg-white/[0.03] text-gray-500 border-white/10 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {sorted.map((row, i) => {
              const ctx = contextPercent(row.inputTokens + outputTokens, row.model.contextWindow);
              return (
                <motion.div
                  key={row.model.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.3 }}
                  className={`relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${row.model.accent.from} ${row.model.accent.to} border ${row.model.accent.border}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-2xl">{row.model.emoji}</span>
                      <div className="min-w-0">
                        <div className="text-sm font-black text-white truncate">
                          {row.model.name}
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                          {row.model.family}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-base font-black tabular-nums ${row.model.accent.text}`}>
                        {formatUsd(row.total)}
                      </div>
                      <div className="text-[9px] uppercase tracking-widest font-black text-gray-500">
                        {requests === 1 ? "per call" : `${requests.toLocaleString()}× total`}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <Stat label="Input" value={formatTokens(row.inputTokens)} hint={`${row.model.charsPerToken.toFixed(1)} c/tok`} />
                    <Stat label="Output" value={formatTokens(outputTokens)} hint={`${formatUsd(row.model.outputCost)}/M`} />
                    <Stat label="Per call" value={formatUsd(row.perCall)} hint={`${formatUsd(row.model.inputCost)}/M in`} />
                  </div>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center justify-between text-[9px] uppercase tracking-widest font-black text-gray-500">
                      <span>Context</span>
                      <span className="tabular-nums">
                        {ctx}% of {formatTokens(row.model.contextWindow)}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${ctx}%` }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${row.model.accent.from.replace("/20", "/80").replace("/15", "/70")} ${row.model.accent.to.replace("/10", "/60")}`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg bg-black/30 border border-white/8 px-2 py-2">
      <div className="text-[9px] uppercase tracking-widest font-black text-gray-500">{label}</div>
      <div className="text-sm font-black tabular-nums text-white leading-tight">{value}</div>
      <div className="text-[9px] text-gray-500 tabular-nums">{hint}</div>
    </div>
  );
}

function SummaryCard({
  label,
  model,
  emoji,
  value,
  accent,
  border,
}: {
  label: string;
  model: string;
  emoji: string;
  value: string;
  accent: string;
  border: string;
}) {
  return (
    <div className={`rounded-2xl glass-strong border ${border} p-5 flex items-center gap-4`}>
      <span className="text-4xl">{emoji}</span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-500">
          {label}
        </div>
        <div className={`text-base font-black ${accent}`}>{model}</div>
      </div>
      <div className={`text-2xl md:text-3xl font-black tabular-nums ${accent}`}>{value}</div>
    </div>
  );
}
