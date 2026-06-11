"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";

import HeroBackground from "./HeroBackground";
import HeroParticles from "./HeroParticles";
import HeroIntroPhoto from "./HeroIntroPhoto";
import HeroContent from "./HeroContent";
import HeroSideShowcase from "./HeroSideShowcase";

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] overflow-hidden"
      style={{
        background: "var(--bg-primary)",
      }}
    >
      <HeroBackground />

      <HeroParticles />

      <HeroSideShowcase scrollProgress={scrollYProgress} />

      <div className="sticky top-0 min-h-screen">
        <div className="relative z-10 flex flex-col items-center px-6 pt-20 md:pt-32">
          <HeroIntroPhoto scrollProgress={scrollYProgress} />

          <HeroContent />
        </div>
      </div>
    </section>
  );
}
