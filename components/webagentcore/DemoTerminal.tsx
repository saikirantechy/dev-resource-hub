"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Circle, Cpu, Wifi } from "lucide-react";

const lines = [
  "> Initializing Web Agent Core...",
  "> Loading Browser-Native Inference Engine...",
  "> Connecting Local Memory Layer (Vector Index)...",
  "> Memory Online. Ready for autonomous reasoning.",
  "> Agent Input: 'Research the latest AI trends in 2026'",
  "> Reasoning Loop Starting...",
  "> Browsing web sources...",
  "> Analyzing multi-modal context...",
  "> Tool Call: WebSearchAPI(query='AI trends 2026')",
  "> Result: Found 12 high-impact signals.",
  "> Summarizing findings...",
  "> Agent Offline. Task Complete."
];

export default function DemoTerminal() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < lines.length) {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, lines[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, 1000);
      return () => clearTimeout(timeout);
    } else {
      // Reset after some time
      const resetTimeout = setTimeout(() => {
        setVisibleLines([]);
        setCurrentIndex(0);
      }, 5000);
      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex]);

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-[#0f0f0f] shadow-2xl overflow-hidden shadow-emerald-500/5"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <Circle size={10} className="fill-red-500 text-red-500" />
                <Circle size={10} className="fill-yellow-500 text-yellow-500" />
                <Circle size={10} className="fill-green-500 text-green-500" />
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 ml-4">
                <TerminalIcon size={12} /> web-agent-core.sh
              </div>
            </div>
            <div className="flex items-center gap-6 text-[10px] uppercase font-bold tracking-widest text-gray-600">
              <span className="flex items-center gap-1"><Cpu size={12} /> GPU: Active</span>
              <span className="flex items-center gap-1 text-emerald-500"><Wifi size={12} /> Agent Online</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-8 h-[450px] overflow-y-auto font-mono text-sm space-y-2 scrollbar-hide">
            {visibleLines.map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={line.startsWith("> Result") ? "text-emerald-400" : line.startsWith("> Agent Input") ? "text-cyan-400" : "text-gray-400"}
              >
                {line}
              </motion.div>
            ))}
            {currentIndex < lines.length && (
              <motion.div 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-emerald-500 align-middle ml-1"
              />
            )}
          </div>

          {/* Terminal Footer */}
          <div className="px-8 py-4 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-[10px] text-gray-600 font-bold uppercase tracking-widest">
            <span>Autonomous Mode: Enabled</span>
            <span>Memory Load: 12%</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
