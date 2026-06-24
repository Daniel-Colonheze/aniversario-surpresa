"use client";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { WORDS } from "./hero.constants";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.4,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: -1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  exit: { opacity: 0, y: -32, transition: { duration: 0.4, ease: "easeIn" } },
};

export default function HeroContent() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 text-center w-full flex flex-col items-center"
        variants={container}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight mb-6 flex flex-wrap justify-center items-center"
          variants={container}
        >
          {WORDS.map((word, index) => (
            <motion.span
              key={index}
              className="inline-block mx-1.5 sm:mr-3 md:mr-4 my-1"
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

        <motion.div variants={fadeUp} className="flex flex-col items-center gap-4 w-full px-2">
          <motion.p
            className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light max-w-prose break-words"
            style={{ color: "var(--accent-pink)" }}
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.85 } },
              exit: { opacity: 0, y: -16, transition: { duration: 0.4 } },
            }}
          >
            Pedro Ogawa de Oliveira
          </motion.p>

          <motion.span
            className="text-xs sm:text-sm md:text-base font-black tracking-[0.15em] sm:tracking-[0.2em] uppercase px-4 py-2.5 sm:px-6 sm:py-3 rounded-full max-w-full text-center break-words inline-flex justify-center items-center"
            style={{
              background: "linear-gradient(135deg, #FF1493, #8A2BE2)",
              color: "#fff",
              padding: "1rem"
            }}
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              show: {
                opacity: 1,
                scale: 1,
                boxShadow: [
                  "0 0 24px rgba(255,20,147,0.5), 0 0 48px rgba(138,43,226,0.25)",
                  "0 0 36px rgba(255,20,147,0.8), 0 0 64px rgba(138,43,226,0.45)",
                  "0 0 24px rgba(255,20,147,0.5), 0 0 48px rgba(138,43,226,0.25)",
                ],
                transition: {
                  opacity: { duration: 0.5, delay: 1 },
                  scale: { duration: 0.5, delay: 1 },
                  boxShadow: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                },
              },
              exit: {
                opacity: 0,
                scale: 0.85,
                transition: { duration: 0.4 },
              },
            }}
          >
            Peida Leite
          </motion.span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}