"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Brain, Key, Puzzle, Gift, Lock } from "lucide-react";
import { useProgress } from "../../hooks/useProgress";
import type { ChallengeId } from "../../lib/store";
import Cigarro3D from "./Cigarro3D";

const CHALLENGES = [
  {
    id: 1 as ChallengeId,
    number: "01",
    title: "Quiz",
    icon: Brain,
    color: "var(--accent-cyan)",
    route: "/desafio/1",
  },
  {
    id: 2 as ChallengeId,
    number: "02",
    title: "Enigma",
    icon: Key,
    color: "var(--accent-purple)",
    route: "/desafio/2",
  },
  {
    id: 3 as ChallengeId,
    number: "03",
    title: "Quebra-Cabeça",
    icon: Puzzle,
    color: "var(--accent-pink)",
    route: "/desafio/3",
  },
  {
    id: 4 as ChallengeId,
    number: "04",
    title: "Final",
    icon: Gift,
    color: "var(--accent-yellow)",
    route: "/desafio/final",
  },
];

export default function ChallengesSection() {
  const { unlocked, completed } = useProgress();
  const router = useRouter();

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-16 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute top-12 right-10 w-72 h-96 hidden md:block pointer-events-none z-0"
        style={{ transform: "rotate(-6deg)" }}
      >
        <Image
          src="/images/momento-3.jpg"
          alt="Momento"
          fill
          className="object-cover rounded-2xl"
          sizes="(max-width: 768px) 0vw, 288px"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-black"
            style={{ color: "var(--text-primary)" }}
          >
            Complete os desafios
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          <div className="w-full max-w-md flex flex-col gap-4">
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

          <div className="flex justify-center items-center shrink-0">
            <div className="w-[260px] h-[380px] md:w-[280px] md:h-[400px]">
              <Cigarro3D />
            </div>
          </div>
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
      whileHover={!locked ? { scale: 1.02 } : {}}
      whileTap={!locked ? { scale: 0.98 } : {}}
      className="
        relative
        overflow-hidden
        w-full
        min-h-[64px]
        rounded-lg
        px-4
        py-3
        transition-all
        flex
        items-center
        justify-center
      "
      style={{
        background: locked
          ? "rgba(30,34,53,0.35)"
          : done
            ? "rgba(30,34,53,0.95)"
            : "var(--bg-secondary)",
        border: `1px solid ${
          locked
            ? "rgba(255,255,255,0.05)"
            : done
              ? challenge.color + "55"
              : challenge.color + "33"
        }`,
        cursor: locked ? "not-allowed" : "pointer",
        opacity: locked ? 0.55 : 1,
      }}
    >
      {!locked && (
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${challenge.color}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10 flex items-center justify-center gap-3">
        <div
          className="flex items-center justify-center w-10 h-10 rounded-full"
          style={{
            background: locked
              ? "rgba(255,255,255,0.05)"
              : `${challenge.color}15`,
            color: locked ? "var(--text-muted)" : challenge.color,
          }}
        >
          {locked ? (
            <Lock size={18} strokeWidth={1.75} />
          ) : (
            <Icon size={18} strokeWidth={1.75} />
          )}
        </div>
        <div className="text-center">
          <span
            className="block text-[11px] font-semibold tracking-[0.16em] mb-1"
            style={{ color: locked ? "var(--text-muted)" : challenge.color }}
          >
            {done ? "CONCLUÍDO" : `DESAFIO ${challenge.number}`}
          </span>
          <h3
            className="text-sm md:text-base font-bold leading-tight"
            style={{ color: locked ? "var(--text-muted)" : "var(--text-primary)" }}
          >
            {challenge.title}
          </h3>
        </div>
      </div>
    </motion.button>
  );
}