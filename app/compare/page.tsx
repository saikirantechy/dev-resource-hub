import { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare AI Tools | Dev Resource Hub",
  description: "Side-by-side technical comparisons of AI IDEs, autonomous agents, and multi-agent frameworks.",
  keywords: ["compare AI tools", "Cursor vs Windsurf", "CrewAI vs LangGraph", "AI tool comparison"],
};

export default function Page() {
  return <CompareClient />;
}
