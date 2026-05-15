import blogsData from "@/data/blogs.json";
import { Calendar, User, ArrowRight, BookOpen, Clock, Eye, Flame, Sparkles } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev Intelligence Blog | Dev Resource Hub",
  description: "Deep dives, tool comparisons, agent tutorials, and the latest AI developer news. Written by developers, for developers.",
  keywords: ["AI blog", "developer blog", "AI tutorials", "tool comparisons", "AI news", "Cursor vs Windsurf"],
};

const CAT_COLORS: Record<string, string> = {
  "Tools": "badge-blue",
  "Comparison": "badge-purple",
  "Agents": "badge-orange",
  "Prompts": "badge-pink",
  "Open Source": "badge-emerald",
};

export default function BlogsPage() {
  const featured = blogsData.filter(b => b.isFeatured);
  const rest = blogsData.filter(b => !b.isFeatured);
  const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}k` : String(n);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-blue">
            <BookOpen size={12} /> Dev Intelligence
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            <span className="gradient-text-blue">The Hub</span>
            <br />
            <span className="text-white/90">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Deep dives, tool comparisons, agent tutorials, and the best AI dev news — written by developers, for developers.
          </p>
        </header>

        {/* Featured Articles */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-orange-400" />
            <h2 className="text-2xl font-black">Featured Articles</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero Article */}
            {featured[0] && (
              <Link
                href={`/blog/${featured[0].slug}`}
                className="group lg:col-span-2 relative rounded-3xl overflow-hidden glass border border-white/8 hover:border-blue-500/30 card-hover block"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={featured[0].coverImage}
                    alt={featured[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className={`badge ${CAT_COLORS[featured[0].category] || "badge-blue"}`}>
                      {featured[0].category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-orange"><Flame size={9} /> Featured</span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {featured[0].date}</span>
                    <span className="flex items-center gap-1"><User size={11} /> {featured[0].author}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {featured[0].readTime}</span>
                    <span className="flex items-center gap-1 ml-auto"><Eye size={11} /> {formatNum(featured[0].views)}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-300 transition-colors leading-tight">
                    {featured[0].title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{featured[0].excerpt}</p>
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            )}

            {/* Side Articles */}
            <div className="space-y-6">
              {featured.slice(1, 3).map(blog => (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className="group flex gap-4 p-4 rounded-2xl glass border border-white/8 hover:border-blue-500/30 card-hover items-start"
                >
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-20 h-16 object-cover rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <span className={`badge ${CAT_COLORS[blog.category] || "badge-blue"} text-[9px] mb-1`}>
                      {blog.category}
                    </span>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">{blog.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-[10px] text-gray-500">
                      <span>{blog.readTime}</span>
                      <span>•</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* More Articles */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles size={20} className="text-purple-400" />
            <h2 className="text-2xl font-black">More Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...rest, ...featured.slice(3)].map((blog, i) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group glass rounded-3xl border border-white/8 hover:border-blue-500/30 card-hover overflow-hidden animate-fade-in flex flex-col"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] to-transparent opacity-70" />
                  <div className="absolute top-3 left-3">
                    <span className={`badge ${CAT_COLORS[blog.category] || "badge-blue"} text-[9px]`}>{blog.category}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1 space-y-3">
                  <div className="flex items-center gap-3 text-[10px] text-gray-500">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {blog.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {blog.readTime}</span>
                    <span className="flex items-center gap-1 ml-auto"><Eye size={10} /> {formatNum(blog.views)}</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors leading-tight flex-1">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {blog.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold text-xs group-hover:translate-x-1.5 transition-transform pt-1">
                    Read Article <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Write for us CTA */}
        <div className="relative p-12 rounded-[2.5rem] glass border border-white/8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="relative z-10 space-y-4">
            <BookOpen size={32} className="mx-auto text-blue-400 animate-float" />
            <h2 className="text-3xl font-black">Write for The Hub</h2>
            <p className="text-gray-400 max-w-md mx-auto">Share your expertise with thousands of developers. We publish guides, tutorials, comparisons, and opinion pieces.</p>
            <Link href="/submit" className="btn-primary inline-flex">
              Submit an Article
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
