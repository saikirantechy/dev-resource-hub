import Link from "next/link";
import fs from "fs";
import path from "path";
import { 
  Bot, Terminal, Package, Flame, Scale, MonitorPlay, BookOpen, 
  Users, Zap, ArrowRight, Star, Globe, Code2, TrendingUp, Sparkles,
  Trophy, BarChart3, GraduationCap, GitBranch
} from "lucide-react";
import Navbar from "@/components/Navbar";
import NewsletterForm from "@/components/NewsletterForm";

async function getStats() {
  const dataDir = path.join(process.cwd(), "data");
  const files = fs.readdirSync(dataDir);
  let totalResources = 0;

  files.forEach(file => {
    if (file.endsWith(".json")) {
      const content = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
      totalResources += Array.isArray(content) ? content.length : 0;
    }
  });
  return { totalResources };
}

const platformSections = [
  {
    href: "/ai-agents",
    icon: Bot,
    emoji: "🤖",
    title: "AI Agents",
    description: "Explore autonomous agents — from Devin AI to CrewAI. Full cards with GitHub links, docs, and copy-to-clipboard.",
    color: "blue",
    gradient: "from-blue-500/20 to-purple-500/10",
    border: "border-blue-500/20 hover:border-blue-500/40",
    badge: "8 Agents",
  },
  {
    href: "/prompts",
    icon: Terminal,
    emoji: "✨",
    title: "Prompt Library",
    description: "Searchable AI prompt marketplace with copy button, syntax highlighting, categories, and difficulty ratings.",
    color: "purple",
    gradient: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/20 hover:border-purple-500/40",
    badge: "8 Prompts",
  },
  {
    href: "/tools",
    icon: Package,
    emoji: "🛠",
    title: "Tools Hub",
    description: "Curated AI-powered tools across IDEs, UI builders, frameworks, and open-source categories.",
    color: "emerald",
    gradient: "from-emerald-500/20 to-blue-500/10",
    border: "border-emerald-500/20 hover:border-emerald-500/40",
    badge: "10 Tools",
  },
  {
    href: "/trending",
    icon: Flame,
    emoji: "🔥",
    title: "Trending",
    description: "Live rankings with podium top-3, trending scores, most starred and most viewed resources.",
    color: "orange",
    gradient: "from-orange-500/20 to-red-500/10",
    border: "border-orange-500/20 hover:border-orange-500/40",
    badge: "Live Pulse",
  },
  {
    href: "/compare",
    icon: Scale,
    emoji: "⚔️",
    title: "Compare",
    description: "Side-by-side comparison tables for IDEs, UI builders, and agent frameworks with ratings.",
    color: "cyan",
    gradient: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20 hover:border-cyan-500/40",
    badge: "3 Categories",
  },
  {
    href: "/showcase",
    icon: MonitorPlay,
    emoji: "🚀",
    title: "Showcase",
    description: "Community-built AI projects, workflows, and automation systems. Built with Dev Resource Hub.",
    color: "pink",
    gradient: "from-pink-500/20 to-purple-500/10",
    border: "border-pink-500/20 hover:border-pink-500/40",
    badge: "Community",
  },
  {
    href: "/blogs",
    icon: BookOpen,
    emoji: "📰",
    title: "Blog",
    description: "Deep dives: Cursor vs Windsurf, agent frameworks, prompt engineering, and local AI setups.",
    color: "yellow",
    gradient: "from-yellow-500/20 to-orange-500/10",
    border: "border-yellow-500/20 hover:border-yellow-500/40",
    badge: "6 Articles",
  },
  {
    href: "/community",
    icon: Users,
    emoji: "🌍",
    title: "Community",
    description: "Discord, GitFork discussions, contributor leaderboard, open issues, and Hall of Fame.",
    color: "indigo",
    gradient: "from-indigo-500/20 to-blue-500/10",
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    badge: "2k Members",
  },
];

const featuredTools = [
  { name: "Cursor", emoji: "⌨️", desc: "AI-first code editor", href: "https://cursor.sh", tag: "IDE" },
  { name: "v0 by Vercel", emoji: "🎨", desc: "Generative UI", href: "https://v0.dev", tag: "UI" },
  { name: "CrewAI", emoji: "🤖", desc: "Multi-agent framework", href: "https://crewai.com", tag: "Agent" },
  { name: "Ollama", emoji: "🦙", desc: "Run LLMs locally", href: "https://ollama.com", tag: "OSS" },
  { name: "Bolt.new", emoji: "⚡", desc: "Browser-based dev", href: "https://bolt.new", tag: "Builder" },
  { name: "Claude AI", emoji: "🧠", desc: "200K context LLM", href: "https://claude.ai", tag: "LLM" },
];

