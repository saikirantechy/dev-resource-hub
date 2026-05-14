"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, BrainCircuit, Search, Bot } from "lucide-react";
import ResourceCard from "@/components/ResourceCard";
import Fuse from "fuse.js";

// We'll pass this in or fetch it. For now, we'll use a placeholder structure
// In a real app, you'd fetch all JSON data.
interface Resource {
  name: string;
  description: string;
  url: string;
  tags: string[];
  category: string;
}

export default function AIFinderPage() {
  const [userInput, setUserInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<Resource[]>([]);

  // Mocking the aggregate data for the client-side finder
  // In Phase 3, this will be an API call to a vector database
  const allResources: Resource[] = [
    { name: "ChatGPT", description: "AI assistant for coding", url: "https://chat.openai.com", tags: ["AI", "Coding"], category: "AI TOOLS" },
    { name: "Next.js", description: "React framework for production", url: "https://nextjs.org", tags: ["Web", "React"], category: "WEB DEV" },
    { name: "Docker", description: "Containerization platform", url: "https://docker.com", tags: ["DevOps", "Infrastructure"], category: "DEVOPS" },
    { name: "Tailwind CSS", description: "Styling framework", url: "https://tailwindcss.com", tags: ["Web", "CSS"], category: "WEB DEV" },
    { name: "Figma", description: "Design tool", url: "https://figma.com", tags: ["Design", "UI"], category: "DESIGN" },
    { name: "Gemini", description: "Google's multimodal AI", url: "https://gemini.google.com", tags: ["AI", "Google"], category: "AI TOOLS" },
  ];

  const fuse = useMemo(() => new Fuse(allResources, {
    keys: ["name", "description", "tags"],
    threshold: 0.4,
  }), []);

  const handleFind = () => {
    if (!userInput.trim()) return;
    setIsSearching(true);
    
    // Simulate AI "thinking"
    setTimeout(() => {
      const searchResults = fuse.search(userInput).map(r => r.item);
      setResults(searchResults);
      setIsSearching(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
            <Sparkles size={14} /> AI Recommendation Engine
          </div>
          <h1 className="text-5xl font-bold tracking-tight">AI Resource Finder</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Describe your goal, and our AI will suggest the best stack from our curated hub.
          </p>
        </header>

        {/* Search Interface */}
        <div className="relative mb-12">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Bot className="h-6 w-6 text-purple-500" />
          </div>
          <input 
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFind()}
            placeholder="e.g., 'I want to build a portfolio with a modern design and AI features'"
            className="w-full bg-white/[0.03] border border-white/10 text-white pl-16 pr-32 py-6 rounded-3xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-lg shadow-2xl"
          />
          <button 
            onClick={handleFind}
            disabled={isSearching}
            className="absolute right-3 top-3 bottom-3 px-6 bg-white text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isSearching ? "Thinking..." : "Find Tools"} <ArrowRight size={18} />
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-8">
          {results.length > 0 && (
            <div className="animate-fade-in space-y-8">
              <div className="flex items-center gap-3 text-purple-400 font-bold">
                <BrainCircuit size={20} />
                <span>AI Recommendations for your goal:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((res, index) => (
                  <ResourceCard key={index} {...res} isFeatured={index === 0} />
                ))}
              </div>
            </div>
          )}

          {results.length === 0 && !isSearching && (
            <div className="text-center py-20 border border-dashed border-white/5 rounded-3xl bg-white/[0.01]">
              <div className="text-6xl mb-6 opacity-20">🧠</div>
              <h3 className="text-xl font-bold text-gray-500">Waiting for your prompt...</h3>
              <p className="text-gray-600 text-sm mt-2">Try asking for a specific tech stack or project goal.</p>
            </div>
          )}
        </div>

        {/* Example Prompts */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">Popular queries:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Modern frontend framework",
              "Best AI for coding",
              "Containerization for beginners",
              "UI/UX Design tools"
            ].map(prompt => (
              <button 
                key={prompt}
                onClick={() => { setUserInput(prompt); }}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                "{prompt}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
