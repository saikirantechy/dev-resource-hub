"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Swords, Plus, Edit3, Trash2, Trophy, Users } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const MOCK_CHALLENGES = [
  { id: "c1", title: "Two Sum", difficulty: "Easy", category: "Arrays", solutions: 1243, completed: true },
  { id: "c2", title: "LRU Cache", difficulty: "Medium", category: "Design", solutions: 876, completed: true },
  { id: "c3", title: "Merge K Sorted Lists", difficulty: "Hard", category: "Linked Lists", solutions: 543, completed: false },
  { id: "c4", title: "Longest Palindromic Substring", difficulty: "Medium", category: "Strings", solutions: 765, completed: true },
];

export default function AdminDSAPage() {
  const { can } = useAdmin();
  const [search, setSearch] = useState("");

  const filtered = MOCK_CHALLENGES.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Swords size={24} className="text-violet-400" /> DSA Arena Management</h1>
          <p className="text-gray-500 text-sm mt-1">{MOCK_CHALLENGES.length} challenges</p>
        </div>
        <div className="flex gap-2">
          {can("dsa", "create") && (
            <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold hover:from-violet-500 hover:to-purple-500 transition-all flex items-center gap-2">
              <Plus size={14} /> Create Challenge
            </button>
          )}
          <button className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold hover:bg-white/10 transition-all flex items-center gap-2">
            <Users size={14} /> Manage Rooms
          </button>
        </div>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search challenges..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="p-5 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                  <Swords size={18} className="text-violet-400" />
                </div>
                <div>
                  <div className="font-bold text-sm">{c.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      c.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400" :
                      c.difficulty === "Medium" ? "bg-amber-500/10 text-amber-400" :
                      "bg-red-500/10 text-red-400"
                    }`}>{c.difficulty}</span>
                    <span className="text-[10px] text-gray-500">{c.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {can("dsa", "update") && <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-all"><Edit3 size={14} className="text-gray-500" /></button>}
                {can("dsa", "delete") && <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <span className="flex items-center gap-1"><Users size={12} /> {c.solutions} solutions</span>
              <span className={`${c.completed ? "text-emerald-400" : "text-amber-400"}`}>
                {c.completed ? "Active" : "Draft"}
              </span>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="col-span-2 p-12 text-center text-gray-500 text-sm">No challenges found</div>}
      </div>
    </div>
  );
}
