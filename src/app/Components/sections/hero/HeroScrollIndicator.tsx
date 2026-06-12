"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroScrollIndicatorProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroScrollIndicator({ scrollProgress }: HeroScrollIndicatorProps) {
  const opacity = useTransform(scrollProgress, [0, 0.12], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
    >
      <span
        className="text-xs uppercase tracking-[0.25em]"
        style={{ color: "var(--text-muted)" }}
      >
        Scroll
      </span>

      <div
        className="relative w-6 h-10 rounded-full flex justify-center pt-2"
        style={{ border: "2px solid rgba(0,240,255,0.3)" }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--accent-cyan)" }}
          animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}