import { Metadata } from "next";
import PromptsClient from "./PromptsClient";

export const metadata: Metadata = {
  title: "AI Prompt Library | Dev Resource Hub",
  description: "A curated library of battle-tested AI prompts for developers. Master prompt engineering with our searchable marketplace.",
  keywords: ["AI prompts", "prompt engineering", "developer prompts", "system prompts", "prompt library", "GPT prompts"],
};

export default function Page() {
  return <PromptsClient />;
}
