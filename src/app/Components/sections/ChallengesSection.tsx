// src/components/sections/ChallengesSection.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useProgress } from "@/hooks/useProgress";
import type { ChallengeId } from "@/lib/store";

const CHALLENGES = [
  {
    id: 1 as ChallengeId,
    number: "01",
    title: "Quiz dos Bons Momentos",
    description: "Você lembra de tudo que vivemos? Prove que é um bom amigo.",
    icon: "🧠",
    color: "var(--accent-cyan)",
    route: "/desafio/1",
  },
  {
    id: 2 as ChallengeId,
    number: "02",
    title: "Enigma dos Símbolos",
    description: "Cada símbolo esconde uma letra. Decifre a mensagem secreta.",
    icon: "🔐",
    color: "var(--accent-purple)",
    route: "/desafio/2",
  },
  {
    id: 3 as ChallengeId,
    number: "03",
    title: "Quebra-Cabeça",
    description: "Monte a imagem e descubra o que está escondido.",
    icon: "🧩",
    color: "var(--accent-pink)",
    route: "/desafio/3",
  },
  {
    id: 4 as ChallengeId,
    number: "🎁",
    title: "Surpresa Final",
    description: "Você chegou até aqui. Agora é hora do presente.",
    icon: "🎂",
    color: "var(--accent-yellow)",
    route: "/desafio/final",
  },
];

export default function ChallengesSection() {
  const { unlocked, completed } = useProgress();
  const router = useRouter();

  return (
    <section
      className="min-h-screen px-6 py-24"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--accent-cyan)" }}
          >
            Sua jornada
          </p>
          <h2
            className="text-4xl md:text-5xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Complete os desafios
          </h2>
          <p className="mt-4 text-lg" style={{ color: "var(--text-muted)" }}>
            Cada desafio libera o próximo. O presente só aparece no final.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          {CHALLENGES.map((c, i) => {
            const isLocked = !unlocked(c.id);
            const isDone = completed(c.id);

            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <ChallengeCard
                  challenge={c}
                  locked={isLocked}
                  done={isDone}
                  onClick={() => !isLocked && router.push(c.route)}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ChallengeCard({
  challenge,
  locked,
  done,
  onClick,
}: {
  challenge: (typeof CHALLENGES)[0];
  locked: boolean;
  done: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={locked}
      whileHover={!locked ? { scale: 1.02, x: 8 } : {}}
      whileTap={!locked ? { scale: 0.98 } : {}}
      className="w-full text-left rounded-2xl p-6 flex items-center gap-6 transition-all relative overflow-hidden"
      style={{
        background: locked
          ? "rgba(30,34,53,0.4)"
          : done
            ? "rgba(30,34,53,0.9)"
            : "var(--bg-secondary)",
        border: `1px solid ${locked ? "rgba(255,255,255,0.05)" : done ? challenge.color + "55" : challenge.color + "33"}`,
        cursor: locked ? "not-allowed" : "pointer",
        opacity: locked ? 0.5 : 1,
      }}
    >
      {/* Glow de fundo quando desbloqueado */}
      {!locked && (
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            background: `radial-gradient(circle at left, ${challenge.color}, transparent 70%)`,
          }}
        />
      )}

      {/* Número */}
      <span
        className="text-4xl font-black shrink-0 w-12 text-center"
        style={{ color: locked ? "var(--text-muted)" : challenge.color }}
      >
        {done ? "✓" : challenge.number}
      </span>

      {/* Ícone */}
      <span className="text-3xl shrink-0">
        {locked ? "🔒" : challenge.icon}
      </span>

      {/* Texto */}
      <div className="flex-1">
        <h3
          className="text-lg font-bold mb-1"
          style={{
            color: locked ? "var(--text-muted)" : "var(--text-primary)",
          }}
        >
          {challenge.title}
        </h3>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {locked
            ? "Complete o desafio anterior para desbloquear."
            : challenge.description}
        </p>
      </div>

      {/* Seta */}
      {!locked && (
        <span className="text-xl shrink-0" style={{ color: challenge.color }}>
          →
        </span>
      )}
    </motion.button>
  );
}
