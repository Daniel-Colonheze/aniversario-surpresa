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
      className="relative mb-8 mx-auto"
      initial={{ opacity: 0, scale: 0.88, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className="absolute -inset-4 rounded-[42px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(138,43,226,0.35) 0%, rgba(0,240,255,0.12) 60%, transparent 80%)" }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="relative w-[280px] h-[380px] sm:w-[340px] sm:h-[460px] md:w-[420px] md:h-[560px] rounded-[32px] overflow-hidden border-4"
        style={{
          borderColor: "var(--accent-purple)",
          boxShadow: "0 0 30px rgba(138,43,226,.45), 0 0 80px rgba(0,240,255,.15), 0 20px 60px rgba(0,0,0,.5)",
        }}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <Image
          src="/images/momento-13.jpeg"
          alt="Momento Especial"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 420px"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,15,25,.5) 0%, transparent 50%)" }} />
      </motion.div>
      <motion.div
        className="absolute -inset-3 rounded-[38px] pointer-events-none"
        style={{ border: "2px solid rgba(0,240,255,0.25)" }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}