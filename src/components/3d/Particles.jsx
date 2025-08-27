import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Este componente crea un sistema de partículas 3D animadas
export default function Particles({ count = 1000, color = "#ffffff", size = 0.02 }) {
  const pointsRef = useRef();

  // Generamos las posiciones iniciales de las partículas solo una vez con useMemo para optimizar
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Posición aleatoria en un cubo de 10x10x10
      const x = THREE.MathUtils.randFloatSpread(10);
      const y = THREE.MathUtils.randFloatSpread(10);
      const z = THREE.MathUtils.randFloatSpread(10);
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  // El hook useFrame se ejecuta en cada fotograma de la animación
  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Hacemos que las partículas floten lentamente hacia arriba
      pointsRef.current.position.y += delta * 0.1;

      // Si se han movido demasiado hacia arriba, las reiniciamos abajo para un bucle infinito
      if (pointsRef.current.position.y > 5) {
        pointsRef.current.position.y = -5;
      }
    }
  });

  return (
    // Usamos el objeto <points> de Three.js, que es muy eficiente para renderizar miles de partículas
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* El atributo 'position' contiene las coordenadas de cada partícula */}
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation={true} // Hace que las partículas lejanas se vean más pequeñas
        depthWrite={false} // Evita problemas de renderizado con objetos transparentes
        blending={THREE.AdditiveBlending} // Efecto de "brillo" cuando las partículas se superponen
        transparent={true}
      />
    </points>
  );
}
