// src/lib/store.ts
// Controla o progresso dos desafios via localStorage

export type ChallengeId = 1 | 2 | 3 | 4;

export interface Progress {
  completed: ChallengeId[];
  unlocked: ChallengeId[];
}

const STORAGE_KEY = "arthur_birthday_progress";

export function getProgress(): Progress {
  if (typeof window === "undefined") return { completed: [], unlocked: [1] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completed: [], unlocked: [1] };
    return JSON.parse(raw);
  } catch {
    return { completed: [], unlocked: [1] };
  }
}

export function completeChallenge(id: ChallengeId): Progress {
  const progress = getProgress();
  if (!progress.completed.includes(id)) {
    progress.completed.push(id);
  }
  const next = (id + 1) as ChallengeId;
  if (next <= 4 && !progress.unlocked.includes(next)) {
    progress.unlocked.push(next);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  return progress;
}

export function isUnlocked(id: ChallengeId): boolean {
  return getProgress().unlocked.includes(id);
}

export function isCompleted(id: ChallengeId): boolean {
  return getProgress().completed.includes(id);
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}