import Navbar from "@/components/Navbar";
import { Users, MessageSquare, Trophy, Github } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Navbar />
      
      <main className="py-24 px-6 max-w-5xl mx-auto space-y-16">
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <Users size={14} /> Global Ecosystem
          </div>
          <h1 className="text-5xl font-black tracking-tight">Join the Community</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Connect with AI builders, share your workflows, and help shape the future of development.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Discord Card */}
          <div className="p-8 rounded-[2rem] bg-[#5865F2]/10 border border-[#5865F2]/30 hover:border-[#5865F2]/50 transition-colors flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-[#5865F2]/20 text-[#5865F2]">
              <MessageSquare size={32} />
            </div>
            <h2 className="text-2xl font-bold">Discord Server</h2>
            <p className="text-gray-400 text-sm">Join real-time discussions, ask questions, and collaborate on open-source AI projects.</p>
            <button className="mt-4 px-6 py-3 bg-[#5865F2] text-white font-bold rounded-xl w-full hover:bg-[#4752C4] transition-colors">
              Join Discord
            </button>
          </div>

          {/* GitHub Discussions Card */}
          <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-white/30 transition-colors flex flex-col items-center text-center space-y-4">
            <div className="p-4 rounded-2xl bg-white/10 text-white">
              <Github size={32} />
            </div>
            <h2 className="text-2xl font-bold">GitHub Discussions</h2>
            <p className="text-gray-400 text-sm">Propose features, report bugs, and read our comprehensive open-source documentation.</p>
            <Link href="https://github.com/saikirantechy/dev-resource-hub/discussions" className="mt-4 px-6 py-3 bg-white/10 text-white border border-white/10 font-bold rounded-xl w-full hover:bg-white/20 transition-colors">
              View Discussions
            </Link>
          </div>
        </div>

        {/* Leaderboard CTA */}
        <div className="p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-yellow-500">
              <Trophy size={24} />
              <h2 className="text-3xl font-bold text-white">Contributor Leaderboard</h2>
            </div>
            <p className="text-gray-400 max-w-md">We recognize and reward our top contributors. See who is making the biggest impact this month.</p>
          </div>
          <Link href="/contributors" className="px-8 py-4 bg-yellow-500 text-black font-bold rounded-xl hover:scale-105 transition-transform whitespace-nowrap">
            View Hall of Fame
          </Link>
        </div>
      </main>
    </div>
  );
}
