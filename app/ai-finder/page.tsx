"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Sparkles,
  ArrowRight,
  Bot,
  Code2,
  Palette,
  Globe,
  Zap,
  CheckCircle2,
  ChevronRight,
  Filter,
} from "lucide-react";
import Link from "next/link";
import agentsData from "@/data/agents.json";
import toolsData from "@/data/tools.json";

const PERSONA_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-400" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
};

const PERSONAS = [
  {
    id: "frontend",
    title: "Frontend Developer",
    icon: Palette,
    desc: "Focus on UI/UX, components, and styling with AI.",
    color: "blue",
  },
  {
    id: "backend",
    title: "Backend Engineer",
    icon: Globe,
    desc: "Infrastructure, APIs, and scaling with AI assistance.",
    color: "purple",
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    icon: Bot,
    desc: "Building agents, fine-tuning, and LLM orchestration.",
    color: "emerald",
  },
  {
    id: "fullstack",
    title: "Fullstack Developer",
    icon: Code2,
    desc: "End-to-end development with productivity boosts.",
    color: "orange",
  },
];

interface Tool {
  id: string;
  name?: string;
  category?: string;
  tags?: string[];
  description?: string;
  url?: string;
  isFeatured?: boolean;
  [key: string]: unknown;
}

interface Agent {
  id: string;
  name?: string;
  tags?: string[];
  category?: string;
  description?: string;
  url?: string;
  isFeatured?: boolean;
  [key: string]: unknown;
}

export default function AIFinderPage() {
  const [step, setStep] = useState(1);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<(Tool | Agent)[]>([]);

  const handleSelectPersona = (id: string) => {
    setSelectedPersona(id);

    // Simple logic for recommendations
    let filtered: (Tool | Agent)[] = [];
    if (id === "frontend") {            filtered = [
        ...toolsData.filter(
          (t: Tool) => t.category === "UI Builders" || (t.tags && t.tags.includes("UI")),
        ),
        ...agentsData.filter((a: Agent) => a.tags?.includes("Coding")),
      ].slice(0, 4);
    } else if (id === "ai-engineer") {
      filtered = [
        ...agentsData.filter(
          (a) =>
            a.category === "Agent Frameworks" ||
            a.category === "Autonomous Agents",
        ),
        ...toolsData.filter((t) => t.tags && t.tags.includes("Local LLM")),
      ].slice(0, 4);
    } else {
      filtered = [
        ...toolsData.filter((t) => t.isFeatured),
        ...agentsData.filter((a) => a.isFeatured),
      ].slice(0, 4);
    }

    setRecommendations(filtered);
    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 py-20 space-y-16">
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-blue">
            <Sparkles size={12} /> AI Recommendation Engine
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Find Your <span className="gradient-text-hero">Perfect Stack</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
            Answer a few questions and our engine will recommend the best AI
            tools and agents for your specific workflow.
          </p>
        </header>

        {step === 1 ? (
          <section className="space-y-8 animate-fade-in-scale">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">
                Step 1: Choose your persona
              </h2>
              <p className="text-gray-500">
                What best describes your current focus?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PERSONAS.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => handleSelectPersona(persona.id)}
                  className="group relative p-8 rounded-3xl glass border border-white/8 text-left hover:border-blue-500/40 transition-all card-hover"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl ${PERSONA_COLORS[persona.color]?.bg || "bg-white/5"} ${PERSONA_COLORS[persona.color]?.border || "border-white/10"} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <persona.icon
                      className={PERSONA_COLORS[persona.color]?.text || "text-gray-400"}
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{persona.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {persona.desc}
                  </p>
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={20} className="text-blue-400" />
                  </div>
                </button>
              ))}
            </div>
          </section>
        ) : (
          <section className="space-y-12 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="badge badge-emerald inline-flex mb-4">
                <CheckCircle2 size={10} /> Stack Generated
              </div>
              <h2 className="text-3xl font-black">Your Recommended AI Stack</h2>
              <p className="text-gray-500">
                Based on your persona as a{" "}
                <span className="text-white font-bold">
                  {PERSONAS.find((p) => p.id === selectedPersona)?.title}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((item, i) => {
                const tool = item as Tool & Agent;
                return (
                <div
                  key={tool.id}
                  className="p-6 rounded-3xl glass border border-white/8 hover:border-blue-500/30 transition-all flex flex-col gap-4 animate-fade-in"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        {tool.category && tool.category.includes("Agent") ? (
                          <Bot size={18} className="text-blue-400" />
                        ) : (
                          <Zap size={18} className="text-emerald-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-white">{tool.name}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                          {tool.category}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {tool.description}
                  </p>
                  <Link
                    href={tool.url || "#"}
                    target="_blank"
                    className="mt-auto flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 group"
                  >
                    View Resource{" "}
                    <ArrowRight
                      size={12}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              );})}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="btn-secondary px-8 py-3 rounded-2xl flex items-center gap-2"
              >
                <Filter size={14} /> Start Over
              </button>
              <Link
                href="/tools"
                className="btn-primary px-8 py-3 rounded-2xl flex items-center gap-2"
              >
                Explore More <ArrowRight size={14} />
              </Link>
            </div>

            <div className="p-8 rounded-[2rem] glass border border-blue-500/20 text-center space-y-4">
              <h3 className="text-xl font-bold">Want a custom roadmap?</h3>
              <p className="text-sm text-gray-400">
                Join our Discord to get 1-on-1 advice from experienced AI
                builders.
              </p>
              <Link
                href="/community"
                className="badge badge-purple px-4 py-2 hover:scale-105 transition-transform"
              >
                Join Community
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
