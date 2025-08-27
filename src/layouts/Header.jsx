import { NavLink } from "react-router-dom";
import Navbar from "./Navbar"; // Importamos el nuevo componente de navegación

export default function Header() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-sm border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Nombre de la marca */}
          <NavLink 
            to="/" 
            className="font-extrabold tracking-tight text-xl text-slate-800 hover:text-indigo-600 transition-colors"
            aria-label="GIAD - Página de inicio"
          >
            GIAD
          </NavLink>

          {/* Componente de Navegación */}
          <Navbar />
        </div>
      </div>
    </header>
  );
}
