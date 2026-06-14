"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Sparkles, TrendingUp, Globe, Lock, Clock, Star } from "lucide-react";

interface Opportunity {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: string;
  difficulty: string;
  isTrending?: boolean;
  isFeatured?: boolean;
  isFree?: boolean;
  isOpenSource?: boolean;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
  index?: number;
}

function getDifficultyColor(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case "beginner": return "from-emerald-500 to-green-500";
    case "intermediate": return "from-amber-500 to-orange-500";
    case "advanced": return "from-red-500 to-rose-500";
    default: return "from-blue-500 to-cyan-500";
  }
}

function getCategoryIcon(category: string): string {
  switch (category.toLowerCase()) {
    case "learning": return "📚";
    case "issue finder": return "🔍";
    case "ai tools": return "🤖";
    case "programs": return "🎯";
    case "tools": return "🛠️";
    case "bounties": return "💰";
    case "community": return "🌍";
    default: return "⭐";
  }
}

export default function OpportunityCard({ opportunity, index = 0 }: OpportunityCardProps) {
  const diffColor = getDifficultyColor(opportunity.difficulty);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <a
        href={opportunity.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full p-6 rounded-2xl glass border border-white/8 hover:border-emerald-500/30 card-hover transition-all duration-500"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getCategoryIcon(opportunity.category)}</span>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {opportunity.name}
              </h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                {opportunity.category}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {opportunity.isTrending && (
              <span className="badge badge-orange animate-pulse">🔥</span>
            )}
            {opportunity.isFeatured && (
              <span className="badge badge-purple"><Sparkles size={8} /></span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
          {opportunity.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-gradient-to-r ${diffColor} bg-opacity-20 text-white border border-white/10`}>
            {opportunity.difficulty}
          </span>
          {opportunity.isFree !== undefined && (
            <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider ${opportunity.isFree ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
              {opportunity.isFree ? 'Free' : 'Paid'}
            </span>
          )}
          {opportunity.isOpenSource && (
            <span className="badge badge-blue text-[8px]"><Globe size={7} /> OSS</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {opportunity.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-white/5 text-gray-500 text-[8px] font-bold uppercase tracking-wider border border-white/5">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold group-hover:translate-x-2 transition-transform duration-500">
          <ExternalLink size={10} /> Visit Resource
        </div>
      </a>
    </motion.div>
  );
}
