"use client";

import { Search, X } from "lucide-react";
import {
  TOOL_CATEGORIES,
  TIERS,
  ToolCategory,
  Tier,
} from "@/lib/compareTools";

export interface FilterBarProps {
  query: string;
  onQuery: (q: string) => void;
  category: ToolCategory | "all";
  onCategory: (c: ToolCategory | "all") => void;
  tier: Tier | "all";
  onTier: (t: Tier | "all") => void;
  total: number;
  matched: number;
}

export default function FilterBar({
  query,
  onQuery,
  category,
  onCategory,
  tier,
  onTier,
  total,
  matched,
}: FilterBarProps) {
  return (
    <div className="rounded-3xl glass-strong border border-white/10 p-4 md:p-5 space-y-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search tools, capabilities, or use cases…"
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-black/40 border border-white/8 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-cyan-400/40 transition-colors"
            aria-label="Search tools"
          />
          {query && (
            <button
              onClick={() => onQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/5"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-500 lg:ml-auto">
          {matched === total ? `${total} tools` : `${matched} / ${total} match`}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-2">
            Category
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Pill active={category === "all"} onClick={() => onCategory("all")}>
              All
            </Pill>
            {TOOL_CATEGORIES.map((c) => (
              <Pill
                key={c}
                active={category === c}
                onClick={() => onCategory(c)}
              >
                {c}
              </Pill>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 mb-2">
            Pricing Tier
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Pill active={tier === "all"} onClick={() => onTier("all")}>
              All
            </Pill>
            {TIERS.map((t) => (
              <Pill key={t} active={tier === t} onClick={() => onTier(t)}>
                {t}
              </Pill>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all duration-200 ${
        active
          ? "bg-gradient-to-r from-cyan-500/25 via-purple-500/20 to-pink-500/20 text-white border-cyan-400/40 shadow-[0_0_18px_rgba(34,211,238,0.2)]"
          : "bg-white/[0.03] text-gray-400 border-white/10 hover:text-white hover:border-white/25"
      }`}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
