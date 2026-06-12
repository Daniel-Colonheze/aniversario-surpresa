// src/components/challenges/QuizChallenge.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Brain, ArrowRight, RotateCcw, Trophy } from "lucide-react";
import { useProgress } from "../../hooks/useProgress";

const QUESTIONS = [
  {
    question: "O que o Jonas Balduino gosta de fazer?",
    options: [
      "Estuprar",
      "Estudar",
      "Jogar ATT no Roblox",
      "Namorar a namorada dele",
    ],
    correct: 0,
  },
  {
    question: "O que você leva para comer no RU??",
    options: ["Pica", "Farofa", "Batata Palha", "Salsicha"],
    correct: 2,
  },
  {
    question: "O que o Daniel é ??",
    options: ["Teimoso", "Maravilhoso, Lindo, Gato, Safado, Estudioso, Jogador", "Racista", "Fedido"],
    correct: 1,
  },
  {
    question: "Por qual motivo o Daniel Colonheze foi quase expulso da escola??",
    options: ["Por falar de mais na aula", "Por bater em alguém", "Quase reprovar", "Falar meu pau na sua mão para diversas pessoas"],
    correct: 3,
  },
  {
    question: "O que o Arthur merece hoje?",
    options: ["Rola", "Nada", "Amor e carinho", "A e C"],
    correct: 3,
  },
];

type Feedback = {
  type: "right" | "wrong";
  message: string;
} | null;

export default function QuizChallenge() {
  const router = useRouter();
  const { complete } = useProgress();
  const [current, setCurrent] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[current];

  function handleAnswer(idx: number) {
    if (feedback) return;
    if (idx === q.correct) {
      setFeedback({
        type: "right",
        message: "Boa Viadinho",
      });
    } else {
      setFeedback({
        type: "wrong",
        message: "Errou pai, faz de novo",
      });
    }
  }

  function handleNext() {
    if (feedback?.type !== "right") {
      setFeedback(null);
      return;
    }
    setFeedback(null);
    if (current + 1 >= QUESTIONS.length) {
      complete(1);
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        background: "var(--bg-primary)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <Brain size={20} style={{ color: "var(--accent-cyan)" }} />
          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-cyan)",
            }}
          >
            Desafio 01
          </p>
        </div>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
          }}
        >
          Quiz Elegante
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--text-muted)",
          }}
        >
          Pergunta {current + 1} de {QUESTIONS.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {finished ? (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center" }}
          >
            <div
              style={{
                width: "5rem",
                height: "5rem",
                margin: "0 auto 1.5rem auto",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,240,255,0.15)",
              }}
            >
              <Trophy size={40} style={{ color: "var(--accent-yellow)" }} />
            </div>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 900,
                marginBottom: "1rem",
                color: "var(--accent-yellow)",
              }}
            >
              Quiz concluído!
            </h2>
            <p
              style={{
                marginBottom: "2rem",
                maxWidth: "28rem",
                color: "var(--text-muted)",
              }}
            >
              Você provou seu conhecimento. Próximo desafio liberado!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              style={{
                padding: "1rem 2rem",
                borderRadius: "9999px",
                fontWeight: "bold",
                fontSize: "1.125rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--gradient-hero)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Voltar para o início
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            style={{ width: "100%", maxWidth: "42rem" }}
          >
            <div
              style={{
                marginBottom: "3rem",
                background:
                  "linear-gradient(135deg, var(--bg-secondary) 0%, rgba(30,34,53,0.8) 100%)",
                border: "1px solid rgba(0,240,255,0.3)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(0,240,255,0.1)",
              }}
            >
              <p
                style={{
                  fontSize: "1.25rem",
                  lineHeight: "1.5",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                }}
              >
                {q.question}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(i)}
                  disabled={!!feedback}
                  style={{
                    textAlign: "left",
                    padding: "0.625rem 1rem",
                    borderRadius: "0.75rem",
                    fontWeight: 500,
                    background: "rgba(30,34,53,0.6)",
                    border: "1px solid rgba(138,43,226,0.4)",
                    color: "var(--text-primary)",
                    cursor: feedback ? "not-allowed" : "pointer",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent-purple)",
                      fontWeight: "bold",
                      marginRight: "0.75rem",
                    }}
                  >
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 50,
              padding: "1rem",
              background: "rgba(11,15,25,0.95)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 40 }}
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                maxWidth: "28rem",
                width: "100%",
                background: "var(--bg-secondary)",
                border: `1px solid ${feedback.type === "right" ? "var(--accent-cyan)" : "var(--accent-pink)"}`,
              }}
            >
              <div
                style={{ position: "relative", width: "100%", height: "14rem" }}
              >
                <Image
                  src={
                    feedback.type === "right"
                      ? "/images/momento-8.jpg"
                      : "/images/momento-7.jpg"
                  }
                  alt={feedback.type === "right" ? "Acerto" : "Erro"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 448px"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      feedback.type === "right"
                        ? "linear-gradient(to top, rgba(0,240,255,0.3), transparent)"
                        : "linear-gradient(to top, rgba(255,20,147,0.3), transparent)",
                  }}
                />
              </div>
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    marginBottom: "1.5rem",
                    color:
                      feedback.type === "right"
                        ? "var(--accent-cyan)"
                        : "var(--accent-pink)",
                  }}
                >
                  {feedback.message}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "9999px",
                    fontWeight: "bold",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background:
                      feedback.type === "right"
                        ? "var(--accent-cyan)"
                        : "var(--accent-pink)",
                    color: "#000",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {feedback.type === "right" ? (
                    current + 1 >= QUESTIONS.length ? (
                      <>
                        Ver resultado <Trophy size={16} />
                      </>
                    ) : (
                      <>
                        Próxima pergunta <ArrowRight size={16} />
                      </>
                    )
                  ) : (
                    <>
                      Tentar de novo <RotateCcw size={16} />
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
