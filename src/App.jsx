import { useState, useEffect, useCallback } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatedSection } from "./components/AnimatedSection";
import { CertItem } from "./components/CertItem";
import { CursorGlow } from "./components/CursorGlow";
import { GlassCard } from "./components/GlassCard";
import { LoadingScreen } from "./components/LoadingScreen";
import { Particles } from "./components/Particles";
import { ProjectCard } from "./components/ProjectCard";
import { PubItem } from "./components/PubItem";
import { ScrollProgress } from "./components/ScrollProgress";
import { SkillBar } from "./components/SkillBar";
import { SocialLinks } from "./components/SocialLinks";
import { StatBox } from "./components/StatBox";
import { TimelineItem } from "./components/TimelineItem";
import { CERTS } from "./data/certifications";
import { CONTACT_INFO } from "./data/contact";
import { NAV_SECTIONS } from "./data/navigation";
import { PROJECTS } from "./data/projects";
import { PUBLICATIONS } from "./data/publications";
import { SKILL_CATEGORIES } from "./data/skills";
import { STATS } from "./data/stats";
import { TIMELINE } from "./data/timeline";
import { useInView } from "./hooks/useInView";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { Hero } from "./sections/Hero";

// ============ MAIN COMPONENT ============
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [projectFilter, setProjectFilter] = useState("all");
  const [skillsRef, skillsVis] = useInView(0.15);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");

  // One rAF-throttled scroll listener. Only boolean/section changes trigger a
  // re-render, instead of re-rendering the whole page on every scroll event.
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setScrolled(window.scrollY > 60);
      for (const s of [...NAV_SECTIONS].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top < 300) { setActiveNav(s); break; }
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded]);

  // Lock page scroll while the mobile menu is open and let Escape close it
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProjects = projectFilter === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === projectFilter);

  const finishLoading = useCallback(() => setLoaded(true), []);

  if (!loaded) return <LoadingScreen onDone={finishLoading} />;

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      {!reducedMotion && <Particles count={hasFinePointer ? 45 : 20} />}
      {!reducedMotion && hasFinePointer && <CursorGlow />}
      <ScrollProgress />

      {/* ===== NAV ===== */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "12px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(6,6,17,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(139,92,246,0.08)" : "none",
        transition: "all 0.3s",
      }}>
        <div onClick={() => scrollTo("home")} style={{ cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800 }}>
          <span style={{ color: "#8b5cf6" }}>{"<"}</span><span style={{ color: "#e2e0ff" }}>Aswin</span><span style={{ color: "#06d6a0" }}>{" />"}</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: 4 }}>
          {NAV_SECTIONS.map(n => <button key={n} className={`nav-item ${activeNav === n ? "active" : ""}`} onClick={() => scrollTo(n)}>{n}</button>)}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} style={{ background: "none", border: "none", color: "#e2e0ff", cursor: "pointer", zIndex: 200, padding: 8 }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(6,6,17,0.97)", backdropFilter: "blur(30px)", zIndex: 99, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          {NAV_SECTIONS.map(n => <button key={n} className="nav-item" style={{ fontSize: 22 }} onClick={() => scrollTo(n)}>{n}</button>)}
        </div>
      )}

      <main id="main" style={{ position: "relative", zIndex: 2 }}>

        <Hero scrollTo={scrollTo} />

        {/* ===== ABOUT ===== */}
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

        {/* ===== SKILLS ===== */}
        <AnimatedSection id="skills" style={{ padding: "100px 32px", maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-tag">Technical Skills</div>
          <h2 className="section-heading">My tech<br /><span style={{ color: "#06d6a0" }}>toolbox.</span></h2>
          <p className="section-sub" style={{ marginBottom: 40 }}>Languages, frameworks, and tools I work with across development, cloud, and AI.</p>
          <div ref={skillsRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {SKILL_CATEGORIES.map((cat, ci) => {
              const Icon = cat.icon;
              return (
                <GlassCard key={cat.name} style={{ padding: "24px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(139,92,246,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={18} style={{ color: "#8b5cf6" }} />
                    </div>
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 15, fontWeight: 700, color: "#f0e6ff" }}>{cat.name}</span>
                  </div>
                  {cat.skills.map((s, si) => (
                    <SkillBar key={s.n} name={s.n} level={s.l} delay={ci * 0.15 + si * 0.08} visible={skillsVis} />
                  ))}
                </GlassCard>
              );
            })}
          </div>
        </AnimatedSection>

        {/* ===== PROJECTS ===== */}
        <AnimatedSection id="projects" style={{ padding: "100px 32px", maxWidth: 1100, margin: "0 auto" }}>
          <div className="section-tag">Projects</div>
          <h2 className="section-heading">Things I've<br /><span style={{ color: "#f472b6" }}>built.</span></h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 36 }}>
            {[["all", "All"], ["ml", "ML & AI"], ["iot", "IoT"], ["web", "Web"], ["app", "Apps"], ["security", "Security"]].map(([k, v]) => (
              <button key={k} className={`filter-btn ${projectFilter === k ? "active" : ""}`} onClick={() => setProjectFilter(k)}>{v}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: 20 }}>
            {filteredProjects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </AnimatedSection>

        {/* ===== ACHIEVEMENTS ===== */}
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

        {/* ===== CONTACT ===== */}
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

        {scrolled && (
          <button onClick={() => scrollTo("home")} aria-label="Back to top" className="back-to-top">
            <ChevronDown size={20} style={{ transform: "rotate(180deg)" }} />
          </button>
        )}

        {/* ===== FOOTER ===== */}
        <footer style={{
          textAlign: "center", padding: "28px 32px",
          borderTop: "1px solid rgba(139,92,246,0.08)",
          fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#8a7ea0",
        }}>
          <span style={{ color: "#8b5cf6" }}>{"<"}</span> Built by Aswin <span style={{ color: "#06d6a0" }}>{"/>"}</span> · © {new Date().getFullYear()}
        </footer>
      </main>
    </>
  );
}
