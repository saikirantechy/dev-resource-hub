import Navbar from "@/components/Navbar";
import { Users, MessageSquare, Trophy, GitFork, ExternalLink, Star, Heart, Zap, Globe, GitPullRequest, Bug } from "lucide-react";
import Link from "next/link";

const contributors = [
  { rank: 1, name: "saikirantechy", avatar: "https://github.com/saikirantechy.png", contributions: 48, stars: 312, role: "Founder", badge: "🏆" },
  { rank: 2, name: "aicoder42", avatar: "https://i.pravatar.cc/150?img=12", contributions: 31, stars: 198, role: "Core Contributor", badge: "🥈" },
  { rank: 3, name: "promptmaster", avatar: "https://i.pravatar.cc/150?img=8", contributions: 24, stars: 145, role: "Prompt Curator", badge: "🥉" },
  { rank: 4, name: "devops_diva", avatar: "https://i.pravatar.cc/150?img=5", contributions: 19, stars: 98, role: "Contributor", badge: "⭐" },
  { rank: 5, name: "react_wizard", avatar: "https://i.pravatar.cc/150?img=16", contributions: 14, stars: 76, role: "Contributor", badge: "⭐" },
  { rank: 6, name: "ml_pioneer", avatar: "https://i.pravatar.cc/150?img=22", contributions: 11, stars: 53, role: "Contributor", badge: "⭐" },
];

const communityLinks = [
  {
    title: "Discord Server",
    description: "Join 2,000+ developers for real-time discussions, Q&A, and AI project collaboration.",
    icon: MessageSquare,
    color: "from-[#5865F2]/20 to-[#5865F2]/5",
    border: "border-[#5865F2]/30",
    iconColor: "text-[#5865F2]",
    href: "#",
    cta: "Join Discord",
    ctaColor: "bg-[#5865F2] hover:bg-[#4752C4]",
    badge: "2,000+ Members",
  },
  {
    title: "GitHub Discussions",
    description: "Propose features, submit bug reports, and collaborate on open-source improvements.",
    icon: GitFork,
    color: "from-white/5 to-white/[0.02]",
    border: "border-white/10",
    iconColor: "text-white",
    href: "https://github.com/saikirantechy/dev-resource-hub/discussions",
    cta: "Open Discussions",
    ctaColor: "bg-white/10 hover:bg-white/20",
    badge: "Open Source",
  },
  {
    title: "X (Twitter)",
    description: "Follow for daily AI tool drops, platform updates, and community highlights.",
    icon: Globe,
    color: "from-blue-400/10 to-blue-400/[0.02]",
    border: "border-blue-400/20",
    iconColor: "text-blue-400",
    href: "#",
    cta: "Follow Us",
    ctaColor: "bg-blue-500/20 hover:bg-blue-500/30",
    badge: "Daily Updates",
  },
];

const openIssues = [
  { title: "Add Ollama integration to AI Finder", type: "Feature", difficulty: "Intermediate", icon: Zap },
  { title: "Fix mobile nav overlay z-index bug", type: "Bug", difficulty: "Beginner", icon: Bug },
  { title: "Add blog full-text MDX rendering", type: "Feature", difficulty: "Advanced", icon: GitPullRequest },
  { title: "Expand tools data with 20 more entries", type: "Content", difficulty: "Beginner", icon: Star },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-20">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-blue">
            <Users size={12} /> Global Ecosystem
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-blue">Join the</span>
            <br />
            <span className="text-white/90">Community</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Connect with AI builders, share workflows, contribute tools, and help shape the future of AI development.
          </p>
        </header>

        {/* Community Channels */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {communityLinks.map((channel) => (
            <div
              key={channel.title}
              className={`group relative p-8 rounded-3xl bg-gradient-to-br ${channel.color} border ${channel.border} card-hover flex flex-col space-y-4`}
            >
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${channel.iconColor} group-hover:scale-110 transition-transform`}>
                <channel.icon size={24} />
              </div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">{channel.title}</h2>
                <span className="badge badge-blue text-[9px]">{channel.badge}</span>
              </div>
              <p className="text-sm text-gray-400 flex-1 leading-relaxed">{channel.description}</p>
              <Link
                href={channel.href}
                className={`flex items-center justify-center gap-2 px-6 py-3 ${channel.ctaColor} text-white font-bold rounded-xl transition-all text-sm`}
              >
                {channel.cta} <ExternalLink size={13} />
              </Link>
            </div>
          ))}
        </section>

        {/* Contributor Leaderboard */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy size={22} className="text-yellow-400" />
              <h2 className="text-2xl font-black">Contributor Leaderboard</h2>
            </div>
            <Link href="/contributors" className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold">
              View Full Leaderboard →
            </Link>
          </div>

          <div className="glass rounded-3xl border border-white/8 overflow-hidden">
            {contributors.map((c, i) => (
              <div
                key={c.name}
                className={`flex items-center gap-4 px-6 py-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors animate-fade-in ${i === 0 ? "bg-yellow-500/[0.04]" : ""}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="text-xl w-8 text-center">{c.badge}</span>
                <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full border border-white/10" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{c.name}</span>
                    <span className="badge badge-blue text-[9px]">{c.role}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{c.contributions} contributions</div>
                </div>
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <Star size={14} fill="currentColor" /> {c.stars}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Open Issues / Ways to Contribute */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart size={20} className="text-pink-400" />
            <h2 className="text-2xl font-black">Ways to Contribute</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {openIssues.map((issue, i) => (
              <Link
                key={i}
                href="https://github.com/saikirantechy/dev-resource-hub/issues"
                target="_blank"
                className="group flex items-start gap-4 p-5 rounded-2xl glass border border-white/8 hover:border-blue-500/30 card-hover transition-all"
              >
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/15 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <issue.icon size={18} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors">{issue.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`badge ${issue.type === "Bug" ? "badge-red" : issue.type === "Feature" ? "badge-blue" : "badge-emerald"} text-[9px]`}>
                      {issue.type}
                    </span>
                    <span className={`badge ${issue.difficulty === "Beginner" ? "badge-emerald" : issue.difficulty === "Advanced" ? "badge-orange" : "badge-purple"} text-[9px]`}>
                      {issue.difficulty}
                    </span>
                  </div>
                </div>
                <ExternalLink size={14} className="text-gray-500 flex-shrink-0 group-hover:text-blue-400 transition-colors mt-0.5" />
              </Link>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="https://github.com/saikirantechy/dev-resource-hub"
              target="_blank"
              className="btn-primary inline-flex"
            >
              <GitFork size={16} /> View All Issues on GitHub
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
