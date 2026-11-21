import { ChevronDown, Download, Eye, Send } from "lucide-react";
import { SocialLinks } from "../components/SocialLinks";
import { Typewriter } from "../components/Typewriter";
import { PROFILE_PHOTO, PROFILE_PHOTO_FALLBACK, RESUME_URL } from "../data/assets";
import { ROLES } from "../data/roles";

export function Hero({ scrollTo }) {
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 32px 80px", position: "relative", overflow: "hidden" }}>
      {/* Gradient orbs */}
      <div style={{ position: "absolute", top: "10%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", animation: "pulse 6s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,214,160,0.08) 0%, transparent 70%)", animation: "pulse 8s ease-in-out 2s infinite", pointerEvents: "none" }} />

      <div className="hero-grid">
        <div style={{ animation: "fadeUp 0.8s ease-out" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: "#06d6a0", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#06d6a0", display: "inline-block", animation: "pulse 2s infinite" }} />
            Available for opportunities
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 8 }}>
            <span style={{ color: "#8a7ea0" }}>Hi, I'm</span><br />
            <span style={{ background: "linear-gradient(135deg, #8b5cf6, #06d6a0, #f472b6)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientShift 4s ease infinite" }}>Aswin</span>
          </h1>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(18px, 3vw, 24px)", color: "#8a7ea0", marginBottom: 24, minHeight: 36 }}>
            <Typewriter words={ROLES} speed={80} pause={1800} />
          </div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#8a7ea0", lineHeight: 1.8, maxWidth: 500, marginBottom: 36 }}>
            B.Tech CSE @ SRM IST · Building scalable solutions across Cloud, Security, ML & IoT. Published researcher with hands-on industry experience.
          </p>
          <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")}><Eye size={16} /> View Projects</button>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}><Send size={16} /> Contact Me</button>
            <a className="btn-ghost" href={RESUME_URL} download="Aswin_Resume.pdf" style={{ textDecoration: "none" }}><Download size={16} /> Resume</a>
          </div>

          <SocialLinks className="hero-socials" style={{ marginTop: 32 }} />
        </div>

        <div className="hero-photo" style={{ animation: "fadeUp 1s ease-out 0.3s both" }}>
          <div style={{
            width: 300, height: 360, borderRadius: 24, position: "relative",
            background: "linear-gradient(135deg, #8b5cf6, #06d6a0)",
            padding: 3, animation: "float 6s ease-in-out infinite",
          }}>
            <div style={{
              width: "100%", height: "100%", borderRadius: 22,
              overflow: "hidden", position: "relative",
            }}>
              <picture style={{ display: "block", width: "100%", height: "100%" }}>
                <source srcSet={PROFILE_PHOTO} type="image/webp" />
                <img src={PROFILE_PHOTO_FALLBACK} alt="Portrait of Aswin" width={300} height={360} decoding="async" fetchpriority="high" style={{
                width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top",
                filter: "grayscale(20%) contrast(1.05)",
              }} />
              </picture>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "40%",
                background: "linear-gradient(transparent, rgba(6,6,17,0.8))",
              }} />
            </div>
            <div style={{ position: "absolute", top: -10, right: -10, width: 52, height: 52, borderRadius: "50%", background: "linear-gradient(135deg, #8b5cf6, #7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 4px 20px rgba(139,92,246,0.5)", border: "3px solid #060611" }}>
              👋
            </div>
            <div style={{ position: "absolute", bottom: -8, left: -8, width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #06d6a0, #059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 4px 20px rgba(6,214,160,0.4)", border: "3px solid #060611" }}>
              💻
            </div>
          </div>
        </div>
      </div>

      <div onClick={() => scrollTo("about")} style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", cursor: "pointer", animation: "float 3s ease-in-out infinite", color: "#8f84b8" }}>
        <ChevronDown size={28} />
      </div>
    </section>
  );
}
