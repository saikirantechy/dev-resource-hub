import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/webagentcore/Hero";
import DemoTerminal from "@/components/webagentcore/DemoTerminal";
import Features from "@/components/webagentcore/Features";
import Architecture from "@/components/webagentcore/Architecture";
import Pricing from "@/components/webagentcore/Pricing";
import CTA from "@/components/webagentcore/CTA";

export const metadata: Metadata = {
  title: "Web Agent Core | Autonomous AI Agents for the Web",
  description: "An advanced browser-native AI agent framework with local inference, memory systems, and autonomous reasoning loops.",
  openGraph: {
    title: "Web Agent Core",
    description: "Build autonomous AI agents for the web.",
    images: ["https://saikirantechy.github.io/dev-resource-hub/webagentcore-og.png"],
  }
};

export const dynamic = "force-static";

export default function WebAgentCorePage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Custom Navbar (Using existing but could be specialized) */}
      <Navbar />

      {/* Main Feature Content */}
      <main>
        <Hero />
        
        {/* Visual Break / Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <DemoTerminal />
        
        <Features />
        
        <Architecture />
        
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <Pricing />
        
        <CTA />
      </main>

      {/* Page-wide Ambient Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#10b98103,transparent_40%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,#06b6d403,transparent_40%)]" />
      </div>
    </div>
  );
}
