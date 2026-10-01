
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Menu, X, Zap, Globe2, Bot, Workflow, Clapperboard, Search, Sparkles } from "lucide-react";
import { company } from "./data/company.mjs";
import { roster } from "./data/roster.mjs";
import { cardsPerPageForWidth, chunkCards } from "./data/role-model-carousel.mjs";

const serviceIcons = [Globe2, Bot, Workflow, Search, Clapperboard, Sparkles];

function RoleModelSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(() => cardsPerPageForWidth(window.innerWidth));
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const onResize = () => setCardsPerPage(cardsPerPageForWidth(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pages = useMemo(() => chunkCards(roster, cardsPerPage), [cardsPerPage]);
  const pageCount = pages.length;
  const activePage = Math.min(currentPage, Math.max(0, pageCount - 1));
  const visibleMembers = pages[activePage] ?? [];

  const goTo = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, pageCount - 1)));
  };

  const handleTouchEnd = (clientX: number) => {
    if (touchStart === null) return;
    const delta = touchStart - clientX;
    if (Math.abs(delta) > 45) goTo(activePage + (delta > 0 ? 1 : -1));
    setTouchStart(null);
  };

  return (
    <section id="roster" className="role-models-section">
      <div className="role-models-screen-buzz" aria-hidden="true" />
      <div className="section-shell role-models-inner">
        <div className="role-model-terminal-head">
          <div className="role-model-title-box terminal-box">
            <div className="role-model-brandline">
              <img src="/webtea-logo.svg" alt="" />
              <span>WEBTEA HQ / FOUNDING TEAM</span>
            </div>
            <h2>Meet the <span>people</span> behind WebTea.</h2>
            <p className="role-model-highlight">SYSTEM ACTIVE</p>
          </div>

          <div className="role-model-control terminal-box" aria-label="Team carousel controls">
            <p className="role-model-highlight blink">CONTROL</p>
            <div className="role-model-buttons">
              <button className="role-model-button" onClick={() => goTo(activePage - 1)} disabled={activePage === 0} aria-label="Previous team page">&lt;</button>
              {pages.map((_, index) => (
                <button
                  key={index}
                  className={"role-model-button" + (activePage === index ? " active" : "")}
                  onClick={() => goTo(index)}
                  aria-label={"Show team page " + (index + 1)}
                  aria-current={activePage === index ? "page" : undefined}
                >
                  {index + 1}
                </button>
              ))}
              <button className="role-model-button" onClick={() => goTo(activePage + 1)} disabled={activePage === pageCount - 1} aria-label="Next team page">&gt;</button>
            </div>
            <progress className="role-model-progress" value={activePage + 1} max={pageCount} aria-label="Team carousel progress" />
          </div>
        </div>

        <div
          className="role-model-container"
          onTouchStart={(event) => setTouchStart(event.changedTouches[0]?.clientX ?? null)}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.clientX ?? 0)}
        >
          <div className="role-model-group">
            {visibleMembers.map((member, index) => (
              <article className="role-model-card terminal-box" key={member.name}>
                <div className={"role-model-portrait " + member.color}>
                  <div className="portrait-grid" />
                  <div className="portrait-scanlines" />
                  <div className="portrait-corner">P{String(activePage * cardsPerPage + index + 1).padStart(2, "0")}</div>
                  <div className="portrait-monogram">{member.alias.slice(0, 2)}</div>
                  <div className="portrait-logo">WEBTEA<span>HQ</span></div>
                </div>
                <div className="role-model-content">
                  <h3>{member.name}</h3>
                  <p className="role-model-label">{member.role}</p>
                  <p>{member.bio}</p>
                  <div className="role-model-meta">
                    <span>{member.className}</span>
                    <span>{member.status}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="role-model-mobile-controls">
          <button className="role-model-button" onClick={() => goTo(activePage - 1)} disabled={activePage === 0} aria-label="Previous team page">‹</button>
          <span>{String(activePage + 1).padStart(2, "0")} / {String(pageCount).padStart(2, "0")}</span>
          <button className="role-model-button" onClick={() => goTo(activePage + 1)} disabled={activePage === pageCount - 1} aria-label="Next team page">›</button>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return <main>
    <header className="nav">
      <a className="brand" href="#top" onClick={close}><span className="brand-mark">WT</span><span>WebTea <em>HQ</em></span></a>
      <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
      <nav className={open ? "nav-links is-open" : "nav-links"}>
        {["About", "Services", "Roster", "Principles"].map(x => <a key={x} href={"#" + x.toLowerCase()} onClick={close}>{x}</a>)}
        <a className="nav-cta" href="#contact" onClick={close}>Start a project <ArrowUpRight size={15} /></a>
      </nav>
    </header>

    <section id="top" className="hero section-shell">
      <div className="eyebrow"><span className="pulse" /> AI-POWERED DIGITAL AGENCY · BETTIAH, INDIA</div>
      <div className="hero-grid"><div>
        <h1>Digital work.<br /><span>Made simple.</span></h1>
        <p className="hero-lede">{company.positioning}</p>
        <div className="hero-actions"><a className="button button-primary" href="#contact">Build with us <ArrowUpRight size={17} /></a><a className="button button-quiet" href="#services">Explore the system <span>↓</span></a></div>
      </div>
        <div className="signal-card"><div className="signal-top"><span>WEBTEA / 001</span><span>HQ</span></div><div className="signal-orbit"><div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit-core">WT</div></div><p>ESTABLISH → BUILD → AUTOMATE → GROW</p></div></div>
      <div className="hero-footer"><span>Founded {company.founded}</span><span>India → Worldwide</span><span>Agency × Startup</span></div>
    </section>

    <section id="about" className="section-shell manifesto"><div className="section-kicker">01 / WHAT IS WEBTEA HQ?</div>
      <div className="manifesto-grid"><h2>All the digital work your business needs — <span>connected.</span></h2><div className="copy-stack"><p>{company.description}</p><p>{company.nameMeaning}</p><div className="definition"><span>WEBTEA HQ</span><strong>Headquarters for making online work feel as simple as sipping tea.</strong></div></div></div>
    </section>

    <section id="services" className="section-shell services"><div className="section-kicker">02 / CAPABILITIES</div>
      <div className="section-heading"><h2>One partner.<br /><span>Many systems.</span></h2><p>From the first digital footprint to the systems behind growth, WebTea HQ combines creative production and technology under one roof.</p></div>
      <div className="service-grid">{company.services.map((s, i) => { const Icon = serviceIcons[i]; return <article className="service-card" key={s.name}><div className="service-number">0{i + 1}</div><Icon size={22} strokeWidth={1.6} /><h3>{s.name}</h3><p>{s.text}</p><span className="card-arrow"><ArrowUpRight size={17} /></span></article>; })}</div>
    </section>

    <section className="section-shell system-section"><div className="system-panel"><div><div className="section-kicker">03 / THE WEBTEA MODEL</div><h2>Complex behind the scenes.<br /><span>Simple on the surface.</span></h2></div><div className="flow">{company.hero.split(". ").map((x, i) => <div className="flow-step" key={x}><span>0{i + 1}</span><strong>{x}</strong></div>)}</div></div></section>

    <RoleModelSection />

    <section id="principles" className="section-shell principles"><div className="section-kicker">06 / HOW WE WORK</div><div className="principle-list">{company.principles.map(([n, t, d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

    <section id="contact" className="section-shell contact"><div className="contact-box"><div className="section-kicker">07 / LET'S BUILD</div><h2>Have a business that needs to <span>move?</span></h2><p>Tell us what you are trying to establish, build, automate or grow. We will figure out the digital system around it.</p><a className="button button-primary" href="#about">Start a conversation <ArrowUpRight size={17} /></a><small>Official website domain and contact channel can be configured when your domain is ready.</small></div></section>

    <footer className="footer section-shell"><div className="brand"><span className="brand-mark">WT</span><span>WebTea <em>HQ</em></span></div><div><p>© {new Date().getFullYear()} WebTea HQ · Headquarters · Bettiah, Bihar, India</p><p>AI-powered digital agency × startup</p></div><a href="#top">Back to top ↑</a></footer>
  </main>;
}
