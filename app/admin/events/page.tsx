"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Plus, Edit3, Trash2, MapPin, Users, ExternalLink } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { loadEventsData, EventItem } from "@/lib/admin/loaders";

export default function AdminEventsPage() {
  const { can } = useAdmin();
  const [items, setItems] = useState<EventItem[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => { loadEventsData().then(setItems); }, []);

  const filtered = items.filter((e) =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.city?.toLowerCase().includes(search.toLowerCase()) ||
    e.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><Calendar size={24} className="text-amber-400" /> Event Management</h1>
          <p className="text-gray-500 text-sm mt-1">{items.length} events</p>
        </div>
        {can("events", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold hover:from-amber-500 hover:to-orange-500 transition-all flex items-center gap-2">
            <Plus size={14} /> Create Event
          </button>
        )}
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search events..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
      </div>
      <div className="grid gap-3">
        {filtered.slice(0, 40).map((e, i) => (
          <motion.div key={e.id || e.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
            className="p-4 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                <Calendar size={18} className="text-amber-400" />
              </div>
              <div>
                <div className="font-bold text-sm">{e.name}</div>
                <div className="text-[10px] text-gray-500 truncate max-w-[400px]">{e.description}</div>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-600">
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">{e.category}</span>
                  {(e.city || e.state) && (
                    <span className="flex items-center gap-1"><MapPin size={10} /> {[e.city, e.state, e.country].filter(Boolean).join(", ")}</span>
                  )}
                  <span>{e.date}</span>
                  {e.attendees && <span className="flex items-center gap-1"><Users size={10} /> {e.attendees}</span>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {e.registrationUrl && (
                <button className="p-2 rounded-xl hover:bg-white/10 transition-all"><ExternalLink size={14} className="text-gray-500" /></button>
              )}
              {can("events", "update") && <button className="p-2 rounded-xl hover:bg-blue-500/10 transition-all"><Edit3 size={14} className="text-gray-500" /></button>}
              {can("events", "delete") && <button className="p-2 rounded-xl hover:bg-red-500/10 transition-all"><Trash2 size={14} className="text-gray-500" /></button>}
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && <div className="p-12 text-center text-gray-500 text-sm">No events found</div>}
      </div>
    </div>
  );
}
