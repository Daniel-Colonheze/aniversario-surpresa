"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MAX_CLICKS = 350;

interface Confetti {
  id: number;
  x: number;
  color: string;
  duration: number;
  delay: number;
  size: number;
  rotation: number;
  round: boolean;
}

const CONFETTI_COLORS = [
  "var(--accent-cyan)",
  "var(--accent-purple)",
  "var(--accent-yellow)",
  "var(--accent-pink)",
  "var(--accent-orange)",
  "#fff",
];

function generateConfetti(count = 80): Confetti[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    duration: 2 + Math.random() * 2,
    delay: Math.random() * 0.8,
    size: 6 + Math.random() * 8,
    rotation: Math.random() * 720 - 360,
    round: Math.random() > 0.5,
  }));
}

function Balloon3D({ progress, burst }: { progress: number; burst: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/3D/balloon.glb");

  const scale = (0.8 + progress * 1.2) * 0.008;
  const hue = 20 + progress * 320;

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(`hsl(${hue}, 80%, 55%)`),
          emissive: new THREE.Color(`hsl(${hue}, 80%, 55%)`),
          emissiveIntensity: 0.3,
          roughness: 0.2,
          metalness: 0.1,
        });
      }
    });
  }, [scene, hue]);

  useFrame(() => {
    if (groupRef.current && !burst) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  if (burst) return null;

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      <primitive object={scene} />
    </group>
  );
}

function Cake3D() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/3D/cake.glb");

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={groupRef} scale={[0.010, 0.010, 0.010]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/3D/balloon.glb");
useGLTF.preload("/3D/cake.glb");

export default function FinalChallenge() {
  const [clicks, setClicks] = useState(0);
  const [burst, setBurst] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const [showCake, setShowCake] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);

  const progress = clicks / MAX_CLICKS;

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handleClick() {
    if (burst) return;
    setClicks((c) => {
      const next = c + 1;
      if (next >= MAX_CLICKS) {
        setBurst(true);
        setConfetti(generateConfetti(120));
        setTimeout(() => setShowCake(true), 800);
      }
      return next;
    });

    try {
      if (!audioRef.current) audioRef.current = new AudioContext();
      const ctx = audioRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.setValueAtTime(300 + clicks * 3, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch {}
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
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-primary)",
      }}
    >
      <AnimatePresence>
        {burst &&
          confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: -20, x: `${c.x}vw`, opacity: 1, rotate: 0 }}
              animate={{ y: "110vh", opacity: 0, rotate: c.rotation }}
              transition={{ duration: c.duration, delay: c.delay, ease: "easeIn" }}
              style={{
                position: "fixed",
                top: 0,
                pointerEvents: "none",
                zIndex: 40,
                width: c.size,
                height: c.size,
                background: c.color,
                borderRadius: c.round ? "50%" : "2px",
              }}
            />
          ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: "center", marginBottom: "2rem", zIndex: 10 }}
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
          <p
            style={{
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "var(--accent-yellow)",
            }}
          >
            Surpresa Final
          </p>
        </div>
        {!showCake && (
          <>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                fontWeight: 900,
                marginBottom: "0.5rem",
                color: "var(--text-primary)",
              }}
            >
              Encha o balão!
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
              {MAX_CLICKS - clicks > 0
                ? `Faltam ${MAX_CLICKS - clicks} cliques`
                : "Estourou!"}
            </p>
          </>
        )}
      </motion.div>

      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "400px",
          marginBottom: "1rem",
          cursor: !showCake && !burst ? "pointer" : "default",
          position: "relative",
        }}
        onClick={!showCake && !burst ? handleClick : undefined}
      >
        {isClient && (
          <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 2]} intensity={1.2} />
            <pointLight position={[1, 2, 2]} intensity={0.5} />
            {!showCake ? (
              <Balloon3D progress={progress} burst={burst} />
            ) : (
              <Cake3D />
            )}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
              <planeGeometry args={[10, 10]} />
              <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={1024}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#1a1a2e"
                metalness={0.5}
              />
            </mesh>
          </Canvas>
        )}
        {!showCake && !burst && (
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: "10%",
              width: "80%",
              height: "6px",
              borderRadius: "3px",
              background: "var(--bg-secondary)",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: `hsl(${20 + progress * 320}, 100%, 60%)`,
              }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        )}
      </div>

      {!showCake && !burst && (
        <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", marginTop: "2rem" }}>
          {clicks} / {MAX_CLICKS} cliques
        </p>
      )}

      {showCake && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "1rem" }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 6vw, 2.5rem)",
              fontWeight: 900,
              background: "var(--gradient-hero)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Feliz Aniversário, Pedro!
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
            Você completou todos os desafios.
          </p>
        </motion.div>
      )}
    </div>
  );
}