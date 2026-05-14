"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Command } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "Search for tools, tags, or categories..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  // Keyboard shortcut (CMD/CTRL + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative group max-w-2xl mx-auto w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
      </div>
      
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 text-white pl-12 pr-12 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-600 shadow-2xl"
      />

      <div className="absolute inset-y-0 right-4 flex items-center gap-2">
        {query ? (
          <button 
            onClick={() => setQuery("")}
            className="p-1 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 px-1.5 py-1 rounded border border-white/10 bg-white/5 text-[10px] font-bold text-gray-500 select-none">
            <Command size={10} /> K
          </div>
        )}
      </div>
    </div>
  );
}
