"use client";

import { motion } from "framer-motion";
import { ThumbsUp, CheckCircle2, Building2, Clock } from "lucide-react";
import type { Challenge } from "@/lib/dsa/types";

interface Props {
  challenge: Challenge;
  index: number;
}

export default function DSAChallengeCard({ challenge, index }: Props) {
  const diffStyle = {
    Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Hard: "text-red-400 bg-red-500/10 border-red-500/20",
    Expert: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  }[challenge.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group p-5 rounded-2xl glass border border-white/10 hover:border-blue-500/30 card-hover transition-all duration-500 cursor-pointer"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">{challenge.title}</h3>
            <span className="text-[10px] text-gray-500 mt-0.5 block">{challenge.topic}</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border ${diffStyle}`}>
            {challenge.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{challenge.description}</p>

        {/* Topics */}
        <div className="flex flex-wrap gap-1">
          {challenge.topics.map(t => (
            <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-[8px] font-bold border border-white/5">
              {t}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-[10px] text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><ThumbsUp size={11} /> {challenge.likes >= 1000 ? `${(challenge.likes / 1000).toFixed(1)}k` : challenge.likes}</span>
            <span className="flex items-center gap-1"><CheckCircle2 size={11} /> {challenge.acceptanceRate}%</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {challenge.timeLimit}min</span>
          </div>
        </div>

        {/* Companies */}
        {challenge.companies.length > 0 && (
          <div className="flex items-center gap-1.5">
            <Building2 size={10} className="text-gray-600" />
            {challenge.companies.slice(0, 3).map(c => (
              <span key={c} className="px-1.5 py-0.5 rounded bg-white/5 text-[8px] font-bold text-gray-400">{c}</span>
            ))}
            {challenge.companies.length > 3 && (
              <span className="text-[8px] text-gray-600">+{challenge.companies.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
