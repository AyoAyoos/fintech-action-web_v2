import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type * as THREE from "three";

type ShapeKind = "icosahedron" | "torus" | "octahedron";

interface ShapeProps {
  position: [number, number, number];
  geometry: ShapeKind;
  color: string;
  scale?: number;
  floatSpeed?: number;
  floatRange?: number;
}

function GoldShape({ position, geometry, color, scale = 1, floatSpeed = 1, floatRange = 0.3 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    mesh.position.y = position[1] + Math.sin(t * floatSpeed) * floatRange;
    mesh.position.x = position[0] + Math.cos(t * floatSpeed * 0.6) * (floatRange * 0.5);
    mesh.rotation.x = t * 0.15;
    mesh.rotation.y = t * 0.12;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === "icosahedron" && <icosahedronGeometry args={[0.6, 0]} />}
      {geometry === "torus" && <torusGeometry args={[0.5, 0.16, 16, 32]} />}
      {geometry === "octahedron" && <octahedronGeometry args={[0.55, 0]} />}
      <meshStandardMaterial color={color} metalness={0.85} roughness={0.25} emissive={color} emissiveIntensity={0.18} />
    </mesh>
  );
}

function ParallaxRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const targetY = state.pointer.x * 0.35;
    const targetX = -state.pointer.y * 0.25;
    g.rotation.y += (targetY - g.rotation.y) * 0.04;
    g.rotation.x += (targetX - g.rotation.x) * 0.04;
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 6], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 5, 5]} intensity={1.3} color="#FFCA3A" />
      <pointLight position={[-5, -3, 3]} intensity={0.7} color="#10B981" />
      <ParallaxRig>
        <GoldShape position={[-3.4, 1.3, -1]} geometry="icosahedron" color="#FFB703" floatSpeed={0.8} floatRange={0.35} />
        <GoldShape position={[3.6, -1.1, -1.6]} geometry="torus" color="#FFCA3A" floatSpeed={1.1} floatRange={0.25} scale={1.1} />
        <GoldShape position={[2.7, 1.9, -2.2]} geometry="octahedron" color="#10B981" floatSpeed={0.7} floatRange={0.4} scale={0.8} />
        <GoldShape position={[-3.1, -1.7, -1.4]} geometry="torus" color="#FFB703" floatSpeed={0.95} floatRange={0.3} scale={0.7} />
      </ParallaxRig>
    </Canvas>
  );
}