// src/app/page.tsx
"use client";

import HeroSection from "./Components/sections/hero/HeroSection";
import ChallengesSection from "./Components/sections/ChallengesSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ChallengesSection />
    </main>
  );
}
