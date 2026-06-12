"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  ArrowLeft,
  CheckCircle2,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const STEPS = [
  {
    title: "Set up the project",
    desc: "Initialize your DevOps agent with a Python project structure and core dependencies.",
    code: `mkdir devops-agent && cd devops-agent\npython -m venv .venv && source .venv/bin/activate\npip install openai rich pyyaml typer\npip install "mcp[cli]"  # Model Context Protocol SDK`,
  },
  {
    title: "Define infrastructure tools",
    desc: "Configure tool integrations for Terraform, Kubernetes, and cloud providers using MCP servers.",
    code: `# tools/infrastructure.py\nfrom mcp import Tool\n\nclass TerraformTool(Tool):\n    name = "terraform"\n    description = "Plan and apply Terraform infrastructure"\n\n    async def execute(self, action: str, dir: str = "."):\n        if action == "plan":\n            return run_cmd(f"terraform -chdir={dir} plan")\n        elif action == "apply":\n            return run_cmd(f"terraform -chdir={dir} apply -auto-approve")\n        return {"error": "Unknown action"}`,
  },
  {
    title: "Build the agent loop",
    desc: "Create the core agent loop that interprets DevOps requests and executes tool calls.",
    code: `# agent.py\nfrom openai import OpenAI\nfrom tools.infrastructure import TerraformTool\nfrom tools.kubernetes import K8sTool\nfrom tools.cicd import CICDTool\n\nclient = OpenAI()\ntools = [TerraformTool(), K8sTool(), CICDTool()]\n\nSYSTEM_PROMPT = """You are a DevOps Engineer Agent.\nYour capabilities:\n- Provision and manage cloud infrastructure\n- Configure CI/CD pipelines\n- Monitor services and respond to incidents\n- Optimize cloud costs\nAlways confirm before destructive operations."""\n\ndef run_agent(prompt: str):\n    messages = [\n        {"role": "system", "content": SYSTEM_PROMPT},\n        {"role": "user", "content": prompt},\n    ]\n    return client.chat.completions.create(\n        model="gpt-4o", messages=messages, tools=tools\n    )`,
  },
  {
    title: "Add CI/CD pipeline agent",
    desc: "Automate GitHub Actions and ArgoCD pipeline creation and monitoring.",
    code: `# workflows/cicd_agent.py\nfrom tools.cicd import CICDTool, WorkflowStep\n\nasync def generate_ci_pipeline(language: str, framework: str):\n    tool = CICDTool()\n    steps = [\n        WorkflowStep(name="Checkout", run="actions/checkout@v4"),\n        WorkflowStep(name="Setup", run=f"setup-{language}@v3"),\n        WorkflowStep(name="Install", run=f"{'npm ci' if 'node' in language.lower() else 'pip install'}"),\n        WorkflowStep(name="Test", run=f"{'npm test' if 'node' in language.lower() else 'pytest'}"),\n        WorkflowStep(name="Build", run=f"{'npm run build' if 'node' in language.lower() else 'docker build'}"),\n        WorkflowStep(name="Deploy", run="deploy-to-environment"),\n    ]\n    return await tool.create_workflow(".github/workflows/ci.yml", steps)`,
  },
  {
    title: "Add incident response",
    desc: "Equip your agent to detect, diagnose, and respond to production incidents automatically.",
    code: `# monitors/incident.py\nfrom tools.monitoring import PrometheusTool, PagerDutyTool\n\nclass IncidentResponder:\n    def __init__(self):\n        self.prometheus = PrometheusTool()\n        self.pagerduty = PagerDutyTool()\n\n    async def handle_alert(self, alert: dict):\n        # 1. Query metrics\n        metrics = await self.prometheus.query(\n            f'sum(rate({{alert=~"{alert["name"]}"}}[5m]))'\n        )\n        # 2. Diagnose root cause\n        diagnosis = await llm_diagnose(alert, metrics)\n        # 3. Execute runbook\n        if "high_cpu" in alert["name"]:\n            await self.scale_horizontal(alert["namespace"])\n        elif "error_rate" in alert["name"]:\n            await self.rollback_deployment(alert["deployment"])\n        return {"status": "resolved", "diagnosis": diagnosis}`,
  },
  {
    title: "Run your agent",
    desc: "Launch the CLI and watch it manage your infrastructure autonomously.",
    code: `# main.py\nfrom agent import run_agent\n\nif __name__ == "__main__":\n    print("🚀 DevOps Agent ready — ask me to manage infrastructure!")\n    while True:\n        prompt = input("\\n> ")\n        if prompt.lower() in ("exit", "quit"):\n            break\n        result = run_agent(prompt)\n        print(f"\\n{result}")`,
  },
];

