import { useState, useEffect, useRef } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────
const resume = {
  name: "Madhur Pathak",
  contact: {
    phone: "+91 8960629039",
    email: "madhurpathak000@gmail.com",
    linkedin: "#",
    github: "#",
  },
  summary:
    "Full-Stack Developer with hands-on production experience in React.js, Next.js, Java, and AWS — including serverless architecture with Lambda, API Gateway, and DynamoDB (GSI). Built and scaled real-world healthcare and energy monitoring platforms.",
  experience: [
    {
      id: "exp1",
      company: "AlgoFlowAI",
      role: "FullStack Software Developer",
      project: "Medics AI",
      period: "Oct 2025 – Present",
      location: "Bangalore, IN",
      type: "fulltime",
      bullets: [
        "Developed and scaled a production-grade healthcare platform using React.js, Next.js (App Router), and Tailwind CSS, improving critical UI workflows by 40%.",
        "Designed reusable frontend architecture with custom hooks + Context API, reducing prop drilling and increasing code reuse by 50%.",
        "Built real-time analytics dashboards and complete CRUD flows using Recharts and modern UI patterns.",
        "Led development of a serverless backend in Java, architecting 15+ AWS Lambda functions and scalable REST APIs using API Gateway + DynamoDB (GSI), reducing latency by up to 50%.",
        "Implemented secure authentication and RBAC using JWT + Twilio OTP, improving reliability and reducing auth-related failures by 35%.",
        "Deployed and optimized cloud infrastructure on AWS, achieving <1s API response time under concurrent load.",
      ],
      tags: ["React.js", "Next.js", "Java", "AWS Lambda", "DynamoDB", "JWT"],
    },
    {
      id: "exp2",
      company: "AlgoFlowAI",
      role: "Frontend Developer Intern",
      project: "Enream Project",
      period: "Jun 2025 – Sep 2025",
      location: "Remote",
      type: "intern",
      bullets: [
        "Took end-to-end ownership of core energy monitoring features, delivering complete solutions from Next.js/React UI to real-time API integration.",
        "Engineered performant, asynchronous data flows for real-time dashboards, improving system responsiveness by 30%.",
        "Architected a scalable, modular frontend using modern React patterns, custom hooks, Context API, and Tailwind CSS across 30+ components.",
      ],
      tags: ["React.js", "Next.js", "Tailwind CSS", "Context API"],
    },
  ],
  skills: {
    Languages: { items: ["JavaScript", "TypeScript", "Java"], color: "#00ff88", icon: "{ }" },
    Frontend: { items: ["React.js", "Next.js", "Redux", "Tailwind", "Material UI", "Radix UI", "ShadCN"], color: "#00d4ff", icon: "</>" },
    "Backend/Cloud": { items: ["Java", "Node.js", "Spring Boot", "REST APIs", "AWS", "JWT Auth"], color: "#ff6b35", icon: "☁" },
    Tools: { items: ["Git", "GitHub", "Postman", "VS Code", "Figma"], color: "#a855f7", icon: "⚙" },
  },
  projects: [
    {
      id: "proj1",
      name: "HiredHub",
      subtitle: "AI-Powered Job Portal",
      github: "#",
      demo: "#",
      bullets: [
        "Engineered a comprehensive AI-powered job portal using React, Tailwind CSS and Supabase (PostgreSQL) for backend services.",
        "Integrated Gemini AI API to build an intelligent candidate shortlisting system, reducing screening time by 60%.",
        "Implemented job listings, search & filtering, pagination, file uploads, rich text descriptions, and role-based access.",
      ],
      tags: ["React", "Tailwind CSS", "Supabase", "Gemini AI", "PostgreSQL"],
    },
  ],
  education: [
    { degree: "Master of Computer Applications (MCA)", institution: "Maharana Pratap College of Technology, Gwalior", period: "Aug 2023 – Jul 2025" },
    { degree: "Bachelor of Computer Applications (BCA)", institution: "Bundelkhand University, Jhansi", period: "Jul 2017 – Jun 2020" },
  ],
};

