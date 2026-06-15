"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Globe, Plus, Eye, Edit3, Trash2, Star } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { loadOpenSourceData, OpenSourceItem } from "@/lib/admin/loaders";

export default function AdminOpenSourcePage() {
  const { can } = useAdmin();
  const [items, setItems] = useState<OpenSourceItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => { loadOpenSourceData().then(setItems); }, []);

  const filtered = items.filter((i) =>
    i.name?.toLowerCase().includes(search.toLowerCase()) ||
    i.description?.toLowerCase().includes(search.toLowerCase()) ||
    i.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Globe size={24} className="text-blue-400" /> Open Source Hub</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} open source resources</p>
        </div>
        {can("open-source", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-bold hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center gap-2">
            <Plus size={14} /> Add Resource
          </button>
        )}
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search open source..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
      </div>
      <div className="grid gap-3">
        {filtered.map((item, i) => (
          <motion.div key={item.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="p-4 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                <Globe size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="font-bold text-sm">{item.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{item.description}</div>
                <div className="flex items-center gap-2 mt-1">
                  {item.tags?.map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-bold">{tag}</span>
                  ))}
                  {item.isFree && <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[9px] font-bold">Free</span>}
                  {item.isOpenSource && <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[9px] font-bold">OSS</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-xl hover:bg-white/10 transition-all"><Eye size={14} className="text-gray-500" /></button>
              {can("open-source", "feature") && <button className="p-2 rounded-xl hover:bg-amber-500/10 transition-all"><Star size={14} className="text-gray-500" /></button>}
              {can("open-source", "delete") && <button className="p-2 rounded-xl hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="p-12 text-center text-gray-500 text-sm">No open source resources found</div>}
      </div>
    </div>
  );
}
