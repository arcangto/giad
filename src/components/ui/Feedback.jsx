import LoadingSpinner3D from "./LoadingSpinner3D";

export function Skeleton() {
  return (
    <div className="flex items-center justify-center py-20">
      <LoadingSpinner3D size={120} message="Cargando contenido..." />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="flex items-center justify-center py-20">
      <LoadingSpinner3D size={150} message="Cargando proyectos..." />
    </div>
  );
}

export function ErrorMsg({ error }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-red-700 mb-2">Error al cargar</h3>
        <p className="text-red-600">{error?.message ?? "Intenta más tarde"}</p>
      </div>
    </div>
  );
}
