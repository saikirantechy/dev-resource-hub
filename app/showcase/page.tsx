import Navbar from "@/components/Navbar";
import showcaseData from "@/data/showcase.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Project Showcase | Dev Resource Hub",
  description: "Explore the best AI projects and workflows built by our community using autonomous agents and modern AI frameworks.",
  keywords: ["AI showcase", "community projects", "AI builders", "AI workflows", "built with AI"],
};
import { MonitorPlay, ExternalLink, GitFork, Star, Zap, Trophy, Users } from "lucide-react";
import Link from "next/link";

const STACK_COLORS: Record<string, string> = {
  "Next.js": "badge-blue",
  "React": "badge-blue",
  "Tailwind": "badge-emerald",
  "Supabase": "badge-emerald",
  "OpenAI": "badge-purple",
  "Python": "badge-orange",
};

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-pink">
            <MonitorPlay size={12} /> Community Builds
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-purple">Project</span>
            <br />
            <span className="text-white/90">Showcase</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover what the community is building with AI tools, agents, and prompts from the Dev Resource Hub ecosystem.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-4">
            {[
              { label: "Projects", value: showcaseData.length + "+", icon: MonitorPlay },
              { label: "Builders", value: "200+", icon: Users },
              { label: "Stars", value: "10k+", icon: Star },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2 text-sm">
                <stat.icon size={14} className="text-pink-400" />
                <span className="font-black text-white text-lg">{stat.value}</span>
                <span className="text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        </header>

        {/* Hall of Fame top row */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Trophy size={20} className="text-yellow-400" />
            <h2 className="text-xl font-black">Hall of Fame</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseData.map((project, i) => (
              <div
                key={project.id}
                className="group glass rounded-3xl border border-white/5 hover:border-pink-500/30 card-hover overflow-hidden flex flex-col animate-fade-in"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent" />
                  {i === 0 && (
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-orange"><Trophy size={9} /> Top Pick</span>
                    </div>
                  )}
                  <Link
                    href={project.url}
                    target="_blank"
                    className="absolute top-3 right-3 p-2 rounded-xl glass border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <ExternalLink size={14} />
                  </Link>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 space-y-4">
                  {/* Builder */}
                  <div className="flex items-center gap-2">
                    <img
                      src={project.builder.avatar}
                      alt={project.builder.name}
                      className="w-7 h-7 rounded-full border border-white/10"
                    />
                    <span className="text-xs text-gray-400">Built by <span className="text-white font-semibold">{project.builder.name}</span></span>
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-pink-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 flex-1">{project.description}</p>

                  {/* Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(tech => (
                      <span key={tech} className={`badge ${STACK_COLORS[tech] || "badge-blue"} text-[9px]`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-1">
                    <Link
                      href={project.url}
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold hover:bg-pink-500/20 transition-all"
                    >
                      <ExternalLink size={12} /> View Project
                    </Link>
                    <button className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-bold hover:bg-white/10 transition-all">
                      <Star size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Submit CTA */}
        <div className="relative p-12 rounded-[2.5rem] glass border border-pink-500/15 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5" />
          <div className="relative z-10 space-y-4">
            <div className="text-4xl animate-float inline-block">🚀</div>
            <h2 className="text-3xl font-black">Built something awesome?</h2>
            <p className="text-gray-400 max-w-md mx-auto">Submit your project to be featured in the showcase and get discovered by 10,000+ developers.</p>
            <Link href="/submit" className="btn-primary inline-flex">
              <Zap size={16} /> Submit Your Project
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
