"use client";

import { motion } from "framer-motion";
import { PARTICLES } from "./hero.constants";

export default function HeroParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {PARTICLES.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: particle.width,
            height: particle.height,
            left: particle.left,
            top: particle.top,
            background: particle.color,
            filter: `blur(${particle.blur}px)`,
          }}
          animate={{
            y: [0, particle.yRange, 0],
            x: [0, particle.xRange, 0],
            opacity: [particle.opacityMin, particle.opacityMax, particle.opacityMin],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}