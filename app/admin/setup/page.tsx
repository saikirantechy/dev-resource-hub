"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Check, ArrowRight, ArrowLeft, Sparkles, Crown } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import { createSuperAdmin } from "@/lib/admin/storage";
import { ADMIN_ROUTES } from "@/lib/admin/constants";

const STEPS = [
  { id: "welcome", title: "Welcome", icon: Sparkles },
  { id: "account", title: "Create Account", icon: User },
  { id: "complete", title: "Complete", icon: Crown },
];

export default function AdminSetupPage() {
  const router = useRouter();
  const { isSetupDone, isLoggedIn, loading } = useAdmin();
  const [step, setStep] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (isSetupDone && isLoggedIn) {
      router.replace(ADMIN_ROUTES.DASHBOARD);
    }
  }, [loading, isSetupDone, isLoggedIn, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const handleCreateAccount = async () => {
    setError(null);

    if (!username.trim() || !email.trim() || !displayName.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    setSubmitting(true);
    try {
      createSuperAdmin(username, email, displayName, password);
      setStep(2);
    } catch {
      setError("Failed to create admin account. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="gradient-mesh" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-8">
            ← Back to Site
          </Link>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
            <Crown size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Admin Setup</h1>
          <p className="text-gray-500 text-sm mt-2">Create your Super Admin account to get started</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i <= step
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
                    : "bg-white/5 text-gray-500"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:inline ${i <= step ? "text-white" : "text-gray-600"}`}>
                {s.title}
              </span>
              {i < STEPS.length - 1 && (
                <div className={`w-12 h-px ${i < step ? "bg-blue-500/50" : "bg-white/10"}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 rounded-[2rem] glass border border-white/10 space-y-6"
            >
              <div className="text-center space-y-4">
                <Sparkles size={48} className="text-amber-400 mx-auto" />
                <h2 className="text-2xl font-black">Welcome to Your Admin Panel</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  This setup wizard will create your <span className="text-amber-400 font-bold">Super Admin</span> account — 
                  the highest level of access. You&apos;ll be able to manage users, content, settings, 
                  and every module of the Dev Resource Hub.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { title: "Full Platform Control", desc: "Manage all users, content, and settings from one place" },
                  { title: "Role-Based Access", desc: "Assign roles to team members with granular permissions" },
                  { title: "Content Management", desc: "Create, edit, and publish blogs, docs, and resources" },
                  { title: "Activity Logging", desc: "Every action is tracked for security and accountability" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                    <Check size={14} className="text-emerald-400 mt-1 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-bold">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black hover:from-blue-500 hover:to-purple-500 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Get Started <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="account"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 rounded-[2rem] glass border border-white/10 space-y-6"
            >
              <div className="text-center">
                <h2 className="text-xl font-black">Create Super Admin Account</h2>
                <p className="text-gray-500 text-xs mt-1">This account will have full access to the platform</p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 font-medium">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)}
                      placeholder="e.g., admin" className="w-full px-11 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@company.com" className="w-full px-11 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input type="text" required value={displayName} onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g., Sai Kiran BK" className="w-full px-11 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min 8 chars" className="w-full px-11 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest ml-1">Confirm</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                      <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Repeat password" className="w-full px-11 py-3.5 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-all text-sm" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(0)}
                  className="px-6 py-4 rounded-2xl border border-white/10 text-sm font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
                  <ArrowLeft size={16} /> Back
                </button>
                <button onClick={handleCreateAccount} disabled={submitting}
                  className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black hover:from-blue-500 hover:to-purple-500 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting ? "Creating..." : "Create Admin Account"} <Crown size={18} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-[2rem] glass border border-white/10 space-y-6 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <Crown size={40} className="text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black">Setup Complete!</h2>
                <p className="text-gray-400 text-sm">
                  Your Super Admin account has been created. You now have full access to manage the Dev Resource Hub.
                </p>
              </div>

              <div className="space-y-2 text-left">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Check size={12} className="text-emerald-400" /> Secure admin panel with RBAC
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Check size={12} className="text-emerald-400" /> 17 management modules
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Check size={12} className="text-emerald-400" /> Full activity logging
                </div>
              </div>

              <button onClick={() => router.push(ADMIN_ROUTES.DASHBOARD)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black hover:from-blue-500 hover:to-purple-500 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                Go to Dashboard <ArrowRight size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
