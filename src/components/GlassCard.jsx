import { useState } from "react";

export function GlassCard({ children, style, hover = true, className = "" }) {
  const [h, setH] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: h ? "rgba(139,92,246,0.06)" : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${h ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 20,
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: h ? "translateY(-4px)" : "translateY(0)",
        boxShadow: h
          ? "0 20px 60px rgba(139,92,246,0.12), 0 0 40px rgba(139,92,246,0.05)"
          : "0 4px 24px rgba(0,0,0,0.2)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
