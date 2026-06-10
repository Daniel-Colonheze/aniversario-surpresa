// src/components/challenges/FinalChallenge.tsx
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MAX_CLICKS = 100;

// Partícula de confete
interface Confetti {
  id: number;
  x: number;
  color: string;
  duration: number;
  delay: number;
  size: number;
  rotation: number;
  round: boolean;
}

const CONFETTI_COLORS = [
  "var(--accent-cyan)",
  "var(--accent-purple)",
  "var(--accent-yellow)",
  "var(--accent-pink)",
  "var(--accent-orange)",
  "#fff",
];

function generateConfetti(count = 80): Confetti[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 0.8,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 720 - 360,
    round: Math.random() > 0.5,
  }));
}

export default function FinalChallenge() {
  const [clicks, setClicks] = useState(0);
  const [burst, setBurst] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showCake, setShowCake] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  const progress = clicks / MAX_CLICKS;
  // Balão: escala de 1 a 2.5 conforme cliques
  const scale = 1 + progress * 1.5;
  // Cor do balão muda de laranja para rosa conforme enche
  const hue = 20 + progress * 320;

  function handleClick() {
    if (burst) return;
    setClicks((c) => {
      const next = c + 1;
      if (next >= MAX_CLICKS) {
        setBurst(true);
        setConfetti(generateConfetti(100));
        setTimeout(() => setShowCake(true), 800);
      }
      return next;
    });

    // Som de pop suave via Web Audio
    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(300 + clicks * 3, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Confete */}
      <AnimatePresence>
        {burst &&
          confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: -20, x: `${c.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: "110vh", opacity: 0, rotate: c.rotation }}
              transition={{ duration: c.duration, delay: c.delay, ease: "easeIn" }}
              className="fixed top-0 pointer-events-none z-40"
              style={{
                width: c.size,
                height: c.size,
                background: c.color,
                borderRadius: c.round ? "50%" : "2px",
              }}
            />
          ))}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 z-10"
      >
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--accent-yellow)" }}>
          Surpresa Final 🎁
        </p>
        {!showCake && (
          <>
            <h1 className="text-3xl md:text-4xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
              Encha o balão!
            </h1>
            <p style={{ color: "var(--text-muted)" }}>
              {MAX_CLICKS - clicks > 0
                ? `Faltam ${MAX_CLICKS - clicks} cliques`
                : "🎉 Estourou!"}
            </p>
          </>
        )}
      </motion.div>

      {/* Balão + bolo */}
      <AnimatePresence mode="wait">
        {!showCake ? (
          <motion.div
            key="balloon"
            className="flex flex-col items-center gap-8 z-10"
            exit={{ opacity: 0, scale: 0 }}
          >
            {/* Barra de progresso */}
            <div
              className="w-64 h-2 rounded-full overflow-hidden"
              style={{ background: "var(--bg-secondary)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: `hsl(${hue}, 100%, 60%)` }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>

            {/* Balão clicável */}
            <motion.button
              onClick={handleClick}
              animate={
                burst
                  ? { scale: [1, 2, 0], opacity: [1, 1, 0] }
                  : { scale }
              }
              transition={burst ? { duration: 0.4 } : { type: "spring", stiffness: 200, damping: 10 }}
              whileTap={!burst ? { scale: scale * 0.9 } : {}}
              className="relative cursor-pointer select-none focus:outline-none"
              style={{ fontSize: "8rem", lineHeight: 1 }}
              aria-label="Clique no balão"
            >
              🎈
              {/* Brilho pulsante */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, hsl(${hue}, 100%, 60%) 0%, transparent 70%)`, zIndex: -1 }}
              />
            </motion.button>

            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {clicks} / {MAX_CLICKS} cliques
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="cake"
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 12 }}
            className="flex flex-col items-center gap-6 z-10 text-center"
          >
            {/* Feliz Aniversário — acima */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-black"
              style={{
                background: "var(--gradient-hero)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Feliz Aniversário!
            </motion.h2>

            {/* Bolo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-[10rem] leading-none select-none"
            >
              🎂
            </motion.div>

            {/* Parabéns — abaixo */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-6xl font-black"
              style={{ color: "var(--accent-yellow)" }}
            >
              Parabéns,<br />
              <span style={{ color: "var(--accent-pink)" }}>Arthur! 🎉</span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-lg max-w-xs"
              style={{ color: "var(--text-muted)" }}
            >
              Você completou todos os desafios. Feliz aniversário, Sereão! 🥳
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}