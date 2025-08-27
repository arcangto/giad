import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import useApi from "../hooks/useApi";
import { ErrorMsg, Skeleton } from "../components/ui/Feedback";
import Button from "../components/ui/Button";

export default function Contact() {
  const { data, loading, error } = useApi("/paginas/contacto");
  if (loading) return <Skeleton />;
  if (error) return <ErrorMsg error={error} />;

  return (
    <main>
      <Container>
        <Section as="section" className="text-center space-y-4">
          <Heading level={1} className="text-primary">Contacto</Heading>
        </Section>

        <Section as="section">
          <article className="prose prose-lg max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: data?.content ?? "" }} />
        </Section>

        <Section as="section" className="text-center">
          <Button>Enviar mensaje</Button>
        </Section>
      </Container>
    </main>
  );
}
