import { motion } from "framer-motion";
import { Cpu, Layers, SunMedium, Quote, Printer, Zap, Shield, Award } from "lucide-react";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import Button3D from "../components/ui/Button3D";
import Card3D from "../components/ui/Card3D";
import useApi from "../hooks/useApi"; // Importamos el hook
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";
import { animate, createScope, createSpring, createDraggable } from 'animejs';
import { useEffect, useRef } from "react";

// --- Componente Hero (con fondo claro) ---
function Hero() {
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    // Animación de entrada escalonada
    const timeline = anime.timeline({
      easing: "easeOutExpo",
      duration: 1000,
    });

    timeline
      .add({
        targets: titleRef.current,
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 1200,
      })
      .add({
        targets: subtitleRef.current,
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 800,
      }, "-=600")
      .add({
        targets: buttonRef.current,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 600,
      }, "-=400");
  }, []);

  return (
    <div ref={heroRef} className="relative w-full h-screen text-slate-800 flex items-center justify-center">
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <div className="space-y-8">
          {/* Título principal */}
          <div ref={titleRef} className="opacity-0">
            <Heading
              level={1}
              className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 drop-shadow-2xl"
            >
              Manufactura
            </Heading>
            <Heading
              level={1}
              className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 drop-shadow-2xl"
            >
              del Futuro
            </Heading>
          </div>

          {/* Subtítulo */}
          <div ref={subtitleRef} className="opacity-0">
            <p className="text-slate-700 text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-medium">
              Transformamos conceptos en realidad tangible mediante{" "}
              <span className="text-blue-600 font-bold">impresión 3D de precisión</span>,{" "}
              <span className="text-purple-600 font-bold">maquinado CNC avanzado</span> y{" "}
              <span className="text-cyan-600 font-bold">soluciones energéticas sostenibles</span>.
            </p>
          </div>

          {/* Botones de acción */}
          <div ref={buttonRef} className="opacity-0 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button3D 
              variant="primary" 
              size="lg"
              className="group"
            >
              <Printer className="w-5 h-5 group-hover:animate-bounce" />
              Explorar Servicios
            </Button3D>
            <Button3D 
              variant="secondary" 
              size="lg"
              className="group"
            >
              <Award className="w-5 h-5 group-hover:animate-pulse" />
              Ver Portafolio
            </Button3D>
          </div>

          {/* Estadísticas */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-8 border-t border-slate-200/50"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {[
              { number: "500+", label: "Proyectos Completados", icon: Award },
              { number: "99.9%", label: "Precisión Garantizada", icon: Shield },
              { number: "24h", label: "Tiempo de Respuesta", icon: Zap },
              { number: "15+", label: "Años de Experiencia", icon: Cpu },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-3xl font-bold text-slate-800">{stat.number}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/10 rounded-full animate-bounce" />
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-cyan-500/10 rounded-full animate-ping" />
    </div>
  );
}

