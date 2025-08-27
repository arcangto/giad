import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import useApi from "../hooks/useApi";
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";

export default function Testimonials() {
  const { data, loading, error } = useApi("/testimonios");
  if (loading) return <SkeletonGrid />;
  if (error) return <ErrorMsg error={error} />;

  console.log(data);
  

  const items = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <main>
      <Container>
        <Section as="section" className="space-y-6">
          <Heading level={1} className="text-primary">Testimonios</Heading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((t) => (
              <blockquote key={t.id} className="rounded-xl border p-5">
                <p className="italic">“{t.texto ?? t.quote}”</p>
                <footer className="mt-3 text-sm text-gray-600">— {t.cliente ?? t.name}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      </Container>
    </main>
  );
}
