import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import useApi from "../hooks/useApi";
import { ErrorMsg, Skeleton } from "../components/ui/Feedback";

export default function About() {
  const { data, loading, error } = useApi("/paginas/nosotros");

  console.log(data);

  if (loading) return <Skeleton />;
  if (error) return <ErrorMsg error={error} />;

  return (
    <main>
      <Container>
        {/* Hero */}
        <Section as="section" className="text-center space-y-2">
          <Heading level={1} className="text-primary">
            Sobre GIAD
          </Heading>
          <p className="text-gray-600 text-lg">Conoce quiénes somos y qué hacemos.</p>
        </Section>

        {/* Contenido */}
        <Section as="section">
          <article className="prose prose-lg text-gray-800 max-w-none" dangerouslySetInnerHTML={{ __html: data?.content ?? "" }} />
        </Section>

        {/* CTA */}
        <Section as="section" className="text-center">
          <Button>Contáctanos</Button>
        </Section>
      </Container>
    </main>
  );
}
