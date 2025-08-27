import { motion } from "framer-motion";
import { Cpu, Layers, SunMedium, Quote } from "lucide-react";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import Scene from "../components/3d/Scene";
import useApi from "../hooks/useApi"; // Importamos el hook
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";

// --- Componente Hero (con fondo claro) ---
function Hero() {
  return (
    <div className="relative w-full h-screen text-slate-800">
      {/* Contenedor del Canvas 3D: ahora con fondo claro */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-slate-50">
        <Scene />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="space-y-6"
        >
          <Heading
            level={1}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 drop-shadow-sm"
          >
            Innovación a tu Alcance
          </Heading>
          <p className="text-slate-600 text-lg md:text-xl max-w-3xl mx-auto">
            Desde prototipos 3D hasta soluciones de energía sostenible, transformamos tus ideas en realidad con tecnología de vanguardia.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="px-8 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-500/30">
              Explora Nuestros Servicios
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// --- Componente Testimonials (con lógica de API) ---
function TestimonialsSection() {
  const { data, loading, error } = useApi("/testimonios");
  if (loading) return <SkeletonGrid />;
  if (error) return <ErrorMsg error={error} />;
  const testimonials = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <Section as="section" className="py-24 bg-slate-50">
      <Heading level={2} className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-800">
        Lo que dicen nuestros clientes
      </Heading>
      
      {testimonials && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id || index} // Usar un ID único si la API lo provee
              className="bg-white p-8 rounded-2xl shadow-md border border-slate-200/80"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Quote className="w-10 h-10 text-slate-300 mb-4" />
              <p className="text-slate-600 italic mb-6">"{testimonial.texto}"</p>
              <div>
                <p className="font-bold text-slate-800">{testimonial.cliente}</p>
                <p className="text-sm text-indigo-600">{testimonial.cargo}, {testimonial.empresa}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </Section>
  );
}


// --- Página Principal (con tema claro y secciones actualizadas) ---
export default function Home() {
  const services = [
    { icon: <Layers className="w-10 h-10 text-sky-500" />, title: "Diseño 3D & Impresión", description: "Creamos modelos y prototipos en 3D con calidad y precisión profesional para cualquier industria." },
    { icon: <Cpu className="w-10 h-10 text-sky-500" />, title: "Maquinado CNC", description: "Fabricamos piezas y componentes con tolerancias exactas, garantizando un rendimiento óptimo." },
    { icon: <SunMedium className="w-10 h-10 text-sky-500" />, title: "Energía Solar", description: "Instalamos soluciones solares eficientes y sostenibles para reducir costos y cuidar el planeta." },
  ];

  return (
    <>
      <Hero />
      <main className="bg-white text-slate-800">
        <Container>
          {/* Sección de servicios */}
          <Section as="section" className="py-24 text-center">
            <Heading level={2} className="text-4xl md:text-5xl font-bold mb-4">
              Nuestros Servicios
            </Heading>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-16">
              Ofrecemos un abanico de soluciones tecnológicas para llevar tu proyecto al siguiente nivel.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-50/80 p-8 rounded-2xl border border-slate-200/80 shadow-sm text-left space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </Section>

          {/* Testimonios (componente separado) */}
          <TestimonialsSection />

          {/* CTA Final */}
          <Section as="section" className="py-24 text-center">
            <Heading level={2} className="text-4xl md:text-5xl font-bold mb-6">
              ¿Listo para empezar tu proyecto?
            </Heading>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto mb-8">
              Contáctanos hoy mismo y descubre cómo podemos ayudarte a alcanzar tus metas.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="px-10 py-4 text-xl font-semibold text-white bg-gradient-to-r from-indigo-500 to-sky-500 rounded-full hover:shadow-lg hover:shadow-sky-500/30 transition-all duration-300">
                ¡Hablemos ahora!
              </Button>
            </motion.div>
          </Section>
        </Container>
      </main>
    </>
  );
}
