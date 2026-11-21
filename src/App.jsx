import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Instagram, ExternalLink, Download, ChevronDown, Menu, X, Award, Briefcase, GraduationCap, Code, Database, Cloud, Brain, Terminal, Globe, Send, MapPin, Phone, Star, Eye } from "lucide-react";

// ============ DATA ============
const PROFILE_PHOTO = "/profile.webp";
const PROFILE_PHOTO_FALLBACK = "/profile.jpg";
const RESUME_URL = "/Aswin_Resume.pdf";

const ROLES = [
  "Cloud & DevOps Enthusiast",
  "Security Analyst",
  "ML & IoT Developer",
  "Data Analytics Explorer",
  "Full Stack Developer",
  "Published Researcher"
];

const PROJECTS = [
  { id: 1, title: "IoT Anti-Snoring & Bruxism System", desc: "Real-time sleep monitoring using ESP32 with multimodal sensing, BLE alerts, and threshold-based signal processing for acoustic/vibration pattern detection.", tags: ["ESP32", "C/C++", "Arduino", "BLE"], cat: "iot", color: "#06d6a0", icon: "😴" },
  { id: 2, title: "ML Used Car Price Predictor", desc: "Regression model predicting used car prices using feature engineering on brand, fuel type, and mileage data with scikit-learn.", tags: ["Python", "Scikit-learn", "Pandas", "Seaborn"], cat: "ml", color: "#f472b6", icon: "🚗" },
  { id: 3, title: "Spacecraft Anomaly Detection", desc: "AI-based anomaly detection for spacecraft telemetry using Isolation Forest with time-series preprocessing and normalization.", tags: ["Python", "NumPy", "Jupyter", "ML"], cat: "ml", color: "#60a5fa", icon: "🛰️" },
  { id: 4, title: "Acne Detection (YOLO & ML)", desc: "Computer vision model to detect and classify acne types on facial images using YOLO object detection and ML classifiers for severity assessment.", tags: ["YOLO", "Python", "OpenCV", "ML"], cat: "ml", color: "#fbbf24", icon: "🔬" },
  { id: 5, title: "Driver Drowsiness Detection", desc: "Real-time drowsiness monitoring through facial landmark analysis with OpenCV and dlib, triggering alerts to prevent accidents.", tags: ["Python", "OpenCV", "dlib", "DL"], cat: "ml", color: "#fb923c", icon: "🚨" },
  { id: 6, title: "VoiSOS – Voice SOS System", desc: "Voice-activated emergency alert system built with Flutter. Published in Springer and presented at DoSCI-2025 international conference.", tags: ["Flutter", "Dart", "Firebase", "Published"], cat: "app", color: "#ef4444", icon: "🆘" },
  { id: 7, title: "QKD-PQC Secure Communication", desc: "Hybrid quantum-secure communication framework integrating QKD with Post-Quantum Cryptography. Published in EPJ Web of Conferences.", tags: ["Quantum", "Security", "Springer", "Research"], cat: "security", color: "#8b5cf6", icon: "🔐" },
  { id: 8, title: "Real-time Fraud Prevention System", desc: "ML-powered fraud detection system that analyzes transactions in real time, flagging suspicious activity using anomaly detection algorithms.", tags: ["Python", "ML", "Pandas", "Flask"], cat: "ml", color: "#f43f5e", icon: "🛡️" },
  { id: 9, title: "Real-Time Crypto Price Tracker", desc: "Live cryptocurrency price tracker fetching real-time data from APIs with dynamic charts, alerts, and portfolio monitoring.", tags: ["JavaScript", "React", "API", "Chart.js"], cat: "web", color: "#22d3ee", icon: "📈" },
  { id: 10, title: "Air Canvas", desc: "Draw in the air using hand gestures! Uses OpenCV and MediaPipe to track fingertip movements and render drawings on a virtual canvas.", tags: ["Python", "OpenCV", "MediaPipe", "CV"], cat: "ml", color: "#a78bfa", icon: "🎨" },
  { id: 11, title: "Student Attendance via Face Recognition", desc: "Automated attendance system using face recognition to identify students in real-time, logging attendance with timestamps.", tags: ["Python", "OpenCV", "face_recognition", "SQL"], cat: "ml", color: "#34d399", icon: "📸" },
  { id: 12, title: "FlowMind — AI-Powered Workflow Automation Engine", desc: "Full-stack Spring Boot workflow automation engine with 7 configurable step types and 12 REST APIs, featuring async execution, a smart suggestion engine, live dashboard, and Docker + CI/CD pipeline.", tags: ["Java 23", "Spring Boot", "JPA", "REST API", "Docker"], cat: "web", color: "#fbbf24", icon: "⚙️" },
  { id: 13, title: "3D+Time Cell-Tracking ML Pipeline (Kaggle Biohub)", desc: "End-to-end ML pipeline tracking zebrafish cells across 3D microscopy volumes, evolving from a blob-detection baseline to a trained 3D U-Net that lifted the leaderboard score over 11% (0.782 → 0.872).", tags: ["Python", "PyTorch", "3D U-Net", "NumPy", "Data Pipelines"], cat: "ml", color: "#60a5fa", icon: "🔬" },
];

