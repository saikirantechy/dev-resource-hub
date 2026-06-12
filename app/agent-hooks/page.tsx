"use client";

import { motion } from "framer-motion";
import { Workflow, FileText, Beaker, GitCommit, RefreshCw, FileCode, GitPullRequest } from "lucide-react";
import Navbar from "@/components/Navbar";

const hooks = [
  { trigger: "File Saved (.ts/.tsx)", icon: FileCode, color: "from-blue-500 to-cyan-500", actions: ["Run TypeScript type check", "Generate JSDoc comments", "Update exports index", "Check for unused imports"] },
  { trigger: "Git Commit", icon: GitCommit, color: "from-orange-500 to-amber-500", actions: ["Generate commit message", "Run pre-commit hooks", "Update changelog", "Check for secrets"] },
  { trigger: "Pull Request Created", icon: GitPullRequest, color: "from-purple-500 to-pink-500", actions: ["Generate PR description", "Run full test suite", "Check code coverage", "Auto-assign reviewers"] },
  { trigger: "Test File Changed", icon: Beaker, color: "from-emerald-500 to-teal-500", actions: ["Run affected tests", "Update snapshots", "Check coverage delta", "Flag flaky tests"] },
  { trigger: "Package.json Updated", icon: FileText, color: "from-rose-500 to-pink-500", actions: ["Audit new deps", "Check for breaking changes", "Update lockfile", "Run size check"] },
  { trigger: "File Deleted", icon: RefreshCw, color: "from-red-500 to-orange-500", actions: ["Remove imports across project", "Update barrel exports", "Clean up tests", "Update docs references"] },
];

export default function AgentHooksPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <div className="badge badge-teal inline-flex"><Workflow size={11} /> Agent Hooks</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-hero">Event-Triggered</span> Agent Automation
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Delegate tasks to AI agents that trigger on events like file save. Agents autonomously execute in the background based on your pre-defined prompts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hooks.map((hook, i) => (
                <motion.div
                  key={hook.trigger}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="rounded-2xl glass-strong border border-white/8 overflow-hidden group"
                >
                  <div className={`p-4 bg-gradient-to-r ${hook.color}/10 border-b border-white/5`}>
                    <div className="flex items-center gap-3">
                      <hook.icon size={18} className={`${hook.color.replace("from-", "text-").split(" ")[0]}`} />
                      <div className="text-xs font-bold text-white font-mono">{hook.trigger}</div>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    {hook.actions.map((action) => (
                      <div key={action} className="flex items-center gap-2 text-[11px] text-gray-400">
                        <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                        {action}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
