import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Dodecahedron, Octahedron, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

// Objetos 3D flotantes que representan productos impresos
export default function FloatingObjects({ count = 8 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const objects = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const radius = 4 + Math.sin(i) * 1;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(i * 2) * 2;

    const shapes = [Dodecahedron, Octahedron, Icosahedron];
    const Shape = shapes[i % shapes.length];
    
    const colors = ["#4299e1", "#48bb78", "#ed8936", "#9f7aea", "#f56565"];
    const color = colors[i % colors.length];

    return (
      <FloatingObject
        key={i}
        Shape={Shape}
        position={[x, y, z]}
        color={color}
        rotationSpeed={0.5 + Math.random() * 0.5}
        floatSpeed={1 + Math.random() * 0.5}
        delay={i * 0.2}
      />
    );
  });

  return <group ref={groupRef}>{objects}</group>;
}

function FloatingObject({ Shape, position, color, rotationSpeed, floatSpeed, delay }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * floatSpeed + delay) * 0.5;
    }
  });

  return (
    <Shape ref={meshRef} args={[0.3]} position={position}>
      <meshStandardMaterial
        color={color}
        metalness={0.3}
        roughness={0.4}
        emissive={color}
        emissiveIntensity={0.1}
      />
    </Shape>
  );
}