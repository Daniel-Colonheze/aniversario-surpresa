// src/app/page.tsx
"use client";
 
import HeroSection from "@/components/sections/HeroSection";
import ChallengesSection from "@/components/sections/ChallengesSection";
 
export default function Home() {
  return (
    <main>
      <HeroSection />
      <ChallengesSection />
    </main>
  );
}
 