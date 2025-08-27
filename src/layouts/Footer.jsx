import { NavLink } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react"; // Íconos para redes sociales

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/giad", label: "Twitter" },
    { icon: Github, href: "https://github.com/giad", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/company/giad", label: "LinkedIn" },
  ];

  const navLinks = [
    { to: "/nosotros", text: "Nosotros" },
    { to: "/servicios", text: "Servicios" },
    { to: "/portafolio", text: "Portafolio" },
    { to: "/contacto", text: "Contacto" },
  ];

  return (
    <footer className="border-t bg-slate-50 text-slate-600">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna 1: Logo y descripción */}
          <div className="space-y-4">
            <h2 className="font-extrabold tracking-tight text-2xl text-slate-800">GIAD</h2>
            <p className="text-sm">
              Transformando ideas en soluciones digitales innovadoras.
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 tracking-wider uppercase">Navegación</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className="text-sm hover:text-indigo-600 transition-colors">
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Redes Sociales */}
          <div>
            <h3 className="text-sm font-semibold text-slate-800 tracking-wider uppercase">Síguenos</h3>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-slate-500 hover:text-indigo-600 transition-colors"
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior con Copyright */}
        <div className="mt-12 border-t pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} GIAD. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
