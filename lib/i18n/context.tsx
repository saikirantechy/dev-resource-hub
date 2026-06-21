"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { LOCALES, DEFAULT_LOCALE, LOCALE_STORAGE_KEY, LOCALE_CONFIG, type Locale } from "./config";
import en from "../../messages/en.json";
import hi from "../../messages/hi.json";
import es from "../../messages/es.json";
import fr from "../../messages/fr.json";
import ar from "../../messages/ar.json";
import zh from "../../messages/zh.json";

interface Messages {
  [key: string]: unknown;
}

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
  setLocale: (locale: Locale) => void;
  /** List of available locales */
  locales: Locale[];
}

const I18nContext = createContext<I18nContextValue | null>(null);

const ALL_MESSAGES: Record<string, Messages> = { en, hi, es, fr, ar, zh };

function loadMessages(locale: Locale): Messages {
  return ALL_MESSAGES[locale] ?? ALL_MESSAGES[DEFAULT_LOCALE];
}

const DEFAULT_MESSAGES = loadMessages(DEFAULT_LOCALE);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [messages, setMessages] = useState<Messages>(DEFAULT_MESSAGES);

  // Restore saved locale from localStorage on mount (client-side only)
  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (saved && LOCALES.includes(saved) && saved !== DEFAULT_LOCALE) {
      setLocaleState(saved);
      setMessages(loadMessages(saved));
    }
  }, []);

  function setLocale(newLocale: Locale) {
    setLocaleState(newLocale);
    setMessages(loadMessages(newLocale));
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    if (typeof document !== "undefined") {
      document.documentElement.dir = LOCALE_CONFIG[newLocale].dir;
      document.documentElement.lang = newLocale;
    }
  }

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale, locales: LOCALES }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