// ─── GLOBAL STYLES (injected once) ─────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Share+Tech+Mono&family=DM+Sans:wght@400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    ::-webkit-scrollbar{width:4px}
    ::-webkit-scrollbar-track{background:#06060a}
    ::-webkit-scrollbar-thumb{background:#00ff8840;border-radius:2px}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
    @keyframes scrollLine{0%,100%{transform:scaleY(1);opacity:1}50%{transform:scaleY(0.3);opacity:0.2}}
    @keyframes pulse{0%,100%{opacity:0.6}50%{opacity:1}}
    @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
    @keyframes codeFade{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
    @keyframes lineGrow{from{width:0}to{width:100%}}
  `}</style>
);

// ─── SECTION LABEL ──────────────────────────────────────────────────────────
const SL = ({ n, label }) => (
  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "#00ff88", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.7rem", opacity: 0.65 }}>
    // {String(n).padStart(2, "0")} / {label}
  </div>
);

const SectionTitle = ({ main, ghost }) => (
  <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.9rem, 5vw, 3.4rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "3rem", lineHeight: 1.05 }}>
    {main}{" "}
    <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)", color: "transparent" }}>{ghost}</span>
  </h2>
);

const Divider = () => (
  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(0,255,136,0.18), transparent)" }} />
);

// ─── TYPEWRITER ─────────────────────────────────────────────────────────────
const PHRASES = ["Full-Stack Developer", "React / Next.js Engineer", "Java + AWS Architect", "UI Performance Nerd", "Serverless Builder"];
function TypeWriter() {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [pause, setPause] = useState(false);
  useEffect(() => {
    if (pause) { const t = setTimeout(() => setPause(false), 1400); return () => clearTimeout(t); }
    const current = PHRASES[phraseIdx];
    const speed = deleting ? 42 : 78;
    const t = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) { setPause(true); setDeleting(true); }
      } else {
        setText(text.slice(0, -1));
        if (text.length === 0) { setDeleting(false); setPhraseIdx((i) => (i + 1) % PHRASES.length); }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, pause, phraseIdx]);
  return (
    <span style={{ color: "#00ff88", fontFamily: "'Share Tech Mono', monospace", fontSize: "clamp(1rem, 2.5vw, 1.4rem)" }}>
      {text}
      <span style={{ display: "inline-block", width: "3px", height: "1em", background: "#00ff88", verticalAlign: "middle", marginLeft: "3px", animation: "blink 0.9s steps(1) infinite" }} />
    </span>
  );
}

// ─── NAVBAR ─────────────────────────────────────────────────────────────────
const NAV_LINKS = ["about", "experience", "skills", "projects", "education"];
function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: "62px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(1rem, 6vw, 5rem)", background: scrolled ? "rgba(6,6,10,0.93)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(0,255,136,0.1)" : "none", transition: "all 0.3s" }}>
      <div onClick={() => go("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff88", fontSize: "1.05rem" }}>&gt;_ MP</span>
        <span style={{ width: 7, height: 15, background: "#00ff88", display: "inline-block", animation: "blink 1.1s steps(1) infinite" }} />
      </div>
      <div style={{ display: "flex", gap: "1.8rem" }}>
        {NAV_LINKS.map((l) => (
          <button key={l} onClick={() => go(l)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: active === l ? "#00ff88" : "rgba(255,255,255,0.4)", borderBottom: active === l ? "1px solid #00ff88" : "1px solid transparent", paddingBottom: "2px", transition: "color 0.2s" }}>{l}</button>
        ))}
      </div>
    </nav>
  );
}

// ─── CODE PANEL (right side of hero) ─────────────────────────────────────────
function CodePanel() {
  const lines = [
    { indent: 0, tokens: [{ c: "rgba(255,255,255,0.2)", t: "// madhur.config.js" }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [{ c: "#a855f7", t: "const " }, { c: "#00d4ff", t: "developer" }, { c: "#fff", t: " = {" }] },
    { indent: 1, tokens: [{ c: "#00ff88", t: "name" }, { c: "#fff", t: ": " }, { c: "#ff6b35", t: '"Madhur Pathak"' }, { c: "#fff", t: "," }] },
    { indent: 1, tokens: [{ c: "#00ff88", t: "role" }, { c: "#fff", t: ": " }, { c: "#ff6b35", t: '"Full-Stack Developer"' }, { c: "#fff", t: "," }] },
    { indent: 1, tokens: [{ c: "#00ff88", t: "stack" }, { c: "#fff", t: ": [" }, { c: "#ff6b35", t: '"React"' }, { c: "#fff", t: ", " }, { c: "#ff6b35", t: '"Next.js"' }, { c: "#fff", t: ", " }, { c: "#ff6b35", t: '"Java"' }, { c: "#fff", t: ", " }, { c: "#ff6b35", t: '"AWS"' }, { c: "#fff", t: "]," }] },
    { indent: 0, tokens: [] },
    { indent: 1, tokens: [{ c: "#00ff88", t: "experience" }, { c: "#fff", t: ": {" }] },
    { indent: 2, tokens: [{ c: "#00d4ff", t: "years" }, { c: "#fff", t: ": " }, { c: "#ff6b35", t: "1" }, { c: "#fff", t: "," }] },
    { indent: 2, tokens: [{ c: "#00d4ff", t: "type" }, { c: "#fff", t: ": " }, { c: "#ff6b35", t: '"production"' }, { c: "#fff", t: "," }] },
    { indent: 2, tokens: [{ c: "#00d4ff", t: "domain" }, { c: "#fff", t: ": [" }, { c: "#ff6b35", t: '"healthcare"' }, { c: "#fff", t: ", " }, { c: "#ff6b35", t: '"energy"' }, { c: "#fff", t: "]," }] },
    { indent: 1, tokens: [{ c: "#fff", t: "}," }] },
    { indent: 0, tokens: [] },
    { indent: 1, tokens: [{ c: "#00ff88", t: "passion" }, { c: "#fff", t: ": " }, { c: "#ff6b35", t: '"fullstack"' }, { c: "#fff", t: "," }] },
    { indent: 1, tokens: [{ c: "#00ff88", t: "coffee" }, { c: "#fff", t: ": " }, { c: "#00d4ff", t: "Infinity" }, { c: "#fff", t: "," }] },
    { indent: 1, tokens: [{ c: "#00ff88", t: "available" }, { c: "#fff", t: ": " }, { c: "#00d4ff", t: "true" }, { c: "#fff", t: "," }] },
    { indent: 1, tokens: [{ c: "#00ff88", t: "location" }, { c: "#fff", t: ": " }, { c: "#ff6b35", t: '"Bangalore, IN 🇮🇳"' }, { c: "#fff", t: "," }] },
    { indent: 0, tokens: [{ c: "#fff", t: "};" }] },
    { indent: 0, tokens: [] },
    { indent: 0, tokens: [{ c: "rgba(255,255,255,0.2)", t: "// current mission" }] },
    { indent: 0, tokens: [{ c: "#a855f7", t: "export default" }, { c: "#fff", t: " " }, { c: "#00d4ff", t: "developer" }, { c: "#fff", t: ";" }] },
  ];

  return (
    <div style={{ position: "relative", animation: "codeFade 0.9s ease 0.5s both", flexShrink: 0 }}>
      {/* Window chrome */}
      <div style={{ border: "1px solid rgba(0,255,136,0.18)", background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)", overflow: "hidden" }}>
        {/* Title bar */}
        <div style={{ background: "rgba(0,255,136,0.05)", borderBottom: "1px solid rgba(0,255,136,0.12)", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57", "#ffbd2e", "#28c940"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.7 }} />)}
          </div>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginLeft: 8, letterSpacing: "0.1em" }}>madhur.config.js</span>
          <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
            {["tsx", "git", "✓"].map((lbl, i) => (
              <span key={i} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.55rem", color: i === 2 ? "#00ff88" : "rgba(255,255,255,0.2)", background: i === 2 ? "rgba(0,255,136,0.1)" : "transparent", padding: "2px 6px", border: "1px solid", borderColor: i === 2 ? "rgba(0,255,136,0.3)" : "transparent" }}>{lbl}</span>
            ))}
          </div>
        </div>

        {/* Code body */}
        <div style={{ padding: "1.2rem 0", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.8rem", lineHeight: 1.85, minWidth: 380 }}>
          {lines.map((line, li) => (
            <div key={li} style={{ display: "flex", alignItems: "center", paddingLeft: "0", animation: `fadeUp 0.4s ease ${0.6 + li * 0.04}s both` }}>
              {/* Line number */}
              <span style={{ color: "rgba(255,255,255,0.12)", fontSize: "0.65rem", minWidth: "2.8rem", textAlign: "right", paddingRight: "1.2rem", userSelect: "none" }}>{li + 1}</span>
              {/* Left border accent for active lines */}
              <div style={{ width: 2, alignSelf: "stretch", background: li === 7 || li === 8 || li === 9 || li === 10 || li === 11 ? "rgba(0,255,136,0.25)" : "transparent", marginRight: "0.8rem", flexShrink: 0 }} />
              {/* Tokens */}
              <span style={{ paddingLeft: `${line.indent * 1.4}rem` }}>
                {line.tokens.map((tok, ti) => (
                  <span key={ti} style={{ color: tok.c }}>{tok.t}</span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* Status bar */}
        <div style={{ borderTop: "1px solid rgba(0,255,136,0.1)", background: "rgba(0,255,136,0.04)", padding: "5px 16px", display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {[["⎇", "main", "#00ff88"], ["✦", "JS", "rgba(255,255,255,0.3)"], ["◉", "Ln 21", "rgba(255,255,255,0.3)"], ["●", "UTF-8", "rgba(255,255,255,0.3)"]].map(([icon, lbl, col]) => (
            <span key={lbl} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: col, display: "flex", alignItems: "center", gap: 4 }}>
              <span>{icon}</span><span>{lbl}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Floating badges around the panel */}
      <div style={{ position: "absolute", top: -14, right: -14, background: "#00ff88", color: "#06060a", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", padding: "5px 12px", letterSpacing: "0.1em", fontWeight: 700, animation: "floatY 3s ease infinite" }}>
        AVAILABLE
      </div>
      <div style={{ position: "absolute", bottom: 40, right: -18, background: "rgba(0,0,0,0.8)", border: "1px solid rgba(168,85,247,0.4)", color: "#a855f7", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", padding: "5px 12px", letterSpacing: "0.08em", animation: "floatY 4s ease 1s infinite" }}>
        &lt;1s API response
      </div>
      <div style={{ position: "absolute", bottom: -14, left: 20, background: "rgba(0,0,0,0.8)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", padding: "5px 12px", animation: "floatY 3.5s ease 0.5s infinite" }}>
        15+ Lambda functions
      </div>
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ctx = canvas.getContext("2d");
    const cols = Math.floor(canvas.width / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -60);
    const chars = "01アイウエオ</>{}[]#@!%^";
    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(6,6,10,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,255,136,0.13)";
      ctx.font = "12px 'Share Tech Mono', monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5;
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px clamp(1.5rem, 6vw, 6rem) 4rem", position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.45 }} />

      {/* Two-column layout */}
      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr auto", gap: "4rem", alignItems: "center", width: "100%" }}>

        {/* LEFT — text content */}
        <div style={{ maxWidth: 620 }}>
          {/* Init label */}
          <p style={{ fontFamily: "'Share Tech Mono', monospace", color: "#00ff88", fontSize: "0.75rem", letterSpacing: "0.28em", marginBottom: "1.4rem", opacity: 0.8, animation: "fadeUp 0.6s ease both" }}>
            // HELLO WORLD — INITIALIZING...
          </p>

          {/* Name */}
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem, 6.5vw, 6.2rem)", lineHeight: 0.95, letterSpacing: "-0.035em", color: "#fff", marginBottom: "1.1rem", animation: "fadeUp 0.7s ease 0.1s both" }}>
            <span style={{ display: "block", WebkitTextStroke: "1px rgba(255,255,255,0.13)", color: "transparent", fontSize: "clamp(1.8rem, 4.5vw, 4.2rem)", fontWeight: 700, marginBottom: "0.1em" }}>
              {resume.name.split(" ")[0]}
            </span>
            {resume.name.split(" ")[1]}
          </h1>

          {/* Typewriter role */}
          <div style={{ marginBottom: "0.9rem", animation: "fadeUp 0.7s ease 0.2s both", minHeight: "2rem" }}>
            <TypeWriter />
          </div>

          {/* Stack line */}
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", marginBottom: "1.6rem", animation: "fadeUp 0.7s ease 0.25s both", lineHeight: 1.6 }}>
            <span style={{ color: "rgba(0,255,136,0.5)" }}>Full-Stack Developer</span>
            <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>|</span>
            <span>React · Next.js · Java · Spring Boot · AWS</span>
            <span style={{ color: "rgba(255,255,255,0.2)", margin: "0 8px" }}>|</span>
            <span>UI to Cloud · End-to-End</span>
          </div>

          {/* Exp badge row */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.8rem", animation: "fadeUp 0.7s ease 0.3s both", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.2)", padding: "6px 14px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00ff88", animation: "pulse 1.5s ease infinite" }} />
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", color: "#00ff88", letterSpacing: "0.1em" }}>1+ yr production experience</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.2)", padding: "6px 14px" }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", color: "#a855f7", letterSpacing: "0.08em" }}>Healthcare &amp; Energy platforms</span>
            </div>
          </div>

          {/* Summary */}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.86rem, 1.6vw, 0.97rem)", color: "rgba(255,255,255,0.48)", lineHeight: 1.9, marginBottom: "2.4rem", animation: "fadeUp 0.7s ease 0.35s both" }}>
            {resume.summary}
          </p>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.45s both" }}>
            <button onClick={() => go("experience")} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.73rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#06060a", background: "#00ff88", border: "none", padding: "13px 26px", cursor: "pointer", clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#00cc6a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#00ff88"; e.currentTarget.style.transform = "none"; }}>
              View Work
            </button>
            <a href={`mailto:${resume.contact.email}`} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.73rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00ff88", background: "transparent", border: "1px solid rgba(0,255,136,0.35)", padding: "13px 26px", textDecoration: "none", clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))", transition: "all 0.2s", display: "inline-block" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ff88"; e.currentTarget.style.background = "rgba(0,255,136,0.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.35)"; e.currentTarget.style.background = "transparent"; }}>
              Contact Me
            </a>
            <a href={resume.contact.github} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.73rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", padding: "13px 20px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
              GitHub ↗
            </a>
          </div>
        </div>

        {/* RIGHT — code panel */}
        <CodePanel />
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, animation: "fadeUp 1s ease 1s both" }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.52rem", color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em" }}>SCROLL</span>
        <div style={{ width: 1, height: 44, background: "linear-gradient(to bottom, rgba(0,255,136,0.5), transparent)", animation: "scrollLine 2s ease infinite" }} />
      </div>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────────────
function About() {
  const facts = [
    ["◈", "Currently at", "AlgoFlowAI, Bangalore"],
    ["◈", "Specialization", "React · Next.js · Java · AWS"],
    ["◈", "Education", "MCA — MPCT Gwalior"],
    ["◈", "Status", "Open to opportunities"],
  ];
  return (
    <section id="about" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,8vw,7rem)", position: "relative" }}>
      <Divider />
      <SL n={1} label="about" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
        <div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,5vw,3.4rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "1.5rem", lineHeight: 1.05 }}>
            Building the <span style={{ color: "#00ff88" }}>Future</span>,<br />
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)", color: "transparent" }}>One Function</span> at a Time.
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.97rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.9, marginBottom: "1.2rem" }}>
            I'm a Full-Stack Developer living at the intersection of great UI and solid backend architecture. From serverless microservices on AWS to pixel-perfect React dashboards — I ship things that actually work in production.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.97rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.9 }}>
            Currently scaling a healthcare platform at AlgoFlowAI. When I'm not writing code, I'm thinking about performance, developer experience, and making complex systems feel simple.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
          {facts.map(([icon, label, value]) => (
            <div key={label} style={{ border: "1px solid rgba(0,255,136,0.1)", padding: "1.1rem 1.4rem", background: "rgba(255,255,255,0.01)", display: "flex", alignItems: "center", gap: "1rem", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.3)"; e.currentTarget.style.background = "rgba(0,255,136,0.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.01)"; }}>
              <span style={{ color: "#00ff88", fontSize: "1rem", flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>{label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "rgba(255,255,255,0.8)" }}>{value}</div>
              </div>
            </div>
          ))}
          <div style={{ border: "1px solid rgba(0,255,136,0.1)", padding: "1.2rem 1.5rem", background: "rgba(0,0,0,0.4)", fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", lineHeight: 1.85 }}>
            <div style={{ color: "rgba(255,255,255,0.2)", marginBottom: 4 }}>// madhur.config.js</div>
            <div><span style={{ color: "#a855f7" }}>const</span> <span style={{ color: "#00d4ff" }}>dev</span> = {"{"}</div>
            <div style={{ paddingLeft: "1rem" }}><span style={{ color: "#00ff88" }}>passion</span>: <span style={{ color: "#ff6b35" }}>"fullstack"</span>,</div>
            <div style={{ paddingLeft: "1rem" }}><span style={{ color: "#00ff88" }}>coffee</span>: <span style={{ color: "#ff6b35" }}>Infinity</span>,</div>
            <div style={{ paddingLeft: "1rem" }}><span style={{ color: "#00ff88" }}>available</span>: <span style={{ color: "#00d4ff" }}>true</span>,</div>
            <div>{"}"}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────
function ExpCard({ exp, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: "1px solid rgba(0,255,136,0.12)", background: open ? "rgba(0,255,136,0.02)" : "rgba(255,255,255,0.01)", transition: "all 0.3s", position: "relative", overflow: "hidden" }}>
      {exp.type === "fulltime" && <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: "linear-gradient(to bottom, #00ff88, rgba(0,255,136,0.15))" }} />}
      <div onClick={() => setOpen(!open)} style={{ padding: "1.4rem 1.8rem", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.4rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: "#fff" }}>{exp.role}</span>
            {exp.type === "fulltime" && <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "#06060a", background: "#00ff88", padding: "2px 8px", letterSpacing: "0.1em" }}>CURRENT</span>}
          </div>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "#00ff88", opacity: 0.8 }}>{exp.company} — {exp.project}</span>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.28)" }}>{exp.period} · {exp.location}</span>
          </div>
        </div>
        <div style={{ width: 26, height: 26, border: "1px solid rgba(0,255,136,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#00ff88", fontFamily: "monospace", fontSize: "1rem", transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none" }}>+</div>
      </div>
      <div style={{ maxHeight: open ? "700px" : 0, overflow: "hidden", transition: "max-height 0.4s ease" }}>
        <div style={{ padding: "0 1.8rem 1.5rem" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.2rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {exp.bullets.map((b, i) => (
              <li key={i} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.86rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.75, paddingLeft: "1.2rem", position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#00ff88" }}>▸</span>{b}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {exp.tags.map(t => <span key={t} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.62rem", color: "#00ff88", border: "1px solid rgba(0,255,136,0.25)", padding: "3px 10px", background: "rgba(0,255,136,0.04)" }}>{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
function Experience() {
  return (
    <section id="experience" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,8vw,7rem)", position: "relative" }}>
      <Divider />
      <SL n={2} label="experience" />
      <SectionTitle main="Work" ghost="History" />
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {resume.experience.map((e, i) => <ExpCard key={e.id} exp={e} defaultOpen={i === 0} />)}
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,8vw,7rem)", position: "relative" }}>
      <Divider />
      <SL n={3} label="skills" />
      <SectionTitle main="Tech" ghost="Stack" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "rgba(0,255,136,0.04)" }}>
        {Object.entries(resume.skills).map(([cat, { items, color, icon }]) => (
          <div key={cat} style={{ border: "1px solid rgba(255,255,255,0.06)", padding: "1.7rem", background: "rgba(255,255,255,0.01)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 38, height: 38, borderLeft: `1px solid ${color}40`, borderBottom: `1px solid ${color}40` }} />
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1.3rem" }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "1rem", color }}>{icon}</span>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#fff" }}>{cat}</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
              {items.map(s => (
                <span key={s} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.74rem", color, border: `1px solid ${color}28`, background: `${color}07`, padding: "5px 13px", transition: "all 0.2s", cursor: "default" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${color}07`; e.currentTarget.style.transform = "none"; }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,8vw,7rem)", position: "relative" }}>
      <Divider />
      <SL n={4} label="projects" />
      <SectionTitle main="Featured" ghost="Projects" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1px", background: "rgba(0,255,136,0.04)" }}>
        {resume.projects.map((p, i) => (
          <div key={p.id} style={{ border: "1px solid rgba(0,255,136,0.12)", background: "rgba(0,0,0,0.3)", padding: "2.2rem", position: "relative", overflow: "hidden", transition: "all 0.3s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.35)"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "rgba(0,255,136,0.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.12)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.background = "rgba(0,0,0,0.3)"; }}>
            <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem", fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "5rem", color: "rgba(0,255,136,0.04)", lineHeight: 1, userSelect: "none" }}>{String(i + 1).padStart(2, "0")}</div>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(to right, #00ff88, transparent)" }} />
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "#00ff88", letterSpacing: "0.25em", marginBottom: "0.6rem", opacity: 0.65 }}>// FEATURED PROJECT</div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#fff", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>{p.name}</h3>
            <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.75rem", color: "#00ff88", marginBottom: "1.3rem", opacity: 0.8 }}>{p.subtitle}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.4rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {p.bullets.map((b, bi) => (
                <li key={bi} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.58)", lineHeight: 1.75, paddingLeft: "1.2rem", position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#00ff88" }}>▸</span>{b}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "1.8rem" }}>
              {p.tags.map(t => <span key={t} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(0,255,136,0.65)", border: "1px solid rgba(0,255,136,0.18)", padding: "2px 9px" }}>{t}</span>)}
            </div>
            <div style={{ display: "flex", gap: "0.8rem" }}>
              {[["&lt;/&gt; SOURCE", p.github, "transparent", "#00ff88"], ["↗ LIVE DEMO", p.demo, "#00ff88", "#06060a"]].map(([lbl, href, bg, col]) => (
                <a key={lbl} href={href} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", letterSpacing: "0.15em", color: col, background: bg, textDecoration: "none", padding: "8px 16px", border: bg === "transparent" ? "1px solid rgba(0,255,136,0.3)" : "none", transition: "all 0.2s" }}
                  dangerouslySetInnerHTML={{ __html: lbl }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,8vw,7rem)", position: "relative" }}>
      <Divider />
      <SL n={5} label="education" />
      <SectionTitle main="Academic" ghost="Background" />
      <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
        {resume.education.map((ed, i) => (
          <div key={i} style={{ border: "1px solid rgba(0,255,136,0.1)", padding: "1.6rem 1.8rem", background: "rgba(255,255,255,0.01)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", transition: "all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.28)"; e.currentTarget.style.paddingLeft = "2.3rem"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(0,255,136,0.1)"; e.currentTarget.style.paddingLeft = "1.8rem"; }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: "0.25rem" }}>{ed.degree}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.72rem", color: "#00ff88", opacity: 0.75 }}>{ed.institution}</div>
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.28)", whiteSpace: "nowrap" }}>{ed.period}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const links = [
    ["Email", resume.contact.email, `mailto:${resume.contact.email}`],
    ["LinkedIn", "linkedin.com/in/madhurpathak", resume.contact.linkedin],
    ["GitHub", "github.com/madhurpathak", resume.contact.github],
    ["Phone", resume.contact.phone, `tel:${resume.contact.phone}`],
  ];
  return (
    <section id="contact" style={{ padding: "clamp(4rem,10vw,8rem) clamp(1.5rem,8vw,7rem)", position: "relative", textAlign: "center" }}>
      <Divider />
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 200, background: "radial-gradient(ellipse, rgba(0,255,136,0.05) 0%, transparent 70%)", filter: "blur(30px)", pointerEvents: "none" }} />
      <SL n={6} label="contact" />
      <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.5rem,6vw,5rem)", letterSpacing: "-0.03em", color: "#fff", marginBottom: "1rem" }}>
        Let's <span style={{ color: "#00ff88" }}>Connect</span>
      </h2>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.97rem", color: "rgba(255,255,255,0.42)", marginBottom: "3.5rem", maxWidth: 460, margin: "0 auto 3.5rem", lineHeight: 1.85 }}>
        Open to full-time roles, freelance work, or just a great conversation about code.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "rgba(0,255,136,0.06)", maxWidth: 800, margin: "0 auto 3rem" }}>
        {links.map(([label, value, href]) => (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
            style={{ display: "block", padding: "1.4rem", background: "rgba(6,6,10,0.95)", textDecoration: "none", transition: "all 0.2s", borderTop: "2px solid transparent" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,136,0.04)"; e.currentTarget.style.borderTopColor = "#00ff88"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(6,6,10,0.95)"; e.currentTarget.style.borderTopColor = "transparent"; }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.58rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{label}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "#00ff88", wordBreak: "break-all" }}>{value}</div>
          </a>
        ))}
      </div>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.12)", letterSpacing: "0.2em" }}>
        MADHUR PATHAK © {new Date().getFullYear()} — BUILT WITH REACT + PASSION
      </div>
    </section>
  );
}

// ─── ACTIVE SECTION HOOK ──────────────────────────────────────────────────────
const SECTIONS = ["hero", "about", "experience", "skills", "projects", "education", "contact"];
function useActiveSection() {
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = SECTIONS.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, { threshold: 0.3, rootMargin: "-60px 0px 0px 0px" });
      o.observe(el);
      return o;
    });
    return () => obs.forEach(o => o?.disconnect());
  }, []);
  return active;
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const active = useActiveSection();
  return (
    <div style={{ minHeight: "100vh", background: "#06060a", color: "#fff", position: "relative" }}>
      <GlobalStyles />
      {/* Scanline overlay */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)", pointerEvents: "none", zIndex: 200 }} />
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
    </div>
  );
}