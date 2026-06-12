"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, MapPin, Users, Calendar, Building2, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";

const countries = [
  "India", "United States", "United Kingdom", "Canada", "Germany",
  "France", "Australia", "Japan", "Singapore", "Brazil",
  "South Korea", "Netherlands", "Sweden", "Israel", "UAE",
];

const indiaStates = [
  "All States", "Karnataka", "Maharashtra", "Tamil Nadu", "Telangana",
  "Delhi NCR", "Kerala", "West Bengal", "Gujarat", "Rajasthan",
  "Uttar Pradesh", "Punjab", "Haryana", "Andhra Pradesh", "Odisha",
];

const communities = [
  { name: "Bangalore AI Devs", location: "Bengaluru, Karnataka", members: "12.4k", type: "AI/ML" },
  { name: "Hyderabad Tech Hub", location: "Hyderabad, Telangana", members: "8.2k", type: "Full Stack" },
  { name: "Chennai AI Meetup", location: "Chennai, Tamil Nadu", members: "5.1k", type: "AI/ML" },
  { name: "Mumbai Startup Circle", location: "Mumbai, Maharashtra", members: "9.7k", type: "Startup" },
  { name: "Delhi Developers Guild", location: "Delhi NCR", members: "6.8k", type: "General" },
  { name: "Pune AI Research Group", location: "Pune, Maharashtra", members: "3.4k", type: "Research" },
  { name: "Kochi Tech Community", location: "Kochi, Kerala", members: "2.1k", type: "General" },
  { name: "Ahmedabad Devs", location: "Ahmedabad, Gujarat", members: "1.8k", type: "Web Dev" },
];

const hackathons = [
  { name: "AI for India Hackathon", date: "Jul 2026", location: "Bengaluru", participants: "2,400+" },
  { name: "Smart India Hackathon", date: "Aug 2026", location: "Multiple Cities", participants: "50,000+" },
  { name: "Dev Resource Buildathon", date: "Sep 2026", location: "Hyderabad", participants: "500+" },
  { name: "Open Source India", date: "Oct 2026", location: "Bengaluru", participants: "3,000+" },
];

const startups = [
  { name: "Postman", city: "Bengaluru", stage: "Public", focus: "API Platform" },
  { name: "Zepto", city: "Mumbai", stage: "Series F", focus: "Quick Commerce" },
  { name: "Razorpay", city: "Bengaluru", stage: "Series F", focus: "Payments" },
  { name: "CRED", city: "Bengaluru", stage: "Series F", focus: "Fintech" },
  { name: "Cure.fit", city: "Bengaluru", stage: "Series F", focus: "Health" },
  { name: "Ola", city: "Bengaluru", stage: "Public", focus: "Mobility" },
];

export default function DevMapPage() {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("All States");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-6">
              <div className="badge badge-emerald inline-flex"><Globe size={11} /> Global Developer Map</div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                <span className="gradient-text-hero">Global Developer</span> Ecosystem
              </h1>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Discover developer communities, AI meetups, hackathons, and startup ecosystems worldwide.
              </p>
            </div>

            {/* Country & State Filters */}
            <div className="flex flex-wrap justify-center gap-4">
              {/* Country Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all min-w-[200px]"
                >
                  <Globe size={16} className="text-emerald-400" />
                  {country}
                  <ChevronDown size={14} className="ml-auto text-gray-500" />
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full mt-2 left-0 w-full bg-[#0a0a14] border border-white/10 rounded-xl shadow-2xl z-10 max-h-60 overflow-y-auto">
                    {countries.map((c) => (
                      <button
                        key={c}
                        onClick={() => { setCountry(c); setShowCountryDropdown(false); }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-white/5 transition-colors ${country === c ? "text-emerald-400 bg-emerald-500/8" : "text-gray-300"}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* State Dropdown (only for India) */}
              {country === "India" && (
                <div className="relative">
                  <button
                    onClick={() => setShowStateDropdown(!showStateDropdown)}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all min-w-[200px]"
                  >
                    <MapPin size={16} className="text-blue-400" />
                    {state}
                    <ChevronDown size={14} className="ml-auto text-gray-500" />
                  </button>
                  {showStateDropdown && (
                    <div className="absolute top-full mt-2 left-0 w-full bg-[#0a0a14] border border-white/10 rounded-xl shadow-2xl z-10 max-h-60 overflow-y-auto">
                      {indiaStates.map((s) => (
                        <button
                          key={s}
                          onClick={() => { setState(s); setShowStateDropdown(false); }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold hover:bg-white/5 transition-colors ${state === s ? "text-blue-400 bg-blue-500/8" : "text-gray-300"}`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Developer Communities", value: "245+", icon: Users, color: "text-blue-400" },
                { label: "AI Meetups Monthly", value: "120+", icon: Calendar, color: "text-purple-400" },
                { label: "Startup Ecosystems", value: "80+", icon: Building2, color: "text-emerald-400" },
                { label: "Open Source Contributors", value: "50k+", icon: Globe, color: "text-orange-400" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl glass-strong border border-white/8 p-5 text-center"
                >
                  <stat.icon size={20} className={`${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-black">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Communities */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <Users size={20} className="text-blue-400" /> Developer Communities in {country}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {communities
                  .filter((c) => state === "All States" || c.location.includes(state.split(" ")[0]))
                  .map((c, i) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl glass border border-white/8 p-5 hover:border-emerald-400/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 flex items-center justify-center">
                          <Users size={16} className="text-emerald-400" />
                        </div>
                        <div>
                          <div className="text-sm font-bold">{c.name}</div>
                          <div className="text-[10px] text-gray-500">{c.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">{c.members} members</span>
                        <span className="badge badge-emerald">{c.type}</span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Hackathons */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <Calendar size={20} className="text-purple-400" /> Upcoming Hackathons
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {hackathons.map((h, i) => (
                  <motion.div
                    key={h.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-2xl glass border border-white/8 p-5 hover:border-purple-400/30 transition-colors"
                  >
                    <div className="badge badge-purple mb-3">{h.date}</div>
                    <div className="text-sm font-bold mb-1">{h.name}</div>
                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                      <MapPin size={10} /> {h.location}
                    </div>
                    <div className="text-xs text-gray-400 mt-2">{h.participants} participants</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Startup Ecosystem */}
            <div>
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <Building2 size={20} className="text-orange-400" /> Startup Ecosystem
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {startups.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl glass border border-white/8 p-5 hover:border-orange-400/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-bold">{s.name}</div>
                      <span className="badge badge-orange text-[9px]">{s.stage}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                      <MapPin size={10} /> {s.city}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1">{s.focus}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
