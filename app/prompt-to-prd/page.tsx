"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, FileText, Sparkles, CheckCircle, Target, Layers, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function PromptToPRDPage() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<null | { requirements: string[]; features: string[]; userStories: string[]; techStack: string[]; architecture: string }>(null);
  const [loading, setLoading] = useState(false);

  const generatePRD = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const topic = input.split(" ").slice(0, 3).join(" ");
      setResult({
        requirements: [
          `User authentication and authorization for ${topic}`,
          `Real-time data synchronization across devices`,
          `Responsive web interface with mobile support`,
          "RESTful API with rate limiting and caching",
          `Analytics dashboard for ${topic} metrics`,
          "Role-based access control for team collaboration",
        ],
        features: [
          `Smart ${topic} recommendation engine`,
          `One-click ${topic} deployment pipeline`,
          `Collaborative ${topic} workspace with versioning`,
          `AI-powered ${topic} insights and analytics`,
          `Automated ${topic} testing and validation`,
        ],
        userStories: [
          `As a user, I want to ${input.toLowerCase().slice(0, 60)} so that I can achieve my goals faster`,
          "As an admin, I want to manage user permissions so that data stays secure",
          "As a developer, I want to integrate via API so that I can build custom solutions",
          "As a manager, I want to see analytics so that I can track team progress",
        ],
        techStack: [
          "Next.js 16 + React 19 (Frontend)",
          "Node.js + Express (Backend API)",
          "PostgreSQL + Supabase (Database)",
          "Redis (Caching Layer)",
          "Docker + Kubernetes (Deployment)",
          "GitHub Actions (CI/CD)",
        ],
        architecture: `## System Architecture for ${topic}\n\n### Frontend Layer\n- Next.js App Router with React Server Components\n- Tailwind CSS for styling\n- Framer Motion for animations\n\n### API Layer\n- RESTful endpoints under /api/v1/\n- WebSocket connections for real-time features\n- Rate limiting with token bucket algorithm\n\n### Data Layer\n- PostgreSQL for primary data\n- Redis for session caching\n- S3-compatible storage for assets\n\n### Deployment\n- Docker containers orchestrated via Kubernetes\n- Blue-green deployment strategy\n- Automated CI/CD via GitHub Actions`,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-purple inline-flex"><GitBranch size={11} /> Prompt → PRD Generator</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-hero">Natural Prompt</span> to <span className="gradient-text-blue">Structured PRD</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-3xl mx-auto">
                Describe your idea in natural language and instantly get a structured Product Requirements Document with features, user stories, tech stack, and architecture.
              </p>
            </div>

            {/* Input */}
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Describe your project idea...&#10;&#10;Example: Build me an AI-powered developer platform where users can discover tools, compare frameworks, and collaborate on open-source projects"
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-purple-400/40 transition-colors resize-none"
                />
              </div>
              <button
                onClick={generatePRD}
                disabled={!input.trim() || loading}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] transition-transform"
              >
                {loading ? (
                  <><Sparkles size={16} className="animate-spin" /> Generating PRD...</>
                ) : (
                  <><GitBranch size={16} /> Generate PRD</>
                )}
              </button>
            </div>

            {/* Result */}
            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl glass-strong border border-white/8 p-6">
                    <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Requirements</h3>
                    <ul className="space-y-2">
                      {result.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl glass-strong border border-white/8 p-6">
                    <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2"><Zap size={16} className="text-yellow-400" /> Features</h3>
                    <ul className="space-y-2">
                      {result.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl glass-strong border border-white/8 p-6">
                  <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2"><Target size={16} className="text-blue-400" /> User Stories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.userStories.map((s, i) => (
                      <div key={i} className="p-3 rounded-xl bg-blue-500/8 border border-blue-500/15 text-xs text-gray-300">
                        <span className="text-blue-400 font-bold">#{i + 1}</span> {s}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="rounded-2xl glass-strong border border-white/8 p-6">
                    <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2"><Layers size={16} className="text-purple-400" /> Tech Stack</h3>
                    <ul className="space-y-2">
                      {result.techStack.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl glass-strong border border-white/8 p-6">
                    <h3 className="text-sm font-black text-white mb-4 flex items-center gap-2"><FileText size={16} className="text-orange-400" /> Architecture</h3>
                    <pre className="text-xs text-gray-400 whitespace-pre-wrap font-mono">{result.architecture}</pre>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
