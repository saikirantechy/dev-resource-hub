"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Plus, Edit3, Trash2, Star, ExternalLink } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { loadOpenSourceData, OpenSourceItem } from "@/lib/admin/loaders";

const CATEGORIES = ["All", "Courses", "Books", "GitHub", "Learning Paths", "Certifications", "Tutorials"];

export default function AdminResourcesPage() {
  const { can } = useAdmin();
  const [items, setItems] = useState<OpenSourceItem[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => { loadOpenSourceData().then(setItems); }, []);

  const filtered = items.filter((r) => {
    const matchesSearch = r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || r.tags?.some((t) => t.toLowerCase() === category.toLowerCase().replace(" ", "-"));
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><BookOpen size={24} className="text-emerald-400" /> Resource Management</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} learning resources</p>
        </div>
        {can("resources", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center gap-2">
            <Plus size={14} /> Add Resource
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search resources..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
        </div>
        <div className="flex gap-1 p-1 rounded-2xl bg-white/5 border border-white/5 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap ${category === cat ? "bg-emerald-500/20 text-emerald-400" : "text-gray-500"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.slice(0, 30).map((item, i) => (
          <motion.div key={item.name + i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="p-5 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                <BookOpen size={18} className="text-emerald-400" />
              </div>
              <div className="flex gap-1">
                {can("resources", "feature") && <button className="p-1.5 rounded-lg hover:bg-amber-500/10 transition-all"><Star size={14} className="text-gray-500" /></button>}
                {can("resources", "update") && <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-all"><Edit3 size={14} className="text-gray-500" /></button>}
                {can("resources", "delete") && <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
              </div>
            </div>
            <h3 className="font-bold text-sm mb-1 group-hover:text-emerald-300 transition-colors">{item.name}</h3>
            <p className="text-xs text-gray-500 line-clamp-2 mb-3">{item.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {item.tags?.slice(0, 2).map((tag) => (
                  <span key={tag} className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8px] font-bold">{tag}</span>
                ))}
              </div>
              {item.url && (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-white/10 transition-all">
                  <ExternalLink size={12} className="text-gray-500" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="col-span-3 p-12 text-center text-gray-500 text-sm">No resources found</div>}
      </div>
    </div>
  );
}
