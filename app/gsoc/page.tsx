"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Sparkles, ArrowRight, Calendar, Users, BookOpen,
  GraduationCap, Star, CheckCircle, Clock,
  ExternalLink, Lightbulb, FileText, Target, Bug,
  X, RefreshCw, Loader2, Brain,
  Zap, BarChart3, ListChecks,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import programs from "@/data/programs.json";

const gsocProgram = programs.find(p => p.id === "gsoc-2026");

const timelineSteps = [
  { phase: "Organization Applications", date: "January - February 2026", desc: "Mentoring organizations apply to participate in GSoC 2026.", status: "upcoming" },
  { phase: "Contributor Applications", date: "March - April 2026", desc: "Students and new contributors submit proposals to organizations.", status: "upcoming" },
  { phase: "Proposal Review", date: "April 2026", desc: "Organizations review proposals and select contributors.", status: "upcoming" },
  { phase: "Community Bonding", date: "May 2026", desc: "Selected contributors connect with mentors and prepare for the project.", status: "upcoming" },
  { phase: "Coding Period", date: "June - August 2026", desc: "12 weeks of coding, with mid-term and final evaluations.", status: "upcoming" },
  { phase: "Results & Celebrations", date: "September 2026", desc: "Successful projects are announced and celebrated.", status: "upcoming" },
];

const tips = [
  { icon: Lightbulb, title: "Start Early", desc: "Begin researching organizations and projects months before applications open. Contribute to their repos to get noticed." },
  { icon: FileText, title: "Write a Strong Proposal", desc: "Include your background, project understanding, timeline, and why you're the best fit. Be specific and realistic." },
  { icon: Target, title: "Contribute Before Applying", desc: "Fix a bug, improve docs, or add a small feature to the organization's repos. This shows commitment." },
  { icon: Users, title: "Engage with the Community", desc: "Join mailing lists, Discord servers, and community calls. Ask questions and show interest." },
];

// Mock GSoC organizations for matching
const mockOrgs = [
  { name: "Apache Software Foundation", tech: ["Java", "Python", "Big Data"], focus: ["Infrastructure", "Big Data", "Cloud"], difficulty: "Advanced" },
  { name: "Mozilla", tech: ["JavaScript", "Rust", "C++"], focus: ["Browser", "Privacy", "Web Standards"], difficulty: "Intermediate" },
  { name: "Python Software Foundation", tech: ["Python", "C", "Documentation"], focus: ["Language Tooling", "Data Science", "Web"], difficulty: "Beginner" },
  { name: "Blender Foundation", tech: ["C++", "Python", "3D Graphics"], focus: ["Graphics", "Animation", "Rendering"], difficulty: "Advanced" },
  { name: "KDE Community", tech: ["C++", "QML", "Qt"], focus: ["Desktop", "Mobile", "Design"], difficulty: "Intermediate" },
  { name: "Jupyter", tech: ["Python", "JavaScript", "TypeScript"], focus: ["Data Science", "Notebooks", "Visualization"], difficulty: "Intermediate" },
  { name: "Rails Girls", tech: ["Ruby", "JavaScript", "HTML/CSS"], focus: ["Web", "Education", "Community"], difficulty: "Beginner" },
  { name: "TensorFlow", tech: ["Python", "C++", "CUDA"], focus: ["ML/AI", "Deep Learning", "Research"], difficulty: "Advanced" },
  { name: "Node.js Foundation", tech: ["JavaScript", "C++", "TypeScript"], focus: ["Backend", "Tools", "Performance"], difficulty: "Intermediate" },
  { name: "React / Meta OSS", tech: ["JavaScript", "TypeScript", "Flow"], focus: ["UI", "Frontend", "Tools"], difficulty: "Intermediate" },
];

