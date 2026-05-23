"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Star, TrendingUp, ArrowRight } from "lucide-react";
import { TRENDING_TOOLS } from "@/lib/dashboardData";

export default function TrendingTools() {
  return (
    <section className="px-4 sm:px-6 pb-10">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <div className="badge badge-orange inline-flex mb-2"><Flame size={11} /> Trending Now</div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Top AI tools <span className="gradient-text-dash">this week</span>
            </h2>
          </div>
          <Link
            href="/trending"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/25 transition-all"
          >
            View All <ArrowRight size={11} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {TRENDING_TOOLS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={t.href}
                target="_blank"
                className={`group block rounded-2xl p-4 bg-gradient-to-br ${t.accent.from} ${t.accent.to} border border-white/8 hover:border-white/20 transition-all`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl">{t.emoji}</span>
                    <div className="min-w-0">
                      <div className="text-sm font-black text-white truncate">
                        {t.name}
                      </div>
                      <div className={`text-[10px] font-bold uppercase tracking-widest ${t.accent.text}`}>
                        {t.category}
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-[10px] font-bold text-gray-500 inline-flex items-center gap-1">
                      <Star size={9} className="fill-yellow-400 text-yellow-400" />
                      {t.stars}
                    </div>
                    <div className="text-[10px] font-black text-emerald-300 inline-flex items-center gap-0.5">
                      <TrendingUp size={9} /> {t.delta}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed mt-3 line-clamp-2">
                  {t.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {t.models.map((m) => (
                    <span
                      key={m}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/30 border border-white/8 text-gray-300"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
