export interface MapCity {
  city: string;
  state?: string;
  country: string;
  lat: number;
  lng: number;
  type: string;
  count: number;
  color: string;
}

export function mercatorProjection(
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

export function filterCities(
  cities: MapCity[],
  selectedLayer: string | null,
  selectedCountry: string,
  selectedState: string
): MapCity[] {
  let result = cities;
  if (selectedLayer) {
    result = result.filter((c) => c.type === selectedLayer);
  }
  if (selectedCountry && selectedCountry !== "All") {
    result = result.filter((c) => c.country === selectedCountry);
    if (selectedCountry === "India" && selectedState && selectedState !== "All States") {
      result = result.filter((c) => c.state === selectedState);
    }
  }
  return result;
}

export function filterConnections(
  connections: [string, string][],
  activeCityNames: string[]
): [string, string][] {
  const activeSet = new Set(activeCityNames);
  return connections.filter(
    ([from, to]) => activeSet.has(from) && activeSet.has(to)
  );
}

export function computeCityPositions(
  cities: MapCity[],
  mapWidth: number,
  mapHeight: number,
  padding: number
): { city: MapCity; x: number; y: number }[] {
  return cities.map((city) => {
    const pos = mercatorProjection(city.lat, city.lng, mapWidth, mapHeight);
    return { city, x: padding + pos.x, y: padding + pos.y };
  });
}

export function computeCityPositionMap(
  cityPositions: { city: MapCity; x: number; y: number }[]
): Record<string, { x: number; y: number }> {
  return cityPositions.reduce<Record<string, { x: number; y: number }>>(
    (acc, { city, x, y }) => {
      acc[city.city] = { x, y };
      return acc;
    },
    {}
  );
}

export function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(num >= 10000 ? 0 : 1) + "k";
  }
  return num.toString();
}

export function computeNodeRadius(
  count: number,
  baseRadius: number = 6,
  maxRadius: number = 14
): number {
  const size = baseRadius * (1 + count / 400);
  return Math.min(size, maxRadius);
}

/**
 * Build a deduplicated, sorted list of country names from cities,
 * prepended with "All" as the first entry.
 */
export function getCountriesList(cities: MapCity[]): string[] {
  const unique = [...new Set(cities.map((c) => c.country))];
  return ["All", ...unique].sort((a, b) =>
    a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)
  );
}

/**
 * Filter cities by country (and optionally by state when country is India).
 * Returns all cities when country is "All".
 */
export function citiesFilteredByCountry(
  cities: MapCity[],
  country: string,
  state: string
): MapCity[] {
  if (country === "All") return cities;
  let result = cities.filter((c) => c.country === country);
  if (country === "India" && state && state !== "All States") {
    result = result.filter((c) => c.state === state);
  }
  return result;
}
