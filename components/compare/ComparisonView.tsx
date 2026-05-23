"use client";

import { motion } from "framer-motion";
import {
  Check,
  X,
  Star,
  Plus,
  Minus,
  Layers,
  CircleDollarSign,
  Cpu,
  ArrowRight,
} from "lucide-react";
import {
  CAPABILITY_LABELS,
  CompareTool,
  performanceAverage,
} from "@/lib/compareTools";
import Link from "next/link";

export interface ComparisonViewProps {
  selected: CompareTool[];
  onClear: () => void;
  onRemove: (id: string) => void;
}

const PERF_KEYS: Array<{
  key: keyof CompareTool["performance"];
  label: string;
}> = [
  { key: "speed", label: "Speed" },
  { key: "accuracy", label: "Accuracy" },
  { key: "autonomy", label: "Autonomy" },
  { key: "ecosystem", label: "Ecosystem" },
  { key: "learning", label: "Ease of Learning" },
];

export default function ComparisonView({
  selected,
  onClear,
  onRemove,
}: ComparisonViewProps) {
  if (selected.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl glass border border-white/10 p-10 text-center"
      >
        <div className="text-5xl mb-3">⚖️</div>
        <h3 className="text-xl font-black text-white">
          Pick tools to compare
        </h3>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Hit the <span className="text-cyan-300">＋</span> on any tool card
          below. Compare up to 4 side-by-side: capabilities, pricing, models,
          ecosystem, pros &amp; cons.
        </p>
      </motion.div>
    );
  }

  const capKeys = Object.keys(CAPABILITY_LABELS) as Array<keyof CompareTool["capabilities"]>;

  return (
    <div className="space-y-6">
      {/* Selected header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] font-black text-cyan-300">
            Comparing
          </div>
          <h3 className="text-xl font-black text-white">
            {selected.map((t) => t.name).join(" vs ")}
          </h3>
        </div>
        <button
          onClick={onClear}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-pink-400/30 transition-all"
        >
          <X size={12} /> Clear All
        </button>
      </div>

      {/* Tool header cards */}
      <div
        className={`grid gap-3 ${
          selected.length === 1
            ? "grid-cols-1"
            : selected.length === 2
              ? "grid-cols-1 md:grid-cols-2"
              : selected.length === 3
                ? "grid-cols-1 md:grid-cols-3"
                : "grid-cols-2 md:grid-cols-4"
        }`}
      >
        {selected.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-2xl p-4 bg-gradient-to-br ${t.accent.from} ${t.accent.to} border ${t.accent.border}`}
          >
            <button
              onClick={() => onRemove(t.id)}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/40 border border-white/10 text-gray-400 hover:text-white hover:bg-pink-500/20 hover:border-pink-400/40 flex items-center justify-center transition-all"
              aria-label={`Remove ${t.name}`}
            >
              <X size={12} />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{t.emoji}</span>
              <div>
                <div className="font-black text-white">{t.name}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  {t.category} · {t.tier}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-3 text-[11px]">
              <span className={`inline-flex items-center gap-1 ${t.accent.text} font-bold`}>
                <Star size={11} className="fill-current" />
                {t.rating}
              </span>
              <span className="text-gray-400 font-bold">
                {performanceAverage(t)} perf
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Capabilities matrix */}
      <Panel icon={<Layers size={14} className="text-cyan-300" />} title="Capability Matrix">
        <div className="overflow-x-auto -mx-1">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-white/8">
                <th className="text-left py-3 px-3 text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 w-48">
                  Capability
                </th>
                {selected.map((t) => (
                  <th
                    key={t.id}
                    className={`text-center py-3 px-3 text-[10px] uppercase tracking-[0.2em] font-black ${t.accent.text}`}
                  >
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {capKeys.map((k, i) => (
                <tr
                  key={k}
                  className={`border-b border-white/5 ${i % 2 === 1 ? "bg-white/[0.015]" : ""}`}
                >
                  <td className="py-3 px-3 text-gray-300 font-bold text-sm">
                    {CAPABILITY_LABELS[k]}
                  </td>
                  {selected.map((t) => {
                    const has = t.capabilities[k];
                    return (
                      <td key={t.id} className="text-center py-3 px-3">
                        {has ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                            <Check size={12} className="text-emerald-300" />
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/[0.03] border border-white/8">
                            <X size={12} className="text-gray-600" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Performance ratings */}
      <Panel icon={<Cpu size={14} className="text-purple-300" />} title="Performance Profile">
        <div className="space-y-4">
          {PERF_KEYS.map((p) => (
            <div key={p.key} className="space-y-2">
              <div className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-500">
                {p.label}
              </div>
              <div className="space-y-1.5">
                {selected.map((t) => (
                  <div key={t.id} className="flex items-center gap-3">
                    <span className={`w-24 shrink-0 text-xs font-bold ${t.accent.text}`}>
                      {t.name}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${t.performance[p.key]}%` }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${t.accent.from.replace("/20", "/80")} ${t.accent.to.replace("/10", "/60")}`}
                      />
                    </div>
                    <span className="w-9 shrink-0 text-right text-xs font-black tabular-nums text-white">
                      {t.performance[p.key]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>

      {/* Pricing */}
      <Panel
        icon={<CircleDollarSign size={14} className="text-emerald-300" />}
        title="Pricing Tiers"
      >
        <div
          className={`grid gap-3 ${
            selected.length === 1
              ? "grid-cols-1"
              : selected.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {selected.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl border bg-gradient-to-br ${t.accent.from} ${t.accent.to} ${t.accent.border} p-4 space-y-3`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.emoji}</span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${t.accent.text}`}>
                  {t.name}
                </span>
              </div>
              <ul className="space-y-1.5">
                {t.pricing.map((p) => (
                  <li
                    key={p.name}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold ${
                      p.highlight
                        ? "bg-white/10 border border-white/15 text-white"
                        : "bg-black/30 border border-white/8 text-gray-300"
                    }`}
                  >
                    <span>{p.name}</span>
                    <span className="text-emerald-300">{p.price}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Models
              </div>
              <div className="flex flex-wrap gap-1">
                {t.models.map((m) => (
                  <span
                    key={m}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/30 border border-white/8 text-gray-300"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <div className="text-[10px] uppercase tracking-widest font-black text-gray-500">
                Ecosystem
              </div>
              <p className="text-xs text-gray-400 leading-snug">
                {t.pluginEcosystem}
              </p>
            </div>
          ))}
        </div>
      </Panel>

      {/* Pros / Cons */}
      <Panel icon={<Plus size={14} className="text-emerald-300" />} title="Pros &amp; Cons">
        <div
          className={`grid gap-3 ${
            selected.length === 1
              ? "grid-cols-1"
              : selected.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {selected.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{t.emoji}</span>
                <span className={`text-sm font-black ${t.accent.text}`}>{t.name}</span>
              </div>
              <ul className="space-y-1.5">
                {t.pros.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-gray-300">
                    <Plus size={12} className="text-emerald-300 mt-0.5 shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
                {t.cons.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-xs text-gray-400">
                    <Minus size={12} className="text-pink-300 mt-0.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={t.url}
                target="_blank"
                className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest ${t.accent.text} hover:text-white transition-colors`}
              >
                Visit site <ArrowRight size={11} />
              </Link>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Panel({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl glass-strong border border-white/10 p-5 md:p-6">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
