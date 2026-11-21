import { useState, useEffect } from "react";

export function Typewriter({ words, speed = 100, pause = 2000 }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[wordIdx];
  const text = word.substring(0, charIdx);

  useEffect(() => {
    let delay = deleting ? speed / 2 : speed;
    let next;
    if (!deleting && charIdx === word.length) {
      // finished typing: wait, then start deleting
      delay = pause;
      next = () => setDeleting(true);
    } else if (deleting && charIdx === 0) {
      next = () => { setDeleting(false); setWordIdx((i) => (i + 1) % words.length); };
    } else {
      next = () => setCharIdx((c) => c + (deleting ? -1 : 1));
    }
    const t = setTimeout(next, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, word, words.length, speed, pause]);

  return (
    <span>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {text}<span style={{ animation: "blink 1s step-end infinite", color: "#8b5cf6", fontWeight: 300 }}>|</span>
      </span>
    </span>
  );
}
