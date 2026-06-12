"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, MessageSquare, GitPullRequest, Download, FileText, Copy, Check, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

const commitPrefixes = [
  { prefix: "feat", label: "Feature", color: "text-emerald-400" },
  { prefix: "fix", label: "Bug Fix", color: "text-red-400" },
  { prefix: "docs", label: "Documentation", color: "text-blue-400" },
  { prefix: "refactor", label: "Refactor", color: "text-purple-400" },
  { prefix: "perf", label: "Performance", color: "text-amber-400" },
  { prefix: "test", label: "Tests", color: "text-orange-400" },
  { prefix: "chore", label: "Chore", color: "text-gray-400" },
];

const examples = [
  { diff: "Added login page with email/password auth, OAuth buttons (Google, GitHub), session management", message: "feat(auth): add login page with email/password and OAuth support" },
  { diff: "Fixed undefined error in profile component when user data is null. Added optional chaining and default values.", message: "fix(profile): handle null user data with optional chaining" },
  { diff: "Refactored API client to use Axios instead of fetch. Added interceptors for auth tokens and error handling.", message: "refactor(api): migrate from fetch to Axios with auth interceptors" },
];

export default function GitAssistantPage() {
  const [diffInput, setDiffInput] = useState("");
  const [generatedMessage, setGeneratedMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMessage = () => {
    if (!diffInput.trim()) return;
    const prefix = commitPrefixes[Math.floor(Math.random() * commitPrefixes.length)];
    const msg = `${prefix.prefix}: ${diffInput.split("\n")[0].slice(0, 72).toLowerCase()}`;
    setGeneratedMessage(msg);
  };

  const copyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-blue inline-flex"><GitBranch size={11} /> Git Assistant</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                Generate <span className="gradient-text-blue">Commit Messages</span> & PRs
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Generate conventional commit messages, PR descriptions, and release notes from your changes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="rounded-2xl glass-strong border border-white/8 p-5">
                  <h3 className="text-xs font-bold text-white mb-3 flex items-center gap-2"><MessageSquare size={14} className="text-blue-400" /> Commit Message Generator</h3>
                  <textarea value={diffInput} onChange={(e) => setDiffInput(e.target.value)} placeholder="Paste your diff or describe your changes..." rows={4} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-blue-400/40 resize-none font-mono" />
                  <button onClick={generateMessage} disabled={!diffInput.trim()} className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold disabled:opacity-40">
                    <Sparkles size={14} /> Generate Commit Message
                  </button>
                </div>
                {generatedMessage && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl glass border border-white/8 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Generated</span>
                      <button onClick={copyMessage} className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-white transition-colors">
                        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />} {copied ? "Copied" : "Copy"}
                      </button>
                    </div>
                    <code className="text-sm text-white font-mono">{generatedMessage}</code>
                  </motion.div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-2"><FileText size={14} className="text-purple-400" /> Examples</h3>
                {examples.map((ex, i) => (
                  <div key={i} className="rounded-2xl glass border border-white/8 p-4">
                    <div className="text-[10px] text-gray-500 mb-2">Diff:</div>
                    <p className="text-[11px] text-gray-400 mb-3">{ex.diff}</p>
                    <div className="text-[10px] text-gray-500 mb-1">Message:</div>
                    <code className="text-xs text-emerald-300 font-mono">{ex.message}</code>
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
