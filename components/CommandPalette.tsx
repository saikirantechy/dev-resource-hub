"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Terminal, 
  Users, 
  PlusCircle, 
  TrendingUp, 
  X,
  Laptop,
  Cpu,
  Settings,
  Globe,
  BrainCircuit,
  BookOpen,
  Bot
} from "lucide-react";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const togglePalette = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePalette]);

  const actions = [
    { name: "Latest Blog Posts", icon: <BookOpen size={18} />, href: "/blogs", shortcut: "B", category: "Content" },
    { name: "AI Resource Finder", icon: <BrainCircuit size={18} />, href: "/ai-finder", shortcut: "AI", category: "Featured" },
    { name: "Prompt Library", icon: <Terminal size={18} />, href: "/prompts", shortcut: "PR", category: "Content" },
    { name: "AI Agent Explorer", icon: <Bot size={18} />, href: "/ai-agents", shortcut: "AG", category: "Featured" },
    { name: "Search Tools", icon: <Search size={18} />, href: "/", shortcut: "S" },
    { name: "Trending Now", icon: <TrendingUp size={18} />, href: "/trending", shortcut: "T" },
    { name: "Contributors", icon: <Users size={18} />, href: "/contributors", shortcut: "C" },
    { name: "Submit Resource", icon: <PlusCircle size={18} />, href: "/submit", shortcut: "P" },
    { name: "AI Tools", icon: <Cpu size={18} />, href: "/category/ai-tools", category: "Category" },
    { name: "Web Development", icon: <Laptop size={18} />, href: "/category/web-dev", category: "Category" },
    { name: "DevOps", icon: <Settings size={18} />, href: "/category/devops", category: "Category" },
    { name: "View on GitHub", icon: <Globe size={18} />, href: "https://github.com/saikirantechy/dev-resource-hub", external: true },
  ];

  const filteredActions = actions.filter(action => 
    action.name.toLowerCase().includes(query.toLowerCase())
  );

  const navigate = (href: string, external?: boolean) => {
    setIsOpen(false);
    setQuery("");
    if (external) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-20">
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" 
        onClick={() => setIsOpen(false)} 
      />
      
      <div className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-white/5">
          <Terminal size={18} className="text-gray-500 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent py-4 text-white outline-none placeholder:text-gray-600 text-sm"
          />
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-600 font-bold px-1.5 py-0.5 rounded border border-white/5 bg-white/5">ESC</span>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} className="text-gray-600 hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
          {filteredActions.length > 0 ? (
            <div className="space-y-1">
              {filteredActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.href, action.external)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-gray-500 group-hover:text-blue-400 transition-colors">
                      {action.icon}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-300 group-hover:text-white">
                        {action.name}
                      </div>
                      {action.category && (
                        <div className="text-[10px] text-gray-600 uppercase font-bold tracking-wider">
                          {action.category}
                        </div>
                      )}
                    </div>
                  </div>
                  {action.shortcut && (
                    <div className="text-[10px] text-gray-600 font-bold px-1.5 py-0.5 rounded border border-white/10 group-hover:border-white/20">
                      {action.shortcut}
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-500 text-sm italic">
              No commands found for "{query}"
            </div>
          )}
        </div>

        <div className="p-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
          <div className="text-[10px] text-gray-600 font-medium">
            Dev Resource Hub Command Palette
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[10px] text-gray-600">
              <span className="p-0.5 px-1 rounded border border-white/10">↑↓</span> to navigate
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-600">
              <span className="p-0.5 px-1 rounded border border-white/10">↵</span> to select
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
