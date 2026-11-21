import { GlassCard } from "./GlassCard";
import { useCounter } from "../hooks/useCounter";
import { useInView } from "../hooks/useInView";

export function StatBox({ stat }) {
  const [ref, vis] = useInView(0.2);
  const val = useCounter(stat.value, 2000, vis, stat.decimal);
  return (
    <div ref={ref}>
      <GlassCard style={{ padding: "24px 20px", textAlign: "center" }}>
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 36,
            fontWeight: 800,
            background: "linear-gradient(135deg, #8b5cf6, #06d6a0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {val}
          {stat.suffix}
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#8f84b8", marginTop: 4 }}>
          {stat.label}
        </div>
      </GlassCard>
    </div>
  );
}