// --- Componente de Servicios Mejorado ---
function ServicesSection() {
  const services = [
    { 
      icon: <Layers className="w-12 h-12" />, 
      title: "Impresión 3D Profesional", 
      description: "Prototipado rápido y producción en serie con tecnología FDM, SLA y SLS. Materiales de alta calidad para aplicaciones industriales y médicas.",
      features: ["Tolerancias ±0.1mm", "Múltiples materiales", "Post-procesado incluido"],
      color: "#4299e1"
    },
    { 
      icon: <Cpu className="w-12 h-12" />, 
      title: "Maquinado CNC de Precisión", 
      description: "Fabricación de componentes metálicos y plásticos con exactitud micrométrica. Desde prototipos únicos hasta series de producción.",
      features: ["5 ejes simultáneos", "Metales y polímeros", "Certificación ISO"],
      color: "#9f7aea"
    },
    { 
      icon: <SunMedium className="w-12 h-12" />, 
      title: "Energía Solar Inteligente", 
      description: "Sistemas fotovoltaicos con monitoreo IoT y optimización automática. Reducción de costos energéticos hasta 80%.",
      features: ["Monitoreo 24/7", "ROI en 3-5 años", "Mantenimiento incluido"],
      color: "#f6ad55"
    },
  ];

  return (
    <Section as="section" className="py-32 bg-gradient-to-b from-white to-slate-50">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Heading 
            level={2} 
            className="text-5xl md:text-6xl font-bold mb-6 text-slate-800"
          >
            Tecnologías de Vanguardia
          </Heading>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Combinamos décadas de experiencia con las últimas innovaciones para entregar soluciones que superan expectativas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card3D 
                interactive={true}
                glowColor={service.color}
                className="h-full"
              >
                <div className="text-center space-y-6">
                  <div 
                    className="inline-flex p-4 rounded-2xl mb-4"
                    style={{ backgroundColor: `${service.color}20` }}
                  >
                    <div style={{ color: service.color }}>
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: service.color }}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// --- Componente Testimonials (con lógica de API) ---
function TestimonialsSection() {
  const { data, loading, error } = useApi("/testimonios");
  if (loading) return (
    <Section className="py-24">
      <Container>
        <SkeletonGrid count={4} />
      </Container>
    </Section>
  );
  if (error) return (
    <Section className="py-24">
      <Container>
        <ErrorMsg error={error} />
      </Container>
    </Section>
  );
  
  const testimonials = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <Section as="section" className="py-32 bg-gradient-to-b from-slate-50 to-white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <Heading level={2} className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
            Casos de Éxito
          </Heading>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Descubre cómo hemos ayudado a empresas líderes a materializar sus visiones más ambiciosas.
          </p>
        </motion.div>
        
        {testimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card3D interactive={true} glowColor="#4299e1">
                  <div className="space-y-6">
                    <Quote className="w-12 h-12 text-blue-400" />
                    <p className="text-slate-700 italic text-lg leading-relaxed">
                      "{testimonial.texto}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.cliente?.charAt(0) || "C"}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{testimonial.cliente}</p>
                        <p className="text-sm text-blue-600">{testimonial.cargo}, {testimonial.empresa}</p>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonios de ejemplo si no hay datos de la API */}
            {[
              {
                texto: "GIAD transformó completamente nuestro proceso de prototipado. Lo que antes tomaba semanas, ahora lo tenemos en días con una calidad excepcional.",
                cliente: "María González",
                cargo: "Directora de I+D",
                empresa: "TechInnovate"
              },
              {
                texto: "La precisión de su maquinado CNC es impresionante. Cada pieza cumple exactamente con nuestras especificaciones más exigentes.",
                cliente: "Carlos Mendoza",
                cargo: "Ingeniero Jefe",
                empresa: "AeroComponents"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card3D interactive={true} glowColor="#4299e1">
                  <div className="space-y-6">
                    <Quote className="w-12 h-12 text-blue-400" />
                    <p className="text-slate-700 italic text-lg leading-relaxed">
                      "{testimonial.texto}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonial.cliente.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{testimonial.cliente}</p>
                        <p className="text-sm text-blue-600">{testimonial.cargo}, {testimonial.empresa}</p>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

// --- Componente CTA Final ---
function CTASection() {
  return (
    <Section as="section" className="py-32 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <Heading level={2} className="text-5xl md:text-6xl font-bold mb-6">
            ¿Listo para Innovar?
          </Heading>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
            Únete a más de 500 empresas que ya han transformado sus procesos de manufactura con nuestras soluciones de vanguardia.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button3D 
              variant="accent" 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl"
            >
              <Zap className="w-5 h-5" />
              Solicitar Cotización
            </Button3D>
            <Button3D 
              variant="secondary" 
              size="lg"
              className="border-2 border-white/30 bg-transparent hover:bg-white/10"
            >
              <Printer className="w-5 h-5" />
              Agendar Consulta
            </Button3D>
          </div>

          {/* Garantías */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 mt-16 border-t border-white/20">
            {[
              { icon: Shield, text: "Garantía de Calidad" },
              { icon: Zap, text: "Entrega Rápida" },
              { icon: Award, text: "Soporte 24/7" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3 text-white/90">
                <item.icon className="w-6 h-6" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

// --- Página Principal (con tema claro y secciones actualizadas) ---
export default function Home() {
  return (
    <>
      <Hero />
      <main className="text-slate-800">
        <ServicesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
    </>
  );
}
