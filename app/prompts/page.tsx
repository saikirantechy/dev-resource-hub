"use client";

import { useState } from "react";
import promptsData from "@/data/prompts.json";
import { Copy, CheckCircle2, Search, Terminal } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function PromptsPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = promptsData.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />
      
      <main className="py-24 px-6 max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
            <Terminal size={14} /> Prompt Marketplace
          </div>
          <h1 className="text-5xl font-black tracking-tight">AI Prompt Library</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover, copy, and utilize the most effective prompts for AI coding assistants and autonomous agents.
          </p>
        </header>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-4 text-gray-500" />
          <input 
            type="text"
            placeholder="Search prompts by title or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-purple-500/50 transition-all"
          />
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPrompts.map((prompt) => (
            <div key={prompt.id} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-all flex flex-col group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{prompt.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{prompt.category}</p>
                </div>
                <button 
                  onClick={() => handleCopy(prompt.id, prompt.content)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors flex items-center gap-2 text-sm font-bold"
                >
                  {copiedId === prompt.id ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                  {copiedId === prompt.id ? "Copied!" : "Copy"}
                </button>
              </div>
              
              <p className="text-gray-400 mb-6">{prompt.description}</p>
              
              <div className="flex-1 bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-sm text-gray-300 overflow-x-auto">
                {prompt.content}
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {prompt.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {filteredPrompts.length === 0 && (
          <div className="text-center py-20 text-gray-500">No prompts found for "{search}".</div>
        )}
      </main>
    </div>
  );
}
