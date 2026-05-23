"use client";

import Link from "next/link";
import { Sparkles, BookOpen, GitFork, Users, MessageCircle, Library, Send } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: [
      { label: "Docs", href: "/docs", icon: BookOpen },
      { label: "Prompt Library", href: "/prompts", icon: Library },
      { label: "GitHub", href: "https://github.com/saikirantechy/dev-resource-hub", icon: GitFork, external: true },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.com", icon: MessageCircle, external: true },
      { label: "Community", href: "/community", icon: Users },
      { label: "Twitter / X", href: "https://x.com", icon: Send, external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030305] pt-16 pb-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/5">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 via-pink-500 to-cyan-500 flex items-center justify-center">
                <Sparkles size={14} className="text-white" />
              </div>
              <div className="leading-tight">
                <div className="text-base font-black tracking-tight">
                  AI Prompt <span className="gradient-text-prompt">Optimizer</span>
                </div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                  by Dev Resource Hub
                </div>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Tighten prompts, save tokens, and ship cleaner AI workflows —
              built for prompt engineers and AI developers.
            </p>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="space-y-4">
              <h4 className="font-black text-sm text-white uppercase tracking-widest">
                {c.title}
              </h4>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      target={l.external ? "_blank" : undefined}
                      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      <l.icon size={13} className="opacity-70" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-600">
            © 2026 Dev Resource Hub · AI Prompt Optimizer
          </div>
          <div className="text-[10px] text-gray-600 uppercase font-black tracking-[0.25em]">
            Open Source · Community-Driven · Built with ⚡
          </div>
        </div>
      </div>
    </footer>
  );
}
