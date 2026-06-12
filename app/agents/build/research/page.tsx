"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FlaskConical,
  ArrowLeft,
  CheckCircle2,
  Globe,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const STEPS = [
  {
    title: "Set up the research agent",
    desc: "Initialize your research agent with web search, document parsing, and LLM integration.",
    code: `mkdir research-agent && cd research-agent\npython -m venv .venv && source .venv/bin/activate\npip install openai beautifulsoup4 requests\npip install chromadb langchain pypdf\npip install tavily-python  # web search API`,
  },
  {
    title: "Configure search & retrieval tools",
    desc: "Build tools that let your agent search the web, scrape pages, and extract structured information.",
    code: `# tools/search.py\nfrom tavily import TavilyClient\nfrom bs4 import BeautifulSoup\nimport requests\n\nclass WebSearchTool:\n    def __init__(self):\n        self.tavily = TavilyClient(api_key="YOUR_API_KEY")\n\n    async def search(self, query: str, max_results: int = 5):\n        results = self.tavily.search(query, max_results=max_results)\n        return [{"title": r["title"], "url": r["url"], "content": r["content"]}\n                for r in results["results"]]\n\n    async def scrape(self, url: str):\n        resp = requests.get(url, headers={\n            "User-Agent": "ResearchAgent/1.0"})\n        soup = BeautifulSoup(resp.text, "html.parser")\n        # Remove nav, script, style elements\n        for tag in soup(["nav", "script", "style", "footer"]):\n            tag.decompose()\n        return soup.get_text(separator="\\n", strip=True)[:8000]`,
  },
  {
    title: "Build the research pipeline",
    desc: "Create a pipeline that plans research, gathers sources, extracts insights, and synthesizes reports.",
    code: `# pipeline.py\nfrom tools.search import WebSearchTool\nfrom openai import OpenAI\nimport json\n\nRESEARCH_PLANNER_PROMPT = """Given a research topic, break it down into:\n1. Key questions to answer\n2. Search queries to run\n3. Types of sources to look for"""\n\nSYNTHESIS_PROMPT = """Synthesize the following research\nfindings into a structured report with:\n- Executive summary\n- Key findings (3-5 bullet points)\n- Evidence & sources\n- Gaps & further research\n- Conclusion"""\n\nclass ResearchPipeline:\n    def __init__(self):\n        self.search = WebSearchTool()\n        self.llm = OpenAI()\n\n    async def research(self, topic: str):\n        # 1. Plan\n        plan = self.llm.chat([{\n            "role": "system", "content": RESEARCH_PLANNER_PROMPT\n        }, {"role": "user", "content": topic}])\n\n        # 2. Gather\n        queries = json.loads(plan.choices[0].message.content)\n        all_sources = []\n        for q in queries.get("search_queries", [topic]):\n            results = await self.search.search(q)\n            all_sources.extend(results)\n\n        # 3. Synthesize\n        context = "\\n---\\n".join(\n            [f"Source: {s['url']}\\n{s['content'][:2000]}"\n             for s in all_sources[:8]])\n        report = self.llm.chat([{\n            "role": "system", "content": SYNTHESIS_PROMPT\n        }, {"role": "user", "content": f"Topic: {topic}\\n\\n{context}"}])\n        return report.choices[0].message.content`,
  },
  {
    title: "Add RAG with vector memory",
    desc: "Store past research in a vector database so your agent remembers and builds on previous work.",
    code: `# memory.py\nfrom chromadb import PersistentClient\nfrom openai import OpenAI\n\nclass ResearchMemory:\n    def __init__(self, collection_name: str = "research"):\n        self.client = PersistentClient(path="./memory")\n        self.collection = self.client.get_or_create_collection(collection_name)\n        self.llm = OpenAI()\n\n    def embed(self, text: str) -> list[float]:\n        resp = self.llm.embeddings.create(\n            model="text-embedding-3-small", input=text)\n        return resp.data[0].embedding\n\n    def store(self, topic: str, report: str, sources: list[str]):\n        self.collection.add(\n            documents=[report],\n            metadatas=[{"topic": topic, "sources": ",".join(sources)}],\n            ids=[f"research-{hash(topic)}"],\n            embeddings=[self.embed(report[:8000])]\n        )\n\n    def recall(self, query: str, n: int = 3):\n        results = self.collection.query(\n            query_embeddings=[self.embed(query)],\n            n_results=n\n        )\n        return results["documents"][0] if results["documents"] else []`,
  },
  {
    title: "Add report generation",
    desc: "Generate beautiful Markdown reports with citations, tables, and structured summaries.",
    code: `# reports/generator.py\nfrom datetime import datetime\n\nclass ReportGenerator:\n    def generate(self, topic: str, findings: str, sources: list[dict]):\n        md = f"""# Research Report: {topic}\n**Generated:** {datetime.now().strftime("%B %d, %Y")}\n\n## Executive Summary\n{findings[:500]}\n\n## Key Findings\n{self._extract_findings(findings)}\n\n## Sources\n{self._format_sources(sources)}\n\n## Methodology\nThis report was generated using AI-powered web research\nwith source verification and cross-referencing.\n"""\n        return md\n\n    def _extract_findings(self, text: str):\n        # Parse bullet points from the synthesis\n        lines = [l for l in text.split("\\n") if l.startswith("-")]\n        return "\\n".join(lines[:10]) if lines else "See full report."`,
  },
  {
    title: "Run your agent",
    desc: "Launch the research CLI and start investigating any topic.",
    code: `# main.py\nfrom pipeline import ResearchPipeline\nfrom reports.generator import ReportGenerator\nimport asyncio\n\nasync def main():\n    pipeline = ResearchPipeline()\n    reporter = ReportGenerator()\n    print("🔬 Research Agent ready — what should I investigate?")\n    while True:\n        topic = input("\\n> ")\n        if topic.lower() in ("exit", "quit"):\n            break\n        print(f"\\nResearching: {topic}...")\n        report = await pipeline.research(topic)\n        print(f"\\n{reporter.generate(topic, report, [])}")\n\nasyncio.run(main())`,
  },
];

