"use client";

import { motion } from "framer-motion";
import {
  Pencil, BookOpen, GraduationCap, Sparkles,
  FileText, ClipboardList, Puzzle, AlignLeft,
  BookMarked, Blocks, Layers, Lightbulb,
  School, StickyNote, CheckSquare, Brain,
  PenTool, Target, ScrollText, LayoutList,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const sections = [
  {
    title: "Modify Existing Content",
    icon: PenTool,
    gradient: "from-violet-500 to-purple-500",
    bgGradient: "from-violet-500/10 via-purple-500/5 to-transparent",
    borderColor: "border-violet-500/20",
    items: [
      { label: "Align to standards", icon: Target, desc: "Map your content to educational standards (CCSS, NGSS, TEKS, IB, etc.) in one click." },
      { label: "Differentiate instruction", icon: Layers, desc: "Automatically adapt content for different learning levels — gifted, on-grade, or modified." },
      { label: "Modify reading level", icon: AlignLeft, desc: "Adjust text complexity from K-12 to college level while preserving meaning." },
      { label: "Add supporting examples", icon: Lightbulb, desc: "Generate real-world examples, analogies, and case studies tailored to your topic." },
    ],
  },
  {
    title: "Homework & Assessments",
    icon: ClipboardList,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    borderColor: "border-emerald-500/20",
    items: [
      { label: "Rubric", icon: ScrollText, desc: "Create standards-aligned rubrics with criteria, performance levels, and descriptive feedback." },
      { label: "Quiz", icon: CheckSquare, desc: "Generate multiple-choice, short-answer, true/false, and fill-in-the-blank quizzes instantly." },
    ],
  },
  {
    title: "Curriculum Planning",
    icon: BookMarked,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-500/10 via-cyan-500/5 to-transparent",
    borderColor: "border-blue-500/20",
    items: [
      { label: "Lesson plan", icon: FileText, desc: "Build complete, standards-aligned lesson plans with objectives, activities, and assessments." },
      { label: "Minecraft lesson plan", icon: Blocks, desc: "Immersive lessons using Minecraft Education Edition — coming soon.", badge: "Coming soon" },
      { label: "Unit plan", icon: LayoutList, desc: "Design multi-week unit plans with pacing guides and cross-curricular connections — coming soon.", badge: "Coming soon" },
    ],
  },
  {
    title: "Study Aids & More",
    icon: StickyNote,
    gradient: "from-orange-500 to-rose-500",
    bgGradient: "from-orange-500/10 via-rose-500/5 to-transparent",
    borderColor: "border-orange-500/20",
    items: [
      { label: "Flashcards", icon: Brain, desc: "Create printable or digital flashcards with spaced repetition scheduling built in." },
      { label: "Fill in the blanks", icon: Puzzle, desc: "Generate cloze-deletion exercises from any text — coming soon.", badge: "Coming soon" },
      { label: "Matching", icon: BookOpen, desc: "Create drag-and-drop matching activities for vocabulary, concepts, and more — coming soon.", badge: "Coming soon" },
    ],
  },
];

const schoolSupplies = [
  { emoji: "📚", x: "5%", y: "15%", size: 24, delay: 0 },
  { emoji: "✏️", x: "92%", y: "10%", size: 20, delay: 1 },
  { emoji: "📐", x: "8%", y: "70%", size: 22, delay: 2 },
  { emoji: "🖍️", x: "88%", y: "75%", size: 18, delay: 1.5 },
  { emoji: "📓", x: "3%", y: "45%", size: 20, delay: 0.5 },
  { emoji: "🎒", x: "94%", y: "45%", size: 26, delay: 2.5 },
  { emoji: "🔬", x: "50%", y: "8%", size: 16, delay: 1.8 },
  { emoji: "📝", x: "50%", y: "92%", size: 18, delay: 0.8 },
];

const subjectIcons = [
  { emoji: "🧮", label: "Math" },
  { emoji: "🔬", label: "Science" },
  { emoji: "📖", label: "ELA" },
  { emoji: "🌍", label: "Social Studies" },
  { emoji: "🎨", label: "Art" },
  { emoji: "💻", label: "CS" },
  { emoji: "🌐", label: "Languages" },
  { emoji: "🏃", label: "PE" },
];

export default function TeachInDevCopilotPage() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-hidden">
      <style>{`
        .gradient-text-teach {
          background: linear-gradient(135deg, #a78bfa 0%, #60a5fa 30%, #34d399 60%, #fb923c 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 5s ease infinite;
        }
        .gradient-text-purple-blue {
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .badge-soon {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.25);
          padding: 1px 6px;
          border-radius: 9999px;
          font-size: 7px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }
      `}</style>

      <div className="gradient-mesh" />
      <Navbar />

      <main className="relative">
        {/* ─── HERO ─── */}
        <section className="relative px-4 sm:px-6 pt-24 pb-16 overflow-hidden">
          {/* Floating school supplies background */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {schoolSupplies.map((item, i) => (
              <motion.div
                key={i}
                className="absolute opacity-[0.08]"
                style={{ left: item.x, top: item.y, fontSize: item.size }}
                initial={{ y: 0 }}
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5 + item.delay, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
              >
                {item.emoji}
              </motion.div>
            ))}
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="badge badge-purple inline-flex mb-4">
                <Sparkles size={11} /> AI-Powered Education Tools
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
            >
              Teach in{" "}
              <span className="gradient-text-teach">Dev Copilot</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed"
            >
              Create standards-aligned lesson plans, engaging learning activities,
              rubrics, quizzes, flashcards, and more—in <span className="text-white font-bold">less time</span>.
            </motion.p>

            {/* Subject badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {subjectIcons.map((subj) => (
                <div
                  key={subj.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8 text-xs font-medium text-gray-400 hover:text-white hover:border-white/20 transition-all"
                >
                  <span className="text-sm">{subj.emoji}</span>
                  {subj.label}
                </div>
              ))}
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto pt-4"
            >
              {[
                { value: "50+", label: "Standards Aligned" },
                { value: "10K+", label: "Teachers Using" },
                { value: "1M+", label: "Resources Created" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl glass border border-white/5">
                  <div className="text-lg font-black gradient-text-purple-blue">{stat.value}</div>
                  <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── BANNER / DIVIDER ─── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-2xl overflow-hidden border border-white/8 mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-emerald-500/10" />
            <div className="relative px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Powered by AI · Built for Educators</div>
                  <div className="text-[10px] text-gray-500">No account required · Free tier available · Export to PDF & Google Classroom</div>
                </div>
              </div>
              <button className="btn-primary text-xs whitespace-nowrap shrink-0">
                <GraduationCap size={14} /> Get Started Free
              </button>
            </div>
          </div>
        </div>

        {/* ─── FOUR SECTIONS ─── */}
        {sections.map((section, sectionIdx) => (
          <section key={section.title} className="px-4 sm:px-6 py-12 md:py-16">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
              >
                {/* Section header */}
                <div className={`relative overflow-hidden rounded-2xl p-6 md:p-8 mb-8 bg-gradient-to-br ${section.bgGradient} border ${section.borderColor}`}>
                  {/* Decorative corner accent */}
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20"
                    style={{ background: `radial-gradient(circle, ${section.gradient.split(" ")[1]} 0%, transparent 70%)` }}
                  />

                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-lg shrink-0`}>
                      <section.icon size={22} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black tracking-tight">{section.title}</h2>
                      <p className="text-xs text-gray-500 mt-1">
                        {section.items.length} tool{section.items.length > 1 ? "s" : ""} available
                      </p>
                    </div>
                  </div>
                </div>

                {/* Items grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {section.items.map((item, itemIdx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: itemIdx * 0.07 }}
                      className={`relative group rounded-2xl p-5 transition-all duration-300 card-hover ${
                        item.badge
                          ? "glass border border-white/8 opacity-80 hover:opacity-100"
                          : "glass-strong border border-white/10"
                      }`}
                    >
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: `radial-gradient(600px circle at 50% 50%, ${section.gradient.split(" ")[1].replace("from-", "").replace("to-", "")}08, transparent 60%)`,
                        }}
                      />

                      <div className="relative z-10 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${section.gradient} bg-opacity-20 flex items-center justify-center`}>
                            <item.icon size={15} className="text-white" />
                          </div>
                          {item.badge && (
                            <span className="badge-soon">{item.badge}</span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-white transition-colors">
                            {item.label}
                          </h3>
                          <p className="text-[10px] text-gray-500 mt-1.5 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        {!item.badge && (
                          <div className="pt-1">
                            <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider hover:text-blue-400 transition-colors cursor-pointer inline-flex items-center gap-1">
                              Try now <Sparkles size={8} />
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Fill remaining grid slots with empty placeholders for consistent layout */}
                  {section.items.length < 4 && section.title !== "Homework & Assessments" && (
                    Array.from({ length: 4 - section.items.length }).map((_, i) => (
                      <div key={`spacer-${i}`} className="hidden sm:block" />
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* ─── CTA FOOTER ─── */}
        <section className="px-4 sm:px-6 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-violet-500/10 via-blue-500/10 to-emerald-500/10 blur-3xl" />
              </div>

              <div className="relative z-10 space-y-6">
                <div className="badge badge-emerald inline-flex">
                  <School size={11} /> Join the Education Revolution
                </div>

                <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                  Ready to{" "}
                  <span className="gradient-text-teach">transform</span> your classroom?
                </h2>

                <p className="text-gray-500 text-sm max-w-xl mx-auto">
                  Join thousands of teachers saving hours every week with AI-powered lesson planning.
                  Start creating engaging, standards-aligned content in seconds.
                </p>

                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  <button className="btn-primary">
                    <GraduationCap size={16} /> Start Creating Free
                  </button>
                  <button className="btn-secondary">
                    <BookOpen size={16} /> View Examples
                  </button>
                </div>

                <p className="text-[10px] text-gray-600">
                  Free forever · No credit card required · Export to PDF, DOCX, Google Classroom
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer spacer */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
