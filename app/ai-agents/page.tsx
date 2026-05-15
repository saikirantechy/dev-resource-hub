import { Metadata } from "next";
import AgentsClient from "./AgentsClient";

export const metadata: Metadata = {
  title: "AI Agent Explorer | Dev Resource Hub",
  description: "Discover the best autonomous AI agents, coding agents, and frameworks like Devin, Manus, CrewAI, and LangGraph.",
  keywords: ["AI agents", "autonomous agents", "coding agents", "Devin AI", "Manus AI", "CrewAI", "LangGraph", "AutoGPT"],
};

export default function Page() {
  return <AgentsClient />;
}
