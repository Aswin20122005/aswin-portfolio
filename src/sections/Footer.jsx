export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        textAlign: "center",
        padding: "28px 32px",
        borderTop: "1px solid rgba(139,92,246,0.08)",
        fontFamily: "'Outfit', sans-serif",
        fontSize: 13,
        color: "#8a7ea0",
      }}
    >
      <span style={{ color: "#8b5cf6" }}>{"<"}</span> Built by Aswin{" "}
      <span style={{ color: "#06d6a0" }}>{"/>"}</span> · © {new Date().getFullYear()}
    </footer>
  );
}
