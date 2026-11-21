export function SkillBar({ name, level, delay, visible }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#c4b5d4" }}>
        <span>{name}</span><span style={{ color: "#8b5cf6" }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(139,92,246,0.1)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: visible ? `${level}%` : "0%",
          background: "linear-gradient(90deg, #8b5cf6, #06d6a0)",
          borderRadius: 10, transition: `width 1.2s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
        }} />
      </div>
    </div>
  );
}
