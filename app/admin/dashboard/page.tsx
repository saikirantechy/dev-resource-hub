"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users, FileText, Bot, Workflow, ShoppingBag, Globe,
  Trophy, Swords, MessageSquare, Calendar, BarChart3, Settings,
  TrendingUp, ArrowUp, Activity, Shield, BookOpen, Package, Layers
} from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { ADMIN_ROUTES } from "@/lib/admin/constants";
import { loadJsonData } from "@/lib/admin/storage";
import { DashboardStats } from "@/lib/admin/types";

interface DataCounts {
  agents: number;
  tools: number;
  prompts: number;
  marketplace: number;
  events: number;
  openSource: number;
}

const STAT_CARDS = [
  { label: "Total Users", icon: Users, href: ADMIN_ROUTES.USERS, color: "from-blue-500 to-cyan-500", countKey: "users" as const },
  { label: "Blog Posts", icon: FileText, href: ADMIN_ROUTES.BLOGS, color: "from-purple-500 to-pink-500", countKey: "blogs" as const },
  { label: "AI Tools", icon: Package, href: ADMIN_ROUTES.TOOLS, color: "from-emerald-500 to-teal-500", countKey: "tools" as const },
  { label: "AI Agents", icon: Bot, href: ADMIN_ROUTES.AGENTS, color: "from-orange-500 to-red-500", countKey: "agents" as const },
  { label: "Workflows", icon: Workflow, href: ADMIN_ROUTES.WORKFLOWS, color: "from-indigo-500 to-purple-500", countKey: "workflows" as const },
  { label: "Marketplace", icon: ShoppingBag, href: ADMIN_ROUTES.MARKETPLACE, color: "from-pink-500 to-rose-500", countKey: "marketplace" as const },
  { label: "Resources", icon: BookOpen, href: ADMIN_ROUTES.RESOURCES, color: "from-cyan-500 to-blue-500", countKey: "resources" as const },
  { label: "Events", icon: Calendar, href: ADMIN_ROUTES.EVENTS, color: "from-amber-500 to-orange-500", countKey: "events" as const },
];

export default function AdminDashboardPage() {
  const { user, can, activityLog } = useAdmin();
  const [counts, setCounts] = useState<DataCounts>({
    agents: 0, tools: 0, prompts: 0, marketplace: 0, events: 0, openSource: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [agents, tools, prompts, marketplace, events, openSource] = await Promise.all([
        loadJsonData("agents.json"),
        loadJsonData("tools.json"),
        loadJsonData("prompts.json"),
        loadJsonData("marketplace.json"),
        loadJsonData("events.json"),
        loadJsonData("open-source.json"),
      ]);
      setCounts({
        agents: agents.length,
        tools: tools.length,
        prompts: prompts.length,
        marketplace: marketplace.length,
        events: events.length,
        openSource: openSource.length,
      });
      setLoading(false);
    }
    load();
  }, []);

  const totalContent = counts.agents + counts.tools + counts.prompts + counts.marketplace + counts.events + counts.openSource;
  const recentLogs = activityLog.slice(0, 8);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Welcome back, {user?.displayName}</h1>
          <p className="text-gray-500 text-sm mt-1">Here&apos;s an overview of the Dev Resource Hub</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Activity size={14} className="text-emerald-400" />
          <span>System active</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl glass border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl" />
          <div className="relative z-10">
            <div className="text-3xl sm:text-4xl font-black text-white">{totalContent}</div>
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Total Content Items</div>
            <div className="flex items-center gap-1 mt-2 text-[10px] text-emerald-400">
              <ArrowUp size={10} /> Across {Object.keys(counts).length} categories
            </div>
          </div>
        </motion.div>

        {STAT_CARDS.map((card, i) => {
          const count = card.countKey === "agents" ? counts.agents
            : card.countKey === "tools" ? counts.tools
            : card.countKey === "blogs" ? counts.prompts
            : card.countKey === "marketplace" ? counts.marketplace
            : card.countKey === "events" ? counts.events
            : card.countKey === "workflows" ? 0
            : card.countKey === "users" ? 0
            : card.countKey === "resources" ? 0
            : 0;

          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={card.href}
                className="block p-5 rounded-2xl glass border border-white/5 hover:border-white/10 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <card.icon size={18} className="text-white" />
                </div>
                <div className="text-xl font-black">{count}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-0.5">{card.label}</div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl glass border border-white/5"
        >
          <h2 className="text-sm font-black mb-4 flex items-center gap-2">
            <BarChart3 size={16} className="text-blue-400" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Manage Users", icon: Users, href: ADMIN_ROUTES.USERS, className: "hover:bg-blue-500/10 hover:border-blue-500/20", iconClass: "text-blue-400" },
              { label: "Manage Blogs", icon: FileText, href: ADMIN_ROUTES.BLOGS, className: "hover:bg-purple-500/10 hover:border-purple-500/20", iconClass: "text-purple-400" },
              { label: "Manage Tools", icon: Package, href: ADMIN_ROUTES.TOOLS, className: "hover:bg-emerald-500/10 hover:border-emerald-500/20", iconClass: "text-emerald-400" },
              { label: "Manage Agents", icon: Bot, href: ADMIN_ROUTES.AGENTS, className: "hover:bg-orange-500/10 hover:border-orange-500/20", iconClass: "text-orange-400" },
              { label: "View Analytics", icon: TrendingUp, href: ADMIN_ROUTES.ANALYTICS, className: "hover:bg-cyan-500/10 hover:border-cyan-500/20", iconClass: "text-cyan-400" },
              { label: "Settings", icon: Settings, href: ADMIN_ROUTES.SETTINGS, className: "hover:bg-gray-500/10 hover:border-gray-500/20", iconClass: "text-gray-400" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 transition-all ${action.className}`}
              >
                <action.icon size={16} className={action.iconClass} />
                <span className="text-xs font-medium">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="p-6 rounded-2xl glass border border-white/5"
        >
          <h2 className="text-sm font-black mb-4 flex items-center gap-2">
            <Activity size={16} className="text-emerald-400" /> Recent Activity
          </h2>
          {recentLogs.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-xs">
              No activity yet. Actions will be logged here as you manage the platform.
            </div>
          ) : (
            <div className="space-y-2">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-all">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield size={12} className="text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{log.details || log.action}</div>
                    <div className="text-[10px] text-gray-600">
                      {log.userName} · {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {recentLogs.length > 0 && (
            <Link
              href={ADMIN_ROUTES.LOGS}
              className="block text-center text-[10px] text-gray-500 hover:text-white mt-3 font-medium transition-colors"
            >
              View all activity →
            </Link>
          )}
        </motion.div>
      </div>
    </div>
  );
}
