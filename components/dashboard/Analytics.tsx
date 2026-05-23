"use client";

import { motion } from "framer-motion";
import { BarChart3, Activity, TrendingUp } from "lucide-react";
import { CATEGORY_USAGE, USAGE_SERIES } from "@/lib/dashboardData";

const WIDTH = 720;
const HEIGHT = 220;
const PADDING = { top: 18, right: 14, bottom: 24, left: 30 };

function buildLinePath(series: number[]) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;
  const innerW = WIDTH - PADDING.left - PADDING.right;
  const innerH = HEIGHT - PADDING.top - PADDING.bottom;
  const step = innerW / (series.length - 1);

  const points = series.map((v, i) => {
    const x = PADDING.left + i * step;
    const y = PADDING.top + innerH - ((v - min) / range) * innerH;
    return { x, y, v };
  });

  const line = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  const area = `${line} L ${points[points.length - 1].x} ${HEIGHT - PADDING.bottom} L ${points[0].x} ${HEIGHT - PADDING.bottom} Z`;

  return { line, area, points, max, min };
}

export default function Analytics() {
  const { line, area, points, max, min } = buildLinePath(USAGE_SERIES);
  const total = USAGE_SERIES.reduce((s, v) => s + v, 0);
  const last = USAGE_SERIES[USAGE_SERIES.length - 1];
  const first = USAGE_SERIES[0];
  const growth = Math.round(((last - first) / first) * 100);

  const maxCategory = Math.max(...CATEGORY_USAGE.map((c) => c.value));

  return (
    <section className="px-4 sm:px-6 pb-10">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <div className="badge badge-blue inline-flex mb-2"><Activity size={11} /> Analytics</div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Your <span className="gradient-text-dash">two weeks</span> on Dev Resource Hub
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Line chart */}
          <div className="lg:col-span-2 rounded-3xl glass-strong border border-white/10 p-5 md:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/8">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-emerald-300" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
                  Prompts run · last 14 days
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                <span className="text-gray-500">Total</span>
                <span className="text-white tabular-nums">{total.toLocaleString()}</span>
                <span className="text-emerald-300 tabular-nums">+{growth}%</span>
              </div>
            </div>

            <div className="pt-4 -mx-2 overflow-x-auto">
              <svg
                viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
                className="w-full h-[220px]"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="line-stroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="50%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                  <linearGradient id="line-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(34,211,238,0.35)" />
                    <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                  </linearGradient>
                </defs>

                {/* Y grid */}
                {[0.25, 0.5, 0.75].map((p) => {
                  const innerH = HEIGHT - PADDING.top - PADDING.bottom;
                  const y = PADDING.top + p * innerH;
                  return (
                    <line
                      key={p}
                      x1={PADDING.left}
                      x2={WIDTH - PADDING.right}
                      y1={y}
                      y2={y}
                      stroke="rgba(255,255,255,0.05)"
                      strokeDasharray="3 4"
                    />
                  );
                })}
                {/* Axis labels */}
                <text x={4} y={PADDING.top + 4} fill="rgba(255,255,255,0.35)" fontSize="9" fontWeight="700">{max}</text>
                <text x={4} y={HEIGHT - PADDING.bottom + 2} fill="rgba(255,255,255,0.35)" fontSize="9" fontWeight="700">{min}</text>

                <motion.path
                  d={area}
                  fill="url(#line-area)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <motion.path
                  d={line}
                  fill="none"
                  stroke="url(#line-stroke)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: "easeOut" }}
                />
                {points.map((p, i) => (
                  <motion.circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r={i === points.length - 1 ? 5 : 2.5}
                    fill={i === points.length - 1 ? "#34d399" : "#22d3ee"}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.04, duration: 0.25 }}
                  />
                ))}
                {points.length > 0 && (
                  <motion.text
                    x={points[points.length - 1].x - 4}
                    y={points[points.length - 1].y - 10}
                    textAnchor="end"
                    fill="#34d399"
                    fontSize="11"
                    fontWeight="900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    {last}
                  </motion.text>
                )}
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <Stat label="Daily avg" value={Math.round(total / USAGE_SERIES.length).toString()} />
              <Stat label="Peak day" value={max.toString()} accent="text-emerald-300" />
              <Stat label="Growth" value={`+${growth}%`} accent="text-cyan-300" />
            </div>
          </div>

          {/* Category bar chart */}
          <div className="rounded-3xl glass-strong border border-white/10 p-5 md:p-6 space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/8">
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-purple-300" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-black text-gray-400">
                  Usage by Category
                </span>
              </div>
            </div>

            <div className="space-y-3.5">
              {CATEGORY_USAGE.map((c, i) => {
                const pct = (c.value / maxCategory) * 100;
                return (
                  <div key={c.label} className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-gray-300">{c.label}</span>
                      <span className="text-white tabular-nums">{c.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.07, ease: "easeOut" }}
                        className={`h-full rounded-full bg-gradient-to-r ${c.color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  accent = "text-white",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] border border-white/8 px-3 py-2">
      <div className="text-[9px] uppercase tracking-widest font-black text-gray-500">
        {label}
      </div>
      <div className={`text-base font-black tabular-nums ${accent}`}>{value}</div>
    </div>
  );
}
