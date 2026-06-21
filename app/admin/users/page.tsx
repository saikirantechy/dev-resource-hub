"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Users, UserPlus, Shield, Ban } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { loadLeaderboardData } from "@/lib/admin/loaders";

interface LeaderboardUser {
  username: string;
  displayName: string;
  avatar?: string;
  xp: number;
  rank: string;
  streak: number;
  contributions: { workflows: number; prompts: number; articles: number };
  badges: string[];
}

export default function AdminUsersPage() {
  const { can } = useAdmin();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [search, setSearch] = useState("");
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await loadLeaderboardData();
      setUsers(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = users.filter((u) =>
    u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
    u.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black flex items-center gap-2">
            <Users size={24} className="text-blue-400" /> User Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">{users.length} total users</p>
        </div>
        {can("users", "create") && (
          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold hover:from-blue-500 hover:to-purple-500 transition-all flex items-center gap-2">
            <UserPlus size={14} /> Create User
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
        />
      </div>

      {/* Users Table */}
      <div className="rounded-2xl glass border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">User</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">XP</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Rank</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Streak</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Contributions</th>
                <th className="text-left p-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <motion.tr
                  key={u.username}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="border-b border-white/5 hover:bg-white/[0.02] transition-all"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                        {u.displayName?.charAt(0) || u.username?.charAt(0) || "?"}
                      </div>
                      <div>
                        <div className="text-sm font-bold">{u.displayName || u.username}</div>
                        <div className="text-[10px] text-gray-500">@{u.username}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-emerald-400">{u.xp?.toLocaleString() || 0}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.rank === "Diamond" ? "text-cyan-400 bg-cyan-500/10" :
                      u.rank === "Gold" ? "text-amber-400 bg-amber-500/10" :
                      u.rank === "Silver" ? "text-gray-300 bg-gray-500/10" :
                      "text-orange-400 bg-orange-500/10"
                    }`}>
                      {u.rank || "Bronze"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="font-bold">{u.streak || 0} days</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 text-[10px] text-gray-500">
                      <span>W: {u.contributions?.workflows || 0}</span>
                      <span>P: {u.contributions?.prompts || 0}</span>
                      <span>A: {u.contributions?.articles || 0}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      {can("users", "update") && (
                        <button className="p-1.5 rounded-lg hover:bg-white/10 transition-all">
                          <Shield size={14} className="text-gray-500" />
                        </button>
                      )}
                      {can("users", "delete") && (
                        <button className="p-1.5 rounded-lg hover:bg-red-500/10 transition-all">
                          <Ban size={14} className="text-gray-500 hover:text-red-400" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-gray-500 text-sm">
                    {search ? "No users matching your search" : "No users found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
