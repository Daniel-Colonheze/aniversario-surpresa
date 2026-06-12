"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroIntroPhotoProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroIntroPhoto({ scrollProgress }: HeroIntroPhotoProps) {
  const opacity = useTransform(scrollProgress, [0, 0.22], [1, 0]);
  const scale = useTransform(scrollProgress, [0, 0.22], [1, 0.85]);
  const y = useTransform(scrollProgress, [0, 0.22], [0, -120]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="relative mb-10"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className="absolute -inset-4 rounded-[42px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(138,43,226,0.35) 0%, rgba(0,240,255,0.12) 60%, transparent 80%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="relative w-[260px] h-[360px] sm:w-[320px] sm:h-[440px] md:w-[400px] md:h-[530px] rounded-[32px] overflow-hidden border-4"
        style={{
          borderColor: "var(--accent-purple)",
          boxShadow:
            "0 0 30px rgba(138,43,226,.45), 0 0 80px rgba(0,240,255,.15), 0 20px 60px rgba(0,0,0,.5)",
        }}
      >
        <Image
          src="/images/momento-5.jpg"
          alt="Momento Especial"
          fill
          priority
          className="object-cover"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(11,15,25,.5) 0%, transparent 50%)",
          }}
        />
      </div>

      <div
        className="absolute -inset-3 rounded-[38px] pointer-events-none"
        style={{ border: "2px solid rgba(0,240,255,0.25)" }}
      />
    </motion.div>
  );
}