"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User, Code2, Building2, Briefcase, Brain, Heart,
  Sparkles, ArrowRight, Check
} from "lucide-react";

// ─── Personas ───
const PERSONAS = [
  { id: "student", label: "Student", icon: User, description: "Learning AI & building projects", color: "blue" },
  { id: "developer", label: "Developer", icon: Code2, description: "Building software & apps", color: "emerald" },
  { id: "founder", label: "Founder", icon: Building2, description: "Launching a startup", color: "purple" },
  { id: "freelancer", label: "Freelancer", icon: Briefcase, description: "Client work & delivery", color: "orange" },
  { id: "ai-engineer", label: "AI Engineer", icon: Brain, description: "Building AI/ML systems", color: "cyan" },
  { id: "agency-owner", label: "Agency Owner", icon: Heart, description: "Running an agency", color: "pink" },
];

const personaColors: Record<string, { active: string; inactive: string; border: string }> = {
  blue: {
    active: "bg-blue-500/15 border-blue-500/30 text-blue-300",
    inactive: "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white",
    border: "border-blue-500/20"
  },
  emerald: {
    active: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
    inactive: "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white",
    border: "border-emerald-500/20"
  },
  purple: {
    active: "bg-purple-500/15 border-purple-500/30 text-purple-300",
    inactive: "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white",
    border: "border-purple-500/20"
  },
  orange: {
    active: "bg-orange-500/15 border-orange-500/30 text-orange-300",
    inactive: "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white",
    border: "border-orange-500/20"
  },
  cyan: {
    active: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
    inactive: "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white",
    border: "border-cyan-500/20"
  },
  pink: {
    active: "bg-pink-500/15 border-pink-500/30 text-pink-300",
    inactive: "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white",
    border: "border-pink-500/20"
  },
};

interface Props {
  selectedPersona: string | null;
  onSelectPersona: (id: string) => void;
}

export default function PersonalizationEngine({ selectedPersona, onSelectPersona }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-8 md:p-10 rounded-[2.5rem] glass-strong border border-white/8 overflow-hidden"
    >
      {/* Background aurora */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
            <Sparkles size={10} /> Personalize
          </div>
          <h2 className="text-2xl md:text-3xl font-black">
            What best describes <span className="gradient-text-blue">you</span>?
          </h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            Pick your role and we&apos;ll recommend agents tailored to your workflow.
          </p>
        </div>

        {/* Persona Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {PERSONAS.map((persona) => {
            const colors = personaColors[persona.color];
            const isActive = selectedPersona === persona.id;
            return (
              <motion.button
                key={persona.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectPersona(persona.id)}
                className={`p-4 rounded-2xl border transition-all text-center space-y-3 ${
                  isActive ? colors.active : colors.inactive
                }`}
              >
                <div className="flex justify-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive
                      ? "bg-gradient-to-br from-white/10 to-white/5"
                      : "bg-white/5"
                  }`}>
                    <persona.icon size={18} />
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold">{persona.label}</div>
                  <div className="text-[8px] text-gray-500 mt-1 leading-relaxed">{persona.description}</div>
                </div>
                {isActive && (
                  <div className="flex justify-center">
                    <Check size={14} className="text-current" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Active recommendation hint */}
        <AnimatePresence>
          {selectedPersona && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-gray-400">
                Agents recommended for{" "}
                <span className="text-white font-bold">
                  {PERSONAS.find((p) => p.id === selectedPersona)?.label}
                </span>
              </span>
              <ArrowRight size={14} className="text-blue-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
