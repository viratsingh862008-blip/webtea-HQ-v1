// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  Braces,
  ChevronRight,
  Globe2,
  Menu,
  MoveUpRight,
  Network,
  ScanLine,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
import { company } from "./data/company.mjs";
import { roster } from "./data/roster.mjs";
import { cardsPerPageForWidth, chunkCards } from "./data/role-model-carousel.mjs";
import { clamp, wrapIndex } from "./data/experience.mjs";

const serviceIcons = [Globe2, Bot, Workflow, ScanLine, Sparkles, Braces];
const navItems = ["About", "Systems", "Team", "Principles"];

function AppChrome({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  return (
    <>
      <div className="scroll-meter" aria-hidden="true"><span /></div>
      <header className="site-nav">
        <a className="site-brand" href="#top" onClick={() => setOpen(false)}>
          <span className="site-brand-mark">WT</span>
          <span>WEBTEA <b>HQ</b></span>
        </a>
        <div className="nav-center">HQ / 001 <i /> DIGITAL OPERATING COMPANY</div>
        <button className="nav-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
        <nav className={open ? "site-links open" : "site-links"}>
          {navItems.map((item) => <a key={item} href={"#" + item.toLowerCase()} onClick={() => setOpen(false)}>{item}</a>)}
          <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={13} /></a>
        </nav>
      </header>
    </>
  );
}

function TeaMark() {
  return (
    <div className="tea-mark" aria-hidden="true">
      <div className="steam steam-one" />
      <div className="steam steam-two" />
      <div className="tea-glass"><span /></div>
      <div className="tea-line" />
    </div>
  );
}

function Hero() {
  const [pointer, setPointer] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      setPointer({
        x: clamp(event.clientX / window.innerWidth),
        y: clamp(event.clientY / window.innerHeight),
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const rx = (pointer.y - 0.5) * -10;
  const ry = (pointer.x - 0.5) * 12;

  return (
    <section id="top" className="hero-v2">
      <div className="hero-noise" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="hero-inner section-shell">
        <div className="hero-utility">
          <span><i className="live-dot" /> LIVE SYSTEM</span>
          <span>BETTIAH / BIHAR / INDIA</span>
          <span>07.07.2026</span>
        </div>

        <div className="hero-stage">
          <div className="hero-copy">
            <p className="hero-kicker">AN AI-POWERED DIGITAL AGENCY + STARTUP</p>
            <h1><span>WEB</span><em>TEA</em><small>HQ</small></h1>
            <div className="hero-subline">
              <span>01</span>
              <p>Digital work for businesses that want to <strong>establish, build, automate and grow.</strong></p>
            </div>
            <div className="hero-actions-v2">
              <a className="magnetic-button" href="#systems">Enter the system <ArrowDownRight size={16} /></a>
              <a className="text-link" href="#about">Why WebTea? <MoveUpRight size={14} /></a>
            </div>
          </div>

          <div className="hero-object" style={{ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)` }}>
            <div className="object-label object-label-top">SIGNAL / 001</div>
            <TeaMark />
            <div className="object-ring ring-one" />
            <div className="object-ring ring-two" />
            <div className="object-core">WT</div>
            <div className="object-label object-label-bottom">ONLINE / SIMPLE / CONNECTED</div>
          </div>
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <div className="hero-ticker"><b>WEB</b> — PRODUCT — AI — AUTOMATION — GROWTH — CREATIVE — <b>TEA</b> — PRODUCT — AI — AUTOMATION —</div>
          <span>INDIA → WORLDWIDE</span>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about-v2 section-shell">
      <div className="section-marker"><span>01</span><b>THE IDEA</b><i /></div>
      <div className="about-grid">
        <div>
          <p className="micro-label">WHY THE NAME?</p>
          <h2>Online work.<br /><span>As simple as tea.</span></h2>
        </div>
        <div className="about-copy">
          <p className="lead-copy">{company.description}</p>
          <p>{company.nameMeaning}</p>
          <div className="quote-lockup">
            <span>WEBTEA HQ</span>
            <strong>Digital work,<br />made simple.</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Systems() {
  const [active, setActive] = useState(0);
  const service = company.services[active];
  const Icon = serviceIcons[active];

  return (
    <section id="systems" className="systems-v2">
      <div className="section-shell">
        <div className="section-marker"><span>02</span><b>THE MACHINE</b><i /></div>
        <div className="systems-intro">
          <div>
            <p className="micro-label">CAPABILITIES / 06</p>
            <h2>One company.<br /><span>Six systems.</span></h2>
          </div>
          <p>We don't sell isolated deliverables. We connect the digital pieces a business needs into an operating system that can keep moving.</p>
        </div>

        <div className="systems-console">
          <div className="systems-index">
            {company.services.map((item, index) => (
              <button key={item.name} className={active === index ? "is-active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
                <span>0{index + 1}</span><b>{item.name}</b><ChevronRight size={15} />
              </button>
            ))}
          </div>
          <div className="systems-display">
            <div className="display-top"><span>MODULE / 0{active + 1}</span><span>READY</span></div>
            <div className="display-icon"><Icon size={34} strokeWidth={1.1} /></div>
            <h3>{service.name}</h3>
            <p>{service.text}</p>
            <div className="display-bottom"><span>WEBTEA CORE</span><span>ACTIVE MODULE</span></div>
            <div className="display-grid" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    ["01", "ESTABLISH", "Find the signal."],
    ["02", "BUILD", "Turn the signal into a system."],
    ["03", "AUTOMATE", "Remove the repetitive."],
    ["04", "GROW", "Make the system compound."],
  ];
  return (
    <section className="process-v2 section-shell">
      <div className="section-marker"><span>03</span><b>THE LOOP</b><i /></div>
      <div className="process-head"><h2>Simple on the surface.<br /><span>Serious underneath.</span></h2><Network size={42} strokeWidth={1} /></div>
      <div className="process-track">
        {steps.map(([number, title, copy], index) => (
          <article key={number} className="process-step">
            <span>{number}</span><div className="step-line" /><small>{title}</small><h3>{copy}</h3>
            {index < steps.length - 1 && <ArrowUpRight className="step-arrow" size={18} />}
          </article>
        ))}
      </div>
    </section>
  );
}

function RoleModelSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(() => cardsPerPageForWidth(window.innerWidth));
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const pages = useMemo(() => chunkCards(roster, cardsPerPage), [cardsPerPage]);
  const pageCount = pages.length;
  const activePage = Math.min(currentPage, Math.max(0, pageCount - 1));
  const visibleMembers = pages[activePage] ?? [];
  const goTo = (page: number) => setCurrentPage(wrapIndex(page, pageCount));

  useEffect(() => {
    const onResize = () => setCardsPerPage(cardsPerPageForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null) return;
    const delta = touchStart - clientX;
    if (Math.abs(delta) > 45) {
      const next = activePage + (delta > 0 ? 1 : -1);
      if (next >= 0 && next < pageCount) goTo(next);
    }
    setTouchStart(null);
  };

  return (
    <section id="team" className="role-models-section">
      <div className="role-models-screen-buzz" aria-hidden="true" />
      <div className="section-shell role-models-inner">
        <div className="role-model-terminal-head">
          <div className="role-model-title-box terminal-box">
            <div className="role-model-brandline"><img src="/webtea-logo.svg" alt="" /><span>WEBTEA HQ / FOUNDING TEAM</span></div>
            <h2>Meet the <span>people</span> behind the machine.</h2>
            <p className="role-model-highlight">SYSTEM ACTIVE</p>
          </div>
          <div className="role-model-control terminal-box" aria-label="Team carousel controls">
            <p className="role-model-highlight blink">CONTROL</p>
            <div className="role-model-buttons">
              <button className="role-model-button" onClick={() => activePage > 0 && goTo(activePage - 1)} disabled={activePage === 0}>&lt;</button>
              {pages.map((_, index) => <button key={index} className={"role-model-button" + (activePage === index ? " active" : "")} onClick={() => goTo(index)}>{index + 1}</button>)}
              <button className="role-model-button" onClick={() => activePage < pageCount - 1 && goTo(activePage + 1)} disabled={activePage === pageCount - 1}>&gt;</button>
            </div>
            <progress className="role-model-progress" value={activePage + 1} max={pageCount} />
          </div>
        </div>

        <div className="role-model-container" onTouchStart={(e) => setTouchStart(e.changedTouches[0]?.clientX ?? null)} onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0]?.clientX ?? 0)}>
          <div className="role-model-group">
            {visibleMembers.map((member, index) => (
              <article className="role-model-card terminal-box" key={member.name}>
                <div className={"role-model-portrait " + member.color}>
                  <div className="portrait-grid" /><div className="portrait-scanlines" />
                  <div className="portrait-corner">P{String(activePage * cardsPerPage + index + 1).padStart(2, "0")}</div>
                  <div className="portrait-monogram">{member.alias.slice(0, 2)}</div>
                  <div className="portrait-logo">WEBTEA<span>HQ</span></div>
                </div>
                <div className="role-model-content">
                  <h3>{member.name}</h3><p className="role-model-label">{member.role}</p><p>{member.bio}</p>
                  <div className="role-model-meta"><span>{member.className}</span><span>{member.status}</span></div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="role-model-mobile-controls">
          <button className="role-model-button" onClick={() => activePage > 0 && goTo(activePage - 1)} disabled={activePage === 0}>‹</button>
          <span>{String(activePage + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span>
          <button className="role-model-button" onClick={() => activePage < pageCount - 1 && goTo(activePage + 1)} disabled={activePage === pageCount - 1}>›</button>
        </div>
      </div>
    </section>
  );
}

function AIConsole() {
  const [active, setActive] = useState(0);
  const agents = company.aiTeam;
  const agent = agents[active];

  return (
    <section className="ai-v2 section-shell">
      <div className="section-marker"><span>05</span><b>THE AI LAYER</b><i /></div>
      <div className="ai-layout">
        <div className="ai-copy">
          <p className="micro-label">HUMAN DIRECTION / MACHINE EXECUTION</p>
          <h2>Your team doesn't stop at humans.</h2>
          <p>{agent.bio}</p>
          <div className="agent-switcher">{agents.map((item, index) => <button key={item.name} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.name}</button>)}</div>
        </div>
        <div className="ai-terminal">
          <div className="terminal-head"><span>WEBTEA://AGENT/{agent.name.toUpperCase()}</span><span><i /> ONLINE</span></div>
          <div className="terminal-body">
            <p><span>›</span> booting {agent.name.toLowerCase()}...</p>
            <p><span>›</span> connecting shared context</p>
            <p><span>›</span> mapping company systems</p>
            <p className="terminal-result">READY<span className="cursor" /></p>
          </div>
          <div className="terminal-foot"><span>LATENCY 018MS</span><span>MEMORY SHARED</span><span>MODE AUTONOMOUS</span></div>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section id="principles" className="principles-v2 section-shell">
      <div className="section-marker"><span>06</span><b>THE BELIEF SYSTEM</b><i /></div>
      <div className="principles-grid">
        {company.principles.map(([number, title, text]) => (
          <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p><ArrowUpRight size={16} /></article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-v2 section-shell">
      <div className="contact-orbit" aria-hidden="true" />
      <p className="micro-label">07 / OPEN CHANNEL</p>
      <h2>Let's make something<br /><span>worth noticing.</span></h2>
      <p className="contact-copy">Have something to establish, build, automate or grow? Start with the problem. We'll build the system around it.</p>
      <a className="magnetic-button" href="#top">Open the channel <ArrowUpRight size={16} /></a>
      <div className="contact-foot"><span>WEBTEA HQ</span><span>BETTIAH, BIHAR, INDIA</span><span>INDIA → WORLDWIDE</span></div>
    </section>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll", String(progress));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="experience">
      <AppChrome open={open} setOpen={setOpen} />
      <Hero />
      <About />
      <Systems />
      <Process />
      <RoleModelSection />
      <AIConsole />
      <Principles />
      <Contact />
      <footer className="site-footer section-shell">
        <div className="footer-brand"><span className="site-brand-mark">WT</span><strong>WEBTEA HQ</strong></div>
        <p>AI-powered digital agency × startup · Bettiah, Bihar, India</p>
        <a href="#top">RETURN ↑</a>
      </footer>
    </main>
  );
}
