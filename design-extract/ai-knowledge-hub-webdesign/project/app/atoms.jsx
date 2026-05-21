/* global React */
// Atoms: icons, bookmark button, tool card, skeletons, search

const { useState, useEffect, useRef } = React;

// ── Icon set (inline SVG) ────────────────────────────────
function Icon({ name, size = 20, stroke = 1.8, className = '' }) {
  const s = size;
  const sw = stroke;
  const common = {
    width: s, height: s, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round',
    className,
  };
  switch (name) {
    case 'search': return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'home':   return <svg {...common}><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>;
    case 'grid':   return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case 'bookmark': return <svg {...common}><path d="M6 3h12v18l-6-4-6 4z"/></svg>;
    case 'bookmark-fill': return <svg {...common} fill="currentColor"><path d="M6 3h12v18l-6-4-6 4z"/></svg>;
    case 'user':   return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/></svg>;
    case 'bell':   return <svg {...common}><path d="M6 9a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6z"/><path d="M10 18a2 2 0 0 0 4 0"/></svg>;
    case 'chev-r': return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
    case 'chev-l': return <svg {...common}><path d="m15 6-6 6 6 6"/></svg>;
    case 'arrow-up-right': return <svg {...common}><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>;
    case 'sparkle': return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5 5l2.5 2.5M16.5 16.5 19 19M5 19l2.5-2.5M16.5 7.5 19 5"/><circle cx="12" cy="12" r="2"/></svg>;
    case 'send':   return <svg {...common}><path d="M4 12 20 4l-3 16-5-6-6-2z"/></svg>;
    case 'x':      return <svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'flame':  return <svg {...common}><path d="M12 3c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 1-6 1-9z"/></svg>;
    case 'trend':  return <svg {...common}><path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h7v7"/></svg>;
    case 'filter': return <svg {...common}><path d="M4 5h16M7 12h10M10 19h4"/></svg>;
    case 'play':   return <svg {...common} fill="currentColor" stroke="none"><path d="M7 5v14l12-7z"/></svg>;
    case 'check':  return <svg {...common}><path d="m5 12 4 4 10-10"/></svg>;
    case 'share':  return <svg {...common}><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.6 10.5 15.4 7.5M8.6 13.5 15.4 16.5"/></svg>;
    case 'book':   return <svg {...common}><path d="M4 4h7a4 4 0 0 1 4 4v12"/><path d="M20 4h-7a4 4 0 0 0-4 4v12"/></svg>;
    case 'bolt':   return <svg {...common}><path d="M13 3 4 14h7l-1 7 9-11h-7z"/></svg>;
    case 'orb':    return <svg {...common} fill="currentColor" stroke="none"><circle cx="12" cy="12" r="8"/></svg>;
    case 'sun':    return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>;
    case 'moon':   return <svg {...common}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
    default: return null;
  }
}

