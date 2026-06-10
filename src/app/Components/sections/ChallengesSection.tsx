// src/components/sections/ChallengesSection.tsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Brain, Key, Puzzle, Gift, Lock } from "lucide-react";
import { useProgress } from "../../hooks/useProgress";
import type { ChallengeId } from "../../lib/store";

const CHALLENGES = [
  {
    id: 1 as ChallengeId,
    number: "01",
    title: "Quiz dos Bons Momentos",
    description: "Você lembra de tudo que vivemos? Prove que é um bom amigo.",
    icon: Brain,
    color: "var(--accent-cyan)",
    route: "/desafio/1",
  },
  {
    id: 2 as ChallengeId,
    number: "02",
    title: "Enigma dos Símbolos",
    description: "Cada símbolo esconde uma letra. Decifre a mensagem secreta.",
    icon: Key,
    color: "var(--accent-purple)",
    route: "/desafio/2",
  },
  {
    id: 3 as ChallengeId,
    number: "03",
    title: "Quebra-Cabeça",
    description: "Monte a imagem e descubra o que está escondido.",
    icon: Puzzle,
    color: "var(--accent-pink)",
    route: "/desafio/3",
  },
  {
    id: 4 as ChallengeId,
    number: "04",
    title: "Surpresa Final",
    description: "Você chegou até aqui. Agora é hora do presente.",
    icon: Gift,
    color: "var(--accent-yellow)",
    route: "/desafio/final",
  },
];

export default function ChallengesSection() {
  const { unlocked, completed } = useProgress();
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20" style={{ background: "var(--bg-primary)" }}>
      <div className="w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs uppercase tracking-widest mb-2" style={{ color: "var(--accent-cyan)" }}>Sua jornada</p>
          <h2 className="text-3xl md:text-5xl font-black" style={{ color: "var(--text-primary)" }}>Complete os desafios</h2>
          <p className="mt-3 text-base md:text-lg" style={{ color: "var(--text-muted)" }}>Cada desafio libera o próximo. O presente só aparece no final.</p>
        </motion.div>

        <div className="flex flex-col gap-5">
          {CHALLENGES.map((c, i) => {
            const isLocked = !unlocked(c.id);
            const isDone = completed(c.id);
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex justify-center"
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

function ChallengeCard({ challenge, locked, done, onClick }) {
  const Icon = challenge.icon;

  return (
    <motion.button
      onClick={onClick}
      disabled={locked}
      whileHover={!locked ? { scale: 1.02, x: 5 } : {}}
      whileTap={!locked ? { scale: 0.98 } : {}}
      className="w-full max-w-xl text-left rounded-xl p-5 flex items-center gap-4 transition-all relative overflow-hidden"
      style={{
        background: locked ? "rgba(30,34,53,0.4)" : done ? "rgba(30,34,53,0.9)" : "var(--bg-secondary)",
        border: `1px solid ${locked ? "rgba(255,255,255,0.05)" : done ? challenge.color + "55" : challenge.color + "33"}`,
        cursor: locked ? "not-allowed" : "pointer",
        opacity: locked ? 0.5 : 1,
      }}
    >
      {!locked && (
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at 0% 50%, ${challenge.color}, transparent 70%)` }} />
      )}

      <span className="text-3xl font-black shrink-0 w-10 text-center" style={{ color: locked ? "var(--text-muted)" : challenge.color }}>
        {done ? "✓" : challenge.number}
      </span>

      <div className="shrink-0" style={{ color: locked ? "var(--text-muted)" : challenge.color }}>
        {locked ? <Lock size={26} strokeWidth={1.5} /> : <Icon size={26} strokeWidth={1.5} />}
      </div>

      <div className="flex-1 text-left">
        <h3 className="text-base md:text-lg font-bold mb-0.5" style={{ color: locked ? "var(--text-muted)" : "var(--text-primary)" }}>
          {challenge.title}
        </h3>
        <p className="text-xs md:text-sm" style={{ color: "var(--text-muted)" }}>
          {locked ? "Complete o desafio anterior para desbloquear." : challenge.description}
        </p>
      </div>

      {!locked && (
        <span className="text-lg shrink-0" style={{ color: challenge.color }}>→</span>
      )}
    </motion.button>
  );
}