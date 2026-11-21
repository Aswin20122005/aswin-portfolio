import { useInView } from "../hooks/useInView";

export function AnimatedSection({ children, id, style }) {
  const [ref, vis] = useInView(0.1);
  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
