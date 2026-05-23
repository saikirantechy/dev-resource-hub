"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Coins, TrendingDown, Sparkles, DollarSign } from "lucide-react";
import { countTokens, estimateCostUsd } from "@/lib/promptOptimizer";

export interface TokenStatsProps {
  input: string;
  optimized: string;
}

function useAnimatedNumber(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const from = value;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(from + (target - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);
  return value;
}

export default function TokenStats({ input, optimized }: TokenStatsProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: false, margin: "-80px" });

  const tokenIn = countTokens(input);
  const tokenOut = countTokens(optimized || input);
  const saved = Math.max(0, tokenIn - tokenOut);
  const savedPct = tokenIn > 0 ? Math.round((saved / tokenIn) * 100) : 0;
  const costSaved = estimateCostUsd(saved);

  const aIn = useAnimatedNumber(tokenIn);
  const aOut = useAnimatedNumber(tokenOut);
  const aSaved = useAnimatedNumber(saved);
  const aPct = useAnimatedNumber(savedPct);

  const cards = [
    {
      label: "Original Tokens",
      value: Math.round(aIn).toLocaleString(),
      icon: Coins,
      color: "from-orange-500/20 to-pink-500/10",
      border: "border-orange-500/25",
      text: "text-orange-300",
      progress: 100,
    },
    {
      label: "Optimized Tokens",
      value: Math.round(aOut).toLocaleString(),
      icon: Sparkles,
      color: "from-emerald-500/20 to-cyan-500/10",
      border: "border-emerald-500/25",
      text: "text-emerald-300",
      progress: tokenIn > 0 ? Math.max(2, Math.round((tokenOut / tokenIn) * 100)) : 0,
    },
    {
      label: "Saved Tokens",
      value: Math.round(aSaved).toLocaleString(),
      icon: TrendingDown,
      color: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/25",
      text: "text-cyan-300",
      progress: savedPct,
    },
    {
      label: "Cost Reduction",
      value: `$${costSaved.toFixed(4)}`,
      icon: DollarSign,
      color: "from-pink-500/20 to-purple-500/10",
      border: "border-pink-500/25",
      text: "text-pink-300",
      progress: savedPct,
    },
  ];

  return (
    <section ref={ref} className="px-4 sm:px-6 py-16">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="space-y-3">
            <div className="badge badge-emerald inline-flex"><TrendingDown size={11} /> Token Savings</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
              Watch your tokens <span className="gradient-text-prompt">disappear</span>.
            </h2>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-black">Reduction</div>
            <div className="text-5xl md:text-6xl font-black tabular-nums gradient-text-prompt">
              {Math.round(aPct)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl p-5 glass border ${c.border} bg-gradient-to-br ${c.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <c.icon size={18} className={c.text} />
                <span className={`text-[9px] font-black uppercase tracking-widest ${c.text} opacity-80`}>
                  {c.label}
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-black tabular-nums text-white">
                {c.value}
              </div>
              <div className="mt-4 h-1.5 rounded-full bg-white/8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${Math.min(100, Math.max(0, c.progress))}%` } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.9, ease: "easeOut" }}
                  className={`h-full rounded-full bg-gradient-to-r ${c.color.replace("/20", "/80").replace("/10", "/60")}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
