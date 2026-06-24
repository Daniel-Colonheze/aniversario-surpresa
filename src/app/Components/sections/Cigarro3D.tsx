"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function CigarroModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();
  const { scene } = useGLTF("/3D/ocarina_of_time.glb");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsiveScale = isMobile ? 0.05 : 0.08;

  const particleCount = 60;
  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.45 + Math.random() * 0.3;
      positions[i * 3]     = Math.cos(angle) * r;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      positions[i * 3 + 2] = Math.sin(angle) * r * 0.5;
    }
    return positions;
  }, []);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: "#1a6bbf",
          roughness: 0.22,
          metalness: 0.58,
          emissive: new THREE.Color("#0a3a7a"),
          emissiveIntensity: 0.3,
        });
      }
    });
  }, [scene]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
      groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.02;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.1,
        0.03
      );
      groupRef.current.rotation.y += mouse.x * 0.0004;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={responsiveScale}>
      <primitive object={scene} />

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#88ccff"
          size={0.025}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <pointLight position={[0, 0, 0.4]} intensity={1.2} color="#4488ff" distance={2.5} decay={1.5} />
    </group>
  );
}

useGLTF.preload("/3D/ocarina.glb");

export default function Cigarro3D() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 42 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1} />
        <CigarroModel />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          zoomSpeed={0.5}
          rotateSpeed={0.35}
          enableDamping={true}
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}