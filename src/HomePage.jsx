import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

// ── data ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Services", "Clients", "Programs", "Contact"];

const SERVICES = [
  {
    id: "01",
    slug: "data-security",
    title: "Data Security",
    tag: "Royal Vault Approach",
    desc: "Air-gapped systems, strong encryption, and strict access controls keep your data completely isolated, private, and tamper-proof.",
    icon: "🔐",
  },
  {
    id: "02",
    slug: "forensic-audit",
    title: "Forensic Audit",
    tag: "Beyond Traditional Audits",
    desc: "Uncover fraud, financial irregularities, and hidden risks with investigative expertise and advanced analytics. Court-admissible reports guaranteed.",
    icon: "🔍",
  },
  {
    id: "03",
    slug: "digital-forensics",
    title: "Digital Forensics",
    tag: "End-to-End Investigation",
    desc: "Data imaging, extraction, and in-depth analysis from mobile devices, computers, and networks with full chain of custody.",
    icon: "💻",
  },
  {
    id: "04",
    slug: "fraud-investigation",
    title: "Financial & Fraud Investigation",
    tag: "Follow the Money",
    desc: "Uncover financial irregularities, trace complex transactions, and track fraud across banking systems — including cryptocurrency tracing.",
    icon: "📊",
  },
  {
    id: "05",
    slug: "investigations",
    title: "Investigations & Intelligence",
    tag: "OSINT & Due Diligence",
    desc: "Background verification, corporate & private investigations, OSINT, litigation support, and business risk assessment.",
    icon: "🕵️",
  },
  {
    id: "06",
    slug: "document-examination",
    title: "Document Examination",
    tag: "Verify. Authenticate. Protect.",
    desc: "Signatures, handwriting, ink, paper, and digital metadata — we detect forgery, alterations, or tampering using scientific methods.",
    icon: "📄",
  },
  {
    id: "07",
    slug: "legal-consultation",
    title: "Legal Consultations",
    tag: "Forensic-Backed Legal Strategy",
    desc: "Bridge the gap between technical evidence and legal strategy. Expert witness services and court-admissible forensic report preparation.",
    icon: "⚖️",
  },
];

const CAPABILITIES = [
  {
    phase: "Detect",
    title: "Uncover What's Hidden",
    body:
      "Our certified experts analyze financial records, digital footprints, and communication trails to surface fraud, irregularities, and concealed evidence before it becomes a liability.",
    bullets: [
      "Transaction trail analysis",
      "Data manipulation detection",
      "Benami & shell entity investigation",
      "Email & communication forensics",
    ],
  },
  {
    phase: "Protect",
    title: "Guard What Matters Most",
    body:
      "We treat your data as a high-value asset — not a file. Our 'royal vault' approach combines air-gapped environments, multi-layer authentication, and full chain of custody compliance.",
    bullets: [
      "Secure offline infrastructure",
      "Data protection & encryption",
      "Controlled data access (role-based)",
      "DPDP Act 2023 alignment",
    ],
  },
  {
    phase: "Evolve",
    title: "Stay Ahead of Tomorrow's Threats",
    body:
      "From corporate crime awareness programs to school digital safety workshops, we build the human layer of security — preparing organisations and institutions for an increasingly digital world.",
    bullets: [
      "Corporate crime awareness programs",
      "School cyber safety education",
      "Legal & regulatory advisory",
      "Career development in forensics",
    ],
  },
];

const CLIENTS = [
  "Income Tax Department",
  "GST Authorities",
  "Enforcement Directorate",
  "CBI",
  "SEBI",
  "SFIO",
  "State Police & Cyber Crime Cells",
  "Law Firms & Courts",
  "Public & Private Sector Banks",
  "NBFCs & FinTechs",
  "Large Corporates & MNCs",
  "CA Firms & Auditors",
];

const ISOS = [
  { code: "ISO 9001:2015", label: "Quality Management" },
  { code: "ISO 27001:2022", label: "Information Security" },
];

