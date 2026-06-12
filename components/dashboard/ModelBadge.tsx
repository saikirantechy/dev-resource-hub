"use client";

import { loadLLMConfig } from "@/lib/llm-config";
import { Cpu } from "lucide-react";

/** Shows the currently selected model name as a small badge. */
export default function ModelBadge() {
  const config = loadLLMConfig();
  if (!config) return null;

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-300"
      title={`Using ${config.model} via ${config.baseUrl}`}
    >
      <Cpu size={8} />
      {config.model}
    </span>
  );
}
