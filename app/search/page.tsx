"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search as SearchIcon,
  X,
  ArrowRight,
  Sparkles,
  Command,
  TrendingUp,
  Zap,
  Loader2,
} from "lucide-react";
import {
  searchFuse,
  searchWithAI,
  groupResultsByType,
  getTrendingResults,
  getTypeIcon,
  getTypeColor,
  getTypeLabel,
  getIndexCount,
  type SearchResult,
  type ResultType,
} from "@/lib/searchEngine";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [usedAI, setUsedAI] = useState(false);
  const [aiIntent, setAiIntent] = useState<string | undefined>();
  const [trending, setTrending] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [activeFilter, setActiveFilter] = useState<ResultType | "all">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTrending(getTrendingResults(12));
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults([]);
      setUsedAI(false);
      setAiIntent(undefined);
      setSelectedIndex(-1);
      return;
    }

    setIsSearching(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const fuseResults = searchFuse(q);
      if (fuseResults.length === 0) {
        setResults([]);
        setUsedAI(false);
        setAiIntent(undefined);
        setIsSearching(false);
        return;
      }

      const aiResult = await searchWithAI(q);
      setResults(aiResult.results);
      setUsedAI(aiResult.usedAI);
      setAiIntent(aiResult.intent);
      setIsSearching(false);
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const groupedResults = useMemo(() => {
    if (activeFilter === "all") return groupResultsByType(results);
    const filtered = results.filter((r) => r.type === activeFilter);
    return groupResultsByType(filtered);
  }, [results, activeFilter]);

  const availableFilters = useMemo(() => {
    const types = new Set(results.map((r) => r.type));
    return Array.from(types).slice(0, 10);
  }, [results]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0 && results[selectedIndex]) {
      e.preventDefault();
      const r = results[selectedIndex];
      router.push(r.href);
    }
  };

  const totalIndexed = useMemo(() => {
    try {
      return getIndexCount();
    } catch {
      return 0;
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050508]">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            <span className="gradient-text-blue">Search</span> Dev Resource Hub
          </h1>
          <p className="text-gray-500 text-sm">
            Search {totalIndexed.toLocaleString()} resources across Tools, Agents, Events, Prompts, and more
          </p>
        </div>

        <div className="relative group mb-8" role="search" aria-label="Search all resources">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            {isSearching ? (
              <Loader2 size={20} className="text-blue-400 animate-spin" />
            ) : usedAI ? (
              <Sparkles size={20} className="text-purple-400" />
            ) : (
              <SearchIcon size={20} className="text-gray-500 group-focus-within:text-blue-400 transition-colors" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search for any tool, agent, prompt, event, or page..."
            aria-label="Search all resources in Dev Resource Hub"
            className="w-full bg-white/[0.03] border border-white/10 text-white pl-12 pr-16 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all placeholder:text-gray-600 text-lg shadow-2xl"
          />

          <div className="absolute inset-y-0 right-4 flex items-center gap-2">
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-all"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-gray-600 select-none px-2 py-1 rounded bg-white/5 border border-white/10">
              <Command size={10} /> K
            </div>
          </div>
        </div>

        {aiIntent && (
          <div className="flex items-center gap-2 mb-6 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs animate-fade-in">
            <Sparkles size={12} />
            <span className="font-semibold">AI Search:</span>
            <span>{aiIntent}</span>
          </div>
        )}

        {availableFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filter by type">
            <button
              onClick={() => setActiveFilter("all")}
              role="tab"
              aria-selected={activeFilter === "all"}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                activeFilter === "all"
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10"
              }`}
            >
              All Results
            </button>
            {availableFilters.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                role="tab"
                aria-selected={activeFilter === type}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeFilter === type
                    ? "bg-white/10 border-white/20 text-white"
                    : "bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>{getTypeIcon(type)}</span>
                <span>{getTypeLabel(type)}</span>
              </button>
            ))}
          </div>
        )}

        {query && !isSearching && groupedResults.length > 0 && (
          <div className="space-y-8">
            {groupedResults.map((group) => (
              <div key={group.type}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{group.icon}</span>
                  <h2 className={`text-sm font-bold uppercase tracking-wider ${group.color}`}>
                    {group.label}
                  </h2>
                  <span className="text-xs text-gray-600">({group.items.length})</span>
                </div>
                <div className="space-y-1" role="listbox" aria-label={`${group.label} results`}>
                  {group.items.map((item) => {
                    const globalIdx = results.indexOf(item);
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        role="option"
                        aria-selected={selectedIndex === globalIdx}
                        onMouseEnter={() => setSelectedIndex(globalIdx)}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all group cursor-pointer ${
                          selectedIndex === globalIdx ? "bg-white/10" : "hover:bg-white/5"
                        }`}
                      >
                        <div className={`p-2 rounded-lg transition-colors ${
                          selectedIndex === globalIdx ? "bg-blue-500/20" : "bg-white/5"
                        }`}>
                          <span className="text-lg">{item.icon || getTypeIcon(item.type)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-semibold transition-colors ${
                              selectedIndex === globalIdx ? "text-white" : "text-gray-300"
                            }`}>
                              {item.name}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full border font-bold uppercase tracking-widest ${getTypeColor(item.type)} border-white/10 bg-white/5`}>
                              {item.type}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {item.stars && item.stars > 0 && (
                            <span className="text-[10px] text-yellow-500 font-bold">
                              {item.stars >= 1000
                                ? (item.stars / 1000).toFixed(1) + "k"
                                : item.stars} stars
                            </span>
                          )}
                          {selectedIndex === globalIdx && (
                            <ArrowRight size={14} className="text-blue-500" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {query && !isSearching && results.length === 0 && (
          <div className="py-20 text-center space-y-4 animate-fade-in">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <SearchIcon size={32} className="text-gray-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">
                No results found in Dev Resource Hub
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We searched all {totalIndexed.toLocaleString()} indexed resources but couldn&apos;t find anything matching &quot;{query}&quot;.
              </p>
              <p className="text-sm text-gray-600">
                Try different keywords, or browse our{" "}
                <Link href="/tools" className="text-blue-400 hover:text-blue-300 underline">
                  Tools
                </Link>
                ,{" "}
                <Link href="/agents" className="text-blue-400 hover:text-blue-300 underline">
                  Agents
                </Link>
                , or{" "}
                <Link href="/events" className="text-blue-400 hover:text-blue-300 underline">
                  Events
                </Link>{" "}
                directories.
              </p>
            </div>
            <button
              onClick={() => setQuery("")}
              className="mt-4 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all text-sm font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}

        {!query && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-red-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                Trending Resources
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {trending.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all group"
                >
                  <span className="text-xl">{item.icon || getTypeIcon(item.type)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors line-clamp-1">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[9px] font-bold ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                      {item.stars && item.stars > 0 && (
                        <span className="text-[9px] text-yellow-500/60">
                          {item.stars >= 1000
                            ? (item.stars / 1000).toFixed(1) + "k"
                            : item.stars} ★
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-center gap-6 text-[10px] text-gray-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="p-1 px-1.5 rounded bg-white/5 border border-white/10 text-gray-400">↑↓</span> Navigate
          </div>
          <div className="flex items-center gap-1.5">
            <span className="p-1 px-1.5 rounded bg-white/5 border border-white/10 text-gray-400">↵</span> Select
          </div>
          <div className="flex items-center gap-1.5">
            <span className="p-1 px-1.5 rounded bg-white/5 border border-white/10 text-gray-400">ESC</span> Clear
          </div>
          <div className="flex items-center gap-1.5">
            <span className="p-1 px-1.5 rounded bg-white/5 border border-white/10 text-gray-400">⌘K</span> Quick Open
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-[10px] text-gray-500 font-medium">
            <Zap size={10} className="text-yellow-500" />
            AI-powered search automatically ranks results by intent when LLM is configured in Settings
          </div>
        </div>
      </div>
    </div>
  );
}
