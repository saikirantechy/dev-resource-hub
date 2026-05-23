"use client";

import { motion } from "framer-motion";
import { Check, Flame, Sparkles, Building2, Rocket } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "/ forever",
    icon: Sparkles,
    accent: "from-cyan-500/20 to-blue-500/10",
    border: "border-white/10",
    text: "text-cyan-300",
    cta: "Start Free",
    href: "#optimize",
    features: [
      "Unlimited prompt optimizations",
      "Concise + Technical modes",
      "Token analysis & score",
      "Copy & download output",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$12",
    period: "/ month",
    badge: "🔥 Most Popular",
    icon: Rocket,
    accent: "from-orange-500/30 via-pink-500/20 to-cyan-500/20",
    border: "border-orange-400/50",
    text: "text-orange-300",
    cta: "Upgrade to Pro",
    href: "#optimize",
    features: [
      "Everything in Free",
      "All 6 optimization modes",
      "Multi-agent prompt chains",
      "API access (10k req/mo)",
      "Prompt history & versioning",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual",
    icon: Building2,
    accent: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/30",
    text: "text-purple-300",
    cta: "Contact Sales",
    href: "/community",
    features: [
      "Everything in Pro",
      "SSO + SAML + audit logs",
      "Unlimited API requests",
      "Custom optimization rules",
      "Dedicated success engineer",
      "SLA + on-prem options",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="px-4 sm:px-6 py-24 bg-white/[0.01] border-y border-white/5">
      <div className="max-w-7xl mx-auto space-y-14">
        <div className="text-center space-y-4">
          <div className="badge badge-orange inline-flex"><Flame size={11} /> Pricing</div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Built for every <span className="gradient-text-prompt">scale</span>.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Free for individuals. Affordable for teams. Customizable for the
            enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative rounded-3xl p-7 bg-gradient-to-br ${t.accent} border ${t.border} overflow-hidden ${
                t.highlight ? "lg:-translate-y-3 shadow-[0_20px_60px_-15px_rgba(249,115,22,0.35)]" : ""
              }`}
            >
              {t.badge && (
                <div className="absolute top-5 right-5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 border border-orange-400/40 text-orange-300 text-[10px] font-black uppercase tracking-widest">
                  {t.badge}
                </div>
              )}
              <div className="space-y-6">
                <div className="space-y-2">
                  <t.icon size={22} className={t.text} />
                  <div className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                    {t.name}
                  </div>
                  <div className="flex items-end gap-1">
                    <div className="text-5xl font-black tabular-nums text-white">
                      {t.price}
                    </div>
                    <div className="pb-2 text-xs text-gray-500 font-bold">{t.period}</div>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check size={14} className={`${t.text} mt-0.5 shrink-0`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={t.href}
                  className={`block text-center w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
                    t.highlight
                      ? "bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 text-white hover:scale-[1.02]"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
