"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, TrendingUp, Star, Zap, Shield, Activity,
  Rocket, Bot, Search, Filter, ArrowRight, Crown,
  Heart, Layers, Code2, Wrench, X, GitFork
} from "lucide-react";
import RecommendedAgentCard from "@/components/agents/RecommendedAgentCard";
import type { RecommendedAgent } from "@/components/agents/RecommendedAgentCard";
import PersonalizationEngine from "@/components/agents/PersonalizationEngine";
import agentData from "@/data/recommended-agents.json";

type FilterCategory = "All" | "Development" | "AI" | "Startup" | "Security" | "Productivity" | "Documentation" | "Marketing" | "Research";

const FILTERS: FilterCategory[] = [
  "All", "Development", "AI", "Startup", "Security",
  "Productivity", "Documentation", "Marketing", "Research"
];

function AnalyticsSection({ agents }: { agents: RecommendedAgent[] }) {
  const trendingAgents = agents.filter((a) => a.trending);
  const mostDeployed = [...agents].sort((a, b) => b.deployments - a.deployments).slice(0, 3);
  const mostPopular = [...agents].sort((a, b) => b.popularity - a.popularity).slice(0, 3);
  const favorites = agents.filter((a) => a.communityFavorites);

  return (
    <section className="space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
          <Activity size={10} /> Analytics
        </div>
        <h2 className="text-3xl md:text-4xl font-black">Agent <span className="gradient-text-blue">Insights</span></h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto">
          Real-time analytics on what the community is building and deploying.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl glass-strong border border-white/8 space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-orange-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Trending</span>
          </div>
          <div className="space-y-3">
            {trendingAgents.slice(0, 3).map((agent, i) => (
              <div key={agent.id} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-600 w-4">{i + 1}</span>
                <Bot size={14} className="text-blue-400" />
                <span className="text-sm font-semibold text-gray-300 truncate">{agent.name}</span>
                <Zap size={12} className="text-orange-400 ml-auto" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-strong border border-white/8 space-y-4">
          <div className="flex items-center gap-2">
            <Rocket size={16} className="text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Top Deployed</span>
          </div>
          <div className="space-y-3">
            {mostDeployed.map((agent, i) => (
              <div key={agent.id} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-600 w-4">{i + 1}</span>
                <Bot size={14} className="text-emerald-400" />
                <span className="text-sm font-semibold text-gray-300 truncate">{agent.name}</span>
                <span className="text-[10px] font-bold text-gray-500 ml-auto">{(agent.deployments / 1000).toFixed(1)}k</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-strong border border-white/8 space-y-4">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">Most Popular</span>
          </div>
          <div className="space-y-3">
            {mostPopular.map((agent, i) => (
              <div key={agent.id} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-600 w-4">{i + 1}</span>
                <Bot size={14} className="text-yellow-400" />
                <span className="text-sm font-semibold text-gray-300 truncate">{agent.name}</span>
                <span className="text-[10px] font-bold text-gray-500 ml-auto">{agent.popularity}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-strong border border-white/8 space-y-4">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-pink-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-pink-400">Community Picks</span>
          </div>
          <div className="space-y-3">
            {favorites.slice(0, 3).map((agent, i) => (
              <div key={agent.id} className="flex items-center gap-3">
                <span className="text-[10px] font-black text-gray-600 w-4">{i + 1}</span>
                <Bot size={14} className="text-pink-400" />
                <span className="text-sm font-semibold text-gray-300 truncate">{agent.name}</span>
                <Crown size={12} className="text-yellow-400 ml-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RecommendedAgentsPage() {
  const agents = agentData as RecommendedAgent[];

  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = useMemo(() => {
    let result = agents;

    if (activeFilter !== "All") {
      result = result.filter((a) => a.category === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.capabilities.some((c) => c.toLowerCase().includes(q)) ||
          a.integrations.some((c) => c.toLowerCase().includes(q))
      );
    }

    return result;
  }, [agents, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main id="main-content" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-20">
          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10 shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]">
              <Sparkles size={12} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                AI Agent Discovery
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                <span className="gradient-text-hero">Recommended</span>
                <br />
                <span className="text-white">Agents</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Personalized AI agents designed to automate repetitive work, accelerate development,
                and improve productivity.
              </p>
              <p className="text-sm text-gray-600 max-w-xl mx-auto">
                Discover AI agents tailored to your workflow and deploy them instantly inside Dev Resource Hub.
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 md:gap-12 pt-4">
              <div className="text-center">
                <div className="text-2xl font-black text-white">{agents.length}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Agents</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-black text-white">
                  {agents.reduce((sum, a) => sum + a.deployments, 0).toLocaleString()}
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total Deployments</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="text-2xl font-black text-white">
                  {agents.filter((a) => a.trending).length}
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Trending Now</div>
              </div>
            </div>
          </motion.section>

          {/* Personalization Engine */}
          <PersonalizationEngine
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
          />

          {/* Filters & Search */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search agents, capabilities, integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-10 text-white text-sm focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-gray-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-hide">
                <Filter size={14} className="text-gray-500 hidden md:block" />
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={"px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap " + (activeFilter === filter
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
                    )}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Showing <span className="font-bold text-white">{filteredAgents.length}</span> of{" "}
                <span className="font-bold text-white">{agents.length}</span> agents
              </p>
              {selectedPersona && (
                <button
                  onClick={() => setSelectedPersona(null)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X size={10} /> Clear persona filter
                </button>
              )}
            </div>
          </section>

          {/* Agent Grid */}
          <AnimatePresence mode="wait">
            {filteredAgents.length > 0 ? (
              <motion.div
                key={activeFilter + searchQuery + (selectedPersona || "")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredAgents.map((agent, i) => (
                  <RecommendedAgentCard key={agent.id} agent={agent} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full py-20 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                  <Search size={24} className="text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white">No agents found</h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your filters or search query.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                    setSelectedPersona(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Analytics */}
          <AnalyticsSection agents={agents} />

          {/* Marketplace Integration + Dev Hub AI CTA */}
          <section className="relative p-8 md:p-12 rounded-[2.5rem] glass-strong border border-white/8 overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5" />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl" />

            <div className="relative z-10 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                    <Layers size={28} className="text-blue-400" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  Agent <span className="gradient-text-blue">Marketplace</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
                  Clone, fork, customize, and share agents with the community. Build your own agent
                  marketplace inside Dev Resource Hub.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                {[
                  { label: "Clone Agent", icon: Code2 },
                  { label: "Fork Agent", icon: GitFork },
                  { label: "Customize", icon: Wrench },
                  { label: "Share Agent", icon: Heart },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2 hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    <item.icon size={20} className="text-blue-400 mx-auto" />
                    <div className="text-[10px] font-bold text-gray-400">{item.label}</div>
                  </div>
                ))}
              </div>

              {/* Ask Dev Hub AI CTA */}
              <div className="mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 border border-white/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-left space-y-2">
                    <h3 className="text-xl font-bold">
                      Ask <span className="gradient-text-hero">Dev Hub AI</span> to Build This Agent
                    </h3>
                    <p className="text-sm text-gray-400 max-w-md">
                      Let AI generate the architecture, workflow, prompts, integrations, and deployment
                      plan for any agent.
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-sm hover:opacity-90 hover:scale-[1.02] transition-all whitespace-nowrap">
                    <Bot size={16} /> Ask Dev Hub AI
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
