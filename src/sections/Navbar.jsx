import { useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_SECTIONS } from "../data/navigation";

export function Navbar({ scrolled, activeNav, menuOpen, setMenuOpen, scrollTo }) {
  // Lock page scroll while the mobile menu is open and let Escape close it
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [menuOpen, setMenuOpen]);

  return (
    <>
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
    </>
  );
}
