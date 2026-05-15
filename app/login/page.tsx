"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { Mail, Lock, ArrowRight, Sparkles, ShieldCheck, Zap, Globe, GitFork } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dev-resource-hub/`,
      },
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Magic link sent to your email!" });
    }
    setLoading(false);
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/dev-resource-hub/`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
        {/* Left Side: Branding */}
        <div className="flex-1 space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 badge badge-blue">
            <ShieldCheck size={12} /> Secure Authentication
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
            Unlock the <br />
            <span className="gradient-text-hero">Full Ecosystem</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
            Sign in to sync your bookmarks, participate in the community, and track your learning progress across all devices.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {[
              { title: "Cloud Sync", desc: "Access bookmarks anywhere", icon: Globe },
              { title: "Contributor XP", desc: "Gain rank on leaderboard", icon: Sparkles },
              { title: "Early Access", desc: "Test new agents first", icon: Zap },
              { title: "Personal Path", desc: "Track learning progress", icon: ArrowRight },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="font-bold text-sm">{item.title}</div>
                  <div className="text-xs text-gray-500">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full lg:w-[450px] animate-fade-in-scale">
          <div className="p-8 md:p-10 rounded-[2.5rem] glass border border-white/10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] -z-10" />
            
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black">Welcome Back</h2>
              <p className="text-sm text-gray-500">Choose your preferred login method</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleGithubLogin}
                className="w-full py-4 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95"
              >
                <GitFork size={20} /> Continue with GitHub
              </button>
              
              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">or email</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input 
                      type="email" 
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-12 py-4 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-500 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? "Sending link..." : "Send Magic Link"} <ArrowRight size={18} />
                </button>
              </form>

              {message && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-center text-xs font-bold ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                >
                  {message.text}
                </motion.div>
              )}
            </div>

            <p className="text-[10px] text-gray-500 text-center leading-relaxed">
              By continuing, you agree to our <Link href="/docs" className="text-white hover:underline">Terms of Service</Link> and <Link href="/docs" className="text-white hover:underline">Privacy Policy</Link>.
            </p>
          </div>

          <div className="mt-8 text-center">
             <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2">
               <ArrowRight size={14} className="rotate-180" /> Back to Home
             </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
