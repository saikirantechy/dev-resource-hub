"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Star,
  Plus,
  Check,
  ExternalLink,
  Sparkles,
  CircleDot,
} from "lucide-react";
import { CompareTool, performanceAverage } from "@/lib/compareTools";

export interface ToolCardProps {
  tool: CompareTool;
  selected: boolean;
  onToggle: (id: string) => void;
  index?: number;
}

export default function ToolCard({
  tool,
  selected,
  onToggle,
  index = 0,
}: ToolCardProps) {
  const avg = performanceAverage(tool);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.4 }}
      className={`group relative rounded-3xl p-5 bg-gradient-to-br ${tool.accent.from} ${tool.accent.to} border ${
        selected
          ? `${tool.accent.border} ring-2 ring-offset-0 ring-cyan-400/40 shadow-[0_0_28px_rgba(34,211,238,0.18)]`
          : "border-white/8 hover:border-white/20"
      } transition-all duration-300 overflow-hidden`}
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/5 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-500">
              {tool.emoji}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-black text-white leading-tight truncate">
                {tool.name}
              </h3>
              <p className="text-[11px] text-gray-400 leading-snug line-clamp-1">
                {tool.tagline}
              </p>
            </div>
          </div>
          <button
            onClick={() => onToggle(tool.id)}
            aria-label={selected ? `Remove ${tool.name}` : `Add ${tool.name} to compare`}
            className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
              selected
                ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/25"
            }`}
          >
            {selected ? <Check size={14} /> : <Plus size={14} />}
          </button>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 ${tool.accent.text}`}>
            <CircleDot size={10} /> {tool.category}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
            {tool.tier}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            {tool.rating}
          </span>
        </div>

        {/* Best for */}
        <div className="space-y-1.5">
          <div className="text-[9px] uppercase tracking-[0.25em] font-black text-gray-500">
            Best For
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tool.bestFor.slice(0, 2).map((b) => (
              <span
                key={b}
                className="text-[10px] font-bold px-2 py-1 rounded-md bg-black/30 border border-white/8 text-gray-300"
              >
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Performance bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[9px] uppercase tracking-[0.25em] font-black text-gray-500">
              Performance
            </span>
            <span className={`text-xs font-black tabular-nums ${tool.accent.text}`}>
              {avg}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${avg}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${tool.accent.from.replace("/20", "/80")} ${tool.accent.to.replace("/10", "/60")}`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onToggle(tool.id)}
            className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
              selected
                ? "bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/25"
                : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
            }`}
          >
            {selected ? (
              <>
                <Sparkles size={11} /> Selected
              </>
            ) : (
              <>
                <Plus size={11} /> Compare
              </>
            )}
          </button>
          <Link
            href={tool.url}
            target="_blank"
            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-[11px] font-bold bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/25 transition-all"
          >
            <ExternalLink size={11} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
