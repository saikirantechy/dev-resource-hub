"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shield,
  ArrowLeft,
  CheckCircle2,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const STEPS = [
  {
    title: "Set up the security agent",
    desc: "Initialize your security agent with static analysis, secret scanning, and dependency audit tools.",
    code: `mkdir security-agent && cd security-agent\npython -m venv .venv && source .venv/bin/activate\npip install openai pyyaml typer rich\npip install semgrep trufflehog trivy\npip install "mcp[cli]"  # Model Context Protocol`,
  },
  {
    title: "Build SAST scanning tool",
    desc: "Integrate Semgrep for static code analysis with custom security rules.",
    code: `# tools/sast.py\nimport subprocess\nimport json\nfrom typing import Optional\n\nclass SASTScanner:\n    RULES = [\n        "python.lang.security.audit.dangerous-system-call",\n        "generic.secrets.security.detected-private-key",\n        "javascript.react.security.audit.react-dangerouslysetinnerhtml",\n    ]\n\n    async def scan(self, path: str, rules: Optional[list[str]] = None):\n        cmd = ["semgrep", "--json", "--metrics", "off"]\n        for rule in rules or self.RULES:\n            cmd.extend(["--config", f"p/{rule}"])\n        cmd.append(path)\n        result = subprocess.run(cmd, capture_output=True, text=True)\n        findings = json.loads(result.stdout)\n        return [\n            {\n                "check_id": f["check_id"],\n                "path": f["path"],\n                "line": f["start"]["line"],\n                "message": f["extra"]["message"],\n                "severity": f["extra"]["severity"],\n            }\n            for f in findings.get("results", [])\n        ]`,
  },
  {
    title: "Add secret & credential detection",
    desc: "Scan for leaked API keys, tokens, and credentials using TruffleHog and custom regex patterns.",
    code: `# tools/secrets.py\nimport subprocess\nimport json\n\nclass SecretScanner:\n    CUSTOM_PATTERNS = {\n        "OpenAI Key": r"sk-[A-Za-z0-9]{20,}",\n        "AWS Access Key": r"AKIA[0-9A-Z]{16}",\n        "GitHub Token": r"gh[pousr]_[A-Za-z0-9_]{36,}",\n        "Slack Token": r"xox[baprs]-[0-9]{10,13}",\n        "JWT Token": r"eyJ[A-Za-z0-9_-]{10,}\\\\.eyJ[A-Za-z0-9_-]{10,}",\n    }\n\n    async def scan_git_history(self, repo_path: str):\n        result = subprocess.run(\n            ["trufflehog", "git", "--json", repo_path],\n            capture_output=True, text=True, timeout=120\n        )\n        findings = []\n        for line in result.stdout.strip().split("\\n"):\n            if not line: continue\n            finding = json.loads(line)\n            findings.append({\n                "source": finding.get("SourceMetadata", {}).get("Data", {}).get("Git", {}),\n                "detector": finding.get("DetectorName"),\n                "raw": finding.get("Raw", "")[:30] + "...",\n                "severity": "CRITICAL",\n            })\n        return findings`,
  },
  {
    title: "Build dependency audit tool",
    desc: "Scan project dependencies for known CVEs using Trivy and generate remediation reports.",
    code: `# tools/dependencies.py\nimport subprocess\nimport json\n\nclass DependencyAuditor:\n    async def scan(self, project_path: str):\n        result = subprocess.run(\n            ["trivy", "fs", "--format", "json", project_path],\n            capture_output=True, text=True, timeout=180\n        )\n        data = json.loads(result.stdout)\n        vulns = []\n        for result in data.get("Results", []):\n            for v in result.get("Vulnerabilities", []):\n                vulns.append({\n                    "pkg": v["PkgName"],\n                    "installed": v["InstalledVersion"],\n                    "fixed": v.get("FixedVersion", "N/A"),\n                    "cve": v["VulnerabilityID"],\n                    "severity": v["Severity"],\n                    "title": v.get("Title", "")[:80],\n                })\n        return sorted(vulns, key=lambda x: \n            ["CRITICAL", "HIGH", "MEDIUM", "LOW"].index(x["severity"]))`,
  },
  {
    title: "Build the compliance engine",
    desc: "Check codebases and infrastructure against compliance frameworks (SOC2, HIPAA, GDPR).",
    code: `# tools/compliance.py\nclass ComplianceChecker:\n    FRAMEWORKS = {\n        "soc2": [\n            "Access control policies exist",\n            "Data encryption at rest enabled",\n            "Audit logging configured",\n            "Incident response plan documented",\n        ],\n        "hipaa": [\n            "PHI data encryption enforced",\n            "Access logs are immutable",\n            "Breach notification process defined",\n            "BAA agreements in place",\n        ],\n    }\n\n    async def audit(self, framework: str, evidence: dict) -> dict:\n        checks = self.FRAMEWORKS.get(framework, [])\n        results = []\n        for check in checks:\n            # Call LLM to evaluate evidence against criterion\n            passed = await self._evaluate(check, evidence)\n            results.append({"check": check, "passed": passed})\n        return {\n            "framework": framework,\n            "passed": sum(1 for r in results if r["passed"]),\n            "total": len(results),\n            "results": results,\n        }`,
  },
  {
    title: "Run your agent",
    desc: "Launch the security CLI and scan any project for vulnerabilities.",
    code: `# main.py\nfrom tools.sast import SASTScanner\nfrom tools.secrets import SecretScanner\nfrom tools.dependencies import DependencyAuditor\nimport asyncio\n\nasync def main():\n    sast = SASTScanner()\n    secrets = SecretScanner()\n    deps = DependencyAuditor()\n    print("🔐 Security Agent ready — scanning capabilities online")\n    while True:\n        path = input("\\nEnter project path to scan > ")\n        if path.lower() in ("exit", "quit"):\n            break\n        print(f"\\nScanning {path}...")\n        findings = await sast.scan(path)\n        secrets_found = await secrets.scan_git_history(path)\n        vulns = await deps.scan(path)\n        print(f"\\nResults:")\n        print(f"  SAST findings: {len(findings)}")\n        print(f"  Secrets found: {len(secrets_found)}")\n        print(f"  CVEs detected: {len(vulns)}")\n\nasyncio.run(main())`,
  },
];

