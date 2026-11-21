import { GlassCard } from "./GlassCard";
import { useInView } from "../hooks/useInView";

export function PubItem({ pub, index }) {
  const [ref, vis] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{
        marginBottom: 16,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease ${index * 0.15}s`,
      }}
    >
      <GlassCard style={{ padding: "24px 28px", borderLeft: `3px solid ${pub.color}` }} hover={true}>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 16,
            fontWeight: 700,
            color: "#f0e6ff",
            lineHeight: 1.35,
            marginBottom: 6,
          }}
        >
          {pub.title}
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#06d6a0",
            marginBottom: 8,
          }}
        >
          {pub.pub}
        </div>
        <div
          style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13.5, color: "#8a7ea0", lineHeight: 1.6 }}
        >
          {pub.desc}
        </div>
      </GlassCard>
    </div>
  );
}
