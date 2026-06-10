import { getBlogSlugs, getBlogBySlug } from "@/lib/blogs";
import BlogClient from "./BlogClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((file) => ({
    slug: file.replace(/\.md$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Dev Resource Hub`,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.cover],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = getBlogSlugs().map(s => getBlogBySlug(s)).filter((b): b is import('@/lib/blogs').BlogPost => b !== null);
  const relatedBlogs = allBlogs
    .filter(b => b.slug !== blog.slug && b.tags.some(t => blog.tags.includes(t)))
    .slice(0, 3); // Get up to 3 related blogs by tag matching

  // If we don't have enough related by tag, just backfill with recent
  if (relatedBlogs.length < 3) {
    const additional = allBlogs
      .filter(b => b.slug !== blog.slug && !relatedBlogs.find(rb => rb.slug === b.slug))
      .slice(0, 3 - relatedBlogs.length);
    relatedBlogs.push(...additional);
  }

  return <BlogClient blog={blog} relatedBlogs={relatedBlogs} />;
}
