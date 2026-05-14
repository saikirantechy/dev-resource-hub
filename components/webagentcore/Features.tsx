"use client";

import { motion } from "framer-motion";
import { 
  Zap, 
  Globe, 
  Brain, 
  ShieldCheck, 
  Cpu, 
  Plug, 
  Workflow, 
  Search, 
  Layers, 
  MousePointer2, 
  Code2, 
  Lock
} from "lucide-react";

const features = [
  {
    title: "Zero Dependencies",
    description: "Built from scratch with no bloat. Instant installation and minimal footprint.",
    icon: <Zap className="text-emerald-400" />,
    color: "emerald"
  },
  {
    title: "Browser Native",
    description: "Runs entirely in the browser using WebAssembly and WebGPU for maximum speed.",
    icon: <Globe className="text-cyan-400" />,
    color: "cyan"
  },
  {
    title: "Local Inference",
    description: "Execute LLMs directly on the client. No private data ever leaves the user's machine.",
    icon: <Cpu className="text-purple-400" />,
    color: "purple"
  },
  {
    title: "Agent Memory",
    description: "Persistent vector-based memory systems for long-term reasoning and context.",
    icon: <Brain className="text-pink-400" />,
    color: "pink"
  },
  {
    title: "Tool Calling",
    description: "Native support for complex tool calling across web APIs and local functions.",
    icon: <Plug className="text-orange-400" />,
    color: "orange"
  },
  {
    title: "Workflow Engine",
    description: "Chain agents together to build complex, multi-step autonomous workflows.",
    icon: <Workflow className="text-blue-400" />,
    color: "blue"
  },
  {
    title: "Secure Sandbox",
    description: "Isolated execution environment for safe browser automation and scripting.",
    icon: <Lock className="text-red-400" />,
    color: "red"
  },
  {
    title: "WebGPU Accelerated",
    description: "Hardware acceleration for neural network inference and rendering tasks.",
    icon: <Layers className="text-yellow-400" />,
    color: "yellow"
  }
];

export default function Features() {
  return (
    <section className="py-32 px-6 bg-[#0a0a0a]">
      <div className="container mx-auto">
        <header className="max-w-3xl mx-auto text-center mb-24 space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Engineered for the <span className="text-emerald-400">Future</span> of Web AI
          </h2>
          <p className="text-xl text-gray-400">
            A comprehensive suite of browser-native tools to build, deploy, and scale autonomous agents.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-500 relative overflow-hidden"
            >
              {/* Glow Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-500" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                  {feature.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Background Accent */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-emerald-500/5 blur-[50px] group-hover:bg-emerald-500/10 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
