import { AnimatedSection } from "../components/AnimatedSection";
import { GlassCard } from "../components/GlassCard";
import { SkillBar } from "../components/SkillBar";
import { SKILL_CATEGORIES } from "../data/skills";
import { useInView } from "../hooks/useInView";

export function Skills() {
  const [skillsRef, skillsVis] = useInView(0.15);

  return (
    <AnimatedSection id="skills" style={{ padding: "100px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="section-tag">Technical Skills</div>
      <h2 className="section-heading">
        My tech
        <br />
        <span style={{ color: "#06d6a0" }}>toolbox.</span>
      </h2>
      <p className="section-sub" style={{ marginBottom: 40 }}>
        Languages, frameworks, and tools I work with across development, cloud, and AI.
      </p>
      <div
        ref={skillsRef}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}
      >
        {SKILL_CATEGORIES.map((cat, ci) => {
          const Icon = cat.icon;
          return (
            <GlassCard key={cat.name} style={{ padding: "24px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "rgba(139,92,246,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={18} style={{ color: "#8b5cf6" }} />
                </div>
                <span
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#f0e6ff",
                  }}
                >
                  {cat.name}
                </span>
              </div>
              {cat.skills.map((s, si) => (
                <SkillBar
                  key={s.n}
                  name={s.n}
                  level={s.l}
                  delay={ci * 0.15 + si * 0.08}
                  visible={skillsVis}
                />
              ))}
            </GlassCard>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
