"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Siren, Bug, FileWarning, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const diagnosticExamples = [
  { error: "TypeError: Cannot read properties of undefined", type: "Runtime", solution: "Add optional chaining (?.) or default value. Check if the object exists before accessing nested properties.", code: `// Before\nconst name = user.profile.name;\n\n// After\nconst name = user?.profile?.name ?? "Anonymous";` },
  { error: "Module not found: Can't resolve './Component'", type: "Build", solution: "Check file path case sensitivity. Ensure the file exists at the specified path. Verify the import extension matches.", code: `// Before\nimport Component from "./component";\n\n// After\nimport Component from "./Component";` },
  { error: "ESLint: 'X' is assigned a value but never used", type: "Lint", solution: "Remove unused variable or use it. If intentional for future use, prefix with underscore.", code: `// Before\nconst result = calculate();\n\n// After\nconst _result = calculate(); // or just: calculate();` },
  { error: "TypeScript: Type 'string | undefined' is not assignable", type: "TypeScript", solution: "Add type guard or non-null assertion. Handle the undefined case explicitly.", code: `// Before\nconst name: string = user.name;\n\n// After\nconst name: string = user.name ?? "";` },
];

export default function ErrorDiagnosticPage() {
  const [activeExample, setActiveExample] = useState(0);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-red inline-flex"><Siren size={11} /> Error Diagnostic Center</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                Analyze, <span className="gradient-text-hero">Trace Bugs</span>, and Suggest Fixes
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Paste stack traces, build failures, or runtime errors. Get root cause analysis and suggested fixes immediately.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {diagnosticExamples.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setActiveExample(i)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold transition-all ${
                    activeExample === i ? "bg-gradient-to-r from-red-500 to-orange-500 text-white" : "bg-white/5 border border-white/10 text-gray-400"
                  }`}
                >
                  {d.type}
                </button>
              ))}
            </div>

            <motion.div key={activeExample} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-3xl glass-strong border border-white/8 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-red-500/5 to-orange-500/5 border-b border-white/5">
                <div className="flex items-center gap-2 mb-2">
                  <Bug size={14} className="text-red-400" />
                  <span className="badge badge-orange">{diagnosticExamples[activeExample].type}</span>
                </div>
                <code className="text-sm text-red-300 font-mono">{diagnosticExamples[activeExample].error}</code>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-white">
                    <CheckCircle size={14} className="text-emerald-400" /> Root Cause & Fix
                  </div>
                  <p className="text-xs text-gray-400">{diagnosticExamples[activeExample].solution}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold text-white">
                    <FileWarning size={14} className="text-blue-400" /> Code Example
                  </div>
                  <pre className="bg-black/40 rounded-xl p-4 text-xs font-mono text-gray-300 overflow-x-auto">
                    {diagnosticExamples[activeExample].code}
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
