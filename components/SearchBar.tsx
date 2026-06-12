"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Command, Sparkles } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onModeChange?: (isSemantic: boolean) => void;
  placeholder?: string;
}

export default function SearchBar({
  onSearch,
  onModeChange,
  placeholder = "Search for tools, tags, or categories...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isSemantic, setIsSemantic] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  const toggleSemantic = () => {
    const next = !isSemantic;
    setIsSemantic(next);
    onModeChange?.(next);
  };

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
    <div className="relative group max-w-2xl mx-auto w-full" role="search" aria-label="Search resources">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        {isSemantic ? (
          <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
        ) : (
          <Search className="h-5 w-5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
        )}
      </div>

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={
          isSemantic ? "Describe what you want to build..." : placeholder
        }
        aria-label={isSemantic ? "Semantic search query" : "Search query"}
        className={cn(
          "w-full bg-white/[0.03] border text-white pl-12 pr-32 py-4 rounded-2xl focus:outline-none transition-all placeholder:text-gray-600 shadow-2xl",
          isSemantic
            ? "border-purple-500/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
            : "border-white/10 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50",
        )}
      />

      <div className="absolute inset-y-0 right-4 flex items-center gap-3">
        <button
          onClick={toggleSemantic}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all",
            isSemantic
              ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
              : "bg-white/5 border-white/10 text-gray-500 hover:text-white",
          )}
          aria-label={isSemantic ? "Switch to classic search" : "Switch to semantic search"}
          aria-pressed={isSemantic}
        >
          {isSemantic ? <Sparkles size={12} /> : <Command size={12} />}
          {isSemantic ? "Semantic" : "Classic"}
        </button>

        <div className="w-px h-4 bg-white/10" />

        {query ? (
          <button
            onClick={() => setQuery("")}
            className="p-1 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-all"
            aria-label="Clear search query"
          >
            <X className="h-4 w-4" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-gray-600 select-none">
            <Command size={10} /> K
          </div>
        )}
      </div>
    </div>
  );
}

function cn(...inputs: (string | false | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}
