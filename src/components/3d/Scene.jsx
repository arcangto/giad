import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

// --- Componente del objeto central que reacciona al mouse ---
function InteractiveShape() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const { pointer } = state;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, pointer.x * 1.5, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, pointer.y * 1.5, 0.05);
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#1e3a8a" // Un azul oscuro para que contraste con el fondo blanco
        metalness={0.6}
        roughness={0.3}
        wireframe={true}
      />
    </mesh>
  );
}

// --- Componente principal de la Escena ---
export default function Scene() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#4f46e5" />
      <InteractiveShape />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={1}
        fade
        speed={1}
      />
    </Canvas>
  );
}
