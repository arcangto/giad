import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Componente de impresora 3D animada
export default function PrinterModel({ position = [0, 0, 0], scale = 1, isAnimating = true }) {
  const groupRef = useRef();
  const extruderRef = useRef();
  const bedRef = useRef();
  const [printProgress, setPrintProgress] = useState(0);

  useFrame((state, delta) => {
    if (!isAnimating) return;

    // Rotación suave del grupo principal
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }

    // Animación del extrusor (movimiento de impresión)
    if (extruderRef.current) {
      extruderRef.current.position.x = Math.sin(state.clock.elapsedTime * 2) * 0.5;
      extruderRef.current.position.z = Math.cos(state.clock.elapsedTime * 1.5) * 0.3;
    }

    // Simulación de progreso de impresión
    setPrintProgress((prev) => (prev + delta * 0.1) % 1);
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Base de la impresora */}
      <Box args={[2, 0.1, 2]} position={[0, -1, 0]}>
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Estructura vertical */}
      <Box args={[0.1, 2, 0.1]} position={[-0.9, 0, -0.9]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      <Box args={[0.1, 2, 0.1]} position={[0.9, 0, -0.9]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>

      {/* Cama de impresión */}
      <Box ref={bedRef} args={[1.5, 0.05, 1.5]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#4a5568" metalness={0.6} roughness={0.3} />
      </Box>

      {/* Extrusor */}
      <group ref={extruderRef} position={[0, 0.5, 0]}>
        <Box args={[0.3, 0.2, 0.3]}>
          <meshStandardMaterial color="#e53e3e" />
        </Box>
        {/* Boquilla */}
        <Cylinder args={[0.02, 0.05, 0.1]} position={[0, -0.15, 0]}>
          <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
        </Cylinder>
      </group>

      {/* Objeto siendo impreso (crece con el progreso) */}
      <Box args={[0.4, printProgress * 0.6, 0.4]} position={[0, -0.5 + (printProgress * 0.3), 0]}>
        <meshStandardMaterial 
          color="#4299e1" 
          transparent 
          opacity={0.8}
          emissive="#1a365d"
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Partículas de filamento */}
      {isAnimating && (
        <Sphere args={[0.01]} position={[extruderRef.current?.position.x || 0, -0.1, extruderRef.current?.position.z || 0]}>
          <meshBasicMaterial color="#ff6b6b" />
        </Sphere>
      )}
    </group>
  );
}