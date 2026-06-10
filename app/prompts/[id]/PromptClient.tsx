"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Terminal,
  Copy,
  CheckCircle2,
  Star,
  Eye,
  Share2,
  Bookmark,
  Sparkles,
  ChevronRight,
  Play,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

interface Prompt {
  id: string;
  title: string;
  content: string;
  description?: string;
  category?: string;
  author?: string;
  difficulty?: string;
  tags?: string[];
  useCases?: string[];
  views?: number;
  saves?: number;
  shares?: number;
  likes?: number;
  [key: string]: unknown;
}

export default function PromptClient({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  const formatNum = (n: number | undefined) =>
    n && n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n ?? 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link
            href="/prompts"
            className="hover:text-blue-400 transition-colors"
          >
            Prompts
          </Link>
          <ChevronRight size={16} />
          <span className="text-white">{prompt.title}</span>
        </div>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {prompt.title}
              </h1>
              <p className="text-gray-400">
                Created by{" "}
                <span className="text-blue-400 font-semibold">
                  {prompt.author || "Community"}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <Copy size={18} />
                {copied ? "Copied!" : "Copy"}
              </button>
              <button className="px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors flex items-center justify-center">
                <Bookmark size={18} />
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Eye size={16} />
                <span>Views</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {formatNum(prompt.views)}
              </p>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Star size={16} />
                <span>Saves</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {formatNum(prompt.saves)}
              </p>
            </div>
            <div className="glass rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Share2 size={16} />
                <span>Shares</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {formatNum(prompt.shares)}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-3 mb-12">
          <div className="lg:col-span-2">
            {/* Prompt Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-8 border border-white/10 mb-6"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Terminal size={20} />
                Prompt Content
              </h2>
              <div className="relative">
                <pre className="bg-slate-900/50 rounded-xl p-6 overflow-x-auto text-sm text-gray-300 font-mono leading-relaxed whitespace-pre-wrap">
                  {prompt.content}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  {copied ? (
                    <CheckCircle2 size={18} className="text-green-400" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {(prompt.tags || []).map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-sm text-blue-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">
                Category
              </h3>
              <Link
                href={`/category/${prompt.category}`}
                className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-sm text-purple-300 hover:bg-purple-600/30 transition-colors"
              >
                {prompt.category}
              </Link>
            </motion.div>

            {/* Use Cases */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-3">
                Use Cases
              </h3>
              <ul className="space-y-2">
                {(prompt.useCases || []).map(
                  (useCase: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <Sparkles size={14} className="text-yellow-400" />
                      {useCase}
                    </li>
                  ),
                )}
              </ul>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <button className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                <Play size={18} />
                Try Now
              </button>
              <button className="w-full px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2">
                <Download size={18} />
                Export
              </button>
            </motion.div>
          </div>
        </div>

        {/* Related Prompts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles size={24} />
            Similar Prompts
          </h2>
          <div className="text-gray-400">More prompts coming soon...</div>
        </motion.div>
      </main>
    </div>
  );
}
