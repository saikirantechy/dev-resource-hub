"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Workflow, Plus, Eye, Edit3, Trash2, Play } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const MOCK_WORKFLOWS = [
  { id: "w1", name: "PR Review Pipeline", description: "Automated PR review with AI agents", steps: 5, status: "published", created: "2026-01-15" },
  { id: "w2", name: "Documentation Generator", description: "Auto-generates docs from code", steps: 3, status: "published", created: "2026-02-20" },
  { id: "w3", name: "Release Notes Builder", description: "Builds release notes from commits", steps: 4, status: "draft", created: "2026-03-10" },
];

export default function AdminWorkflowsPage() {
  const { can } = useAdmin();
  const [search, setSearch] = useState("");

  const filtered = MOCK_WORKFLOWS.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) ||
    w.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Workflow size={24} className="text-indigo-400" /> Workflow Management</h1>
          <p className="text-gray-500 text-sm mt-1">{MOCK_WORKFLOWS.length} workflows</p>
        </div>
        {can("workflows", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center gap-2">
            <Plus size={14} /> Create Workflow
          </button>
        )}
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search workflows..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
      </div>
      <div className="grid gap-4">
        {filtered.map((wf, i) => (
          <motion.div key={wf.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <Workflow size={18} className="text-indigo-400" />
              </div>
              <div>
                <div className="font-bold text-sm">{wf.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{wf.description}</div>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-gray-600">
                  <span>{wf.steps} steps</span>
                  <span className={`px-1.5 py-0.5 rounded font-bold ${
                    wf.status === "published" ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
                  }`}>{wf.status}</span>
                  <span>Created {wf.created}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-xl hover:bg-white/10 transition-all"><Play size={14} className="text-gray-500" /></button>
              {can("workflows", "update") && <button className="p-2 rounded-xl hover:bg-blue-500/10 transition-all"><Edit3 size={14} className="text-gray-500" /></button>}
              {can("workflows", "delete") && <button className="p-2 rounded-xl hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
