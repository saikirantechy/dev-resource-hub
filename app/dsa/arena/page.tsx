"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Swords, Plus, Search, Users, QrCode, Globe, Lock, Zap } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import DSARoomCard from "@/components/dsa/DSARoomCard";
import DSACodeEditor from "@/components/dsa/DSACodeEditor";
import { ROOMS } from "@/lib/dsa/data";

type Tab = "Active" | "Upcoming" | "Ended";

export default function DSAArenaPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Active");
  const [roomKey, setRoomKey] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const filteredRooms = ROOMS.filter(r => r.status === activeTab);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <div className="gradient-mesh" />
      <Navbar />
      <main id="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-12 relative z-10">

          {/* ─── Header ─── */}
          <section className="space-y-6">
            <Link href="/dsa" className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white transition-colors">
              <ArrowLeft size={12} /> Back to DSA Arena
            </Link>
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
                <Swords size={12} /> Room Arena
              </div>
              <h1 className="text-5xl font-black tracking-tight">
                Assessment Room <span className="gradient-text-blue">Arena</span>
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Create a room, join a room, or compete with developers globally in real-time coding challenges.
              </p>
            </div>
          </section>

          {/* ─── Join / Create ─── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Join Room */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl glass border border-white/10 space-y-4"
            >
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Search size={14} className="text-blue-400" /> Join Room
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={roomKey}
                  onChange={(e) => setRoomKey(e.target.value)}
                  placeholder="Enter room key..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <button className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold hover:opacity-90 transition-all">
                  <Zap size={16} />
                </button>
              </div>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all">
                <QrCode size={14} /> Scan QR Code
              </button>
            </motion.div>

            {/* Create Room */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              className="p-6 rounded-2xl glass border border-white/10 space-y-4"
            >
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Plus size={14} className="text-emerald-400" /> Create Room
              </h3>
              <button
                onClick={() => setShowCreate(!showCreate)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Create New Room
              </button>
              {showCreate && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-3 pt-2">
                  <input placeholder="Room Name" className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                  <div className="grid grid-cols-2 gap-2">
                    <select className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 focus:outline-none focus:border-blue-500/50">
                      <option>Easy</option><option>Medium</option><option>Hard</option><option>Expert</option>
                    </select>
                    <select className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 focus:outline-none focus:border-blue-500/50">
                      <option>Python</option><option>JavaScript</option><option>C++</option><option>Java</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <select className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-400 focus:outline-none focus:border-blue-500/50">
                      <option>Arrays</option><option>Graphs</option><option>Trees</option><option>DP</option>
                    </select>
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
                      <span className="text-[10px] text-gray-500">Duration</span>
                      <input type="number" defaultValue={30} className="w-12 bg-transparent text-xs text-white text-center focus:outline-none" />
                      <span className="text-[10px] text-gray-500">min</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">Max Participants</span>
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg bg-white/5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all">-</button>
                      <span className="text-xs font-bold text-white w-5 text-center">8</span>
                      <button className="w-7 h-7 rounded-lg bg-white/5 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-gray-500 flex items-center gap-2"><Lock size={12} /> Private Room</span>
                    <div className="w-9 h-5 rounded-full bg-white/10 relative cursor-pointer">
                      <div className="w-3.5 h-3.5 rounded-full bg-gray-500 absolute top-0.5 left-0.5 transition-all" />
                    </div>
                  </div>
                  <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[10px] font-bold hover:opacity-90 transition-all">
                    Create Room
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* ─── Public Rooms ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-blue-400" />
              <h2 className="text-2xl font-black">Public Rooms</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {(["Active", "Upcoming", "Ended"] as Tab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                      : "bg-white/5 text-gray-400 border border-white/10 hover:text-white hover:border-white/20"
                  }`}
                >
                  {tab}
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-white/5 text-[8px]">
                    {ROOMS.filter(r => r.status === tab).length}
                  </span>
                </button>
              ))}
            </div>

            {/* Room Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredRooms.map((room, i) => (
                <DSARoomCard key={room.id} room={room} index={i} />
              ))}
              {filteredRooms.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                  <Users size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No {activeTab.toLowerCase()} rooms right now.</p>
                </div>
              )}
            </div>
          </section>

          {/* ─── Live Code Editor ─── */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Swords size={16} className="text-purple-400" />
              <h2 className="text-2xl font-black">Live Coding Arena</h2>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            <DSACodeEditor />
          </section>

        </div>
      </main>
    </div>
  );
}
