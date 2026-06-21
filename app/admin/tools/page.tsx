"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Package, Plus, Eye, Edit3, Trash2, Star } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { loadToolsData, ToolItem } from "@/lib/admin/loaders";

export default function AdminToolsPage() {
  const { can } = useAdmin();
  const [items, setItems] = useState<ToolItem[]>([]);
  const [search, setSearch] = useState("");
  const [_loading, setLoading] = useState(true);

  useEffect(() => { loadToolsData().then((d) => { setItems(d); setLoading(false); }); }, []);

  const filtered = items.filter((i) =>
    i.name?.toLowerCase().includes(search.toLowerCase()) ||
    i.description?.toLowerCase().includes(search.toLowerCase()) ||
    i.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Package size={24} className="text-emerald-400" /> Tool Management</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} tools</p>
        </div>
        {can("tools", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center gap-2">
            <Plus size={14} /> Add Tool
          </button>
        )}
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tools..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
      </div>
      <div className="rounded-2xl glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Name</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Category</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Pricing</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Stars</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Status</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 50).map((item, i) => (
                <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                  <td className="p-4">
                    <div className="font-bold text-sm">{item.name}</div>
                    <div className="text-[10px] text-gray-500 truncate max-w-[250px]">{item.description}</div>
                  </td>
                  <td className="p-4"><span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">{item.category}</span></td>
                  <td className="p-4 text-sm">{item.pricing || "Free"}</td>
                  <td className="p-4"><span className="font-bold">{item.stars?.toLocaleString() || 0}</span></td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {item.isFeatured && <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9px] font-bold">Featured</span>}
                      {item.isTrending && <span className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[9px] font-bold">Trending</span>}
                      {item.isOpenSource && <span className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[9px] font-bold">OSS</span>}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 transition-all"><Eye size={14} className="text-gray-500" /></button>
                      {can("tools", "update") && <button className="p-1.5 rounded-lg hover:bg-blue-500/10 transition-all"><Edit3 size={14} className="text-gray-500" /></button>}
                      {can("tools", "feature") && <button className="p-1.5 rounded-lg hover:bg-amber-500/10 transition-all"><Star size={14} className="text-gray-500" /></button>}
                      {can("tools", "delete") && <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="p-12 text-center text-gray-500 text-sm">No tools found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
