import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current) barRef.current.style.transform = `scaleX(${h > 0 ? window.scrollY / h : 0})`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return <div ref={barRef} aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, height: 3, width: "100%", transform: "scaleX(0)", transformOrigin: "0 50%", background: "linear-gradient(90deg, #8b5cf6, #06d6a0)", zIndex: 200 }} />;
}
