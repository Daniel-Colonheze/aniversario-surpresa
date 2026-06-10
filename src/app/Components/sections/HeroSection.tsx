// src/components/sections/HeroSection.tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Cigarro3D from "./Cigarro3D";

const PARTICLES = Array.from({ length: 40 }, () => ({
  width: Math.random() * 4 + 1,
  height: Math.random() * 4 + 1,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 4 + Math.random() * 5,
  delay: Math.random() * 2,
  color:
    Math.random() > 0.6
      ? "var(--accent-cyan)"
      : Math.random() > 0.3
        ? "var(--accent-purple)"
        : "var(--accent-pink)",
}));

const WORDS = ["Para", "um", "amigo", "especial."];

const BACKGROUND_IMAGES = [
  {
    src: "/images/momento-1.jpg",
    alt: "",
    position: "top-10 left-5",
    rotate: -5,
    width: "w-48 md:w-64",
    height: "h-32 md:h-44",
  },
  {
    src: "/images/momento-2.jpg",
    alt: "",
    position: "bottom-20 right-5",
    rotate: 8,
    width: "w-52 md:w-72",
    height: "h-36 md:h-48",
  },
  {
    src: "/images/momento-3.jpg",
    alt: "",
    position: "top-1/3 right-10",
    rotate: -3,
    width: "w-44 md:w-60",
    height: "h-32 md:h-40",
  },
  {
    src: "/images/momento-4.jpg",
    alt: "",
    position: "bottom-1/4 left-10",
    rotate: 6,
    width: "w-56 md:w-80",
    height: "h-40 md:h-52",
  },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const bastaoScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.7]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <Particles />
      {BACKGROUND_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className={`fixed ${img.position} ${img.width} ${img.height} rounded-2xl overflow-hidden pointer-events-none z-0`}
          style={{ transform: `rotate(${img.rotate}deg)` }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/600x800/1E2235/FFFFFF?text=Foto";
            }}
          />
        </div>
      ))}

      {/* Container fixo no canto superior direito: bastão (esquerda) + foto momento-3 (direita) */}
      <div className="fixed top-6 right-4 z-30 flex items-center gap-4 pointer-events-none">
        <motion.div
          style={{ scale: bastaoScale }}
          className="w-48 h-80 md:w-64 md:h-[28rem] flex-shrink-0"
        >
          <Cigarro3D scrollProgress={scrollYProgress} />
        </motion.div>
        <div className="relative w-44 h-32 md:w-60 md:h-40 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
          <Image
            src="/images/momento-3.jpg"
            alt="Momento 3"
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://placehold.co/600x800/1E2235/FFFFFF?text=Foto";
            }}
          />
        </div>
      </div>
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-sm uppercase mb-8 tracking-widest"
          style={{ color: "var(--accent-cyan)" }}
        >
          Uma surpresa para você
        </motion.p>

        <h1 className="text-6xl md:text-9xl font-black leading-tight mb-6">
          {WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.15 }}
              className="inline-block mr-5"
              style={{
                background: i % 2 === 0 ? "var(--gradient-hero)" : undefined,
                WebkitBackgroundClip: i % 2 === 0 ? "text" : undefined,
                WebkitTextFillColor:
                  i % 2 === 0 ? "transparent" : "var(--text-primary)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="text-3xl md:text-5xl font-light mb-12"
          style={{ color: "var(--accent-pink)" }}
        >
          Arthur Begosso
        </motion.p>
      </motion.div>
    </section>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.width,
            height: p.height,
            left: p.left,
            top: p.top,
            background: p.color,
          }}
          animate={{ y: [0, -35, 0], opacity: [0.15, 0.7, 0.15] }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
