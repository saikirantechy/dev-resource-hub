import fs from "fs";
import path from "path";
import Link from "next/link";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

async function getBlogs() {
  const blogDir = path.join(process.cwd(), "content/blogs");
  const files = fs.readdirSync(blogDir);

  const blogs = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    
    // Simple Frontmatter Parser
    const frontmatterMatch = content.match(/---\s*([\s\S]*?)\s*---/);
    const frontmatterStr = frontmatterMatch ? frontmatterMatch[1] : "";
    const frontmatter: any = {};
    
    frontmatterStr.split("\n").forEach((line) => {
      const [key, ...valueParts] = line.split(":");
      if (key && valueParts.length > 0) {
        frontmatter[key.trim()] = valueParts.join(":").trim().replace(/^"(.*)"$/, "$1");
      }
    });

    return {
      slug: file.replace(".md", ""),
      ...frontmatter,
    };
  });

  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-20 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <BookOpen size={14} /> Ecosystem Updates
          </div>
          <h1 className="text-5xl font-black tracking-tight">The Hub Blog</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends in development, tool reviews, and community updates.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link 
              key={blog.slug}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col rounded-3xl bg-white/[0.03] border border-white/10 hover:border-blue-500/50 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden shadow-2xl"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={blog.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
              </div>
              
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {blog.date}</span>
                  <span className="flex items-center gap-1"><User size={12} /> {blog.author}</span>
                </div>
                
                <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-400 transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                <div className="pt-4 flex items-center text-blue-400 font-bold text-sm group-hover:translate-x-2 transition-transform">
                  Read Article <ArrowRight size={16} className="ml-2" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
