export type Locale = "en" | "hi" | "es" | "fr" | "ar" | "zh";

export const LOCALES: Locale[] = ["en", "hi", "es", "fr", "ar", "zh"];

export const DEFAULT_LOCALE: Locale = "en";

export interface LocaleConfig {
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
  flag: string;
}

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr", flag: "🇬🇧" },
  hi: { label: "Hindi", nativeLabel: "हिन्दी", dir: "ltr", flag: "🇮🇳" },
  es: { label: "Spanish", nativeLabel: "Español", dir: "ltr", flag: "🇪🇸" },
  fr: { label: "French", nativeLabel: "Français", dir: "ltr", flag: "🇫🇷" },
  ar: { label: "Arabic", nativeLabel: "العربية", dir: "rtl", flag: "🇸🇦" },
  zh: { label: "Chinese", nativeLabel: "中文", dir: "ltr", flag: "🇨🇳" },
};

/** Storage key for persisting locale preference */
export const LOCALE_STORAGE_KEY = "dev-resource-hub-locale";
