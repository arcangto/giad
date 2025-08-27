import { Outlet, useLocation } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Scene from "../components/3d/Scene";

export default function MainLayout() {
  const location = useLocation();

  // Ejemplo: activar fondo 3D solo en Home y Portfolio
  const show3D = ["/", "/portafolio"].includes(location.pathname);

  return (
    <div className="min-h-dvh flex flex-col bg-white relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Fondo 3D opcional */}
      {show3D && (
        <div className="absolute inset-0 -z-10">
          <Scene />
        </div>
      )}

      {/* Main content con animaciones de transición */}
      <motion.main
        key={location.pathname}
        className="flex-1 w-full"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
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
        className="fixed bottom-6 right-6 inline-flex items-center justify-center w-14 h-14 rounded-full shadow-lg bg-[#25D366] text-white hover:bg-[#20ba57]"
        aria-label="WhatsApp"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <FaWhatsapp className="w-9 h-9 text-white" />
      </motion.a>

      {/* Footer */}
      <Footer />
    </div>
  );
}
