import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import Card3D from "../components/ui/Card3D";
import Button3D from "../components/ui/Button3D";
import { Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";
import { motion } from "framer-motion";
import { 
  ExternalLink, 
  Calendar, 
  User, 
  Tag,
  Eye,
  Download,
  Share2
} from "lucide-react";

export default function Portfolio() {
  const { data, loading, error } = useApi("/proyectos");
  
  if (loading) return (
    <main className="py-20">
      <Container>
        <SkeletonGrid count={9} />
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

  // Proyectos de ejemplo si no hay datos de la API
  const exampleProjects = [
    {
      id: 1,
      titulo: "Prototipo de Drone Autónomo",
      descripcion: "Desarrollo completo de un drone para inspección industrial con cámara térmica y navegación autónoma.",
      portada: "https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoria: "Impresión 3D",
      cliente: "AeroTech Solutions",
      fecha: "2024-01-15",
      duracion: "3 meses",
      tecnologias: ["SLA", "Fibra de Carbono", "Electrónica"],
      color: "#4299e1"
    },
    {
      id: 2,
      titulo: "Componentes Automotrices CNC",
      descripcion: "Fabricación de piezas de alta precisión para sistema de frenos de vehículos de competición.",
      portada: "https://images.pexels.com/photos/190574/pexels-photo-190574.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoria: "Maquinado CNC",
      cliente: "Racing Dynamics",
      fecha: "2024-02-20",
      duracion: "2 meses",
      tecnologias: ["Aluminio 7075", "5 Ejes", "Anodizado"],
      color: "#9f7aea"
    },
    {
      id: 3,
      titulo: "Sistema Solar Inteligente",
      descripcion: "Instalación de 50kW con monitoreo IoT para complejo industrial, reduciendo costos energéticos en 75%.",
      portada: "https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoria: "Energía Solar",
      cliente: "GreenTech Industries",
      fecha: "2024-03-10",
      duracion: "4 meses",
      tecnologias: ["Paneles 450W", "IoT", "Optimizadores"],
      color: "#f6ad55"
    },
    {
      id: 4,
      titulo: "Dispositivo Médico Personalizado",
      descripcion: "Prótesis de mano funcional impresa en 3D con sensores de presión y control mioeléctrico.",
      portada: "https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoria: "Impresión 3D",
      cliente: "MedTech Innovations",
      fecha: "2024-04-05",
      duracion: "6 meses",
      tecnologias: ["Biocompatible", "Sensores", "Control Neural"],
      color: "#48bb78"
    },
    {
      id: 5,
      titulo: "Molde de Inyección Complejo",
      descripción: "Molde multi-cavidad para producción en serie de componentes electrónicos con tolerancias críticas.",
      portada: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoria: "Maquinado CNC",
      cliente: "ElectroComponents Ltd",
      fecha: "2024-05-12",
      duracion: "5 meses",
      tecnologias: ["Acero P20", "EDM", "Texturizado"],
      color: "#ed8936"
    },
    {
      id: 6,
      titulo: "Instalación Solar Residencial",
      descripcion: "Sistema de 15kW para vivienda unifamiliar con almacenamiento en baterías y gestión inteligente.",
      portada: "https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=800",
      categoria: "Energía Solar",
      cliente: "Familia Rodríguez",
      fecha: "2024-06-18",
      duracion: "1 mes",
      tecnologias: ["Baterías LiFePO4", "Inversor Híbrido", "App Móvil"],
      color: "#38b2ac"
    }
  ];

  const projects = items.length > 0 ? items : exampleProjects;

  const categories = [...new Set(projects.map(p => p.categoria || "General"))];

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
              Nuestro Portafolio
            </Heading>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Descubre los proyectos que hemos desarrollado para empresas líderes en diferentes industrias. 
              Cada proyecto representa nuestra pasión por la innovación y la excelencia técnica.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <motion.span
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                >
                  {category}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Portfolio Grid */}
      <Container>
        <Section as="section" className="py-20">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card3D 
                  interactive={true}
                  glowColor={project.color || "#4299e1"}
                  className="h-full overflow-hidden group"
                >
                  {/* Imagen del proyecto */}
                  <div className="relative overflow-hidden rounded-lg mb-6">
                    <img
                      src={project.portada ?? project.image ?? "https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=800"}
                      alt={project.titulo ?? project.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Overlay con acciones */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex gap-2">
                        <Link
                          to={`/portafolio/${project.id}`}
                          className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                        >
                          <Eye className="w-5 h-5 text-slate-700" />
                        </Link>
                        <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                          <Share2 className="w-5 h-5 text-slate-700" />
                        </button>
                      </div>
                    </div>

                    {/* Categoría */}
                    <div className="absolute top-4 left-4">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: project.color || "#4299e1" }}
                      >
                        {project.categoria || "General"}
                      </span>
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">
                        {project.titulo ?? project.name}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-3">
                        {project.descripcion ?? project.excerpt}
                      </p>
                    </div>

                    {/* Metadatos */}
                    <div className="space-y-2 text-xs text-slate-500">
                      {project.cliente && (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>{project.cliente}</span>
                        </div>
                      )}
                      {project.fecha && (
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(project.fecha).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.duracion && (
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4" />
                          <span>Duración: {project.duracion}</span>
                        </div>
                      )}
                    </div>

                    {/* Tecnologías */}
                    {project.tecnologias && (
                      <div className="flex flex-wrap gap-1">
                        {project.tecnologias.slice(0, 3).map((tech, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tecnologias.length > 3 && (
                          <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                            +{project.tecnologias.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Botón de acción */}
                    <div className="pt-4 border-t border-slate-200">
                      <Link to={`/portafolio/${project.id}`} className="block">
                        <Button3D 
                          variant="primary" 
                          size="sm" 
                          className="w-full group"
                          style={{ backgroundColor: project.color || "#4299e1" }}
                        >
                          Ver Detalles
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button3D>
                      </Link>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section as="section" className="py-20 text-center bg-slate-50 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <Heading level={2} className="text-4xl md:text-5xl font-bold text-slate-800">
              ¿Tu Proyecto Será el Siguiente?
            </Heading>
            <p className="text-xl text-slate-600 leading-relaxed">
              Cada proyecto en nuestro portafolio comenzó con una idea. Permítenos ayudarte a convertir 
              tu visión en realidad con la misma pasión y dedicación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button3D variant="primary" size="lg">
                <Download className="w-5 h-5" />
                Descargar Portafolio
              </Button3D>
              <Button3D variant="secondary" size="lg">
                <ExternalLink className="w-5 h-5" />
                Iniciar Proyecto
              </Button3D>
            </div>
          </motion.div>
        </Section>
      </Container>
    </main>
  );
}
