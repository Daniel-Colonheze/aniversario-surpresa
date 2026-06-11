// src/components/ChallengeGuard.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "../hooks/useProgress";
import type { ChallengeId } from "../lib/store";

interface ChallengeGuardProps {
  children: React.ReactNode;
  challengeId: ChallengeId;
}

export default function ChallengeGuard({ children, challengeId }: ChallengeGuardProps) {
  const { unlocked, completed, isLoading } = useProgress(); // verifique se seu hook exporta isLoading
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Se ainda está carregando o progresso (ex: leitura do localStorage), aguarde
    if (isLoading) return;

    console.log(`Guard do desafio ${challengeId}: unlocked =`, unlocked(challengeId));

    // Regra: desafio está desbloqueado? (unlocked já verifica desafios anteriores)
    if (unlocked(challengeId)) {
      setAuthorized(true);
    } else {
      // Não desbloqueado → redireciona para a home
      router.replace("/");
      setAuthorized(false);
    }
  }, [challengeId, unlocked, isLoading, router]);

  if (isLoading || authorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Carregando...</div>
      </div>
    );
  }

  if (!authorized) return null;

  return <>{children}</>;
}