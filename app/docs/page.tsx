import Navbar from "@/components/Navbar";
import { BookOpen, GitBranch, Zap, CheckCircle2, Circle, Clock, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

const roadmap = [
  {
    phase: "Phase 1",
    title: "Platform Foundation",
    status: "complete",
    emoji: "✅",
    items: [
      { label: "AI Agents Explorer", done: true },
      { label: "Prompt Marketplace", done: true },
      { label: "Tools Hub", done: true },
      { label: "Trending Rankings", done: true },
      { label: "Compare Tables", done: true },
      { label: "Blog", done: true },
      { label: "Showcase", done: true },
      { label: "Community Page", done: true },
      { label: "Premium Design System", done: true },
    ]
  },
  {
    phase: "Phase 2",
    title: "Universal Search & Discovery",
    status: "in-progress",
    emoji: "🔧",
    items: [
      { label: "Universal Command Palette (Fuse.js)", done: true },
      { label: "Cross-resource instant search", done: true },
      { label: "AI Stack Finder (Recommendation Engine)", done: true },
      { label: "Blog detail page rendering", done: true },
      { label: "Prompt full-text viewer", done: false },
      { label: "Favorites / Bookmark system", done: false },
    ]
  },
  {
    phase: "Phase 3",
    title: "Community & Intelligence",
    status: "complete",
    emoji: "🧠",
    items: [
      { label: "AI Recommendation Engine", done: true },
      { label: "Contributor leaderboard UI", done: true },
      { label: "User accounts (Supabase)", done: true },
      { label: "Community votes / likes (Supabase)", done: true },
      { label: "Real-time analytics integration", done: true },
    ]
  },
  {
    phase: "Phase 4",
    title: "Platform Scale",
    status: "complete",
    emoji: "🚀",
    items: [
      { label: "Visual AI Workflow Builder", done: true },
      { label: "Semantic AI Search (Embeddings)", done: true },
      { label: "API marketplace integration", done: true },
      { label: "GitHub trending automation", done: true },
      { label: "Vercel Analytics & Performance", done: true },
    ]
  }
];

const STATUS_STYLES: Record<string, { badge: string; ring: string }> = {
  complete: { badge: "badge-emerald", ring: "border-emerald-500/30 bg-emerald-500/5" },
  "in-progress": { badge: "badge-orange", ring: "border-orange-500/30 bg-orange-500/5" },
  planned: { badge: "badge-blue", ring: "border-white/10 bg-white/[0.02]" },
};

const techStack = [
  { name: "Next.js 16", desc: "App Router, RSC, SSG", emoji: "▲" },
  { name: "Tailwind CSS v4", desc: "Utility-first styling", emoji: "🎨" },
  { name: "TypeScript 5", desc: "Strict typed React", emoji: "📘" },
  { name: "Fuse.js", desc: "Fuzzy universal search", emoji: "🔍" },
  { name: "Lucide React", desc: "Icon system", emoji: "✦" },
  { name: "JSON Data Layer", desc: "Flat file database", emoji: "📁" },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-20 space-y-20">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-blue">
            <BookOpen size={12} /> Documentation
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-blue">Platform</span>
            <br />
            <span className="text-white/90">Docs</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Roadmap, architecture, contributing guide, and tech stack for the Open AI Developer Universe.
          </p>
        </header>

        {/* Tech Stack */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-3">
            <Zap size={22} className="text-yellow-400" /> Tech Stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {techStack.map(tech => (
              <div key={tech.name} className="p-5 glass rounded-2xl border border-white/8 card-hover flex items-center gap-4">
                <span className="text-2xl">{tech.emoji}</span>
                <div>
                  <div className="font-bold text-white">{tech.name}</div>
                  <div className="text-xs text-gray-500">{tech.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Roadmap */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black flex items-center gap-3">
            <GitBranch size={22} className="text-blue-400" /> Platform Roadmap
          </h2>

          <div className="space-y-6">
            {roadmap.map((phase, i) => {
              const styles = STATUS_STYLES[phase.status];
              return (
                <div
                  key={phase.phase}
                  className={`p-6 md:p-8 rounded-3xl border ${styles.ring} animate-fade-in`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{phase.emoji}</span>
                      <div>
                        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{phase.phase}</div>
                        <h3 className="text-xl font-black text-white">{phase.title}</h3>
                      </div>
                    </div>
                    <span className={`badge ${styles.badge}`}>
                      {phase.status === "complete" ? "Complete" : phase.status === "in-progress" ? "In Progress" : "Planned"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.items.map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        {item.done ? (
                          <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                        ) : (
                          <Circle size={16} className="text-gray-600 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${item.done ? "text-gray-300" : "text-gray-500"}`}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contribute CTA */}
        <div className="relative p-12 rounded-[2.5rem] glass border border-white/8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
          <div className="relative z-10 space-y-4">
            <Rocket size={32} className="mx-auto text-blue-400 animate-float" />
            <h2 className="text-3xl font-black">Want to contribute?</h2>
            <p className="text-gray-400 max-w-md mx-auto">This is an open-source project. PRs, bug reports, and tool submissions are welcome.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="https://github.com/saikirantechy/dev-resource-hub" target="_blank" className="btn-primary inline-flex">
                View GitHub
              </Link>
              <Link href="/submit" className="btn-secondary inline-flex">
                <Zap size={16} /> Submit Tool <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
