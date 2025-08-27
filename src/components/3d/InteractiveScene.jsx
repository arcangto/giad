import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Float,
  Text3D,
  Center
} from "@react-three/drei";
import PrinterModel from "./PrinterModel";
import FloatingObjects from "./FloatingObjects";
import FilamentParticles from "./FilamentParticles";

// Componente de texto 3D animado
function AnimatedText3D({ text, position = [0, 0, 0] }) {
  const textRef = useRef();

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <Center position={position}>
        <Text3D
          ref={textRef}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.1}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial
            color="#4299e1"
            metalness={0.5}
            roughness={0.2}
            emissive="#1a365d"
            emissiveIntensity={0.1}
          />
        </Text3D>
      </Center>
    </Float>
  );
}

// Loader 3D personalizado
function Loader3D() {
  const loaderRef = useRef();

  useFrame((state, delta) => {
    if (loaderRef.current) {
      loaderRef.current.rotation.y += delta * 2;
      loaderRef.current.rotation.x += delta * 1;
    }
  });

  return (
    <group ref={loaderRef}>
      <PrinterModel scale={0.5} isAnimating={true} />
    </group>
  );
}

// Escena principal interactiva
export default function InteractiveScene({ showText = false, textContent = "GIAD 3D" }) {
  return (
    <Canvas shadows camera={{ position: [0, 5, 10], fov: 60 }}>
      <Suspense fallback={<Loader3D />}>
        {/* Iluminación avanzada */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4299e1" />
        <spotLight
          position={[0, 15, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
          color="#ffd700"
        />

        {/* Entorno HDR */}
        <Environment preset="studio" />

        {/* Controles de cámara */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
          minDistance={5}
          maxDistance={20}
        />

        {/* Modelos 3D principales */}
        <PrinterModel position={[0, -1, 0]} scale={1.2} />
        <FloatingObjects count={6} />
        
        {/* Texto 3D condicional */}
        {showText && <AnimatedText3D text={textContent} position={[0, 3, 0]} />}

        {/* Sistema de partículas */}
        <FilamentParticles count={1500} />

        {/* Sombras de contacto */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={20}
          blur={2}
          far={4}
        />
      </Suspense>
    </Canvas>
  );
}