const SKILL_CATEGORIES = [
  { name: "Languages", icon: Code, skills: [{ n: "Python", l: 88 }, { n: "C / C++", l: 82 }, { n: "Java", l: 75 }, { n: "JavaScript", l: 80 }] },
  { name: "Frontend", icon: Globe, skills: [{ n: "React.js", l: 78 }, { n: "HTML5/CSS3", l: 85 }, { n: "Node.js", l: 74 }, { n: "Express.js", l: 70 }] },
  { name: "Databases", icon: Database, skills: [{ n: "MySQL", l: 80 }, { n: "MongoDB", l: 72 }, { n: "SQLite", l: 68 }] },
  { name: "DevOps & Cloud", icon: Cloud, skills: [{ n: "Linux/RHCSA", l: 82 }, { n: "Docker", l: 75 }, { n: "Git", l: 85 }, { n: "AWS", l: 65 }] },
  { name: "AI & ML", icon: Brain, skills: [{ n: "Scikit-learn", l: 80 }, { n: "OpenCV", l: 72 }, { n: "YOLO", l: 65 }, { n: "Jupyter", l: 88 }] },
  { name: "Tools", icon: Terminal, skills: [{ n: "VS Code", l: 90 }, { n: "Power BI", l: 72 }, { n: "Postman", l: 70 }, { n: "MS Office", l: 85 }] },
];

const CERTS = [ 
  { title: "AWS Certified Cloud Practitioner certification", org: "AWS", color: "#44ef8b" },
  { title: "AWS Certified AI Practitioner", org: "AWS", color: "#44ef8b" },
  { title: "AWS Certified Developer – Associate", org: "AWS", color: "#44ef8b" },
  { title: "RHCSA", org: "Red Hat", id: "250-048-659", color: "#ef4444" },
  { title: "SAP Certified Data Analyst", org: "SAP Analytics Cloud", color: "#3b82f6" },
  { title: "Intro to Machine Learning", org: "NPTEL", color: "#8b5cf6" },
  { title: "Networking & Config", org: "Cisco", color: "#06b6d4" },
  { title: "DL & ML Onramp", org: "MathWorks", color: "#f97316" },
  { title: "Data Analyst Bootcamp", org: "Udemy", color: "#a855f7" },
  { title: "Full-Stack Web Dev", org: "Udemy", color: "#a855f7" },
];

const TIMELINE = [
  { year: "Jun 2026 – Nov 2026", title: "Linux System Administration Intern", place: "Autointelli Systems Pvt. Ltd.", desc: "Working under the CTO on Linux system administration for AI/ML-focused projects at an automation-technology company, gaining hands-on exposure to production Linux environments supporting AI and ML workloads.", type: "work" },
  { year: "Jun 2025", title: "Technical Support Engineer Intern (Linux)", place: "Vectra Technosoft Pvt. Ltd.", desc: "Enterprise Linux, system stability, downtime reduction, technical support.", type: "work" },
  { year: "2025", title: "Published — VoiSOS (Springer)", place: "DoSCI-2025 International Conference", desc: "Voice-activated SOS system using Flutter — IET Lucknow, University of Delhi, University of Calabria.", type: "pub" },
  { year: "2026", title: "Published — QKD-PQC Protocol", place: "EPJ Web of Conferences (Springer)", desc: "Hybrid quantum-secure communication framework at QUICK'26 conference.", type: "pub" },
  { year: "2023–27", title: "B.Tech CSE", place: "SRM IST, Kattankulathur", desc: "Computer Science & Engineering — CGPA: 8.72/10", type: "edu" },
];

