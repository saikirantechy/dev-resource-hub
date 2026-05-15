"use client";

import Navbar from "@/components/Navbar";
import { 
  Users, Trophy, MessageSquare, Heart, Star, GitFork, 
  Globe, Github, Twitter, Award, Zap, TrendingUp,
  Share2, ShieldCheck, Sparkles
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const topContributors = [
  { name: "Sai Kiran BK", role: "Maintainer", avatar: "SK", stats: { commits: 124, resources: 45, likes: "1.2k" }, rank: 1, color: "blue" },
  { name: "Alex Rivera", role: "Core Builder", avatar: "AR", stats: { commits: 82, resources: 12, likes: "850" }, rank: 2, color: "purple" },
  { name: "Sarah Chen", role: "AI Researcher", avatar: "SC", stats: { commits: 56, resources: 28, likes: "2.1k" }, rank: 3, color: "emerald" },
  { name: "James Wilson", role: "Prompt Engineer", avatar: "JW", stats: { commits: 45, resources: 8, likes: "420" }, rank: 4, color: "orange" },
];

const feedItems = [
  { user: "Sarah Chen", action: "submitted a new Agent", target: "Devin-v2", time: "2h ago", type: "submission" },
  { user: "Alex Rivera", action: "bookmarked", target: "AI UI Mastery Path", time: "4h ago", type: "bookmark" },
  { user: "James Wilson", action: "starred", target: "Elite System Prompt", time: "5h ago", type: "star" },
  { user: "Sai Kiran BK", action: "updated the", target: "Ecosystem Roadmap", time: "1d ago", type: "update" },
];

export default function CommunityClient() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-24">
        {/* Header */}
        <header className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-indigo">
             <Users size={12} /> Community Hub
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight">
            Built by <span className="gradient-text-hero">Builders</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join 10,000+ developers, AI engineers, and prompt engineers building the future of the ecosystem.
          </p>
          <div className="flex justify-center gap-4 pt-4">
             <Link href="https://github.com/saikirantechy/dev-resource-hub" target="_blank" className="btn-primary px-8 py-4 rounded-2xl flex items-center gap-2">
               <GitFork size={18} /> Join on GitHub
             </Link>
             <button className="btn-secondary px-8 py-4 rounded-2xl flex items-center gap-2">
               <MessageSquare size={18} /> Join Discord
             </button>
          </div>
        </header>

        {/* Top Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Community Members", value: "10k+", icon: Users, color: "blue" },
            { label: "Total Contributions", value: "2.5k", icon: Award, color: "purple" },
            { label: "AI Resources", value: "850+", icon: Zap, color: "emerald" },
            { label: "Monthly Visits", value: "150k", icon: TrendingUp, color: "orange" },
          ].map((stat, i) => (
            <div key={stat.label} className="p-6 rounded-3xl glass border border-white/5 space-y-4 text-center group card-hover">
               <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}>
                 <stat.icon className={`text-${stat.color}-400`} size={20} />
               </div>
               <div>
                 <div className="text-2xl font-black">{stat.value}</div>
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.label}</div>
               </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contributor Leaderboard */}
          <section className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black flex items-center gap-3">
                <Trophy size={24} className="text-yellow-500" /> Leaderboard
              </h2>
              <div className="badge badge-blue">Last 30 Days</div>
            </div>

            <div className="space-y-4">
              {topContributors.map((user, i) => (
                <motion.div
                  key={user.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-[2rem] glass border border-white/8 flex items-center gap-6 hover:border-blue-500/30 transition-all group"
                >
                  <div className="text-xl font-black text-gray-600 w-8">{user.rank}</div>
                  <div className={`w-14 h-14 rounded-2xl bg-${user.color}-500/10 border border-${user.color}-500/20 flex items-center justify-center text-xl font-black text-${user.color}-400 flex-shrink-0`}>
                    {user.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold group-hover:text-blue-300 transition-colors">{user.name}</h3>
                    <div className="text-xs text-gray-500">{user.role}</div>
                  </div>
                  <div className="hidden md:flex gap-8 text-center">
                    <div>
                      <div className="text-sm font-black">{user.stats.commits}</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase">Commits</div>
                    </div>
                    <div>
                      <div className="text-sm font-black">{user.stats.resources}</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase">Resources</div>
                    </div>
                    <div>
                      <div className="text-sm font-black text-pink-400">{user.stats.likes}</div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase">Likes</div>
                    </div>
                  </div>
                  <div className="ml-4 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <Github size={18} className="text-gray-500 hover:text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button className="w-full py-4 rounded-2xl border border-white/5 text-sm font-bold text-gray-500 hover:bg-white/5 hover:text-white transition-all">
              View All Contributors
            </button>
          </section>

          {/* Activity Feed */}
          <section className="space-y-8">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <TrendingUp size={24} className="text-blue-400" /> Activity
            </h2>
            
            <div className="relative space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-white/5">
              {feedItems.map((item, i) => (
                <div key={i} className="relative flex gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="w-10 h-10 rounded-full bg-[#050508] border border-white/10 flex items-center justify-center z-10">
                     {item.type === 'submission' ? <Zap size={14} className="text-emerald-400" /> : 
                      item.type === 'star' ? <Star size={14} className="text-yellow-400" /> :
                      item.type === 'bookmark' ? <Heart size={14} className="text-pink-400" /> :
                      <Sparkles size={14} className="text-blue-400" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-gray-300">
                      <span className="text-white font-bold">{item.user}</span> {item.action} <span className="text-blue-400 font-medium">{item.target}</span>
                    </p>
                    <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl glass border border-purple-500/20 space-y-4">
               <ShieldCheck size={32} className="text-purple-400" />
               <h3 className="text-xl font-bold">Contributor Program</h3>
               <p className="text-sm text-gray-400 leading-relaxed">
                 Active contributors get exclusive early access to AI tools, private Discord channels, and limited edition swag.
               </p>
               <Link href="/docs" className="flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300">
                 Read Guidelines <ArrowRight size={12} />
               </Link>
            </div>
          </section>
        </div>

        {/* Newsletter Section */}
        <section className="relative p-12 md:p-24 rounded-[3rem] glass border border-white/10 overflow-hidden text-center">
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 via-transparent to-purple-600/5" />
           <div className="relative z-10 max-w-2xl mx-auto space-y-10">
              <div className="space-y-4">
                 <h2 className="text-4xl md:text-6xl font-black tracking-tight">The Ecosystem <span className="gradient-text-blue">Digest</span></h2>
                 <p className="text-gray-400 text-lg">Join 15k+ developers receiving weekly updates on the best agents, tools, and prompts.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                 <input 
                   type="email" 
                   placeholder="Enter your email" 
                   className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all"
                 />
                 <button className="btn-primary px-10 py-4 rounded-2xl whitespace-nowrap">Subscribe Now</button>
              </div>
              <div className="flex items-center justify-center gap-6 pt-4 text-gray-500">
                 <Link href="#" className="hover:text-white transition-colors"><Github size={20} /></Link>
                 <Link href="#" className="hover:text-white transition-colors"><Twitter size={20} /></Link>
                 <Link href="#" className="hover:text-white transition-colors"><Globe size={20} /></Link>
                 <Link href="#" className="hover:text-white transition-colors"><Share2 size={20} /></Link>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}
