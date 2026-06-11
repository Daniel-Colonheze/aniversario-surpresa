"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Cylinder, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

function CigarroModel() {
  const groupRef = useRef<THREE.Group>(null);
  const emberRef = useRef<THREE.Mesh>(null);
  const smokeRef = useRef<THREE.Points>(null);

  const { mouse } = useThree();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const responsiveScale = isMobile ? 0.95 : 1.45;

  const mainRadius = 0.14;
  const filterRadius = 0.15;

  const particleCount = 180;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.05;
      positions[i * 3 + 1] = 0.92 + Math.random() * 0.2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
    }
    return positions;
  }, []);

  const speckleCount = 80;
  const filterHeight = 0.4;
  const filterCenterY = -0.75;

  const speckles = useMemo(() => {
    const positions = new Float32Array(speckleCount * 3);
    for (let i = 0; i < speckleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = filterRadius + 0.003;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = filterCenterY + (Math.random() - 0.5) * filterHeight;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.z = Math.sin(time * 0.4) * 0.02;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.1,
        0.03
      );
      groupRef.current.rotation.y += mouse.x * 0.0004;
    }

    if (smokeRef.current) {
      const positions = smokeRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += 0.006;
        positions[i3] += Math.sin(time + i) * 0.0015;
        positions[i3 + 2] += Math.cos(time + i) * 0.0015;
        if (positions[i3 + 1] > 1.4) {
          positions[i3] = (Math.random() - 0.5) * 0.05;
          positions[i3 + 1] = 0.92;
          positions[i3 + 2] = (Math.random() - 0.5) * 0.05;
        }
      }
      smokeRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (emberRef.current) {
      const material = emberRef.current.material as THREE.MeshStandardMaterial;
      const flicker = 0.85 + Math.sin(time * 18) * 0.35;
      material.emissiveIntensity = flicker;
      material.emissive = new THREE.Color("#ff2a00");
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]} scale={responsiveScale}>
      {/* corpo */}
      <Cylinder args={[mainRadius, mainRadius, 1.6, 48]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#F0DFB0" roughness={0.3} metalness={0.02} />
      </Cylinder>

      <Text
        position={[mainRadius - 0.2, 0, 0.15]}
        fontSize={0.1}
        color="#000"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, Math.PI / 2]}
      >
        BEGOSSO
      </Text>

      {/* filtro */}
      <Cylinder args={[filterRadius, filterRadius, filterHeight, 48]} position={[0, filterCenterY, 0]}>
        <meshStandardMaterial color="#E8A859" roughness={0.5} metalness={0.05} />
      </Cylinder>

      <Cylinder args={[filterRadius, filterRadius, 0.04, 48]} position={[0, -0.96, 0]}>
        <meshStandardMaterial color="#E8A859" roughness={0.5} metalness={0.05} />
      </Cylinder>

      {/* detalhe filtro */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[speckles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#fff" size={0.035} transparent opacity={0.9} />
      </points>

      {/* cinza queimado */}
      <Cylinder args={[mainRadius, mainRadius, 0.06, 48]} position={[0, 0.83, 0]}>
        <meshStandardMaterial color="#6A6A6A" roughness={0.9} />
      </Cylinder>

      {/* brasa */}
      <Cylinder ref={emberRef} args={[mainRadius, mainRadius, 0.08, 48]} position={[0, 0.9, 0]}>
        <meshStandardMaterial color="#ff3b00" emissive="#ff1a00" emissiveIntensity={1.2} roughness={0.6} />
      </Cylinder>

      {/* fumaça */}
      <points ref={smokeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#bbbbbb" size={0.02} transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </points>

      {/* luz quente */}
      <pointLight position={[0, 0.95, 0]} intensity={1} color="#ff6600" distance={2.5} decay={1.6} />
    </group>
  );
}

export default function Cigarro3D() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas camera={{ position: [1.7, 0.35, 2.6], fov: 42 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 2]} intensity={1} />
        <CigarroModel />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          minDistance={1.8}
          maxDistance={4.8}
          zoomSpeed={0.5}
          rotateSpeed={0.35}
          enableDamping={true}
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}