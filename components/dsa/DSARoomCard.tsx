"use client";

import { motion } from "framer-motion";
import { Trophy, Users, Zap, Clock, Lock, Unlock } from "lucide-react";
import type { Room } from "@/lib/dsa/types";

interface Props {
  room: Room;
  index: number;
}

export default function DSARoomCard({ room, index }: Props) {
  const difficultyColor = {
    Easy: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Medium: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Hard: "text-red-400 bg-red-500/10 border-red-500/20",
    Expert: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  }[room.difficulty];


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group p-5 rounded-2xl glass border border-white/10 hover:border-blue-500/30 card-hover transition-all duration-500"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className={`w-2 h-2 rounded-full ${
              room.status === "Active" ? "bg-emerald-400 animate-pulse" :
              room.status === "Upcoming" ? "bg-amber-400" : "bg-gray-500"
            }`} />
            <h3 className="font-bold text-sm text-white truncate group-hover:text-blue-300 transition-colors">{room.name}</h3>
          </div>
          {room.isPrivate ? <Lock size={14} className="text-gray-500" /> : <Unlock size={14} className="text-gray-500" />}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${difficultyColor}`}>{room.difficulty}</span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-[9px] font-bold border border-white/5">{room.topic}</span>
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-gray-400 text-[9px] font-bold border border-white/5">{room.language}</span>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-[10px] text-gray-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Users size={12} /> {room.participants}/{room.maxParticipants}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {room.status === "Ended" ? "Ended" : room.timeRemaining}</span>
          </div>
          <span className="flex items-center gap-1">Host: {room.host}</span>
        </div>

        {/* Action */}
        {room.status === "Active" && room.participants < room.maxParticipants && (
          <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-[10px] font-bold hover:opacity-90 transition-all flex items-center justify-center gap-1.5">
            <Zap size={12} /> Join Room
          </button>
        )}
        {room.status === "Active" && room.participants >= room.maxParticipants && (
          <div className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-500 text-[10px] font-bold text-center">Room Full</div>
        )}
        {room.status === "Upcoming" && (
          <div className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-amber-400 text-[10px] font-bold text-center">Starts in {room.timeRemaining}</div>
        )}
        {room.status === "Ended" && (
          <div className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-600 text-[10px] font-bold text-center flex items-center justify-center gap-1">
            <Trophy size={12} /> View Results
          </div>
        )}
      </div>
    </motion.div>
  );
}
