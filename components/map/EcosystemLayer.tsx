"use client";

import { motion } from "framer-motion";

interface EcosystemLayerProps {
  selectedLayer: string | null;
  onLayerChange: (layer: string | null) => void;
}

const LAYERS = [
  { id: "Hub", label: "Hubs", emoji: "🌍", color: "emerald" },
  { id: "Community", label: "Communities", emoji: "👥", color: "blue" },
  { id: "Startup", label: "Startups", emoji: "🚀", color: "purple" },
  { id: "Event", label: "Events", emoji: "🎪", color: "pink" },
  { id: "Contributor", label: "Contributors", emoji: "🌟", color: "amber" },
];

const COLOR_MAP: Record<string, { active: string; border: string; text: string }> = {
  emerald: {
    active: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
  },
  blue: {
    active: "bg-blue-500/15 border-blue-500/30 text-blue-300",
    border: "border-blue-500/20",
    text: "text-blue-400",
  },
  purple: {
    active: "bg-purple-500/15 border-purple-500/30 text-purple-300",
    border: "border-purple-500/20",
    text: "text-purple-400",
  },
  pink: {
    active: "bg-pink-500/15 border-pink-500/30 text-pink-300",
    border: "border-pink-500/20",
    text: "text-pink-400",
  },
  amber: {
    active: "bg-amber-500/15 border-amber-500/30 text-amber-300",
    border: "border-amber-500/20",
    text: "text-amber-400",
  },
};

export default function EcosystemLayer({
  selectedLayer,
  onLayerChange,
}: EcosystemLayerProps) {
  return (
    <div className="rounded-2xl glass border border-white/8 p-4">
      <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-3">
        AI Ecosystem Layer
      </div>
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onLayerChange(null)}
          className={`px-3.5 py-2 rounded-xl text-[10px] font-bold border transition-all ${
            selectedLayer === null
              ? "bg-white/10 border-white/20 text-white"
              : "bg-white/[0.03] border-white/5 text-gray-500 hover:text-white hover:bg-white/5"
          }`}
        >
          All
        </motion.button>
        {LAYERS.map((layer) => {
          const isActive = selectedLayer === layer.id;
          const colors = COLOR_MAP[layer.color];
          return (
            <motion.button
              key={layer.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLayerChange(isActive ? null : layer.id)}
              className={`px-3.5 py-2 rounded-xl text-[10px] font-bold border transition-all flex items-center gap-1.5 ${
                isActive
                  ? colors.active
                  : `bg-white/[0.03] border-white/5 text-gray-500 hover:text-white hover:bg-white/5`
              }`}
            >
              <span>{layer.emoji}</span>
              {layer.label}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
