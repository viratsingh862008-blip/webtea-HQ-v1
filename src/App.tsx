import { useState } from "react";
import { ArrowUpRight, Menu, X, Zap, Globe2, Bot, Workflow, Clapperboard, Search, Sparkles } from "lucide-react";
import { company } from "./data/company.mjs";

const serviceIcons = [Globe2, Bot, Workflow, Search, Clapperboard, Sparkles];

export default function App() {
  const [open,setOpen] = useState(false);
  const close=()=>setOpen(false);
  return <main>
    <header className="nav">
      <a className="brand" href="#top" onClick={close}><span className="brand-mark">WT</span><span>WebTea <em>HQ</em></span></a>
      <button className="menu-toggle" aria-label={open?"Close menu":"Open menu"} onClick={()=>setOpen(!open)}>{open?<X size={21}/>:<Menu size={21}/>}</button>
      <nav className={open?"nav-links is-open":"nav-links"}>
        {["About","Services","People","Principles"].map(x=><a key={x} href={"#"+x.toLowerCase()} onClick={close}>{x}</a>)}
        <a className="nav-cta" href="#contact" onClick={close}>Start a project <ArrowUpRight size={15}/></a>
      </nav>
    </header>

    <section id="top" className="hero section-shell">
      <div className="eyebrow"><span className="pulse"/> AI-POWERED DIGITAL AGENCY · BETTIAH, INDIA</div>
      <div className="hero-grid"><div>
        <h1>Digital work.<br/><span>Made simple.</span></h1>
        <p className="hero-lede">{company.positioning}</p>
        <div className="hero-actions"><a className="button button-primary" href="#contact">Build with us <ArrowUpRight size={17}/></a><a className="button button-quiet" href="#services">Explore the system <span>↓</span></a></div>
      </div>
      <div className="signal-card"><div className="signal-top"><span>WEBTEA / 001</span><span>HQ</span></div><div className="signal-orbit"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit-core">WT</div></div><p>ESTABLISH → BUILD → AUTOMATE → GROW</p></div></div>
      <div className="hero-footer"><span>Founded {company.founded}</span><span>India → Worldwide</span><span>Agency × Startup</span></div>
    </section>

    <section id="about" className="section-shell manifesto"><div className="section-kicker">01 / WHAT IS WEBTEA HQ?</div>
      <div className="manifesto-grid"><h2>All the digital work your business needs — <span>connected.</span></h2><div className="copy-stack"><p>{company.description}</p><p>{company.nameMeaning}</p><div className="definition"><span>WEBTEA HQ</span><strong>Headquarters for making online work feel as simple as sipping tea.</strong></div></div></div>
    </section>

    <section id="services" className="section-shell services"><div className="section-kicker">02 / CAPABILITIES</div>
      <div className="section-heading"><h2>One partner.<br/><span>Many systems.</span></h2><p>From the first digital footprint to the systems behind growth, WebTea HQ combines creative production and technology under one roof.</p></div>
      <div className="service-grid">{company.services.map((s,i)=>{const Icon=serviceIcons[i];return <article className="service-card" key={s.name}><div className="service-number">0{i+1}</div><Icon size={22} strokeWidth={1.6}/><h3>{s.name}</h3><p>{s.text}</p><span className="card-arrow"><ArrowUpRight size={17}/></span></article>})}</div>
    </section>

    <section className="section-shell system-section"><div className="system-panel"><div><div className="section-kicker">03 / THE WEBTEA MODEL</div><h2>Complex behind the scenes.<br/><span>Simple on the surface.</span></h2></div><div className="flow">{company.hero.split(". ").map((x,i)=><div className="flow-step" key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div></div></section>

    <section id="people" className="section-shell people"><div className="section-kicker">04 / PEOPLE + AI</div>
      <div className="people-heading"><h2>Human direction.<br/><span>Machine leverage.</span></h2><p>WebTea HQ is built around people who make decisions and AI systems that make execution faster.</p></div>
      <div className="people-grid">
        {[...company.founders,...company.team].map(p=><article className="person-card" key={p.name}><div className="person-top"><span>{p.alias}</span><span>WEBTEA HQ</span></div><div><div className="person-initial">{p.name.split(" ").map(n=>n[0]).join("")}</div><h3>{p.name}</h3><p className="role">{p.role}</p><p>{p.bio}</p></div><div className="person-links">{Object.entries(p.links??{}).map(([l,h])=><a href={h} target="_blank" rel="noreferrer" key={l}>{l} <ArrowUpRight size={13}/></a>)}</div></article>)}
        {company.aiTeam.map(p=><article className="person-card ai-card" key={p.name}><div className="person-top"><span>AI EMPLOYEE</span><span>ONLINE</span></div><div><div className="ai-mark"><Zap size={21}/></div><h3>{p.name}</h3><p className="role">{p.role}</p><p>{p.bio}</p></div><div className="ai-status"><span className="pulse"/> SYSTEM LAYER</div></article>)}
      </div>
    </section>

    <section id="principles" className="section-shell principles"><div className="section-kicker">05 / HOW WE WORK</div><div className="principle-list">{company.principles.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>

    <section id="contact" className="section-shell contact"><div className="contact-box"><div className="section-kicker">06 / LET'S BUILD</div><h2>Have a business that needs to <span>move?</span></h2><p>Tell us what you are trying to establish, build, automate or grow. We will figure out the digital system around it.</p><a className="button button-primary" href="mailto:hello@webteahq.com">Start a conversation <ArrowUpRight size={17}/></a><small>Official website domain and contact channel can be configured when your domain is ready.</small></div></section>

    <footer className="footer section-shell"><div className="brand"><span className="brand-mark">WT</span><span>WebTea <em>HQ</em></span></div><div><p>© {new Date().getFullYear()} WebTea HQ · Headquarters · Bettiah, Bihar, India</p><p>AI-powered digital agency × startup</p></div><a href="#top">Back to top ↑</a></footer>
  </main>;
}