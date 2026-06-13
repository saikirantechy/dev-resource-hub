"use client";

import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

interface MapCity {
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  type: string;
  count: number;
  color: string;
}

interface InteractiveMapProps {
  cities: MapCity[];
  connections: [string, string][];
  selectedLayer: string | null;
  selectedCountry: string;
  selectedState: string;
}

// Mercator projection: lat/lng to x/y on a 2D plane
function mercatorProjection(
  lat: number,
  lng: number,
  width: number,
  height: number
): { x: number; y: number } {
  const x = ((lng + 180) / 360) * width;
  const latRad = (lat * Math.PI) / 180;
  const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
  const y = height / 2 - (height * mercN) / (2 * Math.PI);
  return { x, y };
}

const NODE_SIZE_MAP: Record<string, { base: number; label: string; glow: string }> = {
  emerald: { base: 6, label: "#34d399", glow: "rgba(52,211,153,0.6)" },
  blue: { base: 6, label: "#60a5fa", glow: "rgba(96,165,250,0.6)" },
  purple: { base: 6, label: "#a78bfa", glow: "rgba(167,139,250,0.6)" },
  orange: { base: 6, label: "#fb923c", glow: "rgba(251,146,60,0.6)" },
  cyan: { base: 6, label: "#22d3ee", glow: "rgba(34,211,238,0.6)" },
  pink: { base: 6, label: "#f472b6", glow: "rgba(244,114,182,0.6)" },
  amber: { base: 6, label: "#fbbf24", glow: "rgba(251,191,36,0.6)" },
};

const LAYER_COLORS: Record<string, string> = {
  Hub: "#34d399",
  Community: "#60a5fa",
  Startup: "#a78bfa",
  Event: "#f472b6",
  Contributor: "#fbbf24",
};

