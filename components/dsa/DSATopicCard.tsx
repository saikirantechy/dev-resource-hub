"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { Topic } from "@/lib/dsa/types";

interface Props {
  topic: Topic;
  index: number;
}

export default function DSATopicCard({ topic, index }: Props) {
  const progress = topic.problemCount > 0 ? Math.round((topic.completedCount / topic.problemCount) * 100) : 0;
  const isComplete = progress >= 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group p-5 rounded-2xl glass border border-white/10 hover:border-blue-500/30 card-hover transition-all duration-500 cursor-pointer"
    >
      <div className="space-y-4">
        {/* Icon + Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
              {topic.icon}
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">{topic.name}</h3>
              <span className="text-[10px] text-gray-500">{topic.category}</span>
            </div>
          </div>
          {isComplete && <CheckCircle2 size={18} className="text-emerald-400" />}
        </div>

        {/* Description */}
        <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{topic.description}</p>

        {/* Tags */}
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider border ${
            topic.difficulty === "Easy" ? "text-emerald-400 border-emerald-500/20 bg-emerald-500/10" :
            topic.difficulty === "Medium" ? "text-amber-400 border-amber-500/20 bg-amber-500/10" :
            topic.difficulty === "Hard" ? "text-red-400 border-red-500/20 bg-red-500/10" :
            "text-purple-400 border-purple-500/20 bg-purple-500/10"
          }`}>{topic.difficulty}</span>
          <span className="text-[10px] text-gray-600">{topic.problemCount} problems</span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[9px] text-gray-500">
            <span>Progress</span>
            <span>{topic.completedCount}/{topic.problemCount}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: index * 0.05 }}
              className={`h-full rounded-full ${isComplete ? "bg-emerald-500" : "bg-gradient-to-r from-blue-500 to-purple-500"}`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
