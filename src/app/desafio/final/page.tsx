// src/app/desafio/final/page.tsx
"use client";

import ChallengeGuard from "../../Components/ChallengeGuard";
import FinalChallenge from "../../Components/challenges/FinalChallenge";

export default function DesafioFinal() {
  return (
    <ChallengeGuard challengeId={4}>
      <FinalChallenge />
    </ChallengeGuard>
  );
}