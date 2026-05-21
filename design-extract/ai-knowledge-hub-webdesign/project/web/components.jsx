/* global React */
// Web components

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─── Icon set ─────────────────────────────────────────
function WIcon({ name, size = 18, stroke = 1.8, className = '' }) {
  const common = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor',
    strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round',
    className,
  };
  switch (name) {
    case 'search': return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'arrow-ur': return <svg {...common}><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>;
    case 'arrow-r': return <svg {...common}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>;
    case 'chev-r': return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
    case 'chev-d': return <svg {...common}><path d="m6 9 6 6 6-6"/></svg>;
    case 'bookmark': return <svg {...common}><path d="M6 3h12v18l-6-4-6 4z"/></svg>;
    case 'bookmark-fill': return <svg {...common} fill="currentColor"><path d="M6 3h12v18l-6-4-6 4z"/></svg>;
    case 'sparkle': return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5 5l2.5 2.5M16.5 16.5 19 19M5 19l2.5-2.5M16.5 7.5 19 5"/><circle cx="12" cy="12" r="2"/></svg>;
    case 'check':  return <svg {...common}><path d="m5 12 4 4 10-10"/></svg>;
    case 'play':   return <svg {...common} fill="currentColor" stroke="none"><path d="M7 5v14l12-7z"/></svg>;
    case 'grid':   return <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>;
    case 'list':   return <svg {...common}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>;
    case 'send':   return <svg {...common}><path d="M4 12 20 4l-3 16-5-6-6-2z"/></svg>;
    case 'x':      return <svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'flame':  return <svg {...common}><path d="M12 3c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 1-6 1-9z"/></svg>;
    case 'trend':  return <svg {...common}><path d="M3 17 9 11l4 4 8-8"/><path d="M14 7h7v7"/></svg>;
    case 'star':   return <svg {...common} fill="currentColor" stroke="none"><path d="m12 2 3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>;
    case 'share':  return <svg {...common}><circle cx="6" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M8.6 10.5 15.4 7.5M8.6 13.5 15.4 16.5"/></svg>;
    case 'github': return <svg {...common}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 6.77 5.07 5.07 0 0 0 19.91 3S18.73 2.65 16 4.55a13.4 13.4 0 0 0-7 0C6.27 2.65 5.09 3 5.09 3A5.07 5.07 0 0 0 5 6.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 20.13V24"/></svg>;
    case 'globe':  return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'twitter':return <svg {...common}><path d="M4 4l7 9L4 20h2l6-7 5 7h4l-7.5-10L19 4h-2l-5 6-4-6z"/></svg>;
    case 'mail':   return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/></svg>;
    case 'book':   return <svg {...common}><path d="M4 4h7a4 4 0 0 1 4 4v12"/><path d="M20 4h-7a4 4 0 0 0-4 4v12"/></svg>;
    case 'bolt':   return <svg {...common}><path d="M13 3 4 14h7l-1 7 9-11h-7z"/></svg>;
    case 'down':   return <svg {...common}><path d="M12 5v14M5 12l7 7 7-7"/></svg>;
    default: return null;
  }
}

// ─── Tool glyph (logo placeholder) ─────────────────
function Glyph({ tool, size = 'md', className = '' }) {
  const hue = tool.hue ?? 260;
  const letter = tool.name.replace(/[^A-Za-z0-9]/g, '').charAt(0).toUpperCase();
  const bg = `linear-gradient(135deg,
    hsl(${hue} 80% 62%) 0%,
    hsl(${(hue + 40) % 360} 75% 55%) 100%)`;
  const pat = useMemo(() => {
    const seed = tool.id.charCodeAt(0) + tool.id.charCodeAt(tool.id.length - 1);
    return seed % 4;
  }, [tool.id]);
  const fontSize = size === 'lg' ? 26 : size === 'sm' ? 14 : 18;
  const iconSize = size === 'lg' ? 36 : size === 'sm' ? 18 : 24;
  const [iconOk, setIconOk] = React.useState(!!tool.iconSlug);

  return (
    <div className={`glyph ${size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : ''} ${className}`}
         style={{ boxShadow: `0 8px 24px -8px hsla(${hue}, 80%, 50%, .55)` }}>
      <div className="gl-bg" style={{ background: bg }} />
      {!iconOk && (
        <svg className="gl-bg" viewBox="0 0 40 40" style={{ opacity: .35 }}>
          {pat === 0 && <circle cx="32" cy="8" r="14" fill="#fff" />}
          {pat === 1 && <rect x="22" y="-8" width="28" height="28" fill="#fff" transform="rotate(15 36 6)" />}
          {pat === 2 && <path d="M-4 28 L22 -4 L44 14 L44 44 L-4 44 Z" fill="#fff" />}
          {pat === 3 && <g fill="#fff"><circle cx="30" cy="10" r="6"/><circle cx="10" cy="30" r="4"/></g>}
        </svg>
      )}
      {iconOk ? (
        <img
          className="gl-letter"
          src={`https://cdn.simpleicons.org/${tool.iconSlug}/ffffff`}
          alt=""
          style={{ width: iconSize, height: iconSize, display: 'block', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.25))' }}
          onError={() => setIconOk(false)}
        />
      ) : (
        <span className="gl-letter" style={{ fontSize }}>{letter}</span>
      )}
    </div>
  );
}

