"use client";

import Navbar from "@/components/Navbar";
import { Scale, CheckCircle2, XCircle } from "lucide-react";

export default function ComparePage() {
  const comparisons = [
    {
      category: "AI IDEs & Coding Assistants",
      tools: [
        {
          name: "Cursor",
          description: "AI-first code editor",
          bestFor: "Full codebase refactoring and general AI coding.",
          price: "Free tier / $20 Pro",
          features: {
            "Autonomous Coding": false,
            "Inline Chat": true,
            "Terminal Integration": true,
            "Composer Feature": true,
          }
        },
        {
          name: "Windsurf",
          description: "Next-gen AI IDE",
          bestFor: "Deep codebase context and seamless workflows.",
          price: "Free tier / Paid Pro",
          features: {
            "Autonomous Coding": false,
            "Inline Chat": true,
            "Terminal Integration": true,
            "Composer Feature": false,
          }
        },
        {
          name: "Devin AI",
          description: "Autonomous software engineer",
          bestFor: "End-to-end task execution and autonomous building.",
          price: "Enterprise / Waitlist",
          features: {
            "Autonomous Coding": true,
            "Inline Chat": false,
            "Terminal Integration": true,
            "Composer Feature": false,
          }
        }
      ]
    },
    {
      category: "AI UI Generators",
      tools: [
        {
          name: "v0 by Vercel",
          description: "Generative UI for React",
          bestFor: "Generating shadcn/ui components instantly.",
          price: "Free tier / Premium",
          features: {
            "Component Generation": true,
            "Full Page Generation": true,
            "Code Export": true,
            "Backend Integration": false,
          }
        },
        {
          name: "Lovable",
          description: "AI Builder Platform",
          bestFor: "Building full-stack apps with natural language.",
          price: "Free tier / Premium",
          features: {
            "Component Generation": true,
            "Full Page Generation": true,
            "Code Export": true,
            "Backend Integration": true,
          }
        }
      ]
    }
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />
      
      <main className="py-24 px-6 max-w-7xl mx-auto space-y-16">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <Scale size={14} /> AI Stack Comparison
          </div>
          <h1 className="text-5xl font-black tracking-tight">Compare AI Tools</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find the right tool for your workflow. Compare features, pricing, and capabilities across the top AI developer platforms.
          </p>
        </header>

        <div className="space-y-20">
          {comparisons.map((section, idx) => (
            <div key={idx} className="space-y-8">
              <h2 className="text-3xl font-bold border-b border-white/10 pb-4">{section.category}</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-4 font-bold text-gray-400">Tool</th>
                      <th className="p-4 font-bold text-gray-400">Best For</th>
                      <th className="p-4 font-bold text-gray-400">Pricing</th>
                      {Object.keys(section.tools[0].features).map((feature) => (
                        <th key={feature} className="p-4 font-bold text-gray-400 whitespace-nowrap">{feature}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.tools.map((tool) => (
                      <tr key={tool.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-lg">{tool.name}</div>
                          <div className="text-sm text-gray-500">{tool.description}</div>
                        </td>
                        <td className="p-4 text-gray-300 max-w-[200px]">{tool.bestFor}</td>
                        <td className="p-4 text-emerald-400 font-medium">{tool.price}</td>
                        {Object.values(tool.features).map((hasFeature, i) => (
                          <td key={i} className="p-4 text-center">
                            {hasFeature ? (
                              <CheckCircle2 className="text-emerald-500 inline-block" size={20} />
                            ) : (
                              <XCircle className="text-gray-600 inline-block" size={20} />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
