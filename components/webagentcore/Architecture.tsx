"use client";

import { motion } from "framer-motion";
import { Brain, Database, Cpu, Globe, ArrowDown, Share2 } from "lucide-react";

const nodes = [
  { id: "input", label: "User Intent", icon: <Globe size={24} />, color: "emerald" },
  { id: "reasoning", label: "Reasoning Engine", icon: <Brain size={24} />, color: "cyan" },
  { id: "memory", label: "Vector Memory", icon: <Database size={24} />, color: "purple" },
  { id: "execution", label: "Tool Execution", icon: <Cpu size={24} />, color: "orange" },
  { id: "action", label: "Autonomous Action", icon: <Share2 size={24} />, color: "blue" }
];

export default function Architecture() {
  return (
    <section className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#10b98105,transparent_50%)]" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <header className="text-center mb-24 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black">Agent <span className="text-emerald-400">Architecture</span></h2>
          <p className="text-gray-400 text-lg">The neural nervous system of the Web Agent Core ecosystem.</p>
        </header>

        <div className="flex flex-col items-center gap-12">
          {nodes.map((node, i) => (
            <div key={node.id} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 hover:bg-white/[0.06] transition-all duration-500 flex items-center gap-6 shadow-2xl w-full md:w-[400px]"
              >
                <div className={`p-4 rounded-2xl bg-${node.color}-500/10 text-${node.color}-400 border border-${node.color}-500/20 group-hover:scale-110 transition-transform`}>
                  {node.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">{node.label}</h3>
                  <p className="text-xs text-gray-500 uppercase font-black tracking-widest">Active Node 0x{i+1}</p>
                </div>

                {/* Ambient Glow */}
                <div className={`absolute -inset-1 bg-${node.color}-500/5 blur-2xl rounded-[2rem] -z-10 group-hover:opacity-100 opacity-0 transition-opacity`} />
              </motion.div>
              
              {i < nodes.length - 1 && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  whileInView={{ height: 48, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  className="w-px bg-gradient-to-b from-emerald-500/50 to-transparent"
                >
                  <div className="mt-4 flex flex-col items-center text-emerald-500/50 animate-bounce">
                    <ArrowDown size={20} />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
