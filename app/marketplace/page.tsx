import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Package, Bot, Terminal, Star, TrendingUp, Zap, ArrowRight, Flame, Filter } from "lucide-react";
import toolsData from "@/data/tools.json";
import agentsData from "@/data/agents.json";
import promptsData from "@/data/prompts.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Developer Marketplace | Dev Resource Hub",
  description: "Browse and discover the best AI tools, autonomous agents, and battle-tested prompts curated by the developer community.",
  keywords: ["AI marketplace", "AI tools", "AI agents", "prompts", "developer tools", "discover AI"],
};

const marketplaceSections = [
  {
    title: "🤖 AI Agents",
    subtitle: "Autonomous coding agents",
    href: "/ai-agents",
    color: "from-blue-500/15 to-purple-500/10",
    border: "border-blue-500/20",
    count: agentsData.length,
    featured: agentsData.slice(0, 3).map(a => a.name),
  },
  {
    title: "🛠 Developer Tools",
    subtitle: "AI-powered toolbox",
    href: "/tools",
    color: "from-emerald-500/15 to-blue-500/10",
    border: "border-emerald-500/20",
    count: toolsData.length,
    featured: toolsData.slice(0, 3).map(t => t.name),
  },
  {
    title: "✨ Prompt Library",
    subtitle: "Copy-ready AI prompts",
    href: "/prompts",
    color: "from-purple-500/15 to-pink-500/10",
    border: "border-purple-500/20",
    count: promptsData.length,
    featured: promptsData.slice(0, 3).map(p => p.title),
  },
];

const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);
const topTools = [...toolsData].sort((a, b) => b.views - a.views).slice(0, 6);

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-orange">
            <Package size={12} /> AI Marketplace
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-fire">Developer</span>
            <br />
            <span className="text-white/90">Marketplace</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Browse, discover, and use the best AI tools, agents, and prompts — all curated by the community.
          </p>
        </header>

        {/* 3 Category Portals */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketplaceSections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`group p-8 rounded-3xl bg-gradient-to-br ${s.color} border ${s.border} card-hover flex flex-col space-y-4`}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-white group-hover:text-blue-300 transition-colors">{s.title}</h2>
                <span className="badge badge-blue">{s.count} items</span>
              </div>
              <p className="text-sm text-gray-400">{s.subtitle}</p>
              <ul className="space-y-1.5">
                {s.featured.map(name => (
                  <li key={name} className="flex items-center gap-2 text-sm text-gray-300">
                    <Star size={10} className="text-yellow-400 flex-shrink-0" />
                    {name}
                  </li>
                ))}
              </ul>
              <div className="flex items-center text-blue-400 text-sm font-bold group-hover:translate-x-2 transition-transform mt-auto pt-2">
                Browse All <ArrowRight size={14} className="ml-1" />
              </div>
            </Link>
          ))}
        </section>

        {/* Trending in Marketplace */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame size={20} className="text-orange-400" />
              <h2 className="text-2xl font-black">Most Popular</h2>
            </div>
            <Link href="/trending" className="text-sm text-blue-400 font-semibold flex items-center gap-1 hover:text-blue-300">
              Full Rankings <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {topTools.map((tool, i) => (
              <Link
                key={tool.id}
                href={tool.url}
                target="_blank"
                className="group p-5 glass rounded-2xl border border-white/8 hover:border-orange-500/30 card-hover flex items-start gap-4 animate-fade-in"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-white/10 flex items-center justify-center text-xl font-black text-orange-400">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white group-hover:text-orange-300 transition-colors">{tool.name}</div>
                  <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">{tool.description}</div>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
                    {tool.stars > 0 && (
                      <span className="flex items-center gap-1"><Star size={10} className="text-yellow-500" /> {formatNum(tool.stars)}</span>
                    )}
                    <span className="badge badge-blue text-[9px]">{tool.category}</span>
                    <span className="ml-auto font-semibold text-emerald-400">{tool.pricing}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Submit CTA */}
        <div className="relative p-12 rounded-[2.5rem] glass border border-white/8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5" />
          <div className="relative z-10 space-y-4">
            <h2 className="text-3xl font-black">List your tool in the marketplace</h2>
            <p className="text-gray-400 max-w-md mx-auto">Submit any AI tool, agent, or prompt to be discovered by thousands of developers.</p>
            <Link href="/submit" className="btn-primary inline-flex">
              <Zap size={16} /> Submit to Marketplace
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