export default async function Home() {
  const { totalResources } = await getStats();

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      {/* ─── HERO ─── */}
      <section className="relative px-4 sm:px-6 pt-24 pb-20 overflow-hidden">
        {/* Particle orbs */}
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500/8 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-purple-500/6 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/5 blur-3xl" />

        <div className="max-w-6xl mx-auto text-center space-y-8 relative">
          {/* Top badges */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in stagger-1">
            <Link href="/beginner-guide" className="badge badge-blue hover:bg-blue-500/20 transition-all cursor-pointer">
              <GraduationCap size={10} /> Student Path
            </Link>
            <Link href="/ai-finder" className="badge badge-purple hover:bg-purple-500/20 transition-all cursor-pointer">
              <Sparkles size={10} /> AI Finder
            </Link>
            <Link href="/contributors" className="badge badge-orange hover:bg-orange-500/20 transition-all cursor-pointer">
              <Trophy size={10} /> Leaderboard
            </Link>
            <Link href="/webagentcore" className="badge badge-emerald hover:bg-emerald-500/20 transition-all cursor-pointer">
              <Code2 size={10} /> WebAgentCore
            </Link>
          </div>

          {/* Hero Headline */}
          <div className="space-y-4 animate-fade-in stagger-2">
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9]">
              <span className="gradient-text-hero">The Open AI</span>
              <br />
              <span className="text-white">Developer</span>
              <br />
              <span className="gradient-text-blue">Universe</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in stagger-3">
            Discover AI tools, explore autonomous agents, copy battle-tested prompts, and connect with{" "}
            <span className="text-white font-semibold">10,000+ developers</span> building the future.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in stagger-4">
            <Link href="/tools" className="btn-primary text-base px-8 py-4 rounded-2xl">
              <Package size={18} /> Explore Tools <ArrowRight size={16} />
            </Link>
            <Link href="/ai-agents" className="btn-secondary text-base px-8 py-4 rounded-2xl">
              <Bot size={18} /> Browse Agents
            </Link>
            <Link
              href="https://github.com/saikirantechy/dev-resource-hub"
              target="_blank"
              className="btn-secondary text-base px-8 py-4 rounded-2xl"
            >
              <Star size={18} /> Star on GitHub
            </Link>
          </div>

          {/* Terminal Snippet */}
          <div className="max-w-lg mx-auto animate-fade-in stagger-5">
            <div className="terminal text-left text-sm">
              <div className="pt-5 space-y-1">
                <span className="text-gray-500"># Discover. Copy. Build.</span><br />
                <span className="text-purple-400">const</span>
                <span className="text-white"> tools </span>
                <span className="text-gray-500">= </span>
                <span className="text-emerald-400">await</span>
                <span className="text-white"> devresourcehub</span>
                <span className="text-gray-400">.</span>
                <span className="text-blue-400">getAll</span>
                <span className="text-gray-400">();</span><br />
                <span className="text-gray-500">// </span>
                <span className="text-yellow-400">{totalResources}</span>
                <span className="text-gray-500"> curated resources ready 🚀</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Resources", value: `${totalResources}+`, icon: Package, color: "text-blue-400", bg: "bg-blue-500/10" },
              { label: "Contributors", value: "200+", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
              { label: "GitHub Stars", value: "5k+", icon: Star, color: "text-yellow-400", bg: "bg-yellow-500/10" },
              { label: "Open Source", value: "100%", icon: Globe, color: "text-purple-400", bg: "bg-purple-500/10" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="p-6 rounded-3xl glass border border-white/5 flex flex-col items-center text-center space-y-3 card-hover animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                  <stat.icon size={22} className={stat.color} />
                </div>
                <div className="text-4xl font-black">{stat.value}</div>
                <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLATFORM SECTIONS ─── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <div className="badge badge-purple inline-flex"><BarChart3 size={11} /> Platform Pages</div>
            <h2 className="text-4xl md:text-5xl font-black">Everything in One Ecosystem</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">8 specialized platform sections — each a standalone experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {platformSections.map((section, i) => (
              <Link
                key={section.href}
                href={section.href}
                className={`group relative p-6 rounded-3xl bg-gradient-to-br ${section.gradient} border ${section.border} card-hover transition-all duration-300 flex flex-col animate-fade-in`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{section.emoji}</span>
                  <span className="badge badge-blue text-[9px]">{section.badge}</span>
                </div>
                <h3 className="text-xl font-black text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{section.description}</p>
                <div className="mt-4 flex items-center text-blue-400 text-xs font-bold group-hover:translate-x-2 transition-transform">
                  Explore <ArrowRight size={12} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED TOOLS ─── */}
      <section className="py-24 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="badge badge-orange inline-flex mb-3"><Flame size={11} /> Hot Right Now</div>
              <h2 className="text-3xl md:text-4xl font-black">Featured Tools</h2>
            </div>
            <Link href="/trending" className="btn-secondary flex items-center gap-2 text-sm">
              <TrendingUp size={14} /> View Trending
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredTools.map((tool, i) => (
              <Link
                key={tool.name}
                href={tool.href}
                target="_blank"
                className="group p-5 rounded-2xl glass border border-white/8 hover:border-blue-500/30 card-hover text-center flex flex-col items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{tool.emoji}</span>
                <div>
                  <div className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">{tool.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{tool.desc}</div>
                </div>
                <span className="badge badge-blue text-[9px]">{tool.tag}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ROADMAP TEASER ─── */}
      <section className="py-24 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-10 md:p-16 rounded-[2.5rem] glass border border-white/8 overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-emerald-500/5" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <GitBranch size={40} className="mx-auto text-blue-400 animate-float" />
              <h2 className="text-4xl md:text-5xl font-black">
                Phase 2 Coming Soon
              </h2>
              <p className="text-gray-400 text-lg max-w-lg mx-auto">
                AI recommendation engine, stack generator, workflow builder, accounts & bookmarks.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Accounts", "Bookmarks", "AI Recommendations", "Stack Generator", "Workflow Builder", "Supabase DB"].map(f => (
                  <span key={f} className="badge badge-purple">{f}</span>
                ))}
              </div>
              <Link href="/docs" className="btn-primary inline-flex mt-4">
                <BookOpen size={16} /> View Roadmap
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="badge badge-blue inline-flex"><Sparkles size={11} /> Stay Updated</div>
          <h2 className="text-4xl font-black">Join the Ecosystem</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Weekly drops: best AI tools, trending resources, new prompts, and open-source opportunities.
          </p>
          <NewsletterForm />
          <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest">
            Join 2,000+ developers already subscribed
          </p>
        </div>
      </section>
    </div>
  );
}