const TOOLS = [
  { name: "Tavily", url: "https://tavily.com", desc: "AI-powered web search API" },
  { name: "LangChain", url: "https://langchain.com", desc: "LLM application framework" },
  { name: "ChromaDB", url: "https://chromadb.com", desc: "Vector database for RAG" },
  { name: "BeautifulSoup", url: "https://www.crummy.com/software/BeautifulSoup", desc: "Web scraping" },
  { name: "OpenAI Embeddings", url: "https://platform.openai.com/docs/guides/embeddings", desc: "Text vectorization" },
  { name: "PyMuPDF", url: "https://pymupdf.readthedocs.io", desc: "PDF parsing" },
];

export default function ResearchAgentPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08], x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="fixed top-32 left-1/4 w-[600px] h-[600px] bg-emerald-500/6 rounded-full blur-[150px] -z-10 pointer-events-none"
        />

        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-4xl mx-auto space-y-10">
            <Link href="/agents/build" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={12} />
              Back to Agent Builder
            </Link>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                <FlaskConical size={11} />
                Build Guide
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
                <span className="text-4xl md:text-5xl mr-3">🔬</span>
                Research Agent
              </h1>
              <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
                Build an autonomous research assistant that searches the web, extracts
                insights, synthesizes findings, and generates structured reports with
                citations — powered by RAG and vector memory.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Web Research", desc: "Multi-source search & scrape" },
                { label: "RAG Pipeline", desc: "Vector memory & retrieval" },
                { label: "Report Generation", desc: "Markdown with citations" },
                { label: "Source Verification", desc: "Cross-reference & fact-check" },
              ].map((cap) => (
                <div key={cap.label} className="p-3 rounded-xl glass border border-white/8">
                  <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">{cap.label}</div>
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
                    <Globe size={10} className="text-emerald-400" />
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
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                    <span className="text-[10px] font-black text-emerald-400">{i + 1}</span>
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
              <FlaskConical size={24} className="text-emerald-400 mx-auto" />
              <p className="text-sm font-bold text-white">Ready to build your Research Agent?</p>
              <p className="text-xs text-gray-500">Deploy it with RAG memory, web search APIs, and LangChain for deep research capabilities.</p>
              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <CheckCircle2 size={10} className="text-emerald-400" /> Python + OpenAI
                <span className="text-gray-700">|</span>
                <CheckCircle2 size={10} className="text-emerald-400" /> RAG-powered
                <span className="text-gray-700">|</span>
                <CheckCircle2 size={10} className="text-emerald-400" /> Source citations
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
