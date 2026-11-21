import { Briefcase, GraduationCap, Star } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { useInView } from "../hooks/useInView";

export function TimelineItem({ item, index }) {
  const [ref, vis] = useInView(0.2);
  const iconMap = { work: Briefcase, pub: Star, edu: GraduationCap };
  const Icon = iconMap[item.type];
  return (
    <div ref={ref} style={{
      marginBottom: 28, position: "relative",
      opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-30px)",
      transition: `all 0.6s ease ${index * 0.15}s`,
    }}>
      <div style={{ position: "absolute", left: -32, top: 4, width: 16, height: 16, borderRadius: "50%", background: "#060611", border: "2px solid #8b5cf6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6" }} />
      </div>
      <GlassCard style={{ padding: "20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon size={16} style={{ color: "#8b5cf6" }} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#f0e6ff" }}>{item.title}</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#06d6a0", background: "rgba(6,214,160,0.1)", padding: "3px 10px", borderRadius: 20 }}>{item.year}</span>
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#8b5cf6", marginBottom: 4 }}>{item.place}</div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13.5, color: "#8a7ea0", lineHeight: 1.6 }}>{item.desc}</div>
      </GlassCard>
    </div>
  );
}
