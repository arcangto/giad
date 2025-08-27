import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { ErrorMsg, Skeleton,  } from "../components/ui/Feedback";

export default function ProjectDetail() {
  const { id } = useParams();
  const { data, loading, error } = useApi(`/proyectos/${id}`);
  if (loading) return <Skeleton />;
  if (error) return <ErrorMsg error={error} />;
  const p = data?.data ?? data;
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold">{p?.titulo ?? p?.name}</h1>
      <p className="text-gray-600">{p?.resumen}</p>
      <p className="text-gray-600">{p?.descripcion}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(p?.images ?? []).map((img, i) => (
          <img key={i} src={img.url ?? img} alt={`Imagen ${i+1}`} className="rounded-lg border" loading="lazy"/>
        ))}
      </div>
    </article>
  );
}