import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// --- Variantes de animación para Framer Motion ---

// Animación para el contenedor del sidebar (fondo y panel)
const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { 
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.7 }
  },
  exit: { 
    x: "-100%",
    transition: { duration: 0.3, ease: "easeInOut" }
  },
};

// Animación para el contenedor de los enlaces del sidebar (efecto escalonado)
const navLinksContainerVariants = {
  hidden: { transition: { staggerChildren: 0.07, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

// Animación para cada enlace individual en el sidebar
const navLinkItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200 } },
};

// --- Componente Principal ---

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/nosotros", text: "Nosotros" },
    { to: "/servicios", text: "Servicios" },
    { to: "/portafolio", text: "Portafolio" },
    { to: "/testimonios", text: "Testimonios" },
    { to: "/contacto", text: "Contacto" },
  ];

  // Estilo base para los NavLink, reutilizable en desktop y mobile
  const linkClassName = ({ isActive }) =>
    `relative block px-3 py-2 text-base font-medium transition-colors duration-300 ${
      isActive
        ? "text-indigo-600"
        : "text-slate-700 hover:text-indigo-600"
    }`;

  return (
    <>
      {/* --- Navegación de Escritorio --- */}
      <nav className="hidden sm:flex items-center gap-2">
        {navLinks.map((link) => (
          <NavLink key={link.to} to={link.to} className={linkClassName}>
            {({ isActive }) => (
              <>
                {link.text}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                    layoutId="underline" // Anima el subrayado entre enlaces activos
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* --- Botón Hamburguesa para Móvil --- */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* --- Sidebar Móvil (con AnimatePresence para animaciones de entrada/salida) --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fondo oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel del Sidebar */}
            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl flex flex-col"
            >
              <div className="p-4 flex items-center justify-between border-b">
                <span className="font-extrabold tracking-tight text-xl text-slate-800">GIAD</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-slate-600 hover:bg-slate-100"
                  aria-label="Cerrar menú"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <motion.nav
                variants={navLinksContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-2 p-4 mt-4"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.to} variants={navLinkItemVariants}>
                    <NavLink
                      to={link.to}
                      className={linkClassName}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.text}
                    </NavLink>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
