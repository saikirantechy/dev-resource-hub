"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Heart, Eye, Bookmark, Play, Code2, Clock,
  Zap, ChevronDown, ChevronUp, Sparkles, Bot, Layers,
  FileText, Video, ClipboardList, Lightbulb,
  GraduationCap, Shield
} from "lucide-react";

export interface RecommendedAgent {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  color: string;
  timeSaved: string;
  capabilities: string[];
  integrations: string[];
  workflow: string[];
  popularity: number;
  trending: boolean;
  deployments: number;
  communityFavorites: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Code2, FileText, Video, ClipboardList, Lightbulb,
  Shield, GraduationCap, Bot, Layers, Sparkles, Zap, Heart
};

const fallbackIcon = Bot;

function AgentIcon({ iconName, className }: { iconName: string; className?: string }) {
  const Icon = iconMap[iconName as keyof typeof iconMap] || fallbackIcon;
  return <Icon size={20} className={className || "text-white"} />;
}

const colorVariants: Record<string, { text: string }> = {
  blue: { text: "text-blue-400" },
  purple: { text: "text-purple-400" },
  emerald: { text: "text-emerald-400" },
  orange: { text: "text-orange-400" },
  pink: { text: "text-pink-400" },
  red: { text: "text-red-400" },
  indigo: { text: "text-indigo-400" },
  cyan: { text: "text-cyan-400" },
};

function getColorVariant(colorStr: string) {
  for (const [key, val] of Object.entries(colorVariants)) {
    if (colorStr.includes(key)) return val;
  }
  return colorVariants.blue;
}

interface Props {
  agent: RecommendedAgent;
  index: number;
}

export default function RecommendedAgentCard({ agent, index }: Props) {
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showAllCapabilities, setShowAllCapabilities] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const colorVariant = getColorVariant(agent.color);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative rounded-3xl glass-strong border border-white/8 hover:border-blue-400/30 transition-all overflow-hidden"
    >
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-[2rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-700 -z-10" />

      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={"w-12 h-12 rounded-2xl bg-gradient-to-br " + agent.color + "/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"}>
              <AgentIcon iconName={agent.icon} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                {agent.name}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={"text-[10px] font-bold uppercase tracking-widest " + colorVariant.text}>
                  {agent.category}
                </span>
                {agent.trending && (
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[8px] font-bold uppercase tracking-wider">
                    <Zap size={8} /> Trending
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setLiked(!liked)}
              className={"p-2 rounded-xl transition-all border " + (liked
                ? "bg-pink-500/10 border-pink-500/30 text-pink-400"
                : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10"
              )}
              aria-label={liked ? "Unlike agent" : "Like agent"}
            >
              <Heart size={14} fill={liked ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={"p-2 rounded-xl transition-all border " + (saved
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10"
              )}
              aria-label={saved ? "Unsave agent" : "Save agent"}
            >
              <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
          {agent.description}
        </p>

        {/* Time Saved Badge */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 w-fit">
          <Clock size={14} className="text-emerald-400" />
          <span className="text-xs font-bold text-emerald-400">Saves {agent.timeSaved}</span>
        </div>

        {/* Capabilities */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Capabilities</div>
          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities.slice(0, showAllCapabilities ? agent.capabilities.length : 3).map((cap) => (
              <span
                key={cap}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-400 group-hover:border-white/20 transition-colors"
              >
                {cap}
              </span>
            ))}
            {agent.capabilities.length > 3 && !showAllCapabilities && (
              <button
                onClick={() => setShowAllCapabilities(true)}
                className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-semibold text-blue-400 hover:bg-blue-500/10 transition-all"
              >
                +{agent.capabilities.length - 3} more
              </button>
            )}
          </div>
        </div>

        {/* Integrations */}
        <div className="space-y-2">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Integrations</div>
          <div className="flex flex-wrap gap-1.5">
            {agent.integrations.map((integration) => (
              <span
                key={integration}
                className="px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-bold text-gray-300"
              >
                {integration}
              </span>
            ))}
          </div>
        </div>

        {/* Workflow (collapsible) */}
        <div>
          <button
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-gray-300 transition-colors"
          >
            <Layers size={12} /> Workflow
            {showWorkflow ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
          <AnimatePresence>
            {showWorkflow && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 space-y-2 overflow-hidden"
              >
                {agent.workflow.map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className={"w-6 h-6 rounded-full bg-gradient-to-br " + agent.color + "/20 border border-white/10 flex items-center justify-center flex-shrink-0"}>
                      <span className="text-[8px] font-black text-white">{i + 1}</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                    <span className="text-[10px] text-gray-400 font-medium">{step}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <Eye size={12} />
            <span className="font-bold">{(agent.deployments / 1000).toFixed(1)}k</span>
            <span>deployments</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <Sparkles size={12} />
            <span className="font-bold">{agent.popularity}%</span>
            <span>match</span>
          </div>
          {agent.communityFavorites && (
            <div className="flex items-center gap-1 text-[10px] text-yellow-500">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Community pick
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold hover:opacity-90 hover:scale-[1.02] transition-all">
            <Zap size={12} /> Build This
          </button>
          <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs font-bold hover:bg-white/10 hover:text-white transition-all">
            <Play size={12} /> Preview
          </button>
          <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs font-bold hover:bg-white/10 hover:text-white transition-all">
            <Code2 size={12} /> Clone
          </button>
        </div>
      </div>
    </motion.div>
  );
}
