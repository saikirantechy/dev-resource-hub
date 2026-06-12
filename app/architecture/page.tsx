"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Server, Database, Shield, Cpu, Cloud, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const architectures = [
  {
    id: "microservices",
    name: "Microservices Architecture",
    description: "Decoupled services with independent deployment, scaling, and ownership.",
    icon: Server,
    color: "from-blue-500 to-cyan-500",
    bestFor: "Large teams, complex domains, high scalability needs",
    components: ["API Gateway", "Service Mesh", "Message Queue", "Service Registry", "Config Server", "Distributed Tracing"],
  },
  {
    id: "saas",
    name: "SaaS Platform",
    description: "Multi-tenant architecture with shared infrastructure and isolated data.",
    icon: Cloud,
    color: "from-purple-500 to-pink-500",
    bestFor: "B2B/B2C products, subscription models, team collaboration",
    components: ["Tenant Isolation", "Shared Services", "Billing System", "Analytics Pipeline", "Notification Service", "CDN"],
  },
  {
    id: "ai-agent",
    name: "AI Agent Architecture",
    description: "Orchestrated agent loops with memory, tools, and reasoning pipelines.",
    icon: Cpu,
    color: "from-emerald-500 to-teal-500",
    bestFor: "AI assistants, automation platforms, agent ecosystems",
    components: ["Agent Orchestrator", "Memory Store", "Tool Registry", "LLM Gateway", "RAG Pipeline", "Monitoring"],
  },
  {
    id: "event-driven",
    name: "Event-Driven Architecture",
    description: "Asynchronous event processing with decoupled producers and consumers.",
    icon: Database,
    color: "from-orange-500 to-red-500",
    bestFor: "Real-time systems, data pipelines, IoT platforms",
    components: ["Event Bus", "Event Sourcing", "CQRS", "Stream Processor", "Materialized Views", "Dead Letter Queue"],
  },
];

const bestPractices = [
  { category: "Security", items: ["Zero-trust networking", "Encryption at rest & transit", "OWASP top 10 compliance", "Regular penetration testing"] },
  { category: "Scalability", items: ["Horizontal auto-scaling", "Database read replicas", "CDN for static assets", "Caching strategy (Redis/CDN)"] },
  { category: "Reliability", items: ["Circuit breaker pattern", "Retry with exponential backoff", "Health check endpoints", "Multi-region failover"] },
  { category: "Observability", items: ["Structured logging", "Distributed tracing", "Metrics dashboard", "Synthetic monitoring"] },
];

export default function ArchitecturePage() {
  const [active, setActive] = useState("microservices");
  const arch = architectures.find((a) => a.id === active)!;

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-blue inline-flex"><Building2 size={11} /> Architecture Studio</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-blue">System Architecture</span> Designed by Best Practices
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Production-ready architecture patterns with component breakdowns, security recommendations, and deployment strategies.
              </p>
            </div>

            {/* Architecture Selector */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {architectures.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setActive(a.id)}
                  className={`rounded-2xl p-5 text-left border transition-all ${
                    active === a.id
                      ? `bg-gradient-to-br ${a.color}/10 border-white/20`
                      : "glass border-white/8 hover:border-white/20"
                  }`}
                >
                  <a.icon size={24} className={`mb-3 ${active === a.id ? "text-white" : "text-gray-400"}`} />
                  <div className="text-sm font-bold">{a.name}</div>
                  <div className="text-[10px] text-gray-500 mt-1 line-clamp-2">{a.description}</div>
                </button>
              ))}
            </div>

            {/* Active Architecture Detail */}
            <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl glass-strong border border-white/8 p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black">{arch.name}</h2>
                  <p className="text-sm text-gray-400 mt-1">{arch.description}</p>
                  <div className="badge badge-blue mt-3 text-[9px]">Best for: {arch.bestFor}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {arch.components.map((c) => (
                  <div key={c} className="rounded-xl bg-white/5 border border-white/8 p-3 text-center">
                    <div className="text-[10px] font-bold text-gray-300">{c}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Best Practices */}
            <div>
              <h2 className="text-xl font-black mb-6">Best Practices by Category</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {bestPractices.map((bp) => (
                  <div key={bp.category} className="rounded-2xl glass border border-white/8 p-5">
                    <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                      <Shield size={14} className="text-emerald-400" /> {bp.category}
                    </h3>
                    <ul className="space-y-1.5">
                      {bp.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-400">
                          <CheckCircle size={10} className="text-emerald-400 mt-0.5 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
