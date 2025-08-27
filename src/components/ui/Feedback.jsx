export function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-gray-200 rounded" />
      <div className="h-4 bg-gray-200 rounded w-2/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-40 rounded-xl border bg-gray-50 animate-pulse"
        />
      ))}
    </div>
  );
}

export function ErrorMsg({ error }) {
  return (
    <div className="p-4 rounded-lg border border-red-200 bg-red-50 text-red-700">
      Error al cargar: {error?.message ?? "Intenta más tarde"}
    </div>
  );
}
