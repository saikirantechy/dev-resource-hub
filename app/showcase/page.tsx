"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ShowcaseCard, { ShowcaseItem } from "@/components/ShowcaseCard";
import showcaseData from "@/data/showcase.json";
import { Search, Star, Sparkles, LayoutGrid, Code2, Users } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  "All",
  "AI Agents",
  "SaaS",
  "Automation",
  "Browser AI",
  "Workflows",
  "Prompt Engineering"
];

export default function ShowcasePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showBuiltWithHubOnly, setShowBuiltWithHubOnly] = useState(false);

  const items = showcaseData as ShowcaseItem[];

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBuiltWithHub = showBuiltWithHubOnly ? item.builtWithHub : true;
    
    return matchesCategory && matchesSearch && matchesBuiltWithHub;
  });

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16 relative z-10">
        
        {/* Header */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold uppercase tracking-widest">
            <Star size={14} /> Community
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Developer
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
              Showcase
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover incredible projects, agents, and SaaS applications built by the Dev Resource Hub community.
          </p>
        </header>

        {/* Filters and Search */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="Search projects, creators, stacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-yellow-500/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button 
                onClick={() => setShowBuiltWithHubOnly(!showBuiltWithHubOnly)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap border ${
                  showBuiltWithHubOnly 
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)]' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Code2 size={16} className={showBuiltWithHubOnly ? "animate-pulse-slow" : ""} /> Built with Hub
              </button>
              
              <div className="h-8 w-px bg-white/10 mx-2 hidden md:block"></div>
              
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white font-bold transition-all whitespace-nowrap">
                <Users size={16} /> Following
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white font-bold transition-all whitespace-nowrap">
                <LayoutGrid size={16} /> Newest
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  activeCategory === cat 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ShowcaseCard item={item} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <Search size={24} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white">No projects found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>

        {/* Submit CTA */}
        <div className="mt-20 relative p-12 rounded-[3rem] glass border border-white/10 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto border border-yellow-500/30">
              <Sparkles size={32} className="text-yellow-400" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black">Built something amazing?</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Join the showcase and get your project in front of thousands of AI developers. Open source, SaaS, or just a cool experiment—we want to see it.
            </p>
            <a href="/submit" className="inline-flex px-8 py-4 rounded-xl bg-white text-black font-black text-lg hover:bg-gray-200 hover:scale-105 transition-all">
              Submit Your Project
            </a>
          </div>
        </div>

      </main>
    </div>
  );
}
