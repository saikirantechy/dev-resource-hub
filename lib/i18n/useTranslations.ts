import { useCallback } from "react";
import { useI18n } from "./context";

/**
 * Recursively resolve a dot-separated key path in a nested object.
 * E.g., resolve("nav.home", { nav: { home: "Home" } }) => "Home"
 */
function resolve(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

/**
 * Simple template interpolation — replaces {placeholder} in a string.
 */
function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) => {
    return params[key] !== undefined ? String(params[key]) : `{${key}}`;
  });
}

/**
 * Hook that returns a `t()` function for looking up translation keys.
 *
 * Usage:
 *   const t = useTranslations();
 *   t("nav.home")                   // => "Home"
 *   t("stats.modulesValue")         // => "22+"
 *   t("ui.exploreModule", { name: "DevRank" })  // => "Explore DevRank"
 */
export function useTranslations() {
  const { messages } = useI18n();

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const value = resolve(messages, key);
      if (typeof value === "string") {
        return interpolate(value, params);
      }
      // Fall back to the key itself if not found
      return key;
    },
    [messages]
  );

  return t;
}
