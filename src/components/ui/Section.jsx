export default function Section({ children, className, as = "div" }) {
  const Component = as;
  return (
    <Component className={`py-10 md:py-16 ${className ?? ""}`}>
      {children}
    </Component>
  );
}
