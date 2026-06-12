"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Globe, MapPin, ChevronDown, SlidersHorizontal, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import InteractiveMap from "@/components/map/InteractiveMap";
import ActivityFeed from "@/components/map/ActivityFeed";
import StatsDashboard from "@/components/map/StatsDashboard";
import EcosystemLayer from "@/components/map/EcosystemLayer";
import mapData from "@/data/mapData.json";

const indiaStates = [
  "All States",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Telangana",
  "Delhi NCR",
  "Kerala",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Uttar Pradesh",
  "Punjab",
  "Haryana",
  "Andhra Pradesh",
  "Odisha",
  "Madhya Pradesh",
  "Goa",
  "Assam",
  "Bihar",
];

export default function DevMapPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050508]" />}>
      <DevMapContent />
    </Suspense>
  );
}

function DevMapContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Valid countries list (memoized, also used for dropdown)
  const validCountries = useMemo(
    () => [...new Set(mapData.cities.map((c) => c.country))],
    []
  );

  // Read & validate filter state from URL query params on mount
  const rawCountry = searchParams.get("country") || "All";
  const urlCountry = validCountries.includes(rawCountry) ? rawCountry : "All";
  const urlLayer = searchParams.get("layer") || null;
  const urlState = urlCountry === "India" ? searchParams.get("state") || "All States" : "All States";

  const [country, setCountry] = useState(urlCountry);
  const [state, setState] = useState(urlState);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(urlLayer);

  // Sync filter state to URL query params whenever they change
  useEffect(() => {
    const params = new URLSearchParams();
    if (country && country !== "All") params.set("country", country);
    if (country === "India" && state && state !== "All States") params.set("state", state);
    if (selectedLayer) params.set("layer", selectedLayer);

    const query = params.toString();
    const newUrl = query ? `?${query}` : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  }, [country, state, selectedLayer, router]);

  const countriesList = useMemo(
    () => getCountriesList(mapData.cities),
    []
  );

  const citiesFiltered = useMemo(
    () => citiesFilteredByCountry(mapData.cities, country, state),
    [country, state]
  );

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navbar />
      <main id="main-content" className="relative">
        {/* Animated background orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="fixed top-32 left-1/4 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[150px] -z-10 pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1],
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
            {/* ─── HEADER ─── */}
            <div className="text-center space-y-5">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 badge badge-emerald"
              >
                <Globe size={11} />
                <span className="relative">
                  AI Developer Activity Map
                  <span className="absolute -top-0.5 -right-2 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="text-5xl md:text-7xl font-black tracking-tighter"
              >
                Global{" "}
                <span className="gradient-text-hero">Developer</span>{" "}
                <span className="text-white/70">Ecosystem</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-500 text-base max-w-2xl mx-auto"
              >
                Explore 65+ developer hubs, communities, startups, events, and
                contributors across the global AI ecosystem. Real-time activity
                from the global developer network.
              </motion.p>
            </div>

            {/* ─── FILTERS ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 mr-1">
                <SlidersHorizontal size={12} />
                Filters
              </div>

              {/* Country Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all min-w-[160px]"
                >
                  <Globe size={14} className="text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{country === "All" ? "All Countries" : country}</span>
                  <ChevronDown size={12} className="ml-auto text-gray-500 flex-shrink-0" />
                </button>
                {showCountryDropdown && (
                  <div className="absolute top-full mt-1.5 left-0 w-full bg-[#0a0a14] border border-white/10 rounded-xl shadow-2xl z-20 max-h-52 overflow-y-auto">
                    {countriesList.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCountry(c);
                          setState("All States");
                          setShowCountryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/5 transition-colors ${
                          country === c
                            ? "text-emerald-400 bg-emerald-500/8"
                            : "text-gray-300"
                        }`}
                      >
                        {c === "All" ? "All Countries" : c}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* State Dropdown (India only) */}
              {country === "India" && (
                <div className="relative">
                  <button
                    onClick={() => setShowStateDropdown(!showStateDropdown)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white hover:bg-white/10 transition-all min-w-[160px]"
                  >
                    <MapPin size={14} className="text-blue-400 flex-shrink-0" />
                    <span className="truncate">{state}</span>
                    <ChevronDown size={12} className="ml-auto text-gray-500 flex-shrink-0" />
                  </button>
                  {showStateDropdown && (
                    <div className="absolute top-full mt-1.5 left-0 w-full bg-[#0a0a14] border border-white/10 rounded-xl shadow-2xl z-20 max-h-52 overflow-y-auto">
                      {indiaStates.map((s) => (
                        <button
                          key={s}
                          onClick={() => {
                            setState(s);
                            setShowStateDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-xs font-bold hover:bg-white/5 transition-colors ${
                            state === s
                              ? "text-blue-400 bg-blue-500/8"
                              : "text-gray-300"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Active nodes count */}
              <div className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8">
                <Sparkles size={12} className="text-purple-400" />
                <span className="text-[10px] font-bold text-gray-400">
                  <span className="text-white">{citiesFiltered.length}</span> cities
                </span>
              </div>
            </motion.div>

            {/* ─── ECOSYSTEM LAYER TOGGLES ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <EcosystemLayer
                selectedLayer={selectedLayer}
                onLayerChange={setSelectedLayer}
              />
            </motion.div>

            {/* ─── INTERACTIVE MAP ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.6 }}
            >
              <InteractiveMap
                cities={mapData.cities}
                connections={mapData.connections as [string, string][]}
                selectedLayer={selectedLayer}
                selectedCountry={country}
                selectedState={state}
              />
            </motion.div>

            {/* ─── STATISTICS ─── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <StatsDashboard statistics={mapData.statistics} />
            </motion.div>

            {/* ─── BOTTOM GRID: Activity + City List ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Feed */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="lg:col-span-1"
              >
                <ActivityFeed activities={mapData.activities} />
              </motion.div>

              {/* City Details */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2"
              >
                <div className="rounded-2xl glass border border-white/8 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-blue-400" />
                      <span className="text-sm font-bold text-white">
                        {country === "All" ? "All" : country}{" "}
                        {country === "India" && state !== "All States"
                          ? `• ${state}`
                          : ""}{" "}
                        — Developer Hubs
                      </span>
                    </div>
                    <span className="text-[9px] text-gray-500 font-bold">
                      {citiesFiltered.length} locations
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 max-h-[400px] overflow-y-auto scrollbar-hide">
                    {citiesFiltered.length === 0 ? (
                      <div className="col-span-full text-center py-8">
                        <Globe size={32} className="text-gray-600 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">No cities match the current filters.</p>
                      </div>
                    ) : (
                      citiesFiltered
                        .sort((a, b) => b.count - a.count)
                        .map((city, i) => (
                          <motion.div
                            key={city.city}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.02 }}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-colors border border-transparent hover:border-white/5"
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                                city.color === "emerald"
                                  ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]"
                                  : city.color === "blue"
                                  ? "bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.5)]"
                                  : city.color === "purple"
                                  ? "bg-purple-400 shadow-[0_0_6px_rgba(167,139,250,0.5)]"
                                  : city.color === "orange"
                                  ? "bg-orange-400 shadow-[0_0_6px_rgba(251,146,60,0.5)]"
                                  : "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.5)]"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="text-xs font-bold text-white truncate">
                                {city.city}
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] text-gray-500">
                                  {city.country}
                                </span>
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/5 text-gray-400 font-bold uppercase">
                                  {city.type}
                                </span>
                              </div>
                            </div>
                            <div className="text-xs font-bold tabular-nums text-gray-400">
                              {city.count}
                            </div>
                          </motion.div>
                        ))
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
