"use client";

import Link from "next/link";
import { ExternalLink, Globe, Sparkles, Heart } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import { useResourceStats } from "@/hooks/useResourceStats";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResourceCardProps {
  slug: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
  category?: string;
  isTrending?: boolean;
  isFeatured?: boolean;
  isFree?: boolean;
  isOpenSource?: boolean;
  index?: number;
}

export default function ResourceCard({
  slug,
  name,
  description,
  url,
  tags,
  category,
  isTrending,
  isFeatured,
  isFree,
  isOpenSource,
  index = 0
}: ResourceCardProps) {
  const { likes, isLiked, toggleLike } = useResourceStats(slug);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all duration-300 flex flex-col h-full overflow-hidden shadow-2xl"
    >
      {/* Decorative Gradient Background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] group-hover:bg-blue-500/20 transition-colors duration-500 -z-10" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 blur-[80px] group-hover:bg-purple-500/20 transition-colors duration-500 -z-10" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{name}</h3>
            {isTrending && (
              <span className="badge badge-orange animate-pulse">🔥 Trending</span>
            )}
            {isFeatured && (
              <span className="badge badge-purple"><Sparkles size={10} /> Featured</span>
            )}
            {isFree && (
              <span className="badge badge-emerald">💸 Free</span>
            )}
            {isOpenSource && (
              <span className="badge badge-blue"><Globe size={10} /> OSS</span>
            )}
          </div>
          {category && (
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mt-1">{category}</span>
          )}
        </div>
        <button 
          onClick={(e) => { e.preventDefault(); toggleLike(); }}
          className={cn(
            "p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold",
            isLiked 
              ? "bg-pink-500/10 border-pink-500/30 text-pink-400" 
              : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
          )}
          aria-label={isLiked ? `Unlike ${name}` : `Like ${name}`}
          aria-pressed={isLiked}
        >
          <Heart size={14} fill={isLiked ? "currentColor" : "none"} /> {likes || 0}
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1 line-clamp-3 group-hover:text-gray-200 transition-colors">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.slice(0, 3).map((tag) => (
          <span 
            key={tag} 
            className="px-2 py-1 rounded-md bg-white/5 text-gray-500 text-[10px] font-bold uppercase tracking-wider border border-white/5 group-hover:border-white/20 transition-colors"
          >
            {tag}
          </span>
        ))}
        {tags.length > 3 && <span className="text-[10px] text-gray-600 font-bold">+{tags.length - 3}</span>}
      </div>

      {/* Footer / Action */}
      <a 
        href={url} 
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/[0.05] hover:bg-white text-white hover:text-black font-bold rounded-xl border border-white/10 hover:border-white transition-all duration-300 group/btn"
        aria-label={`Visit ${name} (opens in new tab)`}
      >
        <span>Visit Resource</span>
        <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" aria-hidden="true" />
      </a>
    </motion.div>
  );
}
