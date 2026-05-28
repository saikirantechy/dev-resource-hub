"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "dev-resource-hub-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "dark" || storedTheme === "light") return storedTheme;

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/8 text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-400/40 hover:bg-white/12 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-400/60 theme-toggle-surface"
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
    >
      <span className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-purple-500/10 to-emerald-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <Sun className={`relative h-4 w-4 transition-all duration-300 ${isLight ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
      <Moon className={`absolute h-4 w-4 transition-all duration-300 ${isLight ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
    </button>
  );
}
