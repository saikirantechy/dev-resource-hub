"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sparkles, Menu, X, Bot, Terminal, Star, Trophy,
  Users, BookOpen, Zap, Package, Bookmark,
  LogIn, LogOut, Layers, Layout,
  Gauge, ArrowLeftRight, ShoppingCart, Flame,
  Map, BarChart3, Building2, GitBranch, Wrench,
  Shield, Cpu, Globe, GraduationCap, Heart, Calendar,
  Siren, MessageSquare, Workflow, Compass, ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useBookmarks } from "@/context/BookmarkContext";
import ThemeToggle from "@/components/ThemeToggle";

const navGroups = [
  {
    label: "Core",
    links: [
      { href: "/dashboard", label: "Dashboard", icon: Layout, color: "text-cyan-400" },
      { href: "/tools", label: "Tools", icon: Package, color: "text-emerald-400" },
      { href: "/agents", label: "Agents", icon: Bot, color: "text-blue-400" },
      { href: "/ai-agents", label: "AI Agents", icon: MessageSquare, color: "text-cyan-400" },
      { href: "/prompts", label: "Prompts", icon: Terminal, color: "text-purple-400" },
      { href: "/workflow", label: "Workflows", icon: Layers, color: "text-sky-400" },
    ],
  },
  {
    label: "Build",
    links: [
      { href: "/architecture", label: "Architecture", icon: Building2, color: "text-indigo-400" },
      { href: "/benchmarks", label: "Benchmarks", icon: BarChart3, color: "text-orange-400" },
      { href: "/compare", label: "Compare", icon: ArrowLeftRight, color: "text-green-400" },
      { href: "/prompt-optimizer", label: "Optimizer", icon: Gauge, color: "text-orange-400" },
      { href: "/prompt-to-prd", label: "Prompt → PRD", icon: GitBranch, color: "text-rose-400" },
    ],
  },
  {
    label: "Automate",
    links: [
      { href: "/agent-hooks", label: "Agent Hooks", icon: Workflow, color: "text-teal-400" },
      { href: "/automation", label: "Automation", icon: Cpu, color: "text-violet-400" },
      { href: "/tasks", label: "Tasks", icon: Wrench, color: "text-amber-400" },
      { href: "/errors", label: "Error Diag", icon: Siren, color: "text-red-400" },
      { href: "/git-assistant", label: "Git AI", icon: GitBranch, color: "text-gray-300" },
    ],
  },
  {
    label: "Discover",
    links: [
      { href: "/trending", label: "Trending", icon: Flame, color: "text-red-400" },
      { href: "/marketplace", label: "Marketplace", icon: ShoppingCart, color: "text-pink-400" },
      { href: "/showcase", label: "Showcase", icon: Star, color: "text-yellow-400" },
      { href: "/map", label: "Dev Map", icon: Map, color: "text-emerald-400" },
      { href: "/events", label: "Events", icon: Calendar, color: "text-pink-400" },
      { href: "/blogs", label: "Blog", icon: BookOpen, color: "text-yellow-400" },
    ],
  },
  {
    label: "Trust",
    links: [
      { href: "/security-center", label: "Security Center", icon: Shield, color: "text-red-400" },
      { href: "/security-dashboard", label: "Security Dashboard", icon: ShieldAlert, color: "text-orange-400" },
    ],
  },
  {
    label: "Community",
    links: [
      { href: "/community", label: "Community", icon: Users, color: "text-indigo-400" },
      { href: "/leaderboard", label: "Leaderboard", icon: Trophy, color: "text-amber-400" },
      { href: "/roadmap", label: "Roadmap", icon: Compass, color: "text-blue-400" },
      { href: "/careers", label: "Careers", icon: GraduationCap, color: "text-cyan-400" },
    ],
  },
];

const allNavLinks = navGroups.flatMap((g) => g.links);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const { bookmarks } = useBookmarks();
  const pathname = usePathname();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 glass-dark" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight hidden sm:inline">
              Dev Resource <span className="gradient-text-blue">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden xl:flex items-center gap-0.5 overflow-x-auto scrollbar-hide">
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200 whitespace-nowrap"
                aria-current={pathname.startsWith(link.href) ? "page" : undefined}
              >
                <link.icon size={12} className={link.color} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />

            <Link
              href="/webagentcore"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold hover:bg-emerald-500/20 transition-all whitespace-nowrap"
            >
              <Sparkles size={10} /> WebAgentCore
            </Link>
            <Link
              href="/submit"
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white/8 border border-white/10 text-white text-xs font-semibold hover:bg-white/12 transition-all whitespace-nowrap"
            >
              <Zap size={12} /> Submit
            </Link>

            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                 <Link
                   href="/saved"
                   className="relative flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-white/10 text-[11px] font-bold text-gray-400 hover:text-white hover:border-white/25 transition-all whitespace-nowrap"
                   aria-label={`View saved resources (${bookmarks.length})`}
                 >
                   <Bookmark size={11} />
                   <span>{bookmarks.length}</span>
                 </Link>
                 <div className="w-7 h-7 rounded-full border border-white/10 overflow-hidden">
                   <img src={user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${user.email?.charAt(0) || 'U'}&background=random`} alt={user.email ? `Avatar of ${user.email}` : "User avatar"} className="w-full h-full object-cover" />
                 </div>
                 <button onClick={signOut} className="p-1.5 rounded-lg hover:bg-white/5 text-gray-500 hover:text-red-400 transition-all" title="Sign Out" aria-label="Sign out of your account">
                    <LogOut size={14} />
                 </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold hover:opacity-90 hover:scale-105 transition-all whitespace-nowrap"
              >
                <LogIn size={12} /> Login
              </Link>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 top-0 h-full w-80 glass-strong border-l border-white/10 overflow-y-auto">
            <div className="p-6 pt-20 space-y-6">
              {navGroups.map((group) => (
                <div key={group.label}>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 mb-2 px-4">
                    {group.label}
                  </div>
                  <div className="space-y-0.5" role="list">
                    {group.links.map((link) => (
                      <div key={link.href} role="listitem">
                        <Link
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all font-medium text-sm"
                          aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                        >
                          <link.icon size={16} className={link.color} />
                          {link.label}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-white/5 space-y-2">
                <div className="px-4 py-2">
                  <ThemeToggle />
                </div>
                <Link href="/saved" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold hover:bg-blue-500/20 transition-all text-sm">
                  <Bookmark size={14} /> Saved ({bookmarks.length})
                </Link>
                <Link href="/submit" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-all text-sm">
                  <Zap size={14} /> Submit a Tool
                </Link>
                {user ? (
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-red-400 font-semibold hover:bg-red-500/10 transition-all text-sm">
                    <LogOut size={14} /> Sign Out
                  </button>
                ) : (
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all text-sm">
                    <LogIn size={14} /> Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
