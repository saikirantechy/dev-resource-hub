"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles, Send } from "lucide-react";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 2500);
    setEmail("");
  };

  return (
    <section className="px-4 sm:px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] glass-strong border border-white/10 p-10 md:p-14 text-center"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-cyan-500/5 animate-gradient" />

          <div className="relative space-y-7">
            <div className="inline-flex w-14 h-14 rounded-2xl bg-white/5 border border-white/10 items-center justify-center mx-auto animate-float">
              <Mail size={22} className="text-orange-300" />
            </div>

            <div className="space-y-3">
              <div className="badge badge-emerald inline-flex"><Sparkles size={11} /> Newsletter</div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
                Get AI prompt engineering{" "}
                <span className="gradient-text-prompt">updates weekly</span>.
              </h2>
              <p className="text-gray-400 max-w-md mx-auto">
                New optimization patterns, model-specific tips, and benchmarks —
                delivered every Tuesday.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@dev.studio"
                className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-orange-400/50 transition-all placeholder:text-gray-600"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-black text-sm uppercase tracking-widest bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 text-white hover:scale-[1.02] transition-transform"
              >
                {subscribed ? "Subscribed" : "Subscribe"}
                <Send size={14} />
              </button>
            </form>

            <p className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-600">
              Join 25,000+ developers · No spam · Unsubscribe anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
