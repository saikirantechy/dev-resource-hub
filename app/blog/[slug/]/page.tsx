import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

async function getBlog(slug: string) {
  const filePath = path.join(process.cwd(), "content/blogs", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const content = fs.readFileSync(filePath, "utf8");
  
  // Simple Frontmatter Parser
  const frontmatterMatch = content.match(/---\s*([\s\S]*?)\s*---/);
  const frontmatterStr = frontmatterMatch ? frontmatterMatch[1] : "";
  const body = content.replace(/---\s*[\s\S]*?\s*---/, "").trim();
  
  const frontmatter: any = {};
  frontmatterStr.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      frontmatter[key.trim()] = valueParts.join(":").trim().replace(/^"(.*)"$/, "$1");
    }
  });

  return {
    slug,
    body,
    ...frontmatter,
  };
}

export async function generateStaticParams() {
  const blogDir = path.join(process.cwd(), "content/blogs");
  const files = fs.readdirSync(blogDir);
  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) return <div>Post not found</div>;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6">
      <article className="max-w-3xl mx-auto space-y-12">
        <Link href="/blogs" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <header className="space-y-8">
          <img 
            src={blog.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"} 
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-[2.5rem] shadow-2xl border border-white/10"
          />
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Calendar size={14} className="text-blue-500" /> {blog.date}
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <User size={14} className="text-purple-500" /> {blog.author}
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Clock size={14} className="text-green-500" /> 5 min read
              </span>
            </div>
          </div>
        </header>

        {/* Content Render (Simple Markdown-like parser) */}
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300 text-lg leading-relaxed">
          {blog.body.split("\n\n").map((para: string, i: number) => {
            if (para.startsWith("# ")) return <h1 key={i} className="text-4xl font-bold text-white pt-8">{para.replace("# ", "")}</h1>;
            if (para.startsWith("## ")) return <h2 key={i} className="text-3xl font-bold text-white pt-6">{para.replace("## ", "")}</h2>;
            if (para.startsWith("### ")) return <h3 key={i} className="text-2xl font-bold text-white pt-4">{para.replace("### ", "")}</h3>;
            if (para.startsWith("- ")) {
              return (
                <ul key={i} className="list-disc pl-6 space-y-2">
                  {para.split("\n").map((li, j) => <li key={j}>{li.replace("- ", "")}</li>)}
                </ul>
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </div>

        <footer className="pt-16 border-t border-white/10">
          <div className="p-12 rounded-[2rem] bg-gradient-to-br from-blue-600/20 via-transparent to-transparent border border-white/10 text-center space-y-6">
            <h3 className="text-2xl font-bold">Enjoyed this article?</h3>
            <p className="text-gray-400">Share it with your developer friends or join our community to contribute your own stories.</p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-all">Share on X</button>
              <Link href="/submit" className="px-6 py-3 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all">Submit a Resource</Link>
            </div>
          </div>
        </footer>
      </article>
    </main>
  );
}
