"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/compare/Hero";
import FilterBar from "@/components/compare/FilterBar";
import ToolCard from "@/components/compare/ToolCard";
import ComparisonView from "@/components/compare/ComparisonView";
import { COMPARE_TOOLS, Tier, ToolCategory, getToolById } from "@/lib/compareTools";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const MAX_SELECTED = 4;

export default function CompareClient() {
  const [selectedIds, setSelectedIds] = useState<string[]>(["cursor", "windsurf", "claude"]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ToolCategory | "all">("all");
  const [tier, setTier] = useState<Tier | "all">("all");

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_SELECTED) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const remove = (id: string) =>
    setSelectedIds((prev) => prev.filter((x) => x !== id));

  const clear = () => setSelectedIds([]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMPARE_TOOLS.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (tier !== "all" && t.tier !== tier) return false;
      if (!q) return true;
      const haystack = [
        t.name,
        t.tagline,
        t.category,
        t.tier,
        ...t.bestFor,
        ...t.models,
        t.pluginEcosystem,
        ...t.pros,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category, tier]);

  const selectedTools = useMemo(
    () => selectedIds.map(getToolById).filter(Boolean) as ReturnType<typeof getToolById>[] as NonNullable<ReturnType<typeof getToolById>>[],
    [selectedIds]
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">
      <style>{`
        .gradient-text-stack {
          background: linear-gradient(135deg, #22d3ee 0%, #a78bfa 45%, #fb7185 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 6s ease infinite;
        }
        .glass-dark {
          background: rgba(5, 5, 8, 0.6);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
      `}</style>

      <div className="gradient-mesh" />
      <Navbar />

      <main className="relative">
        <Hero />

        {/* Comparison view */}
        <section className="px-4 sm:px-6 pb-12">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIds.join("-") || "empty"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <ComparisonView
                  selected={selectedTools}
                  onClear={clear}
                  onRemove={remove}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Tool grid */}
        <section className="px-4 sm:px-6 pb-20">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-end justify-between flex-wrap gap-3">
              <div>
                <div className="badge badge-emerald inline-flex mb-2">
                  <Sparkles size={11} /> Tool Directory
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                  All <span className="gradient-text-stack">AI coding tools</span>
                </h2>
              </div>
              <p className="text-sm text-gray-500 max-w-sm">
                Tap a tool to add it to the comparison panel above. Up to 4
                tools at a time.
              </p>
            </div>

            <FilterBar
              query={query}
              onQuery={setQuery}
              category={category}
              onCategory={setCategory}
              tier={tier}
              onTier={setTier}
              total={COMPARE_TOOLS.length}
              matched={filtered.length}
            />

            {filtered.length === 0 ? (
              <div className="rounded-3xl glass border border-white/10 p-10 text-center space-y-2">
                <div className="text-4xl">🔍</div>
                <h3 className="text-lg font-black">No tools match your filters</h3>
                <p className="text-sm text-gray-500">
                  Try clearing the search or switching category / tier.
                </p>
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("all");
                    setTier("all");
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 mt-3 rounded-lg text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((t, i) => (
                  <ToolCard
                    key={t.id}
                    tool={t}
                    selected={selectedIds.includes(t.id)}
                    onToggle={toggle}
                    index={i}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* AI Finder CTA */}
        <section className="px-4 sm:px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[2.5rem] glass-strong border border-white/10 p-10 md:p-14 text-center"
            >
              <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-purple-500/15 blur-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5 animate-gradient" />

              <div className="relative space-y-5">
                <div className="text-4xl animate-float inline-block">⚡</div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
                  Still not sure?{" "}
                  <span className="gradient-text-stack">Let AI decide.</span>
                </h2>
                <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
                  Tell our AI Finder what you&apos;re building and get a personalized
                  stack recommendation in seconds.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Link
                    href="/ai-finder"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white hover:scale-[1.02] transition-transform"
                  >
                    <Zap size={14} /> Try AI Finder
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/prompt-optimizer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
                  >
                    <Sparkles size={14} /> Optimize Prompts
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
