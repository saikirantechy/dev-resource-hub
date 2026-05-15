"use client";
import Link from "next/link";
import { useState } from "react";
import { Sparkles, Menu, X, Flame, Bot, Terminal, BarChart3, Scale, Users, BookOpen, Trophy, Zap, Star, Package } from "lucide-react";

const navLinks = [
  { href: "/ai-agents", label: "Agents", icon: Bot, color: "text-blue-400" },
  { href: "/tools", label: "Tools", icon: Package, color: "text-emerald-400" },
  { href: "/prompts", label: "Prompts", icon: Terminal, color: "text-purple-400" },
  { href: "/ai-finder", label: "Finder", icon: Sparkles, color: "text-blue-300" },
  { href: "/learning", label: "Learn", icon: GraduationCap, color: "text-purple-300" },
  { href: "/trending", label: "Trending", icon: Flame, color: "text-orange-400" },
  { href: "/blogs", label: "Blog", icon: BookOpen, color: "text-yellow-400" },
  { href: "/community", label: "Community", icon: Users, color: "text-indigo-400" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 glass-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Dev Resource <span className="gradient-text-blue">Hub</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <link.icon size={13} className={link.color} />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/webagentcore"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all"
            >
              <Sparkles size={11} /> WebAgentCore
            </Link>
            <Link
              href="/submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold hover:opacity-90 hover:scale-105 transition-all"
            >
              <Zap size={13} /> Submit
            </Link>
            <Link
              href="https://github.com/saikirantechy/dev-resource-hub"
              target="_blank"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/8 border border-white/10 text-white text-sm font-semibold hover:bg-white/12 transition-all"
            >
              GitHub
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-72 glass-strong border-l border-white/10 overflow-y-auto">
            <div className="p-6 pt-20 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-all font-medium"
                >
                  <link.icon size={16} className={link.color} />
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 space-y-2">
                <Link href="/webagentcore" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-bold hover:bg-emerald-500/20 transition-all">
                  <Sparkles size={14} /> WebAgentCore
                </Link>
                <Link href="/submit" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-all">
                  <Zap size={14} /> Submit a Tool
                </Link>
                <Link href="https://github.com/saikirantechy/dev-resource-hub" target="_blank" className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all">
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
