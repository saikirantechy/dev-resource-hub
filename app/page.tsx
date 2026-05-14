import Link from "next/link";
import fs from "fs";
import path from "path";
import ResourceGrid from "@/components/ResourceGrid";
import { Users, LayoutGrid, Zap, Globe, Trophy, Sparkles } from "lucide-react";

const categories = [
  {
    name: "AI Tools",
    slug: "ai-tools",
    icon: "🤖",
    description: "AI assistants, LLMs, and research tools."
  },
  {
    name: "Web Development",
    slug: "web-dev",
    icon: "💻",
    description: "Frontend frameworks and UI libraries."
  },
  {
    name: "DevOps",
    slug: "devops",
    icon: "⚙️",
    description: "Containerization, CI/CD, and infrastructure."
  },
  {
    name: "Design Tools",
    slug: "design-tools",
    icon: "🎨",
    description: "Essential tools for UI/UX and designers."
  },
  {
    name: "Learning",
    slug: "learning-resources",
    icon: "📚",
    description: "Free and high-quality platforms to learn."
  },
  {
    name: "Productivity",
    slug: "productivity-tools",
    icon: "🚀",
    description: "Tools to help you stay organized."
  }
];

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

export default async function Home() {
  const allResources = await getAllResources();
  const trendingResources = allResources.slice(0, 3).map(res => ({ ...res, isTrending: true }));

  return (
    <main className="flex-1 bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent blur-3xl -z-10" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="flex justify-center gap-4 animate-fade-in">
            <Link 
              href="/ai-finder"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles size={12} /> AI Finder
            </Link>
            <Link 
              href="/contributors"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-wider"
            >
              <Trophy size={12} /> View Leaderboard
            </Link>
            <Link 
              href="/submit"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider"
            >
              <Zap size={12} /> Suggest Tool
            </Link>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Developer Ecosystem <br /> for the Modern Era 🚀
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The world's most comprehensive community-curated hub for developers. Discover tools, contribute resources, and build your profile.
          </p>

          <div className="pt-8">
            <ResourceGrid initialResources={allResources} title="Instant Resource Search" />
          </div>
        </div>
      </section>

      {/* Stats Section (NEW) */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 mb-2">
                <LayoutGrid size={24} />
              </div>
              <div className="text-4xl font-black">{allResources.length}+</div>
              <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">Resources</div>
            </div>
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-2xl bg-green-500/10 text-green-400 mb-2">
                <Users size={24} />
              </div>
              <div className="text-4xl font-black">20+</div>
              <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">Contributors</div>
            </div>
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex flex-col items-center text-center space-y-2">
              <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 mb-2">
                <Globe size={24} />
              </div>
              <div className="text-4xl font-black">100%</div>
              <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">Open Source</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Explore Categories</h2>
            <p className="text-gray-500">Hand-picked tools across various domains.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link 
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{cat.description}</p>
              <div className="mt-6 flex items-center text-blue-400 font-medium group-hover:translate-x-2 transition-transform">
                Explore Category →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section className="border-t border-white/5 bg-white/[0.02] py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20">
              🔥
            </div>
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <div className="ml-2 px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-black uppercase animate-pulse">
              Pulse Live
            </div>
          </div>
          
          <ResourceGrid initialResources={trendingResources} showSearch={false} />
          
          <div className="mt-12 text-center">
            <Link href="/trending" className="text-gray-500 hover:text-white transition-all">
              View all trending resources →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