const TOOLS = [
  { name: "Terraform", url: "https://terraform.io", desc: "Infrastructure as Code" },
  { name: "Docker", url: "https://docker.com", desc: "Containerization" },
  { name: "Kubernetes", url: "https://kubernetes.io", desc: "Container orchestration" },
  { name: "GitHub Actions", url: "https://github.com/features/actions", desc: "CI/CD pipelines" },
  { name: "Prometheus", url: "https://prometheus.io", desc: "Monitoring & alerting" },
  { name: "Pulumi", url: "https://pulumi.com", desc: "IaC with real programming languages" },
  { name: "ArgoCD", url: "https://argo-cd.readthedocs.io", desc: "GitOps deployment" },
  { name: "PagerDuty", url: "https://pagerduty.com", desc: "Incident management" },
];

export default function DevOpsAgentPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08], x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="fixed top-32 left-1/4 w-[600px] h-[600px] bg-orange-500/6 rounded-full blur-[150px] -z-10 pointer-events-none"
        />

        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Back link */}
            <Link
              href="/agents/build"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft size={12} />
              Back to Agent Builder
            </Link>

            {/* Hero */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[10px] font-bold uppercase tracking-wider">
                <Rocket size={11} />
                Build Guide
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                <span className="text-4xl md:text-5xl mr-3">🚀</span>
                DevOps Agent
              </h1>
              <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
                Build an autonomous DevOps engineer that provisions infrastructure,
                manages CI/CD pipelines, monitors production, and responds to
                incidents — all from natural language commands.
              </p>
            </div>

            {/* Capabilities */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "IaC Management", desc: "Terraform, Pulumi, CloudFormation" },
                { label: "CI/CD Automation", desc: "GitHub Actions, ArgoCD, Jenkins" },
                { label: "K8s Operations", desc: "Deploy, scale, rollback, debug" },
                { label: "Incident Response", desc: "Detect, diagnose, resolve" },
              ].map((cap) => (
                <div key={cap.label} className="p-3 rounded-xl glass border border-white/8">
                  <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                    {cap.label}
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">{cap.desc}</div>
                </div>
              ))}
            </div>

            {/* Tool stack */}
            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                Recommended Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-[10px] font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all"
                  >
                    <Globe size={10} className="text-orange-400" />
                    {tool.name}
                    <span className="text-gray-600 font-normal">— {tool.desc}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Build steps */}
            <div className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.25em] text-gray-400">
                Build Steps
              </h2>
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative pl-8"
                >
                  {/* Step number */}
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center">
                    <span className="text-[10px] font-black text-orange-400">
                      {i + 1}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    <pre className="p-4 rounded-xl bg-[#0a0a14] border border-white/8 overflow-x-auto">
                      <code className="text-[11px] leading-relaxed text-gray-300 font-mono">
                        {step.code}
                      </code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="p-6 rounded-2xl glass border border-white/8 text-center space-y-3">
              <Rocket size={24} className="text-orange-400 mx-auto" />
              <p className="text-sm font-bold text-white">
                Ready to build your DevOps Agent?
              </p>
              <p className="text-xs text-gray-500">
                Deploy it alongside tools like Terraform, Kubernetes, and Prometheus for
                full infrastructure automation.
              </p>
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <CheckCircle2 size={10} className="text-emerald-400" />
                Python + OpenAI SDK
                <span className="text-gray-700">|</span>
                <CheckCircle2 size={10} className="text-emerald-400" />
                MCP-compatible
                <span className="text-gray-700">|</span>
                <CheckCircle2 size={10} className="text-emerald-400" />
                Production-ready
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
