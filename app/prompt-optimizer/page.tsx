"use client";

import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/promptoptimizer/Hero";
import OptimizerCard from "@/components/promptoptimizer/OptimizerCard";
import TokenStats from "@/components/promptoptimizer/TokenStats";
import PromptAnalysis from "@/components/promptoptimizer/PromptAnalysis";
import FeatureGrid from "@/components/promptoptimizer/FeatureGrid";
import LiveDemo from "@/components/promptoptimizer/LiveDemo";
import Pricing from "@/components/promptoptimizer/Pricing";
import FAQ from "@/components/promptoptimizer/FAQ";
import Newsletter from "@/components/promptoptimizer/Newsletter";
import Footer from "@/components/promptoptimizer/Footer";
import { SAMPLE_PROMPT, optimize } from "@/lib/promptOptimizer";

export default function PromptOptimizerPage() {
  const [input, setInput] = useState(SAMPLE_PROMPT);
  const [optimized, setOptimized] = useState(optimize(SAMPLE_PROMPT, "concise"));

  const handleResult = useCallback(
    (nextInput: string, nextOptimized: string) => {
      setInput(nextInput);
      setOptimized(nextOptimized);
    },
    []
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">
      {/* Page-level extra styles: hero gradient text + gradient mesh */}
      <style>{`
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
        <div id="optimize">
          <OptimizerCard onResult={handleResult} />
        </div>
        <TokenStats input={input} optimized={optimized} />
        <PromptAnalysis input={input} optimized={optimized} />
        <LiveDemo />
        <FeatureGrid />
        <Pricing />
        <FAQ />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
}
