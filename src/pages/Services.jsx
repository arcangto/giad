import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import Card3D from "../components/ui/Card3D";
import Button3D from "../components/ui/Button3D";
import useApi from "../hooks/useApi";
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";
import { motion } from "framer-motion";
import { 
  Printer, 
  Cpu, 
  SunMedium, 
  Layers, 
  Zap, 
  Shield, 
  Award,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function Services() {
  const { data, loading, error } = useApi("/servicios");
  
  if (loading) return (
    <main className="py-20">
      <Container>
        <SkeletonGrid count={6} />
      </Container>
    </main>
  );
  
  if (error) return (
    <main className="py-20">
      <Container>
        <ErrorMsg error={error} />
      </Container>
    </main>
  );

  const items = Array.isArray(data) ? data : data?.data ?? [];

  // Servicios detallados con información completa
  const detailedServices = [
    {
      id: 1,
      icon: <Printer className="w-16 h-16" />,
      title: "Impresión 3D Profesional",
      subtitle: "Prototipado y Producción de Vanguardia",
      description: "Transformamos tus diseños digitales en objetos físicos de alta precisión utilizando las tecnologías de impresión 3D más avanzadas del mercado.",
      features: [
        "Tecnologías FDM, SLA, SLS y Metal",
        "Tolerancias de hasta ±0.05mm",
        "Más de 50 materiales disponibles",
        "Post-procesado profesional incluido",
        "Prototipado rápido en 24-48h",
        "Series de producción hasta 10,000 piezas"
      ],
      applications: [
        "Prototipos funcionales",
        "Piezas de uso final",
        "Moldes y herramientas",
        "Dispositivos médicos",
        "Componentes aeroespaciales"
      ],
      color: "#4299e1",
      price: "Desde $50 USD"
    },
    {
      id: 2,
      icon: <Cpu className="w-16 h-16" />,
      title: "Maquinado CNC de Precisión",
      subtitle: "Manufactura Substractiva de Alta Calidad",
      description: "Fabricación de componentes metálicos y plásticos con exactitud micrométrica mediante centros de maquinado CNC de 3, 4 y 5 ejes.",
      features: [
        "Centros de maquinado 5 ejes simultáneos",
        "Tolerancias de ±0.01mm",
        "Metales: Aluminio, Acero, Titanio, Inconel",
        "Plásticos técnicos: PEEK, POM, Nylon",
        "Acabados superficiales Ra 0.8μm",
        "Certificación ISO 9001:2015"
      ],
      applications: [
        "Componentes aeronáuticos",
        "Piezas automotrices",
        "Dispositivos médicos",
        "Moldes de inyección",
        "Herramientas especiales"
      ],
      color: "#9f7aea",
      price: "Desde $100 USD"
    },
    {
      id: 3,
      icon: <SunMedium className="w-16 h-16" />,
      title: "Energía Solar Inteligente",
      subtitle: "Sistemas Fotovoltaicos con IoT",
      description: "Instalación de sistemas solares con monitoreo inteligente y optimización automática para maximizar el ahorro energético.",
      features: [
        "Paneles de alta eficiencia (>22%)",
        "Inversores con optimizadores de potencia",
        "Monitoreo IoT en tiempo real",
        "App móvil para seguimiento",
        "Mantenimiento predictivo",
        "Garantía de 25 años en paneles"
      ],
      applications: [
        "Instalaciones residenciales",
        "Edificios comerciales",
        "Plantas industriales",
        "Sistemas de bombeo solar",
        "Electrificación rural"
      ],
      color: "#f6ad55",
      price: "Desde $2,500 USD"
    }
  ];
  return (
    <main>
      {/* Hero Section */}
      <Section as="section" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Heading level={1} className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
              Servicios de Manufactura Avanzada
            </Heading>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Ofrecemos soluciones integrales de manufactura digital, desde el concepto hasta la producción en serie, 
              utilizando las tecnologías más avanzadas del mercado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button3D variant="primary" size="lg">
                <Zap className="w-5 h-5" />
                Cotización Gratuita
              </Button3D>
              <Button3D variant="secondary" size="lg">
                <Shield className="w-5 h-5" />
                Ver Certificaciones
              </Button3D>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Servicios Detallados */}
      <Container>
        <Section as="section" className="py-20">
          <div className="space-y-20">
            {detailedServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Contenido */}
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div 
                        className="p-4 rounded-2xl"
                        style={{ backgroundColor: `${service.color}20` }}
                      >
                        <div style={{ color: service.color }}>
                          {service.icon}
                        </div>
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-slate-800">{service.title}</h2>
                        <p className="text-lg text-slate-600">{service.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-slate-700 text-lg leading-relaxed">
                      {service.description}
                    </p>

                    {/* Características */}
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">Características Técnicas</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Aplicaciones */}
                    <div>
                      <h3 className="text-xl font-semibold text-slate-800 mb-4">Aplicaciones</h3>
                      <div className="flex flex-wrap gap-2">
                        {service.applications.map((app, i) => (
                          <span 
                            key={i}
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: `${service.color}20`,
                              color: service.color 
                            }}
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Precio y CTA */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                      <div>
                        <span className="text-2xl font-bold text-slate-800">{service.price}</span>
                        <span className="text-slate-600 ml-2">por proyecto</span>
                      </div>
                      <Button3D 
                        variant="primary" 
                        className="group"
                        style={{ backgroundColor: service.color }}
                      >
                        Solicitar Cotización
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button3D>
                    </div>
                  </div>
                </div>

                {/* Card 3D */}
                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Card3D 
                    interactive={true}
                    glowColor={service.color}
                    className="h-96 flex items-center justify-center"
                  >
                    <div className="text-center space-y-6">
                      <div style={{ color: service.color }}>
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        {service.title}
                      </h3>
                      <div className="space-y-2">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <div key={i} className="text-sm text-slate-600">
                            • {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Servicios adicionales de la API */}
        {items.length > 0 && (
          <Section as="section" className="py-20 bg-slate-50">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <Heading level={2} className="text-4xl font-bold mb-4 text-slate-800">
                Servicios Adicionales
              </Heading>
              <p className="text-xl text-slate-600">
                Complementamos nuestros servicios principales con soluciones especializadas.
              </p>
            </motion.div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card3D 
                    title={service.title ?? service.name}
                    interactive={true}
                    glowColor="#4299e1"
                  >
                    <p className="text-slate-600 mb-4">
                      {service.description ?? service.excerpt}
                    </p>
                    <Button3D variant="primary" size="sm" className="w-full">
                      Más Información
                    </Button3D>
                  </Card3D>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* CTA Section */}
        <Section as="section" className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Heading level={2} className="text-4xl md:text-5xl font-bold text-slate-800">
              ¿Necesitas una Solución Personalizada?
            </Heading>
            <p className="text-xl text-slate-600 leading-relaxed">
              Nuestro equipo de ingenieros está listo para desarrollar la solución perfecta para tu proyecto específico.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button3D variant="primary" size="lg">
                <Zap className="w-5 h-5" />
                Consulta Gratuita
              </Button3D>
              <Button3D variant="secondary" size="lg">
                <Award className="w-5 h-5" />
                Ver Casos de Éxito
              </Button3D>
            </div>
          </motion.div>
        </Section>
      </Container>
    </main>
  );
}
