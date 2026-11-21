import { AnimatedSection } from "../components/AnimatedSection";
import { SocialLinks } from "../components/SocialLinks";
import { CONTACT_INFO } from "../data/contact";

export function Contact() {
  return (
    <AnimatedSection id="contact" style={{ padding: "100px 32px 60px", maxWidth: 1100, margin: "0 auto" }}>
      <div className="section-tag">Contact</div>
      <h2 className="section-heading">Let's work<br /><span style={{ color: "#06d6a0" }}>together.</span></h2>
      <div style={{ marginTop: 36 }}>
        <div>
          <p className="section-sub" style={{ marginBottom: 32 }}>
            Open to internships, collaborations, and research opportunities in Cloud, DevOps, Security, and ML. Let's connect!
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {CONTACT_INFO.map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <item.icon size={16} style={{ color: "#8b5cf6" }} />
                </div>
                {item.href ? (
                  <a href={item.href} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#c4b5d4", textDecoration: "none" }}>{item.label}</a>
                ) : (
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "#c4b5d4" }}>{item.label}</span>
                )}
              </div>
            ))}
          </div>
          <SocialLinks gap={10} style={{ marginTop: 28 }} />
        </div>

      </div>
    </AnimatedSection>
  );
}
