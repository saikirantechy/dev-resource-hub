"use client";

import { Eye, Code, Code2, Link as LinkIcon, Heart } from "lucide-react";
import { useState } from "react";

export interface ShowcaseItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  creator: string;
  github: string;
  likes: number;
  views: number;
  builtWithHub: boolean;
}

interface Props {
  item: ShowcaseItem;
}

export default function ShowcaseCard({ item }: Props) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);

  return (
    <div className="group relative rounded-3xl glass border border-white/8 hover:border-blue-500/30 transition-all card-hover overflow-hidden flex flex-col bg-gradient-to-b from-white/[0.02] to-transparent">
      
      {/* Badges Overlay */}
      <div className="absolute top-4 left-4 flex flex-col items-start gap-2 z-10">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg border border-white/10">
          {item.category}
        </div>
      </div>
      
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        {item.builtWithHub && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-black tracking-widest uppercase rounded-full shadow-lg border border-white/20 animate-pulse-slow">
            <Code2 size={10} /> Built with Hub
          </div>
        )}
      </div>

      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/20 to-transparent" />
      </div>

      <div className="p-6 pt-2 flex flex-col flex-1 relative z-10">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h3 className="font-black text-xl text-white group-hover:text-blue-300 transition-colors truncate">
            {item.title}
          </h3>
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
              liked 
              ? 'bg-red-500/10 text-red-400 border-red-500/20' 
              : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Heart size={14} className={liked ? "fill-red-400" : ""} /> {formatNum(likesCount)}
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <span className="font-bold text-gray-400">@{item.creator}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Eye size={12} /> {formatNum(item.views)}
          </span>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-1 line-clamp-2">
          {item.description}
        </p>

        <div className="space-y-4 mt-auto">
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 pb-2">
            {item.techStack.map(tech => (
              <span key={tech} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold text-gray-300">
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
            <a 
              href={item.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-all border border-white/10"
            >
              <Code size={14} /> Repository
            </a>
            <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-bold transition-all border border-blue-500/20">
              <LinkIcon size={14} /> Live Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
