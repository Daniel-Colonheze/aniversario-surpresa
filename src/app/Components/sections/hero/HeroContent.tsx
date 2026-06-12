"use client";

import { motion } from "framer-motion";
import { WORDS } from "./hero.constants";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroContent() {
  return (
    <motion.div
      className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 text-center mt-16 md:mt-24 lg:mt-32"
      variants={container}
      initial="hidden"
      animate="show"
    >

      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6"
        variants={container}
      >
        {WORDS.map((word, index) => (
          <motion.span
            key={word}
            className="inline-block mr-3 md:mr-4"
            variants={fadeUp}
            style={{
              background: index % 2 === 0 ? "var(--gradient-hero)" : undefined,
              WebkitBackgroundClip: index % 2 === 0 ? "text" : undefined,
              WebkitTextFillColor:
                index % 2 === 0 ? "transparent" : "var(--text-primary)",
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div variants={fadeUp} className="flex flex-col items-center gap-4">
        <p
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light"
          style={{ color: "var(--accent-pink)" }}
        >
          Arthur Begosso
        </p>

        <motion.span
          className="text-sm md:text-base font-black tracking-[0.2em] uppercase px-6 py-2 rounded-full"
          style={{
            background: "linear-gradient(135deg, #FF1493, #8A2BE2)",
            color: "#fff",
            padding: "20px",
            boxShadow: "0 0 24px rgba(255,20,147,0.5), 0 0 48px rgba(138,43,226,0.25)",
          }}
          animate={{
            boxShadow: [
              "0 0 24px rgba(255,20,147,0.5), 0 0 48px rgba(138,43,226,0.25)",
              "0 0 36px rgba(255,20,147,0.8), 0 0 64px rgba(138,43,226,0.45)",
              "0 0 24px rgba(255,20,147,0.5), 0 0 48px rgba(138,43,226,0.25)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          Chupa Engole
        </motion.span>
      </motion.div>
    </motion.div>
  );
}