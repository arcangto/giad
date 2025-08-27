import { Outlet, useLocation } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import InteractiveScene from "../components/3d/InteractiveScene";
// import anime from "animejs";
import { useEffect, useRef } from "react";

export default function MainLayout() {
  const location = useLocation();
  const backgroundRef = useRef();

  // Activar fondo 3D en páginas específicas con diferentes configuraciones
  const get3DConfig = () => {
    switch (location.pathname) {
      case "/":
        return { show: true, showText: true, textContent: "GIAD 3D" };
      case "/portafolio":
        return { show: true, showText: true, textContent: "PORTAFOLIO" };
      case "/servicios":
        return { show: true, showText: false };
      default:
        return { show: false };
    }
  };

  const sceneConfig = get3DConfig();

  useEffect(() => {
    // Animación de entrada del fondo 3D
    if (backgroundRef.current && sceneConfig.show) {
      anime({
        targets: backgroundRef.current,
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutCubic",
      });
    }
  }, [location.pathname, sceneConfig.show]);

  return (
    <div className="min-h-dvh flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Fondo 3D interactivo */}
      {sceneConfig.show && (
        <div 
          ref={backgroundRef}
          className="absolute inset-0 -z-10 opacity-0"
        >
          <InteractiveScene 
            showText={sceneConfig.showText}
            textContent={sceneConfig.textContent}
          />
        </div>
      )}

      {/* Overlay de gradiente para mejor legibilidad */}
      {sceneConfig.show && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30 -z-5" />
      )}

      {/* Main content con animaciones de transición */}
      <motion.main
        key={location.pathname}
        className="flex-1 w-full relative z-10"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </motion.main>

      {/* WhatsApp flotante */}
      <motion.a
        href="https://wa.me/521234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 inline-flex items-center justify-center w-14 h-14 rounded-full shadow-xl bg-gradient-to-r from-[#25D366] to-[#20ba57] text-white hover:scale-110 transition-all duration-300 z-50"
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <FaWhatsapp className="w-9 h-9 text-white" />
      </motion.a>

      {/* Partículas de fondo sutiles */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`absolute w-1 h-1 bg-blue-400/20 rounded-full animate-pulse`} style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }} />
        ))}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
