"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import MarketplaceCard, { MarketplaceItem } from "@/components/MarketplaceCard";
import marketplaceData from "@/data/marketplace.json";
import { Search, Filter, Sparkles, TrendingUp, Package, Code } from "lucide-react";
import { motion } from "framer-motion";

const CATEGORIES = [
  "All",
  "AI Coding",
  "AI Agents",
  "Prompt Packs",
  "Workflow Templates",
  "AI IDEs",
  "Automation Tools",
  "Developer Utilities",
  "Open Source AI"
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpenSourceOnly, setShowOpenSourceOnly] = useState(false);

  const items = marketplaceData as MarketplaceItem[];

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOpenSource = showOpenSourceOnly ? item.isOpenSource : true;
    
    return matchesCategory && matchesSearch && matchesOpenSource;
  });

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16 relative z-10">
        
        {/* Header */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-widest">
            <Package size={14} /> Ecosystem
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            The AI Developer
            <br />
            <span className="gradient-text-blue">Marketplace</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover tools, agents, prompt packs, and workflow templates built by the community. Fork workflows directly into your canvas.
          </p>
        </header>

        {/* Filters and Search */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white/5 p-4 rounded-3xl border border-white/10 backdrop-blur-md">
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="text" 
                placeholder="Search tools, templates, prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button 
                onClick={() => setShowOpenSourceOnly(!showOpenSourceOnly)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap border ${
                  showOpenSourceOnly 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                  : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Code size={16} /> Open Source
              </button>
              
              <div className="h-8 w-px bg-white/10 mx-2 hidden md:block"></div>
              
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white font-bold transition-all whitespace-nowrap">
                <TrendingUp size={16} /> Trending
              </button>
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white font-bold transition-all whitespace-nowrap">
                <Sparkles size={16} /> Featured
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <MarketplaceCard item={item} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <Search size={24} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white">No items found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