const STATS = [
  { label: "Projects Built", value: 12, suffix: "+" },
  { label: "Publications", value: 2, suffix: "" },
  { label: "Certifications", value: 10, suffix: "" },
  { label: "CGPA", value: 8.72, suffix: "", decimal: true },
];

// ============ HOOKS ============
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useCounter(end, duration = 2000, start = false, decimal = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(decimal ? parseFloat((eased * end).toFixed(1)) : Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration, decimal]);
  return val;
}

// ============ COMPONENTS ============
function Particles({ count = 50 }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -1000, y: -1000 });
  const raf = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5,
      o: Math.random() * 0.5 + 0.1,
    }));

    const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMouse);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const ps = particles.current;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        const dx = mouse.current.x - p.x;
        const dy = mouse.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x -= dx * 0.01;
          p.y -= dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.o})`;
        ctx.fill();

        for (let j = i + 1; j < ps.length; j++) {
          const dx2 = ps[j].x - p.x;
          const dy2 = ps[j].y - p.y;
          const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (d2 < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - d2 / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [count]);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }} />;
}

function CursorGlow() {
  const glowRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px";
        glowRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={glowRef} style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 1, transform: "translate(-50%,-50%)", transition: "left 0.1s ease-out, top 0.1s ease-out" }} />;
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div style={{ position: "fixed", top: 0, left: 0, height: 3, width: `${progress}%`, background: "linear-gradient(90deg, #8b5cf6, #06d6a0)", zIndex: 200, transition: "width 0.1s linear" }} />;
}

function Typewriter({ words, speed = 100, pause = 2000 }) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(word.substring(0, charIdx + 1));
        if (charIdx + 1 === word.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx(charIdx + 1);
        }
      } else {
        setText(word.substring(0, charIdx));
        if (charIdx === 0) {
          setDeleting(false);
          setWordIdx((wordIdx + 1) % words.length);
        } else {
          setCharIdx(charIdx - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return (
    <span>
      {text}<span style={{ animation: "blink 1s step-end infinite", color: "#8b5cf6", fontWeight: 300 }}>|</span>
    </span>
  );
}

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(() => setFade(true), 300); setTimeout(onDone, 800); return 100; }
        return p + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999, background: "#060611",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      opacity: fade ? 0 : 1, transition: "opacity 0.5s ease", pointerEvents: fade ? "none" : "auto"
    }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, marginBottom: 32 }}>
        <span style={{ color: "#8b5cf6" }}>{"<"}</span>
        <span style={{ color: "#e2e0ff" }}>Aswin</span>
        <span style={{ color: "#06d6a0" }}>{" />"}</span>
      </div>
      <div style={{ width: 200, height: 3, background: "rgba(139,92,246,0.15)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${Math.min(progress, 100)}%`, background: "linear-gradient(90deg, #8b5cf6, #06d6a0)", borderRadius: 10, transition: "width 0.1s" }} />
      </div>
      <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#6b5eab", marginTop: 16, letterSpacing: 3 }}>
        LOADING...
      </div>
    </div>
  );
}

function GlassCard({ children, style, hover = true, className = "" }) {
  const [h, setH] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={() => hover && setH(true)}
      onMouseLeave={() => hover && setH(false)}
      style={{
        background: h ? "rgba(139,92,246,0.06)" : "rgba(255,255,255,0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${h ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: 20,
        transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transform: h ? "translateY(-4px)" : "translateY(0)",
        boxShadow: h ? "0 20px 60px rgba(139,92,246,0.12), 0 0 40px rgba(139,92,246,0.05)" : "0 4px 24px rgba(0,0,0,0.2)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedSection({ children, id, style }) {
  const [ref, vis] = useInView(0.1);
  return (
    <section id={id} ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(50px)",
      transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      ...style,
    }}>
      {children}
    </section>
  );
}

