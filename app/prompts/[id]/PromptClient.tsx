"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { 
  Terminal, Copy, CheckCircle2, Star, Eye, ArrowLeft, Share2, 
  MessageSquare, Bookmark, Sparkles, ChevronRight, Zap, 
  Play, Download, Code2, Cpu
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function PromptClient({ prompt }: { prompt: any }) {
  const [copied, setCopied] = useState(false);
  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/prompts" className="hover:text-blue-400 transition-colors">Prompts</Link>
            <ChevronRight size={14} />
            <span className="text-gray-300 truncate">{prompt.title}</span>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="flex-1 space-y-8">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-purple">{prompt.category}</span>
                  <span className={`badge ${prompt.difficulty === 'Advanced' ? 'badge-orange' : prompt.difficulty === 'Intermediate' ? 'badge-blue' : 'badge-emerald'}`}>
                    {prompt.difficulty}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                  {prompt.title}
                </h1>
                <p className="text-xl text-gray-400 leading-relaxed max-w-3xl">
                  {prompt.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <UserIcon name={prompt.author} />
                  <span className="text-white font-bold">{prompt.author}</span>
                </div>
                <div className="flex items-center gap-2">
                   <Star size={14} className="text-yellow-500" /> {formatNum(prompt.likes)} likes
                </div>
                <div className="flex items-center gap-2">
                   <Eye size={14} /> {formatNum(prompt.views)} views
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleCopy}
                  className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-2 text-base"
                >
                  {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  {copied ? "Copied!" : "Copy Prompt"}
                </button>
                <button className="btn-secondary px-8 py-4 rounded-2xl flex items-center gap-2 text-base group">
                  <Play size={18} className="text-emerald-400 group-hover:scale-110 transition-transform" /> Try in Playground
                </button>
              </div>
            </div>

            {/* Tags Sidebar */}
            <div className="w-full lg:w-72 space-y-6">
              <div className="p-6 rounded-3xl glass border border-white/8 space-y-6">
                <div className="space-y-4">
                   <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Compatibility</h3>
                   <div className="flex flex-wrap gap-2">
                     <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300">GPT-4o</span>
                     <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300">Claude 3.5</span>
                     <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300">Gemini 1.5</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Tags</h3>
                   <div className="flex flex-wrap gap-2">
                     {prompt.tags.map((tag: string) => (
                       <span key={tag} className="px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                         {tag}
                       </span>
                     ))}
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                   <button className="text-gray-500 hover:text-white transition-colors"><Share2 size={16} /></button>
                   <button className="text-gray-500 hover:text-white transition-colors"><Bookmark size={16} /></button>
                   <button className="text-gray-500 hover:text-white transition-colors"><Download size={16} /></button>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/8 space-y-4">
                <Sparkles size={20} className="text-blue-400" />
                <h4 className="font-bold">Pro Tip</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  For best results, replace the placeholders like <code className="text-blue-300">{"{{ComponentName}}"}</code> with your specific requirements.
                </p>
              </div>
            </div>
          </div>

          {/* Prompt Viewer */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Terminal size={22} className="text-blue-400" /> Prompt Content
              </h2>
              <div className="badge badge-emerald">Ready for copy</div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000" />
              <div className="relative terminal min-h-[300px] p-8 text-lg leading-relaxed text-gray-300 whitespace-pre-wrap group-hover:border-blue-500/30 transition-colors">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    title="Copy Prompt"
                  >
                    {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
                {prompt.content}
              </div>
            </div>
          </section>

          {/* Usage Examples / Suggestions */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl glass border border-white/8 space-y-4">
              <Code2 className="text-purple-400" size={24} />
              <h4 className="font-bold">Best For</h4>
              <p className="text-sm text-gray-500">{prompt.category === 'Cursor Prompts' ? 'AI-first code editors like Cursor and Windsurf.' : 'General LLM chat interfaces.'}</p>
            </div>
            <div className="p-6 rounded-3xl glass border border-white/8 space-y-4">
              <Cpu className="text-emerald-400" size={24} />
              <h4 className="font-bold">Model Context</h4>
              <p className="text-sm text-gray-500">Optimized for models with high reasoning capabilities (200k+ tokens).</p>
            </div>
            <div className="p-6 rounded-3xl glass border border-white/8 space-y-4">
              <Zap className="text-orange-400" size={24} />
              <h4 className="font-bold">Difficulty</h4>
              <p className="text-sm text-gray-500">{prompt.difficulty} level prompt engineering knowledge required.</p>
            </div>
          </section>

          {/* Similar Prompts */}
          <section className="space-y-8 pt-12 border-t border-white/5">
             <h2 className="text-2xl font-black">Similar Prompts</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                <div className="p-6 rounded-2xl glass border border-white/5 text-sm text-gray-500 text-center italic">
                   Coming Soon: Related discovery engine.
                </div>
             </div>
          </section>
        </motion.div>
      </main>
    </div>
  );
}

function UserIcon({ name }: { name: string }) {
  return (
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center overflow-hidden">
      <img src={`https://ui-avatars.com/api/?name=${name}&background=random&color=fff`} className="w-full h-full object-cover" alt={name} />
    </div>
  );
}
