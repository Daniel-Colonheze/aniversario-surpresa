// src/components/sections/HeroSection.tsx
"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const WORDS = ["Para", "um", "amigo", "especial."];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Partículas de fundo */}
      <Particles />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 text-center px-6"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-sm uppercase mb-8 tracking-widest"
          style={{ color: "var(--accent-cyan)" }}
        >
          Uma surpresa para você
        </motion.p>

        {/* Título principal — palavras aparecem uma por uma */}
        <h1 className="text-5xl md:text-8xl font-black leading-tight mb-6">
          {WORDS.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.7,
                delay: 0.6 + i * 0.18,
                ease: "easeOut",
              }}
              className="inline-block mr-4"
              style={{
                background: i % 2 === 0 ? "var(--gradient-hero)" : undefined,
                WebkitBackgroundClip: i % 2 === 0 ? "text" : undefined,
                WebkitTextFillColor:
                  i % 2 === 0 ? "transparent" : "var(--text-primary)",
                backgroundClip: i % 2 === 0 ? "text" : undefined,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Nome */}
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-2xl md:text-4xl font-light mb-12"
          style={{ color: "var(--accent-pink)" }}
        >
          Arthur Begosso 🎉
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="flex flex-col items-center gap-2"
          style={{ color: "var(--text-muted)" }}
        >
          <span className="text-sm tracking-widest uppercase">
            Role para baixo
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
            style={{ borderColor: "var(--text-muted)" }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{ background: "var(--accent-cyan)" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Imagem placeholder — troque por uma foto real depois */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 0.15, x: 0 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 rounded-full"
        style={{
          background: "var(--gradient-hero)",
          filter: "blur(60px)",
        }}
      />
    </section>
  );
}

// Partículas simples sem Three.js (só CSS/framer) para o hero
function Particles() {
  const count = 30;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background:
              i % 3 === 0
                ? "var(--accent-cyan)"
                : i % 3 === 1
                  ? "var(--accent-purple)"
                  : "var(--accent-pink)",
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}
