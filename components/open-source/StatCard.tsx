"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  color: string;
  description?: string;
  index?: number;
}

export default function StatCard({ label, value, icon: Icon, color, description, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="text-center space-y-3 group p-6 rounded-2xl glass border border-white/5 hover:border-white/20 transition-all"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} bg-opacity-10 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500`}>
        <Icon size={20} className="text-white" />
      </div>
      <div className="space-y-1">
        <div className="text-4xl md:text-5xl font-black group-hover:scale-105 transition-transform duration-500">
          {value}
        </div>
        <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">
          {label}
        </div>
        {description && (
          <div className="text-[9px] text-gray-600 mt-1 max-w-xs mx-auto">
            {description}
          </div>
        )}
      </div>
    </motion.div>
  );
}
