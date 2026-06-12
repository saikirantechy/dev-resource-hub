"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  ExternalLink,
  Users,
  Globe,
  Search,
  Building2,
  Trophy,
  Coffee,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import eventsData from "@/data/events.json";

interface Event {
  id: string;
  name: string;
  category: "Conference" | "Hackathon" | "Meetup";
  date: string;
  endDate?: string;
  city: string;
  state?: string;
  country: string;
  venue: string;
  description: string;
  registrationUrl: string;
  price: string;
  attendees: number;
  organizer: string;
  tags: string[];
}

const CATEGORY_META: Record<
  string,
  { icon: React.ElementType; color: string; gradient: string }
> = {
  Conference: {
    icon: Building2,
    color: "text-blue-400",
    gradient: "from-blue-500/20 to-indigo-500/10",
  },
  Hackathon: {
    icon: Trophy,
    color: "text-orange-400",
    gradient: "from-orange-500/20 to-red-500/10",
  },
  Meetup: {
    icon: Coffee,
    color: "text-emerald-400",
    gradient: "from-emerald-500/20 to-teal-500/10",
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateRange(start: string, end?: string): string {
  if (!end) return formatDate(start);
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} \u2013 ${endDate.toLocaleDateString("en-US", {
      day: "numeric",
      year: "numeric",
    })}`;
  }
  return `${formatDate(start)} \u2013 ${formatDate(end)}`;
}

function getMonthGroup(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function sortKey(dateStr: string): number {
  return new Date(dateStr).getTime();
}

const FILTERS = ["All", "Conference", "Hackathon", "Meetup"];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const events = eventsData.events as Event[];

  const filteredEvents = useMemo(() => {
    let result = events;
    if (activeFilter !== "All") {
      result = result.filter((e) => e.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.country.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)) ||
          e.organizer.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => sortKey(a.date) - sortKey(b.date));
  }, [activeFilter, searchQuery, events]);

  const monthGroups = useMemo(() => {
    const groups: Record<string, Event[]> = {};
    for (const event of filteredEvents) {
      const group = getMonthGroup(event.date);
      if (!groups[group]) groups[group] = [];
      groups[group].push(event);
    }
    return Object.entries(groups).sort(
      ([a], [b]) => sortKey(a) - sortKey(b)
    );
  }, [filteredEvents]);

  const cityOptions = useMemo(
    () => [...new Set(events.map((e) => e.city))].sort(),
    [events]
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        {/* Background orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.25, 0.12],
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="fixed top-32 left-1/4 w-[600px] h-[600px] bg-pink-500/8 rounded-full blur-[150px] -z-10 pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -80, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="fixed top-48 right-1/4 w-[500px] h-[500px] bg-blue-500/8 rounded-full blur-[130px] -z-10 pointer-events-none"
        />

        <section className="px-4 sm:px-6 pt-24 pb-20">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* ─── HERO ─── */}
            <div className="text-center space-y-5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 badge badge-pink"
              >
                <Calendar size={11} />
                <span className="relative">
                  AI Events Calendar
                  <span className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-5xl md:text-7xl font-black tracking-tighter"
              >
                Global{" "}
                <span className="gradient-text-hero">AI Events</span>{" "}
                <span className="text-white/70">Calendar</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 text-base max-w-2xl mx-auto"
              >
                Discover AI hackathons, tech conferences, and developer meetups
                happening across {events.length}+ cities worldwide. Register
                directly and connect with the global AI community.
              </motion.p>
            </div>

            {/* ─── SEARCH & FILTERS ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              {/* Search bar */}
              <div className="relative max-w-md mx-auto">
                <Search
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
                />                  <input
                  type="text"
                  placeholder="Search events, cities, topics..."
                  aria-label="Search events"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/40 focus:bg-white/8 transition-all"
                />
              </div>

              {/* Category pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {FILTERS.map((f) => {
                  const isActive = activeFilter === f;
                  const meta = f !== "All" ? CATEGORY_META[f] : null;
                  return (
                    <motion.button
                      key={f}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveFilter(f)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold border transition-all flex items-center gap-1.5 ${
                        isActive
                          ? f === "All"
                            ? "bg-white/10 border-white/20 text-white"
                            : `${meta?.color} bg-white/10 border-white/20`
                          : "bg-white/[0.03] border-white/5 text-gray-500 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {meta && <meta.icon size={12} />}
                      {f === "All" ? "All Events" : f}
                    </motion.button>
                  );
                })}
              </div>

              {/* Stats bar */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] font-bold text-gray-500">
                <span>
                  <span className="text-white">{filteredEvents.length}</span>{" "}
                  events
                </span>
                <span>{"\u2022"}</span>
                <span>
                  <span className="text-blue-400">
                    {
                      filteredEvents.filter((e) => e.category === "Conference")
                        .length
                    }
                  </span>{" "}
                  conferences
                </span>
                <span>{"\u2022"}</span>
                <span>
                  <span className="text-orange-400">
                    {
                      filteredEvents.filter((e) => e.category === "Hackathon")
                        .length
                    }
                  </span>{" "}
                  hackathons
                </span>
                <span>{"\u2022"}</span>
                <span>
                  <span className="text-emerald-400">
                    {
                      filteredEvents.filter((e) => e.category === "Meetup")
                        .length
                    }
                  </span>{" "}
                  meetups
                </span>
              </div>
            </motion.div>

            {/* ─── EVENTS LIST ─── */}
            {monthGroups.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Calendar
                  size={48}
                  className="text-gray-700 mx-auto mb-4"
                />
                <p className="text-lg font-bold text-gray-400">
                  No events match your search
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Try different keywords or clear the filter
                </p>
              </motion.div>
            ) : (
              <div className="space-y-10">
                {monthGroups.map(([month, monthEvents], gi) => (
                  <motion.div
                    key={month}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + gi * 0.05 }}
                  >
                    {/* Month header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-white/5" />
                      <span className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
                        {month}
                      </span>
                      <div className="h-px flex-1 bg-white/5" />
                    </div>

                    {/* Event cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <AnimatePresence mode="popLayout">
                        {monthEvents.map((event, i) => {
                          const meta = CATEGORY_META[event.category];
                          const IconComponent = meta.icon;
                          return (
                            <motion.div
                              key={event.id}
                              layout
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{
                                delay: i * 0.03,
                                duration: 0.35,
                              }}
                              className="group relative rounded-2xl glass border border-white/8 overflow-hidden hover:border-pink-500/20 transition-all duration-300"
                            >
                              {/* Gradient top accent */}
                              <div
                                className={`absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                              />

                              <div className="relative z-10 p-5 space-y-4">
                                {/* Category badge + price */}
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 text-[9px] font-bold uppercase tracking-wider ${meta.color}`}
                                  >
                                    <IconComponent size={10} />
                                    {event.category}
                                  </span>
                                  <span className="text-[9px] font-bold text-gray-500">
                                    {event.price}
                                  </span>
                                </div>

                                {/* Name */}
                                <h3 className="text-sm font-black text-white leading-snug group-hover:text-pink-100 transition-colors">
                                  {event.name}
                                </h3>

                                {/* Description */}
                                <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">
                                  {event.description}
                                </p>

                                {/* Details */}
                                <div className="space-y-1.5">
                                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <Calendar size={11} className="shrink-0 text-pink-400" />
                                    <span className="font-medium">
                                      {formatDateRange(
                                        event.date,
                                        event.endDate
                                      )}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <MapPin size={11} className="shrink-0 text-blue-400" />
                                    <span className="font-medium truncate">
                                      {event.venue}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <Globe size={11} className="shrink-0 text-emerald-400" />
                                    <span className="font-medium">
                                      {event.city}
                                      {event.state ? `, ${event.state}` : ""},{" "}
                                      {event.country}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <Users size={11} className="shrink-0 text-purple-400" />
                                    <span className="font-medium">
                                      {event.attendees.toLocaleString()}{" "}
                                      attendees
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <Building2 size={11} className="shrink-0 text-amber-400" />
                                    <span className="font-medium">
                                      {event.organizer}
                                    </span>
                                  </div>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1">
                                  {event.tags.map((tag) => (
                                    <span
                                      key={tag}
                                      className="px-1.5 py-0.5 rounded-md bg-white/[0.04] text-[8px] font-bold text-gray-500 uppercase tracking-wider"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>

                                {/* Register button */}
                                <a
                                  href={event.registrationUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white text-[10px] font-bold hover:from-pink-500 hover:to-rose-500 transition-all hover:shadow-lg hover:shadow-pink-500/20"
                                >
                                  <ExternalLink size={12} />
                                  Register Now
                                </a>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ─── FOOTER STATS ─── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-8 text-center"
            >
              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl glass border border-white/8">
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <Calendar size={12} className="text-pink-400" />
                  <span>
                    <span className="text-white font-bold">
                      {events.length}
                    </span>{" "}
                    events
                  </span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <Globe size={12} className="text-blue-400" />
                  <span>
                    <span className="text-white font-bold">
                      {cityOptions.length}
                    </span>{" "}
                    cities
                  </span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <Users size={12} className="text-emerald-400" />
                  <span>
                    <span className="text-white font-bold">
                      {events
                        .reduce((sum, e) => sum + e.attendees, 0)
                        .toLocaleString()}
                    </span>{" "}
                    total attendees
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
