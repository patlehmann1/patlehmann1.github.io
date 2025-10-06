"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import * as THREE from "three";

interface ParticleSystemProps {
  count: number;
  mousePosition: { x: number; y: number };
  primaryColor: string;
  reducedMotion: boolean;
}

function ParticleSystem({ count, mousePosition, primaryColor, reducedMotion }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const velocitiesRef = useRef<Float32Array>(new Float32Array(0));
  const mousePosRef = useRef({ x: 0, y: 0 });

  const { positions, initialVelocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 15;
      pos[i3 + 2] = (Math.random() - 0.5) * 5;

      vel[i3] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return { positions: pos, initialVelocities: vel };
  }, [count]);

  useEffect(() => {
    velocitiesRef.current = new Float32Array(initialVelocities);
  }, [initialVelocities]);

  useEffect(() => {
    mousePosRef.current = mousePosition;
  }, [mousePosition]);

  const particleColor = useMemo(() => new THREE.Color(primaryColor), [primaryColor]);

  useFrame(() => {
    if (!pointsRef.current || !velocitiesRef.current || reducedMotion) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      const dx = mousePosRef.current.x * 10 - positions[i3];
      const dy = mousePosRef.current.y * 8 - positions[i3 + 1];
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 3) {
        velocities[i3] += dx * 0.0001;
        velocities[i3 + 1] += dy * 0.0001;
      }

      if (positions[i3] > 10) positions[i3] = -10;
      if (positions[i3] < -10) positions[i3] = 10;
      if (positions[i3 + 1] > 7.5) positions[i3 + 1] = -7.5;
      if (positions[i3 + 1] < -7.5) positions[i3 + 1] = 7.5;

      velocities[i3] *= 0.99;
      velocities[i3 + 1] *= 0.99;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    if (linesRef.current) {
      const linePositions: number[] = [];
      const maxDistance = 2.5;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        for (let j = i + 1; j < count; j++) {
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            linePositions.push(positions[i3], positions[i3 + 1], positions[i3 + 2]);
            linePositions.push(positions[j3], positions[j3 + 1], positions[j3 + 2]);
          }
        }
      }

      linesRef.current.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(linePositions), 3)
      );
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color={particleColor}
          sizeAttenuation
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1}
            array={new Float32Array([0, 0, 0])}
            itemSize={3}
            args={[new Float32Array([0, 0, 0]), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={particleColor}
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}

export function ParticleBackground() {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const mousePosition = useRef({ x: 0, y: 0 });
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.innerWidth < 768;

    const handleMouseMove = (event: MouseEvent) => {
      if (isMobileRef.current || prefersReducedMotion) return;

      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  const primaryColor = theme === "dark" ? "#d2804d" : "#c86428";
  const particleCount = isMobileRef.current ? 30 : 60;

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full -z-10 opacity-40">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: false }}
      >
        <ParticleSystem
          count={particleCount}
          mousePosition={mousePosition.current}
          primaryColor={primaryColor}
          reducedMotion={prefersReducedMotion}
        />
      </Canvas>
    </div>
  );
}
