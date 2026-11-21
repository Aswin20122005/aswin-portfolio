import { ChevronDown } from "lucide-react";

export function BackToTop({ visible, onClick }) {
  if (!visible) return null;
  return (
    <button onClick={onClick} aria-label="Back to top" className="back-to-top">
      <ChevronDown size={20} style={{ transform: "rotate(180deg)" }} />
    </button>
  );
}
