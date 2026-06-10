// src/hooks/useProgress.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { getProgress, completeChallenge, type Progress, type ChallengeId } from "../lib/store";

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({ completed: [], unlocked: [1] });

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  const complete = useCallback((id: ChallengeId) => {
    const updated = completeChallenge(id);
    setProgress({ ...updated });
  }, []);

  const unlocked = (id: ChallengeId) => progress.unlocked.includes(id);
  const completed = (id: ChallengeId) => progress.completed.includes(id);

  return { progress, complete, unlocked, completed };
}