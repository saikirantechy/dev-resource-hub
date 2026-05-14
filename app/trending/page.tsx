import fs from "fs";
import path from "path";
import ResourceGrid from "@/components/ResourceGrid";
import { TrendingUp, Flame, Star, Sparkles } from "lucide-react";

async function getAllResources() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);
  let allResources: any[] = [];

  files.forEach(file => {
    if (file.endsWith(".json")) {
      const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
      const categoryName = file.replace(".json", "").replace("-", " ").toUpperCase();
      allResources = [...allResources, ...content.map((res: any) => ({ ...res, category: categoryName }))];
    }
  });

  return allResources;
}

export default async function TrendingPage() {
  const allResources = await getAllResources();
  
  // Sort by name or mock popularity for now
  const trendingResources = allResources
    .slice(0, 9)
    .map((res, i) => ({ 
      ...res, 
      isTrending: i < 5, 
      isFeatured: i >= 5 
    }));

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500 border border-orange-500/20">
              <Flame size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Trending Resources</h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            The most popular tools and platforms in our ecosystem right now. Community favorites and editor's picks.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-400">
              <Star size={14} className="text-yellow-500" /> Top Rated
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-400">
              <Sparkles size={14} className="text-purple-500" /> Recently Added
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-gray-400">
              <TrendingUp size={14} className="text-blue-500" /> Rising Fast
            </div>
          </div>
        </header>

        <ResourceGrid 
          initialResources={trendingResources} 
          showSearch={true} 
          title="Filter Trending Tools" 
        />

        <div className="mt-24 p-12 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
          <h2 className="text-2xl font-bold mb-4">Want to see a tool here?</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            Suggest your favorite resources to the community and help them trend on our leaderboard.
          </p>
          <a 
            href="/submit"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all"
          >
            Submit a Tool
          </a>
        </div>
      </div>
    </main>
  );
}
