import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Sistema de partículas que simula filamento de impresión 3D
export default function FilamentParticles({ count = 2000 }) {
  const pointsRef = useRef();
  const velocitiesRef = useRef();

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#ff6b6b"), // Rojo
      new THREE.Color("#4ecdc4"), // Turquesa
      new THREE.Color("#45b7d1"), // Azul
      new THREE.Color("#96ceb4"), // Verde
      new THREE.Color("#feca57"), // Amarillo
      new THREE.Color("#ff9ff3"), // Rosa
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Posiciones iniciales en una esfera
      const radius = Math.random() * 8 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Velocidades aleatorias
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Colores aleatorios del filamento
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    return { positions, colors, velocities };
  }, [count]);

  velocitiesRef.current = velocities;

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Movimiento ondulatorio
      positions[i3] += velocitiesRef.current[i3] + Math.sin(time + i * 0.01) * 0.001;
      positions[i3 + 1] += velocitiesRef.current[i3 + 1] + Math.cos(time + i * 0.01) * 0.001;
      positions[i3 + 2] += velocitiesRef.current[i3 + 2] + Math.sin(time * 0.5 + i * 0.02) * 0.001;

      // Reiniciar partículas que se alejan demasiado
      const distance = Math.sqrt(
        positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2
      );

      if (distance > 12) {
        const radius = Math.random() * 2 + 1;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        transparent={true}
        opacity={0.8}
      />
    </points>
  );
}