import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useInView } from "../hooks/useInView";

export function ProjectCard({ project, index }) {
  const [h, setH] = useState(false);
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${h ? project.color + "55" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 20,
        padding: "28px 24px",
        transition: "all 0.4s ease",
        transform: visible ? (h ? "translateY(-8px) scale(1.01)" : "translateY(0)") : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        boxShadow: h ? `0 20px 60px ${project.color}18, 0 0 30px ${project.color}08` : "0 2px 16px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {h && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />}
      <div style={{ fontSize: 36, marginBottom: 14 }}>{project.icon}</div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, color: "#f0e6ff", fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{project.title}</h3>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13.5, color: "#8a7ea0", lineHeight: 1.7, marginBottom: 16 }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map(t => (
          <span key={t} style={{ background: project.color + "15", color: project.color, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{t}</span>
        ))}
      </div>
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 18, fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 500, color: "#c4b5ff", textDecoration: "none" }}>
          <Github size={15} /> View code <ExternalLink size={13} />
        </a>
      )}
    </div>
  );
}
