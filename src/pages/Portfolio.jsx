import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import { Link } from "react-router-dom";
import useApi from "../hooks/useApi";
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";

export default function Portfolio() {
  const { data, loading, error } = useApi("/proyectos");
  if (loading) return <SkeletonGrid />;
  if (error) return <ErrorMsg error={error} />;

  const items = Array.isArray(data) ? data : data?.data ?? [];
  

  return (
    <main>
      <Container>
        <Section as="section">
          <Heading level={1} className="text-primary mb-6">Portafolio</Heading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <Link
                to={`/portafolio/${p.id}`}
                key={p.id}
                className="group block rounded-xl border overflow-hidden hover:shadow-cardHover transition"
              >
                <img
                  src={p.portada ?? p.image}
                  alt={p.titulo}
                  className="w-full h-48 object-cover group-hover:scale-[1.02] transition"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{p.titulo ?? p.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{p.excerpt ?? p.descripcion}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </Container>
    </main>
  );
}
