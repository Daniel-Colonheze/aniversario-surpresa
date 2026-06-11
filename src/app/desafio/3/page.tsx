// src/app/desafio/3/page.tsx
"use client";

import ChallengeGuard from "../../Components/ChallengeGuard";
import PuzzleChallenge from "../../Components/challenges/PuzzleChallenge";

export default function Desafio3() {
  return (
    <ChallengeGuard challengeId={3}>
      <PuzzleChallenge />
    </ChallengeGuard>
  );
}
