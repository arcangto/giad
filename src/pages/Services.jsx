import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import Card from "../components/ui/Card";
import useApi from "../hooks/useApi";
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";

export default function Services() {
  const { data, loading, error } = useApi("/servicios");
  if (loading) return <SkeletonGrid />;
  if (error) return <ErrorMsg error={error} />;

  const items = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <main>
      <Container>
        <Section as="section">
          <Heading level={1} className="text-primary mb-6">Servicios</Heading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
              <Card key={s.id} title={s.title ?? s.name}>
                <p className="text-sm text-gray-600 mt-2">{s.description ?? s.excerpt}</p>
              </Card>
            ))}
          </div>
        </Section>
      </Container>
    </main>
  );
}
