import { useState, useEffect, useCallback } from "react";
import { BackToTop } from "./components/BackToTop";
import { CursorGlow } from "./components/CursorGlow";
import { LoadingScreen } from "./components/LoadingScreen";
import { Particles } from "./components/Particles";
import { ScrollProgress } from "./components/ScrollProgress";
import { NAV_SECTIONS } from "./data/navigation";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { About } from "./sections/About";
import { Achievements } from "./sections/Achievements";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Navbar } from "./sections/Navbar";
import { Projects } from "./sections/Projects";
import { Skills } from "./sections/Skills";

// ============ MAIN COMPONENT ============
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
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
        if (el && el.getBoundingClientRect().top < 300) {
          setActiveNav(s);
          break;
        }
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, [loaded]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const finishLoading = useCallback(() => setLoaded(true), []);

  if (!loaded) return <LoadingScreen onDone={finishLoading} />;

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {!reducedMotion && <Particles count={hasFinePointer ? 45 : 20} />}
      {!reducedMotion && hasFinePointer && <CursorGlow />}
      <ScrollProgress />

      <Navbar
        scrolled={scrolled}
        activeNav={activeNav}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
      />

      <main id="main" style={{ position: "relative", zIndex: 2 }}>
        <Hero scrollTo={scrollTo} />

        <About />

        <Skills />

        <Projects />

        <Achievements />

        <Contact />
      </main>

      <Footer />
      <BackToTop visible={scrolled} onClick={() => scrollTo("home")} />
    </>
  );
}
