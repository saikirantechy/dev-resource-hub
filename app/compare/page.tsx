"use client";

import Navbar from "@/components/Navbar";
import { Scale, CheckCircle2, XCircle, ArrowRight, Zap, Star } from "lucide-react";
import Link from "next/link";

const comparisons = [
  {
    id: "ai-ides",
    title: "AI IDEs & Coding Assistants",
    emoji: "⌨️",
    color: "blue",
    tools: [
      {
        name: "Cursor",
        description: "AI-first code editor",
        bestFor: "Full codebase refactoring",
        price: "Free / $20 Pro",
        rating: 4.8,
        features: {
          "Multi-file Edit": true,
          "Inline Chat": true,
          "Terminal AI": true,
          "Autonomous Mode": false,
          "Free Tier": true,
        }
      },
      {
        name: "Windsurf",
        description: "Next-gen AI IDE",
        bestFor: "Deep codebase context",
        price: "Free / Pro",
        rating: 4.7,
        features: {
          "Multi-file Edit": true,
          "Inline Chat": true,
          "Terminal AI": true,
          "Autonomous Mode": false,
          "Free Tier": true,
        }
      },
      {
        name: "Devin AI",
        description: "Autonomous engineer",
        bestFor: "End-to-end task execution",
        price: "Enterprise",
        rating: 4.5,
        features: {
          "Multi-file Edit": true,
          "Inline Chat": false,
          "Terminal AI": true,
          "Autonomous Mode": true,
          "Free Tier": false,
        }
      },
      {
        name: "GitHub Copilot",
        description: "AI pair programmer",
        bestFor: "Autocomplete & suggestions",
        price: "$10/mo",
        rating: 4.6,
        features: {
          "Multi-file Edit": false,
          "Inline Chat": true,
          "Terminal AI": false,
          "Autonomous Mode": false,
          "Free Tier": false,
        }
      },
    ]
  },
  {
    id: "ai-ui-builders",
    title: "AI UI Builders",
    emoji: "🎨",
    color: "pink",
    tools: [
      {
        name: "v0 by Vercel",
        description: "Generative UI for React",
        bestFor: "shadcn/ui component generation",
        price: "Free / Premium",
        rating: 4.7,
        features: {
          "Component Gen": true,
          "Full Page Gen": true,
          "Code Export": true,
          "Backend": false,
          "Deploy": true,
        }
      },
      {
        name: "Lovable",
        description: "Full-stack AI builder",
        bestFor: "Full-stack app from prompts",
        price: "Free / Premium",
        rating: 4.6,
        features: {
          "Component Gen": true,
          "Full Page Gen": true,
          "Code Export": true,
          "Backend": true,
          "Deploy": true,
        }
      },
      {
        name: "Bolt.new",
        description: "Browser-based dev agent",
        bestFor: "Instant in-browser dev",
        price: "Free / Pro",
        rating: 4.8,
        features: {
          "Component Gen": true,
          "Full Page Gen": true,
          "Code Export": true,
          "Backend": true,
          "Deploy": true,
        }
      },
    ]
  },
  {
    id: "agent-frameworks",
    title: "AI Agent Frameworks",
    emoji: "🤖",
    color: "purple",
    tools: [
      {
        name: "CrewAI",
        description: "Multi-agent orchestration",
        bestFor: "Role-based agent teams",
        price: "Open Source",
        rating: 4.6,
        features: {
          "Multi-Agent": true,
          "Memory": true,
          "Tool Use": true,
          "Graph Flow": false,
          "Open Source": true,
        }
      },
      {
        name: "LangGraph",
        description: "Graph-based agent flows",
        bestFor: "Stateful, complex workflows",
        price: "Open Source",
        rating: 4.5,
        features: {
          "Multi-Agent": true,
          "Memory": true,
          "Tool Use": true,
          "Graph Flow": true,
          "Open Source": true,
        }
      },
      {
        name: "AutoGPT",
        description: "Autonomous goal agent",
        bestFor: "Goal-oriented automation",
        price: "Open Source",
        rating: 4.3,
        features: {
          "Multi-Agent": false,
          "Memory": true,
          "Tool Use": true,
          "Graph Flow": false,
          "Open Source": true,
        }
      },
    ]
  }
];

