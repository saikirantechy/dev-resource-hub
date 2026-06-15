"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MessageSquare, Plus, Edit3, Trash2, Users, CheckCircle, XCircle } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const MOCK_COMMUNITIES = [
  { id: "c1", name: "AI Developers India", members: 1240, posts: 342, status: "active", created: "2025-12-01" },
  { id: "c2", name: "Prompt Engineering Hub", members: 890, posts: 215, status: "active", created: "2026-01-15" },
  { id: "c3", name: "Open Source Contributors", members: 567, posts: 128, status: "pending", created: "2026-03-20" },
  { id: "c4", name: "DSA Study Group", members: 345, posts: 89, status: "active", created: "2026-02-10" },
];

export default function AdminCommunityPage() {
  const { can } = useAdmin();
  const [search, setSearch] = useState("");

  const filtered = MOCK_COMMUNITIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><MessageSquare size={24} className="text-cyan-400" /> Community Management</h1>
          <p className="text-gray-500 text-sm mt-1">{MOCK_COMMUNITIES.length} communities</p>
        </div>
        {can("community", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs font-bold hover:from-cyan-500 hover:to-blue-500 transition-all flex items-center gap-2">
            <Plus size={14} /> Create Community
          </button>
        )}
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search communities..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
      </div>
      <div className="grid gap-3">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-4 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <Users size={18} className="text-cyan-400" />
              </div>
              <div>
                <div className="font-bold text-sm">{c.name}</div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-500">
                  <span>{c.members.toLocaleString()} members</span>
                  <span>{c.posts} posts</span>
                  <span>Created {c.created}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                c.status === "active" ? "bg-emerald-500/10 text-emerald-400" :
                c.status === "pending" ? "bg-amber-500/10 text-amber-400" :
                "bg-red-500/10 text-red-400"
              }`}>{c.status}</span>
              <div className="flex items-center gap-1">
                {c.status === "pending" && can("community", "approve") && (
                  <button className="p-1.5 rounded-lg hover:bg-emerald-500/10 transition-all">
                    <CheckCircle size={14} className="text-gray-500" />
                  </button>
                )}
                {can("community", "update") && <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-all"><Edit3 size={14} className="text-gray-500" /></button>}
                {can("community", "delete") && <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
