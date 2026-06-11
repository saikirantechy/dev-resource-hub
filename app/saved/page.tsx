"use client";

import Navbar from "@/components/Navbar";
import { useBookmarks } from "@/context/BookmarkContext";
import { Bookmark, Trash2, ExternalLink, ArrowRight, Zap, Bot, Terminal, Package } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const ICON_MAP = {
  agent: Bot,
  tool: Package,
  prompt: Terminal,
};

const COLOR_MAP = {
  agent: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  tool: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  prompt: "text-purple-400 bg-purple-500/10 border-purple-500/20",
};

export default function SavedPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main id="main-content" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 space-y-16">
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-blue">
            <Bookmark size={12} /> My Collections
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Saved <span className="gradient-text-blue">Resources</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
            Your personalized library of AI tools, agents, and prompts. Synced to your local browser.
          </p>
        </header>

        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {bookmarks.map((item, i) => {
                const Icon = ICON_MAP[item.type];
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="group relative glass rounded-3xl p-6 border border-white/5 hover:border-blue-500/30 card-hover flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-xl border ${COLOR_MAP[item.type]} flex items-center justify-center`}>
                        <Icon size={20} />
                      </div>
                      <button 
                        onClick={() => removeBookmark(item.id)}
                        className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        title="Remove Bookmark"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex-1 space-y-2 mb-6">
                       <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{item.type}</div>
                       <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">{item.title}</h3>
                       <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="pt-6 border-t border-white/5 flex gap-2">
                       <Link 
                         href={item.url} 
                         className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold hover:bg-blue-500/20 transition-all"
                       >
                         View Resource <ExternalLink size={12} />
                       </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-32 space-y-8 animate-fade-in">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <Bookmark size={40} className="text-gray-600" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black">Your library is empty</h2>
              <p className="text-gray-500 max-w-sm mx-auto">Explore the platform and bookmark resources to see them here.</p>
            </div>
            <div className="flex justify-center gap-4">
               <Link href="/tools" className="btn-primary px-8 py-3 rounded-2xl flex items-center gap-2">
                 Browse Tools <ArrowRight size={14} />
               </Link>
               <Link href="/ai-agents" className="btn-secondary px-8 py-3 rounded-2xl flex items-center gap-2">
                 Explore Agents
               </Link>
            </div>
          </div>
        )}

        {/* Sync Notice */}
        <div className="max-w-xl mx-auto p-6 rounded-2xl glass border border-orange-500/20 flex gap-4 items-center">
           <Zap className="text-orange-400 flex-shrink-0" size={24} />
           <div className="text-xs text-gray-400 leading-relaxed">
             <span className="text-white font-bold">Local Storage Sync:</span> These items are saved only on this device. Sign up in Phase 3 to sync across all your devices.
           </div>
        </div>
      </main>
    </div>
  );
}
