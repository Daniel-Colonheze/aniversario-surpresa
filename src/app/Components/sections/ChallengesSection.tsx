"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Brain, Key, Puzzle, Gift, Lock, type LucideIcon } from "lucide-react";
import { useProgress } from "../../hooks/useProgress";
import type { ChallengeId } from "../../lib/store";
import Cigarro3D from "./Cigarro3D";
import { PARTICLES } from "../sections/hero/hero.constants";

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

interface ChallengeCardProps {
  challenge: {
    id: ChallengeId;
    number: string;
    title: string;
    icon: LucideIcon;
    color: string;
    route: string;
  };
  locked: boolean;
  done: boolean;
  onClick: () => void;
}

export default function ChallengesSection() {
  const { unlocked, completed } = useProgress();
  const router = useRouter();

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "var(--bg-primary)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        {PARTICLES.map((particle, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full"
            style={{
              width: particle.width,
              height: particle.height,
              left: particle.left,
              top: particle.top,
              background: particle.color,
              filter: `blur(${particle.blur}px)`,
            }}
            animate={{
              y: [0, particle.yRange, 0],
              x: [0, particle.xRange, 0],
              opacity: [
                particle.opacityMin,
                particle.opacityMax,
                particle.opacityMin,
              ],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.3em",
              marginBottom: "0.75rem",
              color: "var(--accent-cyan)",
            }}
          >
            Sua jornada
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              fontWeight: 900,
              color: "var(--text-primary)",
            }}
          >
            Complete os desafios
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1rem",
              maxWidth: "32rem",
              marginLeft: "auto",
              marginRight: "auto",
              color: "var(--text-muted)",
            }}
          >
            Cada etapa concluída desbloqueia a próxima.
          </p>
        </motion.div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div
            style={{
              flex: "1",
              minWidth: "280px",
              maxWidth: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
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

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "260px", height: "380px" }}>
              <Cigarro3D />
            </div>
            <div
              style={{
                width: "260px",
                height: "380px",
                position: "relative",
                borderRadius: "1rem",
                overflow: "hidden",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              }}
            >
              <Image
                src="/images/momento-6.jpg"
                alt="Momento especial"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 260px, 260px"
              />
            </div>
          </div>
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
}: ChallengeCardProps) {
  const Icon = challenge.icon;

  return (
    <motion.button
      onClick={onClick}
      disabled={locked}
      whileHover={!locked ? { scale: 1.02 } : {}}
      whileTap={!locked ? { scale: 0.98 } : {}}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        minHeight: "70px",
        borderRadius: "12px",
        padding: "12px 16px",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            pointerEvents: "none",
            background: `radial-gradient(circle at center, ${challenge.color}, transparent 70%)`,
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "999px",
            background: locked
              ? "rgba(255,255,255,0.05)"
              : `${challenge.color}15`,
            color: locked ? "var(--text-muted)" : challenge.color,
          }}
        >
          {locked ? (
            <Lock size={20} strokeWidth={1.75} />
          ) : (
            <Icon size={20} strokeWidth={1.75} />
          )}
        </div>
        <div style={{ textAlign: "center" }}>
          <span
            style={{
              display: "block",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              marginBottom: "4px",
              color: locked ? "var(--text-muted)" : challenge.color,
            }}
          >
            {done ? "CONCLUÍDO" : `DESAFIO ${challenge.number}`}
          </span>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: 1.2,
              color: locked ? "var(--text-muted)" : "var(--text-primary)",
            }}
          >
            {challenge.title}
          </h3>
        </div>
      </div>
    </motion.button>
  );
}
