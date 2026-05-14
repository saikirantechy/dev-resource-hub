"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] -z-10" />
      
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative p-16 md:p-24 rounded-[3.5rem] bg-emerald-500/[0.03] border border-emerald-500/20 text-center space-y-10 overflow-hidden shadow-2xl"
        >
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b98105_1px,transparent_1px),linear-gradient(to_bottom,#10b98105_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
          
          <div className="space-y-6 relative z-10">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4"
            >
              <Sparkles size={32} />
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              The Future of the Web is <span className="text-emerald-400">Autonomous</span>.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Join 10,000+ developers building the next generation of browser-native AI agents. 
              Start your autonomous journey today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
            <Link 
              href="#"
              className="px-10 py-5 bg-emerald-500 text-black font-black rounded-2xl flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)]"
            >
              Get Web Agent Core <ArrowRight size={20} />
            </Link>
            <Link 
              href="/submit"
              className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md"
            >
              Become a Contributor
            </Link>
          </div>
          
          <div className="pt-12 text-[10px] text-gray-600 uppercase font-bold tracking-[0.3em] relative z-10">
            Proudly Open Source • 5,000+ GitHub Stars • MIT Licensed
          </div>
        </motion.div>
      </div>
    </section>
  );
}