export default function InteractiveMap({
  cities,
  connections,
  selectedLayer,
  selectedCountry,
  selectedState,
}: InteractiveMapProps) {
  const [hoveredCity, setHoveredCity] = useState<MapCity | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 900, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Resize observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width } = entry.contentRect;
        const height = Math.round(width * 0.55);
        setDimensions({ width, height });
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Filtered cities based on layer & country
  const filteredCities = useMemo(() => {
    let result = cities;
    if (selectedLayer) {
      result = result.filter((c) => c.type === selectedLayer);
    }
    if (selectedCountry && selectedCountry !== "All") {
      result = result.filter((c) => c.country === selectedCountry);
    } else {
      // If no country selected and state filter present (for India)
      if (selectedState && selectedState !== "All States") {
        result = result.filter((c) => c.state === selectedState && c.country === "India");
      }
    }
    return result;
  }, [cities, selectedLayer, selectedCountry, selectedState]);

  // Filter connections
  const activeCities = useMemo(
    () => new Set(filteredCities.map((c) => c.city)),
    [filteredCities]
  );

  const filteredConnections = useMemo(
    () =>
      connections.filter(
        ([from, to]) => activeCities.has(from) && activeCities.has(to)
      ),
    [connections, activeCities]
  );

  // Build lookup
  const cityMap = useMemo(
    () =>
      cities.reduce<Record<string, MapCity>>((acc, c) => {
        acc[c.city] = c;
        return acc;
      }, {} as Record<string, MapCity>),
    [cities]
  );

  const { width, height } = dimensions;
  const padding = 20;
  const mapWidth = width - padding * 2;
  const mapHeight = height - padding * 2;

  // Mouse handlers for zoom & pan
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setZoom((prev) => {
      const newZoom = prev - e.deltaY * 0.001;
      return Math.max(1, Math.min(5, newZoom));
    });
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  }, [pan]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsPanning(true);
      setPanStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
    }
  }, [pan]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isPanning) {
        setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
      }
    },
    [isPanning, panStart]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isPanning && e.touches.length === 1) {
        setPan({ x: e.touches[0].clientX - panStart.x, y: e.touches[0].clientY - panStart.y });
      }
    },
    [isPanning, panStart]
  );

  const handleMouseUp = useCallback(() => setIsPanning(false), []);
  const handleTouchEnd = useCallback(() => setIsPanning(false), []);

  const handleNodeHover = useCallback(
    (city: MapCity, clientX: number, clientY: number) => {
      const rect = svgRef.current?.getBoundingClientRect();
      if (rect) {
        setTooltipPos({
          x: clientX - rect.left,
          y: clientY - rect.top - 10,
        });
      }
      setHoveredCity(city);
    },
    []
  );

  const handleResetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // Generate grid lines for cyberpunk aesthetic
  const gridLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const stepX = mapWidth / 12;
    const stepY = mapHeight / 8;
    for (let i = 0; i <= 12; i++) {
      const x = padding + i * stepX;
      lines.push({ x1: x, y1: padding, x2: x, y2: padding + mapHeight });
    }
    for (let i = 0; i <= 8; i++) {
      const y = padding + i * stepY;
      lines.push({ x1: padding, y1: y, x2: padding + mapWidth, y2: y });
    }
    return lines;
  }, [mapWidth, mapHeight]);

  // City projections
  const cityPositions = useMemo(
    () =>
      filteredCities.map((city) => {
        const pos = mercatorProjection(city.lat, city.lng, mapWidth, mapHeight);
        return { city, x: padding + pos.x, y: padding + pos.y };
      }),
    [filteredCities, mapWidth, mapHeight, padding]
  );

  const cityPosMap = useMemo(
    () =>
      cityPositions.reduce<Record<string, { x: number; y: number }>>(
        (acc, { city, x, y }) => {
          acc[city.city] = { x, y };
          return acc;
        },
        {}
      ),
    [cityPositions]
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#050508]"
      style={{ minHeight: 400 }}
    >
      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={handleResetView}
          className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/10 transition-all"
        >
          Reset View
        </button>
      </div>

      {/* Zoom indicator */}
      {zoom > 1 && (
        <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400">
          {zoom.toFixed(1)}x
        </div>
      )}

      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="img"
        aria-label="World map of developer ecosystems showing 40+ cities with glowing activity nodes"
        style={{ background: "#050508", touchAction: "none" }}
      >
        <defs>
          <radialGradient id="pulse-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59,130,246,0.3)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0)" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {["emerald", "blue", "purple", "orange", "cyan", "pink", "amber"].map((color) => (
            <filter key={color} id={`glow-${color}`}>
              <feGaussianBlur
                stdDeviation="3"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        <g
          transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}
          style={{ transformOrigin: `${width / 2}px ${height / 2}px` }}
        >
          {/* Grid background */}
          <g opacity={0.15}>
            {gridLines.map((line, i) => (
              <line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="rgba(59,130,246,0.3)"
                strokeWidth={0.5}
              />
            ))}
          </g>

          {/* Subtle world outline hint */}
          <rect x={padding} y={padding} width={mapWidth} height={mapHeight} rx={8} fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth={1} />

          {/* Connection lines */}
          <g>
            {filteredConnections.map(([from, to], i) => {
              const fromPos = cityPosMap[from];
              const toPos = cityPosMap[to];
              if (!fromPos || !toPos) return null;
              return (
                <motion.line
                  key={`conn-${i}`}
                  x1={fromPos.x}
                  y1={fromPos.y}
                  x2={toPos.x}
                  y2={toPos.y}
                  stroke={`url(#conn-grad-${i})`}
                  strokeWidth={0.8}
                  opacity={0.3}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              );
            })}
          </g>

          {/* Connection gradient defs */}
          <defs>
            {filteredConnections.map(([from, to], i) => {
              const fromCity = cityMap[from];
              const toCity = cityMap[to];
              const fromColor = fromCity
                ? NODE_SIZE_MAP[fromCity.color]?.label || "#60a5fa"
                : "#60a5fa";
              const toColor = toCity
                ? NODE_SIZE_MAP[toCity.color]?.label || "#a78bfa"
                : "#a78bfa";
              return (
                <linearGradient
                  key={`conn-grad-${i}`}
                  id={`conn-grad-${i}`}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor={fromColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={toColor} stopOpacity={0.4} />
                </linearGradient>
              );
            })}
          </defs>

          {/* City Nodes */}
          <g>
            {cityPositions.map(({ city, x, y }) => {
              const nodeStyle = NODE_SIZE_MAP[city.color] || NODE_SIZE_MAP.emerald;
              const baseRadius = nodeStyle.base;
              const size = baseRadius * (1 + city.count / 400);
              const radius = Math.min(size, 14);
              const color = nodeStyle.label;

              return (
                <g
                  key={city.city}
                  style={{ cursor: "pointer" }}
                  onMouseEnter={(e) => handleNodeHover(city, e.clientX, e.clientY)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onTouchStart={(e) => {
                    const touch = e.touches[0];
                    if (touch) handleNodeHover(city, touch.clientX, touch.clientY);
                  }}
                  onTouchEnd={() => setHoveredCity(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${city.city} - ${city.type} hub with ${city.count} developers`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      const svgEl = svgRef.current;
                      if (svgEl) {
                        const rect = svgEl.getBoundingClientRect();
                        handleNodeHover(city, rect.left + rect.width / 2, rect.top + rect.height / 2);
                      }
                    }
                    if (e.key === 'Escape') {
                      setHoveredCity(null);
                    }
                  }}
                >
                  {/* Pulse ring */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={radius * 3}
                    fill="none"
                    stroke={color}
                    strokeWidth={0.5}
                    opacity={0}
                    animate={{
                      opacity: [0, 0.4, 0],
                      r: [radius * 2, radius * 5, radius * 2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: Math.random() * 2,
                    }}
                  />

                  {/* Glow */}
                  <circle
                    cx={x}
                    cy={y}
                    r={radius * 2}
                    fill={nodeStyle.glow}
                    opacity={0.15}
                  />

                  {/* Core dot */}
                  <motion.circle
                    cx={x}
                    cy={y}
                    r={radius}
                    fill={color}
                    opacity={0.9}
                    filter={`url(#glow-${city.color})`}
                    animate={{
                      opacity: [0.7, 1, 0.7],
                      r: [radius, radius * 1.15, radius],
                    }}
                    transition={{
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 1.5,
                    }}
                  />

                  {/* City label (subtle) */}
                  <text
                    x={x}
                    y={y + radius + 12}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.4)"
                    fontSize="8"
                    fontWeight="600"
                    fontFamily="Inter, system-ui, sans-serif"
                    style={{ pointerEvents: "none" }}
                  >
                    {city.city}
                  </text>
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Tooltip */}
      {hoveredCity && (
        <div
          className="absolute z-30 pointer-events-none"
          style={{ left: tooltipPos.x, top: tooltipPos.y, transform: "translate(-50%, -100%)" }}
        >
          <div className="glass-strong border border-white/10 rounded-xl p-3 shadow-2xl min-w-[160px]">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background:
                    NODE_SIZE_MAP[hoveredCity.color]?.label || "#60a5fa",
                  boxShadow: `0 0 6px ${
                    NODE_SIZE_MAP[hoveredCity.color]?.glow || "rgba(96,165,250,0.6)"
                  }`,
                }}
              />
              <span className="text-sm font-bold text-white">
                {hoveredCity.city}
              </span>
            </div>
            <div className="text-[10px] text-gray-400 space-y-0.5">
              <div>
                {hoveredCity.country}
                {hoveredCity.state ? ` • ${hoveredCity.state}` : ""}
              </div>
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-[8px] font-bold uppercase tracking-wider">
                  {hoveredCity.type}
                </span>
                <span className="text-gray-500">{hoveredCity.count} developers</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-wrap gap-3">
        {Object.entries(LAYER_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: color,
                boxShadow: `0 0 6px ${color}66`,
              }}
            />
            <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
              {type}
            </span>
          </div>
        ))}
      </div>

      {/* Count badge */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400">
        {filteredCities.length} active nodes
      </div>
    </div>
  );
}
