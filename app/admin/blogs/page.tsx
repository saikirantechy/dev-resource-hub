"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Plus, Eye, Edit3, Trash2, Star } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { loadPromptsData, PromptItem } from "@/lib/admin/loaders";

export default function AdminBlogsPage() {
  const { can } = useAdmin();
  const [items, setItems] = useState<PromptItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPromptsData().then((data) => { setItems(data); setLoading(false); });
  }, []);

  const filtered = items.filter((i) =>
    i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.description?.toLowerCase().includes(search.toLowerCase()) ||
    i.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><FileText size={24} className="text-purple-400" /> Blog & Prompt Management</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} entries</p>
        </div>
        {can("blogs", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:from-purple-500 hover:to-pink-500 transition-all flex items-center gap-2">
            <Plus size={14} /> Create Blog
          </button>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search blogs..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
      </div>

      <div className="rounded-2xl glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Title</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Category</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Author</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Difficulty</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Views</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((item, i) => (
                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                  <td className="p-4">
                    <div className="font-bold text-sm">{item.title}</div>
                    <div className="text-[10px] text-gray-500 truncate max-w-[250px]">{item.description}</div>
                  </td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-bold">{item.category}</span></td>
                  <td className="p-4 text-sm">{item.author}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      item.difficulty === "Beginner" ? "text-emerald-400 bg-emerald-500/10" :
                      item.difficulty === "Intermediate" ? "text-amber-400 bg-amber-500/10" :
                      "text-red-400 bg-red-500/10"
                    }`}>{item.difficulty}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{item.views?.toLocaleString() || 0}</span>
                      <span className="text-[10px] text-gray-500">♥ {item.likes || 0}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-all"><Eye size={14} className="text-gray-500" /></button>
                      {can("blogs", "update") && <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-all"><Edit3 size={14} className="text-gray-500" /></button>}
                      {can("blogs", "feature") && <button className="p-1.5 rounded-lg hover:bg-amber-500/10 transition-all"><Star size={14} className="text-gray-500" /></button>}
                      {can("blogs", "delete") && <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-12 text-center text-gray-500 text-sm">No entries found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
