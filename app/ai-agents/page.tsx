import Navbar from "@/components/Navbar";
import ResourceGrid from "@/components/ResourceGrid";
import agentsData from "@/data/agents.json";
import { Bot } from "lucide-react";

export const metadata = {
  title: "AI Agent Explorer | Dev Resource Hub",
  description: "Discover autonomous AI agents and orchestration frameworks.",
};

export default function AgentsPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />
      
      <main className="py-24 px-6 max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <Bot size={14} /> Autonomous Ecosystem
          </div>
          <h1 className="text-5xl font-black tracking-tight">AI Agent Explorer</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore the frontier of autonomous engineering. From solo coding agents to multi-agent frameworks.
          </p>
        </header>

        <ResourceGrid initialResources={agentsData} />
        
      </main>
    </div>
  );
}
