// src/components/challenges/EnigmaChallenge.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Key,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  ArrowRight,
  Circle,
  Square,
  Triangle,
  Diamond,
  Star,
  Hexagon,
  Octagon,
  Zap,
  Heart,
  Music,
  Sun,
  Moon,
  Cloud,
  Anchor,
} from "lucide-react";
import { useProgress } from "../../hooks/useProgress";

// Mapeamento ícone (nome) → letra para a frase "PEIDANTE NERVOSO"
const ICON_TO_LETTER: Record<string, string> = {
  Circle: "P",
  Square: "E",
  Triangle: "I",
  Diamond: "D",
  Star: "A",
  Hexagon: "N",
  Octagon: "T",
  Zap: " ",
  Heart: "R",
  Music: "V",
  Sun: "O",
  Moon: "S",
};

// Ícones correspondentes à frase "PEIDANTE NERVOSO"
// P  E  I  D  A  N  T  E   espaço   N  E  R  V  O  S  O
const ENCODED_ICONS = [
  "Circle",
  "Square",
  "Triangle",
  "Diamond",
  "Star",
  "Hexagon",
  "Octagon",
  "Square", // PEIDANTE
  "Zap", // espaço
  "Hexagon",
  "Square",
  "Heart",
  "Music",
  "Sun",
  "Moon",
  "Sun", // NERVOSO (N E R V O S O)
];

const ANSWER = "PEIDANTE NERVOSO";

// Função para renderizar o ícone correto
const getIconComponent = (iconName: string) => {
  const props = { size: 32, strokeWidth: 1.5 };
  switch (iconName) {
    case "Circle":
      return <Circle {...props} />;
    case "Square":
      return <Square {...props} />;
    case "Triangle":
      return <Triangle {...props} />;
    case "Diamond":
      return <Diamond {...props} />;
    case "Star":
      return <Star {...props} />;
    case "Hexagon":
      return <Hexagon {...props} />;
    case "Octagon":
      return <Octagon {...props} />;
    case "Zap":
      return <Zap {...props} />;
    case "Heart":
      return <Heart {...props} />;
    case "Music":
      return <Music {...props} />;
    case "Sun":
      return <Sun {...props} />;
    case "Moon":
      return <Moon {...props} />;
    case "Cloud":
      return <Cloud {...props} />;
    case "Anchor":
      return <Anchor {...props} />;
    default:
      return <Circle {...props} />;
  }
};

export default function EnigmaChallenge() {
  const router = useRouter();
  const { complete } = useProgress();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "wrong" | "right">("idle");
  const [showCipher, setShowCipher] = useState(false);
  const [wrongModalOpen, setWrongModalOpen] = useState(false);

  function handleSubmit() {
    const normalized = input.toUpperCase().trim();
    if (normalized === ANSWER) {
      complete(2);
      setStatus("right");
    } else {
      setStatus("wrong");
      setWrongModalOpen(true);
    }
  }

  function closeWrongModal() {
    setWrongModalOpen(false);
    setStatus("idle");
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
          <Key size={20} style={{ color: "var(--accent-purple)" }} />
          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-purple)",
            }}
          >
            Desafio 02
          </p>
        </div>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            fontWeight: 900,
            color: "var(--text-primary)",
          }}
        >
          Enigma dos Símbolos
        </h1>
        <p
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: "var(--text-muted)",
          }}
        >
          Cada símbolo representa uma letra. Decifre a mensagem.
        </p>
      </motion.div>

      {/* Sequência cifrada com ícones Lucide */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.75rem",
          marginBottom: "2rem",
          maxWidth: "48rem",
        }}
      >
        {ENCODED_ICONS.map((iconName, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.04 }}
            style={{
              width: "3.5rem",
              height: "3.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(30,34,53,0.8)",
              borderRadius: "0.75rem",
              border: "1px solid rgba(138,43,226,0.5)",
              color: "var(--accent-purple)",
              boxShadow: "0 0 8px rgba(138,43,226,0.3)",
            }}
          >
            {getIconComponent(iconName)}
          </motion.div>
        ))}
      </motion.div>

      {/* Botão mostrar/esconder tabela */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        onClick={() => setShowCipher((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          marginBottom: "1.5rem",
          padding: "0.5rem 1rem",
          borderRadius: "2rem",
          background: "var(--bg-secondary)",
          color: "var(--accent-cyan)",
          border: "1px solid rgba(0,240,255,0.3)",
          cursor: "pointer",
          fontSize: "0.875rem",
        }}
      >
        {showCipher ? <EyeOff size={16} /> : <Eye size={16} />}
        {showCipher ? "Esconder tabela" : "Ver tabela de símbolos"}
      </motion.button>

      {/* Tabela de cifra */}
      <AnimatePresence>
        {showCipher && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: "hidden", marginBottom: "2rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(110px, 1fr))",
                gap: "0.5rem",
                padding: "1rem",
                borderRadius: "1rem",
                background: "var(--bg-secondary)",
                border: "1px solid rgba(138,43,226,0.2)",
                maxWidth: "32rem",
              }}
            >
              {Object.entries(ICON_TO_LETTER).map(([iconName, letter]) => (
                <div
                  key={iconName}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.875rem",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "var(--accent-purple)",
                    }}
                  >
                    {getIconComponent(iconName)}
                  </span>
                  <span style={{ color: "var(--text-muted)" }}>=</span>
                  <span
                    style={{ fontWeight: "bold", color: "var(--text-primary)" }}
                  >
                    {letter}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input e status */}
      <AnimatePresence mode="wait">
        {status === "right" ? (
          <motion.div
            key="success"
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
              <CheckCircle size={40} style={{ color: "var(--accent-cyan)" }} />
            </div>
            <h2
              style={{
                fontSize: "1.875rem",
                fontWeight: 900,
                marginBottom: "1rem",
                color: "var(--accent-cyan)",
              }}
            >
              Decodificado!
            </h2>
            <p
              style={{
                marginBottom: "2rem",
                maxWidth: "28rem",
                color: "var(--text-muted)",
              }}
            >
              Você decifrou a mensagem. Próximo desafio liberado!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                fontWeight: "bold",
                fontSize: "1rem",
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
          </motion.div>
        ) : (
          <motion.div
            key="input"
            style={{
              width: "100%",
              maxWidth: "24rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <motion.input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="Digite sua resposta..."
              animate={status === "wrong" ? { x: [-8, 8, -8, 8, 0] } : {}}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                borderRadius: "0.75rem",
                background: "var(--bg-secondary)",
                border: `1px solid ${status === "wrong" ? "var(--accent-pink)" : "rgba(138,43,226,0.5)"}`,
                color: "var(--text-primary)",
                outline: "none",
              }}
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                fontWeight: "bold",
                fontSize: "1rem",
                background: "var(--gradient-challenges)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Confirmar resposta
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de erro com momento-9.jpg */}
      <AnimatePresence>
        {wrongModalOpen && (
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
                border: "1px solid var(--accent-pink)",
              }}
            >
              <div
                style={{ position: "relative", width: "100%", height: "14rem" }}
              >
                <Image
                  src="/images/momento-9.jpg"
                  alt="Erro"
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
                    background:
                      "linear-gradient(to top, rgba(255,20,147,0.3), transparent)",
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
                  Resposta incorreta. Tente novamente!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeWrongModal}
                  style={{
                    padding: "0.75rem 1.5rem",
                    borderRadius: "9999px",
                    fontWeight: "bold",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    background: "var(--accent-pink)",
                    color: "#000",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Tentar de novo <XCircle size={16} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
