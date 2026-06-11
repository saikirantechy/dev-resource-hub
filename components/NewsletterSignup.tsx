"use client";

import { useState } from "react";
import { Mail, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/mrbeyqvw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative p-10 md:p-14 rounded-[3rem] glass border border-blue-500/20 text-center overflow-hidden w-full mx-auto max-w-4xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)] mt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />

      {/* Decorative dots grid */}
      <div className="absolute inset-0 bg-[url('/dev-resource-hub/noise.svg')] opacity-20 mix-blend-overlay"></div>

      <div className="relative z-10 flex flex-col items-center space-y-6">
        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 rotate-3">
          <Mail size={28} className="text-blue-400 -rotate-3" />
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            The AI Developer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Dispatch
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Get the latest workflow templates, prompt engineering tips, and
            trending open-source tools delivered every Tuesday.
          </p>
        </div>

        {status === "success" ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold"
          >
            <CheckCircle2 size={20} />
            You&apos;re on the list! Welcome to the ecosystem.
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@startup.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 px-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                disabled={status === "loading"}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="text-red-400 text-sm font-medium">
            Something went wrong. Please try again.
          </p>
        )}

        <div className="flex items-center gap-6 text-xs font-bold text-gray-500 uppercase tracking-widest pt-4">
          <span className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-yellow-400" /> No Spam
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-blue-400" /> 10k+ Devs
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Sparkles size={12} className="text-purple-400" /> Weekly Insights
          </span>
        </div>
      </div>
    </div>
  );
}
