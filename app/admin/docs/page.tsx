"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Plus, Eye, Edit3, Trash2, FileText } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const MOCK_DOCS = [
  { id: "d1", title: "Getting Started Guide", category: "Guides", status: "published", updated: "2026-03-15", views: 3420 },
  { id: "d2", title: "Architecture Overview", category: "Technical", status: "published", updated: "2026-02-20", views: 2100 },
  { id: "d3", title: "API Reference", category: "Reference", status: "draft", updated: "2026-04-01", views: 0 },
  { id: "d4", title: "Contributor Guidelines", category: "Community", status: "published", updated: "2026-01-10", views: 1560 },
  { id: "d5", title: "Deployment Guide", category: "Technical", status: "review", updated: "2026-03-28", views: 890 },
];

export default function AdminDocsPage() {
  const { can } = useAdmin();
  const [search, setSearch] = useState("");

  const filtered = MOCK_DOCS.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><BookOpen size={24} className="text-blue-400" /> Documentation Management</h1>
          <p className="text-gray-500 text-sm mt-1">{MOCK_DOCS.length} documents</p>
        </div>
        {can("docs", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:from-blue-500 hover:to-indigo-500 transition-all flex items-center gap-2">
            <Plus size={14} /> New Document
          </button>
        )}
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search documentation..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
      </div>
      <div className="grid gap-3">
        {filtered.map((doc, i) => (
          <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-4 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center">
                <FileText size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-sm">{doc.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-bold">{doc.category}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    doc.status === "published" ? "bg-emerald-500/10 text-emerald-400" :
                    doc.status === "review" ? "bg-amber-500/10 text-amber-400" :
                    "bg-gray-500/10 text-gray-400"
                  }`}>{doc.status}</span>
                  <span className="text-[10px] text-gray-500">{doc.views.toLocaleString()} views</span>
                </div>
                <div className="text-[10px] text-gray-600 mt-0.5">Updated {doc.updated}</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-xl hover:bg-white/10 transition-all"><Eye size={14} className="text-gray-500" /></button>
              {can("docs", "update") && <button className="p-2 rounded-xl hover:bg-blue-500/10 transition-all"><Edit3 size={14} className="text-gray-500" /></button>}
              {can("docs", "delete") && <button className="p-2 rounded-xl hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="p-12 text-center text-gray-500 text-sm">No documents found</div>}
      </div>
    </div>
  );
}
