// src/components/challenges/EnigmaChallenge.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useProgress } from "@/hooks/useProgress";

// Mapeamento símbolo → letra
// Troque a FRASE e o mapeamento quando definir a palavra/frase real
const CIPHER: Record<string, string> = {
  "⚡": "A",
  "★": "M",
  "◆": "I",
  "✦": "G",
  "⊕": "O",
  "∞": " ",
  "⚙": "P",
  "♦": "R",
  Ω: "E",
  "∆": "S",
  "✿": "N",
  "⬡": "T",
  "☯": "C",
  "⚜": "L",
  "⊗": "U",
  "⬢": "B",
};

// Frase cifrada — troque quando definir a frase real
// Cada caractere aqui deve ter correspondência no CIPHER acima
const ENCODED = [
  "⚡",
  "★",
  "◆",
  "✦",
  "⊕",
  "∞",
  "⚙",
  "♦",
  "Ω",
  "∆",
  "⬡",
  "Ω",
  "∆",
];
const ANSWER = "AMIGO PRESTES"; // resposta esperada (maiúscula, sem acento)

export default function EnigmaChallenge() {
  const router = useRouter();
  const { complete } = useProgress();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "wrong" | "right">("idle");
  const [showCipher, setShowCipher] = useState(false);

  function handleSubmit() {
    const normalized = input.toUpperCase().trim();
    if (normalized === ANSWER) {
      complete(2);
      setStatus("right");
    } else {
      setStatus("wrong");
      setTimeout(() => setStatus("idle"), 1500);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "var(--accent-purple)" }}
        >
          Desafio 02
        </p>
        <h1
          className="text-3xl md:text-4xl font-black mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          Enigma dos Símbolos 🔐
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Cada símbolo representa uma letra. Decifre a mensagem.
        </p>
      </motion.div>

      {/* Sequência cifrada */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap justify-center gap-3 mb-8 max-w-lg"
      >
        {ENCODED.map((symbol, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06 }}
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-bold"
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid rgba(138,43,226,0.4)",
              color: "var(--accent-purple)",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </motion.div>

      {/* Tabela de cifra (toggle) */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        onClick={() => setShowCipher((v) => !v)}
        className="mb-6 text-sm px-4 py-2 rounded-full"
        style={{
          background: "var(--bg-secondary)",
          color: "var(--accent-cyan)",
          border: "1px solid rgba(0,240,255,0.2)",
        }}
      >
        {showCipher ? "Esconder tabela" : "Ver tabela de símbolos"} 🔍
      </motion.button>

      <AnimatePresence>
        {showCipher && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div
              className="rounded-2xl p-4 grid grid-cols-4 gap-2 max-w-sm"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid rgba(138,43,226,0.2)",
              }}
            >
              {Object.entries(CIPHER).map(([sym, letter]) => (
                <div key={sym} className="flex items-center gap-2 text-sm">
                  <span
                    style={{ color: "var(--accent-purple)" }}
                    className="text-lg"
                  >
                    {sym}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>=</span>
                  <span
                    style={{ color: "var(--text-primary)" }}
                    className="font-bold"
                  >
                    {letter}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <AnimatePresence mode="wait">
        {status === "right" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-5xl mb-4">🎉</p>
            <h2
              className="text-2xl font-black mb-4"
              style={{ color: "var(--accent-cyan)" }}
            >
              Decodificado!
            </h2>
            <p className="mb-8" style={{ color: "var(--text-muted)" }}>
              Você decifrou a mensagem. Próximo desafio liberado!
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
        ) : (
          <motion.div
            key="input"
            className="w-full max-w-sm flex flex-col gap-4"
          >
            <motion.input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Digite sua resposta..."
              animate={status === "wrong" ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.3 }}
              className="w-full px-6 py-4 rounded-xl text-lg outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: `1px solid ${status === "wrong" ? "var(--accent-pink)" : "rgba(138,43,226,0.4)"}`,
                color: "var(--text-primary)",
              }}
            />
            {status === "wrong" && (
              <p
                className="text-sm text-center"
                style={{ color: "var(--accent-pink)" }}
              >
                Resposta incorreta. Tente novamente! 😅
              </p>
            )}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              className="px-6 py-4 rounded-xl font-bold text-lg"
              style={{
                background: "var(--gradient-challenges)",
                color: "#fff",
              }}
            >
              Confirmar resposta
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
