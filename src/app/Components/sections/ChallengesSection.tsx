"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Brain, Key, Puzzle, Gift, Lock, type LucideIcon } from "lucide-react";
import { useProgress } from "../../hooks/useProgress";
import type { ChallengeId } from "../../lib/store";
import Cigarro3D from "./Cigarro3D";

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function generateParticles(count: number) {
  return Array.from({ length: count }, () => {
    const colorRoll = Math.random();
    const color = colorRoll > 0.65 ? "var(--accent-cyan)" : colorRoll > 0.35 ? "var(--accent-purple)" : "var(--accent-pink)";
    const size = rand(1.5, 5.5);
    return {
      width: size, height: size,
      left: `${rand(0, 100)}%`, top: `${rand(0, 100)}%`,
      duration: rand(4, 10), delay: rand(0, 4), color,
      blur: size > 4 ? 1.5 : 0,
      yRange: -(rand(20, 50)), xRange: rand(-18, 18),
      opacityMin: rand(0.08, 0.2), opacityMax: rand(0.55, 0.85),
    };
  });
}

const CHALLENGES = [
  { id: 1 as ChallengeId, number: "01", title: "Quiz", icon: Brain, color: "var(--accent-cyan)", route: "/desafio/1" },
  { id: 2 as ChallengeId, number: "02", title: "Enigma", icon: Key, color: "var(--accent-purple)", route: "/desafio/2" },
  { id: 3 as ChallengeId, number: "03", title: "Quebra-Cabeça", icon: Puzzle, color: "var(--accent-pink)", route: "/desafio/3" },
  { id: 4 as ChallengeId, number: "04", title: "Final", icon: Gift, color: "var(--accent-yellow)", route: "/desafio/final" },
];

interface ChallengeCardProps {
  challenge: { id: ChallengeId; number: string; title: string; icon: LucideIcon; color: string; route: string };
  locked: boolean;
  done: boolean;
  onClick: () => void;
  index: number;
}

function ChallengeCard({ challenge, locked, done, onClick, index }: ChallengeCardProps) {
  const Icon = challenge.icon;
  return (
    <motion.button
      onClick={onClick}
      disabled={locked}
      initial={{ opacity: 0, x: -32 }}
      whileInView={{ opacity: locked ? 0.55 : 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      viewport={{ once: false, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={!locked ? { scale: 1.02, x: 4 } : {}}
      whileTap={!locked ? { scale: 0.98 } : {}}
      style={{
        position: "relative", overflow: "hidden", width: "100%", minHeight: "70px",
        borderRadius: "12px", padding: "12px 16px", display: "flex", alignItems: "center",
        justifyContent: "center",
        background: locked ? "rgba(30,34,53,0.35)" : done ? "rgba(30,34,53,0.95)" : "var(--bg-secondary)",
        border: `1px solid ${locked ? "rgba(255,255,255,0.05)" : done ? challenge.color + "55" : challenge.color + "33"}`,
        cursor: locked ? "not-allowed" : "pointer",
      }}
    >
      {!locked && (
        <motion.div
          style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(circle at center, ${challenge.color}, transparent 70%)` }}
          initial={{ opacity: 0.05 }}
          whileHover={{ opacity: 0.15 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", gap: "16px" }}>
        <motion.div
          style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", borderRadius: "999px", background: locked ? "rgba(255,255,255,0.05)" : `${challenge.color}15`, color: locked ? "var(--text-muted)" : challenge.color }}
          animate={!locked ? { boxShadow: [`0 0 0px ${challenge.color}`, `0 0 12px ${challenge.color}44`, `0 0 0px ${challenge.color}`] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.4 }}
        >
          {locked ? <Lock size={20} strokeWidth={1.75} /> : <Icon size={20} strokeWidth={1.75} />}
        </motion.div>
        <div style={{ textAlign: "center" }}>
          <span style={{ display: "block", fontSize: "12px", fontWeight: 600, letterSpacing: "0.16em", marginBottom: "4px", color: locked ? "var(--text-muted)" : challenge.color }}>
            {done ? "CONCLUÍDO" : `DESAFIO ${challenge.number}`}
          </span>
          <h3 style={{ fontSize: "16px", fontWeight: 700, lineHeight: 1.2, color: locked ? "var(--text-muted)" : "var(--text-primary)" }}>
            {challenge.title}
          </h3>
        </div>
      </div>
    </motion.button>
  );
}

export default function ChallengesSection() {
  const { unlocked, completed } = useProgress();
  const router = useRouter();
  const [particles, setParticles] = useState<ReturnType<typeof generateParticles>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setParticles(generateParticles(40));
    setMounted(true);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}>
      <div className="absolute inset-0 pointer-events-none z-0">
        {mounted && particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: p.width, height: p.height, left: p.left, top: p.top, background: p.color, filter: `blur(${p.blur}px)`, opacity: p.opacityMin }}
            animate={{ y: [0, p.yRange, 0], x: [0, p.xRange, 0], opacity: [p.opacityMin, p.opacityMax, p.opacityMin], scale: [1, 1.4, 1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "3rem" }}
        >
          <motion.p
            style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.3em", marginBottom: "0.75rem", color: "var(--accent-cyan)" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Sua jornada
          </motion.p>
          <motion.h2
            style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Complete os desafios
          </motion.h2>
          <motion.p
            style={{ marginTop: "1rem", fontSize: "1rem", maxWidth: "32rem", marginLeft: "auto", marginRight: "auto", color: "var(--text-muted)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Cada etapa concluída desbloqueia a próxima.
          </motion.p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
          <div style={{ flex: "1", minWidth: "280px", maxWidth: "400px", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {mounted && CHALLENGES.map((c, i) => {
              const isLocked = !unlocked(c.id);
              const isDone = completed(c.id);
              return (
                <ChallengeCard
                  key={c.id}
                  challenge={c}
                  locked={isLocked}
                  done={isDone}
                  index={i}
                  onClick={() => !isLocked && router.push(c.route)}
                />
              );
            })}
          </div>

          <motion.div
            style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            viewport={{ once: false, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div style={{ width: "260px", height: "380px" }}>
              <Cigarro3D />
            </div>
            <motion.div
              style={{ width: "260px", height: "380px", position: "relative", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileHover={{ scale: 1.03, boxShadow: "0 25px 50px rgba(0,0,0,0.4)", transition: { duration: 0.3 } }}
            >
              <Image src="/images/momento-5.jpeg" alt="Momento especial" fill style={{ objectFit: "cover" }} sizes="(max-width: 768px) 260px, 260px" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}