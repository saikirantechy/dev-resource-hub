import { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  Rocket,
  Code2,
  Users,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Beginner's Guide | Dev Resource Hub",
  description: "A step-by-step path to start your developer journey — from basics to your first open-source contribution.",
};

export default function BeginnerGuidePage() {
  const steps = [
    {
      title: "Master the Basics",
      description:
        "Start with HTML, CSS, and JavaScript. The foundation of everything on the web.",
      icon: <BookOpen className="text-blue-400" />,
      resources: [
        { name: "freeCodeCamp", url: "/category/learning-resources" },
        { name: "MDN Web Docs", url: "/category/learning-resources" },
      ],
    },
    {
      title: "Setup Your Environment",
      description:
        "Install VS Code, Git, and Node.js. Make your local machine a powerhouse.",
      icon: <Code2 className="text-purple-400" />,
      resources: [
        { name: "VS Code", url: "/category/productivity-tools" },
        { name: "Node.js", url: "https://nodejs.org" },
      ],
    },
    {
      title: "Build Your First Project",
      description:
        "Create a simple landing page or a To-Do list. Practice makes perfect.",
      icon: <Rocket className="text-orange-400" />,
      resources: [
        { name: "Next.js Starter", url: "/category/web-dev" },
        { name: "Tailwind UI", url: "/category/design-tools" },
      ],
    },
    {
      title: "Join the Community",
      description:
        "Contribute to open source. Start with the Dev Resource Hub!",
      icon: <Users className="text-green-400" />,
      resources: [
        { name: "Contribution Guide", url: "/submit" },
        { name: "View Leaderboard", url: "/contributors" },
      ],
    },
  ];

  return (
    <main id="main-content" className="min-h-screen bg-[#0a0a0a] text-white py-24 px-6 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent -z-10" />

      <div className="max-w-4xl mx-auto">
        <header className="mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <GraduationCap size={14} /> Student & Beginner Track
          </div>
          <h1 className="text-5xl font-black tracking-tight">
            The Beginner&apos;s Path
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            A curated step-by-step journey to help you go from zero to your
            first open-source contribution.
          </p>
        </header>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative pl-12 border-l border-white/10 pb-12 last:pb-0"
            >
              {/* Dot */}
              <div className="absolute left-0 top-0 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {step.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{step.title}</h2>
                </div>
                <p className="text-gray-400 leading-relaxed max-w-xl">
                  {step.description}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  {step.resources.map((res, i) => (
                    <Link
                      key={i}
                      href={res.url}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-blue-500/50 hover:bg-white/[0.07] transition-all text-sm font-medium"
                    >
                      <CheckCircle2 size={14} className="text-blue-500" />
                      {res.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-24 p-12 rounded-3xl bg-gradient-to-br from-blue-600/20 via-transparent to-transparent border border-white/10 text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to make your mark?</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            You&apos;ve learned the basics. Now, join 20+ other contributors and
            help us build this platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/submit"
              className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              Start Contributing <ChevronRight size={18} />
            </Link>
            <Link
              href="/"
              className="px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              Explore All Tools
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
