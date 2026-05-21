/* global React */
// Web sections: Nav, Hero, Trending Bento, Categories, Browse, Spotlight, Footer

const { useState, useEffect, useRef, useMemo } = React;

// ─── Nav ───────────────────────────────────────
function Nav({ onCmdK }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const isMac = useMemo(() => typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform), []);
  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-row">
        <a href="#top" className="brand">
          <div className="mark">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <defs>
                <linearGradient id="navg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#b68cff"/>
                  <stop offset=".5" stopColor="#5ac8ff"/>
                  <stop offset="1" stopColor="#3bd7c0"/>
                </linearGradient>
              </defs>
              <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" fill="none" stroke="url(#navg)" strokeWidth="1.4"/>
              <path d="M8 9 L12 15 L16 9" fill="none" stroke="url(#navg)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          NEXUS
        </a>
        <nav className="nav-links">
          <a href="#discover" className="nav-link active">Discover</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#library" className="nav-link">Library</a>
          <a href="#spotlight" className="nav-link">Spotlight</a>
          <a href="#changelog" className="nav-link">Changelog</a>
        </nav>
        <div className="nav-tools">
          <button className="kbd-trigger" onClick={onCmdK}>
            <span className="kbd-icon"><WIcon name="search" size={14} /></span>
            <span className="kbd-text">Search the hub…</span>
            <span className="kbd"><span className="k">{isMac ? '⌘' : 'Ctrl'}</span><span className="k">K</span></span>
          </button>
          <button className="btn btn-ghost">
            <WIcon name="github" size={14} /> GitHub
          </button>
          <button className="btn btn-primary">
            Get started <WIcon name="arrow-r" size={14} stroke={2} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Hero ───────────────────────────────────────
function Hero({ onCmdK, onPickTool }) {
  const [q, setQ] = useState('');
  const trendingTags = ['Cursor', 'MCP servers', 'Next.js', 'Vector search', 'n8n', 'Supabase', 'Motion'];
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <Reveal>
            <div className="hero-pill">
              <span className="tag">v4.26</span>
              <span>75+ curated tools across 8 stacks · updated weekly</span>
              <WIcon name="arrow-ur" size={13} stroke={2} />
            </div>
          </Reveal>

          <h1>
            <Reveal delay={50}>
              <div>The <span className="grad-text">AI knowledge hub</span></div>
            </Reveal>
            <Reveal delay={150}>
              <div>built for the <span className="stroke">modern stack.</span></div>
            </Reveal>
          </h1>

          <Reveal delay={250}>
            <p className="lede">
              One canonical map of every AI, data, frontend, infra, and design tool worth caring about — with the why, the when, and the trade-offs spelled out in plain English.
            </p>
          </Reveal>

          <Reveal delay={350}>
            <form className="hero-search" onSubmit={(e) => { e.preventDefault(); onCmdK(); }}>
              <div className="hero-search-bar">
                <WIcon name="search" size={20} />
                <input
                  placeholder="Search 75+ tools — Cursor, MCP, Supabase, Motion…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onFocus={() => onCmdK()}
                  readOnly
                />
                <span className="ai-chip"><span className="pulse" /> ⌘K</span>
                <button type="submit" className="submit" aria-label="Search">
                  <WIcon name="arrow-r" size={18} stroke={2.2} />
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={450}>
            <div className="tagcloud">
              {trendingTags.map(t => {
                const tool = window.TOOLS.find(x => x.name === t);
                return (
                  <button key={t} className="tag-item" onClick={() => tool && onPickTool(tool.id)}>
                    {t} <span className="arrow">›</span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={550}>
            <div className="counters">
              <div className="counter">
                <div className="n grad"><Counter to={75} suffix="+" /></div>
                <div className="l">Tools mapped</div>
              </div>
              <div className="counter">
                <div className="n"><Counter to={8} /></div>
                <div className="l">Stack categories</div>
              </div>
              <div className="counter">
                <div className="n"><Counter to={14} /></div>
                <div className="l">MCP integrations</div>
              </div>
              <div className="counter">
                <div className="n"><Counter to={4.9} decimals={1} /></div>
                <div className="l">Avg rating</div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

function HeroVisual() {
  const chips = ['cursor','claude-code','supabase','figma','nextjs'].map(id => window.TOOLS.find(t => t.id === id));
  const positions = ['orb-chip-1','orb-chip-2','orb-chip-3','orb-chip-4','orb-chip-5'];
  return (
    <div className="hero-visual">
      <div className="orb-ring orb-ring-3" />
      <div className="orb-ring orb-ring-2" />
      <div className="orb-ring orb-ring-1" />
      <div className="orb" />
      {chips.map((t, i) => (
        <div key={t.id} className={`orb-chip ${positions[i]}`}>
          <Glyph tool={t} size="sm" className="glyph" />
          <span>{t.name}</span>
          <span className="em">+{12 + (t.id.length % 30)}%</span>
        </div>
      ))}
    </div>
  );
}

// ─── Trending Bento ─────────────────────────────
function TrendingBento({ onPickTool, bookmarks, toggleBookmark }) {
  const ids = window.TRENDING_IDS.slice(0, 7);
  const tools = ids.map(id => window.TOOLS.find(t => t.id === id));
  const sizes = ['xl','lg','lg','md','md','md','md'];

  return (
    <section className="section" id="discover">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="title-block">
              <div className="eyebrow"><span className="dot" /> Trending this week</div>
              <h2>The tools <span className="grad-text">everyone</span> is shipping with.</h2>
              <p className="sub">Curated from real usage signals — pull requests, integration counts, MCP installs, and the questions hitting our research desk most often.</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-ghost"><WIcon name="flame" size={14} /> Live feed</button>
              <button className="btn btn-ghost">Browse all <WIcon name="arrow-r" size={14} stroke={2} /></button>
            </div>
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="bento">
            {tools.map((t, i) => (
              <Tilt key={t.id} max={3} className={`bento-card bento-${sizes[i]}`}>
                <div onClick={() => onPickTool(t.id)} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="aura" style={{ background: `hsl(${t.hue ?? 260} 80% 55%)` }} />
                  <div className="bc-head">
                    <Glyph tool={t} size={sizes[i] === 'xl' ? 'lg' : 'md'} />
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                      <span className="rank">#{String(i + 1).padStart(2, '0')}</span>
                      <BookmarkBtn on={bookmarks.has(t.id)} onToggle={() => toggleBookmark(t.id)} />
                    </div>
                  </div>
                  <div className="bc-sub">{t.sub}</div>
                  <h3>{t.name}</h3>
                  {(sizes[i] === 'xl' || sizes[i] === 'lg') && <p>{t.tagline || t.desc}</p>}
                  <div className="bc-foot">
                    <div className="stats">
                      <span>★ <b>4.{6 + (i % 3)}</b></span>
                      <span>↑ <b>+{12 + (t.id.length % 30)}%</b></span>
                      {sizes[i] === 'xl' && <span>since <b>{t.year}</b></span>}
                    </div>
                    <div className="open-arrow"><WIcon name="arrow-ur" size={14} stroke={2} /></div>
                  </div>
                  {sizes[i] === 'xl' && (
                    <div className="bento-feature-shot">
                      {t.features.slice(0, 2).map(f => <span key={f} className="pill">{f}</span>)}
                    </div>
                  )}
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Categories ─────────────────────────────────
function CategoriesGrid({ onPickCat }) {
  const counts = Object.fromEntries(
    window.CATEGORIES.map(c => [c.id, window.TOOLS.filter(t => t.cat === c.id).length])
  );

  return (
    <section className="section" id="categories">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="title-block">
              <div className="eyebrow"><span className="dot" style={{ background: 'var(--neon-purple)', boxShadow: '0 0 10px var(--neon-purple)' }} /> Browse by stack</div>
              <h2>Eight tracks. <span className="grad-text">Every layer</span> of your build.</h2>
              <p className="sub">From the model that thinks to the CDN that ships it — each category is curated so you can pick the right primitive without spinning out on tabs.</p>
            </div>
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="cat-grid">
            {window.CATEGORIES.map(c => (
              <Tilt key={c.id} max={5}>
                <div className="cat-card" onClick={() => onPickCat(c.id)}>
                  <div className="aura" style={{ background: c.accent }} />
                  <div className="cc-glyph" style={{ color: c.accent }}>{c.emoji}</div>
                  <div>
                    <h3>{c.name}</h3>
                    <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 8, lineHeight: 1.5 }}>
                      {c.desc}
                    </div>
                  </div>
                  <div className="cc-meta">
                    <span className="cc-count">{counts[c.id]} resources</span>
                    <div className="cc-arrow"><WIcon name="arrow-ur" size={14} stroke={2} /></div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Library (sidebar + grid) ──────────────────
function Library({ onPickTool, bookmarks, toggleBookmark, initialCat }) {
  const [activeCat, setActiveCat] = useState(initialCat || 'all');
  useEffect(() => { if (initialCat) setActiveCat(initialCat); }, [initialCat]);
  const [showNew, setShowNew] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showBmkOnly, setShowBmkOnly] = useState(false);
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('pick');
  const [shown, setShown] = useState(12);

  const filtered = useMemo(() => {
    let arr = window.TOOLS.filter(t => {
      if (activeCat !== 'all' && t.cat !== activeCat) return false;
      if (showNew && !t.isNew) return false;
      if (showDocs && !t.hasDocs) return false;
      if (showBmkOnly && !bookmarks.has(t.id)) return false;
      return true;
    });
    if (sort === 'new') arr = arr.slice().sort((a, b) => (b.year || 0) - (a.year || 0));
    if (sort === 'az')  arr = arr.slice().sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'bmk') arr = arr.slice().sort((a, b) => (bookmarks.has(b.id) ? 1 : 0) - (bookmarks.has(a.id) ? 1 : 0));
    return arr;
  }, [activeCat, showNew, showDocs, showBmkOnly, sort, bookmarks]);

  useEffect(() => { setShown(12); }, [activeCat, showNew, showDocs, showBmkOnly, sort]);

  const counts = Object.fromEntries(
    window.CATEGORIES.map(c => [c.id, window.TOOLS.filter(t => t.cat === c.id).length])
  );

  return (
    <section className="section" id="library">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="title-block">
              <div className="eyebrow"><span className="dot" style={{ background: 'var(--neon-cyan)' }} /> The full library</div>
              <h2>Search, filter, <span className="grad-text">compare</span>, save.</h2>
              <p className="sub">A live index across every tool we track. Use the sidebar to slice — or press <span className="kbd"><span className="k">⌘</span><span className="k">K</span></span> to fuzzy-search anything from anywhere on the page.</p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="browse">
            <aside className="sidebar">
              <h4>Stack</h4>
              <div className="filter-list">
                <button className={`filter-btn ${activeCat === 'all' ? 'active' : ''}`} onClick={() => setActiveCat('all')}>
                  <span>All resources</span>
                  <span className="count">{window.TOOLS.length}</span>
                </button>
                {window.CATEGORIES.map(c => (
                  <button key={c.id} className={`filter-btn ${activeCat === c.id ? 'active' : ''}`} onClick={() => setActiveCat(c.id)}>
                    <span>{c.name}</span>
                    <span className="count">{counts[c.id]}</span>
                  </button>
                ))}
              </div>

              <div className="sidebar-section">
                <h4>Filters</h4>
                <div className="toggle-row">
                  <span>New this quarter</span>
                  <button className={`toggle ${showNew ? 'on' : ''}`} onClick={() => setShowNew(s => !s)} />
                </div>
                <div className="toggle-row">
                  <span>Has docs</span>
                  <button className={`toggle ${showDocs ? 'on' : ''}`} onClick={() => setShowDocs(s => !s)} />
                </div>
                <div className="toggle-row">
                  <span>Bookmarked only</span>
                  <button className={`toggle ${showBmkOnly ? 'on' : ''}`} onClick={() => setShowBmkOnly(s => !s)} />
                </div>
              </div>

              <div className="sidebar-section">
                <h4>Sort</h4>
                <div className="filter-list">
                  <button className={`filter-btn ${sort === 'pick' ? 'active' : ''}`} onClick={() => setSort('pick')}>
                    <span>Editor's pick</span>
                    <span className="count">●</span>
                  </button>
                  <button className={`filter-btn ${sort === 'new' ? 'active' : ''}`} onClick={() => setSort('new')}><span>Newest first</span></button>
                  <button className={`filter-btn ${sort === 'az' ? 'active' : ''}`} onClick={() => setSort('az')}><span>A → Z</span></button>
                  <button className={`filter-btn ${sort === 'bmk' ? 'active' : ''}`} onClick={() => setSort('bmk')}><span>Bookmarked first</span></button>
                </div>
              </div>
            </aside>

            <div>
              <div className="lib-toolbar">
                <div className="lib-count"><b style={{ color: 'var(--ink-1)' }}>{filtered.length}</b> resources · curated</div>
                <div className="lib-views">
                  <button className={`view-btn ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} aria-label="Grid view">
                    <WIcon name="grid" size={16} />
                  </button>
                  <button className={`view-btn ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} aria-label="List view">
                    <WIcon name="list" size={16} />
                  </button>
                </div>
              </div>

              {view === 'grid' ? (
                <div className="lib-grid stagger-children in">
                  {filtered.slice(0, shown).map(t => (
                    <LibCard key={t.id} tool={t} onOpen={onPickTool} bookmarked={bookmarks.has(t.id)} toggle={() => toggleBookmark(t.id)} />
                  ))}
                </div>
              ) : (
                <div className="stagger-children in" style={{ display: 'grid', gap: 10 }}>
                  {filtered.slice(0, shown).map(t => (
                    <LibRow key={t.id} tool={t} onOpen={onPickTool} bookmarked={bookmarks.has(t.id)} toggle={() => toggleBookmark(t.id)} />
                  ))}
                </div>
              )}

              {shown < filtered.length && (
                <div style={{ textAlign: 'center', marginTop: 32 }}>
                  <button className="btn btn-ghost btn-lg" onClick={() => setShown(s => s + 12)}>
                    <WIcon name="down" size={14} /> Load {Math.min(12, filtered.length - shown)} more · {filtered.length - shown} remaining
                  </button>
                </div>
              )}
              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--ink-3)' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>○</div>
                  <div style={{ fontFamily: 'var(--ff-display)', fontSize: 16, marginBottom: 6 }}>No tools match those filters.</div>
                  <div style={{ fontSize: 13.5 }}>Try clearing a filter or resetting the stack to "All resources."</div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LibCard({ tool, onOpen, bookmarked, toggle }) {
  const t = tool;
  return (
    <div className="lib-card" onClick={() => onOpen(t.id)}>
      <div className="lc-head">
        <Glyph tool={t} />
        <BookmarkBtn on={bookmarked} onToggle={toggle} />
      </div>
      <div>
        <div className="lc-sub">{t.sub} · est. {t.year}</div>
        <h4>{t.name}</h4>
      </div>
      <p>{t.tagline || t.desc}</p>
      {t.bestFor && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {t.bestFor.slice(0, 2).map(b => (
            <span key={b} style={{
              fontSize: 11, padding: '4px 9px', borderRadius: 999,
              background: 'rgba(255,255,255,.03)', border: '1px solid var(--line)',
              color: 'var(--ink-2)',
            }}>{b}</span>
          ))}
        </div>
      )}
      <div className="lc-foot">
        <div className="tags">
          {t.isNew && <span className="tag-chip tag-new">NEW</span>}
          {t.hasDocs && <span className="tag-chip tag-docs">DOCS</span>}
          {!t.isNew && !t.hasDocs && <span className="tag-chip tag-hot">PICK</span>}
        </div>
        <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--ff-mono)' }}>
          {t.pricing ? t.pricing.split('·')[0].trim() : `★ 4.${6 + (t.id.length % 3)}`}
        </span>
      </div>
    </div>
  );
}

function LibRow({ tool, onOpen, bookmarked, toggle }) {
  const t = tool;
  return (
    <div className="lib-card" onClick={() => onOpen(t.id)} style={{
      display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', alignItems: 'center', gap: 18, padding: 16,
    }}>
      <Glyph tool={t} />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
          <h4 style={{ margin: 0 }}>{t.name}</h4>
          <span className="lc-sub" style={{ marginTop: 0 }}>{t.sub} · est. {t.year}</span>
          {t.isNew && <span className="tag-chip tag-new">NEW</span>}
          {t.hasDocs && <span className="tag-chip tag-docs">DOCS</span>}
        </div>
        <p style={{ margin: 0, minHeight: 0, WebkitLineClamp: 2, fontSize: 13.5 }}>{t.tagline || t.desc}</p>
      </div>
      <span style={{ fontSize: 11.5, color: 'var(--ink-3)', fontFamily: 'var(--ff-mono)', whiteSpace: 'nowrap' }}>
        {t.pricing ? t.pricing.split('·')[0].trim() : '—'}
      </span>
      <BookmarkBtn on={bookmarked} onToggle={toggle} />
    </div>
  );
}

// ─── Spotlight (rich detail view) ─────────────────
function Spotlight({ toolId, onPickTool, bookmarks, toggleBookmark }) {
  const tool = window.TOOLS.find(t => t.id === toolId) || window.TOOLS[0];
  const cat = window.CATEGORIES.find(c => c.id === tool.cat);
  const altTools = (tool.alternatives || []).map(id => window.TOOLS.find(t => t.id === id)).filter(Boolean);
  const related = window.TOOLS.filter(t => t.cat === tool.cat && t.id !== tool.id).slice(0, 6);

  return (
    <section className="section" id="spotlight">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="title-block">
              <div className="eyebrow"><span className="dot" style={{ background: 'var(--neon-pink)', boxShadow: '0 0 10px var(--neon-pink)' }} /> Editor's spotlight</div>
              <h2>Look closer. <span className="grad-text">Decide faster.</span></h2>
              <p className="sub">Click any tool above to spotlight it here. We pull tagline, who it's for, strengths and trade-offs, pricing, and the alternatives you should compare it to.</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" onClick={() => toggleBookmark(tool.id)}>
                <WIcon name={bookmarks.has(tool.id) ? 'bookmark-fill' : 'bookmark'} size={14} />
                {bookmarks.has(tool.id) ? 'Saved' : 'Save'}
              </button>
              <button className="btn btn-ghost"><WIcon name="share" size={14} /> Share</button>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="spotlight">
            {/* LEFT: main detail */}
            <div className="spot-card">
              <div className="aura" style={{ background: `hsl(${tool.hue ?? 260} 80% 55%)` }} />

              <div className="sc-head">
                <Glyph tool={tool} size="lg" />
                <div style={{ flex: 1 }}>
                  <div className="sc-sub">{cat.name} · {tool.sub} · est. {tool.year}</div>
                  <h2>{tool.name}</h2>
                  {tool.tagline && (
                    <div style={{ fontSize: 16, color: 'var(--ink-1)', marginTop: 8, fontWeight: 500, lineHeight: 1.4 }}>
                      {tool.tagline}
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 8, marginTop: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                    {tool.isNew && <span className="tag-chip tag-new">NEW</span>}
                    {tool.hasDocs && <span className="tag-chip tag-docs">DOCS</span>}
                    <span style={{ fontSize: 12.5, color: 'var(--ink-2)', fontFamily: 'var(--ff-mono)' }}>
                      ★ 4.{6 + (tool.id.length % 3)} · {['12k','84k','320k','1.2M'][tool.id.length % 4]} users
                    </span>
                  </div>
                </div>
              </div>

              <p className="sc-desc">{tool.longDesc || tool.desc}</p>

              {/* Features */}
              {tool.features && (
                <>
                  <h4 className="sc-block-title">Key capabilities</h4>
                  <div className="sc-feat">
                    {tool.features.map((f, i) => (
                      <div key={i} className="sc-feat-row">
                        <span className="tick"><WIcon name="check" size={12} stroke={2.4} /></span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Best for */}
              {tool.bestFor && (
                <>
                  <h4 className="sc-block-title">Reach for it when…</h4>
                  <div className="sc-feat">
                    {tool.bestFor.map((f, i) => (
                      <div key={i} className="sc-feat-row" style={{ background: 'rgba(182,140,255,.06)', borderColor: 'rgba(182,140,255,.18)' }}>
                        <span className="tick" style={{ background: 'rgba(182,140,255,.15)', borderColor: 'rgba(182,140,255,.3)', color: 'var(--neon-purple)' }}>
                          <WIcon name="bolt" size={11} stroke={2.4} />
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Pros / Cons */}
              {(tool.pros || tool.cons) && (
                <div className="proscons">
                  {tool.pros && (
                    <div className="proscons-col">
                      <div className="proscons-label" style={{ color: 'var(--neon-cyan)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--neon-cyan)', boxShadow: '0 0 8px var(--neon-cyan)' }} />
                        Strengths
                      </div>
                      <ul>
                        {tool.pros.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                  )}
                  {tool.cons && (
                    <div className="proscons-col">
                      <div className="proscons-label" style={{ color: 'var(--neon-pink)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--neon-pink)', boxShadow: '0 0 8px var(--neon-pink)' }} />
                        Trade-offs
                      </div>
                      <ul>
                        {tool.cons.map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="sc-cta">
                <button className="btn btn-primary btn-lg">
                  <WIcon name="play" size={13} stroke={0} /> Visit {tool.name}
                </button>
                <button className="btn btn-ghost btn-lg">
                  <WIcon name="book" size={14} /> Read the deep dive
                </button>
              </div>
            </div>

            {/* RIGHT: side stats + alternatives + related */}
            <div className="spot-side">
              <div className="spot-stats">
                <div className="spot-stat">
                  <div className="lab">Pricing</div>
                  <div className="val grad" style={{ fontSize: 18 }}>{tool.pricing ? tool.pricing.split('·')[0].trim() : 'Quoted'}</div>
                  {tool.pricing && tool.pricing.includes('·') && (
                    <div className="trend" style={{ color: 'var(--ink-3)' }}>{tool.pricing.split('·').slice(1).join('·').trim()}</div>
                  )}
                </div>
                <div className="spot-stat">
                  <div className="lab">Category</div>
                  <div className="val">{cat.short}</div>
                  <div className="trend" style={{ color: 'var(--ink-3)' }}>{tool.sub}</div>
                </div>
                <div className="spot-stat">
                  <div className="lab">Released</div>
                  <div className="val">{tool.year}</div>
                  <div className="trend">{2026 - tool.year} yrs mature</div>
                </div>
                <div className="spot-stat">
                  <div className="lab">Growth</div>
                  <div className="val">+{12 + (tool.id.length % 30)}%</div>
                  <div className="trend">↑ vs last quarter</div>
                </div>
              </div>

              {altTools.length > 0 && (
                <div className="spot-related">
                  <h4>Compare against</h4>
                  <div className="spot-related-list">
                    {altTools.map(r => (
                      <div key={r.id} className="spot-rel-row" onClick={() => onPickTool(r.id)}>
                        <Glyph tool={r} size="sm" />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="spot-rel-name">{r.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--ff-display)', letterSpacing: '.08em', textTransform: 'uppercase' }}>{r.sub}</div>
                        </div>
                        <WIcon name="chev-r" size={14} style={{ color: 'var(--ink-3)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="spot-related">
                <h4>More in {cat.short}</h4>
                <div className="spot-related-list">
                  {related.map(r => (
                    <div key={r.id} className="spot-rel-row" onClick={() => onPickTool(r.id)}>
                      <Glyph tool={r} size="sm" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="spot-rel-name">{r.name}</div>
                        <div style={{ fontSize: 11.5, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {r.tagline || r.sub}
                        </div>
                      </div>
                      <WIcon name="chev-r" size={14} style={{ color: 'var(--ink-3)' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Changelog / News strip ─────────────────────────────
function Changelog({ onPickTool }) {
  // Build a tasteful "what's new" from tools tagged isNew
  const items = window.TOOLS.filter(t => t.isNew).slice(0, 6);
  return (
    <section className="section" id="changelog">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div className="title-block">
              <div className="eyebrow"><span className="dot" style={{ background: 'var(--neon-amber)', boxShadow: '0 0 10px var(--neon-amber)' }} /> What's new</div>
              <h2>Fresh adds this <span className="grad-text">quarter.</span></h2>
              <p className="sub">Tools we've added or upgraded in the v4.26 release. Click through for the full write-up.</p>
            </div>
          </div>
        </Reveal>

        <Reveal stagger>
          <div className="changelog-grid">
            {items.map((t, i) => (
              <div key={t.id} className="changelog-card" onClick={() => onPickTool(t.id)}>
                <div className="cl-date">v4.26 · Apr {String(15 + i).padStart(2, '0')}</div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Glyph tool={t} size="sm" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                      <h4 style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 16, margin: 0 }}>{t.name}</h4>
                      <span className="tag-chip tag-new">NEW</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--ff-display)', letterSpacing: '.1em', textTransform: 'uppercase', marginTop: 4 }}>{t.sub}</div>
                  </div>
                </div>
                <p style={{ margin: '14px 0 0', fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.55 }}>{t.tagline || t.desc}</p>
                <div style={{ marginTop: 14, fontSize: 12, color: 'var(--neon-blue)', fontFamily: 'var(--ff-display)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  Read full entry <WIcon name="arrow-r" size={13} stroke={2} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ─────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <div className="mark">
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <defs><linearGradient id="fg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b68cff"/><stop offset=".5" stopColor="#5ac8ff"/><stop offset="1" stopColor="#3bd7c0"/></linearGradient></defs>
                  <path d="M12 2 L21 7 V17 L12 22 L3 17 V7 Z" fill="none" stroke="url(#fg1)" strokeWidth="1.4"/>
                </svg>
              </div>
              NEXUS
            </a>
            <p>The canonical AI knowledge hub for builders. Opinionated, curated, and updated weekly by working engineers and designers.</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {['github','twitter','globe','mail'].map(n => (
                <button key={n} className="bmk-web" aria-label={n}><WIcon name={n} size={15} /></button>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Product</h5>
            <a>Discover</a><a>Categories</a><a>Library</a><a>Spotlight</a><a>Compare</a>
          </div>
          <div className="footer-col">
            <h5>Stack</h5>
            <a>AI & Automation</a><a>Data & Analytics</a><a>Frontend</a><a>Cloud</a><a>Design</a>
          </div>
          <div className="footer-col">
            <h5>Resources</h5>
            <a>Docs</a><a>API</a><a>Changelog</a><a>Playbooks</a><a>RSS</a>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <a>About</a><a>Blog</a><a>Careers</a><a>Privacy</a><a>Terms</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Nexus Labs · Built with Next.js, Tailwind, Motion</span>
          <span>Stack v4.26 · Updated Apr 22, 2026</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Hero, TrendingBento, CategoriesGrid, Library, Spotlight, Changelog, Footer });
