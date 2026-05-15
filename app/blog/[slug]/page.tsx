import blogsData from "@/data/blogs.json";
import BlogClient from "./BlogClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);
  
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Dev Resource Hub`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = blogsData.find((b) => b.slug === slug);

  if (!blog) {
    notFound();
  }

  return <BlogClient blog={blog} />;
}
