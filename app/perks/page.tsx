"use client";

import { motion } from "framer-motion";
import { Heart, Zap, Cloud, GraduationCap, Users, Gift, Cpu, BookOpen, Rocket, Star, Coffee, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";

const perkCategories = [
  { icon: Zap, label: "AI Credits", desc: "Get $100/mo in AI API credits for building", color: "from-yellow-500 to-orange-500", highlight: "$100/mo" },
  { icon: Cloud, label: "Cloud Credits", desc: "Free cloud hosting credits from partners", color: "from-blue-500 to-cyan-500", highlight: "$5k/yr" },
  { icon: GraduationCap, label: "Student Benefits", desc: "Free access to all Pro features for students", color: "from-emerald-500 to-teal-500", highlight: "Free" },
  { icon: Heart, label: "Founder Program", desc: "Free Pro tier for early-stage startups", color: "from-purple-500 to-pink-500", highlight: "Free Pro" },
  { icon: Gift, label: "Swag Store", desc: "Exclusive Dev Resource Hub merchandise", color: "from-pink-500 to-rose-500", highlight: "Shop" },
  { icon: Cpu, label: "API Access", desc: "Free API tokens for integration testing", color: "from-indigo-500 to-blue-500", highlight: "10k/mo" },
  { icon: BookOpen, label: "Learning Library", desc: "Premium courses and tutorials included", color: "from-orange-500 to-red-500", highlight: "100+" },
  { icon: Users, label: "Community Access", desc: "Private Discord with core contributors", color: "from-teal-500 to-emerald-500", highlight: "Exclusive" },
  { icon: Rocket, label: "Early Access", desc: "Be the first to try new features", color: "from-cyan-500 to-blue-500", highlight: "Beta" },
  { icon: Star, label: "Badges & Recognition", desc: "Profile badges for contributions", color: "from-amber-500 to-yellow-500", highlight: "Unlock" },
  { icon: Coffee, label: "Partner Perks", desc: "Discounts from developer tool partners", color: "from-rose-500 to-pink-500", highlight: "50% off" },
  { icon: Globe, label: "Conference Tickets", desc: "Free tickets to AI developer conferences", color: "from-violet-500 to-purple-500", highlight: "2x/yr" },
];

const partnerPrograms = [
  { name: "GitHub Student Pack", benefit: "Free tools & credits", tier: "Free" },
  { name: "Supabase Launch Week", benefit: "Extra DB credits", tier: "Pro" },
  { name: "Vercel Partner", benefit: "Free hosting credits", tier: "Pro" },
  { name: "Cursor Enterprise", benefit: "Team licenses", tier: "Enterprise" },
];

export default function PerksPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-emerald inline-flex"><Heart size={11} /> Perks & Benefits</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-hero">Developer Perks</span> Program
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Free credits, exclusive access, and partner benefits for our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {perkCategories.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl glass-strong border border-white/8 p-5 group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color}/20 border ${p.color.replace("from-", "").split(" ")[0]}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <p.icon size={18} className={`${p.color.replace("from-", "text-").split(" ")[0]}`} />
                    </div>
                    <span className="text-xs font-black text-emerald-400">{p.highlight}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{p.label}</h3>
                  <p className="text-[10px] text-gray-500">{p.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-3xl glass border border-white/8 p-8">
              <h2 className="text-lg font-black mb-6">Partner Programs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {partnerPrograms.map((pp) => (
                  <div key={pp.name} className="rounded-xl bg-white/5 border border-white/8 p-4">
                    <div className="text-xs font-bold text-white mb-1">{pp.name}</div>
                    <div className="text-[10px] text-gray-500">{pp.benefit}</div>
                    <span className="badge badge-blue text-[8px] mt-2 inline-block">{pp.tier}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
