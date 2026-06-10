// src/components/challenges/QuizChallenge.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useProgress } from "../../hooks/useProgress";

const QUESTIONS = [
  {
    question: "Lorem ipsum dolor sit amet, qual a resposta correta?",
    options: [
      "Opção A lorem",
      "Opção B lorem",
      "Opção C lorem",
      "Opção D lorem",
    ],
    correct: 0,
    wrongPhoto: "/images/quiz-wrong-1.jpg",
    rightPhoto: "/images/quiz-right-1.jpg",
  },
  {
    question: "Lorem ipsum: qual foi aquele momento incrível?",
    options: ["Lorem A", "Lorem B", "Lorem C", "Lorem D"],
    correct: 2,
    wrongPhoto: "/images/quiz-wrong-2.jpg",
    rightPhoto: "/images/quiz-right-2.jpg",
  },
  {
    question: "Qual a comida favorita do Arthur quando a gente sai?",
    options: ["Lorem A", "Lorem B", "Lorem C", "Lorem D"],
    correct: 1,
    wrongPhoto: "/images/quiz-wrong-3.jpg",
    rightPhoto: "/images/quiz-right-3.jpg",
  },
  {
    question: "Lorem ipsum: e aquela vez que aconteceu isso?",
    options: ["Lorem A", "Lorem B", "Lorem C", "Lorem D"],
    correct: 3,
    wrongPhoto: "/images/quiz-wrong-4.jpg",
    rightPhoto: "/images/quiz-right-4.jpg",
  },
  {
    question: "O que o Arthur merece hoje?",
    options: ["Tudo", "Nada (brincadeira)", "Um presente incrível", "A e C"],
    correct: 3,
    wrongPhoto: "/images/quiz-wrong-5.jpg",
    rightPhoto: "/images/quiz-right-5.jpg",
  },
];

type Feedback = {
  type: "right" | "wrong";
  photo: string;
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
        photo: q.rightPhoto,
        message: "Isso aí! Você sabe das coisas 🎉",
      });
    } else {
      setFeedback({
        type: "wrong",
        photo: q.wrongPhoto,
        message: "Errou feio, hein... tenta de novo 😂",
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
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "var(--accent-cyan)" }}
        >
          Desafio 01
        </p>
        <h1
          className="text-3xl md:text-4xl font-black"
          style={{ color: "var(--text-primary)" }}
        >
          Quiz dos Bons Momentos 🧠
        </h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          Pergunta {current + 1} de {QUESTIONS.length}
        </p>
        {/* Barra de progresso */}
        <div
          className="mt-4 w-64 mx-auto h-1 rounded-full"
          style={{ background: "var(--bg-secondary)" }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "var(--accent-cyan)" }}
            animate={{ width: `${(current / QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {finished ? (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-6xl mb-6">🎉</p>
            <h2
              className="text-3xl font-black mb-4"
              style={{ color: "var(--accent-yellow)" }}
            >
              Quiz concluído!
            </h2>
            <p className="mb-8" style={{ color: "var(--text-muted)" }}>
              Você provou que é um bom amigo. Próximo desafio liberado!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="px-8 py-4 rounded-full font-bold text-lg"
              style={{
                background: "var(--gradient-hero)",
                color: "#fff",
              }}
            >
              Voltar para o início →
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="w-full max-w-xl"
          >
            {/* Pergunta */}
            <div
              className="rounded-2xl p-8 mb-6"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid rgba(0,240,255,0.1)",
              }}
            >
              <p
                className="text-xl font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {q.question}
              </p>
            </div>

            {/* Opções */}
            <div className="flex flex-col gap-3">
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(i)}
                  disabled={!!feedback}
                  className="text-left px-6 py-4 rounded-xl font-medium transition-all"
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid rgba(138,43,226,0.3)",
                    color: "var(--text-primary)",
                    cursor: feedback ? "not-allowed" : "pointer",
                  }}
                >
                  <span
                    style={{ color: "var(--accent-purple)" }}
                    className="mr-3"
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

      {/* Feedback overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{
              background: "rgba(11,15,25,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.7, y: 40 }}
              className="rounded-2xl overflow-hidden max-w-sm w-full text-center"
              style={{
                background: "var(--bg-secondary)",
                border: `1px solid ${feedback.type === "right" ? "var(--accent-cyan)" : "var(--accent-pink)"}`,
              }}
            >
              {/* Foto */}
              <div
                className="w-full h-48 flex items-center justify-center text-6xl"
                style={{
                  background:
                    feedback.type === "right"
                      ? "rgba(0,240,255,0.1)"
                      : "rgba(255,20,147,0.1)",
                }}
              >
                {/* Troque por <img> quando tiver as fotos */}
                {feedback.type === "right" ? "😄" : "😬"}
              </div>
              <div className="p-6">
                <p
                  className="text-lg font-bold mb-4"
                  style={{
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
                  className="px-6 py-3 rounded-full font-bold"
                  style={{
                    background:
                      feedback.type === "right"
                        ? "var(--accent-cyan)"
                        : "var(--accent-pink)",
                    color: "#000",
                  }}
                >
                  {feedback.type === "right"
                    ? current + 1 >= QUESTIONS.length
                      ? "Ver resultado!"
                      : "Próxima pergunta →"
                    : "Tentar de novo"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
