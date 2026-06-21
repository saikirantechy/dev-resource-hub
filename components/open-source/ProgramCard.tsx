"use client";

import { motion } from "framer-motion";
import { ExternalLink, TrendingUp, Award } from "lucide-react";

interface Program {
  id: string;
  name: string;
  organization: string;
  description: string;
  url: string;
  tags: string[];
  difficulty: string;
  benefits: string[];
  timeline: { applications: string; projectsStart: string; projectsEnd: string };
  stats: { totalStudents?: number; totalInterns?: number; totalParticipants?: number; totalFellows?: number; totalMentees?: number; totalOrganizations?: number; totalProjects?: number; successRate?: string };
  isActive: boolean;
  isFeatured: boolean;
}

interface ProgramCardProps {
  program: Program;
  index?: number;
}

export default function ProgramCard({ program, index = 0 }: ProgramCardProps) {
  const { timeline, stats } = program;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <a
        href={program.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block h-full p-6 rounded-2xl glass border border-white/8 hover:border-blue-500/30 card-hover transition-all duration-500"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Award size={18} className="text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                {program.name}
              </h3>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                By {program.organization}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {program.isActive && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-bold uppercase tracking-wider border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active
              </span>
            )}
            {program.isFeatured && (
              <span className="badge badge-purple text-[8px]"><TrendingUp size={7} /> Featured</span>
            )}
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
          {program.description}
        </p>

        {/* Timeline */}
        <div className="space-y-2 mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-gray-500 font-bold uppercase tracking-wider">Applications</span>
            <span className="text-white font-semibold">{timeline.applications}</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-gray-500 font-bold uppercase tracking-wider">Start</span>
            <span className="text-white font-semibold">{timeline.projectsStart}</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-gray-500 font-bold uppercase tracking-wider">End</span>
            <span className="text-white font-semibold">{timeline.projectsEnd}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-sm font-bold text-white">{stats.successRate || 'N/A'}</div>
            <div className="text-[7px] text-gray-500 font-bold uppercase tracking-wider">Success</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-sm font-bold text-white">{(stats.totalProjects || 0)}+</div>
            <div className="text-[7px] text-gray-500 font-bold uppercase tracking-wider">Projects</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-sm font-bold text-white">{(stats.totalOrganizations || 0)}+</div>
            <div className="text-[7px] text-gray-500 font-bold uppercase tracking-wider">Orgs</div>
          </div>
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {program.benefits.slice(0, 3).map((benefit) => (
            <span key={benefit} className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[8px] font-bold uppercase tracking-wider border border-emerald-500/20">
              {benefit}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-blue-400 text-[10px] font-bold group-hover:translate-x-2 transition-transform duration-500">
          <ExternalLink size={10} /> Learn More
        </div>
      </a>
    </motion.div>
  );
}
