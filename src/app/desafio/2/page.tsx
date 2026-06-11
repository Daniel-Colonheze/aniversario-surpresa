// src/app/desafio/2/page.tsx
"use client";

import EnigmaChallenge from "../../Components/challenges/EnigmaChallenge";
import ChallengeGuard from "../../Components/ChallengeGuard";

export default function Desafio2() {
  return (
    <ChallengeGuard challengeId={2}>
      <EnigmaChallenge />
    </ChallengeGuard>
  );
}
