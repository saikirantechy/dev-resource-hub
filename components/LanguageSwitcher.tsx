"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { LOCALE_CONFIG } from "@/lib/i18n/config";

export default function LanguageSwitcher() {
  const { locale, setLocale, locales } = useI18n();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const current = LOCALE_CONFIG[locale];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-200"
        aria-label="Switch language"
      >
        <Globe size={14} />
        <span className="hidden sm:inline">{current.nativeLabel}</span>
        <span className="text-[10px] opacity-60">{current.flag}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 py-2 rounded-2xl bg-[#0c0c10] border border-white/10 shadow-2xl shadow-black/50 z-50 backdrop-blur-xl">
          <div className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-500">
            Language
          </div>
          <div className="max-h-64 overflow-y-auto">
            {locales.map((code) => {
              const cfg = LOCALE_CONFIG[code];
              const isActive = code === locale;
              return (
                <button
                  key={code}
                  onClick={() => {
                    setLocale(code);
                    setOpen(false);
                  }}
                  className={"w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-all duration-150 " + (isActive ? "text-white bg-blue-500/10" : "text-gray-400 hover:text-white hover:bg-white/5")}
                >
                  <span className="text-base">{cfg.flag}</span>
                  <div className="flex flex-col items-start">
                    <span>{cfg.label}</span>
                    <span className="text-[9px] text-gray-500 font-medium">
                      {cfg.nativeLabel}
                    </span>
                  </div>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
