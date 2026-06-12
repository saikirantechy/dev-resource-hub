"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  FlaskConical,
  Shield,
  BarChart3,
  ArrowRight,
  Bot,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const AGENT_TEMPLATES = [
  {
    emoji: "🚀",
    icon: Rocket,
    title: "DevOps Agent",
    slug: "devops",
    gradient: "from-orange-500 to-amber-500",
    badgeColor: "bg-orange-500/15 text-orange-300 border-orange-500/30",
    description:
      "Automate infrastructure provisioning, CI/CD pipelines, incident response, and cloud cost optimization.",
    capabilities: [
      "IaC generation (Terraform, Pulumi)",
      "CI/CD pipeline wiring",
      "Kubernetes monitoring & alerting",
      "Rollback & incident response",
    ],
    tools: ["Terraform", "Docker", "Kubernetes", "GitHub Actions", "Prometheus"],
  },
  {
    emoji: "🔬",
    icon: FlaskConical,
    title: "Research Agent",
    slug: "research",
    gradient: "from-emerald-500 to-teal-500",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    description:
      "Gather, synthesize, and analyze information from across the web with AI-powered research workflows.",
    capabilities: [
      "Deep web research & source gathering",
      "Paper & article summarization",
      "Competitive analysis reports",
      "Data extraction & structured output",
    ],
    tools: [
      "OpenAI / Claude API",
      "LangChain",
      "Vector Databases",
      "Web Scrapers",
      "RAG Pipelines",
    ],
  },
  {
    emoji: "🔐",
    icon: Shield,
    title: "Security Agent",
    slug: "security",
    gradient: "from-pink-500 to-rose-500",
    badgeColor: "bg-pink-500/15 text-pink-300 border-pink-500/30",
    description:
      "Scan codebases for vulnerabilities, detect secrets, audit dependencies, and enforce compliance policies.",
    capabilities: [
      "SAST & DAST scanning automation",
      "Secret & credential detection",
      "Dependency CVE auditing",
      "Compliance report generation (SOC2, HIPAA)",
    ],
    tools: ["Semgrep", "TruffleHog", "Trivy", "OWASP ZAP", "OpenPolicyAgent"],
  },
  {
    emoji: "📊",
    icon: BarChart3,
    title: "Data Agent",
    slug: "data",
    gradient: "from-blue-500 to-cyan-500",
    badgeColor: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    description:
      "Extract, transform, and analyze data at scale — from SQL queries to interactive dashboards.",
    capabilities: [
      "Natural-language to SQL queries",
      "ETL pipeline generation",
      "Automated data visualization",
      "Anomaly detection & reporting",
    ],
    tools: ["dbt", "Apache Spark", "Metabase", "Python", "Postgres"],
  },
];

export default function BuildAgentsPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        {/* Background orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="fixed top-32 left-1/4 w-[700px] h-[700px] bg-blue-500/6 rounded-full blur-[180px] -z-10 pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.18, 0.08],
            x: [0, -80, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="fixed top-48 right-1/4 w-[500px] h-[500px] bg-purple-500/6 rounded-full blur-[150px] -z-10 pointer-events-none"
        />

        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* ─── HERO ─── */}
            <div className="text-center space-y-5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 badge badge-blue"
              >
                <Bot size={11} />
                Agent Builder
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-5xl md:text-7xl font-black tracking-tighter"
              >
                Build Your{" "}
                <span className="gradient-text-hero">AI Agent</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 text-base max-w-2xl mx-auto"
              >
                Choose a template below to get a step-by-step build guide with
                tools, code snippets, and best practices for creating your own
                specialized AI agent.
              </motion.p>
            </div>

            {/* ─── AGENT CARDS ─── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {AGENT_TEMPLATES.map((agent, i) => (
                <motion.div
                  key={agent.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                >
                  <Link
                    href={`/agents/build/${agent.slug}`}
                    className="group block relative rounded-2xl glass border border-white/8 overflow-hidden hover:border-white/20 transition-all duration-300 h-full"
                  >
                    {/* Gradient accent */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`}
                    />

                    <div className="relative z-10 p-6 space-y-5">
                      {/* Emoji + Title */}
                      <div className="flex items-start gap-4">
                        <span className="text-4xl leading-none">{agent.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-xl font-black text-white group-hover:text-blue-200 transition-colors">
                            {agent.title}
                          </h2>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                            {agent.description}
                          </p>
                        </div>
                      </div>

                      {/* Capabilities */}
                      <div className="space-y-1.5">
                        {agent.capabilities.map((cap) => (
                          <div
                            key={cap}
                            className="flex items-center gap-2 text-[11px] text-gray-400"
                          >
                            <span className="w-1 h-1 rounded-full bg-blue-400/60 shrink-0" />
                            {cap}
                          </div>
                        ))}
                      </div>

                      {/* Tool chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {agent.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/8 text-[9px] font-bold text-gray-500 uppercase tracking-wider"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                        Build Agent
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* ─── INFO SECTION ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl glass border border-white/8">
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <Bot size={12} className="text-blue-400" />
                  <span>
                    <span className="text-white font-bold">4</span> agent templates
                  </span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <Rocket size={12} className="text-orange-400" />
                  <span>Step-by-step guides</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <BarChart3 size={12} className="text-blue-400" />
                  <span>Code examples included</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
