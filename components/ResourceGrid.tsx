"use client";

import { useState, useMemo } from "react";
import ResourceCard from "./ResourceCard";
import SearchBar from "./SearchBar";
import Fuse from "fuse.js";

interface Resource {
  name: string;
  description: string;
  url: string;
  tags: string[];
  category?: string;
  isTrending?: boolean;
  isFeatured?: boolean;
}

interface ResourceGridProps {
  initialResources: Resource[];
  showSearch?: boolean;
  title?: string;
}

export default function ResourceGrid({ initialResources, showSearch = true, title }: ResourceGridProps) {
  const [query, setQuery] = useState("");

  const fuse = useMemo(() => new Fuse(initialResources, {
    keys: ["name", "description", "tags", "category"],
    threshold: 0.3,
  }), [initialResources]);

  const filteredResources = useMemo(() => {
    if (!query) return initialResources;
    return fuse.search(query).map(result => result.item);
  }, [query, fuse, initialResources]);

  return (
    <div className="space-y-12">
      <div className="space-y-8">
        {title && <h2 className="text-3xl font-bold text-white text-center">{title}</h2>}
        {showSearch && <SearchBar onSearch={setQuery} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map((res, index) => (
          <ResourceCard key={index} {...res} />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-6xl mb-6">🔍</div>
          <h2 className="text-2xl font-bold text-white mb-2">No tools match your search</h2>
          <p className="text-gray-500">Try searching for different keywords or browse our categories.</p>
          <button 
            onClick={() => setQuery("")}
            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg border border-white/10 transition-all"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
