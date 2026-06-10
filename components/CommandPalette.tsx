"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import {
  Terminal,
  Users,
  PlusCircle,
  TrendingUp,
  X,
  MonitorPlay,
  Zap,
  ArrowRight,
  BrainCircuit,
  BookOpen,
  Bot,
  Scale,
  Cpu,
  Globe,
  Search as SearchIcon,
} from "lucide-react";

// Import data
import agentsData from "@/data/agents.json";
import toolsData from "@/data/tools.json";
import promptsData from "@/data/prompts.json";
import { BlogPost } from "@/lib/blogs";

type SearchItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  href: string;
  type: "action" | "agent" | "tool" | "prompt" | "blog";
  icon?: React.ReactNode;
  shortcut?: string;
};

export default function CommandPalette({
  initialBlogs = [],
}: {
  initialBlogs?: BlogPost[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const actions: SearchItem[] = [
    {
      id: "a1",
      name: "Latest Blog Posts",
      description: "Read the latest AI insights",
      icon: <BookOpen size={18} />,
      href: "/blogs",
      shortcut: "B",
      category: "Content",
      type: "action",
    },
    {
      id: "a2",
      name: "AI Resource Finder",
      description: "Discover tools based on your stack",
      icon: <BrainCircuit size={18} />,
      href: "/ai-finder",
      shortcut: "AI",
      category: "Featured",
      type: "action",
    },
    {
      id: "a3",
      name: "Prompt Library",
      description: "Master prompt engineering",
      icon: <Terminal size={18} />,
      href: "/prompts",
      shortcut: "PR",
      category: "Content",
      type: "action",
    },
    {
      id: "a4",
      name: "AI Agent Explorer",
      description: "Explore autonomous builders",
      icon: <Bot size={18} />,
      href: "/ai-agents",
      shortcut: "AG",
      category: "Featured",
      type: "action",
    },
    {
      id: "a5",
      name: "Compare AI Tools",
      description: "Side-by-side technical breakdowns",
      icon: <Scale size={18} />,
      href: "/compare",
      shortcut: "VS",
      category: "Featured",
      type: "action",
    },
    {
      id: "a6",
      name: "Project Showcase",
      description: "Community built projects",
      icon: <MonitorPlay size={18} />,
      href: "/showcase",
      shortcut: "SH",
      category: "Community",
      type: "action",
    },
    {
      id: "a7",
      name: "Community Hub",
      description: "Connect with builders",
      icon: <Users size={18} />,
      href: "/community",
      shortcut: "CM",
      category: "Community",
      type: "action",
    },
    {
      id: "a8",
      name: "Trending Now",
      description: "Hottest resources this week",
      icon: <TrendingUp size={18} />,
      href: "/trending",
      shortcut: "T",
      type: "action",
      category: "Discovery",
    },
    {
      id: "a9",
      name: "Submit Resource",
      description: "Add to the ecosystem",
      icon: <PlusCircle size={18} />,
      href: "/submit",
      shortcut: "P",
      type: "action",
      category: "Community",
    },
    {
      id: "a10",
      name: "View on GitHub",
      description: "Open source platform",
      icon: <Globe size={18} />,
      href: "https://github.com/saikirantechy/dev-resource-hub",
      type: "action",
      category: "Platform",
    },
  ];

  const searchIndex = useMemo(() => {
    const agents = agentsData.map((item: (typeof agentsData)[0]) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      href: `/ai-agents?id=${item.id}`,
      type: "agent" as const,
      icon: <Bot size={18} className="text-emerald-400" />,
    }));

    const tools = toolsData.map((item: (typeof toolsData)[0]) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      href: `/tools?id=${item.id}`,
      type: "tool" as const,
      icon: <Cpu size={18} className="text-blue-400" />,
    }));

    const prompts = promptsData.map((item: (typeof promptsData)[0]) => ({
      id: item.id,
      name: item.title,
      description: item.description,
      category: item.category,
      href: `/prompts?id=${item.id}`,
      type: "prompt" as const,
      icon: <Terminal size={18} className="text-purple-400" />,
    }));

    const blogs = initialBlogs.map((item) => ({
      id: item.slug,
      name: item.title,
      description: item.excerpt,
      category: item.category,
      href: `/blog/${item.slug}`,
      type: "blog" as const,
      icon: <BookOpen size={18} className="text-orange-400" />,
    }));

    return [
      ...actions,
      ...agents,
      ...tools,
      ...prompts,
      ...blogs,
    ] as SearchItem[];
  }, [actions, initialBlogs]);

  const fuse = useMemo(
    () =>
      new Fuse(searchIndex, {
        keys: ["name", "description", "category"],
        threshold: 0.3,
        distance: 100,
      }),
    [searchIndex],
  );

  const results = useMemo(() => {
    if (!query) return actions;
    return fuse.search(query).map((r) => r.item);
  }, [fuse, query, actions]);

  const navigate = (href: string, external?: boolean) => {
    setIsOpen(false);
    setQuery("");
    if (external) {
      window.open(href, "_blank");
    } else {
      router.push(href);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
      if (isOpen) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % (results.length || 1));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex(
            (prev) =>
              (prev - 1 + (results.length || 1)) % (results.length || 1),
          );
        }
        if (e.key === "Enter") {
          e.preventDefault();
          if (results[selectedIndex]) {
            navigate(
              results[selectedIndex].href,
              results[selectedIndex].href.startsWith("http"),
            );
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#0a0a0c] border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center px-4 border-b border-white/5 bg-white/[0.02]">
          <SearchIcon size={20} className="text-gray-500 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search agents, prompts, tools, or commands... (Cmd + K)"
            className="flex-1 bg-transparent py-5 text-white outline-none placeholder:text-gray-600 text-base font-medium"
          />
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 font-bold px-2 py-1 rounded border border-white/10 bg-black/50">
              ESC
            </span>
            <button onClick={() => setIsOpen(false)}>
              <X
                size={20}
                className="text-gray-500 hover:text-white transition-colors"
              />
            </button>
          </div>
        </div>

        <div className="max-h-[450px] overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item, index) => (
                <button
                  key={item.id + index}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() =>
                    navigate(item.href, item.href.startsWith("http"))
                  }
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all group ${
                    selectedIndex === index ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-lg transition-colors ${
                        selectedIndex === index
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-white/5 text-gray-500"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold transition-colors ${
                            selectedIndex === index
                              ? "text-white"
                              : "text-gray-300"
                          }`}
                        >
                          {item.name}
                        </span>
                        {item.type !== "action" && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-500 font-bold uppercase tracking-widest">
                            {item.type}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {item.category && (
                      <span className="hidden sm:inline-block text-[9px] text-gray-600 uppercase font-bold tracking-widest">
                        {item.category}
                      </span>
                    )}
                    {item.shortcut ? (
                      <div className="text-[10px] text-gray-500 font-bold px-2 py-1 rounded border border-white/10 bg-black/50 group-hover:border-white/20">
                        {item.shortcut}
                      </div>
                    ) : (
                      selectedIndex === index && (
                        <ArrowRight size={14} className="text-blue-500" />
                      )
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                <SearchIcon size={24} className="text-gray-600" />
              </div>
              <div className="space-y-1">
                <p className="text-gray-300 font-medium">
                  No results found for &quot;{query}&quot;
                </p>
                <p className="text-xs text-gray-600">
                  Try searching for &quot;Cursor&quot;, &quot;Agents&quot;, or
                  &quot;Prompts&quot;
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-600 font-bold uppercase tracking-wider">
              <Zap size={10} className="text-yellow-500" />
              Universal Search
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-gray-600 font-medium">
              <span className="p-1 px-1.5 rounded bg-white/5 border border-white/10 text-gray-400">
                ↑↓
              </span>{" "}
              Navigate
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-600 font-medium">
              <span className="p-1 px-1.5 rounded bg-white/5 border border-white/10 text-gray-400">
                ↵
              </span>{" "}
              Select
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-600 font-medium">
              <span className="p-1 px-1.5 rounded bg-white/5 border border-white/10 text-gray-400">
                ESC
              </span>{" "}
              Close
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
