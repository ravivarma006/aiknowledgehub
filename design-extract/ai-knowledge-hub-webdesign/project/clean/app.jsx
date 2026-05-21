/* global React, ReactDOM */
// Clean white directory — black cards, click to expand.

const { useState, useEffect, useMemo, useCallback, useRef } = React;

const TOOLS      = window.TOOLS || [];
const CATEGORIES = window.CATEGORIES || [];
const URLS       = window.TOOL_URLS || {};

// Simple Icons CDN — colored brand glyphs
const iconUrl = (slug) => `https://cdn.simpleicons.org/${slug}/0a0a0a`;

function ToolIcon({ tool, big = false }) {
  const slug = tool.iconSlug;
  const [failed, setFailed] = useState(false);
  if (slug && !failed) {
    return (
      <img
        src={iconUrl(slug)}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <span className="letter">{tool.name.charAt(0)}</span>;
}

function ArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function Card({ tool, onOpen }) {
  return (
    <button className="card" onClick={() => onOpen(tool)} aria-label={`Open ${tool.name}`}>
      <div className="head">
        <div className="icon"><ToolIcon tool={tool} /></div>
        <div className="badges">
          {tool.isNew && <span className="badge new">New</span>}
          {tool.hasDocs && <span className="badge">Docs</span>}
        </div>
      </div>
      <h3>{tool.name}</h3>
      <div className="sub">{tool.sub}</div>
      <p>{tool.desc}</p>
      <div className="foot">
        <span>{tool.year || ''}</span>
        <span className="open">
          Open
          <span className="arrow"><ArrowIcon size={11} /></span>
        </span>
      </div>
    </button>
  );
}

function Modal({ tool, onClose }) {
  const open = !!tool;
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  // Keep last-rendered tool so the modal can animate out without flicker.
  const renderTool = useRef(null);
  if (tool) renderTool.current = tool;
  const t = renderTool.current;

  return (
    <div
      className={`modal-back ${open ? 'open' : ''}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={t ? t.name : ''}>
        {t && (
          <>
            <div className="modal-hd">
              <div className="icon"><ToolIcon tool={t} big /></div>
              <div className="titles">
                <h2>{t.name}</h2>
                <div className="sub">{t.sub}</div>
              </div>
              <button className="close" onClick={onClose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              {t.tagline && <p className="modal-tagline">"{t.tagline}"</p>}
              <p className="modal-desc">{t.longDesc || t.desc}</p>

              {t.features && t.features.length > 0 && (
                <div className="modal-section">
                  <h4>Features</h4>
                  <ul className="feat-grid">
                    {t.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}

              {(t.pros || t.cons) && (
                <div className="modal-section">
                  <h4>Pros &amp; trade-offs</h4>
                  <div className="proscons">
                    {t.pros && (
                      <div className="pc pros">
                        <h5>Strengths</h5>
                        <ul>{t.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
                      </div>
                    )}
                    {t.cons && (
                      <div className="pc cons">
                        <h5>Watch-outs</h5>
                        <ul>{t.cons.map((p, i) => <li key={i}>{p}</li>)}</ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {t.bestFor && t.bestFor.length > 0 && (
                <div className="modal-section">
                  <h4>Best for</h4>
                  <ul className="feat-grid">
                    {t.bestFor.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}

              <div className="meta-row">
                {t.pricing && <div className="m"><b>Pricing</b>{t.pricing}</div>}
                {t.year && <div className="m"><b>Since</b>{t.year}</div>}
                <div className="m"><b>Category</b>{(CATEGORIES.find(c => c.id === t.cat) || {}).name || t.cat}</div>
              </div>
            </div>

            <div className="modal-foot">
              <a
                className="btn btn-primary"
                href={URLS[t.id] || `https://www.google.com/search?q=${encodeURIComponent(t.name)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {t.name}
                <span className="arrow"><ArrowIcon size={14} /></span>
              </a>
              <button className="btn btn-ghost" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ThemeSwitch({ theme, setTheme }) {
  return (
    <div className="sb-theme" role="radiogroup" aria-label="Theme">
      <button
        className={theme === 'clean' ? 'on' : ''}
        onClick={() => setTheme('clean')}
        role="radio"
        aria-checked={theme === 'clean'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        Clean
      </button>
      <button
        className={theme === 'paper' ? 'on' : ''}
        onClick={() => setTheme('paper')}
        role="radio"
        aria-checked={theme === 'paper'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h9l5 5v13H6z" />
          <path d="M14 3v6h6" />
          <path d="M9 13h7M9 17h5" />
        </svg>
        Paper
      </button>
    </div>
  );
}

function Sidebar({ activeCat, setActiveCat, query, setQuery, counts, onlyNew, setOnlyNew, onlyDocs, setOnlyDocs, theme, setTheme }) {
  return (
    <aside className="sidebar">
      <a className="sb-brand" href="#top">
        <span className="mark">N</span>
        <span>Nexus <em>directory</em></span>
      </a>

      <div className="sb-search">
        <SearchIcon />
        <input
          type="search"
          placeholder="Search tools…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="clear" onClick={() => setQuery('')} aria-label="Clear search">×</button>
        )}
      </div>

      <div className="sb-section">Library</div>
      <nav className="sb-nav" role="tablist" aria-label="Categories">
        <button
          className={`sb-item ${activeCat === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCat('all')}
          role="tab"
          aria-selected={activeCat === 'all'}
        >
          <span className="sb-dot"></span>
          <span className="sb-label">All tools</span>
          <span className="sb-ct">{counts.all}</span>
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`sb-item ${activeCat === c.id ? 'active' : ''}`}
            onClick={() => setActiveCat(c.id)}
            role="tab"
            aria-selected={activeCat === c.id}
          >
            <span className="sb-dot"></span>
            <span className="sb-label">{c.name}</span>
            <span className="sb-ct">{counts[c.id] || 0}</span>
          </button>
        ))}
      </nav>

      <div className="sb-section">Filters</div>
      <button
        className={`sb-toggle ${onlyNew ? 'on' : ''}`}
        onClick={() => setOnlyNew(v => !v)}
        aria-pressed={onlyNew}
      >
        <span>New only</span>
        <span className="knob"></span>
      </button>
      <button
        className={`sb-toggle ${onlyDocs ? 'on' : ''}`}
        onClick={() => setOnlyDocs(v => !v)}
        aria-pressed={onlyDocs}
      >
        <span>Has docs</span>
        <span className="knob"></span>
      </button>

      <div className="sb-section">Theme</div>
      <ThemeSwitch theme={theme} setTheme={setTheme} />

      <div className="sb-foot">
        {TOOLS.length} tools · {CATEGORIES.length} categories<br/>
        Updated {new Date().getFullYear()} ·{' '}
        <a href="AI Knowledge Hub - Web.html">Dark version</a>
      </div>
    </aside>
  );
}

function App() {
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');
  const [openTool, setOpenTool] = useState(null);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyDocs, setOnlyDocs] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('nexus-theme') || 'clean'; }
    catch { return 'clean'; }
  });

  // Sync theme → <body class>
  useEffect(() => {
    document.body.classList.toggle('theme-paper', theme === 'paper');
    try { localStorage.setItem('nexus-theme', theme); } catch {}
  }, [theme]);

  const counts = useMemo(() => {
    const m = { all: TOOLS.length };
    for (const c of CATEGORIES) m[c.id] = 0;
    for (const t of TOOLS) m[t.cat] = (m[t.cat] || 0) + 1;
    return m;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((t) => {
      if (activeCat !== 'all' && t.cat !== activeCat) return false;
      if (onlyNew && !t.isNew) return false;
      if (onlyDocs && !t.hasDocs) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        (t.desc || '').toLowerCase().includes(q) ||
        (t.tagline || '').toLowerCase().includes(q) ||
        (t.sub || '').toLowerCase().includes(q)
      );
    });
  }, [activeCat, query, onlyNew, onlyDocs]);

  const open = useCallback((t) => setOpenTool(t), []);
  const close = useCallback(() => setOpenTool(null), []);

  const activeCatName =
    activeCat === 'all'
      ? 'All tools'
      : (CATEGORIES.find(c => c.id === activeCat) || {}).name || activeCat;

  return (
    <>
      <div className="shell">
        <Sidebar
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          query={query}
          setQuery={setQuery}
          counts={counts}
          onlyNew={onlyNew}
          setOnlyNew={setOnlyNew}
          onlyDocs={onlyDocs}
          setOnlyDocs={setOnlyDocs}
          theme={theme}
          setTheme={setTheme}
        />

        <main className="main" id="top">
          <div className="main-inner">
            <div className="topbar">
              <div className="topbar-row">
                <div className="crumbs">
                  Directory <span className="sep">/</span> <b>{activeCatName}</b>
                </div>
                <div className="topbar-tools">
                  <span><span className="count">{filtered.length}</span> of {TOOLS.length} shown</span>
                </div>
              </div>
            </div>

            <section className="hero">
              <div className="hero-eyebrow"><span className="dot"></span>The modern web stack · 2026 edition</div>
              <h1>
                {activeCat === 'all'
                  ? <>A clean <em>directory</em> of the tools we actually use.</>
                  : <>{activeCatName} <em>tools</em>, in one place.</>}
              </h1>
              <p className="lede">
                {activeCat === 'all'
                  ? `${TOOLS.length} hand-picked tools across AI, data, backend, cloud, frontend, dev tools, design, and productivity — each with a short description, the trade-offs, and a link to the source.`
                  : (CATEGORIES.find(c => c.id === activeCat) || {}).desc}
              </p>
              <div className="hero-meta">
                <div className="stat"><div className="n">{filtered.length}</div><div className="l">Showing</div></div>
                <div className="stat"><div className="n">{TOOLS.length}</div><div className="l">Total</div></div>
                <div className="stat"><div className="n">{TOOLS.filter(t => t.isNew).length}</div><div className="l">New in 2024–26</div></div>
              </div>
            </section>

            <section className="section">
              <div className="section-head">
                <h2>{activeCat === 'all' ? <>All <em>tools</em></> : activeCatName}</h2>
                <div className="meta">{filtered.length} {filtered.length === 1 ? 'tool' : 'tools'}</div>
              </div>
              {filtered.length === 0 ? (
                <div className="empty">No tools match — try a different search.</div>
              ) : (
                <div className="grid">
                  {filtered.map((t) => <Card key={t.id} tool={t} onOpen={open} />)}
                </div>
              )}
            </section>

            <footer className="footer">
              <div className="footer-row">
                <div>Nexus directory · {TOOLS.length} tools · curated {new Date().getFullYear()}</div>
                <div className="links">
                  <a href="#top">Top</a>
                  <a href="AI Knowledge Hub - Web.html">Dark version</a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>

      <Modal tool={openTool} onClose={close} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
