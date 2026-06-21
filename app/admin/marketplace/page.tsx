"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag, Plus, Edit3, Trash2, CheckCircle } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { loadMarketplaceData, MarketplaceItem } from "@/lib/admin/loaders";

export default function AdminMarketplacePage() {
  const { can } = useAdmin();
  const [items, setItems] = useState<MarketplaceItem[]>([]);
  const [search, setSearch] = useState("");
  const [_loading, setLoading] = useState(true);

  useEffect(() => { loadMarketplaceData().then((d) => { setItems(d); setLoading(false); }); }, []);

  const filtered = items.filter((i) =>
    i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.description?.toLowerCase().includes(search.toLowerCase()) ||
    i.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><ShoppingBag size={24} className="text-pink-400" /> Marketplace Management</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} listings</p>
        </div>
        {can("marketplace", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-xs font-bold hover:from-pink-500 hover:to-rose-500 transition-all flex items-center gap-2">
            <Plus size={14} /> Add Listing
          </button>
        )}
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search marketplace..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
      </div>
      <div className="grid gap-3">
        {filtered.slice(0, 40).map((item, i) => (
          <motion.div key={item.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="p-4 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center text-lg">
                {item.logo || "🛍️"}
              </div>
              <div>
                <div className="font-bold text-sm">{item.title}</div>
                <div className="text-[10px] text-gray-500 truncate max-w-[400px]">{item.description}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-400 text-[9px] font-bold">{item.category}</span>
                  <span className="text-[10px] text-gray-600">{item.pricing || "Free"}</span>
                  {item.stars && <span className="text-[10px] text-gray-600">★ {item.stars}</span>}
                  {item.isFeatured && <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[9px] font-bold">Featured</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {can("marketplace", "approve") && (
                <button className="p-2 rounded-xl hover:bg-emerald-500/10 transition-all"><CheckCircle size={14} className="text-gray-500" /></button>
              )}
              {can("marketplace", "update") && <button className="p-2 rounded-xl hover:bg-blue-500/10 transition-all"><Edit3 size={14} className="text-gray-500" /></button>}
              {can("marketplace", "delete") && <button className="p-2 rounded-xl hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="p-12 text-center text-gray-500 text-sm">No marketplace listings found</div>}
      </div>
    </div>
  );
}
