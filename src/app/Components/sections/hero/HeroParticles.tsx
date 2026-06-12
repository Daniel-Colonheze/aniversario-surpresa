"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

type Particle = {
  width: number;
  height: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  color: string;
  blur: number;
  yRange: number;
  xRange: number;
  opacityMin: number;
  opacityMax: number;
  scale: [number, number, number];
};

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => {
    const colorRoll = Math.random();
    const color =
      colorRoll > 0.65 ? "var(--accent-cyan)" : colorRoll > 0.35 ? "var(--accent-purple)" : "var(--accent-pink)";
    const tier = i < 6 ? "large" : i < 18 ? "medium" : "small";
    const size = tier === "large" ? rand(18, 36) : tier === "medium" ? rand(6, 14) : rand(1.5, 5);
    const blur = tier === "large" ? rand(8, 18) : tier === "medium" ? rand(2, 5) : size > 4 ? 1 : 0;
    const opacityMin = tier === "large" ? rand(0.04, 0.1) : rand(0.1, 0.25);
    const opacityMax = tier === "large" ? rand(0.2, 0.4) : rand(0.55, 0.9);
    const duration = tier === "large" ? rand(10, 18) : tier === "medium" ? rand(6, 12) : rand(4, 8);
    const scaleMin = tier === "large" ? 0.85 : 0.9;
    const scaleMax = tier === "large" ? 1.15 : 1.3;
    return {
      width: size,
      height: size,
      left: `${rand(0, 100)}%`,
      top: `${rand(0, 100)}%`,
      duration,
      delay: rand(0, 5),
      color,
      blur,
      yRange: -(rand(tier === "large" ? 30 : 20, tier === "large" ? 70 : 50)),
      xRange: rand(tier === "large" ? -30 : -18, tier === "large" ? 30 : 18),
      opacityMin,
      opacityMax,
      scale: [scaleMin, scaleMax, scaleMin],
    };
  });
}

export default function HeroParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setParticles(generateParticles(48));
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full will-change-transform"
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
            background: particle.color,
            filter: `blur(${particle.blur}px)`,
            opacity: particle.opacityMin,
          }}
          animate={{
            y: [0, particle.yRange, 0],
            x: [0, particle.xRange, 0],
            opacity: [particle.opacityMin, particle.opacityMax, particle.opacityMin],
            scale: particle.scale,
          }}
          transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}