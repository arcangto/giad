/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}", // escanea todos los componentes y páginas
];
export const theme = {
  extend: {
    colors: {
      primary: "#1D4ED8", // azul principal
      secondary: "#2563EB", // azul secundario
      accent: "#F59E0B", // amarillo/acento
      neutral: "#F3F4F6", // gris claro de fondo
    },
    fontFamily: {
      sans: ["Inter", "ui-sans-serif", "system-ui"],
      heading: ["Poppins", "ui-sans-serif", "system-ui"],
    },
    boxShadow: {
      card: "0 2px 12px rgba(0,0,0,0.08)",
      cardHover: "0 6px 20px rgba(0,0,0,0.12)",
    },
    spacing: {
      18: "4.5rem",
      22: "5.5rem",
      26: "6.5rem",
    },
    borderRadius: {
      xl: "1rem",
      "2xl": "1.5rem",
    },
    maxWidth: {
      container: "1200px",
    },
  },
};
export const plugins = [
  require("@tailwindcss/typography"), // para la clase prose
  require("@tailwindcss/line-clamp"), // truncado de texto
];