function SkillBar({ name, level, delay, visible }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#c4b5d4" }}>
        <span>{name}</span><span style={{ color: "#8b5cf6" }}>{level}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(139,92,246,0.1)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: visible ? `${level}%` : "0%",
          background: "linear-gradient(90deg, #8b5cf6, #06d6a0)",
          borderRadius: 10, transition: `width 1.2s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const [h, setH] = useState(false);
  const [ref, visible] = useInView(0.1);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h ? "rgba(139,92,246,0.08)" : "rgba(255,255,255,0.02)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${h ? project.color + "55" : "rgba(255,255,255,0.05)"}`,
        borderRadius: 20,
        padding: "28px 24px",
        cursor: "pointer",
        transition: "all 0.4s ease",
        transform: visible ? (h ? "translateY(-8px) scale(1.01)" : "translateY(0)") : "translateY(40px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        boxShadow: h ? `0 20px 60px ${project.color}18, 0 0 30px ${project.color}08` : "0 2px 16px rgba(0,0,0,0.2)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {h && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }} />}
      <div style={{ fontSize: 36, marginBottom: 14 }}>{project.icon}</div>
      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, color: "#f0e6ff", fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{project.title}</h3>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13.5, color: "#8a7ea0", lineHeight: 1.7, marginBottom: 16 }}>{project.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map(t => (
          <span key={t} style={{ background: project.color + "15", color: project.color, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", padding: "3px 10px", borderRadius: 20, fontWeight: 500 }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

// ============ EXTRACTED COMPONENTS (hooks can't go in .map) ============
function StatBox({ stat }) {
  const [ref, vis] = useInView(0.2);
  const val = useCounter(stat.value, 2000, vis, stat.decimal);
  return (
    <div ref={ref}>
      <GlassCard style={{ padding: "24px 20px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, background: "linear-gradient(135deg, #8b5cf6, #06d6a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {val}{stat.suffix}
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#6b5eab", marginTop: 4 }}>{stat.label}</div>
      </GlassCard>
    </div>
  );
}

function TimelineItem({ item, index }) {
  const [ref, vis] = useInView(0.2);
  const iconMap = { work: Briefcase, pub: Star, edu: GraduationCap };
  const Icon = iconMap[item.type];
  return (
    <div ref={ref} style={{
      marginBottom: 28, position: "relative",
      opacity: vis ? 1 : 0, transform: vis ? "translateX(0)" : "translateX(-30px)",
      transition: `all 0.6s ease ${index * 0.15}s`,
    }}>
      <div style={{ position: "absolute", left: -32, top: 4, width: 16, height: 16, borderRadius: "50%", background: "#060611", border: "2px solid #8b5cf6", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#8b5cf6" }} />
      </div>
      <GlassCard style={{ padding: "20px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Icon size={16} style={{ color: "#8b5cf6" }} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#f0e6ff" }}>{item.title}</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#06d6a0", background: "rgba(6,214,160,0.1)", padding: "3px 10px", borderRadius: 20 }}>{item.year}</span>
        </div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#8b5cf6", marginBottom: 4 }}>{item.place}</div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13.5, color: "#7a6e96", lineHeight: 1.6 }}>{item.desc}</div>
      </GlassCard>
    </div>
  );
}

function CertItem({ cert, index }) {
  const [ref, vis] = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${index * 0.08}s` }}>
      <GlassCard style={{ padding: "20px 22px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: cert.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Award size={18} style={{ color: cert.color }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 700, color: "#f0e6ff", lineHeight: 1.35, marginBottom: 4 }}>{cert.title}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: cert.color }}>{cert.org}{cert.id ? ` · ${cert.id}` : ""}</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function PubItem({ pub, index }) {
  const [ref, vis] = useInView(0.15);
  return (
    <div ref={ref} style={{ marginBottom: 16, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(20px)", transition: `all 0.6s ease ${index * 0.15}s` }}>
      <GlassCard style={{ padding: "24px 28px", borderLeft: `3px solid ${pub.color}` }} hover={true}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, color: "#f0e6ff", lineHeight: 1.35, marginBottom: 6 }}>{pub.title}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#06d6a0", marginBottom: 8 }}>{pub.pub}</div>
        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13.5, color: "#7a6e96", lineHeight: 1.6 }}>{pub.desc}</div>
      </GlassCard>
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function Portfolio() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeNav, setActiveNav] = useState("home");
  const [projectFilter, setProjectFilter] = useState("all");
  const [skillsRef, skillsVis] = useInView(0.15);


  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "skills", "projects", "achievements", "contact"];
    const onScroll = () => {
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top < 300) { setActiveNav(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
  const NAV = ["home", "about", "skills", "projects", "achievements", "contact"];

  if (!loaded) return <LoadingScreen onDone={() => setLoaded(true)} />;

  return (
    <>
      <style>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #060611; color: #e2e0ff; overflow-x: hidden; }
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-20px) rotate(3deg); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.05); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .nav-item { font-family: 'Outfit', sans-serif; font-size: 14px; color: #6b5eab; background: none; border: none; padding: 8px 16px; cursor: pointer; transition: all 0.3s; border-radius: 30px; text-transform: capitalize; font-weight: 500; letter-spacing: 0.5px; }
        .nav-item:hover, .nav-item.active { color: #c4b5ff; background: rgba(139,92,246,0.1); }
        .section-tag { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #8b5cf6; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .section-tag::before { content: ''; width: 24px; height: 1px; background: #8b5cf6; }
        .section-heading { font-family: 'Syne', sans-serif; font-size: clamp(28px, 5vw, 48px); font-weight: 800; color: #f0e6ff; line-height: 1.15; margin-bottom: 16px; }
        .section-sub { font-family: 'Outfit', sans-serif; font-size: 16px; color: #7a6e96; line-height: 1.7; max-width: 560px; }
        .btn-primary { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600; background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: #fff; border: none; padding: 12px 28px; border-radius: 50px; cursor: pointer; transition: all 0.35s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(139,92,246,0.4), 0 0 50px rgba(139,92,246,0.15); }
        .btn-ghost { font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 500; background: transparent; color: #c4b5ff; border: 1px solid rgba(139,92,246,0.3); padding: 12px 28px; border-radius: 50px; cursor: pointer; transition: all 0.35s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-ghost:hover { background: rgba(139,92,246,0.1); border-color: #8b5cf6; transform: translateY(-2px); }
        .filter-btn { font-family: 'Outfit', sans-serif; font-size: 13px; background: rgba(255,255,255,0.03); color: #7a6e96; border: 1px solid rgba(255,255,255,0.06); padding: 8px 20px; border-radius: 30px; cursor: pointer; transition: all 0.3s; font-weight: 500; }
        .filter-btn:hover, .filter-btn.active { background: rgba(139,92,246,0.15); color: #c4b5ff; border-color: rgba(139,92,246,0.3); }
        .social-link { width: 44px; height: 44px; border-radius: 14px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; color: #7a6e96; transition: all 0.3s; cursor: pointer; text-decoration: none; }
        .social-link:hover { background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.3); color: #c4b5ff; transform: translateY(-3px); box-shadow: 0 8px 24px rgba(139,92,246,0.15); }
        .skip-link { position: fixed; top: -60px; left: 16px; z-index: 300; background: #8b5cf6; color: #fff; padding: 10px 18px; border-radius: 10px; font-family: 'Outfit', sans-serif; font-size: 14px; text-decoration: none; transition: top 0.2s; }
        .skip-link:focus { top: 12px; }
        button:focus-visible, a:focus-visible { outline: 2px solid #06d6a0; outline-offset: 3px; }
        .hamburger { display: none; }
        .hero-grid { display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 60px; max-width: 1100px; margin: 0 auto; width: 100%; }
        .hero-photo { display: flex; justify-content: center; }
        @media (max-width: 768px) {
          .hamburger { display: flex; }
          .desktop-nav { display: none !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .hero-grid > div:last-child { order: -1; }
          .hero-photo > div { width: 200px !important; height: 240px !important; }
          .hero-btns { justify-content: center !important; }
          .hero-socials { justify-content: center !important; }
        }
      `}</style>

      <a href="#main" className="skip-link">Skip to content</a>
      <Particles count={45} />
      <CursorGlow />
      <ScrollProgress />

      {/* ===== NAV ===== */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "12px 28px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrollY > 60 ? "rgba(6,6,17,0.85)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(20px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid rgba(139,92,246,0.08)" : "none",
        transition: "all 0.3s",
      }}>
        <div onClick={() => scrollTo("home")} style={{ cursor: "pointer", fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800 }}>
          <span style={{ color: "#8b5cf6" }}>{"<"}</span><span style={{ color: "#e2e0ff" }}>Aswin</span><span style={{ color: "#06d6a0" }}>{" />"}</span>
        </div>
        <div className="desktop-nav" style={{ display: "flex", gap: 4 }}>
          {NAV.map(n => <button key={n} className={`nav-item ${activeNav === n ? "active" : ""}`} onClick={() => scrollTo(n)}>{n}</button>)}
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} style={{ background: "none", border: "none", color: "#e2e0ff", cursor: "pointer", zIndex: 200, padding: 8 }}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(6,6,17,0.97)", backdropFilter: "blur(30px)", zIndex: 99, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
          {NAV.map(n => <button key={n} className="nav-item" style={{ fontSize: 22 }} onClick={() => scrollTo(n)}>{n}</button>)}
        </div>
      )}

      <main id="main" style={{ position: "relative", zIndex: 2 }}>

        {/* ===== HERO ===== */}
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
                <span style={{ color: "#7a6e96" }}>Hi, I'm</span><br />
                <span style={{ background: "linear-gradient(135deg, #8b5cf6, #06d6a0, #f472b6)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientShift 4s ease infinite" }}>Aswin</span>
              </h1>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "clamp(18px, 3vw, 24px)", color: "#7a6e96", marginBottom: 24, minHeight: 36 }}>
                <Typewriter words={ROLES} speed={80} pause={1800} />
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#5a5080", lineHeight: 1.8, maxWidth: 500, marginBottom: 36 }}>
                B.Tech CSE @ SRM IST · Building scalable solutions across Cloud, Security, ML & IoT. Published researcher with hands-on industry experience.
              </p>
              <div className="hero-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("projects")}><Eye size={16} /> View Projects</button>
                <button className="btn-ghost" onClick={() => scrollTo("contact")}><Send size={16} /> Contact Me</button>
                <a className="btn-ghost" href={RESUME_URL} download="Aswin_Resume.pdf" style={{ textDecoration: "none" }}><Download size={16} /> Resume</a>
              </div>

              <div className="hero-socials" style={{ display: "flex", gap: 12, marginTop: 32 }}>
                <a href="https://github.com/Aswin20122005" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub profile"><Github size={18} /></a>
                <a href="https://www.linkedin.com/in/aswin-s-53abbb2a8" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn profile"><Linkedin size={18} /></a>
                <a href="mailto:ashwin.20.achu@gmail.com" className="social-link" aria-label="Send an email"><Mail size={18} /></a>
                <a href="https://www.instagram.com/__ashw1n.20_?igsh=MWs0b25hZm5sNjZuaA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram profile"><Instagram size={18} /></a>
              </div>
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

          <div onClick={() => scrollTo("about")} style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", cursor: "pointer", animation: "float 3s ease-in-out infinite", color: "#6b5eab" }}>
            <ChevronDown size={28} />
          </div>
        </section>

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
            {[
              { title: "VoiSOS: Voice-based SOS System Using Flutter", pub: "Springer · DoSCI-2025", desc: "Voice-activated emergency alert system — IET Lucknow, University of Delhi, University of Calabria, Italy.", color: "#ef4444" },
              { title: "QKD-PQC Protocol for Secure Communication", pub: "EPJ Web of Conferences (Springer) · QUICK'26", desc: "Hybrid quantum-secure framework integrating QKD with Post-Quantum Cryptography against quantum threats.", color: "#8b5cf6" },
            ].map((pub, i) => (
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
                {[
                  { icon: Mail, label: "ashwin.20.achu@gmail.com", href: "mailto:ashwin.20.achu@gmail.com" },
                  { icon: Phone, label: "+91 8667803689" },
                  { icon: MapPin, label: "Chennai, India" },
                ].map(item => (
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
              <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
                <a href="https://github.com/Aswin20122005" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub profile"><Github size={18} /></a>
                <a href="https://www.linkedin.com/in/aswin-s-53abbb2a8" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn profile"><Linkedin size={18} /></a>
                <a href="mailto:ashwin.20.achu@gmail.com" className="social-link" aria-label="Send an email"><Mail size={18} /></a>
                <a href="https://www.instagram.com/__ashw1n.20_?igsh=MWs0b25hZm5sNjZuaA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram profile"><Instagram size={18} /></a>
              </div>
            </div>

          </div>
        </AnimatedSection>

        {/* ===== FOOTER ===== */}
        <footer style={{
          textAlign: "center", padding: "28px 32px",
          borderTop: "1px solid rgba(139,92,246,0.08)",
          fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "#3d3660",
        }}>
          <span style={{ color: "#8b5cf6" }}>{"<"}</span> Built by Aswin <span style={{ color: "#06d6a0" }}>{"/>"}</span> · © 2026
        </footer>
      </main>
    </>
  );
}
