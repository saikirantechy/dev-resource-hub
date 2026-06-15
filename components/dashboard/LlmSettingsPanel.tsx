"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, Server, Cpu, CheckCircle, AlertCircle, Loader2, Eye, EyeOff, Trash2 } from "lucide-react";
import {
  LLMConfig,
  LLM_MODELS,
  DEFAULT_MODEL,
  DEFAULT_BASE_URL,
  loadLLMConfig,
  saveLLMConfig,
  clearLLMConfig,
} from "@/lib/llm-config";
import { validateApiKey } from "@/lib/llm";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfigChange: () => void;
}

export default function LlmSettingsPanel({ open, onClose, onConfigChange }: Props) {
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL);
  const [showKey, setShowKey] = useState(false);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{ ok: boolean; message?: string } | null>(null);

  // Load existing config when opening
  useEffect(() => {
    if (!open) return;
    const existing = loadLLMConfig();
    if (existing) {
      if (existing.apiKey !== apiKey) setApiKey(existing.apiKey);
      if (existing.model !== model) setModel(existing.model);
      if (existing.baseUrl !== baseUrl) setBaseUrl(existing.baseUrl);
    } else {
      if ("" !== apiKey) setApiKey("");
      if (DEFAULT_MODEL !== model) setModel(DEFAULT_MODEL);
      if (DEFAULT_BASE_URL !== baseUrl) setBaseUrl(DEFAULT_BASE_URL);
    }
    setValidationResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleSave = async () => {
    if (!apiKey.trim()) return;
    setValidating(true);
    setValidationResult(null);

    const cfg: LLMConfig = { apiKey: apiKey.trim(), model, baseUrl: baseUrl.trim() || DEFAULT_BASE_URL };

    const result = await validateApiKey(cfg);
    if (result.valid) {
      saveLLMConfig(cfg);
      setValidationResult({ ok: true, message: "API key saved and verified!" });
      onConfigChange();
      setTimeout(() => onClose(), 1200);
    } else {
      setValidationResult({ ok: false, message: result.error || "Validation failed." });
    }
    setValidating(false);
  };

  const handleClear = () => {
    clearLLMConfig();
    setApiKey("");
    setValidationResult({ ok: true, message: "Configuration cleared." });
    onConfigChange();
    setTimeout(() => onClose(), 800);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 320 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 320 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-[#050508] shadow-2xl overflow-y-auto"
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_24px_rgba(139,92,246,0.3)]">
                    <Cpu size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white">LLM Settings</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-purple-300">
                      AI Assistant Configuration
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
                  aria-label="Close settings"
                >
                  <X size={14} className="text-gray-400" />
                </button>
              </div>

              {/* API Key */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">
                  <Key size={12} /> API Key
                </label>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 pr-16 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-purple-400/40 transition-colors font-mono"
                    aria-label="API Key"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-300 transition-colors"
                      aria-label={showKey ? "Hide API key" : "Show API key"}
                    >
                      {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 mt-1.5 px-1">
                  Your API key is stored locally in your browser and never sent to any server.
                </p>
              </div>

              {/* Model */}
              <div className="mb-5">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">
                  <Cpu size={12} /> Model
                </label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-purple-400/40 transition-colors appearance-none cursor-pointer"
                  aria-label="Select model"
                >
                  <optgroup label="OpenAI">
                    {LLM_MODELS.filter((m) => m.provider === "OpenAI").map((m) => (
                      <option key={m.id} value={m.id} className="bg-[#0a0a14]">
                        {m.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Anthropic (via OpenAI-compatible proxy)">
                    {LLM_MODELS.filter((m) => m.provider === "Anthropic").map((m) => (
                      <option key={m.id} value={m.id} className="bg-[#0a0a14]">
                        {m.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Other">
                    {LLM_MODELS.filter((m) => m.provider !== "OpenAI" && m.provider !== "Anthropic").map((m) => (
                      <option key={m.id} value={m.id} className="bg-[#0a0a14]">
                        {m.label} ({m.provider})
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* Base URL */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-300 mb-2 uppercase tracking-wider">
                  <Server size={12} /> Base URL
                </label>
                <input
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder={DEFAULT_BASE_URL}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-gray-100 placeholder:text-gray-600 focus:outline-none focus:border-purple-400/40 transition-colors font-mono"
                  aria-label="Base URL"
                />
                <p className="text-[10px] text-gray-600 mt-1.5 px-1">
                  For OpenAI-compatible APIs. Leave as default for OpenAI, or set to your proxy endpoint.
                </p>
              </div>

              {/* Validation message */}
              <AnimatePresence>
                {validationResult && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mb-4 flex items-start gap-2 px-3 py-2 rounded-xl text-xs ${
                      validationResult.ok
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300"
                        : "bg-pink-500/10 border border-pink-500/20 text-pink-300"
                    }`}
                  >
                    {validationResult.ok ? (
                      <CheckCircle size={14} className="shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                    )}
                    <span>{validationResult.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={!apiKey.trim() || validating}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white text-sm font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
                >
                  {validating ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={14} />
                      Save & Verify
                    </>
                  )}
                </button>
                <button
                  onClick={handleClear}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm font-bold hover:text-pink-300 hover:border-pink-400/30 transition-all"
                  aria-label="Clear configuration"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
