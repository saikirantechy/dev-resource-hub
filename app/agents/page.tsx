"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Shield, FileText, Bug, Rocket, Globe, Brain } from "lucide-react";
import Navbar from "@/components/Navbar";

const agents = [
  { id: "planner", name: "Planner", role: "Breaks goals into atomic tasks", icon: Brain, color: "from-blue-500 to-cyan-500", status: "ready", capabilities: ["Task decomposition", "Dependency graphs", "Estimation", "Resource allocation"] },
  { id: "architect", name: "Architect", role: "Designs systems before code lands", icon: Cpu, color: "from-purple-500 to-pink-500", status: "ready", capabilities: ["System design", "ADR drafting", "Diagram synthesis", "Tradeoff analysis"] },
  { id: "developer", name: "Developer", role: "Writes production-grade code", icon: Bot, color: "from-emerald-500 to-teal-500", status: "ready", capabilities: ["Code generation", "Refactoring", "Code review", "Implementation"] },
  { id: "qa", name: "QA Engineer", role: "Generates tests and audits coverage", icon: Bug, color: "from-orange-500 to-red-500", status: "ready", capabilities: ["Unit test gen", "E2E testing", "Flaky triage", "Mutation testing"] },
  { id: "security", name: "Security", role: "Scans for OWASP top 10 + secrets", icon: Shield, color: "from-pink-500 to-red-500", status: "ready", capabilities: ["SAST scanning", "Secret detection", "CVE checking", "Compliance audit"] },
  { id: "devops", name: "DevOps", role: "Owns deploys, infra, and rollbacks", icon: Rocket, color: "from-orange-500 to-amber-500", status: "ready", capabilities: ["IaC drafting", "CI/CD wiring", "Rollback plans", "Monitoring setup"] },
  { id: "docs", name: "Documentation", role: "Generates docs from code", icon: FileText, color: "from-indigo-500 to-blue-500", status: "ready", capabilities: ["API docs", "README gen", "Changelog", "Architecture docs"] },
  { id: "seo", name: "SEO Agent", role: "Optimizes content for search", icon: Globe, color: "from-cyan-500 to-blue-500", status: "ready", capabilities: ["Meta optimization", "Keyword research", "Lighthouse audit", "Sitemap gen"] },
  { id: "marketing", name: "Marketing", role: "Creates launch content", icon: Bot, color: "from-teal-500 to-emerald-500", status: "ready", capabilities: ["Social posts", "Newsletter copy", "Landing pages", "PR drafts"] },
];

export default function AgentsHubPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-blue inline-flex"><Bot size={11} /> Agent Hub</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-hero">AI Agent</span> Ecosystem
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Specialized AI agents for every phase of development — from planning to deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agents.map((agent, i) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-2xl glass-strong border border-white/8 p-5 hover:border-blue-400/30 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.color}/20 border ${agent.color.replace("from-", "").split(" ")[0]}/20 flex items-center justify-center`}>
                      <agent.icon size={18} className={`${agent.color.replace("from-", "text-").split(" ")[0]}`} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{agent.name}</div>
                      <div className="text-[10px] text-gray-500">{agent.role}</div>
                    </div>
                    <div className="ml-auto">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse block" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {agent.capabilities.map((cap) => (
                      <span key={cap} className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/5 border border-white/10 text-gray-400">
                        {cap}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
