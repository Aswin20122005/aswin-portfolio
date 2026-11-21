import { Award } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { useInView } from "../hooks/useInView";

export function CertItem({ cert, index }) {
  const [ref, vis] = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.5s ease ${index * 0.08}s`,
      }}
    >
      <GlassCard style={{ padding: "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: cert.color + "18",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Award size={18} style={{ color: cert.color }} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: "#f0e6ff",
                lineHeight: 1.35,
                marginBottom: 4,
              }}
            >
              {cert.title}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cert.color }}>
              {cert.org}
              {cert.id ? ` · ${cert.id}` : ""}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