const COLOR_MAP: Record<string, { badge: string; header: string; border: string }> = {
  blue: { badge: "badge-blue", header: "from-blue-500/20 to-purple-500/20", border: "border-blue-500/30" },
  pink: { badge: "badge-pink", header: "from-pink-500/20 to-purple-500/20", border: "border-pink-500/30" },
  purple: { badge: "badge-purple", header: "from-purple-500/20 to-blue-500/20", border: "border-purple-500/30" },
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-20">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-emerald">
            <Scale size={12} /> AI Stack Comparison
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-emerald">Compare</span>
            <br />
            <span className="text-white/90">AI Tools</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Side-by-side feature breakdowns across every category. Find the perfect tool for your workflow.
          </p>
        </header>

        {/* Quick Jump */}
        <div className="flex flex-wrap gap-3 justify-center">
          {comparisons.map(c => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/10 text-sm font-semibold text-gray-400 hover:text-white hover:border-white/20 transition-all"
            >
              <span>{c.emoji}</span> {c.title}
            </a>
          ))}
        </div>

        {/* Comparison Sections */}
        {comparisons.map((section) => {
          const colors = COLOR_MAP[section.color] || COLOR_MAP.blue;
          const features = Object.keys(section.tools[0].features);

          return (
            <section key={section.id} id={section.id} className="space-y-6 scroll-mt-20">
              <div className="flex items-center gap-4">
                <div className={`px-4 py-2 rounded-2xl bg-gradient-to-r ${colors.header} border ${colors.border} text-2xl`}>
                  {section.emoji}
                </div>
                <h2 className="text-3xl font-black">{section.title}</h2>
              </div>

              <div className="glass rounded-3xl border border-white/8 overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="p-5 text-left font-bold text-gray-400 text-sm w-48">Tool</th>
                      <th className="p-5 text-left font-bold text-gray-400 text-sm">Best For</th>
                      <th className="p-5 text-left font-bold text-gray-400 text-sm">Pricing</th>
                      <th className="p-5 text-center font-bold text-gray-400 text-sm">Rating</th>
                      {features.map(f => (
                        <th key={f} className="p-4 text-center font-bold text-gray-400 text-xs whitespace-nowrap">{f}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.tools.map((tool, ti) => (
                      <tr
                        key={tool.name}
                        className={`border-b border-white/5 hover:bg-white/[0.02] transition-colors ${ti === 0 ? "bg-blue-500/[0.03]" : ""}`}
                      >
                        <td className="p-5">
                          <div className="font-bold text-base text-white">{tool.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{tool.description}</div>
                          {ti === 0 && <span className="badge badge-orange text-[9px] mt-2">Top Pick</span>}
                        </td>
                        <td className="p-5 text-sm text-gray-300 max-w-[160px]">{tool.bestFor}</td>
                        <td className="p-5 text-sm font-semibold text-emerald-400">{tool.price}</td>
                        <td className="p-5 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-sm font-bold text-white">{tool.rating}</span>
                          </div>
                        </td>
                        {Object.values(tool.features).map((has, fi) => (
                          <td key={fi} className="p-4 text-center">
                            {has ? (
                              <CheckCircle2 size={18} className="text-emerald-400 inline-block" />
                            ) : (
                              <XCircle size={18} className="text-gray-700 inline-block" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        {/* AI Stack Generator CTA */}
        <div className="relative p-12 rounded-[2.5rem] glass border border-white/8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
          <div className="relative z-10 space-y-4">
            <div className="text-4xl animate-float inline-block">⚡</div>
            <h2 className="text-3xl font-black">Not sure which to pick?</h2>
            <p className="text-gray-400 max-w-md mx-auto">Use our AI Finder to get a personalized tool recommendation based on your project needs.</p>
            <Link href="/ai-finder" className="btn-primary inline-flex">
              <Zap size={16} /> Try AI Finder <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
