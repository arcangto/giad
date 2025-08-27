import { useState, useRef, useEffect } from "react";
import anime from "animejs";

export default function Card3D({ 
  children, 
  title, 
  className = "", 
  interactive = true,
  glowColor = "#4299e1" 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef();
  const glowRef = useRef();

  useEffect(() => {
    if (!cardRef.current || !interactive) return;

    if (isHovered) {
      // Animación de hover con efecto 3D
      anime({
        targets: cardRef.current,
        translateY: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.02,
        duration: 300,
        easing: "easeOutCubic",
      });

      // Efecto de brillo
      anime({
        targets: glowRef.current,
        opacity: 0.6,
        scale: 1.05,
        duration: 300,
        easing: "easeOutCubic",
      });
    } else {
      // Animación de salida
      anime({
        targets: cardRef.current,
        translateY: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 300,
        easing: "easeOutCubic",
      });

      anime({
        targets: glowRef.current,
        opacity: 0,
        scale: 1,
        duration: 300,
        easing: "easeOutCubic",
      });
    }
  }, [isHovered, interactive]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !interactive) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    anime({
      targets: cardRef.current,
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 100,
      easing: "easeOutQuad",
    });
  };

  return (
    <div className="relative group">
      {/* Efecto de brillo de fondo */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-xl opacity-0 blur-xl"
        style={{
          background: `radial-gradient(circle, ${glowColor}40, transparent 70%)`,
          zIndex: -1,
        }}
      />

      {/* Card principal */}
      <div
        ref={cardRef}
        className={`
          relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50
          transform-gpu perspective-1000 preserve-3d transition-all duration-300
          ${interactive ? "cursor-pointer" : ""}
          ${className}
        `}
        onMouseEnter={() => interactive && setIsHovered(true)}
        onMouseLeave={() => interactive && setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          boxShadow: isHovered 
            ? `0 20px 40px rgba(0,0,0,0.1), 0 0 30px ${glowColor}30`
            : "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        {/* Efecto de reflejo */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl pointer-events-none" />
        
        {/* Borde animado */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Contenido */}
        <div className="relative z-10 p-6">
          {title && (
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              {title}
            </h3>
          )}
          {children}
        </div>

        {/* Partículas decorativas */}
        {interactive && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}