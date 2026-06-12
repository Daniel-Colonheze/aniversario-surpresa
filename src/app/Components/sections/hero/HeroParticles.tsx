"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PARTICLES } from "./hero.constants";

const MAX_PARTICLES = 16;

export default function HeroParticles() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  const particles = PARTICLES?.slice(0, MAX_PARTICLES) || [];

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
            transform: "translate3d(0, 0, 0)",
          }}
          animate={{
            y: [0, particle.yRange, 0],
            x: [0, particle.xRange, 0],
            opacity: [particle.opacityMin, particle.opacityMax, particle.opacityMin],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut" as const,
          }}
        />
      ))}
    </div>
  );
}