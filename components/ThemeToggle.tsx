"use client";

import { useEffect, useState, useCallback } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "dev-resource-hub-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

const themeColors: Record<Theme, { ring: string; gradient: string }> = {
  dark: {
    ring: "rgba(59,130,246,0.3)",
    gradient: "from-blue-500/20 via-purple-500/15 to-emerald-500/10",
  },
  light: {
    ring: "rgba(249,115,22,0.3)",
    gradient: "from-amber-400/25 via-orange-400/20 to-yellow-400/15",
  },
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setIsAnimating(true);
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    setTimeout(() => setIsAnimating(false), 600);
  }, [theme]);

  const isLight = theme === "light";
  const colors = themeColors[isLight ? "light" : "dark"];

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`
        group relative inline-flex h-10 w-10 items-center justify-center
        overflow-hidden rounded-xl
        border transition-all duration-500 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-400/60
        theme-toggle-surface
        ${isAnimating ? "scale-90" : ""}
      `}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      {/* Rotating gradient background that morphs on theme change */}
      <span
        className={`
          absolute inset-0 bg-gradient-to-br transition-all duration-700 ease-in-out
          ${colors.gradient}
          ${isAnimating ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
        `}
      />

      {/* Animated ring that pulses on switch */}
      <span
        className={`
          absolute inset-0 rounded-xl transition-all duration-700 ease-out
          ${isAnimating ? "scale-110 opacity-0" : "scale-100 opacity-0"}
        `}
        style={{
          boxShadow: isAnimating ? `0 0 24px ${colors.ring}` : "none",
        }}
      />

      {/* Sun icon */}
      <Sun
        className={`
          relative h-4 w-4 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
          ${isLight ? "rotate-0 scale-100 opacity-100" : "rotate-180 scale-0 opacity-0"}
          ${isAnimating && isLight ? "animate-[spin_0.5s_ease-out]" : ""}
        `}
      />

      {/* Moon icon */}
      <Moon
        className={`
          absolute h-4 w-4 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
          ${isLight ? "rotate-180 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}
          ${isAnimating && !isLight ? "animate-[spin_0.5s_ease-out]" : ""}
        `}
      />

      {/* Ripple effect on click */}
      <span
        className={`
          pointer-events-none absolute inset-0
          transition-all duration-700 ease-out rounded-xl
          ${
            isAnimating
              ? isLight
                ? "bg-black/10 scale-150 opacity-0"
                : "bg-white/20 scale-150 opacity-0"
              : "scale-0 opacity-0 bg-transparent"
          }
        `}
      />
    </button>
  );
}
