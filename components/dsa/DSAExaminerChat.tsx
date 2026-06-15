"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Clock, Target, AlertTriangle, CheckCircle2, BarChart3, Loader2 } from "lucide-react";
import type { Difficulty } from "@/lib/dsa/types";

interface Question {
  id: string;
  type: string;
  title: string;
  difficulty: Difficulty;
  content: string;
  answered?: boolean;
  score?: number;
  feedback?: string;
}

const INITIAL_QUESTIONS: Question[] = [
  {
    id: "q1", type: "MCQ", title: "Time Complexity", difficulty: "Easy",
    content: "What is the time complexity of accessing an element in an array by index?\n\nA) O(1)\nB) O(log n)\nC) O(n)\nD) O(n²)",
  },
  {
    id: "q2", type: "Coding", title: "Two Sum Problem", difficulty: "Medium",
    content: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.\n\nYou may assume each input has exactly one solution.\n\nExample:\nnums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\n\nWrite your solution.",
  },
  {
    id: "q3", type: "Optimization", title: "Space Optimization", difficulty: "Hard",
    content: "Given a sorted array, remove duplicates in-place such that each element appears only once.\n\nCan you optimize it to O(1) extra space?\n\nWhat's the minimum time complexity achievable?",
  },
];

export default function DSAExaminerChat() {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"intro" | "active" | "completed">("intro");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questions, phase]);

  useEffect(() => {
    if (phase !== "active" || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [phase, timeLeft]);

  const currentQ = questions[currentIndex];

  const handleStart = () => setPhase("active");

  const handleSubmit = () => {
    if (!answers[currentQ.id]?.trim()) return;
    setIsAnalyzing(true);

    setTimeout(() => {
      const score = Math.floor(Math.random() * 40) + 60;
      const updated = [...questions];
      updated[currentIndex] = {
        ...updated[currentIndex],
        answered: true,
        score,
        feedback: score >= 80
          ? "Excellent! Strong understanding shown. Consider edge cases for bonus points."
          : score >= 60
            ? "Good attempt! Review the optimal approach and practice similar problems."
            : "Needs improvement. Focus on understanding the core concept first.",
      };
      setQuestions(updated);
      setIsAnalyzing(false);

      if (currentIndex < questions.length - 1) {
        setCurrentIndex(i => i + 1);
        setAnswers({});
      } else {
        setPhase("completed");
      }
    }, 2000);
  };

  const totalScore = questions.reduce((s, q) => s + (q.score || 0), 0);
  const avgScore = questions.length > 0 ? Math.round(totalScore / questions.length) : 0;

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-[600px] rounded-2xl glass border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 bg-gradient-to-r from-red-500/5 to-orange-500/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
            <Target size={20} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">Dave</div>
            <div className="text-[10px] text-gray-500">AI DSA Examiner</div>
          </div>
        </div>
        {phase === "active" && (
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold ${
            timeLeft < 120 ? "bg-red-500/10 text-red-400 border-red-500/20" : "bg-white/5 text-gray-300 border-white/10"
          }`}>
            <Clock size={14} />
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {phase === "intro" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center mx-auto">
                <Bot size={32} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Hi Sai! I am your DSA Examiner.</h3>
                <p className="text-gray-400 text-sm mt-2">
                  I will test your understanding through structured questions, coding challenges, scenario-based prompts, optimization tasks, and interview simulations.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                {[
                  { label: "Questions", value: questions.length, color: "text-blue-400" },
                  { label: "Duration", value: "15 min", color: "text-amber-400" },
                  { label: "Difficulty", value: "Mixed", color: "text-red-400" },
                  { label: "Format", value: "Adaptive", color: "text-emerald-400" },
                ].map(s => (
                  <div key={s.label} className="p-2 rounded-xl bg-white/5 border border-white/5">
                    <div className={`text-lg font-black ${s.color}`}>{s.value}</div>
                    <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold">{s.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={handleStart} className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-sm hover:opacity-90 transition-all">
                Start Assessment
              </button>
            </div>
          </motion.div>
        )}

        {phase === "active" && currentQ && (
          <motion.div key={currentQ.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            {/* Progress */}
            <div className="flex items-center gap-2">
              {questions.map((q, i) => (
                <div key={q.id} className={`flex-1 h-1.5 rounded-full ${
                  i < currentIndex ? "bg-emerald-500" :
                  i === currentIndex ? "bg-blue-500" : "bg-white/10"
                }`} />
              ))}
            </div>

            {/* Question Card */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`badge ${
                    currentQ.difficulty === "Easy" ? "badge-emerald" :
                    currentQ.difficulty === "Medium" ? "badge-orange" : "badge-red"
                  }`}>{currentQ.difficulty}</span>
                  <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-bold">{currentQ.type}</span>
                </div>
                <span className="text-[10px] text-gray-500">Question {currentIndex + 1} of {questions.length}</span>
              </div>
              <h4 className="font-bold text-white text-base">{currentQ.title}</h4>
              <pre className="text-sm text-gray-300 font-sans whitespace-pre-wrap leading-relaxed">{currentQ.content}</pre>
              <textarea
                value={answers[currentQ.id] || ""}
                onChange={(e) => setAnswers({ ...answers, [currentQ.id]: e.target.value })}
                placeholder="Type your answer here..."
                className="w-full h-32 p-4 rounded-xl bg-black/30 border border-white/10 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 resize-none"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSubmit}
                  disabled={!answers[currentQ.id]?.trim() || isAnalyzing}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold hover:opacity-90 transition-all disabled:opacity-30"
                >
                  {isAnalyzing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                  {isAnalyzing ? "Analyzing..." : "Submit Answer"}
                </button>
              </div>
            </div>

            {/* Previous feedback */}
            {currentIndex > 0 && questions[currentIndex - 1].feedback && (
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-2">
                  <CheckCircle2 size={14} /> Question {currentIndex} Feedback
                </div>
                <p className="text-sm text-gray-400">{questions[currentIndex - 1].feedback}</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Completed */}
        {phase === "completed" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-blue-500/5 border border-emerald-500/20 text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center mx-auto">
                <BarChart3 size={40} className="text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">Assessment Complete!</h3>
                <p className="text-gray-400 mt-2">Here&apos;s your performance summary</p>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className={`text-3xl font-black ${avgScore >= 80 ? "text-emerald-400" : avgScore >= 60 ? "text-amber-400" : "text-red-400"}`}>{avgScore}%</div>
                  <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold mt-1">Score</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-3xl font-black text-blue-400">{questions.filter(q => q.answered).length}/{questions.length}</div>
                  <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold mt-1">Complete</div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-3xl font-black text-purple-400">{formatTime(timeLeft)}</div>
                  <div className="text-[8px] uppercase tracking-widest text-gray-600 font-bold mt-1">Time Left</div>
                </div>
              </div>

              <div className="space-y-3 max-w-md mx-auto text-left">
                {questions.map((q, i) => (
                  <div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div>
                      <div className="text-xs font-bold text-white">{q.title}</div>
                      <div className="text-[10px] text-gray-500">{q.type} • {q.difficulty}</div>
                    </div>
                    {q.score ? (
                      <span className={`text-lg font-black ${q.score >= 80 ? "text-emerald-400" : q.score >= 60 ? "text-amber-400" : "text-red-400"}`}>{q.score}%</span>
                    ) : (
                      <span className="text-xs text-gray-600">Skipped</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20 text-left">
                <h4 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
                  <AlertTriangle size={14} /> Improvement Areas
                </h4>
                <ul className="space-y-1.5">
                  <li className="text-xs text-gray-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Review space complexity optimization techniques
                  </li>
                  <li className="text-xs text-gray-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Practice more dynamic programming problems
                  </li>
                  <li className="text-xs text-gray-400 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    Focus on edge cases in your solutions
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={endRef} />
      </div>
    </div>
  );
}
