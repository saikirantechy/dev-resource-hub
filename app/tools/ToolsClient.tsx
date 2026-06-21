"use client";

import { useState, useMemo } from "react";
import toolsData from "@/data/tools.json";
import { Search, Star, Eye, GitFork, BookOpen, Copy, CheckCircle2, Package, Monitor, Globe, Code2, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const TOOL_CATEGORIES = [
  { label: "All", icon: "🌐" },
  { label: "AI IDEs", icon: "⌨️" },
  { label: "AI Coding", icon: "🤖" },
  { label: "AI UI Builders", icon: "🎨" },
  { label: "Agent Frameworks", icon: "🔗" },
  { label: "AI Research", icon: "🔬" },
  { label: "Open Source AI", icon: "🛠" },
  { label: "AI Coding Agents", icon: "🤖" },
];

const CAT_COLORS: Record<string, string> = {
  "AI IDEs": "badge-blue",
  "AI Coding": "badge-purple",
  "AI UI Builders": "badge-pink",
  "Agent Frameworks": "badge-orange",
  "AI Research": "badge-emerald",
  "Open Source AI": "badge-emerald",
};

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showOSS, setShowOSS] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = useMemo(() =>
    toolsData.filter(t => {
      const q = search.toLowerCase();
      const matchesSearch =
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q));
      const matchesCat = activeCategory === "All" || (activeCategory === "AI Coding Agents" ? ["God Tier Tools","Chinese AI Platforms","Big Tech & Cloud Tools","VS Code Extensions","CLI & Terminal Tools","Web Builders","Data Science & Notebook Tools","Next Generation IDEs","Specialized Tools"].includes(t.category) : t.category === activeCategory);
      const matchesOSS = !showOSS || t.isOpenSource;
      return matchesSearch && matchesCat && matchesOSS;
    }), [search, activeCategory, showOSS]);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-14">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-emerald">
            <Package size={12} /> AI Tool Marketplace
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-emerald">Developer</span>
            <br />
            <span className="text-white/90">Tools Hub</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Curated AI-powered tools across every category. From IDE plugins to agent frameworks — the definitive developer toolbox.
          </p>
        </header>

        {/* Category Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {TOOL_CATEGORIES.map(cat => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex flex-col items-center gap-2 p-3 rounded-2xl border text-center transition-all duration-200 ${
                activeCategory === cat.label
                  ? "bg-emerald-500/15 border-emerald-500/40 shadow-lg"
                  : "glass border-white/8 hover:border-white/20"
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                activeCategory === cat.label ? "text-emerald-300" : "text-gray-400"
              }`}>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Search + Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search tools, tags, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full glass border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-emerald-500/50 transition-all placeholder:text-gray-600"
            />
          </div>
          <button
            onClick={() => setShowOSS(!showOSS)}
            className={`flex items-center gap-2 px-5 py-4 rounded-2xl border font-semibold text-sm transition-all ${
              showOSS
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                : "glass border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            <Code2 size={15} /> Open Source Only
          </button>
        </div>

        {/* Count */}
        <div className="text-sm text-gray-500">
          Showing <span className="text-white font-bold">{filtered.length}</span> tools
          {activeCategory !== "All" && <> in <span className="text-emerald-400 font-bold">{activeCategory}</span></>}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((tool, i) => (
            <div
              key={tool.id}
              className="group glass rounded-3xl p-6 card-hover border border-white/5 hover:border-emerald-500/30 animate-fade-in flex flex-col"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Badges */}
              <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                {tool.isFeatured && <span className="badge badge-orange"><Zap size={9} /> Featured</span>}
                {tool.isTrending && <span className="badge badge-blue animate-pulse">🔥 Trending</span>}
                {tool.isOpenSource && <span className="badge badge-emerald"><Code2 size={9} /> OSS</span>}
              </div>

              {/* Tool Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Package size={22} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">{tool.name}</h3>
                  <span className={`badge ${CAT_COLORS[tool.category] || "badge-blue"} text-[9px] mt-1`}>
                    {tool.category}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed flex-1 mb-4">{tool.description}</p>

              {/* Strength */}
              <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">💡 Best For</div>
                <div className="text-xs text-gray-300">{tool.strength}</div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tool.tags.slice(0, 4).map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Platform */}
              <div className="flex items-center gap-1 mb-4">
                <Monitor size={11} className="text-gray-500" />
                <span className="text-xs text-gray-500">{tool.platform.join(" • ")}</span>
                <span className="ml-auto text-xs font-semibold text-emerald-400">{tool.pricing}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                {tool.stars > 0 && (
                  <span className="flex items-center gap-1">
                    <Star size={11} className="text-yellow-500" />
                    {formatNum(tool.stars)}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Eye size={11} className="text-gray-400" />
                  {formatNum(tool.views)}
                </span>
              </div>

              {/* Action Row */}
              <div className="flex gap-2 mt-auto">
                <Link
                  href={tool.url}
                  target="_blank"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all"
                >
                  <Globe size={12} /> Visit
                </Link>
                {tool.github && (
                  <Link
                    href={tool.github}
                    target="_blank"
                    className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-all"
                  >
                    <GitFork size={13} />
                  </Link>
                )}
                {tool.docs && (
                  <Link
                    href={tool.docs}
                    target="_blank"
                    className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-all"
                  >
                    <BookOpen size={13} />
                  </Link>
                )}
                <button
                  onClick={() => handleCopy(tool.id, tool.url)}
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 transition-all"
                >
                  {copiedId === tool.id ? (
                    <CheckCircle2 size={13} className="text-green-400" />
                  ) : (
                    <Copy size={13} />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 space-y-4">
            <div className="text-5xl">🛠</div>
            <p className="text-gray-400 text-xl">No tools found</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); setShowOSS(false); }} className="btn-secondary">
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="relative p-12 rounded-[2.5rem] glass border border-white/8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5" />
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl font-black">Know a tool we&apos;re missing?</h2>
            <p className="text-gray-400 max-w-md mx-auto">The ecosystem grows with community contributions. Add any tool you love.</p>
            <Link href="/submit" className="btn-primary inline-flex">
              <Zap size={16} /> Submit a Tool
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
