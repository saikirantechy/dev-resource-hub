"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  GitFork,
  UserPlus,
  FileText,
  Terminal,
  Star,
  Zap,
  CheckCheck,
  GitPullRequest,
  Calendar,
  Bot,
  Share2,
  Users,
  BarChart3,
  MessageSquare,
  Trophy,
  Sparkles,
  Building2,
  Workflow,
  Languages,
  Hammer,
} from "lucide-react";

interface Activity {
  user: string;
  action: string;
  target: string;
  location: string;
  icon: string;
}

const ICON_MAP: Record<string, React.ElementType> = {
  workflow: Workflow,
  user: UserPlus,
  blog: FileText,
  prompt: Terminal,
  fork: GitFork,
  star: Star,
  plugin: Zap,
  check: CheckCheck,
  pr: GitPullRequest,
  event: Calendar,
  bot: Bot,
  share: Share2,
  community: Users,
  benchmark: BarChart3,
  review: MessageSquare,
  trophy: Trophy,
  optimize: Sparkles,
  startup: Building2,
  hook: GitFork,
  translate: Languages,
  build: Hammer,
};

const ICON_COLORS: Record<string, string> = {
  workflow: "text-emerald-400",
  user: "text-blue-400",
  blog: "text-yellow-400",
  prompt: "text-purple-400",
  fork: "text-cyan-400",
  star: "text-orange-400",
  plugin: "text-pink-400",
  check: "text-green-400",
  pr: "text-indigo-400",
  event: "text-rose-400",
  bot: "text-teal-400",
  share: "text-sky-400",
  community: "text-violet-400",
  benchmark: "text-amber-400",
  review: "text-gray-400",
  trophy: "text-yellow-500",
  optimize: "text-emerald-300",
  startup: "text-orange-300",
  hook: "text-cyan-300",
  translate: "text-blue-300",
  build: "text-white",
};

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const [visibleActivities, setVisibleActivities] = useState<Activity[]>(() => activities.slice(0, 5));
  const feedRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(5);

  // Simulate live feed: add new activity every 2-3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleActivities((prev) => {
        const next = activities[indexRef.current % activities.length];
        indexRef.current += 1;
        return [next, ...prev].slice(0, 12);
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [activities]);

  return (
    <div className="rounded-2xl glass border border-white/8 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-emerald-400" />
          <span className="text-sm font-bold text-white">Live Activity</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">
            LIVE
          </span>
        </div>
      </div>

      {/* Feed */}
      <div
        ref={feedRef}
        className="p-3 space-y-1 max-h-[320px] overflow-y-auto scrollbar-hide"
        aria-live="polite"
        aria-label="Live developer activity feed"
      >
        <AnimatePresence initial={false}>
          {visibleActivities.map((activity, i) => {
            const IconComponent = ICON_MAP[activity.icon] || Activity;
            const iconColor = ICON_COLORS[activity.icon] || "text-gray-400";
            return (
              <motion.div
                key={`${activity.user}-${activity.target}-${i}`}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 ${iconColor}`}
                >
                  <IconComponent size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs leading-relaxed">
                    <span className="text-white font-bold">{activity.user}</span>{" "}
                    <span className="text-gray-400">{activity.action}</span>{" "}
                    <span className="text-blue-400 font-medium">
                      {activity.target}
                    </span>
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">
                      {activity.location}
                    </span>
                    <span className="text-gray-700">•</span>
                    <span className="text-[9px] text-gray-600">just now</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-white/5 text-center">
        <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider">
          {activities.length}+ activities in the last hour
        </span>
      </div>
    </div>
  );
}
