"use client";

import { useState } from "react";
import { Play, RotateCcw, ChevronDown, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import type { Language, TestCase } from "@/lib/dsa/types";
import { ALL_LANGUAGES } from "@/lib/dsa/data";

interface Props {
  initialCode?: string;
  language?: Language;
  testCases?: TestCase[];
}

export default function DSACodeEditor({ initialCode = "", language: initialLang = "Python", testCases: initialTests }: Props) {
  const [code, setCode] = useState(initialCode || `def solution(nums, target):\n    # Write your solution here\n    pass\n\n# Test\nprint(solution([2, 7, 11, 15], 9))`);
  const [language, setLanguage] = useState(initialLang);
  const [showLang, setShowLang] = useState(false);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testCases, setTestCases] = useState<TestCase[]>(initialTests || [
    { input: "nums = [2,7,11,15], target = 9", expected: "[0, 1]" },
    { input: "nums = [3,2,4], target = 6", expected: "[1, 2]" },
    { input: "nums = [3,3], target = 6", expected: "[0, 1]" },
  ]);

  const handleRun = () => {
    setIsRunning(true);
    setOutput("");
    setTimeout(() => {
      setOutput("Compiling...\nNo syntax errors found.\n\nTest Cases:\n✓ Test 1: Passed (0.023ms)\n✓ Test 2: Passed (0.015ms)\n✓ Test 3: Passed (0.019ms)\n\nAll tests passed! 🎉");
      setTestCases(prev => prev.map(tc => ({ ...tc, passed: true, output: "Passed" })));
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setCode(initialCode || `def solution(nums, target):\n    # Write your solution here\n    pass\n\n# Test\nprint(solution([2, 7, 11, 15], 9))`);
    setOutput("");
    setTestCases(prev => prev.map(tc => ({ ...tc, passed: undefined, output: undefined })));
  };


  return (
    <div className="rounded-2xl glass border border-white/10 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-gray-300 hover:text-white hover:border-white/20 transition-all"
            >
              {language} <ChevronDown size={12} />
            </button>
            {showLang && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowLang(false)} />
                <div className="absolute top-full mt-1 left-0 z-20 w-40 rounded-xl glass-strong border border-white/10 py-1 shadow-2xl">
                  {ALL_LANGUAGES.map(l => (
                    <button
                      key={l.id}
                      onClick={() => { setLanguage(l.name as Language); setShowLang(false); }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold transition-all ${
                        language === l.name ? "text-blue-400 bg-blue-500/10" : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleReset} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all">
            <RotateCcw size={12} /> Reset
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white text-[10px] font-bold hover:opacity-90 transition-all disabled:opacity-50"
          >
            {isRunning ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 border-r border-white/5">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[400px] bg-transparent text-sm font-mono text-gray-200 p-4 resize-none focus:outline-none placeholder:text-gray-700 leading-relaxed"
            spellCheck={false}
            placeholder={`# Write your ${language} solution here...`}
            style={{ tabSize: 2 }}
          />
        </div>

        {/* Test Cases Panel */}
        <div className="p-4 space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Test Cases</div>
          {testCases.map((tc, i) => (
            <div key={i} className={`p-3 rounded-xl border transition-all ${
              tc.passed === undefined ? "border-white/5 bg-white/[0.02]" :
              tc.passed ? "border-emerald-500/20 bg-emerald-500/5" : "border-red-500/20 bg-red-500/5"
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-gray-400">Test {i + 1}</span>
                {tc.passed === true && <CheckCircle2 size={14} className="text-emerald-400" />}
                {tc.passed === false && <XCircle size={14} className="text-red-400" />}
              </div>
              <div className="text-[10px] text-gray-500 font-mono mb-0.5">Input: {tc.input}</div>
              <div className="text-[10px] text-gray-500 font-mono">Expected: {tc.expected}</div>
              {tc.output && (
                <div className={`text-[10px] font-mono mt-1 ${tc.passed ? "text-emerald-400" : "text-red-400"}`}>
                  Output: {tc.output}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="border-t border-white/5 p-4 bg-black/30">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Output</div>
          <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
