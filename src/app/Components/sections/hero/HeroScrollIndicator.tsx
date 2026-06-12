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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.6 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
    >
      <motion.span
        className="text-xs uppercase tracking-[0.25em]"
        style={{ color: "var(--text-muted)" }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll
      </motion.span>
      <div className="relative w-5 h-9 rounded-full flex justify-center pt-1.5" style={{ border: "2px solid rgba(0,240,255,0.3)" }}>
        <motion.div
          className="w-1 h-1 rounded-full"
          style={{ background: "var(--accent-cyan)" }}
          animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}