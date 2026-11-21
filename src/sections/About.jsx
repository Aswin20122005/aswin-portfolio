import { AnimatedSection } from "../components/AnimatedSection";
import { StatBox } from "../components/StatBox";
import { TimelineItem } from "../components/TimelineItem";
import { STATS } from "../data/stats";
import { TIMELINE } from "../data/timeline";

export function About() {
  return (
    <AnimatedSection id="about" style={{ padding: "100px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="section-tag">About Me</div>
      <h2 className="section-heading">Turning code into<br /><span style={{ color: "#8b5cf6" }}>real-world impact.</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginTop: 36 }}>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#8a7ea0", lineHeight: 1.85 }}>
          <p style={{ marginBottom: 16 }}>
            I'm a 4th-year Computer Science student at SRM IST with a drive for cloud infrastructure, DevOps, security, and data analytics. I've interned at Vectra Technosoft working on enterprise Linux systems and operations.
          </p>
          <p style={{ marginBottom: 16 }}>
            My project portfolio spans IoT hardware to ML models — from spacecraft anomaly detection to voice-activated SOS systems. I've published 2 research papers in Springer and presented at international conferences.
          </p>
          <p>
            I'm RHCSA, AWS and SAP certified, and always exploring new technologies across the full stack. I love solving problems that sit at the intersection of hardware, software, and data.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {STATS.map((s) => (
            <StatBox key={s.label} stat={s} />
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginTop: 64 }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, color: "#f0e6ff", marginBottom: 32 }}>Journey So Far</h3>
        <div style={{ position: "relative", paddingLeft: 32 }}>
          <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 2, background: "linear-gradient(180deg, #8b5cf6, #06d6a0, transparent)" }} />
          {TIMELINE.map((t, i) => (
            <TimelineItem key={i} item={t} index={i} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