// ── Bookmark button ──────────────────────────────────────
function Bookmark({ on, onToggle }) {
  const [pulse, setPulse] = useState(false);
  return (
    <button
      className={`bmk ${on ? 'on' : ''} ${pulse ? 'pulse' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
        onToggle();
      }}
      aria-label="Bookmark"
    >
      <Icon name={on ? 'bookmark-fill' : 'bookmark'} size={20} stroke={1.8} />
      <svg className="spark" viewBox="0 0 34 34" aria-hidden="true">
        <g fill="none" stroke="#ff7ac3" strokeWidth="1.4" strokeLinecap="round">
          <path d="M17 4 V 9" /><path d="M17 25 V 30" />
          <path d="M4 17 H 9" /><path d="M25 17 H 30" />
          <path d="M7 7 L 11 11" /><path d="M23 23 L 27 27" />
          <path d="M7 27 L 11 23" /><path d="M23 11 L 27 7" />
        </g>
      </svg>
    </button>
  );
}

// ── Tool Card ────────────────────────────────────────────
function ToolCard({ tool, onOpen, bookmarked, onBookmark }) {
  return (
    <div className="tool-card" onClick={() => onOpen(tool.id)}>
      <Glyph tool={tool} />
      <div className="tc-body">
        <div className="tc-head">
          <h3>{tool.name}</h3>
          {tool.isNew && <span className="tag-chip tag-new">NEW</span>}
          {tool.hasDocs && <span className="tag-chip tag-docs">DOCS</span>}
        </div>
        <p>{tool.desc}</p>
        <div className="tc-foot">
          <span className="sub-pill">{tool.sub}</span>
        </div>
      </div>
      <Bookmark on={bookmarked} onToggle={onBookmark} />
    </div>
  );
}

// ── Trend card (hero rail) ───────────────────────────────
function TrendCard({ tool, rank, onOpen }) {
  const hue = tool.hue ?? 260;
  return (
    <div className="trend-card" onClick={() => onOpen(tool.id)}>
      <div className="tc-aura" style={{ background: `hsl(${hue} 80% 55%)` }} />
      <div className="tc-rank">{String(rank).padStart(2, '0')}</div>
      <Glyph tool={tool} />
      <h3>{tool.name}</h3>
      <div className="tc-cat">{tool.sub}</div>
      <div className="tc-foot">
        <span className="tc-trend">
          <Icon name="trend" size={13} stroke={2} />
          +{12 + (tool.id.length % 30)}%
        </span>
        <Icon name="arrow-up-right" size={16} stroke={2} />
      </div>
    </div>
  );
}

// ── Skeleton ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="tool-card" style={{ cursor: 'default' }}>
      <div className="skel" style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div className="skel" style={{ height: 14, width: '55%', marginBottom: 10 }} />
        <div className="skel" style={{ height: 10, width: '100%', marginBottom: 6 }} />
        <div className="skel" style={{ height: 10, width: '70%' }} />
      </div>
    </div>
  );
}

// ── Category tile ────────────────────────────────────────
function CatTile({ cat, count, onOpen }) {
  return (
    <div className="cat-tile" onClick={() => onOpen(cat.id)}>
      <div className="ct-aura" style={{ background: cat.accent }} />
      <div className="ct-glyph" style={{ color: cat.accent }}>{cat.emoji}</div>
      <div>
        <h4>{cat.name}</h4>
        <div className="ct-count">{count} resources</div>
      </div>
    </div>
  );
}

// ── Reveal on scroll ─────────────────────────────────────
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add('in'), delay);
        io.disconnect();
      }
    }, { threshold: 0.1, root: el.closest('.page') });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className="reveal">{children}</div>;
}

// ── Search with suggestions ──────────────────────────────
function SearchBar({ onPick }) {
  const [q, setQ] = useState('');
  const [focus, setFocus] = useState(false);
  const suggestions = q.trim()
    ? window.TOOLS.filter(t =>
        t.name.toLowerCase().includes(q.toLowerCase()) ||
        t.sub.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 6)
    : [];

  const aiSuggestion = q.trim().length > 2
    ? { kind: 'Ask AI', name: `What's best for "${q.trim()}"?` }
    : null;

  return (
    <div className="search-wrap">
      <div className="searchbar">
        <Icon name="search" size={18} />
        <input
          placeholder="Search tools, frameworks, ideas…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 150)}
        />
        <span className="search-ai"><span className="pulse" /> AI</span>
      </div>
      {focus && (q.trim() || true) && (
        <div className="suggest-dropdown">
          {aiSuggestion && (
            <div className="suggest-item active" onMouseDown={() => onPick('__ai', q)}>
              <div className="glyph" style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--grad-primary)', color: '#0a0520' }}>
                <span className="gl-letter" style={{ fontSize: 14 }}>✶</span>
              </div>
              <div>
                <div className="kind">{aiSuggestion.kind}</div>
                <div className="name">{aiSuggestion.name}</div>
              </div>
              <div className="hint">⏎</div>
            </div>
          )}
          {suggestions.length > 0 ? suggestions.map(t => (
            <div key={t.id} className="suggest-item" onMouseDown={() => onPick(t.id)}>
              <Glyph tool={t} />
              <div>
                <div className="kind">{t.sub}</div>
                <div className="name">{t.name}</div>
              </div>
              <div className="hint">tool</div>
            </div>
          )) : q.trim() ? (
            <div style={{ padding: '16px', color: 'var(--ink-3)', fontSize: 13, textAlign: 'center' }}>
              No direct matches — try the AI suggestion above.
            </div>
          ) : (
            <>
              {['claude code','n8n','vector search','MCP','Next.js'].map((s, i) => (
                <div key={i} className="suggest-item" onMouseDown={() => { setQ(s); }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,255,255,.05)', display: 'grid', placeItems: 'center', color: 'var(--ink-2)' }}>
                    <Icon name="search" size={14} />
                  </div>
                  <div><div className="kind">Trending</div><div className="name">{s}</div></div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Icon, Bookmark, ToolCard, TrendCard, SkeletonCard, CatTile, Reveal, SearchBar });
