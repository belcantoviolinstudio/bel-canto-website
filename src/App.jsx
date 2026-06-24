import { useState } from "react";

// ── GLOBAL STYLES ──────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IM+Fell+English:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=JetBrains+Mono:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #0e0806; }

  :root {
    --rouge:     #8B1A24;
    --rouge-l:   #A8262F;
    --rouge-d:   #5C0F16;
    --gold:      #C9A05A;
    --gold-l:    #E8C882;
    --cream:     #F0E6D0;
    --parchment: #D4C4A0;
    --ink:       #0e0806;
    --ink-l:     #161008;
    --ink-m:     #1e160e;
    --ink-ll:    #2a1e12;
    --border:    #3A2418;
    --muted:     #A89880;
    --faint:     #7A6858;
    --faintest:  #4A3828;
  }

  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-thumb { background: var(--rouge-d); border-radius: 2px; }

  .wrap {
    min-height: 100vh;
    background: var(--ink);
    color: var(--cream);
    font-family: 'Cormorant Garamond', Georgia, serif;
    position: relative;
  }

  /* Grain */
  .grain::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: 0.7;
  }

  /* Vignette */
  .grain::after {
    content: '';
    position: fixed; inset: 0;
    background: radial-gradient(ellipse at center, transparent 50%, rgba(8,4,2,0.6) 100%);
    pointer-events: none; z-index: 0;
  }

  .page-content { position: relative; z-index: 1; }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    background: rgba(14,8,6,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--faintest);
    padding: 0 40px;
    display: flex; align-items: center; justify-content: space-between;
    height: 64px;
  }
 .nav-logo {
  font-family: 'IM Fell English', serif;
  font-size: 18px; font-style: italic;
  color: var(--cream); cursor: pointer;
  letter-spacing: 0.02em;
  background: none; border: none; padding: 0;
}
  .nav-logo span { color: var(--rouge-l); }
  .nav-links {
    display: flex; align-items: center; gap: 28px;
  }
  .nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--faint);
    cursor: pointer; background: none; border: none;
    padding: 0; transition: color 0.2s;
  }
  .nav-link:hover, .nav-link.active { color: var(--gold); }
  .nav-book {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.18em;
    text-transform: uppercase;
    background: var(--rouge);
    color: var(--cream); border: none;
    padding: 8px 18px; border-radius: 2px;
    cursor: pointer; transition: background 0.2s;
  }
  .nav-book:hover { background: var(--rouge-l); }
  .nav-mobile-btn {
    display: none; background: none; border: none;
    color: var(--muted); cursor: pointer; font-size: 20px;
  }

  /* ── FOOTER ── */
  .footer {
    border-top: 1px solid var(--faintest);
    padding: 48px 40px 32px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
  }
  .footer-brand { }
  .footer-logo {
    font-family: 'IM Fell English', serif;
    font-size: 20px; font-style: italic;
    color: var(--cream); margin-bottom: 12px;
  }
  .footer-logo span { color: var(--rouge-l); }
  .footer-tagline {
    font-size: 14px; color: var(--faint);
    line-height: 1.6; font-weight: 300; font-style: italic;
  }
  .footer-col-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--rouge-d);
    margin-bottom: 16px;
  }
  .footer-link {
    display: block; font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--faint);
    cursor: pointer; background: none; border: none;
    padding: 0; margin-bottom: 10px; transition: color 0.2s;
    text-align: left;
  }
  .footer-link:hover { color: var(--gold); }
  .footer-bottom {
    border-top: 1px solid var(--faintest);
    padding: 20px 40px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; color: var(--faintest); letter-spacing: 0.1em;
  }
  .footer-insta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; color: var(--rouge-d);
    letter-spacing: 0.1em; cursor: pointer;
    background: none; border: none; padding: 0;
    transition: color 0.2s;
  }
  .footer-insta:hover { color: var(--gold); }

  /* ── SHARED TYPOGRAPHY ── */
  .eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; letter-spacing: 0.28em;
    text-transform: uppercase; color: var(--rouge-l);
    display: block; margin-bottom: 16px;
  }
  h1.display {
    font-family: 'IM Fell English', serif;
    font-size: clamp(42px, 7vw, 72px);
    font-weight: 400; line-height: 1.0;
    letter-spacing: 0.01em; color: var(--cream);
    margin-bottom: 28px;
  }
  h1.display em { color: var(--rouge-l); font-style: italic; }
  h2.section-title {
    font-family: 'IM Fell English', serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 400; line-height: 1.15;
    color: var(--cream); margin-bottom: 20px;
  }
  h2.section-title em { color: var(--rouge-l); font-style: italic; }
  h3.card-title {
    font-family: 'IM Fell English', serif;
    font-size: 22px; font-weight: 400;
    color: var(--cream); margin-bottom: 10px;
  }
  .lead {
    font-size: clamp(17px, 2.5vw, 20px);
    line-height: 1.8; color: var(--muted);
    font-weight: 300; margin-bottom: 24px;
  }
  .body-text {
    font-size: 16px; line-height: 1.75;
    color: var(--faint); font-weight: 300;
  }
  .rule { border: none; border-top: 1px solid var(--faintest); margin: 48px 0; }
  .ornament {
    text-align: center; color: var(--rouge-d);
    font-size: 20px; letter-spacing: 16px;
    opacity: 0.5; margin: 40px 0;
  }

  /* ── LAYOUT ── */
  .container { max-width: 1000px; margin: 0 auto; padding: 0 40px; }
  .container-sm { max-width: 680px; margin: 0 auto; padding: 0 40px; }
  .pt-nav { padding-top: 120px; }
  .pb-lg { padding-bottom: 80px; }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex; align-items: center;
    padding: 120px 40px 80px;
    position: relative;
  }
  .hero-inner { max-width: 720px; }
  .hero-rule {
    width: 48px; height: 1px;
    background: var(--rouge); margin-bottom: 32px;
  }
  .manifesto-block {
    border-left: 1px solid var(--rouge-d);
    padding: 4px 0 4px 28px;
    margin: 36px 0;
  }
  .manifesto-block p {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 2.5vw, 22px);
    line-height: 1.85; color: var(--parchment);
    font-weight: 300; font-style: italic;
  }
  .manifesto-block p em { color: var(--gold-l); font-style: normal; }

  /* ── BUTTONS ── */
  .btn-primary {
    background: var(--rouge); color: var(--cream);
    border: none; border-radius: 2px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: 0.18em;
    text-transform: uppercase; padding: 14px 36px;
    cursor: pointer; transition: all 0.2s; display: inline-block;
  }
  .btn-primary:hover { background: var(--rouge-l); }
  .btn-outline {
    background: none; color: var(--muted);
    border: 1px solid var(--border); border-radius: 2px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px; letter-spacing: 0.18em;
    text-transform: uppercase; padding: 13px 36px;
    cursor: pointer; transition: all 0.2s; display: inline-block;
  }
  .btn-outline:hover { border-color: var(--gold); color: var(--gold); }
  .btn-row { display: flex; gap: 14px; flex-wrap: wrap; }

  /* ── CARDS ── */
  .card {
    background: var(--ink-l);
    border: 1px solid var(--faintest);
    border-radius: 2px; padding: 28px;
    transition: border-color 0.2s;
  }
  .card:hover { border-color: var(--border); }
  .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 40px; }
  .card-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--rouge-d);
    margin-bottom: 12px; display: block;
  }

  /* ── PHILOSOPHY TRINITY ── */
  .trinity { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: var(--faintest); margin: 48px 0; }
  .trinity-item { background: var(--ink); padding: 36px 28px; }
  .trinity-num {
    font-family: 'IM Fell English', serif;
    font-size: 48px; color: var(--rouge-d);
    opacity: 0.4; line-height: 1; margin-bottom: 16px;
  }
  .trinity-title {
    font-family: 'IM Fell English', serif;
    font-size: 22px; color: var(--cream);
    margin-bottom: 12px; font-style: italic;
  }

  /* ── SECTION BAND ── */
  .band {
    background: var(--ink-l);
    border-top: 1px solid var(--faintest);
    border-bottom: 1px solid var(--faintest);
    padding: 64px 40px;
    margin: 48px 0;
  }

  /* ── AUDITION ORGS ── */
  .org-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px,1fr)); gap: 16px; margin: 32px 0; }
  .org-card {
    background: var(--ink-l); border: 1px solid var(--faintest);
    border-radius: 2px; padding: 24px;
  }
  .org-card:hover { border-color: var(--rouge-d); }
  .org-name {
    font-family: 'IM Fell English', serif;
    font-size: 20px; color: var(--cream); margin-bottom: 6px;
  }
  .org-full {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; letter-spacing: 0.12em;
    text-transform: uppercase; color: var(--rouge-d);
    margin-bottom: 14px; display: block;
  }

  /* ── FORMS (Contact) ── */
  .form-field { margin-bottom: 20px; }
  .form-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--faint);
    display: block; margin-bottom: 8px;
  }
  .form-input {
    width: 100%; background: var(--ink-l);
    border: 1px solid var(--border); border-radius: 2px;
    color: var(--cream); font-family: 'Cormorant Garamond', serif;
    font-size: 17px; font-weight: 300; padding: 11px 14px;
    outline: none; transition: border-color 0.2s;
  }
  .form-input:focus { border-color: var(--rouge-d); }
  textarea.form-input { resize: vertical; min-height: 120px; line-height: 1.6; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* ── FAQ ── */
  .faq-item {
    border-bottom: 1px solid var(--faintest);
    padding: 24px 0;
  }
  .faq-q {
    font-family: 'IM Fell English', serif;
    font-size: 20px; color: var(--cream);
    margin-bottom: 12px; cursor: pointer;
    display: flex; justify-content: space-between; align-items: center;
  }
  .faq-q span { color: var(--rouge-d); font-size: 18px; }
  .faq-a { font-size: 16px; color: var(--faint); line-height: 1.75; font-weight: 300; }

  /* ── POLICIES ── */
  .policy-section { margin-bottom: 48px; }
  .policy-title {
    font-family: 'IM Fell English', serif;
    font-size: 24px; color: var(--cream);
    margin-bottom: 16px; font-style: italic;
  }

  /* ── ABOUT QUOTE ── */
  .about-quote {
    border: 1px solid var(--rouge-d);
    border-radius: 2px; padding: 32px 36px;
    margin: 40px 0; background: var(--ink-l);
  }
  .about-quote p {
    font-family: 'IM Fell English', serif;
    font-size: clamp(20px, 3vw, 26px);
    font-style: italic; color: var(--parchment);
    line-height: 1.6;
  }
  .about-quote cite {
    display: block; margin-top: 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px; letter-spacing: 0.2em;
    text-transform: uppercase; color: var(--rouge-d);
  }

  /* ── PLACEHOLDER ── */
  .placeholder {
    background: var(--ink-l); border: 1px dashed var(--faintest);
    border-radius: 2px; padding: 32px;
    text-align: center;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px; letter-spacing: 0.14em;
    text-transform: uppercase; color: var(--faintest);
  }

  /* ── AISLE LINK ── */
  .aisle-band {
    background: var(--rouge-d); padding: 48px 40px;
    text-align: center; margin: 48px 0;
    border-top: 1px solid var(--rouge);
    border-bottom: 1px solid var(--rouge);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-mobile-btn { display: block; }
    .trinity { grid-template-columns: 1fr; }
    .footer { grid-template-columns: 1fr; gap: 32px; }
    .footer-bottom { flex-direction: column; gap: 12px; }
    .grid-2 { grid-template-columns: 1fr; }
    .hero { padding: 100px 24px 60px; }
    .container, .container-sm { padding: 0 24px; }
    .nav { padding: 0 24px; }
    .band { padding: 48px 24px; }
    .aisle-band { padding: 40px 24px; }
    .footer { padding: 40px 24px 24px; }
    .footer-bottom { padding: 20px 24px; }
  }

  /* Animations */
  .fade-in { animation: fadeIn 0.5s ease; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
`;

// ── NAV ITEMS ─────────────────────────────────────────────────────
const NAV_ITEMS = [
  { label: "About",      page: "about" },
  { label: "Philosophy", page: "philosophy" },
  { label: "Repertoire", page: "repertoire" },
  { label: "Ensembles",  page: "ensembles" },
  { label: "Auditions",  page: "auditions" },
  { label: "FAQ",        page: "faq" },
  { label: "Policies",   page: "policies" },
  { label: "Contact",    page: "contact" },
];

// ── NAV COMPONENT ────────────────────────────────────────────────
function Nav({ page, setPage }) {
  return (
    <nav className="nav">
      <button className="nav-logo" onClick={() => setPage("home")}>
        Bel <span>Canto</span> Violin Studio
      </button>
      <div className="nav-links">
        {NAV_ITEMS.map(n => (
          <button key={n.page} className={`nav-link ${page === n.page ? "active" : ""}`} onClick={() => setPage(n.page)}>{n.label}</button>
        ))}
        <button className="nav-book" onClick={() => setPage("booking")}>Book a Trial →</button>
      </div>
    </nav>
  );
}

// ── FOOTER COMPONENT ──────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <>
      <footer className="footer">
        <div className="footer-brand">
          <div className="footer-logo">Bel <span>Canto</span> Violin Studio</div>
          <p className="footer-tagline">Without a true foundation,<br />there is no voice.</p>
        </div>
        <div>
          <div className="footer-col-title">Studio</div>
          {[["About","about"],["Philosophy","philosophy"],["Repertoire","repertoire"],["Ensembles","ensembles"],["Auditions","auditions"]].map(([l,p]) => (
            <button key={p} className="footer-link" onClick={() => setPage(p)}>{l}</button>
          ))}
        </div>
        <div>
          <div className="footer-col-title">Info</div>
          {[["FAQ","faq"],["Policies","policies"],["Contact","contact"],["Book a Trial","booking"]].map(([l,p]) => (
            <button key={p} className="footer-link" onClick={() => setPage(p)}>{l}</button>
          ))}
          <div style={{ marginTop: 24 }}>
            <div className="footer-col-title">Location</div>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"var(--faint)", lineHeight:1.8, letterSpacing:"0.08em" }}>
              Fresno / Clovis, California<br />
              belcantoviolin.live
            </p>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Bel Canto Violin Studio · All rights reserved</span>
        <button className="footer-insta">@belcantoviolin ↗</button>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: HOME
// ══════════════════════════════════════════════════════════════════
function HomePage({ setPage }) {
  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <span className="eyebrow">Fresno · Clovis, California</span>
          <div className="hero-rule" />
          <h1 className="display">
            Where authentic<br />
            <em>violin voice</em><br />
            is born.
          </h1>
          <div className="manifesto-block">
            <p>
              The golden age of violin wasn't defined by standardization. It was defined by the diversity of personal voices — each player bringing their own authenticity to the instrument. But here's what's often forgotten: those voices only flourished because of <em>unshakeable fundamentals.</em> Without a true foundation, there is no voice. Bel Canto Violin Studio is built on this principle — we develop the technique that frees you to speak.
            </p>
          </div>
          <div className="btn-row">
            <button className="btn-primary" onClick={() => setPage("booking")}>Begin Inquiry →</button>
            <button className="btn-outline" onClick={() => setPage("philosophy")}>Our Philosophy</button>
          </div>
        </div>
      </section>

      {/* Trinity Preview */}
      <section className="band">
        <div className="container">
          <span className="eyebrow" style={{ textAlign:"center", display:"block", marginBottom:32 }}>The Foundation</span>
          <div className="trinity">
            {[
              ["I","Montessori","Every student learns differently. We observe, adapt, and meet them where they are."],
              ["II","Suzuki","Every child can learn music if taught properly. Talent is developed, not inherited."],
              ["III","Bel Canto","Technique is not the end — it is the only path toward authentic personal expression."],
            ].map(([n,t,d]) => (
              <div className="trinity-item" key={t}>
                <div className="trinity-num">{n}</div>
                <div className="trinity-title">{t}</div>
                <p className="body-text" style={{ fontSize:15 }}>{d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center", marginTop:32 }}>
            <button className="btn-outline" onClick={() => setPage("philosophy")}>Read the Full Philosophy →</button>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section style={{ padding:"64px 0" }}>
        <div className="container">
          <span className="eyebrow">What We Offer</span>
          <h2 className="section-title">Studio <em>Services</em></h2>
          <div className="card-grid">
            {[
              ["Private Lessons","30, 45, and 60-minute one-on-one instruction. Fundamentals-first, always.","about"],
              ["Ensemble & Group","Quartet coaching, chamber music, and group class instruction for all levels.","ensembles"],
              ["Audition Preparation","CODA, CMEA, Youth Orchestras of Fresno, and beyond. We prepare students for the stage.","auditions"],
              ["String Specialist","Available for school orchestra clinics, sectional coaching, and ensemble development.","ensembles"],
            ].map(([t,d,p]) => (
              <div className="card" key={t} style={{ cursor:"pointer" }} onClick={() => setPage(p)}>
                <span className="card-eyebrow">Studio</span>
                <h3 className="card-title">{t}</h3>
                <p className="body-text" style={{ fontSize:15 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="band" style={{ textAlign:"center" }}>
        <div className="container-sm">
          <span className="eyebrow">Free Trial Lesson</span>
          <h2 className="section-title">Ready to find<br /><em>your voice?</em></h2>
          <p className="lead">Every journey begins with a single lesson. The inquiry takes five minutes.</p>
          <button className="btn-primary" onClick={() => setPage("booking")}>Begin Inquiry →</button>
        </div>
      </section>

      <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: ABOUT
// ══════════════════════════════════════════════════════════════════
function AboutPage({ setPage }) {
  return (
    <div className="fade-in pt-nav pb-lg">
      <div className="container-sm">
        <span className="eyebrow">About</span>
        <h1 className="display">The <em>Studio</em></h1>

        <div className="manifesto-block">
          <p>
            Without a true foundation, there is no voice. Bel Canto Violin Studio exists to build that foundation — and to free every student to speak authentically through their instrument.
          </p>
        </div>

        <hr className="rule" />

        <h2 className="section-title" style={{ marginBottom:24 }}>About <em>Will</em></h2>
        <p className="lead">
          Will grew up in Montessori environments in Taipei, Taiwan, where his mother and aunt are both Montessori school principals and owners. He observed firsthand how children learn best when met with intention and freedom.
        </p>
        <p className="body-text" style={{ marginBottom:20 }}>
          He trained in the Suzuki method, embracing its foundational belief: every child can learn music if taught properly. Talent is not inherited — it is developed through the right environment, the right instruction, and consistent, intentional practice.
        </p>
        <p className="body-text" style={{ marginBottom:40 }}>
          His approach to violin — rooted in bel canto principles — honors the golden age of violin playing: technique that frees authentic voice. He served as Concertmaster of Youth Orchestras of Fresno for three years, leading the string section and understanding firsthand what it takes to excel at the highest level.
        </p>

        <div className="about-quote">
          <p>"Every child can learn music if taught properly. Talent is developed, not inherited."</p>
          <cite>— Shinichi Suzuki, foundational influence</cite>
        </div>

        <hr className="rule" />

        <h2 className="section-title" style={{ marginBottom:20 }}>The <em>Mission</em></h2>
        <p className="lead">
          Bel Canto Violin Studio honors the golden age principle of violin playing: unshakeable technique that frees authentic personal voice.
        </p>
        <p className="body-text" style={{ marginBottom:20 }}>
          We build this foundation through a thoughtful blend of three methodologies: Montessori observation, Suzuki methodology, and bel canto singing principles applied to violin. The result: students develop mastery of fundamentals while discovering their own authentic musical voice.
        </p>
        <p className="body-text">
          Without technique, there is no voice. But technique without intention is hollow. We build both.
        </p>

        <div style={{ marginTop:48 }}>
          <button className="btn-primary" onClick={() => setPage("philosophy")}>Read the Full Philosophy →</button>
        </div>

        <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: PHILOSOPHY
// ══════════════════════════════════════════════════════════════════
function PhilosophyPage({ setPage }) {
  return (
    <div className="fade-in pt-nav pb-lg">
      <div className="container-sm">
        <span className="eyebrow">Philosophy</span>
        <h1 className="display">The <em>Foundation</em></h1>
        <p className="lead">
          Three methodologies, unified by one principle: that every student deserves the foundation to find their own authentic voice.
        </p>

        <div className="manifesto-block">
          <p>
            The golden age of violin wasn't defined by standardization. It was defined by the diversity of personal voices — each player bringing their own authenticity to the instrument. But here's what's often forgotten: those voices only flourished because of <em>unshakeable fundamentals.</em> Without a true foundation, there is no voice. Bel Canto Violin Studio is built on this principle — we develop the technique that frees you to speak.
          </p>
        </div>

        <hr className="rule" />

        {/* Trinity */}
        {[
          {
            num: "I",
            title: "Montessori",
            sub: "Observation & Individual Freedom",
            body: [
              "Every student is different. They learn at different paces, respond to different approaches, and carry different histories into the studio. The Montessori philosophy — observed firsthand in environments run by family — teaches that the most effective instruction begins with observation, not prescription.",
              "In practice, this means we meet students where they are. We adapt. We watch how they respond, where they struggle, and where they naturally excel. Instruction is tailored — not templated.",
              "Freedom within structure is the Montessori way. Students are guided, not controlled. Their curiosity is honored, their pace respected. The teacher is a guide, not an authority.",
            ]
          },
          {
            num: "II",
            title: "Suzuki",
            sub: "Every Child Can Learn",
            body: [
              "Shinichi Suzuki's foundational belief: every child can learn music if taught properly. Talent is not an accident of birth. It is the result of environment, instruction, consistency, and time.",
              "The Suzuki method emphasizes daily practice, listening, and parent partnership. Music is learned the way language is learned — through immersion, repetition, and nurturing encouragement. The first teacher is the most important teacher.",
              "This studio operates on this principle without exception. When a student struggles, we examine the instruction — not the student. If something isn't working, we find a better path.",
            ]
          },
          {
            num: "III",
            title: "Bel Canto",
            sub: "Technique That Frees Authentic Voice",
            body: [
              "Bel canto means beautiful singing. The golden age of violin was defined by players who sang through their instruments — each with a distinct, unmistakable voice. Kreisler didn't sound like Oistrakh. Heifetz didn't sound like Milstein. Their individuality was the art.",
              "What made this possible was mastery. Technique so solid it became invisible — allowing pure musical intention to emerge. Without that foundation, self-expression is impossible. You cannot sing what you cannot sustain.",
              "Vladimir Dyo's doctoral research at Temple University confirms this: bel canto vocal principles — tone production, resonance, vibrato, portamento — translate directly to violin. The instrument is a voice. We teach it accordingly.",
            ]
          },
        ].map(({ num, title, sub, body }) => (
          <div key={title} style={{ marginBottom:64 }}>
            <div style={{ display:"flex", alignItems:"baseline", gap:20, marginBottom:20 }}>
              <span style={{ fontFamily:"'IM Fell English',serif", fontSize:52, color:"var(--rouge-d)", opacity:0.4, lineHeight:1 }}>{num}</span>
              <div>
                <h2 className="section-title" style={{ marginBottom:4 }}><em>{title}</em></h2>
                <span className="eyebrow" style={{ color:"var(--faint)" }}>{sub}</span>
              </div>
            </div>
            {body.map((p,i) => <p key={i} className="body-text" style={{ marginBottom:16, fontSize:17 }}>{p}</p>)}
          </div>
        ))}

        <hr className="rule" />
        <div style={{ textAlign:"center" }}>
          <button className="btn-primary" onClick={() => setPage("booking")}>Begin Your Inquiry →</button>
        </div>
        <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: REPERTOIRE
// ══════════════════════════════════════════════════════════════════
function RepertoirePage() {
  return (
    <div className="fade-in pt-nav pb-lg">
      <div className="container">
        <span className="eyebrow">Repertoire & Books</span>
        <h1 className="display">Method &amp; <em>Repertoire</em></h1>
        <p className="lead">A carefully curated curriculum built on proven methods, essential etudes, and repertoire that develops both technical mastery and musical expression.</p>

        <hr className="rule" />

        {/* Method Books */}
        <h2 className="section-title" style={{ marginBottom:24 }}>Method <em>Books</em></h2>
        <div className="card-grid">
          {[
            ["Suzuki Violin School","Vols. 1–10","The foundational method series. Sequential repertoire and technique building from the very beginning through advanced study."],
            ["Wohlfahrt Etudes","Op. 45 · Beginner–Early Intermediate","Essential foundational etudes for developing bow technique, tone, and left hand facility."],
            ["Dont Etudes","Op. 37 & Op. 35 · Intermediate","Etudes bridging foundational technique toward advanced study. Op. 37 precedes Kreutzer; Op. 35 follows."],
            ["Kreutzer Etudes","42 Studies · Advanced","The standard for advanced bow technique. Required for serious students pursuing competitive and conservatory-level study."],
            ["Rodé Caprices","24 Caprices · Advanced–Pre-Virtuosic","The natural progression after Kreutzer. Essential for conservatory-bound students."],
            ["Sevcik","Various Op. · All Levels","Technical exercises for bow arm development, shifting, and finger dexterity. Used supplementally at every stage."],
          ].map(([t,sub,d]) => (
            <div className="card" key={t}>
              <span className="card-eyebrow">{sub}</span>
              <h3 className="card-title">{t}</h3>
              <p className="body-text" style={{ fontSize:15 }}>{d}</p>
            </div>
          ))}
        </div>

        <hr className="rule" />

        {/* Concerto & Repertoire */}
        <h2 className="section-title" style={{ marginBottom:24 }}>Concertos &amp; <em>Repertoire</em></h2>
        <div className="card-grid">
          {[
            ["Seitz Student Concertos","Early Intermediate","Op. 13, Op. 15, Op. 22. First concerto experience — first position with early shifting. Suzuki Books 3 & 4."],
            ["Vivaldi Concertos","Intermediate","A Minor Op. 3 No. 6, G Minor Op. 12. Essential baroque concerto development with more advanced positions. Suzuki Books 4 & 5."],
            ["Accolay Concerto No. 1","Intermediate","A Minor. A bridge between student concertos and mainstream repertoire — more complex shifting, double stops, and cadenza work."],
            ["Bach Double Concerto","Intermediate","BWV 1043. Ensemble playing, musical depth, and introduction to Bach style."],
            ["Mozart Concertos","Intermediate–Advanced","No. 3, 4, 5. Essential classical style, phrasing, and elegance. A major milestone in every serious student's development."],
            ["Mendelssohn Concerto","Advanced","E Minor, Op. 64. One of the great romantic concertos — the standard advanced milestone."],
          ].map(([t,sub,d]) => (
            <div className="card" key={t}>
              <span className="card-eyebrow">{sub}</span>
              <h3 className="card-title">{t}</h3>
              <p className="body-text" style={{ fontSize:15 }}>{d}</p>
            </div>
          ))}
        </div>

        <hr className="rule" />
        <div className="placeholder">Additional repertoire and specialized materials added based on each student's level, goals, and audition requirements.</div>
        <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: ENSEMBLES
// ══════════════════════════════════════════════════════════════════
function EnsemblesPage({ setPage }) {
  return (
    <div className="fade-in pt-nav">
      <div className="container">
        <span className="eyebrow">Ensembles & Group Classes</span>
        <h1 className="display">Beyond the <em>Individual</em></h1>
        <p className="lead">Music is ultimately a communal art. Group experience — whether in a quartet, chamber ensemble, or school orchestra — develops skills no private lesson can replicate.</p>

        <hr className="rule" />

        {/* Private Studio Services */}
        <h2 className="section-title" style={{ marginBottom:24 }}>Private Studio <em>Services</em></h2>
        <div className="card-grid">
          {[
            ["String Quartet Coaching","Ensemble development for quartets at any level. Intonation, blend, balance, and the art of musical conversation."],
            ["Chamber Music Coaching","Trios, quintets, and mixed ensembles. A focus on listening, phrasing, and collective musicianship."],
            ["Group Classes","Small group instruction for students at similar levels. Technique, theory, and ensemble fundamentals in a collaborative setting."],
          ].map(([t,d]) => (
            <div className="card" key={t}>
              <span className="card-eyebrow">Studio Service</span>
              <h3 className="card-title">{t}</h3>
              <p className="body-text" style={{ fontSize:15 }}>{d}</p>
            </div>
          ))}
        </div>

        <hr className="rule" />

        {/* String Specialist */}
        <div className="band" style={{ margin:"0 -40px" }}>
          <div className="container">
            <span className="eyebrow">School Programs</span>
            <h2 className="section-title">String <em>Specialist</em></h2>
            <p className="lead">Available for hire as a String Specialist for school orchestra programs throughout the Fresno and Central Valley region.</p>
            <p className="body-text" style={{ marginBottom:20 }}>
              This is not a generic coaching service. It is targeted, high-impact work focused on fundamentals, tone production, technique, and ensemble artistry — delivered at a standard your students deserve. The difference between a thriving string program and a struggling one is often the quality of specialized instruction they receive.
            </p>
            <p className="body-text" style={{ marginBottom:40 }}>
              Schools hire Will as an external String Specialist for sectional coaching, festival preparation, audition clinics, and ensemble development. No district affiliation required. Available on a per-session or recurring basis.
            </p>
            <div className="card-grid">
              {[
                ["Sectional Coaching","Targeted string section work. Technique, intonation, and ensemble cohesion."],
                ["Festival Preparation","Concert and festival prep clinics for school orchestras."],
                ["Audition Clinics","CODA, CMEA, and honor ensemble audition preparation for school students."],
                ["Ensemble Development","Building string program culture, technique, and musical standards from the ground up."],
              ].map(([t,d]) => (
                <div className="card" key={t}>
                  <span className="card-eyebrow">String Specialist</span>
                  <h3 className="card-title" style={{ fontSize:18 }}>{t}</h3>
                  <p className="body-text" style={{ fontSize:14 }}>{d}</p>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setPage("contact")} style={{ marginTop:8 }}>Inquire About String Specialist Services →</button>
          </div>
        </div>

        {/* Aisles to Afters */}
        <div className="aisle-band">
          <div className="container-sm" style={{ textAlign:"center" }}>
            <span className="eyebrow" style={{ color:"var(--gold)" }}>Performance</span>
            <h2 className="section-title" style={{ marginBottom:16 }}>Aisles to <em>Afters</em></h2>
            <p className="lead" style={{ marginBottom:28 }}>Live string quartet performances and DJ sets for weddings and events. Where classical artistry meets modern celebration.</p>
            <a href="https://aislestoafters.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
              <button className="btn-outline">Visit Aisles to Afters ↗</button>
            </a>
          </div>
        </div>

        <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: AUDITIONS
// ══════════════════════════════════════════════════════════════════
function AuditionsPage({ setPage }) {
  return (
    <div className="fade-in pt-nav pb-lg">
      <div className="container">
        <span className="eyebrow">Audition Preparation</span>
        <h1 className="display">Auditions &amp; <em>Opportunities</em></h1>
        <p className="lead">Preparing for an audition is an entire process — not just playing through the excerpts. It requires months of focused preparation, mental discipline, and strategic practice. This studio prepares students for every stage of that process.</p>

        <div className="about-quote">
          <p>"Will served as Concertmaster of Youth Orchestras of Fresno for three years — leading the string section and understanding firsthand what it takes to perform and compete at the highest level."</p>
        </div>

        <hr className="rule" />

        {/* Local Opportunities */}
        <h2 className="section-title" style={{ marginBottom:8 }}>Local <em>Opportunities</em></h2>
        <p className="body-text" style={{ marginBottom:32 }}>Fresno and the Central Valley offer significant ensemble opportunities for young string players at every level.</p>

        <div className="org-grid">
          <div className="org-card">
            <div className="org-name">Youth Orchestras of Fresno</div>
            <span className="org-full">YOOF · youthorchestrasfresno.org</span>
            <p className="body-text" style={{ fontSize:15, marginBottom:16 }}>
              Serving the Central Valley for over 75 years. Three orchestras organized by skill level, ranging from beginning students to the Youth Philharmonic Orchestra (the highest tier, primarily high school students). Students ages 5–18 from seven Central Valley counties.
            </p>
            <p className="body-text" style={{ fontSize:14, marginBottom:16 }}>
              Auditions held annually. Students audition for admission (not seating, which is determined separately). Rehearsals run August through May at Fresno State.
            </p>
            <p className="body-text" style={{ fontSize:14 }}>
              <strong style={{ color:"var(--cream)" }}>Tuition:</strong> ~$800/season · <strong style={{ color:"var(--cream)" }}>Contact:</strong> office@youthorchestrasfresno.org
            </p>
          </div>

          <div className="org-card">
            <div className="org-name" style={{ fontSize:16 }}>Additional Local Opportunities</div>
            <span className="org-full">Coming Soon</span>
            <div className="placeholder" style={{ marginTop:16 }}>
              Additional Fresno & Central Valley ensemble opportunities to be listed here.
            </div>
          </div>
        </div>

        <hr className="rule" />

        {/* State Level */}
        <h2 className="section-title" style={{ marginBottom:8 }}>State-Level <em>Competitions</em></h2>
        <p className="body-text" style={{ marginBottom:32 }}>California offers some of the most prestigious honor orchestra opportunities in the country. These take preparation, discipline, and time — we begin months in advance.</p>

        <div className="org-grid">
          <div className="org-card">
            <div className="org-name">CODA</div>
            <span className="org-full">California Orchestra Directors Association · codaorchestras.org</span>
            <p className="body-text" style={{ fontSize:15, marginBottom:16 }}>
              Runs the High School and Junior High All-State Orchestra auditions for string players in California. One of the most prestigious honor ensemble opportunities available to young string players in the state.
            </p>
            <p className="body-text" style={{ fontSize:14, marginBottom:8 }}>
              <strong style={{ color:"var(--cream)" }}>CODA Honor Orchestras</strong> — Auditions due September/October, performance in December (University of the Pacific, Stockton).
            </p>
            <p className="body-text" style={{ fontSize:14, marginBottom:8 }}>
              <strong style={{ color:"var(--cream)" }}>All-State Orchestras</strong> — Recordings submitted electronically by October/November. Performance in January/February at CASMEC.
            </p>
            <p className="body-text" style={{ fontSize:14 }}>
              <strong style={{ color:"var(--cream)" }}>Format:</strong> Recorded audition (scales + excerpts) · <strong style={{ color:"var(--cream)" }}>Fee:</strong> ~$680 participation
            </p>
          </div>

          <div className="org-card">
            <div className="org-name">CMEA</div>
            <span className="org-full">California Music Educators Association · Central Section</span>
            <p className="body-text" style={{ fontSize:15, marginBottom:16 }}>
              CMEA Central Section serves Fresno, Kern, Kings, Tulare, Madera, Mariposa, and Merced counties. Honors Orchestras for middle and high school students with auditions in fall and performances in spring.
            </p>
            <p className="body-text" style={{ fontSize:14 }}>
              <strong style={{ color:"var(--cream)" }}>Contact:</strong> cmeasection.org/central
            </p>
          </div>

          <div className="org-card">
            <div className="org-name">Additional Auditions</div>
            <span className="org-full">Allstate & Other Opportunities</span>
            <div className="placeholder" style={{ marginTop:16 }}>
              Additional state and regional audition opportunities to be listed here.
            </div>
          </div>
        </div>

        <hr className="rule" />

        {/* Preparation Process */}
        <h2 className="section-title" style={{ marginBottom:24 }}>The Preparation <em>Process</em></h2>
        <p className="lead">Audition preparation is not a last-minute affair. It is a structured, months-long process that touches technique, musicality, mental preparation, and performance confidence.</p>
        <div className="card-grid">
          {[
            ["Excerpt Analysis","Understanding what each audition panel is actually listening for — intonation, tone, rhythm, style."],
            ["Technical Preparation","Targeted etude and scale work to address the specific technical demands of each excerpt."],
            ["Mock Auditions","Simulated audition conditions to develop comfort, consistency, and performance under pressure."],
            ["Mental Preparation","Developing the mindset to perform at your best when it counts."],
          ].map(([t,d]) => (
            <div className="card" key={t}>
              <h3 className="card-title" style={{ fontSize:18 }}>{t}</h3>
              <p className="body-text" style={{ fontSize:15 }}>{d}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop:40, textAlign:"center" }}>
          <button className="btn-primary" onClick={() => setPage("booking")}>Begin Your Inquiry →</button>
        </div>
        <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: CONTACT
// ══════════════════════════════════════════════════════════════════
function ContactPage({ setPage }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  return (
    <div className="fade-in pt-nav pb-lg">
      <div className="container-sm">
        <span className="eyebrow">Contact</span>
        <h1 className="display">Get in <em>Touch</em></h1>
        <p className="lead">For general inquiries, String Specialist bookings, or questions about the studio. For trial lesson requests, use the booking portal.</p>

        <hr className="rule" />

        {sent ? (
          <div style={{ textAlign:"center", padding:"60px 0" }}>
            <div style={{ fontSize:36, marginBottom:20, color:"var(--rouge-l)" }}>𝄞</div>
            <h2 className="section-title">Message <em>Received</em></h2>
            <p className="lead">Will will be in touch shortly.</p>
          </div>
        ) : (
          <div>
            <div className="grid-2">
              <div className="form-field">
                <label className="form-label">First & Last Name</label>
                <input className="form-input" value={form.name} onChange={e=>set("name",e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={form.email} onChange={e=>set("email",e.target.value)} />
              </div>
            </div>
            <div className="grid-2">
              <div className="form-field">
                <label className="form-label">Phone Number</label>
                <input className="form-input" type="tel" value={form.phone} onChange={e=>set("phone",e.target.value)} />
              </div>
              <div className="form-field">
                <label className="form-label">Subject</label>
                <select className="form-input" value={form.subject} onChange={e=>set("subject",e.target.value)}>
                  <option value="">Select a subject</option>
                  <option>General Inquiry</option>
                  <option>String Specialist / School Program</option>
                  <option>Ensemble / Group Coaching</option>
                  <option>Aisles to Afters / Events</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Message</label>
              <textarea className="form-input" value={form.message} onChange={e=>set("message",e.target.value)} />
            </div>
            <div style={{ display:"flex", gap:14, marginTop:8, flexWrap:"wrap" }}>
              <button className="btn-primary" onClick={() => setSent(true)}>Send Message →</button>
              <button className="btn-outline" onClick={() => setPage("booking")}>Book a Trial Instead →</button>
            </div>
          </div>
        )}

        <hr className="rule" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }}>
          <div>
            <span className="eyebrow">Location</span>
            <p className="body-text">Fresno / Clovis, California<br />Central Valley</p>
          </div>
          <div>
            <span className="eyebrow">Online</span>
            <p className="body-text">belcantoviolin.live<br />@belcantoviolin</p>
          </div>
        </div>
        <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: FAQ
// ══════════════════════════════════════════════════════════════════
function FAQPage({ setPage }) {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["How do I get started?","Submit an inquiry through our booking portal. Will reviews each request personally and will be in touch within 1–2 business days to confirm your free trial lesson."],
    ["What age do you accept students?","[Placeholder — ages accepted, youngest student, etc.]"],
    ["What is the trial lesson?","The trial lesson is 30 minutes and completely free. It gives Will a chance to assess the student's level, and gives the student and family a chance to experience the studio firsthand."],
    ["How long are lessons?","Lessons are available in 30, 45, and 60-minute sessions. The appropriate length depends on the student's age, level, and goals."],
    ["How often are lessons?","Typically once per week. Consistency is essential to meaningful progress."],
    ["What is the cancellation policy?","24 hours or more notice: a makeup lesson will be scheduled. Less than 24 hours notice: a makeup lesson is at Will's discretion. See the full Policies page for details."],
    ["Do you offer in-home lessons?","In-home lessons are available on a selective, case-by-case basis. Pricing is determined by location and scheduling. Request via the booking portal."],
    ["What methods do you use?","The studio draws on Suzuki, Montessori principles, and bel canto violin technique. See the Philosophy page for the full approach."],
    ["Do you prepare students for auditions?","Yes — CODA, CMEA, Youth Orchestras of Fresno, and other regional and state auditions. Preparation is structured and begins months in advance."],
    ["Are you available for school programs?","Yes. Will is available as a String Specialist for school orchestra sectionals, festival prep, and ensemble development. Contact via the Contact page."],
  ];

  return (
    <div className="fade-in pt-nav pb-lg">
      <div className="container-sm">
        <span className="eyebrow">Frequently Asked Questions</span>
        <h1 className="display">Common <em>Questions</em></h1>
        <p className="lead">Everything you need to know before reaching out. If something isn't covered here, use the Contact page.</p>
        <hr className="rule" />
        {faqs.map(([q,a],i) => (
          <div className="faq-item" key={i}>
            <div className="faq-q" onClick={() => setOpen(open===i?null:i)}>
              {q} <span>{open===i?"−":"+"}</span>
            </div>
            {open===i && <p className="faq-a">{a}</p>}
          </div>
        ))}
        <div style={{ marginTop:48, textAlign:"center" }}>
          <button className="btn-primary" onClick={() => setPage("booking")}>Begin Your Inquiry →</button>
        </div>
        <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: POLICIES
// ══════════════════════════════════════════════════════════════════
function PoliciesPage() {
  return (
    <div className="fade-in pt-nav pb-lg">
      <div className="container-sm">
        <span className="eyebrow">Studio Policies</span>
        <h1 className="display">Policies &amp; <em>Expectations</em></h1>
        <p className="lead">Clear expectations make for a better experience for everyone. Please read before your first lesson.</p>
        <hr className="rule" />

        {[
          ["Cancellation Policy",
           "Cancellations made 24 hours or more in advance will receive a makeup lesson. Cancellations made less than 24 hours before the scheduled lesson time are at Will's discretion regarding makeup lessons. Repeated late cancellations may affect continued enrollment."],
          ["Practice Expectations",
           "[Placeholder — recommended practice time by age/level, parent involvement expectations, home practice guidelines.]"],
          ["Payment & Billing",
           "[Placeholder — billing cycle, payment methods, late payment policy, invoice details.]"],
          ["Attendance",
           "[Placeholder — attendance expectations, tardiness policy, consistent lesson scheduling.]"],
          ["Studio Conduct",
           "[Placeholder — behavior expectations for students and parents, phone policy during lessons, sibling/family guidelines.]"],
          ["Communication",
           "[Placeholder — preferred communication methods, response times, emergency contact procedures.]"],
          ["Materials & Equipment",
           "[Placeholder — instrument requirements by level, rosin, shoulder rest, music stand, practice materials.]"],
        ].map(([t,d]) => (
          <div className="policy-section" key={t}>
            <div className="policy-title">{t}</div>
            <p className="body-text">{d}</p>
          </div>
        ))}

        <hr className="rule" />
        <div className="placeholder">Full studio policies document — updated periodically. Last updated: 2026.</div>
        <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// PAGE: BOOKING (redirect notice — full booking page is separate)
// ══════════════════════════════════════════════════════════════════
function BookingPage() {
  return (
    <div className="fade-in pt-nav pb-lg" style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div className="container-sm" style={{ textAlign:"center", paddingTop:80, margin:"0 auto", width:"100%", maxWidth:680 }}>
        <span className="eyebrow">Trial Lesson Inquiry</span>
        <h1 className="display">Begin Your <em>Inquiry</em></h1>
        <p className="lead">The booking questionnaire is a five-minute guided process. It helps ensure this is the right fit — for you and for the student.</p>
        <div className="manifesto-block" style={{ textAlign:"left" }}>
          <p>Without a true foundation, there is no voice. This inquiry is the first step toward building yours.</p>
        </div>
        <button className="btn-primary" style={{ marginTop:16 }}>
          Open Booking Questionnaire →
        </button>
        <p className="body-text" style={{ marginTop:24, fontSize:13 }}>
          This will open the full multi-step booking portal at belcantoviolin.live/booking
        </p>
        <div className="ornament">𝄢 · 𝄞 · 𝄢</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ROOT APP
// ══════════════════════════════════════════════════════════════════
export default function BelCantoSite() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch(page) {
      case "home":        return <HomePage setPage={setPage} />;
      case "about":       return <AboutPage setPage={setPage} />;
      case "philosophy":  return <PhilosophyPage setPage={setPage} />;
      case "repertoire":  return <RepertoirePage />;
      case "ensembles":   return <EnsemblesPage setPage={setPage} />;
      case "auditions":   return <AuditionsPage setPage={setPage} />;
      case "contact":     return <ContactPage setPage={setPage} />;
      case "faq":         return <FAQPage setPage={setPage} />;
      case "policies":    return <PoliciesPage />;
      case "booking":     return <BookingPage />;
      default:            return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="wrap grain">
      <style>{GLOBAL_CSS}</style>
      <Nav page={page} setPage={setPage} />
      <div className="page-content">
        {renderPage()}
        <Footer setPage={setPage} />
      </div>
    </div>
  );
}
