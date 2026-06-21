"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Sparkles, Bot, Target,
  Star, TrendingUp, Rocket,
  Zap, Users, Award,
  FileText, CheckCircle, GraduationCap, Globe, Brain, Bug,
} from "lucide-react";
import Link from "next/link";

const experienceLevels = [
  { id: "beginner", label: "Beginner", desc: "New to open source", icon: Star, color: "emerald" },
  { id: "intermediate", label: "Intermediate", desc: "Some contributions", icon: TrendingUp, color: "blue" },
  { id: "advanced", label: "Advanced", desc: "Experienced contributor", icon: Award, color: "purple" },
];

const goals = [
  { id: "first-pr", label: "First PR", desc: "Make my first contribution", emoji: "🎯" },
  { id: "gsoc", label: "GSoC Prep", desc: "Prepare for GSoC", emoji: "🎓" },
  { id: "portfolio", label: "Portfolio", desc: "Build my portfolio", emoji: "📂" },
  { id: "career", label: "Career", desc: "Grow my career", emoji: "🚀" },
  { id: "hacktoberfest", label: "Hacktoberfest", desc: "Complete Hacktoberfest", emoji: "🎃" },
  { id: "maintainer", label: "Become Maintainer", desc: "Start maintaining", emoji: "👑" },
];

const roadmapSteps = [
  { level: "Beginner", steps: ["Learn Git basics", "Find good first issues", "Fix documentation", "Submit your first PR", "Get your first merge"], icon: Star, color: "emerald" },
  { level: "Intermediate", steps: ["Contribute to features", "Write tests", "Review others' PRs", "Join community discussions", "Mentor beginners"], icon: TrendingUp, color: "blue" },
  { level: "Advanced", steps: ["Lead feature development", "Become a maintainer", "Write project RFCs", "Speak at conferences", "Start your own project"], icon: Award, color: "purple" },
];

