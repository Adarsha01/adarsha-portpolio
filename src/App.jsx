
import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Projects", "Education", "Contact"];

const SKILLS = {
  Frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Responsive Design"],
  Backend: ["Python", "SQL"],
  "ML & AI": ["Pandas", "Scikit-Learn", "Computer Vision", "Data Preprocessing", "Feature Engineering"],
  Tools: ["Git", "GitHub", "VS Code", "Framer Motion", "REST APIs"],
};

const PROJECTS = [
  {
    title: "AI Proctor",
    subtitle: "Online Examination Monitoring System",
    date: "June 2026",
    tags: ["AI", "Computer Vision", "Python"],
    tech: ["Python", "HTML", "CSS", "SQL"],
    problem: "Online exams lack reliable supervision, making cheating easy and unfair to honest students.",
    bullets: [
      "Built AI-powered proctoring system detecting suspicious activity during live exams",
      "Integrated computer vision to monitor candidate behaviour and generate real-time alerts",
      "Improved examination integrity through fully automated monitoring pipeline",
    ],
    github: "https://github.com/Adarsha01/AI-Proctor",
    featured: true,
    emoji: "🔍",
    caseStudy: {
      challenge: "Detecting suspicious exam behaviour in real time without flooding invigilators with false alerts was the core difficulty — naive motion detection flagged normal fidgeting as cheating constantly.",
      approach: "Used computer vision techniques to track face position, gaze direction, and presence of multiple people in frame, layering rules so alerts only fire on sustained, meaningful deviations rather than single-frame noise.",
      result: "The system reliably flags genuine red flags (face leaving frame, second person detected, prolonged gaze-away) while cutting down false positives, giving invigilators a focused, trustworthy alert feed instead of constant noise.",
      learned: "Building this taught me that in CV systems, the model is often the easy part — the real engineering is in deciding what counts as a 'real' signal versus noise, and designing thresholds around human behaviour, not just pixels.",
    },
  },
  {
    title: "Quizentra",
    subtitle: "AI-Assisted Learning & Quiz Platform",
    date: "April 2026",
    tags: ["React", "Education", "Gamification"],
    tech: ["React.js", "JavaScript", "HTML", "CSS"],
    problem: "Students need an engaging way to self-assess and track learning progress beyond static materials.",
    bullets: [
      "Developed interactive quiz platform with admin-uploaded learning materials",
      "Implemented quiz management, score tracking, and gamification for engagement",
      "Designed fully responsive UI with optimised user experience across devices",
    ],
    github: "https://github.com/Adarsha01/Quizentra",
    featured: true,
    emoji: "🧠",
  },
  {
    title: "Property Price Prediction",
    subtitle: "Machine Learning Analytics Tool",
    date: "Sep 2025",
    tags: ["ML", "Python", "Analytics"],
    tech: ["Python", "Pandas", "Scikit-Learn"],
    problem: "Buyers and sellers struggle to estimate fair market value without data-driven insights.",
    bullets: [
      "Built ML model predicting property prices from historical real-estate datasets",
      "Performed data preprocessing, feature engineering, and model evaluation",
      "Improved prediction accuracy through iterative model optimisation techniques",
    ],
    github: "https://github.com/Adarsha01/Property-Price-Prediction",
    featured: true,
    emoji: "🏠",
  },
  {
    title: "Student Result Checker",
    subtitle: "Academic Results Web App",
    date: "June 2025",
    tags: ["React", "Education"],
    tech: ["React.js", "JavaScript", "HTML", "CSS"],
    problem: "Manual result distribution is slow and frustrating for students checking outcomes.",
    bullets: [
      "Developed web app for displaying and managing student examination results",
      "Implemented efficient result retrieval with user-friendly search interface",
    ],
    github: "https://github.com/Adarsha01/Student-Result-Checker",
    featured: false,
    emoji: "📊",
  },
  {
    title: "Movie Listing App",
    subtitle: "React + OMDb API",
    date: "2025",
    tags: ["React", "API"],
    tech: ["React", "OMDb API"],
    problem: "Quick movie discovery without friction.",
    bullets: ["Real-time search via OMDb API", "Clean card-based responsive layout"],
    github: "https://github.com/Adarsha01/Movie-Listing-App",
    featured: false,
    emoji: "🎬",
  },
  {
    title: "Weather Forecast App",
    subtitle: "React + OpenWeather API",
    date: "2025",
    tags: ["React", "API"],
    tech: ["React", "OpenWeather"],
    problem: "Live weather conditions for any city worldwide.",
    bullets: ["Live weather via OpenWeather API", "Location search with 5-day forecast"],
    github: "https://github.com/Adarsha01/Weather-Forecast-App",
    featured: false,
    emoji: "🌤️",
  },
  {
    title: "Tourism Management System",
    subtitle: "Full-Stack Booking Platform",
    date: "2024",
    tags: ["Python", "Full-Stack"],
    tech: ["Python", "HTML", "CSS", "SQL"],
    problem: "Tour booking with database-backed management.",
    bullets: ["End-to-end tour booking with DB persistence", "Clean admin dashboard UI"],
    github: "https://github.com/Adarsha01/Tourism-Management-System",
    featured: false,
    emoji: "✈️",
  },
];

