export default function Button({ children, onClick, className, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary/90 transition ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