const readinessQuestions = [
  { id: 1, question: "How comfortable are you with Git and version control?", options: ["I'm a beginner", "I know the basics", "I'm confident", "I can teach others"] },
  { id: 2, question: "Have you contributed to an open-source project before?", options: ["Never", "Once or twice", "Multiple times", "I'm a regular contributor"] },
  { id: 3, question: "How would you rate your programming skills in your target language?", options: ["Beginner", "Intermediate", "Advanced", "Expert"] },
  { id: 4, question: "Have you written a project proposal or technical document before?", options: ["No", "Basic outline", "Detailed proposal", "Multiple proposals"] },
  { id: 5, question: "How familiar are you with the GSoC program and its requirements?", options: ["Not familiar", "Somewhat familiar", "Well informed", "I've read all the docs"] },
  { id: 6, question: "How much time can you commit daily for GSoC?", options: ["1-2 hours", "3-4 hours", "5-6 hours", "7+ hours"] },
];

// ─── MODAL WRAPPER ────────────────────────────────────────────────────

function Modal({ open, onClose, title, icon: Icon, color, children }: {
  open: boolean;
  onClose: () => void;
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-[2rem] glass-strong border border-white/10 p-6 sm:p-8"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              <X size={18} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{title}</h3>
                <p className="text-xs text-gray-500">AI-powered interactive demo</p>
              </div>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── PROPOSAL GENERATOR ────────────────────────────────────────────────

function ProposalGenerator({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [org, setOrg] = useState("");
  const [project, setProject] = useState("");
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<string | null>(null);

  const generateProposal = () => {
    if (!name || !skills || !org) return;
    setLoading(true);
    setTimeout(() => {
      setProposal(
        `# GSoC 2026 Proposal: ${project || "Open Source Contribution Project"}\n\n` +
        `**Applicant:** ${name}\n` +
        `**Organization:** ${org}\n` +
        `**Skills:** ${skills}\n` +
        `**Interests:** ${interests || "Open Source Development"}\n\n` +
        `## Abstract\n` +
        `This proposal outlines a comprehensive plan to contribute to ${org} through Google Summer of Code 2026. The project aims to deliver meaningful improvements to the ${org} ecosystem while fostering long-term community engagement.\n\n` +
        `## Background & Motivation\n` +
        `With a strong foundation in ${skills}, I am well-positioned to take on challenging tasks within ${org}'s codebase. My interest in ${interests || "open source development"} aligns perfectly with the organization's goals and community values.\n\n` +
        `## Project Goals\n` +
        `1. **Core Feature Implementation** — Design and implement the primary deliverable with clean, well-tested code\n` +
        `2. **Documentation & Testing** — Comprehensive documentation and test coverage for all new code\n` +
        `3. **Community Integration** — Regular communication with mentors, code reviews, and community engagement\n\n` +
        `## Technical Approach\n` +
        `- **Phase 1 (Weeks 1-3):** Codebase exploration, setup, and initial prototype\n` +
        `- **Phase 2 (Weeks 4-8):** Core implementation with iterative feedback from mentors\n` +
        `- **Phase 3 (Weeks 9-11):** Testing, optimization, and documentation\n` +
        `- **Phase 4 (Week 12):** Final submission, demo preparation, and handover\n\n` +
        `## Why Me?\n` +
        `I bring a unique combination of technical skills in ${skills}, a passion for ${interests || "open source"}, and a commitment to delivering high-quality work within the GSoC timeline. My previous experience demonstrates the ability to learn quickly, communicate effectively, and see projects through to completion.\n\n` +
        `## Timeline & Deliverables\n` +
        `| Week | Milestone | Deliverable |\n` +
        `|------|-----------|-------------|\n` +
        `| 1-2 | Onboarding & Setup | Dev environment, communication channels established |\n` +
        `| 3-4 | Prototype | MVP with core functionality working |\n` +
        `| 5-7 | Core Development | Feature-complete implementation |\n` +
        `| 8-9 | Testing & Polish | CI/CD, tests, performance optimization |\n` +
        `| 10-11 | Documentation | User docs, API docs, contribution guide |\n` +
        `| 12 | Final Submission | Demo video, final report, code handover |\n\n` +
        `---\n*Generated by Dev Resource Hub AI Proposal Generator — customize this draft with your specific project details.*`
      );
      setLoading(false);
    }, 2000);
  };

  const reset = () => {
    setName("");
    setSkills("");
    setInterests("");
    setOrg("");
    setProject("");
    setProposal(null);
  };

  return (
    <Modal open={open} onClose={onClose} title="AI Proposal Generator" icon={FileText} color="from-purple-500 to-blue-500">
      {!proposal ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Your Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-all text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Target Organization</label>
              <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="e.g., Python Software Foundation"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-all text-sm" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Your Skills (comma separated)</label>
            <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Python, Machine Learning, Git, Documentation"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-all text-sm" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Interests / Project Idea (optional)</label>
            <textarea value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g., Building developer tools, improving documentation, creating ML models..."
              rows={2} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-all text-sm resize-none" />
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Project Title (optional)</label>
            <input type="text" value={project} onChange={(e) => setProject(e.target.value)} placeholder="e.g., Building a Real-time ML Pipeline"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 transition-all text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={generateProposal} disabled={!name || !skills || !org || loading}
              className={`btn-primary flex-1 py-4 rounded-xl justify-center ${(!name || !skills || !org || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : <><Sparkles size={16} /> Generate Proposal</>}
            </button>
            <button onClick={onClose} className="px-6 py-4 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 max-h-80 overflow-y-auto">
            <pre className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">{proposal}</pre>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setProposal(null); setLoading(false); }}
              className="btn-primary flex-1 py-4 rounded-xl justify-center bg-gradient-to-r from-purple-600 to-blue-600">
              <RefreshCw size={16} /> Regenerate
            </button>
            <button onClick={reset} className="px-6 py-4 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-2">
              <X size={14} /> New Proposal
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ─── ORGANIZATION MATCHER ──────────────────────────────────────────────

const skillOptions = ["Python", "JavaScript", "TypeScript", "Java", "C++", "Rust", "Ruby", "Go", "HTML/CSS", "React", "Node.js", "Machine Learning", "Data Science", "DevOps", "Documentation", "UI/UX Design"];

function OrganizationMatcher({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState("intermediate");
  const [matched, setMatched] = useState(false);
  const [results, setResults] = useState<{ name: string; match: number; reason: string }[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]);
  };

  const findMatches = () => {
    if (selectedSkills.length === 0) return;
    const scored = mockOrgs.map(org => {
      const skillMatch = org.tech.filter(t => selectedSkills.some(s => t.toLowerCase().includes(s.toLowerCase()))).length;
      const totalTech = org.tech.length;
      const baseScore = totalTech > 0 ? (skillMatch / Math.max(totalTech, selectedSkills.length)) * 100 : 20;
      const expBonus = org.difficulty === "Beginner" ? 10 : org.difficulty === "Intermediate" ? 5 : 0;
      const match = Math.min(98, Math.round(baseScore + expBonus + Math.random() * 10));
      const reason = match > 70
        ? `Strong alignment with your ${selectedSkills.slice(0, 2).join(" & ")} skills`
        : match > 40
        ? `Some alignment — consider learning ${org.tech.filter(t => !selectedSkills.some(s => t.toLowerCase().includes(s.toLowerCase()))).slice(0, 2).join(" or ")}`
        : `Different tech stack — explore ${org.focus[0]} if interested`;
      return { name: org.name, match, reason };
    }).sort((a, b) => b.match - a.match);
    setResults(scored);
    setMatched(true);
  };

  const reset = () => {
    setSelectedSkills([]);
    setExperience("intermediate");
    setMatched(false);
    setResults([]);
  };

  return (
    <Modal open={open} onClose={onClose} title="Organization Matcher" icon={Target} color="from-emerald-500 to-teal-500">
      {!matched ? (
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Select Your Skills</label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(skill => (
                <button key={skill} onClick={() => toggleSkill(skill)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                    selectedSkills.includes(skill)
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}>
                  {skill}
                </button>
              ))}
            </div>
            {selectedSkills.length > 0 && (
              <p className="text-[10px] text-emerald-400 mt-2">{selectedSkills.length} skills selected</p>
            )}
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Experience Level</label>
            <div className="flex gap-2">
              {["beginner", "intermediate", "advanced"].map(level => (
                <button key={level} onClick={() => setExperience(level)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all capitalize ${
                    experience === level
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}>
                  {level}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={findMatches} disabled={selectedSkills.length === 0}
              className={`btn-primary flex-1 py-4 rounded-xl justify-center ${selectedSkills.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Sparkles size={16} /> Find Matching Organizations
            </button>
            <button onClick={onClose} className="px-6 py-4 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-emerald-400 mb-2">
            <CheckCircle size={16} /> Found {results.length} matching organizations
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {results.slice(0, 6).map((org, i) => (
              <motion.div key={org.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-xs font-bold text-emerald-400 shrink-0">
                  {org.match}%
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{org.name}</div>
                  <p className="text-[10px] text-gray-500">{org.reason}</p>
                </div>
                <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden shrink-0">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: `${org.match}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setMatched(false)} className="btn-primary flex-1 py-3 rounded-xl justify-center bg-gradient-to-r from-emerald-600 to-teal-600">
              <RefreshCw size={14} /> Refine Skills
            </button>
            <button onClick={reset} className="px-6 py-3 rounded-xl border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all">
              Start Over
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ─── READINESS SCORE ───────────────────────────────────────────────────

function ReadinessScore({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [calculated, setCalculated] = useState(false);
  const [score, setScore] = useState(0);

  const selectAnswer = (qId: number, optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIndex }));
  };

  const calculateScore = () => {
    const total = readinessQuestions.length;
    const answered = Object.keys(answers).length;
    if (answered < total) return;
    const sum = Object.values(answers).reduce((acc, val) => acc + val, 0);
    const maxPerQuestion = 3;
    const maxTotal = total * maxPerQuestion;
    const rawScore = Math.round((sum / maxTotal) * 100);
    setScore(rawScore);
    setCalculated(true);
  };

  const getScoreLabel = () => {
    if (score >= 80) return { label: "Excellent — You're GSoC Ready!", color: "text-emerald-400", emoji: "🏆" };
    if (score >= 60) return { label: "Good — A few areas to improve", color: "text-blue-400", emoji: "💪" };
    if (score >= 40) return { label: "Fair — Start preparing now!", color: "text-amber-400", emoji: "📚" };
    return { label: "Needs Work — Let's build a plan", color: "text-orange-400", emoji: "🎯" };
  };

  const getRecommendations = () => {
    const recs: string[] = [];
    if (answers[1] !== undefined && answers[1] < 2) recs.push("Practice Git workflows — try contributing to a small project first");
    if (answers[2] !== undefined && answers[2] < 2) recs.push("Start with small contributions (docs, bug fixes) to build confidence");
    if (answers[3] !== undefined && answers[3] < 2) recs.push("Focus on improving your programming skills through online courses");
    if (answers[4] !== undefined && answers[4] < 2) recs.push("Review sample GSoC proposals to understand the format and expectations");
    if (answers[5] !== undefined && answers[5] < 2) recs.push("Read the GSoC contributor guide thoroughly");
    if (recs.length === 0) recs.push("You're well prepared! Focus on finding the right organization and crafting a great proposal.");
    return recs;
  };

  const reset = () => {
    setAnswers({});
    setCalculated(false);
    setScore(0);
  };

  const allAnswered = Object.keys(answers).length === readinessQuestions.length;

  return (
    <Modal open={open} onClose={onClose} title="GSoC Readiness Score" icon={Star} color="from-blue-500 to-cyan-500">
      {!calculated ? (
        <div className="space-y-5">
          {readinessQuestions.map((q, qi) => (
            <div key={q.id}>
              <p className="text-sm font-bold text-white mb-2">Q{qi + 1}. {q.question}</p>
              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt, oi) => (
                  <button key={oi} onClick={() => selectAnswer(q.id, oi)}
                    className={`px-3 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-left transition-all ${
                      answers[q.id] === oi
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                    }`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button onClick={calculateScore} disabled={!allAnswered}
              className={`btn-primary flex-1 py-4 rounded-xl justify-center ${!allAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <BarChart3 size={16} /> {allAnswered ? "Calculate My Score" : `Answer all questions (${Object.keys(answers).length}/${readinessQuestions.length})`}
            </button>
            <button onClick={onClose} className="px-6 py-4 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                <circle cx="60" cy="60" r="54" fill="none" stroke={`url(#scoreGradient)`} strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 54}`} strokeDashoffset={`${2 * Math.PI * 54 * (1 - score / 100)}`}
                  strokeLinecap="round" />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-black text-white">{score}%</div>
                  <div className="text-[8px] text-gray-500 font-bold uppercase tracking-wider mt-1">Readiness</div>
                </div>
              </div>
            </div>
            <p className={`text-sm font-bold mt-4 ${getScoreLabel().color}`}>
              {getScoreLabel().emoji} {getScoreLabel().label}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
              <Lightbulb size={14} className="text-amber-400" /> Recommendations
            </h4>
            <div className="space-y-2">
              {getRecommendations().map((rec, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-gray-400">
                  <CheckCircle size={12} className="text-blue-400 mt-0.5 shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setCalculated(false)} className="btn-primary flex-1 py-3 rounded-xl justify-center">
              <RefreshCw size={14} /> Retake Quiz
            </button>
            <button onClick={reset} className="px-6 py-3 rounded-xl border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all">
              Start Over
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ─── CONTRIBUTION STRATEGY ────────────────────────────────────────────

function ContributionStrategy({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [targetOrg, setTargetOrg] = useState("");
  const [currentSkill, setCurrentSkill] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("moderate");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string[]>([]);

  const generatePlan = () => {
    if (!targetOrg) return;
    setLoading(true);
    setTimeout(() => {
      const weeks: string[] = [
        `**Week 1-2: Research & Setup** — Explore ${targetOrg}'s repositories, join their communication channels (mailing list, Discord, IRC), set up the development environment, and introduce yourself to the community.`,
        `**Week 3-4: First Contribution** — Find a beginner-friendly issue tagged "good first issue" or "help wanted". Fix a documentation bug or a small code issue to get familiar with the contribution workflow.`,
        `**Week 5-6: Build Relationships** — Engage in code reviews, comment on issues, ask thoughtful questions, and attend community meetings. Start building rapport with potential mentors.`,
        `**Week 7-8: Intermediate Tasks** — Take on more substantial issues. Write tests, improve error handling, or add small features. Demonstrate your technical capability and reliability.`,
        `**Week 9-10: Prepare GSoC Proposal** — Research ${targetOrg}'s GSoC project ideas. Draft your proposal with a clear timeline, technical approach, and deliverables. Get feedback from the community.`,
        `**Week 11-12: Submit & Follow Up** — Submit your finalized proposal before the deadline. Follow up with mentors, answer questions, and continue contributing while waiting for results.`,
        `**Ongoing: Stay Engaged** — Regardless of the outcome, continue contributing. ${currentSkill ? `Leverage your ${currentSkill} skills to take on more complex tasks.` : ''} Build your reputation in the community for future opportunities.`,
      ];
      if (timeCommitment === "minimal") {
        weeks[1] = `**Week 3-6: First Contribution** — Take it slow. Focus on documentation improvements and small bug fixes. Quality over quantity.`;
      }
      if (timeCommitment === "intensive") {
        weeks[0] = `**Week 1-2: Rapid Onboarding** — Speed-run the setup. Start contributing within the first week. Aim for 2-3 contributions by week 2.`;
      }
      setPlan(weeks);
      setGenerated(true);
      setLoading(false);
    }, 2000);
  };

  const reset = () => {
    setTargetOrg("");
    setCurrentSkill("");
    setTimeCommitment("moderate");
    setGenerated(false);
    setPlan([]);
  };

  return (
    <Modal open={open} onClose={onClose} title="Contribution Strategy" icon={Lightbulb} color="from-amber-500 to-orange-500">
      {!generated ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Target Organization</label>
              <input type="text" value={targetOrg} onChange={(e) => setTargetOrg(e.target.value)} placeholder="e.g., Python Software Foundation"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition-all text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5 block">Your Key Skill (optional)</label>
              <input type="text" value={currentSkill} onChange={(e) => setCurrentSkill(e.target.value)} placeholder="e.g., Python, Documentation"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 transition-all text-sm" />
            </div>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">Time Commitment</label>
            <div className="flex gap-2">
              {[
                { value: "minimal", label: "🌙 Minimal (5 hrs/wk)" },
                { value: "moderate", label: "⚡ Moderate (10 hrs/wk)" },
                { value: "intensive", label: "🚀 Intensive (20+ hrs/wk)" },
              ].map(tc => (
                <button key={tc.value} onClick={() => setTimeCommitment(tc.value)}
                  className={`flex-1 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                    timeCommitment === tc.value
                      ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}>
                  {tc.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={generatePlan} disabled={!targetOrg || loading}
              className={`btn-primary flex-1 py-4 rounded-xl justify-center ${(!targetOrg || loading) ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : <><Sparkles size={16} /> Generate My Strategy</>}
            </button>
            <button onClick={onClose} className="px-6 py-4 rounded-xl border border-white/10 text-sm text-gray-400 hover:text-white hover:border-white/20 transition-all">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-amber-400 mb-2">
            <Rocket size={16} /> Your 12-week strategy for {targetOrg}
          </div>
          <div className="space-y-3 max-h-72 overflow-y-auto">
            {plan.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-line">{step}</div>
              </motion.div>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { setGenerated(false); setPlan([]); }} className="btn-primary flex-1 py-3 rounded-xl justify-center bg-gradient-to-r from-amber-600 to-orange-600">
              <RefreshCw size={14} /> Refine Strategy
            </button>
            <button onClick={reset} className="px-6 py-3 rounded-xl border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/20 transition-all">
              Start Over
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────

export default function GSoCPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const openModal = (id: string) => setActiveModal(id);
  const closeModal = () => setActiveModal(null);

  const aiTools = [
    { id: "proposal", icon: FileText, title: "AI Proposal Generator", desc: "Generate a customized GSoC proposal based on your skills, interests, and chosen organization.", color: "from-purple-500 to-blue-500", badge: "Interactive" },
    { id: "matcher", icon: Target, title: "Organization Matcher", desc: "Get matched with GSoC organizations that align with your skills, interests, and experience level.", color: "from-emerald-500 to-teal-500", badge: "Interactive" },
    { id: "readiness", icon: Star, title: "GSoC Readiness Score", desc: "Assess your readiness with an AI-powered score. Get personalized recommendations to improve.", color: "from-blue-500 to-cyan-500", badge: "Interactive" },
    { id: "strategy", icon: Lightbulb, title: "Contribution Strategy", desc: "Get a step-by-step plan for contributing to target organizations before applications open.", color: "from-amber-500 to-orange-500", badge: "Interactive" },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
          {/* Hero */}
          <div className="text-center space-y-6">
            <div className="badge badge-orange inline-flex"><GraduationCap size={11} /> Google Summer of Code Hub</div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              GSoC <span className="gradient-text-hero">Opportunities</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              Your complete guide to Google Summer of Code — organizations, projects, application tips, AI-powered proposal generation, and readiness scoring.
            </p>
          </div>

          {/* Program Overview */}
          {gsocProgram && (
            <section className="max-w-4xl mx-auto">
              <div className="p-8 rounded-[2rem] glass border border-orange-500/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 blur-[80px] rounded-full" />
                <div className="relative z-10 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-black">{gsocProgram.name}</h2>
                      <p className="text-gray-400 leading-relaxed">{gsocProgram.description}</p>
                    </div>
                    <a href={gsocProgram.url} target="_blank" rel="noopener noreferrer"
                      className="btn-primary px-6 py-3 rounded-xl text-sm whitespace-nowrap shrink-0">
                      Official Site <ExternalLink size={14} />
                    </a>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">{(gsocProgram?.stats?.totalStudents || 0).toLocaleString()}+</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Students</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">{gsocProgram?.stats?.totalOrganizations || 0}+</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Organizations</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">{gsocProgram?.stats?.successRate || 'N/A'}</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Success Rate</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-2xl font-bold text-white">$1,500+</div>
                      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-wider mt-1">Stipend</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1"><Calendar size={14} className="text-orange-400" /> Applications: {gsocProgram.timeline.applications}</span>
                    <span className="flex items-center gap-1"><Clock size={14} className="text-orange-400" /> {gsocProgram.timeline.projectsStart} - {gsocProgram.timeline.projectsEnd}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Timeline */}
          <section className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="badge badge-blue inline-flex"><Calendar size={11} /> Timeline</div>
              <h2 className="text-3xl font-black">GSoC 2026 Timeline</h2>
            </div>
            <div className="space-y-4">
              {timelineSteps.map((step, i) => (
                <motion.div key={step.phase} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-5 rounded-xl glass border border-white/8">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 ${step.status === "active" ? "bg-orange-400 border-orange-400" : "border-gray-600"}`} />
                    {i < timelineSteps.length - 1 && <div className="w-0.5 flex-1 bg-white/5 mt-1" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-white">{step.phase}</h3>
                        <p className="text-sm text-gray-400 mt-1">{step.desc}</p>
                      </div>
                      <span className="badge badge-blue text-[8px] whitespace-nowrap">{step.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* AI Tools Section - Interactive Demos */}
          <section className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="badge badge-purple inline-flex"><Sparkles size={11} /> AI-Powered Tools</div>
              <h2 className="text-3xl font-black">Interactive AI GSoC Assistant</h2>
              <p className="text-gray-500">Click any tool below to launch the interactive demo. No login required.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiTools.map((tool) => (
                <motion.div key={tool.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="p-6 rounded-2xl glass border border-white/8 hover:border-white/20 transition-all cursor-pointer group"
                  onClick={() => openModal(tool.id)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <tool.icon size={22} className="text-white" />
                    </div>
                    <span className="badge badge-purple text-[8px] animate-pulse">{tool.badge}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{tool.title}</h3>
                  <p className="text-sm text-gray-400 mb-4">{tool.desc}</p>
                  <div className="flex items-center gap-1 text-blue-400 text-xs font-bold group-hover:gap-2 transition-all">
                    Launch Demo <ArrowRight size={12} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-2">
              <span className="badge badge-emerald text-[8px]"><CheckCircle size={7} /> No Login Required</span>
              <span className="badge badge-blue text-[8px]"><Zap size={7} /> Real-time Results</span>
              <span className="badge badge-amber text-[8px]"><Brain size={7} /> AI-Powered</span>
              <span className="badge badge-purple text-[8px]"><ListChecks size={7} /> Save & Export</span>
            </div>
          </section>

          {/* Tips */}
          <section className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="badge badge-amber inline-flex"><BookOpen size={11} /> Pro Tips</div>
              <h2 className="text-3xl font-black">GSoC Application Tips</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.map((tip, i) => (
                <motion.div key={tip.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl glass border border-white/8 hover:border-white/20 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/20 flex items-center justify-center shrink-0">
                      <tip.icon size={18} className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{tip.title}</h3>
                      <p className="text-sm text-gray-400">{tip.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 pt-8">
            <p className="text-gray-500">Ready to start your GSoC journey?</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={gsocProgram?.url || "#"} target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-4 rounded-xl">
                <ExternalLink size={18} /> Official GSoC Site
              </a>
              <Link href="/issues" className="btn-secondary px-8 py-4 rounded-xl">
                <Bug size={18} /> Practice with Issues
              </Link>
            </div>
          </section>
        </div>

        {/* Modals */}
        <ProposalGenerator open={activeModal === "proposal"} onClose={closeModal} />
        <OrganizationMatcher open={activeModal === "matcher"} onClose={closeModal} />
        <ReadinessScore open={activeModal === "readiness"} onClose={closeModal} />
        <ContributionStrategy open={activeModal === "strategy"} onClose={closeModal} />
      </main>
    </div>
  );
}
