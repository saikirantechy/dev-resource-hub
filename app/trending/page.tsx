import { Flame, Star, TrendingUp, Sparkles, Eye, Trophy, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";

interface Resource {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  url?: string;
  stars?: number;
  views?: number;
  category?: string;
  pricing?: string;
  _category?: string;
  [key: string]: unknown;
}

interface ScoredResource extends Resource {
  score: number;
  isTrending: boolean;
}

async function getAllResources(): Promise<Resource[]> {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);
  let allResources: Resource[] = [];
  files.forEach((file) => {
    if (
      file.endsWith(".json") &&
      !["prompts.json", "showcase.json", "blogs.json"].includes(file)
    ) {
      const content = JSON.parse(
        fs.readFileSync(path.join(dataDir, file), "utf8"),
      );
      const cat = file.replace(".json", "").replace(/-/g, " ").toUpperCase();
      allResources = [
        ...allResources,
        ...content.map((r: Resource) => ({ ...r, _category: cat })),
      ];
    }
  });
  return allResources;
}

const RANK_COLORS = ["text-yellow-400", "text-gray-300", "text-orange-400"];
const RANK_BG = [
  "bg-yellow-500/10 border-yellow-500/20",
  "bg-gray-500/10 border-gray-500/20",
  "bg-orange-500/10 border-orange-500/20",
];

function generateTrendingScore(resource: Resource, index: number): number {
  const stars = resource.stars || 0;
  const views = resource.views || 0;
  // Use deterministic scoring instead of Math.random()
  const deterministicFactor = (index * 1000) % 10000;
  return stars * 0.4 + views * 0.4 + deterministicFactor * 0.2;
}

export default async function TrendingPage() {
  const allResources = await getAllResources();

  // Generate trending scores
  const scored: ScoredResource[] = allResources
    .map((r, index) => ({
      ...r,
      score: generateTrendingScore(r, index),
      isTrending: true,
    }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const top3 = scored.slice(0, 3);
  const rest = scored.slice(3, 15);

  const formatNum = (n: number) => {
    if (!n) return "–";
    return n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);
  };

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-orange">
            <Flame size={12} /> Live Rankings
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-fire">Trending</span>
            <br />
            <span className="text-white/90">This Week</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The most popular, starred, and talked-about tools in the developer
            ecosystem right now.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center justify-center gap-3 pt-4">
            {[
              { label: "🔥 Most Viewed", active: true },
              { label: "⭐ Most Starred", active: false },
              { label: "✨ Recently Added", active: false },
              { label: "📈 Rising Fast", active: false },
            ].map((tab) => (
              <div
                key={tab.label}
                className={`px-4 py-2 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                  tab.active
                    ? "bg-orange-500/15 border-orange-500/30 text-orange-300"
                    : "glass border-white/10 text-gray-400 hover:text-white"
                }`}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </header>

        {/* Podium - Top 3 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Trophy size={20} className="text-yellow-500" />
            <h2 className="text-2xl font-black">Top 3 This Week</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {top3.map((item, i) => (
              <Link
                key={item.id || item.name}
                href={item.url || "#"}
                target="_blank"
                className={`group relative p-6 rounded-3xl glass border card-hover transition-all ${RANK_BG[i]}`}
              >
                <div
                  className={`absolute top-4 right-4 text-3xl animate-float`}
                  style={{ animationDelay: `${i * 0.5}s` }}
                >
                  {medals[i]}
                </div>
                <div className={`text-5xl font-black mb-3 ${RANK_COLORS[i]}`}>
                  #{i + 1}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                  {item.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {(item.stars ?? 0) > 0 && (
                    <span className="flex items-center gap-1">
                      <Star size={11} className="text-yellow-500" />{" "}
                      {formatNum(item.stars ?? 0)}
                    </span>
                  )}
                  {(item.views ?? 0) > 0 && (
                    <span className="flex items-center gap-1">
                      <Eye size={11} /> {formatNum(item.views ?? 0)}
                    </span>
                  )}
                  <span className="ml-auto flex items-center gap-1 text-blue-400 font-bold">
                    Visit <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Full Rankings Table */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-blue-400" />
            <h2 className="text-2xl font-black">Full Rankings</h2>
          </div>

          <div className="glass rounded-3xl border border-white/8 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-[11px] font-bold uppercase tracking-widest text-gray-500">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-5">Tool</div>
              <div className="col-span-2 hidden md:block">Category</div>
              <div className="col-span-2 text-center hidden md:block">
                Stars
              </div>
              <div className="col-span-2 text-right">Score</div>
            </div>

            {rest.map((item, i) => (
              <Link
                key={item.id || item.name}
                href={item.url || "#"}
                target="_blank"
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors group items-center animate-fade-in"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="col-span-1 text-center">
                  <span
                    className={`text-lg font-black ${i < 3 ? "text-orange-400" : "text-gray-500"}`}
                  >
                    #{i + 4}
                  </span>
                </div>
                <div className="col-span-5">
                  <div className="font-bold text-white group-hover:text-blue-300 transition-colors">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                    {item.description}
                  </div>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="badge badge-blue text-[9px]">
                    {(item._category || "").split(" ")[0]}
                  </span>
                </div>
                <div className="col-span-2 text-center hidden md:block">
                  {(item.stars ?? 0) > 0 ? (
                    <span className="flex items-center justify-center gap-1 text-xs text-gray-400">
                      <Star size={11} className="text-yellow-500" />
                      {formatNum(item.stars ?? 0)}
                    </span>
                  ) : (
                    <span className="text-gray-600 text-xs">–</span>
                  )}
                </div>
                <div className="col-span-2 text-right">
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <Flame size={10} className="text-orange-400" />
                    <span className="text-xs font-bold text-orange-400">
                      {Math.floor(item.score / 1000)}k
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Submit CTA */}
        <div className="relative p-12 rounded-[2.5rem] overflow-hidden text-center glass border border-white/8">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5" />
          <div className="relative z-10 space-y-4">
            <Sparkles
              size={32}
              className="mx-auto text-orange-400 animate-float"
            />
            <h2 className="text-3xl font-black">
              Want your tool in the rankings?
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              Submit your favorite tools and let the community upvote them to
              the top.
            </p>
            <Link href="/submit" className="btn-primary inline-flex">
              <Zap size={16} /> Submit a Tool
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}




