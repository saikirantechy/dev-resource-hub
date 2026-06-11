"use client";

import { useEffect } from "react";
import { motion, useSpring } from "framer-motion";

export default function CursorGlow() {

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 100);
      cursorY.set(e.clientY - 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none z-[1] opacity-50"
      style={{
        x: cursorX,
        y: cursorY,
      }}
    />
  );
}
