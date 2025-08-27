import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Torus, Box } from "@react-three/drei";

// Spinner 3D animado
function SpinnerModel() {
  const groupRef = useRef();
  const torusRef = useRef();
  const cubesRef = useRef([]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 2;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 3;
      torusRef.current.rotation.z += delta * 1.5;
    }

    // Animación de los cubos
    cubesRef.current.forEach((cube, i) => {
      if (cube) {
        cube.rotation.x += delta * (2 + i * 0.5);
        cube.rotation.y += delta * (1.5 + i * 0.3);
        cube.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.2;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Torus principal */}
      <Torus ref={torusRef} args={[1, 0.3, 16, 100]}>
        <meshStandardMaterial
          color="#4299e1"
          metalness={0.8}
          roughness={0.2}
          emissive="#1a365d"
          emissiveIntensity={0.3}
        />
      </Torus>

      {/* Cubos orbitales */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        return (
          <Box
            key={i}
            ref={(el) => (cubesRef.current[i] = el)}
            args={[0.2, 0.2, 0.2]}
            position={[x, 0, z]}
          >
            <meshStandardMaterial
              color={`hsl(${i * 60}, 70%, 60%)`}
              metalness={0.5}
              roughness={0.3}
            />
          </Box>
        );
      })}
    </group>
  );
}

export default function LoadingSpinner3D({ size = 100, message = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div style={{ width: size, height: size }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <SpinnerModel />
        </Canvas>
      </div>
      {message && (
        <p className="text-gray-600 font-medium animate-pulse">{message}</p>
      )}
    </div>
  );
}