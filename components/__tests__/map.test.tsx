import React from "react";
import { describe, it, expect, beforeAll, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

// Mock ResizeObserver for components that use it
beforeAll(() => {
  (globalThis as any).ResizeObserver = class MockResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

// SVG elements that motion can render
const SVG_ELEMENTS = new Set(["circle", "line", "rect", "g", "text", "defs", "stop", "svg"]);

// Mock framer-motion to avoid animation issues in jsdom
vi.mock("framer-motion", async () => {
  const actual = await vi.importActual("framer-motion");
  return {
    ...actual,
    motion: new Proxy({}, {
      get: (_, element: any) => {
        const Tag = SVG_ELEMENTS.has(element) ? element : "div";
        return (props: any) => {
          const { initial: _i, animate: _a, exit: _e, transition: _t, whileTap: _wt, whileHover: _wh, variants: _v, layout: _l, layoutId: _li, ...safe } = props;
          return React.createElement(Tag, safe, props.children);
        };
      },
    }),
  };
});
import EcosystemLayer from "@/components/map/EcosystemLayer";
import StatsDashboard from "@/components/map/StatsDashboard";
import ActivityFeed from "@/components/map/ActivityFeed";
import InteractiveMap from "@/components/map/InteractiveMap";
import {
  mercatorProjection,
  filterCities,
  filterConnections,
  computeCityPositions,
  computeCityPositionMap,
  formatNumber,
  computeNodeRadius,
  type MapCity,
} from "@/lib/mapUtils";
import mapData from "@/data/mapData.json";

describe("mercatorProjection", () => {
  const W = 900;
  const H = 500;

  it("places the prime meridian and equator at center", () => {
    const pos = mercatorProjection(0, 0, W, H);
    expect(pos.x).toBeCloseTo(450, 0);
    expect(pos.y).toBeCloseTo(250, 0);
  });

  it("projects Bengaluru correctly", () => {
    const pos = mercatorProjection(12.9716, 77.5946, W, H);
    expect(pos.x).toBeGreaterThan(450);
    expect(pos.y).toBeLessThan(250);
  });

  it("projects San Francisco correctly", () => {
    const pos = mercatorProjection(37.7749, -122.4194, W, H);
    expect(pos.x).toBeLessThan(450);
    expect(pos.y).toBeLessThan(250);
    expect(pos.x).toBeGreaterThan(0);
    expect(pos.y).toBeGreaterThan(0);
  });

  it("projects Sydney (southern hemisphere) with y > 250", () => {
    const pos = mercatorProjection(-33.8688, 151.2093, W, H);
    expect(pos.y).toBeGreaterThan(250);
    expect(pos.x).toBeGreaterThan(700);
  });

  it("is consistent for the same coordinates", () => {
    const p1 = mercatorProjection(12.9716, 77.5946, W, H);
    const p2 = mercatorProjection(12.9716, 77.5946, W, H);
    expect(p1).toEqual(p2);
  });

  it("returns positions within map bounds for extreme coordinates", () => {
    for (const { lat, lng } of [{ lat: 85, lng: -170 }, { lat: -85, lng: 170 }, { lat: 45, lng: -100 }, { lat: -45, lng: 100 }]) {
      const pos = mercatorProjection(lat, lng, W, H);
      expect(pos.x).toBeGreaterThanOrEqual(0);
      expect(pos.x).toBeLessThanOrEqual(W);
      expect(pos.y).toBeGreaterThanOrEqual(0);
      expect(pos.y).toBeLessThanOrEqual(H);
    }
  });
});

describe("filterCities", () => {
  const sampleCities: MapCity[] = [
    { city: "Bengaluru", state: "Karnataka", country: "India", lat: 12.97, lng: 77.59, type: "Hub", count: 245, color: "emerald" },
    { city: "San Francisco", country: "United States", lat: 37.77, lng: -122.42, type: "Hub", count: 320, color: "purple" },
    { city: "London", country: "United Kingdom", lat: 51.51, lng: -0.13, type: "Hub", count: 260, color: "blue" },
    { city: "Mumbai", state: "Maharashtra", country: "India", lat: 19.08, lng: 72.88, type: "Startup", count: 210, color: "purple" },
    { city: "Berlin", country: "Germany", lat: 52.52, lng: 13.41, type: "Event", count: 22, color: "pink" },
    { city: "Delhi NCR", state: "Delhi", country: "India", lat: 28.70, lng: 77.10, type: "Contributor", count: 48, color: "amber" },
  ];

  it("returns all cities when no filters active", () => {
    const result = filterCities(sampleCities, null, "All", "All States");
    expect(result).toHaveLength(6);
  });

  it("filters by layer type", () => {
    const hubs = filterCities(sampleCities, "Hub", "All", "All States");
    expect(hubs).toHaveLength(3);
    expect(hubs.every((c) => c.type === "Hub")).toBe(true);
    const events = filterCities(sampleCities, "Event", "All", "All States");
    expect(events).toHaveLength(1);
    expect(events[0].city).toBe("Berlin");
  });

  it("filters by country", () => {
    const india = filterCities(sampleCities, null, "India", "All States");
    expect(india).toHaveLength(3);
    expect(india.every((c) => c.country === "India")).toBe(true);
  });

  it("filters by country and layer", () => {
    const indiaHubs = filterCities(sampleCities, "Hub", "India", "All States");
    expect(indiaHubs).toHaveLength(1);
    expect(indiaHubs[0].city).toBe("Bengaluru");
  });

  it("filters by state within India", () => {
    const maharashtra = filterCities(sampleCities, null, "India", "Maharashtra");
    expect(maharashtra).toHaveLength(1);
    expect(maharashtra[0].city).toBe("Mumbai");
  });

  it("returns empty when no match", () => {
    const result = filterCities(sampleCities, "Startup", "United Kingdom", "All States");
    expect(result).toHaveLength(0);
  });

  it("ignores state filter when country is All", () => {
    const allWithState = filterCities(sampleCities, null, "All", "Karnataka");
    expect(allWithState).toHaveLength(6);
  });

  it("is pure (does not mutate input)", () => {
    const originalLength = sampleCities.length;
    filterCities(sampleCities, "Hub", "Canada", "All States");
    expect(sampleCities).toHaveLength(originalLength);
  });

  it("returns all entries when same city has multiple types (no layer filter)", () => {
    const multiTypeCities: MapCity[] = [
      { city: "Bengaluru", state: "Karnataka", country: "India", lat: 12.97, lng: 77.59, type: "Hub", count: 245, color: "emerald" },
      { city: "Bengaluru", state: "Karnataka", country: "India", lat: 12.97, lng: 77.59, type: "Event", count: 32, color: "pink" },
      { city: "Bengaluru", state: "Karnataka", country: "India", lat: 12.97, lng: 77.59, type: "Contributor", count: 85, color: "amber" },
    ];
    const all = filterCities(multiTypeCities, null, "All", "All States");
    expect(all).toHaveLength(3);
    const justEvents = filterCities(multiTypeCities, "Event", "All", "All States");
    expect(justEvents).toHaveLength(1);
    expect(justEvents[0].type).toBe("Event");
  });
});

describe("filterConnections", () => {
  const connections: [string, string][] = [
    ["Bengaluru", "Hyderabad"],
    ["Bengaluru", "Mumbai"],
    ["San Francisco", "New York"],
    ["London", "Berlin"],
    ["Tokyo", "Seoul"],
  ];

  it("returns all connections when all cities active", () => {
    const active = ["Bengaluru", "Hyderabad", "Mumbai", "San Francisco", "New York", "London", "Berlin", "Tokyo", "Seoul"];
    expect(filterConnections(connections, active)).toHaveLength(5);
  });

  it("filters connections to only active cities", () => {
    const active = ["Bengaluru", "Hyderabad", "Mumbai"];
    const result = filterConnections(connections, active);
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      ["Bengaluru", "Hyderabad"],
      ["Bengaluru", "Mumbai"],
    ]);
  });

  it("returns empty when no active connections", () => {
    const active = ["Tokyo", "Sydney"];
    expect(filterConnections(connections, active)).toHaveLength(0);
  });

  it("returns empty for empty connections", () => {
    expect(filterConnections([], ["Bengaluru"])).toHaveLength(0);
  });

  it("returns empty for empty active cities", () => {
    expect(filterConnections(connections, [])).toHaveLength(0);
  });
});

describe("computeCityPositions", () => {
  const cities: MapCity[] = [
    { city: "London", country: "UK", lat: 51.51, lng: -0.13, type: "Hub", count: 100, color: "blue" },
    { city: "Bengaluru", country: "India", lat: 12.97, lng: 77.59, type: "Hub", count: 100, color: "emerald" },
  ];

  it("computes positions for all cities", () => {
    const positions = computeCityPositions(cities, 860, 460, 20);
    expect(positions).toHaveLength(2);
  });

  it("returns positions with x,y and original city", () => {
    const positions = computeCityPositions(cities, 860, 460, 20);
    expect(positions[0].city.city).toBe("London");
    expect(typeof positions[0].x).toBe("number");
    expect(typeof positions[0].y).toBe("number");
  });

  it("applies padding correctly", () => {
    const positions = computeCityPositions(cities, 860, 460, 20);
    for (const p of positions) {
      expect(p.x).toBeGreaterThanOrEqual(20);
      expect(p.x).toBeLessThanOrEqual(20 + 860);
      expect(p.y).toBeGreaterThanOrEqual(20);
      expect(p.y).toBeLessThanOrEqual(20 + 460);
    }
  });

  it("London is left of Bengaluru on the map", () => {
    const positions = computeCityPositions(cities, 860, 460, 20);
    expect(positions[0].x).toBeLessThan(positions[1].x);
  });
});

describe("computeCityPositionMap", () => {
  it("builds a lookup map from city positions", () => {
    const positions = [
      { city: { city: "London", country: "UK", lat: 51.51, lng: -0.13, type: "Hub", count: 100, color: "blue" }, x: 200, y: 100 },
      { city: { city: "Paris", country: "France", lat: 48.86, lng: 2.35, type: "Hub", count: 80, color: "purple" }, x: 220, y: 120 },
    ];
    const map = computeCityPositionMap(positions);
    expect(map["London"]).toEqual({ x: 200, y: 100 });
    expect(map["Paris"]).toEqual({ x: 220, y: 120 });
    expect(map["Berlin"]).toBeUndefined();
  });
});

describe("formatNumber", () => {
  it("formats numbers below 1000 as-is", () => {
    expect(formatNumber(0)).toBe("0");
    expect(formatNumber(1)).toBe("1");
    expect(formatNumber(480)).toBe("480");
    expect(formatNumber(999)).toBe("999");
  });

  it("formats numbers >= 1000 with k suffix (1 decimal for < 10000)", () => {
    expect(formatNumber(1000)).toBe("1.0k");
    expect(formatNumber(1842)).toBe("1.8k");
    expect(formatNumber(1258)).toBe("1.3k");
  });

  it("formats numbers >= 10000 without decimal", () => {
    expect(formatNumber(10000)).toBe("10k");
    expect(formatNumber(18420)).toBe("18k");
    expect(formatNumber(12580)).toBe("13k");
    expect(formatNumber(50000)).toBe("50k");
  });
});

describe("computeNodeRadius", () => {
  it("returns base radius for count of 0", () => {
    expect(computeNodeRadius(0)).toBe(6);
  });

  it("scales with count", () => {
    const r100 = computeNodeRadius(100);
    const r400 = computeNodeRadius(400);
    expect(r400).toBeGreaterThan(r100);
  });

  it("caps at max radius", () => {
    const r10000 = computeNodeRadius(10000);
    expect(r10000).toBeLessThanOrEqual(14);
  });

  it("returns sensible values for typical counts", () => {
    expect(computeNodeRadius(245)).toBeCloseTo(9.675, 0);
    expect(computeNodeRadius(320)).toBeCloseTo(10.8, 0);
    expect(computeNodeRadius(22, 6, 14)).toBeCloseTo(6.33, 2);
  });
});

describe("mapData.json integrity", () => {
  const VALID_COLORS = ["emerald", "blue", "purple", "orange", "cyan", "pink", "amber"];
  const VALID_TYPES = ["Hub", "Community", "Startup", "Event", "Contributor"];
  const VALID_ICONS = ["workflow", "user", "blog", "prompt", "fork", "star", "plugin", "check", "pr", "event", "bot", "share", "community", "benchmark", "review", "trophy", "optimize", "startup", "hook", "translate", "build"];

  it("has required top-level keys", () => {
    expect(mapData).toHaveProperty("cities");
    expect(mapData).toHaveProperty("connections");
    expect(mapData).toHaveProperty("activities");
    expect(mapData).toHaveProperty("statistics");
  });

  it("has at least 60 cities", () => {
    expect(mapData.cities.length).toBeGreaterThanOrEqual(60);
  });

  it("has at least 25 connections", () => {
    expect(mapData.connections.length).toBeGreaterThanOrEqual(25);
  });

  it("has at least 30 activities", () => {
    expect(mapData.activities.length).toBeGreaterThanOrEqual(30);
  });

  it("has all 8 statistic keys", () => {
    const statKeys = ["activeBuilders", "contributors", "communities", "workflows", "aiTools", "blogPosts", "prompts", "startups"];
    for (const key of statKeys) {
      expect(mapData.statistics).toHaveProperty(key);
      const stat = mapData.statistics[key as keyof typeof mapData.statistics];
      expect(typeof stat.value).toBe("number");
      expect(typeof stat.delta).toBe("string");
    }
  });

  it("all cities have valid coordinates", () => {
    for (const city of mapData.cities) {
      expect(typeof city.lat).toBe("number");
      expect(typeof city.lng).toBe("number");
      expect(city.lat).toBeGreaterThanOrEqual(-90);
      expect(city.lat).toBeLessThanOrEqual(90);
      expect(city.lng).toBeGreaterThanOrEqual(-180);
      expect(city.lng).toBeLessThanOrEqual(180);
    }
  });

  it("all cities have valid types", () => {
    for (const city of mapData.cities) {
      expect(VALID_TYPES).toContain(city.type);
    }
  });

  it("all cities have valid colors", () => {
    for (const city of mapData.cities) {
      expect(VALID_COLORS).toContain(city.color);
    }
  });

  it("all cities have positive counts", () => {
    for (const city of mapData.cities) {
      expect(city.count).toBeGreaterThan(0);
    }
  });

  it("all connections reference existing cities", () => {
    const cityNames = new Set(mapData.cities.map((c) => c.city));
    for (const [from, to] of mapData.connections) {
      expect(cityNames.has(from)).toBe(true);
      expect(cityNames.has(to)).toBe(true);
    }
  });

  it("all activities have valid icons", () => {
    for (const activity of mapData.activities) {
      expect(VALID_ICONS).toContain(activity.icon);
    }
  });

  it("event type cities have pink color", () => {
    const events = mapData.cities.filter((c) => c.type === "Event");
    expect(events.length).toBeGreaterThan(0);
    for (const event of events) {
      expect(event.color).toBe("pink");
    }
  });

  it("contributor type cities have amber color", () => {
    const contributors = mapData.cities.filter((c) => c.type === "Contributor");
    expect(contributors.length).toBeGreaterThan(0);
    for (const c of contributors) {
      expect(c.color).toBe("amber");
    }
  });

  it("includes Event and Contributor in city types", () => {
    const types = new Set(mapData.cities.map((c) => c.type));
    expect(types.has("Event")).toBe(true);
    expect(types.has("Contributor")).toBe(true);
  });
});

describe("component render smoke tests", () => {
  it("EcosystemLayer renders without error", () => {
    const { container } = render(<EcosystemLayer selectedLayer={null} onLayerChange={() => {}} />);
    expect(container.textContent).toContain("All");
    expect(container.textContent).toContain("Events");
    expect(container.textContent).toContain("Contributors");
  });

  it("StatsDashboard renders with minimal data", () => {
    const stats = { activeBuilders: { value: 1000, delta: "+10%" } } as any;
    const { container } = render(<StatsDashboard statistics={stats} />);
    expect(container.textContent).toContain("Active Builders");
    expect(container.textContent).toContain("1.0k");
    expect(container.textContent).toContain("+10%");
  });

  it("StatsDashboard renders all 8 stats without error", () => {
    const { container } = render(<StatsDashboard statistics={mapData.statistics as any} />);
    expect(container.textContent).toContain("Active Builders");
    expect(container.textContent).toContain("Contributors");
    expect(container.textContent).toContain("Communities");
    expect(container.textContent).toContain("Workflows");
    expect(container.textContent).toContain("AI Tools");
    expect(container.textContent).toContain("Blog Posts");
    expect(container.textContent).toContain("Prompts");
    expect(container.textContent).toContain("Startups");
  });

  it("ActivityFeed renders without error", () => {
    const activities = [
      { user: "Test User", action: "tested", target: "the app", location: "Bengaluru", icon: "workflow" },
    ];
    const { container } = render(<ActivityFeed activities={activities} />);
    expect(container.textContent).toContain("Live Activity");
    expect(container.textContent).toContain("Test User");
  });

  it("InteractiveMap renders without error with sample data", () => {
    const sampleCities = [
      { city: "Bengaluru", state: "Karnataka", country: "India", lat: 12.97, lng: 77.59, type: "Hub", count: 245, color: "emerald" },
      { city: "San Francisco", country: "United States", lat: 37.77, lng: -122.42, type: "Hub", count: 320, color: "purple" },
      { city: "London", country: "United Kingdom", lat: 51.51, lng: -0.13, type: "Event", count: 38, color: "pink" },
    ];
    const mockConnections: [string, string][] = [
      ["Bengaluru", "San Francisco"],
      ["London", "San Francisco"],
    ];
    const { container } = render(
      <InteractiveMap
        cities={sampleCities}
        connections={mockConnections}
        selectedLayer={null}
        selectedCountry="All"
        selectedState="All States"
      />
    );
    expect(container.querySelector("svg")).toBeTruthy();
    expect(container.textContent).toContain("active nodes");
    expect(container.textContent).toContain("Reset View");
  });

  it("InteractiveMap renders filtered layer correctly", () => {
    const sampleCities = [
      { city: "Bengaluru", state: "Karnataka", country: "India", lat: 12.97, lng: 77.59, type: "Hub", count: 245, color: "emerald" },
      { city: "Berlin", country: "Germany", lat: 52.52, lng: 13.41, type: "Event", count: 22, color: "pink" },
      { city: "London", country: "UK", lat: 51.51, lng: -0.13, type: "Contributor", count: 88, color: "amber" },
    ];
    const { container } = render(
      <InteractiveMap
        cities={sampleCities}
        connections={[]}
        selectedLayer="Event"
        selectedCountry="All"
        selectedState="All States"
      />
    );
    // Only the Event type (Berlin) should be visible
    expect(container.textContent).toContain("Berlin");
    expect(container.textContent).toContain("1 active nodes");
    expect(container.textContent).not.toContain("Bengaluru");
  });

  it("InteractiveMap renders with country filter", () => {
    const sampleCities = [
      { city: "Bengaluru", state: "Karnataka", country: "India", lat: 12.97, lng: 77.59, type: "Hub", count: 245, color: "emerald" },
      { city: "London", country: "UK", lat: 51.51, lng: -0.13, type: "Hub", count: 260, color: "blue" },
    ];
    const { container } = render(
      <InteractiveMap
        cities={sampleCities}
        connections={[]}
        selectedLayer={null}
        selectedCountry="India"
        selectedState="All States"
      />
    );
    expect(container.textContent).toContain("Bengaluru");
    expect(container.textContent).toContain("1 active nodes");
    expect(container.textContent).not.toContain("London");
  });

  it("InteractiveMap shows legend with all layer types", () => {
    const { container } = render(
      <InteractiveMap
        cities={[]}
        connections={[]}
        selectedLayer={null}
        selectedCountry="All"
        selectedState="All States"
      />
    );
    expect(container.textContent).toContain("Hub");
    expect(container.textContent).toContain("Community");
    expect(container.textContent).toContain("Startup");
    expect(container.textContent).toContain("Event");
    expect(container.textContent).toContain("Contributor");
  });

  it("InteractiveMap shows empty state with no cities", () => {
    const { container } = render(
      <InteractiveMap
        cities={[]}
        connections={[]}
        selectedLayer={null}
        selectedCountry="All"
        selectedState="All States"
      />
    );
    expect(container.textContent).toContain("0 active nodes");
  });
});

describe("InteractiveMap integration - zoom, pan, hover", () => {
  const sampleCities = [
    { city: "Bengaluru", state: "Karnataka", country: "India", lat: 12.97, lng: 77.59, type: "Hub", count: 245, color: "emerald" },
    { city: "San Francisco", country: "United States", lat: 37.77, lng: -122.42, type: "Hub", count: 320, color: "purple" },
    { city: "London", country: "United Kingdom", lat: 51.51, lng: -0.13, type: "Event", count: 38, color: "pink" },
  ];
  const mockConnections: [string, string][] = [
    ["Bengaluru", "San Francisco"],
    ["London", "San Francisco"],
  ];

  function renderMap() {
    return render(
      <InteractiveMap
        cities={sampleCities}
        connections={mockConnections}
        selectedLayer={null}
        selectedCountry="All"
        selectedState="All States"
      />
    );
  }

  it("zooms in when scrolling down on the SVG", () => {
    const { container } = renderMap();
    const svg = container.querySelector("svg")!;
    expect(svg).toBeTruthy();

    // No zoom indicator at zoom=1
    expect(container.textContent).not.toContain("x");

    // Scroll down (negative deltaY = zoom in)
    fireEvent.wheel(svg, { deltaY: -1000 });

    // Zoom indicator should appear with the zoom level
    expect(container.textContent).toContain("2.0x");
  });

  it("does not zoom below 1x when scrolling up", () => {
    const { container } = renderMap();
    const svg = container.querySelector("svg")!;

    // Scroll up (positive deltaY = zoom out)
    fireEvent.wheel(svg, { deltaY: 500 });

    // Zoom should stay at 1 (minimum)
    expect(container.textContent).not.toContain("x");
  });

  it("does not zoom above 5x when scrolling excessively", () => {
    const { container } = renderMap();
    const svg = container.querySelector("svg")!;

    // Extreme scroll down
    fireEvent.wheel(svg, { deltaY: -10000 });

    // Zoom should be capped at 5x
    const match = container.textContent!.match(/(\d+\.\d+)x/);
    expect(match).toBeTruthy();
    if (match) {
      expect(parseFloat(match[1])).toBeLessThanOrEqual(5);
    }
  });

  it("pan updates SVG transform on mouse drag", () => {
    const { container } = renderMap();
    const svg = container.querySelector("svg")!;

    // Find the transform group (first <g> inside svg after defs)
    const svgChildren = svg.children;
    let transformGroup: Element | null = null;
    for (let i = 0; i < svgChildren.length; i++) {
      if (svgChildren[i].tagName === "g" || svgChildren[i].tagName === "G") {
        // Check it has a transform attribute
        const el = svgChildren[i];
        if (el.getAttribute("transform")) {
          transformGroup = el;
          break;
        }
      }
    }
    expect(transformGroup).toBeTruthy();

    // Initial transform
    const initialTransform = transformGroup!.getAttribute("transform");
    expect(initialTransform).toContain("translate(0, 0)");

    // Mouse down at (100, 100)
    fireEvent.mouseDown(svg, { clientX: 100, clientY: 100, button: 0 });

    // Mouse move to (150, 120) - this should update pan to (50, 20)
    fireEvent.mouseMove(svg, { clientX: 150, clientY: 120 });

    // Mouse up to end pan
    fireEvent.mouseUp(svg);

    // Transform should now include the pan offset
    const finalTransform = transformGroup!.getAttribute("transform");
    expect(finalTransform).toContain("translate(50, 20)");
  });

  it("does not pan when only mousemove without mousedown", () => {
    const { container } = renderMap();
    const svg = container.querySelector("svg")!;

    const svgChildren = svg.children;
    let transformGroup: Element | null = null;
    for (let i = 0; i < svgChildren.length; i++) {
      const el = svgChildren[i];
      if (el.getAttribute && el.getAttribute("transform")) {
        // Skip defs
        if (el.tagName !== "defs" && el.tagName !== "DEFS") {
          transformGroup = el;
          break;
        }
      }
    }
    expect(transformGroup).toBeTruthy();

    // Move without mouse down - pan should not change
    fireEvent.mouseMove(svg, { clientX: 150, clientY: 120 });

    const transform = transformGroup!.getAttribute("transform");
    expect(transform).toContain("translate(0, 0)");
  });

  it("shows tooltip when hovering over a city node", () => {
    const { container } = renderMap();

    // Find city circles (core dots) - they are motion.circle elements rendered as circle
    const circles = container.querySelectorAll("circle");
    // Filter to core dots (they have filter attribute with glow-)
    const coreCircles = Array.from(circles).filter(
      (c) => c.getAttribute("filter") && c.getAttribute("filter")!.includes("glow-")
    );
    expect(coreCircles.length).toBeGreaterThanOrEqual(3);

    // Hover over the first city node
    const bengaluruCircle = coreCircles[0];
    fireEvent.mouseEnter(bengaluruCircle, { clientX: 200, clientY: 150 });

    // Tooltip should appear with city info
    expect(container.textContent).toContain("Bengaluru");
    expect(container.textContent).toContain("India");
    expect(container.textContent).toContain("Hub");
    expect(container.textContent).toContain("245");
    expect(container.textContent).toContain("developers");
  });

  it("hides tooltip when mouse leaves a city node", () => {
    const { container } = renderMap();

    const circles = container.querySelectorAll("circle");
    const coreCircles = Array.from(circles).filter(
      (c) => c.getAttribute("filter") && c.getAttribute("filter")!.includes("glow-")
    );
    expect(coreCircles.length).toBeGreaterThan(0);

    // Hover over a city — check for tooltip-specific text not in SVG labels
    const circle = coreCircles[0];
    fireEvent.mouseEnter(circle, { clientX: 200, clientY: 150 });
    expect(container.textContent).toContain("developers");
    expect(container.textContent).toContain("Karnataka");

    // Leave the city
    fireEvent.mouseLeave(circle);

    // Tooltip tooltip-specific text should be gone
    expect(container.textContent).not.toContain("developers");
    expect(container.textContent).not.toContain("Karnataka");
  });

  it("reset view button restores zoom and pan to defaults", () => {
    const { container } = renderMap();
    const svg = container.querySelector("svg")!;

    // Zoom in
    fireEvent.wheel(svg, { deltaY: -2000 });
    expect(container.textContent).toContain("3.0x");

    // Click Reset View
    const resetButton = container.querySelector("button");
    expect(resetButton).toBeTruthy();
    expect(resetButton!.textContent).toContain("Reset View");
    fireEvent.click(resetButton!);

    // Zoom indicator should be gone (zoom back to 1)
    expect(container.textContent).not.toContain("x");
  });

  it("touch pan works via touch events", () => {
    const { container } = renderMap();
    const svg = container.querySelector("svg")!;

    const svgChildren = svg.children;
    let transformGroup: Element | null = null;
    for (let i = 0; i < svgChildren.length; i++) {
      const el = svgChildren[i];
      if (el.getAttribute && el.getAttribute("transform")) {
        if (el.tagName !== "defs" && el.tagName !== "DEFS") {
          transformGroup = el;
          break;
        }
      }
    }
    expect(transformGroup).toBeTruthy();

    // Touch start at (100, 100)
    fireEvent.touchStart(svg, {
      touches: [{ clientX: 100, clientY: 100 }],
    });

    // Touch move to (120, 130)
    fireEvent.touchMove(svg, {
      touches: [{ clientX: 120, clientY: 130 }],
    });

    // Touch end
    fireEvent.touchEnd(svg);

    // Transform should reflect touch pan
    const transform = transformGroup!.getAttribute("transform");
    expect(transform).toContain("translate(20, 30)");
  });
});