export default function AIContributionCoachPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [coachResponse, setCoachResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = () => {
    setLoading(true);
    setTimeout(() => {
      const level = experienceLevels.find(l => l.id === selectedLevel);
      const goal = goals.find(g => g.id === selectedGoal);
      setCoachResponse(
        `**Personalized Contribution Roadmap**\n\n` +
        `Based on your profile (${level?.label || "any level"}) and goal (${goal?.label || "general contribution"}), here's your AI-powered plan:\n\n` +
        `**Week 1-2:** Start with good first issues in your preferred language. Focus on documentation and small bug fixes.\n\n` +
        `**Week 3-4:** Build familiarity with the codebase. Comment on issues, ask questions, and submit your first small PR.\n\n` +
        `**Month 2:** Tackle intermediate issues. Write tests, improve error handling, and start reviewing others' PRs.\n\n` +
        `**Month 3:** Take on feature development. Work with maintainers on larger features and improvements.\n\n` +
        `**Long-term:** ${selectedGoal === "gsoc" ? "Apply for GSoC with your contribution history as proof of capability." : selectedGoal === "career" ? "Build a portfolio of contributions that showcases your skills to potential employers." : "Continue building your open-source presence and mentor new contributors."}`
      );
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
          {/* Hero */}
          <div className="text-center space-y-6">
            <div className="badge badge-purple inline-flex"><Bot size={11} /> AI Contribution Coach</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              AI <span className="gradient-text-hero">Contribution Coach</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              Get a personalized open-source contribution roadmap powered by AI. Tell us about your experience and goals.
            </p>
          </div>

          {/* Step 1: Experience Level */}
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="badge badge-blue inline-flex"><Target size={11} /> Step 1</div>
              <h2 className="text-3xl font-black">What&apos;s Your Experience Level?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {experienceLevels.map((level) => (
                <button key={level.id} onClick={() => setSelectedLevel(level.id)}
                  className={`p-6 rounded-2xl text-left border transition-all ${
                    selectedLevel === level.id
                      ? (level.id === 'beginner' ? 'bg-emerald-500/10 border-emerald-500/30' : level.id === 'intermediate' ? 'bg-blue-500/10 border-blue-500/30' : 'bg-purple-500/10 border-purple-500/30')
                      : "glass border-white/8 hover:border-white/20"
                  }`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                    level.id === 'beginner' ? 'from-emerald-500/20 to-emerald-500/10' : level.id === 'intermediate' ? 'from-blue-500/20 to-blue-500/10' : 'from-purple-500/20 to-purple-500/10'
                  } flex items-center justify-center mb-3`}>
                    <level.icon size={18} className={`${level.id === 'beginner' ? 'text-emerald-400' : level.id === 'intermediate' ? 'text-blue-400' : 'text-purple-400'}`} />
                  </div>
                  <h3 className="font-bold text-white mb-1">{level.label}</h3>
                  <p className="text-xs text-gray-400">{level.desc}</p>
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: Goal */}
          <section className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="badge badge-emerald inline-flex"><Rocket size={11} /> Step 2</div>
              <h2 className="text-3xl font-black">What&apos;s Your Goal?</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {goals.map((goal) => (
                <button key={goal.id} onClick={() => setSelectedGoal(goal.id)}
                  className={`p-4 rounded-xl border text-center transition-all ${
                    selectedGoal === goal.id
                      ? "bg-emerald-500/10 border-emerald-500/30"
                      : "glass border-white/8 hover:border-white/20"
                  }`}>
                  <span className="text-2xl block mb-1">{goal.emoji}</span>
                  <h3 className="font-bold text-xs text-white">{goal.label}</h3>
                  <p className="text-[9px] text-gray-400 mt-1">{goal.desc}</p>
                </button>
              ))}
            </div>

            <div className="text-center">
              <button onClick={generateRoadmap} disabled={!selectedGoal || loading}
                className={`btn-primary px-10 py-5 rounded-2xl text-base ${
                  !selectedGoal ? "opacity-50 cursor-not-allowed" : ""
                }`}>
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Zap size={18} className="animate-spin" /> Generating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles size={18} /> Generate My Roadmap
                  </span>
                )}
              </button>
            </div>
          </section>

          {/* AI Response */}
          {coachResponse && (
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto">
              <div className="p-8 rounded-[2rem] glass border border-purple-500/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[80px] rounded-full" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <Bot size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">AI Coach Response</h3>
                      <p className="text-xs text-gray-400">Personalized for you</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                    {coachResponse}
                  </div>
                  <div className="flex gap-3 pt-4 border-t border-white/5">
                    <button onClick={generateRoadmap} className="btn-secondary px-5 py-3 rounded-xl text-xs">
                      <Zap size={14} /> Regenerate
                    </button>
                    <button className="px-5 py-3 rounded-xl border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all">
                      <FileText size={14} /> Save Roadmap
                    </button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}

          {/* Roadmap View */}
          <section className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="badge badge-amber inline-flex"><GraduationCap size={11} /> Career Paths</div>
              <h2 className="text-3xl font-black">Contribution Roadmaps</h2>
              <p className="text-gray-500">Your journey from beginner to open-source champion.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roadmapSteps.map((roadmap) => (
                <div key={roadmap.level} className="p-6 rounded-2xl glass border border-white/8 hover:border-white/20 transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                    roadmap.level === 'Beginner' ? 'from-emerald-500/20 to-emerald-500/10' : roadmap.level === 'Intermediate' ? 'from-blue-500/20 to-blue-500/10' : 'from-purple-500/20 to-purple-500/10'
                  } flex items-center justify-center mb-3`}>
                    <roadmap.icon size={18} className={`${roadmap.level === 'Beginner' ? 'text-emerald-400' : roadmap.level === 'Intermediate' ? 'text-blue-400' : 'text-purple-400'}`} />
                  </div>
                  <h3 className="font-bold text-white mb-3">{roadmap.level}</h3>
                  <div className="space-y-2">
                    {roadmap.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle size={12} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-400">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="max-w-4xl mx-auto space-y-8 pt-8 border-t border-white/5">
            <div className="text-center space-y-3">
              <div className="badge badge-purple inline-flex"><Sparkles size={11} /> AI Features</div>
              <h2 className="text-3xl font-black">More AI-Powered Tools</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Brain, title: "Skill Gap Analysis", desc: "Identify what skills you need to reach the next level" },
                { icon: Target, title: "Issue Matcher", desc: "Find issues perfectly matching your skill level" },
                { icon: Users, title: "Team Matcher", desc: "Find project teams looking for contributors like you" },
                { icon: Globe, title: "Program Finder", desc: "Discover programs and internships for your profile" },
              ].map((feature, i) => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-xl glass border border-white/8 hover:border-purple-500/30 transition-all text-center">
                  <feature.icon size={20} className="text-purple-400 mx-auto mb-2" />
                  <h3 className="text-xs font-bold text-white">{feature.title}</h3>
                  <p className="text-[10px] text-gray-400 mt-1">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 pt-8">
            <p className="text-gray-500">Ready to start your open-source journey?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/issues?difficulty=good-first-issue" className="btn-primary px-8 py-4 rounded-xl">
                <Bug size={18} /> Find Beginner Issues
              </Link>
              <Link href="/opportunities" className="btn-secondary px-8 py-4 rounded-xl">
                <Globe size={18} /> Explore All
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
