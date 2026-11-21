import { useState } from "react";
import { AnimatedSection } from "../components/AnimatedSection";
import { ProjectCard } from "../components/ProjectCard";
import { PROJECTS } from "../data/projects";

export function Projects() {
  const [projectFilter, setProjectFilter] = useState("all");
  const filteredProjects =
    projectFilter === "all" ? PROJECTS : PROJECTS.filter((p) => p.cat === projectFilter);

  return (
    <AnimatedSection id="projects" style={{ padding: "100px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="section-tag">Projects</div>
      <h2 className="section-heading">
        Things I've
        <br />
        <span style={{ color: "#f472b6" }}>built.</span>
      </h2>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
        {[
          ["all", "All"],
          ["ml", "ML & AI"],
          ["iot", "IoT"],
          ["web", "Web"],
          ["app", "Apps"],
          ["security", "Security"],
          ["data", "Data"],
        ].map(([k, v]) => (
          <button
            key={k}
            className={`filter-btn ${projectFilter === k ? "active" : ""}`}
            onClick={() => setProjectFilter(k)}
            aria-pressed={projectFilter === k}
          >
            {v}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
        {filteredProjects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </AnimatedSection>
  );
}
