import { useState, useEffect } from "react";

export function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  const done = progress >= 100;

  useEffect(() => {
    if (done) return;
    const interval = setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 8 + 2));
    }, 60);
    return () => clearInterval(interval);
  }, [done]);

  // Side effects belong in an effect, not inside the setState updater
  useEffect(() => {
    if (!done) return;
    const fadeT = setTimeout(() => setFade(true), 300);
    const doneT = setTimeout(onDone, 800);
    return () => {
      clearTimeout(fadeT);
      clearTimeout(doneT);
    };
  }, [done, onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#060611",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fade ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fade ? "none" : "auto",
      }}
    >
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, marginBottom: 32 }}>
        <span style={{ color: "#8b5cf6" }}>{"<"}</span>
        <span style={{ color: "#e2e0ff" }}>Aswin</span>
        <span style={{ color: "#06d6a0" }}>{" />"}</span>
      </div>
      <div
        style={{
          width: 200,
          height: 3,
          background: "rgba(139,92,246,0.15)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(progress, 100)}%`,
            background: "linear-gradient(90deg, #8b5cf6, #06d6a0)",
            borderRadius: 10,
            transition: "width 0.1s",
          }}
        />
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: 12,
          color: "#8f84b8",
          marginTop: 16,
          letterSpacing: 3,
        }}
      >
        LOADING...
      </div>
    </div>
  );
}
