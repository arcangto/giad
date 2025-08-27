export default function Heading({ level = 1, children, className }) {
  const Tag = `h${level}`;
  return (
    <Tag className={`font-heading font-bold ${className ?? ""}`}>
      {children}
    </Tag>
  );
}
