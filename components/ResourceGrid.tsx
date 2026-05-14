"use client";

import { useState, useMemo } from "react";
import ResourceCard from "./ResourceCard";
import SearchBar from "./SearchBar";
import Fuse from "fuse.js";
import { Filter, Globe, DollarSign, CheckCircle2 } from "lucide-react";

interface Resource {
  name: string;
  description: string;
  url: string;
  tags: string[];
  category?: string;
  isTrending?: boolean;
  isFeatured?: boolean;
  isFree?: boolean;
  isOpenSource?: boolean;
}

interface ResourceGridProps {
  initialResources: Resource[];
  showSearch?: boolean;
  title?: string;
}

type FilterType = "all" | "free" | "oss";

export default function ResourceGrid({ initialResources, showSearch = true, title }: ResourceGridProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const fuse = useMemo(() => new Fuse(initialResources, {
    keys: ["name", "description", "tags", "category"],
    threshold: 0.3,
  }), [initialResources]);

  const filteredResources = useMemo(() => {
    let result = query ? fuse.search(query).map(r => r.item) : initialResources;
    
    if (activeFilter === "free") {
      result = result.filter(res => res.isFree);
    } else if (activeFilter === "oss") {
      result = result.filter(res => res.isOpenSource);
    }
    
    return result;
  }, [query, fuse, initialResources, activeFilter]);

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {title && <h2 className="text-3xl font-bold text-white text-center">{title}</h2>}
        <div className="space-y-6">
          {showSearch && <SearchBar onSearch={setQuery} />}
          
          {/* Advanced Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button 
              onClick={() => setActiveFilter("all")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all text-sm font-bold ${activeFilter === "all" ? "bg-white text-black border-white" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"}`}
            >
              <Filter size={14} /> All Tools
            </button>
            <button 
              onClick={() => setActiveFilter("free")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all text-sm font-bold ${activeFilter === "free" ? "bg-green-500/20 text-green-400 border-green-500/50" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"}`}
            >
              <CheckCircle2 size={14} /> Free Only
            </button>
            <button 
              onClick={() => setActiveFilter("oss")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border transition-all text-sm font-bold ${activeFilter === "oss" ? "bg-blue-500/20 text-blue-400 border-blue-500/50" : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10"}`}
            >
              <Globe size={14} /> Open Source
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((res, index) => (
          <ResourceCard key={index} {...res} />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-2">No tools match your criteria</h2>
          <p className="text-gray-500">Try adjusting your filters or search keywords.</p>
          <button 
            onClick={() => { setQuery(""); setActiveFilter("all"); }}
            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
