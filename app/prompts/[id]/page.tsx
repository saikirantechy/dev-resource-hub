import promptsData from "@/data/prompts.json";
import PromptClient from "./PromptClient";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return promptsData.map((prompt) => ({
    id: prompt.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const prompt = promptsData.find((p) => p.id === id);
  
  if (!prompt) return { title: "Prompt Not Found" };

  return {
    title: `${prompt.title} | Dev Resource Hub`,
    description: prompt.description,
    openGraph: {
      title: prompt.title,
      description: prompt.description,
    },
  };
}

export default async function PromptPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const prompt = promptsData.find((p) => p.id === id);

  if (!prompt) {
    notFound();
  }

  return <PromptClient prompt={prompt} />;
}