const EDUCATION = [
  {
    degree: "Master of Computer Applications (MCA)",
    spec: "Computer Science & Information Technology",
    institution: "Jain University",
    grade: "CGPA 8.4 / 10",
    status: "Recent Graduate",
    icon: "🎓",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    spec: "",
    institution: "SSIBM, Tumkur",
    grade: "CGPA 7.9 / 10",
    status: "Completed",
    icon: "🏛️",
  },
  {
    degree: "Intermediate – PCMCs",
    spec: "",
    institution: "Sarvodaya PU College, Tumkur",
    grade: "6.6 / 10",
    status: "Completed",
    icon: "📚",
  },
  {
    degree: "Secondary School (SSLC)",
    spec: "",
    institution: "National English High School, Tumkur",
    grade: "9.3 / 10",
    status: "Completed",
    icon: "🏫",
  },
];

const CERTS = [
  { name: "HTML, CSS, JavaScript & React JS", platform: "J Spiders", year: "2024", tag: "Frontend Track" },
  { name: "Front End Development – HTML & CSS", platform: "Great Learning", year: "2024", tag: "Web Dev" },
];

const LANGS = ["English", "Hindi", "Kannada", "Telugu"];
const HOBBIES = ["🏏 Cricket", "♟️ Chess", "🎵 Listening to Music"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Tag({ label, color = "#6366f1" }) {
  return (
    <span style={{
      background: color + "18",
      color,
      border: `1px solid ${color}40`,
      borderRadius: 6,
      padding: "2px 10px",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.03em",
    }}>{label}</span>
  );
}

export default function App() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [caseStudyOpen, setCaseStudyOpen] = useState(null);

  const featured = PROJECTS.filter(p => p.featured);
  const others = PROJECTS.filter(p => !p.featured);

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 120;
      let current = "About";
      for (const name of NAV_LINKS) {
        const el = document.getElementById(name.toLowerCase());
        if (el && scrollY >= el.offsetTop) current = name;
      }
      setActive(current);
    };
    window.addEventListener("scroll", handler);
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const C = {
    bg: "#0a0a0f",
    surface: "#13131a",
    card: "#16161f",
    border: "#ffffff0f",
    accent: "#7c6ef5",
    accentSoft: "#7c6ef520",
    accentGlow: "#7c6ef540",
    teal: "#06b6d4",
    tealSoft: "#06b6d415",
    text: "#e8e8f0",
    muted: "#8888a8",
    white: "#ffffff",
  };

  const styles = {
    root: { background: C.bg, color: C.text, minHeight: "100vh", fontFamily: "'Inter', 'Segoe UI', sans-serif", overflowX: "hidden" },
    nav: {
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: C.bg + "ee", backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 5%", height: 60,
    },
    logo: { fontWeight: 800, fontSize: 20, color: C.accent, letterSpacing: "-0.02em", cursor: "pointer" },
    navLinks: { display: "flex", gap: 6 },
    navLink: (isActive) => ({
      background: "none", border: "none", cursor: "pointer", color: isActive ? C.accent : C.muted,
      fontSize: 14, fontWeight: isActive ? 700 : 500, padding: "6px 14px", borderRadius: 8,
      transition: "color 0.2s", fontFamily: "inherit",
    }),
    hero: {
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", textAlign: "center", padding: "80px 5% 60px",
      background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${C.accentGlow}, transparent)`,
    },
    badge: {
      display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px",
      background: C.accentSoft, border: `1px solid ${C.accent}50`,
      borderRadius: 100, fontSize: 13, color: C.accent, fontWeight: 600, marginBottom: 28,
    },
    dot: { width: 7, height: 7, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite" },
    h1: { fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.04em", color: C.white, marginBottom: 24 },
    accent: { color: C.accent },
    heroSub: { fontSize: "clamp(16px, 2.2vw, 20px)", color: C.muted, maxWidth: 640, lineHeight: 1.6, marginBottom: 40 },
    heroBtns: { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" },
    btnPrimary: {
      background: C.accent, color: "#fff", border: "none", borderRadius: 10,
      padding: "13px 28px", fontWeight: 700, fontSize: 15, cursor: "pointer",
      fontFamily: "inherit", transition: "opacity 0.2s, transform 0.2s",
    },
    btnOutline: {
      background: "transparent", color: C.text, border: `1.5px solid ${C.border}`,
      borderRadius: 10, padding: "12px 28px", fontWeight: 600, fontSize: 15,
      cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.2s",
    },
    statsRow: {
      display: "flex", gap: 32, justifyContent: "center", flexWrap: "wrap",
      marginTop: 56, paddingTop: 40, borderTop: `1px solid ${C.border}`,
    },
    stat: { textAlign: "center" },
    statNum: { fontSize: 36, fontWeight: 900, color: C.white, lineHeight: 1 },
    statLabel: { fontSize: 13, color: C.muted, marginTop: 4, fontWeight: 500 },
    section: { padding: "96px 5%" },
    sectionInner: { maxWidth: 1100, margin: "0 auto" },
    eyebrow: { fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 },
    sectionTitle: { fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: C.white, letterSpacing: "-0.03em", marginBottom: 16 },
    sectionDesc: { color: C.muted, fontSize: 17, lineHeight: 1.65, maxWidth: 580 },
    card: {
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 16,
      padding: 28, transition: "border-color 0.25s, transform 0.25s",
    },
    grid2: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginTop: 40 },
    grid3: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16, marginTop: 40 },
    projectCard: {
      background: C.card, border: `1px solid ${C.border}`, borderRadius: 20,
      padding: 32, display: "flex", flexDirection: "column", gap: 16,
      transition: "border-color 0.25s, transform 0.2s",
    },
    tag: (color) => ({
      display: "inline-block", background: color + "18", color, border: `1px solid ${color}30`,
      borderRadius: 6, padding: "2px 10px", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.04em",
    }),
    chip: {
      background: C.surface, color: C.muted, border: `1px solid ${C.border}`,
      borderRadius: 6, padding: "4px 12px", fontSize: 13, fontWeight: 500,
    },
    btn: {
      display: "inline-flex", alignItems: "center", gap: 6,
      background: "transparent", border: `1.5px solid ${C.accent}50`, color: C.accent,
      borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 700,
      cursor: "pointer", fontFamily: "inherit", textDecoration: "none", transition: "background 0.2s",
    },
    input: {
      width: "100%", background: C.surface, border: `1.5px solid ${C.border}`, borderRadius: 10,
      color: C.text, padding: "12px 16px", fontSize: 15, fontFamily: "inherit",
      outline: "none", transition: "border-color 0.2s", boxSizing: "border-box",
    },
    footer: {
      textAlign: "center", padding: "36px 5%", borderTop: `1px solid ${C.border}`,
      color: C.muted, fontSize: 14,
    },
  };

  const tagColors = { AI: "#f59e0b", "Computer Vision": "#ef4444", Python: "#3b82f6", React: "#06b6d4", Education: "#8b5cf6", Gamification: "#ec4899", ML: "#10b981", Analytics: "#f97316", API: "#6366f1", "Full-Stack": "#14b8a6" };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::selection { background: #7c6ef540; }
        html { scroll-behavior: smooth; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .pcard:hover { border-color: #7c6ef550 !important; transform: translateY(-3px); }
        .btn-gh:hover { background: #7c6ef520 !important; }
        .btn-p:hover { opacity: 0.88; transform: translateY(-1px); }
        .btn-o:hover { border-color: #7c6ef5 !important; color: #7c6ef5 !important; }
        .skill-tag:hover { background: #7c6ef520 !important; border-color: #7c6ef560 !important; color: #c4b8fc !important; }
        input:focus, textarea:focus { border-color: #7c6ef5 !important; }
        .mobile-menu { display: none; }
        .desktop-nav { display: flex; }
        @media (max-width: 700px) {
          .desktop-nav { display: none !important; }
          .mobile-menu { display: block !important; }
          .hero-h1 { font-size: 42px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={styles.nav}>
        <div style={styles.logo} onClick={() => scrollTo("about")}>AH</div>
        <div style={styles.navLinks} className="desktop-nav">
          {NAV_LINKS.map(n => (
            <button key={n} style={styles.navLink(active === n)} onClick={() => scrollTo(n)}>{n}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }} className="desktop-nav">
          <a href="/resume.pdf" download style={{ ...styles.btnOutline, padding: "8px 18px", fontSize: 13, textDecoration: "none" }} className="btn-o">
            📄 Resume
          </a>
          <a href="mailto:adarshah01@gmail.com" style={{ ...styles.btnPrimary, padding: "8px 20px", fontSize: 13, textDecoration: "none" }} className="btn-p">
            Hire Me
          </a>
        </div>
        <button className="mobile-menu" style={{ background: "none", border: "none", color: C.text, fontSize: 22, cursor: "pointer" }} onClick={() => setMenuOpen(o => !o)}>☰</button>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", top: 60, left: 0, right: 0, background: C.surface, zIndex: 99, borderBottom: `1px solid ${C.border}`, padding: "12px 5%" }}>
          {NAV_LINKS.map(n => (
            <button key={n} onClick={() => scrollTo(n)} style={{ ...styles.navLink(false), display: "block", width: "100%", textAlign: "left", padding: "10px 0", fontSize: 16 }}>{n}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section style={styles.hero}>
        <FadeIn>
          <div style={styles.badge}>
            <span style={styles.dot} />
            Open to Work · Available for Opportunities
          </div>
          <h1 style={styles.h1} className="hero-h1">
            Hi, I'm <span style={styles.accent}>Adarsha H</span>
            <br />
            <span style={{ color: C.muted, fontWeight: 700 }}>I build things</span> for the web
          </h1>
          <p style={styles.heroSub}>
            MCA graduate crafting <strong style={{ color: C.teal }}>AI-powered applications</strong> and polished React interfaces. From computer vision proctoring to gamified learning platforms — I turn real-world problems into scalable, clean code.
          </p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary} className="btn-p" onClick={() => scrollTo("projects")}>View My Projects →</button>
            <a href="/resume.pdf" download style={{ ...styles.btnOutline, textDecoration: "none" }} className="btn-o">📄 Download Resume</a>
            <a href="mailto:adarshah01@gmail.com" style={{ ...styles.btnOutline, textDecoration: "none" }} className="btn-o">Get In Touch</a>
          </div>
          <div style={styles.statsRow}>
            {[["7+", "Projects Built"], ["4", "Languages Spoken"], ["8.4", "MCA CGPA"], ["2", "Certifications"]].map(([n, l]) => (
              <div key={l} style={styles.stat}>
                <div style={styles.statNum}>{n}</div>
                <div style={styles.statLabel}>{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ ...styles.section, background: C.surface }}>
        <div style={styles.sectionInner}>
          <FadeIn>
            <div style={styles.eyebrow}>About Me</div>
            <h2 style={styles.sectionTitle}>From Classroom to Code</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginTop: 40, alignItems: "start" }}>
            <FadeIn delay={0.1}>
              <p style={{ ...styles.sectionDesc, maxWidth: "100%", marginBottom: 20 }}>
                My journey into technology started with a strong passion for learning and communication. While working in education, I developed leadership, patience, and structured problem-solving skills that now shape the way I write and ship software.
              </p>
              <p style={{ ...styles.sectionDesc, maxWidth: "100%" }}>
                Driven by curiosity, I transitioned into Computer Applications — completing my MCA at Jain University with a <strong style={{ color: C.white }}>CGPA of 8.4</strong> — and focused on frontend development, React, and AI-based solutions.
              </p>
              <p style={{ ...styles.sectionDesc, maxWidth: "100%", marginTop: 20 }}>
                I bring a unique blend of <strong style={{ color: C.accent }}>communication clarity</strong> from education and <strong style={{ color: C.teal }}>technical depth</strong> in React and AI — making me someone who builds well and explains it clearly.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                {LANGS.map(l => <span key={l} style={{ ...styles.chip, borderColor: C.accent + "40", color: C.accent }}>{l}</span>)}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                {HOBBIES.map(h => <span key={h} style={styles.chip}>{h}</span>)}
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { icon: "🎓", label: "Education", val: "MCA · Jain University (CGPA 8.4)" },
                  { icon: "📍", label: "Location", val: "Tumkur, Karnataka, India" },
                  { icon: "📧", label: "Email", val: "adarshah01@gmail.com" },
                  { icon: "📱", label: "Phone", val: "+91 7019552699" },
                  { icon: "🌐", label: "GitHub", val: "github.com/Adarsha01" },
                  { icon: "💼", label: "LinkedIn", val: "linkedin.com/in/adarsha-h" },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ ...styles.card, display: "flex", alignItems: "center", gap: 16, padding: "16px 20px" }}>
                    <span style={{ fontSize: 22, minWidth: 32 }}>{icon}</span>
                    <div>
                      <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{label}</div>
                      <div style={{ color: C.text, fontSize: 14, marginTop: 2 }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={styles.section}>
        <div style={styles.sectionInner}>
          <FadeIn>
            <div style={styles.eyebrow}>Tech Stack</div>
            <h2 style={styles.sectionTitle}>Tools of the Craft</h2>
            <p style={styles.sectionDesc}>Technologies I use to design, build, and ship modern applications.</p>
          </FadeIn>
          <div style={styles.grid2}>
            {Object.entries(SKILLS).map(([cat, skills], i) => (
              <FadeIn key={cat} delay={i * 0.08}>
                <div style={styles.card} className="pcard">
                  <div style={{ fontSize: 13, fontWeight: 800, color: C.accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{cat}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {skills.map(s => (
                      <span key={s} className="skill-tag" style={{ background: C.surface, color: C.muted, border: `1px solid ${C.border}`, borderRadius: 8, padding: "6px 14px", fontSize: 13.5, fontWeight: 500, transition: "all 0.2s", cursor: "default" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ ...styles.section, background: C.surface }}>
        <div style={styles.sectionInner}>
          <FadeIn>
            <div style={styles.eyebrow}>Projects</div>
            <h2 style={styles.sectionTitle}>Projects That Tell a Story</h2>
            <p style={styles.sectionDesc}>A selection of products, experiments, and tools — from AI systems to polished React interfaces.</p>
          </FadeIn>

          <div style={styles.grid2}>
            {featured.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.1}>
                <div style={styles.projectCard} className="pcard">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ fontSize: 36 }}>{p.emoji}</span>
                    <span style={{ fontSize: 12, color: C.muted, fontWeight: 600 }}>{p.date}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: C.white, marginBottom: 4 }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: C.muted }}>{p.subtitle}</p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map(t => <span key={t} style={styles.tag(tagColors[t] || C.accent)}>{t}</span>)}
                  </div>
                  <div style={{ background: C.bg, borderRadius: 10, padding: 14, borderLeft: `3px solid ${C.accent}` }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: C.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Problem Solved</div>
                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5 }}>{p.problem}</p>
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 7 }}>
                    {p.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 13.5, color: C.text, display: "flex", gap: 8, lineHeight: 1.5 }}>
                        <span style={{ color: C.accent, marginTop: 2, flexShrink: 0 }}>▸</span> {b}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                    {p.tech.map(t => <span key={t} style={styles.chip}>{t}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <a href={p.github} target="_blank" rel="noreferrer" style={styles.btn} className="btn-gh">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                      GitHub
                    </a>
                    {p.caseStudy && (
                      <button onClick={() => setCaseStudyOpen(p)} style={{ ...styles.btn, background: C.accentSoft }} className="btn-gh">
                        📖 Case Study
                      </button>
                    )}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div style={{ marginTop: 48 }}>
              <button onClick={() => setShowAll(s => !s)} style={{ ...styles.btnOutline, marginBottom: 28, display: "block" }} className="btn-o">
                {showAll ? "Hide Projects ↑" : "Show All Projects ↓"}
              </button>
              {showAll && (
                <div style={styles.grid3}>
                  {others.map((p, i) => (
                    <FadeIn key={p.title} delay={i * 0.07}>
                      <div style={{ ...styles.card, display: "flex", flexDirection: "column", gap: 12 }} className="pcard">
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 28 }}>{p.emoji}</span>
                          <span style={{ fontSize: 11, color: C.muted }}>{p.date}</span>
                        </div>
                        <h3 style={{ fontSize: 16, fontWeight: 800, color: C.white }}>{p.title}</h3>
                        <p style={{ fontSize: 13, color: C.muted }}>{p.subtitle}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {p.tech.map(t => <span key={t} style={styles.chip}>{t}</span>)}
                        </div>
                        <a href={p.github} target="_blank" rel="noreferrer" style={{ ...styles.btn, marginTop: "auto" }} className="btn-gh">GitHub →</a>
                      </div>
                    </FadeIn>
                  ))}
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={styles.section}>
        <div style={styles.sectionInner}>
          <FadeIn>
            <div style={styles.eyebrow}>Education</div>
            <h2 style={styles.sectionTitle}>Academic Foundation</h2>
            <p style={styles.sectionDesc}>Building knowledge from the ground up, with a focus on computer science and applied software engineering.</p>
          </FadeIn>
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
            {EDUCATION.map((e, i) => (
              <FadeIn key={e.degree} delay={i * 0.08}>
                <div style={{ ...styles.card, display: "flex", gap: 20, alignItems: "flex-start" }} className="pcard">
                  <span style={{ fontSize: 30, minWidth: 40, marginTop: 4 }}>{e.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                      <h3 style={{ fontSize: 17, fontWeight: 800, color: C.white }}>{e.degree}</h3>
                      <span style={{ ...styles.tag(C.accent), fontSize: 11 }}>{e.status}</span>
                    </div>
                    <p style={{ color: C.muted, fontSize: 14 }}>{e.institution}</p>
                    <p style={{ color: C.teal, fontSize: 13, fontWeight: 700, marginTop: 4 }}>{e.grade}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.3}>
            <div style={{ marginTop: 48 }}>
              <div style={{ ...styles.eyebrow, marginBottom: 20 }}>Certifications</div>
              <div style={styles.grid2}>
                {CERTS.map((c, i) => (
                  <div key={c.name} style={{ ...styles.card, borderLeft: `3px solid ${C.accent}` }} className="pcard">
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={styles.tag(C.accent)}>{c.tag}</span>
                      <span style={{ fontSize: 12, color: C.muted }}>{c.year}</span>
                    </div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 4 }}>{c.name}</h4>
                    <p style={{ fontSize: 13, color: C.muted }}>{c.platform}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ ...styles.section, background: C.surface }}>
        <div style={{ ...styles.sectionInner, maxWidth: 720 }}>
          <FadeIn>
            <div style={styles.eyebrow}>Contact</div>
            <h2 style={styles.sectionTitle}>Let's Build Something Amazing</h2>
            <p style={styles.sectionDesc}>I'm actively looking for Software Engineer, Frontend Developer, and React Developer roles. Whether you have a project, internship, or full-time opportunity — I'd love to connect.</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ ...styles.card, marginTop: 40, padding: 32 }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "32px 0", color: "#22c55e", fontSize: 18, fontWeight: 700 }}>
                  ✅ Message sent! I'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 13, color: C.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>Name</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" style={styles.input} />
                    </div>
                    <div>
                      <label style={{ fontSize: 13, color: C.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>Email</label>
                      <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" style={styles.input} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 13, color: C.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>Message</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell me about the opportunity..." style={{ ...styles.input, resize: "vertical" }} />
                  </div>
                  <button type="submit" style={{ ...styles.btnPrimary, alignSelf: "flex-start", padding: "13px 32px" }} className="btn-p">
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div style={{ display: "flex", gap: 16, marginTop: 28, flexWrap: "wrap" }}>
              {[
                { icon: "📧", label: "adarshah01@gmail.com", href: "mailto:adarshah01@gmail.com" },
                { icon: "💼", label: "LinkedIn", href: "https://www.linkedin.com/in/adarsha-h-20317a263/" },
                { icon: "🐙", label: "GitHub", href: "https://github.com/Adarsha01" },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ ...styles.btn, fontSize: 14, padding: "10px 20px", textDecoration: "none" }} className="btn-gh">
                  {icon} {label}
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={{ marginBottom: 8, fontWeight: 700, color: C.text }}>Adarsha H</div>
        <div>MCA Graduate · React Developer · AI Enthusiast · Based in Tumkur, India</div>
        <div style={{ marginTop: 12, color: C.muted + "80" }}>© 2026 Adarsha H. All rights reserved.</div>
      </footer>

      {/* CASE STUDY MODAL */}
      {caseStudyOpen && (
        <div
          onClick={() => setCaseStudyOpen(null)}
          style={{
            position: "fixed", inset: 0, background: "#000000c0", backdropFilter: "blur(4px)",
            zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "5%",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 20,
              padding: 40, maxWidth: 680, width: "100%", maxHeight: "85vh", overflowY: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={() => setCaseStudyOpen(null)}
              style={{
                position: "absolute", top: 20, right: 20, background: C.surface, border: `1px solid ${C.border}`,
                color: C.text, width: 32, height: 32, borderRadius: 8, cursor: "pointer", fontSize: 16,
              }}
            >✕</button>
            <span style={{ fontSize: 40 }}>{caseStudyOpen.emoji}</span>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: C.white, marginTop: 12, marginBottom: 4 }}>{caseStudyOpen.title}</h2>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>{caseStudyOpen.subtitle}</p>

            {[
              ["The Challenge", caseStudyOpen.caseStudy.challenge, "#ef4444"],
              ["The Approach", caseStudyOpen.caseStudy.approach, "#3b82f6"],
              ["The Result", caseStudyOpen.caseStudy.result, "#22c55e"],
              ["What I Learned", caseStudyOpen.caseStudy.learned, "#7c6ef5"],
            ].map(([title, text, color]) => (
              <div key={title} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 800, color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{title}</div>
                <p style={{ color: C.text, fontSize: 14.5, lineHeight: 1.65 }}>{text}</p>
              </div>
            ))}

            <a href={caseStudyOpen.github} target="_blank" rel="noreferrer" style={{ ...styles.btnPrimary, display: "inline-block", marginTop: 8, textDecoration: "none" }} className="btn-p">
              View Code on GitHub →
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
