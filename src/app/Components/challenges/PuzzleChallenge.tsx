// src/components/challenges/PuzzleChallenge.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Shuffle, CheckCircle, ArrowRight, Move } from "lucide-react";
import { useProgress } from "../../hooks/useProgress";

const GRID = 4;
const TOTAL = GRID * GRID;
const PUZZLE_IMAGE = "/images/momento-10.jpg";

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
  const [pieces, setPieces] = useState<number[]>(() => createShuffled());
  const [selected, setSelected] = useState<number | null>(null);
  const [solved, setSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [pieceSize, setPieceSize] = useState(84);

  useEffect(() => {
    const handleResize = () => {
      setPieceSize(window.innerWidth < 768 ? 72 : 84);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    [newPieces[selected], newPieces[index]] = [newPieces[index], newPieces[selected]];
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

  const gridSize = pieceSize * GRID;

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "2rem" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <Move size={20} style={{ color: "var(--accent-pink)" }} />
          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-pink)",
            }}
          >
            Desafio 03
          </p>
        </div>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
          }}
        >
          Quebra-Cabeça
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--text-muted)",
          }}
        >
          Clique em duas peças para trocá-las. Monte a imagem corretamente.
        </p>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.875rem",
            fontWeight: "bold",
            color: "var(--accent-pink)",
          }}
        >
          Movimentos: {moves}
        </p>
      </motion.div>

      <div
        style={{
          width: gridSize,
          height: gridSize,
          display: "grid",
          gridTemplateColumns: `repeat(${GRID}, ${pieceSize}px)`,
          gap: "2px",
          background: "rgba(30,34,53,0.6)",
          padding: "4px",
          borderRadius: "1rem",
          border: "1px solid rgba(255,20,147,0.4)",
          boxShadow: "0 15px 35px rgba(0,0,0,0.3), 0 0 15px rgba(255,20,147,0.2)",
          marginBottom: "1.5rem",
        }}
      >
        {pieces.map((pieceIndex, position) => {
          const col = pieceIndex % GRID;
          const row = Math.floor(pieceIndex / GRID);
          const isSelected = selected === position;
          const isCorrect = pieceIndex === position && moves > 0;

          return (
            <motion.button
              key={position}
              onClick={() => handlePieceClick(position)}
              whileHover={{ scale: 1.02 }}
              animate={
                isSelected
                  ? { scale: 1.08, boxShadow: "0 0 0 2px var(--accent-cyan)" }
                  : { scale: 1, boxShadow: "none" }
              }
              transition={{ duration: 0.15 }}
              style={{
                width: pieceSize,
                height: pieceSize,
                backgroundImage: `url(${PUZZLE_IMAGE})`,
                backgroundSize: `${gridSize}px ${gridSize}px`,
                backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`,
                border: isCorrect
                  ? "2px solid var(--accent-yellow)"
                  : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "6px",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.2s ease",
              }}
            >
              {isCorrect && (
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: "999px",
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckCircle size={12} style={{ color: "var(--accent-yellow)" }} />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={reset}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 1.25rem",
          borderRadius: "999px",
          background: "var(--bg-secondary)",
          color: "var(--text-muted)",
          border: "1px solid rgba(255,255,255,0.1)",
          cursor: "pointer",
          fontSize: "0.875rem",
          marginBottom: "2rem",
        }}
      >
        <Shuffle size={16} />
        Embaralhar
      </motion.button>

      <AnimatePresence>
        {solved && (
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
              background: "rgba(11,15,25,0.96)",
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
                border: "1px solid var(--accent-pink)",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "14rem" }}>
                <Image
                  src="/images/momento-4.jpg"
                  alt="Parabéns"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 448px"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(to top, rgba(255,20,147,0.3), transparent)",
                  }}
                />
              </div>
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    marginBottom: "1.5rem",
                    color: "var(--accent-pink)",
                  }}
                >
                  Montou tudo!
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                    color: "var(--text-muted)",
                  }}
                >
                  {moves} movimentos para completar
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    marginBottom: "1.5rem",
                    color: "var(--text-muted)",
                  }}
                >
                  Boa neguinho. Agora só falta 1 desafio!!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/")}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "9999px",
                    fontWeight: "bold",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "var(--gradient-challenges)",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Voltar para o início
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}