// ── canvas particle network ────────────────────────────────────────────────────

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let W, H;

    const PARTICLE_COUNT = 80;
    const MAX_DIST = 140;
    const particles = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: rand(0, 1),
        y: rand(0, 1),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.15, 0.15),
        r: rand(1.5, 3),
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.x += p.vx / W;
        p.y += p.vy / H;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = (a.x - b.x) * W;
          const dy = (a.y - b.y) * H;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.4;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245,166,35,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(a.x * W, a.y * H);
            ctx.lineTo(b.x * W, b.y * H);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(245,166,35,0.75)";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
}

// ── useInView hook ────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ── sub-components ────────────────────────────────────────────────────────────

function Navbar({ scrolled }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (e, link) => {
    if (link === "Services") {
      e.preventDefault();
      navigate("/services");
    }
    setOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar-inner">
        <a
          href="/"
          className="navbar-brand"
          onClick={(e) => { e.preventDefault(); navigate("/"); }}
        >
          <span className="brand-icon">⚔</span>
          <span className="brand-name">FORFRA</span>
          <span className="brand-sub">SOLUTIONS</span>
        </a>
        <ul className={`navbar-links ${open ? "navbar-links--open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={l === "Services" ? "/services" : `#${l.toLowerCase()}`}
                onClick={(e) => handleLinkClick(e, l)}
              >
                {l}
              </a>
            </li>
          ))}
          <li>
            <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
              Get in Touch
            </a>
          </li>
        </ul>
        <button
          className={`hamburger ${open ? "hamburger--open" : ""}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="hero" id="hero">
      <ParticleCanvas />
      <div className="hero-content">
        <div className="hero-eyebrow animate-fade-up">
          Detect. Protect. Evolve.
        </div>
        <h1 className="hero-headline animate-fade-up anim-delay-1">
          Build Trust.<br />
          Deliver Truth.<br />
          <span className="hero-accent">Protect What Matters.</span>
        </h1>
        <p className="hero-sub animate-fade-up anim-delay-2">
          A multidisciplinary professional firm specialising in Data Security,
          Digital Forensics, Forensic Audit, and Financial Crime Investigation.
        </p>
        <div className="hero-actions animate-fade-up anim-delay-3">
          <a href="#services" className="btn-primary">Explore Services</a>
          <a href="#contact" className="btn-ghost">Talk to an Expert</a>
        </div>
        <div className="hero-isos animate-fade-up anim-delay-4">
          {ISOS.map((iso) => (
            <div key={iso.code} className="iso-badge">
              <span className="iso-code">{iso.code}</span>
              <span className="iso-label">{iso.label}</span>
            </div>
          ))}
        </div>
      </div>
      <a href="#about" className="hero-scroll-hint">
        <span className="scroll-arrow">↓</span>
      </a>
    </section>
  );
}

function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section className="about" id="about" ref={ref}>
      <div className={`about-inner ${inView ? "reveal" : ""}`}>
        <div className="about-text">
          <span className="section-eyebrow">About Forfra</span>
          <h2 className="section-title">
            At the Intersection of Technology,<br />
            <em>Investigation & Intelligence</em>
          </h2>
          <p>
            Forfra Solutions is a multidisciplinary professional firm delivering
            high-impact solutions to corporates, law enforcement agencies, and
            academic institutions. We combine forensic science with cutting-edge
            technology to uncover the truth — and protect what matters most.
          </p>
          <p>
            Certified under ISO 9001:2015 for Quality Management and ISO
            27001:2022 for Information Security, our approach is built on
            precision, compliance, and uncompromising integrity.
          </p>
          <div className="about-stats">
            {[
              { val: "2", label: "ISO Certifications" },
              { val: "10+", label: "Service Verticals" },
              { val: "6+", label: "Client Categories" },
            ].map((s) => (
              <div key={s.label} className="stat-item">
                <span className="stat-val">{s.val}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-visual">
          <div className="about-shield">
            <div className="shield-ring ring-1" />
            <div className="shield-ring ring-2" />
            <div className="shield-ring ring-3" />
            <div className="shield-center">⚔</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [ref, inView] = useInView(0.05);
  const navigate = useNavigate();

  return (
    <section className="services" id="services" ref={ref}>
      <div className={`services-header ${inView ? "reveal" : ""}`}>
        <div className="services-header-top">
          <div>
            <span className="section-eyebrow">Our Services</span>
            <h2 className="section-title">Every Threat. One Partner.</h2>
          </div>
          <button
            className="btn-primary services-learn-more"
            onClick={() => navigate("/services")}
          >
            Learn More →
          </button>
        </div>
      </div>
      <div className="services-strip">
        {SERVICES.map((s, i) => (
          <div
            className="service-card"
            key={s.id}
            style={{ animationDelay: `${i * 0.07}s`, cursor: "pointer" }}
            onClick={() => navigate(`/services/${s.slug}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(`/services/${s.slug}`);
            }}
          >
            <div className="card-id">{s.id}</div>
            <div className="card-icon">{s.icon}</div>
            <div className="card-tag">{s.tag}</div>
            <h3 className="card-title">{s.title}</h3>
            <p className="card-desc">{s.desc}</p>
            <div className="card-arrow">→</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView();

  return (
    <section className="capabilities" id="capabilities" ref={ref}>
      <div className={`cap-inner ${inView ? "reveal" : ""}`}>
        <div className="cap-left">
          <span className="section-eyebrow">Our Approach</span>
          <h2 className="section-title">How We Work</h2>
          <div className="cap-tabs">
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.phase}
                className={`cap-tab ${active === i ? "cap-tab--active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="tab-phase">{c.phase}</span>
                <span className="tab-title">{c.title}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="cap-right">
          {CAPABILITIES.map((c, i) => (
            <div
              key={c.phase}
              className={`cap-panel ${active === i ? "cap-panel--active" : ""}`}
            >
              <div className="panel-phase-badge">{c.phase}</div>
              <h3 className="panel-title">{c.title}</h3>
              <p className="panel-body">{c.body}</p>
              <ul className="panel-bullets">
                {c.bullets.map((b) => (
                  <li key={b}>
                    <span className="bullet-dot" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DifferentiatorSection() {
  const [ref, inView] = useInView();
  const points = [
    { icon: "🔒", title: "Security + Accountability", desc: "We don't just isolate data — we create controlled environments with strict access protocols and full chain of custody." },
    { icon: "⚖️", title: "Legally Admissible", desc: "Every report we produce is court-admissible, traceable, and handled with complete integrity." },
    { icon: "📋", title: "Section 63(4)(c) Compliant", desc: "Proper handling, storage, and presentation of digital evidence ensures validity in Indian courts." },
    { icon: "🇮🇳", title: "DPDP Act 2023 Aligned", desc: "Fully aligned with India's Digital Personal Data Protection Act — data minimisation, purpose limitation, and lawful processing." },
  ];
  return (
    <section className="differentiator" id="differentiator" ref={ref}>
      <div className={`diff-inner ${inView ? "reveal" : ""}`}>
        <div className="diff-header">
          <span className="section-eyebrow">What Makes Us Different</span>
          <h2 className="section-title">
            Security Is Table Stakes.<br />
            <em>We Deliver Integrity.</em>
          </h2>
        </div>
        <div className="diff-grid">
          {points.map((p, i) => (
            <div
              className="diff-card"
              key={p.title}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="diff-icon">{p.icon}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  const [ref, inView] = useInView();
  return (
    <section className="clients-section" id="clients" ref={ref}>
      <div className={`clients-header ${inView ? "reveal" : ""}`}>
        <span className="section-eyebrow">Our Clients</span>
        <h2 className="section-title">
          Trusted by Those Who Protect India's Institutions
        </h2>
      </div>
      <div className="marquee-outer">
        <div className="marquee-track">
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span key={i} className="marquee-item">{c}</span>
          ))}
        </div>
      </div>
      <div className={`client-categories ${inView ? "reveal" : ""}`}>
        {[
          { label: "Government & Regulatory Agencies", icon: "🏛️" },
          { label: "Law Enforcement & Legal Bodies", icon: "🚔" },
          { label: "Banking & Financial Institutions", icon: "🏦" },
          { label: "Corporate & Business Enterprises", icon: "🏢" },
          { label: "Professional & Advisory Firms", icon: "📂" },
        ].map((cat) => (
          <div key={cat.label} className="cat-pill">
            <span>{cat.icon}</span> {cat.label}
          </div>
        ))}
      </div>
    </section>
  );
}

function ProgramsSection() {
  const [ref, inView] = useInView();
  const programs = [
    {
      title: "Corporate Crime Awareness",
      subtitle: "For Business Teams",
      points: ["FinTech & corporate fraud detection", "Digital exploitation & cyber abuse", "Internal threats & employee risks", "Legal & regulatory awareness"],
      color: "var(--gold)",
    },
    {
      title: "School Crime Awareness",
      subtitle: "For Educational Institutions",
      points: ["Cyber safety & digital awareness", "Student safety & crime prevention", "POSH & safe school environment", "Mental health & social responsibility"],
      color: "var(--blue-mid)",
    },
  ];
  return (
    <section className="programs" id="programs" ref={ref}>
      <div className={`programs-inner ${inView ? "reveal" : ""}`}>
        <span className="section-eyebrow">Awareness Programs</span>
        <h2 className="section-title">
          Building a Safer Society,<br />
          <em>One Awareness Session at a Time</em>
        </h2>
        <div className="programs-grid">
          {programs.map((p) => (
            <div key={p.title} className="program-card">
              <div className="prog-accent" style={{ background: p.color }} />
              <h3>{p.title}</h3>
              <span className="prog-sub">{p.subtitle}</span>
              <ul>
                {p.points.map((pt) => (
                  <li key={pt}><span className="prog-dot" />  {pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [ref, inView] = useInView();
  return (
    <section className="contact" id="contact" ref={ref}>
      <div className={`contact-inner ${inView ? "reveal" : ""}`}>
        <div className="contact-text">
          <span className="section-eyebrow">Let's Work Together</span>
          <h2 className="section-title">
            Whether You Need Digital Forensics,<br />
            Fraud Investigation, or Document Validation —
          </h2>
          <p>Our team is ready to deliver accurate, court-admissible solutions when it matters most.</p>
          <div className="contact-links">
            <a href="https://www.forfrasolutions.com" className="contact-link" target="_blank" rel="noreferrer">
              🌐 www.forfrasolutions.com
            </a>
            <a href="mailto:hello@forfrasolutions.com" className="contact-link">
              ✉️ hello@forfrasolutions.com
            </a>
            <a href="tel:+919711015337" className="contact-link">
              📞 +91 97110 15337
            </a>
            <a href="tel:+918982307608" className="contact-link">
              📞 +91 89823 07608
            </a>
          </div>
        </div>
        <div className="contact-cta-box">
          <div className="cta-box-title">Ready to protect what matters?</div>
          <a href="mailto:hello@forfrasolutions.com" className="btn-primary btn-primary--large">
            Contact Us Now
          </a>
          <a href="https://www.forfrasolutions.com" className="btn-ghost" target="_blank" rel="noreferrer">
            Visit Website
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="brand-icon">⚔</span>
          <span>FORFRA SOLUTIONS</span>
        </div>
        <p className="footer-tagline">Detect. Protect. Evolve.</p>
        <p className="footer-copy">© {new Date().getFullYear()} Forfra Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ── HomePage ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page">
      <Navbar scrolled={scrolled} />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <CapabilitiesSection />
      <DifferentiatorSection />
      <ClientsSection />
      <ProgramsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
