"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import { motion } from "framer-motion";
import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroIntroPhoto from "./HeroIntroPhoto";
import HeroContent from "./HeroContent";
import HeroSideShowcase from "./HeroSideShowcase";
import HeroScrollIndicator from "./HeroScrollIndicator";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[220vh] overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <HeroBackground />
      <HeroParticles />
      <HeroSideShowcase scrollProgress={scrollYProgress} />
      <div className="sticky top-0 min-h-screen">
        <div
          className="relative z-10 flex flex-col items-center px-6"
          style={{ paddingTop: "6rem" }}
        >
          <HeroIntroPhoto scrollProgress={scrollYProgress} />
        </div>

        <motion.div
          style={{
            position: "absolute",
            top: "100%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <HeroContent />
        </motion.div>

        <HeroScrollIndicator scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
}