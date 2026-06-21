"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, ClipboardList, Trash2, Shield, Edit3, Trash, Settings, LogIn, LogOut } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { clearActivityLog } from "@/lib/admin/storage";

const ACTION_ICONS: Record<string, typeof Shield> = {
  login: LogIn,
  logout: LogOut,
  create: Edit3,
  update: Edit3,
  delete: Trash,
  setup: Shield,
  settings: Settings,
};

export default function AdminLogsPage() {
  const { activityLog, logAction, refreshSession } = useAdmin();
  const [search, setSearch] = useState("");
  const [filterAction, setFilterAction] = useState<string>("all");

  const filtered = activityLog.filter((log) => {
    const matchesSearch = !search ||
      log.details?.toLowerCase().includes(search.toLowerCase()) ||
      log.userName?.toLowerCase().includes(search.toLowerCase()) ||
      log.action?.toLowerCase().includes(search.toLowerCase());
    const matchesAction = filterAction === "all" || log.action === filterAction;
    return matchesSearch && matchesAction;
  });

  const handleClear = () => {
    clearActivityLog();
    refreshSession();
    logAction("delete", "logs", undefined, "Activity log cleared");
  };

  const uniqueActions = [...new Set(activityLog.map((l) => l.action))];

  const ActionIcon = ({ action }: { action: string }) => {
    const Icon = ACTION_ICONS[action] || Shield;
    return <Icon size={12} className="text-gray-500" />;
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2"><ClipboardList size={24} className="text-gray-400" /> Activity Logs</h1>
          <p className="text-gray-500 text-sm mt-1">{activityLog.length} total entries</p>
        </div>
        <button onClick={handleClear}
          className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all flex items-center gap-2">
          <Trash2 size={14} /> Clear Logs
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
        </div>
        <div className="flex gap-1 p-1 rounded-2xl bg-white/5 border border-white/5 overflow-x-auto">
          <button onClick={() => setFilterAction("all")}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold whitespace-nowrap ${filterAction === "all" ? "bg-blue-500/20 text-blue-400" : "text-gray-500"}`}>
            All
          </button>
          {uniqueActions.slice(0, 6).map((action) => (
            <button key={action} onClick={() => setFilterAction(action)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-bold capitalize whitespace-nowrap ${filterAction === action ? "bg-blue-500/20 text-blue-400" : "text-gray-500"}`}>
              {action}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl glass border border-white/5 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm">
            {search ? "No matching logs found" : "No activity logs yet. Actions will appear here as you manage the platform."}
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.slice(0, 100).map((log, i) => (
              <motion.div key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.005 }}
                className="flex items-start gap-4 p-4 hover:bg-white/[0.02] transition-all">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                  <ActionIcon action={log.action} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{log.userName}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold capitalize ${
                      log.action === "delete" ? "bg-red-500/10 text-red-400" :
                      log.action === "create" ? "bg-emerald-500/10 text-emerald-400" :
                      log.action === "login" || log.action === "logout" ? "bg-blue-500/10 text-blue-400" :
                      "bg-amber-500/10 text-amber-400"
                    }`}>{log.action}</span>
                    {log.resourceType !== "system" && (
                      <span className="text-[10px] text-gray-500">{log.resourceType}</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{log.details || log.action}</div>
                  <div className="text-[10px] text-gray-600 mt-0.5">
                    {new Date(log.timestamp).toLocaleString()}
                    {log.resourceId && <span className="ml-2">ID: {log.resourceId}</span>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
