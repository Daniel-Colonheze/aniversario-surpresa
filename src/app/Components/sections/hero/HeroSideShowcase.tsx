"use client";

import { MotionValue } from "framer-motion";

interface HeroSideShowcaseProps {
  scrollProgress: MotionValue<number>;
}

export default function HeroSideShowcase({
  scrollProgress,
}: HeroSideShowcaseProps) {
  return (
    <div
      className="
        hidden
        xl:block
        fixed
        right-8
        top-1/2
        -translate-y-1/2
        z-20
        pointer-events-none
      "
    >
    </div>
  );
}
