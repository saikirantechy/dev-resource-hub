import Link from "next/link";
import fs from "fs";
import path from "path";

interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  tags: string[];
}

export async function generateStaticParams() {
  return [
    { slug: "ai-tools" },
    { slug: "web-dev" },
    { slug: "devops" },
    { slug: "design-tools" },
    { slug: "learning-resources" },
    { slug: "productivity-tools" },
    { slug: "mobile-development" },
    { slug: "open-source" },
    { slug: "ai-coding" },
  ];
}

async function getCategoryData(slug: string): Promise<Resource[]> {
  const filePath = path.join(process.cwd(), "data", `${slug}.json`);
  if (!fs.existsSync(filePath)) return [];
  const fileContent = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContent);
  // Ensure every resource has an id for the interactive grid
  return data.map((res: Resource) => ({
    ...res,
    id: res.id || res.name.toLowerCase().replace(/ /g, "-"),
  }));
}

import ResourceGrid from "@/components/ResourceGrid";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resources = await getCategoryData(slug);

  const categoryNames: Record<string, string> = {
    "ai-tools": "🤖 AI Tools",
    "web-dev": "💻 Web Development",
    devops: "⚙️ DevOps",
    "design-tools": "🎨 Design Tools",
    "learning-resources": "📚 Learning Resources",
    "productivity-tools": "🚀 Productivity Tools",
    "mobile-development": "📱 Mobile Development",
    "open-source": "🛠 Open Source Starter Pack",
    "ai-coding": "⌨️ AI Coding Assistants",
  };

  const name = categoryNames[slug] || slug;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-blue-400 mb-8 transition-colors"
        >
          ← Back to Categories
        </Link>

        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
          <p className="text-xl text-gray-400">
            A curated list of high-quality resources for {name.toLowerCase()}.
          </p>
        </header>

        <ResourceGrid initialResources={resources} showSearch={true} />
      </div>
    </main>
  );
}
