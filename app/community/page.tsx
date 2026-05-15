import CommunityClient from "./CommunityClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Hub | Dev Resource Hub",
  description: "Join the largest AI developer ecosystem. Connect with builders, contribute to open-source agents, and join the leaderboard.",
  openGraph: {
    title: "AI Developer Community Hub",
    description: "Built by builders, for builders. Join the AI ecosystem.",
  },
};

export default function CommunityPage() {
  return <CommunityClient />;
}