// ─── Reveal on scroll ─────────────────────────────
function Reveal({ children, delay = 0, stagger = false, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add('in'), delay);
        io.disconnect();
      }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <div ref={ref} className={`${stagger ? 'stagger-children' : 'reveal'} ${className}`}>{children}</div>;
}

// ─── Animated counter ─────────────────────────────
function Counter({ to, suffix = '', duration = 1400, decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const start = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(to * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      }
    }, { threshold: .5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

// ─── Bookmark btn ─────────────────────────────
function BookmarkBtn({ on, onToggle, size = 18 }) {
  const [pulse, setPulse] = useState(false);
  return (
    <button
      className={`bmk-web ${on ? 'on' : ''} ${pulse ? 'pulse' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        setPulse(true);
        setTimeout(() => setPulse(false), 600);
        onToggle();
      }}
      aria-label="Bookmark">
      <WIcon name={on ? 'bookmark-fill' : 'bookmark'} size={size} />
    </button>
  );
}

// ─── Tilt wrapper (mouse-following 3D) ─────────────
function Tilt({ children, max = 6, scale = 1, className = '', style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) scale(${scale})`;
        el.style.setProperty('--px', `${px * 100}%`);
        el.style.setProperty('--py', `${py * 100}%`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = '';
      el.style.removeProperty('--px');
      el.style.removeProperty('--py');
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [max, scale]);
  return <div ref={ref} className={className} style={{ transition: 'transform .25s var(--ease-out)', ...style }}>{children}</div>;
}

// ─── Command palette (⌘K) ─────────────────────────
function CmdK({ open, onClose, onPickTool, onAsk }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ(''); setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const results = useMemo(() => {
    const Q = q.trim().toLowerCase();
    const tools = Q
      ? window.TOOLS.filter(t => t.name.toLowerCase().includes(Q) || t.sub.toLowerCase().includes(Q)).slice(0, 6)
      : window.TOOLS.slice(0, 6);
    const cats = Q
      ? window.CATEGORIES.filter(c => c.name.toLowerCase().includes(Q)).slice(0, 4)
      : [];
    return { tools, cats };
  }, [q]);

  const flat = useMemo(() => {
    const arr = [];
    results.tools.forEach(t => arr.push({ kind: 'tool', label: t.name, sub: t.sub, payload: t.id, tool: t }));
    results.cats.forEach(c => arr.push({ kind: 'cat', label: c.name, payload: c.id }));
    return arr;
  }, [q, results]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(flat.length - 1, a + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(0, a - 1)); }
      else if (e.key === 'Enter') {
        const item = flat[active];
        if (!item) return;
        if (item.kind === 'ai') onAsk(item.payload);
        else if (item.kind === 'tool') onPickTool(item.payload);
        else if (item.kind === 'cat') onPickTool(null, item.payload);
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, flat, active, onClose, onPickTool, onAsk]);

  return (
    <div className={`cmdk-backdrop ${open ? 'open' : ''}`} onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()}>
        <div className="cmdk-search">
          <WIcon name="search" size={18} />
          <input
            ref={inputRef}
            placeholder="Search tools, categories, or ask AI…"
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
          />
          <span className="kbd"><span className="k">esc</span></span>
        </div>
        <div className="cmdk-body">
          {flat.length === 0 ? (
            <div style={{ padding: 32, textAlign: 'center', color: 'var(--ink-3)' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>✶</div>
              <div style={{ fontSize: 13 }}>No results. Try “MCP”, “rag”, or “mobile”.</div>
            </div>
          ) : flat.map((it, i) => (
            <div key={i}
              className={`cmdk-row ${active === i ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => {
                if (it.kind === 'ai') onAsk(it.payload);
                else if (it.kind === 'tool') onPickTool(it.payload);
                else if (it.kind === 'cat') onPickTool(null, it.payload);
                onClose();
              }}>
              {it.kind === 'tool' && <Glyph tool={it.tool} size="sm" />}
              {it.kind === 'cat' && (
                <div className="glyph sm" style={{ background: 'rgba(255,255,255,.05)', border: '1px solid var(--line)' }}>
                  <span className="gl-letter" style={{ fontSize: 12 }}>{window.CATEGORIES.find(c => c.id === it.payload)?.emoji}</span>
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="kind">{it.kind === 'tool' ? it.sub : 'Category'}</div>
                <div className="name">{it.label}</div>
              </div>
              <div className="hint">↵</div>
            </div>
          ))}
        </div>
        <div className="cmdk-foot">
          <span className="row"><span className="kbd"><span className="k">↑↓</span></span> navigate</span>
          <span className="row"><span className="kbd"><span className="k">↵</span></span> select</span>
          <span className="row"><span className="kbd"><span className="k">esc</span></span> close</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { WIcon, Glyph, Reveal, Counter, BookmarkBtn, Tilt, CmdK });
