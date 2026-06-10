"use client";

import { Star, Flame, Sparkles, GitFork, ExternalLink, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// No sonner import

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  pricing: string;
  isOpenSource: boolean;
  tags: string[];
  stars?: number;
  creator: string;
  logo: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  workflowData?: Record<string, unknown>;
}

interface Props {
  item: MarketplaceItem;
}

export default function MarketplaceCard({ item }: Props) {
  const router = useRouter();
  
  const handleFork = () => {
    if (item.workflowData) {
      localStorage.setItem("forkedWorkflow", JSON.stringify(item.workflowData));
      alert("Workflow forked successfully! Redirecting...");
      setTimeout(() => {
        router.push("/workflow");
      }, 800);
    }
  };

  return (
    <div className="group relative p-6 rounded-3xl glass border border-white/8 hover:border-blue-500/30 transition-all card-hover flex flex-col h-full bg-gradient-to-b from-white/[0.02] to-transparent">
      
      {/* Badges Overlay */}
      <div className="absolute -top-3 -right-3 flex flex-col items-end gap-2 z-10">
        {item.isFeatured && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg border border-white/20">
            <Sparkles size={10} /> Featured
          </div>
        )}
        {item.isTrending && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg border border-white/20">
            <Flame size={10} /> Trending
          </div>
        )}
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 p-1 flex-shrink-0 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
          {item.logo ? (
            <img src={item.logo} alt={item.title} className="w-full h-full object-cover rounded-xl" />
          ) : (
            <Package size={24} className="text-gray-400" />
          )}
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors truncate">
              {item.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <span className="font-medium">by @{item.creator}</span>
            {item.stars !== undefined && item.stars > 0 && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 text-yellow-500/80">
                  <Star size={10} className="fill-yellow-500/80" /> {item.stars}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1 line-clamp-3">
        {item.description}
      </p>

      <div className="space-y-4 mt-auto">
        {/* Meta tags */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
            {item.category}
          </span>
          <span className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold text-gray-400">
            {item.pricing}
          </span>
          {item.isOpenSource && (
            <span className="px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
              Open Source
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 pb-2">
          {item.tags.map(tag => (
            <span key={tag} className="text-[10px] text-gray-500">#{tag}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/5">
          {item.category === "Workflow Templates" && item.workflowData ? (
            <button 
              onClick={handleFork}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-bold transition-all border border-blue-500/20 group/btn"
            >
              <GitFork size={16} className="group-hover/btn:-rotate-12 transition-transform" />
              Fork Workflow
            </button>
          ) : (
            <Link 
              href={`#${item.id}`} // Would go to details page in real app
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all border border-white/5"
            >
              View Details <ExternalLink size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
