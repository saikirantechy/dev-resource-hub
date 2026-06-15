import Link from "next/link";
import { Sparkles, GitFork, Heart } from "lucide-react";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "AI Agents", href: "/ai-agents" },
      { label: "Tools Hub", href: "/tools" },
      { label: "Prompt Library", href: "/prompts" },
      { label: "Marketplace", href: "/marketplace" },
      { label: "Trending", href: "/trending" },
    ]
  },
  {
    title: "Explore",
    links: [
      { label: "DevRank AI", href: "/devrank" },
      { label: "DSA Arena", href: "/dsa" },
      { label: "Compare Tools", href: "/compare" },
      { label: "Showcase", href: "/showcase" },
      { label: "Blog", href: "/blogs" },
      { label: "AI Finder", href: "/ai-finder" },
      { label: "WebAgentCore", href: "/webagentcore" },
    ]
  },
  {
    title: "Open Source",
    links: [
      { label: "OS Hub", href: "/open-source" },
      { label: "Issues Explorer", href: "/issues" },
      { label: "Repositories", href: "/repositories" },
      { label: "GSoC Hub", href: "/gsoc" },
      { label: "Hacktoberfest", href: "/hacktoberfest" },
      { label: "Bounties", href: "/bounties" },
      { label: "AI Coach", href: "/ai-contribution-coach" },
      { label: "Leaderboard", href: "/leaderboard" },
    ]
  },
  {
    title: "Community",
    links: [
      { label: "Community Hub", href: "/community" },
      { label: "Contributors", href: "/contributors" },
      { label: "Submit a Tool", href: "/submit" },
      { label: "Docs & Roadmap", href: "/docs" },
      { label: "GitHub", href: "https://github.com/saikirantechy/dev-resource-hub" },
    ]
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050508] pt-16 pb-8 px-4 sm:px-6" aria-label="Footer" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-white/5">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Dev Resource <span className="gradient-text-blue">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              The Open AI Developer Universe. Discover tools, explore agents, copy prompts, and build the future.
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <Heart size={11} className="text-pink-500 fill-pink-500" /> Open Source
              </span>
              <span>•</span>
              <span>100% Free</span>
              <span>•</span>
              <span>Community-Driven</span>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map(section => (
            <div key={section.title} className="space-y-4" aria-labelledby={`footer-heading-${section.title.toLowerCase()}`}>
              <h4 id={`footer-heading-${section.title.toLowerCase()}`} className="font-black text-sm text-white uppercase tracking-widest">{section.title}</h4>
              <ul className="space-y-2.5" role="list">
                {section.links.map(link => (
                  <li key={link.label} role="listitem">
                    <Link
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                      aria-label={link.href.startsWith("http") ? `${link.label} (opens in new tab)` : link.label}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-600">
            © 2026 Dev Resource Hub. Built by the community, for the community. 🚀
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/saikirantechy/dev-resource-hub"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
            >
              <GitFork size={13} /> GitHub
            </Link>
            <Link href="/docs" className="text-xs text-gray-500 hover:text-white transition-colors">
              Roadmap
            </Link>
            <Link href="/community" className="text-xs text-gray-500 hover:text-white transition-colors">
              Community
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
