import { useState, useRef, useEffect } from "react";
import { animate, createScope, createSpring, createDraggable } from 'animejs';

export default function Button3D({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  size = "md",
  disabled = false 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef();
  const shadowRef = useRef();

  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-blue-600 text-white",
    secondary: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
    accent: "bg-gradient-to-r from-orange-500 to-orange-600 text-white",
    success: "bg-gradient-to-r from-green-500 to-green-600 text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  useEffect(() => {
    if (!buttonRef.current || !shadowRef.current) return;

    if (isHovered && !disabled) {
      // Animación de hover
      anime({
        targets: buttonRef.current,
        translateY: -4,
        scale: 1.05,
        duration: 200,
        easing: "easeOutCubic",
      });

      anime({
        targets: shadowRef.current,
        opacity: 0.3,
        scale: 1.1,
        duration: 200,
        easing: "easeOutCubic",
      });
    } else {
      // Animación de salida
      animate({
        targets: buttonRef.current,
        translateY: 0,
        scale: 1,
        duration: 200,
        easing: "easeOutCubic",
      });

      anime({
        targets: shadowRef.current,
        opacity: 0.15,
        scale: 1,
        duration: 200,
        easing: "easeOutCubic",
      });
    }
  }, [isHovered, disabled]);

  useEffect(() => {
    if (!buttonRef.current) return;

    if (isPressed && !disabled) {
      anime({
        targets: buttonRef.current,
        translateY: -1,
        scale: 0.98,
        duration: 100,
        easing: "easeOutCubic",
      });
    }
  }, [isPressed, disabled]);

  const handleClick = (e) => {
    if (disabled) return;
    
    // Efecto de ondas
    const ripple = document.createElement("span");
    const rect = buttonRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    buttonRef.current.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);

    onClick?.(e);
  };

  return (
    <div className="relative inline-block">
      {/* Sombra 3D */}
      <div
        ref={shadowRef}
        className="absolute inset-0 bg-black rounded-lg opacity-15 blur-sm transform translate-y-2"
        style={{ zIndex: -1 }}
      />
      
      {/* Botón principal */}
      <button
        ref={buttonRef}
        className={`
          relative overflow-hidden font-semibold rounded-lg transition-all duration-200
          transform-gpu perspective-1000 preserve-3d
          ${variants[variant]}
          ${sizes[size]}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${className}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onClick={handleClick}
        disabled={disabled}
        style={{
          boxShadow: isHovered && !disabled 
            ? "0 10px 25px rgba(0,0,0,0.2), 0 0 20px rgba(66, 153, 225, 0.3)"
            : "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transform -skew-x-12 -translate-x-full hover:translate-x-full transition-all duration-700" />
        
        {/* Contenido */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </button>

      <style jsx>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          transform: scale(0);
          animation: ripple-animation 0.6s linear;
          pointer-events: none;
        }

        @keyframes ripple-animation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}