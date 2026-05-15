"use client";

import Navbar from "@/components/Navbar";
import { Calendar, User, Clock, Eye, ArrowLeft, Share2, MessageSquare, Bookmark, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogClient({ blog }: { blog: any }) {
  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/blogs" className="hover:text-blue-400 transition-colors">Blog</Link>
            <ChevronRight size={14} />
            <span className="text-gray-300 truncate">{blog.title}</span>
          </div>

          {/* Header */}
          <header className="space-y-8">
            <div className="flex flex-wrap gap-2">
              <span className="badge badge-blue">{blog.category}</span>
              {blog.tags.map((tag: string) => (
                <span key={tag} className="badge badge-purple opacity-70">#{tag}</span>
              ))}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-y border-white/5 py-6">
              <div className="flex items-center gap-2">
                <img src={`https://ui-avatars.com/api/?name=${blog.author}&background=0D8ABC&color=fff`} className="w-8 h-8 rounded-full" alt={blog.author} />
                <span className="text-white font-bold">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} /> {blog.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} /> {blog.readTime}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <Eye size={14} /> {formatNum(blog.views)} reads
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="relative h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden border border-white/10">
            <img src={blog.coverImage} className="w-full h-full object-cover" alt={blog.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
          </div>

          {/* Content Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-8 order-2 lg:order-1">
              <div className="sticky top-32 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-500">Actions</h3>
                  <div className="flex gap-2">
                    <button className="p-3 rounded-xl glass border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all">
                      <Bookmark size={18} />
                    </button>
                    <button className="p-3 rounded-xl glass border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all">
                      <Share2 size={18} />
                    </button>
                    <button className="p-3 rounded-xl glass border border-white/10 hover:bg-white/5 text-gray-400 hover:text-white transition-all">
                      <MessageSquare size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-2xl glass border border-blue-500/20 space-y-4">
                  <Sparkles size={20} className="text-blue-400" />
                  <h4 className="font-bold text-sm">AI Summary</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    This article explores the competitive landscape of AI-first IDEs, focusing on performance, agent integration, and developer experience.
                  </p>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-3 order-1 lg:order-2 space-y-8">
              <div className="prose prose-invert prose-blue max-w-none">
                <p className="text-xl text-gray-300 leading-relaxed font-medium italic border-l-4 border-blue-500 pl-6 py-2 bg-blue-500/5 rounded-r-2xl">
                  {blog.excerpt}
                </p>
                
                <div className="text-gray-400 leading-relaxed space-y-6 text-lg">
                  <p>
                    The rise of AI-first development environments has fundamentally shifted how we think about "coding." It's no longer just about syntax highlighting and autocompletion; it's about context-aware orchestration and autonomous agents that can solve entire tickets.
                  </p>
                  
                  <h2 className="text-2xl font-black text-white pt-8">The New Paradigm</h2>
                  <p>
                    Tools like Cursor and Windsurf are not just wrappers around VS Code. They are deep integrations that treat the entire codebase as an embedding, allowing the LLM to navigate, refactor, and build with a level of precision that was previously impossible.
                  </p>
                  
                  <div className="my-10 p-8 rounded-3xl bg-white/[0.02] border border-white/5 italic text-gray-300 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
                    "The best way to predict the future of development is to build the agents that will do it for us."
                  </div>

                  <p>
                    As we move into Phase 2 of our platform, we'll be diving deeper into these tools, providing technical comparisons and hands-on tutorials to help you master the new AI-driven stack.
                  </p>

                  <h3 className="text-xl font-bold text-white pt-6">Key Takeaways</h3>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>Context is king: Tools that understand your entire repo win.</li>
                    <li>Agentic workflows are replacing simple chat interfaces.</li>
                    <li>Local LLM integration (Ollama) is becoming a standard requirement for privacy.</li>
                  </ul>
                </div>
              </div>

              {/* Tags Footer */}
              <div className="pt-12 border-t border-white/5 flex flex-wrap gap-4">
                {blog.tags.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Related CTA */}
              <div className="p-10 rounded-[2.5rem] glass border border-white/8 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={32} className="text-blue-400" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-black">Enjoyed this article?</h3>
                  <p className="text-sm text-gray-500">Explore the agents and tools mentioned in this blog in our specialized hubs.</p>
                </div>
                <Link href="/tools" className="btn-primary whitespace-nowrap">
                  Explore Tools
                </Link>
              </div>
            </article>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