const TOOLS = [
  { name: "Semgrep", url: "https://semgrep.dev", desc: "Static analysis" },
  { name: "TruffleHog", url: "https://trufflesecurity.com/trufflehog", desc: "Secret scanning" },
  { name: "Trivy", url: "https://trivy.dev", desc: "CVE scanning" },
  { name: "OWASP ZAP", url: "https://zaproxy.org", desc: "DAST scanning" },
  { name: "OpenPolicyAgent", url: "https://openpolicyagent.org", desc: "Policy as code" },
  { name: "Checkov", url: "https://checkov.io", desc: "IaC security scanning" },
];

export default function SecurityAgentPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08], x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="fixed top-32 left-1/4 w-[600px] h-[600px] bg-pink-500/6 rounded-full blur-[150px] -z-10 pointer-events-none"
        />

        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-4xl mx-auto space-y-10">
            <Link href="/agents/build" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={12} />
              Back to Agent Builder
            </Link>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-pink-300 text-[10px] font-bold uppercase tracking-wider">
                <Shield size={11} />
                Build Guide
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                <span className="text-4xl md:text-5xl mr-3">🔐</span>
                Security Agent
              </h1>
              <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
                Build an autonomous security engineer that scans codebases for
                vulnerabilities, detects leaked secrets, audits dependencies for
                CVEs, and enforces compliance policies — all from a CLI command.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "SAST Scanning", desc: "Semgrep + custom rules" },
                { label: "Secret Detection", desc: "TruffleHog + regex patterns" },
                { label: "CVE Auditing", desc: "Trivy dependency scan" },
                { label: "Compliance", desc: "SOC2, HIPAA, GDPR checks" },
              ].map((cap) => (
                <div key={cap.label} className="p-3 rounded-xl glass border border-white/8">
                  <div className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">{cap.label}</div>
                  <div className="text-[10px] text-gray-500 mt-1">{cap.desc}</div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">Recommended Tools</h2>
              <div className="flex flex-wrap gap-2">
                {TOOLS.map((tool) => (
                  <a key={tool.name} href={tool.url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/8 text-[10px] font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all">
                    <Globe size={10} className="text-pink-400" />
                    {tool.name}
                    <span className="text-gray-600 font-normal">— {tool.desc}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-sm font-black uppercase tracking-[0.25em] text-gray-400">Build Steps</h2>
              {STEPS.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="relative pl-8">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-pink-500/15 border border-pink-500/30 flex items-center justify-center">
                    <span className="text-[10px] font-black text-pink-400">{i + 1}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    <pre className="p-4 rounded-xl bg-[#0a0a14] border border-white/8 overflow-x-auto">
                      <code className="text-[11px] leading-relaxed text-gray-300 font-mono">{step.code}</code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-2xl glass border border-white/8 text-center space-y-3">
              <Shield size={24} className="text-pink-400 mx-auto" />
              <p className="text-sm font-bold text-white">Ready to build your Security Agent?</p>
              <p className="text-xs text-gray-500">Integrate SAST, secret scanning, CVE auditing, and compliance checks into a single autonomous agent.</p>
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <CheckCircle2 size={10} className="text-emerald-400" /> Python + Semgrep
                <span className="text-gray-700">|</span>
                <CheckCircle2 size={10} className="text-emerald-400" /> MCP-compatible
                <span className="text-gray-700">|</span>
                <CheckCircle2 size={10} className="text-emerald-400" /> CI/CD ready
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
