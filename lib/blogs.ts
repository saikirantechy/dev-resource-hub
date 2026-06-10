import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content', 'blogs');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  cover: string;
  content: string;
  readTime: string;
  category: string;
  excerpt: string;
  views: number;
}

function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  const readTime = Math.ceil(minutes);
  return `${readTime} min read`;
}

export function getBlogSlugs() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs.readdirSync(contentDirectory).filter(file => file.endsWith('.md'));
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  // Create a naive excerpt by taking first 150 characters of content and stripping obvious markdown
  const excerpt = content.replace(/[#*`_>\[\]\n]/g, ' ').substring(0, 150).trim() + '...';

  return {
    slug: realSlug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || '',
    author: data.author || 'Anonymous',
    tags: data.tags || [],
    cover: data.cover || '',
    content: content,
    readTime: calculateReadTime(content),
    category: data.category || (data.tags && data.tags[0]) || 'General',
    excerpt: data.description || excerpt,
    views: Math.floor(Math.random() * 10000) + 5000, // mock views for now
  };
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getBlogSlugs();
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is BlogPost => blog !== null)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));
  return blogs;
}
