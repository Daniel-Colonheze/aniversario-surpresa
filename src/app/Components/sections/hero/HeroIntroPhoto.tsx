"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform } from "framer-motion";

interface HeroIntroPhotoProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroIntroPhoto({
  scrollProgress,
}: HeroIntroPhotoProps) {
  const opacity = useTransform(scrollProgress, [0, 0.22], [1, 0]);

  const scale = useTransform(scrollProgress, [0, 0.22], [1, 0.85]);

  const y = useTransform(scrollProgress, [0, 0.22], [0, -120]);

  return (
    <motion.div
      style={{
        opacity,
        scale,
        y,
      }}
      className="relative mb-12"
    >
      <div
        className="
          relative
          w-[280px]
          h-[380px]
          sm:w-[340px]
          sm:h-[460px]
          md:w-[420px]
          md:h-[560px]
          rounded-[32px]
          overflow-hidden
          border-4
        "
        style={{
          borderColor: "var(--accent-purple)",
          boxShadow:
            "0 0 30px rgba(138,43,226,.4), 0 0 80px rgba(0,240,255,.15)",
        }}
      >
        <Image
          src="/images/momento-5.jpg"
          alt="Momento Especial"
          fill
          priority
          className="object-cover"
        />
      </div>

      <div
        className="
          absolute
          -inset-3
          rounded-[38px]
          pointer-events-none
        "
        style={{
          border: "2px solid var(--accent-cyan)",
        }}
      />
    </motion.div>
  );
}
