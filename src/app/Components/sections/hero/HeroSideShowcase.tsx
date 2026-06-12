"use client";
import { useState, useEffect } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroSideShowcaseProps {
  scrollProgress: MotionValue<number>;
}

const SECTIONS = ["Início", "Desafios", "Final"];

function SectionLabel({ label, index, total, scrollProgress }: { label: string; index: number; total: number; scrollProgress: MotionValue<number> }) {
  const mid = index / (total - 1);
  const start = Math.max(0, mid - 0.35);
  const end = Math.min(1, mid + 0.35);
  const opacity = useTransform(scrollProgress, [start, mid, end], [0.25, 1, 0.25]);

  return (
    <motion.div className="flex items-center gap-2" style={{ opacity }}>
      <span className="text-xs tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>{label}</span>
      <motion.div
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--accent-purple)" }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
      />
    </motion.div>
  );
}

export default function HeroSideShowcase({ scrollProgress }: HeroSideShowcaseProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const trackHeight = 160;
  const indicatorY = useTransform(scrollProgress, [0, 1], [0, trackHeight - 20]);
  const opacity = useTransform(scrollProgress, [0, 0.05], [0, 1]);

  if (!mounted) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-20 flex-col items-center gap-6 pointer-events-none"
    >
      <div className="relative flex flex-col items-center" style={{ height: trackHeight }}>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[2px] rounded-full top-0"
          style={{ background: "var(--gradient-hero)", height: indicatorY }}
        />
        <motion.div
          className="absolute left-1/2 w-3 h-3 rounded-full -translate-x-1/2"
          style={{ background: "var(--accent-cyan)", boxShadow: "0 0 10px var(--accent-cyan)", top: indicatorY }}
          animate={{ boxShadow: ["0 0 6px var(--accent-cyan)", "0 0 16px var(--accent-cyan)", "0 0 6px var(--accent-cyan)"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="flex flex-col gap-5 items-end">
        {SECTIONS.map((label, i) => (
          <SectionLabel key={label} label={label} index={i} total={SECTIONS.length} scrollProgress={scrollProgress} />
        ))}
      </div>
    </motion.div>
  );
}