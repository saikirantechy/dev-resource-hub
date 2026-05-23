"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, ArrowRight, Heart } from "lucide-react";
import { SHOWCASE_PROJECTS } from "@/lib/dashboardData";

export default function CommunityShowcase() {
  return (
    <section className="px-4 sm:px-6 pb-16">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex items-end justify-between gap-3 flex-wrap">
          <div>
            <div className="badge badge-purple inline-flex mb-2"><Users size={11} /> Community</div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Built with <span className="gradient-text-dash">Dev Resource Hub</span>
            </h2>
          </div>
          <Link
            href="/showcase"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/25 transition-all"
          >
            All Projects <ArrowRight size={11} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {SHOWCASE_PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={p.href}
                className="group block h-full rounded-2xl glass border border-white/10 hover:border-purple-400/40 transition-all p-5 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{p.emoji}</span>
                  <Heart
                    size={14}
                    className="text-gray-600 group-hover:text-pink-400 group-hover:fill-pink-400 transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-black text-white leading-tight">
                    {p.title}
                  </h3>
                  <div className="text-[11px] text-gray-500 font-bold">
                    by {p.author}
                  </div>
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Built with
                </div>
                <p className="text-xs text-gray-300 leading-snug">{p.built}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/30 border border-white/8 text-gray-300"
                    >
                      {t}
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
