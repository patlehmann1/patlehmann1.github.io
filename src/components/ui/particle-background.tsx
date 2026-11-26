"use client";

import { useRef, useMemo, useEffect, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import * as THREE from "three";

const FALLBACK_COLORS: Record<string, string> = {
  light: "#c86428",
  dark: "#d2804d",
  ocean: "#119cd4",
  forest: "#24a85a",
  synthwave: "#ff33cc",
  cobalt2: "#ffc600",
};

const MAX_LINE_DISTANCE = 2.5;
const TARGET_OPACITY = 0.6;

interface MousePosition {
  x: number;
  y: number;
}

interface ParticleSystemProps {
  count: number;
  mouseRef: MutableRefObject<MousePosition>;
  primaryColor: string;
}

/**
 * Reads the active theme's --primary token so particles always match the theme,
 * falling back to a fixed palette when CSS variables aren't available.
 */
function readPrimaryColor(theme: string | undefined): string {
  const fallback = FALLBACK_COLORS[theme ?? ""] ?? FALLBACK_COLORS.light;
  if (typeof window === "undefined") return fallback;

  const hsl = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim();
  const parts = hsl.split(/\s+/);
  if (parts.length !== 3) return fallback;

  return `hsl(${parts[0]}, ${parts[1]}, ${parts[2]})`;
}

function ParticleSystem({ count, mouseRef, primaryColor }: ParticleSystemProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const pointsMaterialRef = useRef<THREE.PointsMaterial>(null);

  const { positions, velocities, linePositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);

    const gridSize = Math.ceil(Math.cbrt(count));
    const spacingX = 18 / gridSize;
    const spacingY = 13 / gridSize;
    const spacingZ = 4 / gridSize;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      const gridX = (i % gridSize) * spacingX - 9;
      const gridY = (Math.floor(i / gridSize) % gridSize) * spacingY - 6.5;
      const gridZ = (Math.floor(i / (gridSize * gridSize))) * spacingZ - 2;

      pos[i3] = gridX + (Math.random() - 0.5) * spacingX * 0.6;
      pos[i3 + 1] = gridY + (Math.random() - 0.5) * spacingY * 0.6;
      pos[i3 + 2] = gridZ + (Math.random() - 0.5) * spacingZ * 0.6;

      vel[i3] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    const maxSegments = (count * (count - 1)) / 2;
    return { positions: pos, velocities: vel, linePositions: new Float32Array(maxSegments * 6) };
  }, [count]);

  const particleColor = useMemo(() => new THREE.Color(primaryColor), [primaryColor]);

  useFrame(() => {
    if (!pointsRef.current) return;

    const material = pointsMaterialRef.current;
    if (material && material.opacity < TARGET_OPACITY) {
      material.opacity = Math.min(TARGET_OPACITY, material.opacity + 0.02);
    }

    const mouse = mouseRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      const dx = mouse.x * 10 - positions[i3];
      const dy = mouse.y * 8 - positions[i3 + 1];
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

    const lines = linesRef.current;
    if (!lines) return;

    let offset = 0;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      for (let j = i + 1; j < count; j++) {
        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];

        if (dx * dx + dy * dy + dz * dz < MAX_LINE_DISTANCE * MAX_LINE_DISTANCE) {
          linePositions[offset++] = positions[i3];
          linePositions[offset++] = positions[i3 + 1];
          linePositions[offset++] = positions[i3 + 2];
          linePositions[offset++] = positions[j3];
          linePositions[offset++] = positions[j3 + 1];
          linePositions[offset++] = positions[j3 + 2];
        }
      }
    }

    lines.geometry.setDrawRange(0, offset / 3);
    lines.geometry.attributes.position.needsUpdate = true;
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
          ref={pointsMaterialRef}
          size={0.08}
          color={particleColor}
          sizeAttenuation
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry drawRange={{ start: 0, count: 0 }}>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
            args={[linePositions, 3]}
            usage={THREE.DynamicDrawUsage}
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
  const { theme, resolvedTheme } = useTheme();
  const prefersReducedMotion = useReducedMotion();
  const mousePosition = useRef<MousePosition>({ x: 999, y: 999 });
  const [isMobile, setIsMobile] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [inView, setInView] = useState(true);
  const activeTheme = resolvedTheme ?? theme;
  const [primaryColor, setPrimaryColor] = useState(() => FALLBACK_COLORS[activeTheme ?? ""] ?? FALLBACK_COLORS.light);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mobile = window.innerWidth < 768;
    setIsMobile(mobile);

    const handleMouseMove = (event: MouseEvent) => {
      if (mobile || prefersReducedMotion) return;

      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setPrimaryColor(readPrimaryColor(activeTheme)));
    return () => cancelAnimationFrame(frame);
  }, [activeTheme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion, contextLost]);

  const particleCount = isMobile ? 30 : 60;

  if (prefersReducedMotion || contextLost) {
    return null;
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full -z-10 opacity-40" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        frameloop={inView ? "always" : "never"}
        gl={{ alpha: true, antialias: false }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.warn("WebGL context lost - disabling particle background");
            setContextLost(true);
          });
        }}
      >
        <ParticleSystem
          key={particleCount}
          count={particleCount}
          mouseRef={mousePosition}
          primaryColor={primaryColor}
        />
      </Canvas>
    </div>
  );
}
