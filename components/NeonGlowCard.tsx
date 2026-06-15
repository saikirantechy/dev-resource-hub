"use client";

import type { ReactNode, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

export default function NeonGlowCard({ children, className = "", ...props }: Props) {
  return (
    <div className={`animate-neon-glow ${className}`} {...props}>
      {children}
    </div>
  );
}
