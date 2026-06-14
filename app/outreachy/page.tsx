"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Sparkles, ArrowRight, Calendar, Users, Award, BookOpen,
  Globe, Star, CheckCircle, Clock, ExternalLink, Heart,
  Lightbulb, Target, Shield, GraduationCap, Bug, FileText,
} from "lucide-react";
import Link from "next/link";
import programs from "@/data/programs.json";

const outreachyProgram = programs.find(p => p.id === "outreachy-2026");

const prepSteps = [
  { step: 1, title: "Understand the Program", desc: "Read Outreachy guidelines, past projects, and community expectations thoroughly." },
  { step: 2, title: "Choose a Community", desc: "Browse participating communities. Pick one whose mission and tech stack align with your interests." },
  { step: 3, title: "Engage Early", desc: "Introduce yourself on mailing lists, attend community meetings, and ask thoughtful questions." },
  { step: 4, title: "Contribute a Patch", desc: "Submit a small contribution (bug fix, docs improvement, small feature) to demonstrate your skills." },
  { step: 5, title: "Write Your Application", desc: "Craft a detailed proposal outlining your background, project plan, timeline, and commitment." },
  { step: 6, title: "Prepare for Internship", desc: "Once selected, set up your development environment, plan your schedule, and connect with your mentor." },
];

export default function OutreachyPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
          {/* Hero */}
          <div className="text-center space-y-6">
            <div className="badge badge-purple inline-flex"><Globe size={11} /> Outreachy Hub</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              Outreachy <span className="gradient-text-hero">Internships</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              Paid, remote internships for people from underrepresented groups in tech. Contribute to open source with experienced mentors.
            </p>
          </div>

          {/* Program Overview */}
          {outreachyProgram && (
            <section className="max-w-4xl mx-auto">
              <div className="p-8 rounded-[2rem] glass border border-purple-500/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black">{outreachyProgram.name}</h2>
                      <p className="text-gray-400 leading-relaxed">{outreachyProgram.description}</p>
                    </div>
                    <a href={outreachyProgram.url} target="_blank" rel="noopener noreferrer"
                      className="btn-primary px-6 py-3 rounded-xl text-sm whitespace-nowrap shrink-0 bg-gradient-to-r from-purple-600 to-pink-600">
                      Official Site <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">{(outreachyProgram?.stats?.totalInterns || 0)}+</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Interns</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">{(outreachyProgram?.stats?.totalCommunities || 0)}+</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Communities</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">{outreachyProgram?.stats?.successRate || 'N/A'}</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Success Rate</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">$7,000</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Stipend</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={14} className="text-purple-400" /> Applications: {outreachyProgram.timeline.applications}</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-purple-400" /> {outreachyProgram.timeline.projectsStart} - {outreachyProgram.timeline.projectsEnd}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {outreachyProgram.benefits.map((b) => (
                      <span key={b} className="badge badge-emerald text-[8px]"><CheckCircle size={7} /> {b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Preparation Plan */}
          <section className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="badge badge-blue inline-flex"><BookOpen size={11} /> Preparation Plan</div>
              <h2 className="text-3xl font-black">Your Outreachy Journey</h2>
              <p className="text-gray-500">Follow these steps to prepare a successful application.</p>
            </div>

            <div className="space-y-4">
              {prepSteps.map((step) => (
                <motion.div key={step.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="flex gap-4 p-5 rounded-xl glass border border-white/8 hover:border-purple-500/30 transition-all">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 font-black text-purple-400 shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* AI Features */}
          <section className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="badge badge-purple inline-flex"><Sparkles size={11} /> AI-Powered</div>
              <h2 className="text-3xl font-black">AI Outreachy Assistant</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl glass border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-3">
                  <FileText size={18} className="text-purple-400" />
                </div>
                <h3 className="font-bold mb-2">Application Review</h3>
                <p className="text-sm text-gray-400">Get AI feedback on your Outreachy application before submitting.</p>
              </div>

              <div className="p-6 rounded-2xl glass border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-3">
                  <Target size={18} className="text-emerald-400" />
                </div>
                <h3 className="font-bold mb-2">Readiness Assessment</h3>
                <p className="text-sm text-gray-400">Evaluate your preparation level and get personalized recommendations.</p>
              </div>

              <div className="p-6 rounded-2xl glass border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center mb-3">
                  <Lightbulb size={18} className="text-blue-400" />
                </div>
                <h3 className="font-bold mb-2">Personalized Plan</h3>
                <p className="text-sm text-gray-400">Generate a custom preparation timeline based on your background.</p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 pt-8">
            <p className="text-gray-500">Ready to apply for Outreachy?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={outreachyProgram?.url || "#"} target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600">
                <ExternalLink size={18} /> Apply Now
              </a>
              <Link href="/issues?difficulty=good-first-issue" className="btn-secondary px-8 py-4 rounded-xl">
                <Bug size={18} /> Practice First
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
