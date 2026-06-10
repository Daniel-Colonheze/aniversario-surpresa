// src/components/challenges/PuzzleChallenge.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useProgress } from "@/hooks/useProgress";

const GRID = 4;
const TOTAL = GRID * GRID;
// Imagem do quebra-cabeça — troque pelo caminho real depois
const PUZZLE_IMAGE = "/images/puzzle-photo.jpg";

function createShuffled(): number[] {
  const arr = Array.from({ length: TOTAL }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function PuzzleChallenge() {
  const router = useRouter();
  const { complete } = useProgress();
  const [pieces, setPieces] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setPieces(createShuffled());
  }, []);

  const checkSolved = useCallback((arr: number[]) => {
    return arr.every((v, i) => v === i);
  }, []);

  function handlePieceClick(index: number) {
    if (solved) return;
    if (selected === null) {
      setSelected(index);
      return;
    }
    if (selected === index) {
      setSelected(null);
      return;
    }
    const newPieces = [...pieces];
    [newPieces[selected], newPieces[index]] = [
      newPieces[index],
      newPieces[selected],
    ];
    setPieces(newPieces);
    setSelected(null);
    setMoves((m) => m + 1);
    if (checkSolved(newPieces)) {
      complete(3);
      setSolved(true);
    }
  }

  function reset() {
    setPieces(createShuffled());
    setSelected(null);
    setMoves(0);
    setSolved(false);
  }

  const pieceSize = 72; // px por peça
  const gridSize = pieceSize * GRID;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "var(--accent-pink)" }}
        >
          Desafio 03
        </p>
        <h1
          className="text-3xl md:text-4xl font-black mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Quebra-Cabeça 🧩
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Clique em duas peças para trocá-las. Monte a imagem corretamente.
        </p>
        <p className="mt-2 text-sm" style={{ color: "var(--accent-pink)" }}>
          Movimentos: {moves}
        </p>
      </motion.div>

      {/* Grid do puzzle */}
      <div
        className="relative mb-6"
        style={{
          width: gridSize,
          height: gridSize,
          display: "grid",
          gridTemplateColumns: `repeat(${GRID}, 1fr)`,
          gap: 3,
          background: "var(--bg-secondary)",
          padding: 3,
          borderRadius: 12,
          border: "1px solid rgba(255,20,147,0.3)",
        }}
      >
        {pieces.map((pieceIndex, position) => {
          const col = pieceIndex % GRID;
          const row = Math.floor(pieceIndex / GRID);
          const isSelected = selected === position;
          const isCorrect = pieceIndex === position;

          return (
            <motion.button
              key={position}
              onClick={() => handlePieceClick(position)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              animate={
                isSelected
                  ? { scale: 1.08, zIndex: 10 }
                  : { scale: 1, zIndex: 1 }
              }
              className="relative overflow-hidden"
              style={{
                width: pieceSize,
                height: pieceSize,
                backgroundImage: `url(${PUZZLE_IMAGE})`,
                backgroundSize: `${gridSize}px ${gridSize}px`,
                backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`,
                border: isSelected
                  ? "3px solid var(--accent-cyan)"
                  : isCorrect && moves > 0
                    ? "2px solid var(--accent-yellow)"
                    : "1px solid rgba(255,255,255,0.05)",
                borderRadius: 6,
                cursor: "pointer",
                // Fallback visual quando não há imagem
                background: !PUZZLE_IMAGE
                  ? `hsl(${(pieceIndex * 22) % 360}, 70%, 40%)`
                  : undefined,
              }}
            >
              {/* Número da peça como fallback */}
              <span
                className="absolute bottom-1 right-1 text-xs font-bold opacity-40"
                style={{ color: "#fff" }}
              >
                {pieceIndex + 1}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={reset}
        className="mb-8 px-4 py-2 rounded-full text-sm"
        style={{
          background: "var(--bg-secondary)",
          color: "var(--text-muted)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        🔀 Embaralhar novamente
      </motion.button>

      {/* Tela de conclusão */}
      <AnimatePresence>
        {solved && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{
              background: "rgba(11,15,25,0.92)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              className="text-center rounded-2xl p-10 max-w-sm w-full"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--accent-pink)",
              }}
            >
              <p className="text-5xl mb-4">🧩✨</p>
              <h2
                className="text-2xl font-black mb-3"
                style={{ color: "var(--accent-pink)" }}
              >
                Montou tudo!
              </h2>
              <p
                className="mb-2 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                {moves} movimentos para completar
              </p>
              <p className="mb-8" style={{ color: "var(--text-muted)" }}>
                Último desafio liberado. É hora da surpresa final!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/")}
                className="px-8 py-4 rounded-full font-bold text-lg"
                style={{
                  background: "var(--gradient-challenges)",
                  color: "#fff",
                }}
              >
                Voltar para o início →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
