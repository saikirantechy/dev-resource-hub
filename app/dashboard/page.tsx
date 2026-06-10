"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/promptoptimizer/Footer";
import DashboardHero from "@/components/dashboard/DashboardHero";
import QuickActions from "@/components/dashboard/QuickActions";
import AssistantPanel from "@/components/dashboard/AssistantPanel";
import TrendingTools from "@/components/dashboard/TrendingTools";
import AIWidgets from "@/components/dashboard/AIWidgets";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import AgentsPanel from "@/components/dashboard/AgentsPanel";
import Analytics from "@/components/dashboard/Analytics";
import CommunityShowcase from "@/components/dashboard/CommunityShowcase";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user } = useAuth();
  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.email ? user.email.split("@")[0] : null);

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">
      <style>{`
        .gradient-text-dash {
          background: linear-gradient(135deg, #34d399 0%, #22d3ee 45%, #a78bfa 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 6s ease infinite;
        }
        .gradient-text-prompt {
          background: linear-gradient(135deg, #fb923c 0%, #ec4899 45%, #22d3ee 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 6s ease infinite;
        }
        .glass-dark {
          background: rgba(5, 5, 8, 0.6);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
      `}</style>

      <div className="gradient-mesh" />
      <Navbar />

      <main className="relative">
        <DashboardHero userName={displayName} />

        {/* Top working area: actions + assistant */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4">
            <QuickActions />
            <AssistantPanel />
          </div>
        </section>

        <TrendingTools />
        <AIWidgets />

        {/* Activity + Agents */}
        <section className="px-4 sm:px-6 pb-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ActivityFeed />
            <AgentsPanel />
          </div>
        </section>

        <Analytics />
        <CommunityShowcase />
      </main>

      <Footer />
    </div>
  );
}
