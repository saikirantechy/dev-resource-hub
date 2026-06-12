"use client";

import { motion } from "framer-motion";
import {
  Users,
  GitCommit,
  Building2,
  Workflow,
  Wrench,
  FileText,
  Terminal,
  Rocket,
  TrendingUp,
} from "lucide-react";

interface Stat {
  value: number;
  delta: string;
}

interface StatsDashboardProps {
  statistics: Record<string, Stat>;
}

const STAT_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    gradient: string;
  }
> = {
  activeBuilders: {
    label: "Active Builders",
    icon: Users,
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
  contributors: {
    label: "Contributors",
    icon: GitCommit,
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  communities: {
    label: "Communities",
    icon: Building2,
    color: "text-purple-400",
    gradient: "from-purple-500/20 to-pink-500/10",
  },
  workflows: {
    label: "Workflows",
    icon: Workflow,
    color: "text-cyan-400",
    gradient: "from-cyan-500/20 to-blue-500/10",
  },
  aiTools: {
    label: "AI Tools",
    icon: Wrench,
    color: "text-orange-400",
    gradient: "from-orange-500/20 to-red-500/10",
  },
  blogPosts: {
    label: "Blog Posts",
    icon: FileText,
    color: "text-yellow-400",
    gradient: "from-yellow-500/20 to-orange-500/10",
  },
  prompts: {
    label: "Prompts",
    icon: Terminal,
    color: "text-pink-400",
    gradient: "from-pink-500/20 to-rose-500/10",
  },
  startups: {
    label: "Startups",
    icon: Rocket,
    color: "text-violet-400",
    gradient: "from-violet-500/20 to-purple-500/10",
  },
};

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "k";
  }
  return num.toString();
}

export default function StatsDashboard({ statistics }: StatsDashboardProps) {
  const entries = Object.entries(statistics);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {entries.map(([key, stat], i) => {
        const config = STAT_CONFIG[key];
        if (!config) return null;
        const Icon = config.icon;
        const isPositive = stat.delta.startsWith("+");

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="relative rounded-2xl glass border border-white/8 p-4 hover:border-white/20 transition-all group overflow-hidden"
          >
            {/* Gradient accent */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon size={14} className={config.color} />
                  <span className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                    {config.label}
                  </span>
                </div>
                <span
                  className={`flex items-center gap-0.5 text-[9px] font-bold ${
                    isPositive ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  <TrendingUp size={10} />
                  {stat.delta}
                </span>
              </div>

              <div className={`text-2xl md:text-3xl font-black tabular-nums ${config.color}`}>
                {formatNumber(stat.value)}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
