import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ResourceCardProps {
  name: string;
  description: string;
  url: string;
  tags: string[];
  category?: string;
  isTrending?: boolean;
  isFeatured?: boolean;
}

export default function ResourceCard({
  name,
  description,
  url,
  tags,
  category,
  isTrending,
  isFeatured
}: ResourceCardProps) {
  return (
    <div className="group relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 flex flex-col h-full overflow-hidden shadow-2xl">
      {/* Decorative Gradient Background */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] group-hover:bg-blue-500/20 transition-colors duration-500 -z-10" />
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{name}</h3>
            {isTrending && (
              <span className="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wider border border-orange-500/20">
                🔥 Trending
              </span>
            )}
            {isFeatured && (
              <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider border border-purple-500/20">
                ⭐ Featured
              </span>
            )}
          </div>
          {category && (
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">{category}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1 line-clamp-3 group-hover:text-gray-300 transition-colors">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="px-2 py-1 rounded-md bg-white/5 text-gray-400 text-[10px] font-medium border border-white/5 group-hover:border-white/10 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer / Action */}
      <Link 
        href={url} 
        target="_blank"
        className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/[0.05] hover:bg-white text-white hover:text-black font-bold rounded-xl border border-white/10 hover:border-white transition-all duration-300 group/btn"
      >
        <span>Visit Resource</span>
        <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
      </Link>
    </div>
  );
}
