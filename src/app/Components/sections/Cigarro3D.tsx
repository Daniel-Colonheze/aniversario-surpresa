"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Cylinder, OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

function CigarroModel() {
  const groupRef = useRef<THREE.Group>(null);
  const smokeRef = useRef<THREE.Points>(null);
  const emberRef = useRef<THREE.Mesh>(null);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  const responsiveScale = isMobile ? 0.9 : 1.45;

  const mainRadius = 0.14;
  const filterRadius = 0.15;

  const particleCount = 300;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.05;
      positions[i * 3 + 1] = 0.92 + Math.random() * 0.15;
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
      positions[i * 3 + 1] =
        filterCenterY + (Math.random() - 0.5) * filterHeight;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }

    return positions;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.03;
    }

    if (smokeRef.current) {
      const positions =
        smokeRef.current.geometry.attributes.position
          .array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        positions[i3 + 1] += 0.006;

        positions[i3] += Math.sin(time + i) * 0.002;
        positions[i3 + 2] += Math.cos(time + i * 0.9) * 0.002;

        if (positions[i3 + 1] > 1.4) {
          positions[i3] = (Math.random() - 0.5) * 0.05;
          positions[i3 + 1] = 0.92;
          positions[i3 + 2] = (Math.random() - 0.5) * 0.05;
        }
      }

      smokeRef.current.geometry.attributes.position.needsUpdate =
        true;
    }

    if (emberRef.current) {
      const intensity =
        0.9 + Math.sin(time * 25) * 0.4;

      (
        emberRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = intensity;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -0.3, 0]}
      scale={responsiveScale}
    >
      <Cylinder
        args={[mainRadius, mainRadius, 1.6, 48]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color="#F0DFB0"
          roughness={0.3}
          metalness={0.02}
        />
      </Cylinder>

      <Text
        position={[mainRadius - 0.2, 0, 0.15]}
        fontSize={0.1}
        color="#000000"
        anchorX="center"
        anchorY="middle"
        rotation={[0, 0, Math.PI / 2]}
      >
        BEGOSSO
      </Text>

      <Cylinder
        args={[filterRadius, filterRadius, filterHeight, 48]}
        position={[0, filterCenterY, 0]}
      >
        <meshStandardMaterial
          color="#E8A859"
          roughness={0.5}
          metalness={0.05}
        />
      </Cylinder>

      <Cylinder
        args={[filterRadius, filterRadius, 0.04, 48]}
        position={[0, -0.96, 0]}
      >
        <meshStandardMaterial
          color="#E8A859"
          roughness={0.5}
          metalness={0.05}
        />
      </Cylinder>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={speckleCount}
            array={speckles}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#FFFFFF"
          size={0.035}
          transparent
          opacity={0.9}
        />
      </points>

      <Cylinder
        args={[mainRadius, mainRadius, 0.06, 48]}
        position={[0, 0.83, 0]}
      >
        <meshStandardMaterial
          color="#6A6A6A"
          roughness={0.9}
        />
      </Cylinder>

      <Cylinder
        ref={emberRef}
        args={[mainRadius, mainRadius, 0.08, 48]}
        position={[0, 0.9, 0]}
      >
        <meshStandardMaterial
          color="#FF4500"
          emissive="#FF1A00"
          emissiveIntensity={1.2}
          roughness={0.6}
        />
      </Cylinder>

      <points ref={smokeRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#AAAAAA"
          size={0.02}
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <pointLight
        position={[0, 0.95, 0]}
        intensity={0.8}
        color="#FF6600"
        distance={2}
        decay={1.5}
      />
    </group>
  );
}

export default function Cigarro3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [1.4, 0.2, 2.2], fov: 40 }}>
        <ambientLight intensity={0.55} />

        <directionalLight position={[3, 4, 2]} intensity={1} />

        <CigarroModel />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}