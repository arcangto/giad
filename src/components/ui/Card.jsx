export default function Card({ children, title, className, as = "div" }) {
  const Component = as;
  return (
    <Component className={`rounded-xl shadow-card hover:shadow-cardHover transition p-6 bg-white ${className ?? ""}`}>
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </Component>
  );
}
