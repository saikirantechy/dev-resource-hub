"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/tokencalc/Hero";
import Calculator from "@/components/tokencalc/Calculator";
import Tips from "@/components/tokencalc/Tips";
import Footer from "@/components/promptoptimizer/Footer";

export default function TokenCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">
      <style>{`
        .gradient-text-calc {
          background: linear-gradient(135deg, #34d399 0%, #60a5fa 45%, #a78bfa 100%);
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
        <Hero />
        <Calculator />
        <Tips />
      </main>

      <Footer />
    </div>
  );
}
