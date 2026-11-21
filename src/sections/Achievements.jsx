import { AnimatedSection } from "../components/AnimatedSection";
import { CertItem } from "../components/CertItem";
import { PubItem } from "../components/PubItem";
import { CERTS } from "../data/certifications";
import { PUBLICATIONS } from "../data/publications";

export function Achievements() {
  return (
    <AnimatedSection id="achievements" style={{ padding: "100px 32px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="section-tag">Achievements</div>
      <h2 className="section-heading">Certifications &<br /><span style={{ color: "#fbbf24" }}>credentials.</span></h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginTop: 32 }}>
        {CERTS.map((c, i) => (
          <CertItem key={c.title} cert={c} index={i} />
        ))}
      </div>

      {/* Publications */}
      <div style={{ marginTop: 56 }}>
        <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 24, fontWeight: 700, color: "#f0e6ff", marginBottom: 24 }}>Publications</h3>
        {PUBLICATIONS.map((pub, i) => (
          <PubItem key={pub.title} pub={pub} index={i} />
        ))}
      </div>
    </AnimatedSection>
  );
}
