"use client";

import Navbar from "@/components/Navbar";
import { Calendar, Clock, Eye, Share2, MessageSquare, Bookmark, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Add a nice dark theme for code blocks
import { BlogPost } from '@/lib/blogs';

export default function BlogClient({ blog, relatedBlogs = [] }: { blog: BlogPost, relatedBlogs?: BlogPost[] }) {
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blog.cover} className="w-full h-full object-cover" alt={blog.title} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
          </div>

          {/* Content Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Sidebar (Table of Contents / Actions) */}
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
                  <h4 className="font-bold text-sm">Table of Contents</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Auto-generated structure of the article for quick navigation.
                  </p>
                  <ul className="text-xs text-gray-300 space-y-2 mt-2">
                    {/* Very basic dynamic ToC extraction, just matching h2 tags from content */}
                    {blog.content.match(/^##\s+(.*)/gm)?.map((h2, i) => (
                      <li key={i} className="hover:text-blue-400 cursor-pointer transition-colors">
                        • {h2.replace('## ', '')}
                      </li>
                    )) || <li className="italic text-gray-600">No headings found</li>}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <article className="lg:col-span-3 order-1 lg:order-2 space-y-8">
              <div className="prose prose-invert prose-blue max-w-none prose-pre:bg-[#0d0d12] prose-pre:border prose-pre:border-white/10 prose-img:rounded-3xl prose-headings:font-black">
                <p className="text-xl text-gray-300 leading-relaxed font-medium italic border-l-4 border-blue-500 pl-6 py-2 bg-blue-500/5 rounded-r-2xl mb-10">
                  {blog.excerpt}
                </p>
                
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {blog.content}
                </ReactMarkdown>
              </div>

              {/* Tags Footer */}
              <div className="pt-12 border-t border-white/5 flex flex-wrap gap-4">
                {blog.tags.map((tag: string) => (
                  <span key={tag} className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>

            </article>
          </div>

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <div className="pt-20 mt-20 border-t border-white/10">
              <h2 className="text-3xl font-black mb-8 flex items-center gap-3">
                <Sparkles size={24} className="text-blue-400" />
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedBlogs.map(rb => (
                  <Link href={`/blog/${rb.slug}`} key={rb.slug} className="group glass rounded-3xl border border-white/8 hover:border-blue-500/30 card-hover overflow-hidden flex flex-col">
                    <div className="relative h-44 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={rb.cover} alt={rb.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent opacity-70" />
                    </div>
                    <div className="p-5 flex flex-col flex-1 space-y-3">
                      <div className="flex items-center gap-2 text-[10px] text-gray-500">
                        <Calendar size={10} /> {rb.date} • <Clock size={10} /> {rb.readTime}
                      </div>
                      <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors">{rb.title}</h3>
                      <p className="text-xs text-gray-500 line-clamp-2">{rb.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
