/* global React */
// Pages: Home, Category, Detail, (AI assistant is rendered globally in app.jsx)

const { useState, useEffect, useMemo, useRef } = React;

// ─────────────────────────── HOME ───────────────────────────
function HomePage({ nav, bookmarks, toggleBookmark, openAI, theme, toggleTheme }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 700); return () => clearTimeout(t); }, []);

  const trending = window.TRENDING_IDS.map(id => window.TOOLS.find(t => t.id === id));
  const recent   = window.RECENT_IDS.map(id => window.TOOLS.find(t => t.id === id));
  const catCounts = Object.fromEntries(
    window.CATEGORIES.map(c => [c.id, window.TOOLS.filter(t => t.cat === c.id).length])
  );

  return (
    <div className="page">
      <div className="screen-bg" />
      <div className="topbar">
        <div>
          <div className="eyebrow">Monday · Apr 22</div>
          <div className="topbar-title">Good morning, <span className="grad-text">Prasanna</span></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="iconbtn has-dot" style={{ position: 'relative' }}><Icon name="bell" size={18} /></button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark'
              ? <Icon name="sun"  size={18} stroke={1.8} />
              : <Icon name="moon" size={18} stroke={1.8} />}
          </button>
          <button className="iconbtn"><Icon name="user" size={18} /></button>
        </div>
      </div>

      <div className="page-inner stagger">
        <SearchBar onPick={(id, q) => {
          if (id === '__ai') openAI(q);
          else nav({ route: 'detail', toolId: id });
        }} />

        {/* Trending rail */}
        <div className="section-title" style={{ marginTop: 22 }}>
          <h2>Trending<span style={{ color: 'var(--neon-pink)', marginLeft: 8 }}>
            <Icon name="flame" size={18} stroke={2} />
          </span></h2>
          <span className="see-all">See all ›</span>
        </div>
      </div>

      <div className="rail">
        {loading ? (
          [0,1,2].map(i => <div key={i} className="trend-card" style={{ flexShrink: 0 }}>
            <div className="skel" style={{ width: 44, height: 44, borderRadius: 12 }} />
            <div className="skel" style={{ height: 16, width: '60%', marginTop: 30 }} />
            <div className="skel" style={{ height: 10, width: '40%', marginTop: 8 }} />
          </div>)
        ) : trending.map((t, i) => (
          <TrendCard key={t.id} tool={t} rank={i + 1} onOpen={(id) => nav({ route: 'detail', toolId: id })} />
        ))}
      </div>

      <div className="page-inner">
        {/* Categories grid */}
        <div className="section-title" style={{ marginTop: 18 }}>
          <h2>Categories</h2>
          <span className="see-all" onClick={() => nav({ route: 'category' })}>Browse all ›</span>
        </div>
        <div className="cat-grid stagger">
          {window.CATEGORIES.map(c => (
            <CatTile key={c.id} cat={c} count={catCounts[c.id]} onOpen={(id) => nav({ route: 'category', catId: id })} />
          ))}
        </div>

        {/* Recently viewed */}
        <div className="section-title">
          <h2>Recently viewed</h2>
          <span className="see-all">History ›</span>
        </div>
        <div className="stagger">
          {loading
            ? [0,1,2].map(i => <SkeletonCard key={i} />)
            : recent.map(t => (
                <ToolCard key={t.id} tool={t}
                  onOpen={(id) => nav({ route: 'detail', toolId: id })}
                  bookmarked={bookmarks.has(t.id)}
                  onBookmark={() => toggleBookmark(t.id)} />
              ))}
        </div>

        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

// ─────────────────────────── CATEGORY ───────────────────────────
function CategoryPage({ nav, catId, bookmarks, toggleBookmark }) {
  const category = catId ? window.CATEGORIES.find(c => c.id === catId) : null;
  const allCategories = ['all', ...window.CATEGORIES.map(c => c.id)];
  const [activeCat, setActiveCat] = useState(catId || 'all');

  // Subfilters within active category
  const tools = activeCat === 'all' ? window.TOOLS : window.TOOLS.filter(t => t.cat === activeCat);
  const subs = useMemo(() => {
    const s = Array.from(new Set(tools.map(t => t.sub)));
    return ['All', ...s];
  }, [activeCat]);
  const [activeSub, setActiveSub] = useState('All');
  useEffect(() => { setActiveSub('All'); }, [activeCat]);

  const filtered = activeSub === 'All' ? tools : tools.filter(t => t.sub === activeSub);

  // "Infinite scroll" chunking
  const [shown, setShown] = useState(8);
  useEffect(() => { setShown(8); }, [activeCat, activeSub]);
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current; if (!el) return;
    const onScroll = () => {
      if (el.scrollTop + el.clientHeight > el.scrollHeight - 220 && shown < filtered.length) {
        setShown(s => Math.min(s + 6, filtered.length));
      }
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, [shown, filtered.length]);

  const [loading, setLoading] = useState(true);
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 500); return () => clearTimeout(t); }, [activeCat, activeSub]);

  return (
    <div className="page" ref={scrollRef}>
      <div className="screen-bg" />
      <div className="topbar">
        <button className="back-btn" onClick={() => nav({ route: 'home' })}>
          <Icon name="chev-l" size={16} /> Back
        </button>
        <div className="topbar-title">Browse</div>
        <button className="iconbtn"><Icon name="filter" size={18} /></button>
      </div>

      <div className="page-inner">
        <div style={{ marginTop: 4 }}>
          <div className="eyebrow">Explore</div>
          <div className="h-display" style={{ fontSize: 30, marginTop: 4 }}>
            {category ? category.name : <>All <span className="grad-text">resources</span></>}
          </div>
          <div className="muted" style={{ fontSize: 13, marginTop: 6 }}>
            {window.TOOLS.filter(t => activeCat === 'all' || t.cat === activeCat).length} tools · curated & updated weekly
          </div>
        </div>
      </div>

      {/* Filter tabs (swipeable) */}
      <div className="filter-tabs" style={{ marginTop: 18 }}>
        {allCategories.map(id => {
          const c = id === 'all' ? { id: 'all', name: 'All' } : window.CATEGORIES.find(x => x.id === id);
          return (
            <button key={id}
              className={`filter-tab ${activeCat === id ? 'active' : ''}`}
              onClick={() => setActiveCat(id)}>
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Sub filter */}
      {subs.length > 2 && (
        <div className="filter-tabs" style={{ marginTop: 0, marginBottom: 8 }}>
          {subs.map(s => (
            <button key={s}
              className={`filter-tab ${activeSub === s ? 'active' : ''}`}
              style={activeSub === s ? {} : { opacity: .85 }}
              onClick={() => setActiveSub(s)}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="page-inner">
        <div className="stagger">
          {loading
            ? [0,1,2,3].map(i => <SkeletonCard key={i} />)
            : filtered.slice(0, shown).map(t => (
                <ToolCard key={t.id} tool={t}
                  onOpen={(id) => nav({ route: 'detail', toolId: id })}
                  bookmarked={bookmarks.has(t.id)}
                  onBookmark={() => toggleBookmark(t.id)} />
              ))}
        </div>
        {!loading && shown < filtered.length && (
          <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
            <SkeletonCard /><SkeletonCard />
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ink-3)' }}>Nothing here yet.</div>
        )}
        <div style={{ height: 20 }} />
      </div>
    </div>
  );
}

// ─────────────────────────── DETAIL ───────────────────────────
function DetailPage({ nav, toolId, bookmarks, toggleBookmark, openAI }) {
  const tool = window.TOOLS.find(t => t.id === toolId) || window.TOOLS[0];
  const cat  = window.CATEGORIES.find(c => c.id === tool.cat);
  const related = window.TOOLS
    .filter(t => t.cat === tool.cat && t.id !== tool.id)
    .slice(0, 6);

  const [openAcc, setOpenAcc] = useState(new Set(['about']));
  const toggle = (k) => {
    setOpenAcc(prev => {
      const n = new Set(prev);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  };

  return (
    <div className="page back">
      <div className="screen-bg" />
      <div className="topbar">
        <button className="back-btn" onClick={() => nav.back()}>
          <Icon name="chev-l" size={16} /> Back
        </button>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="iconbtn"><Icon name="share" size={18} /></button>
          <Bookmark on={bookmarks.has(tool.id)} onToggle={() => toggleBookmark(tool.id)} />
        </div>
      </div>

      <div className="page-inner stagger">
        {/* Hero */}
        <div className="hero-card glass-rim">
          <div className="hc-aura" style={{ background: `hsl(${tool.hue ?? 260} 80% 55%)` }} />
          <div className="hc-top">
            <Glyph tool={tool} size="lg" />
            <div style={{ flex: 1 }}>
              <div className="hc-sub">{cat.name} · {tool.sub}</div>
              <h1>{tool.name}</h1>
              <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                {tool.isNew && <span className="tag-chip tag-new">NEW</span>}
                {tool.hasDocs && <span className="tag-chip tag-docs">DOCS</span>}
                <span className="sub-pill" style={{ padding: '3px 8px' }}>⭐ 4.{6 + (tool.id.length % 3)}</span>
              </div>
            </div>
          </div>
          <p className="hc-desc">{tool.desc}</p>

          <div className="cta-row">
            <button className="btn-primary">
              <Icon name="play" size={14} stroke={0} /> Try Now
            </button>
            <button className="btn-ghost" onClick={() => openAI(`Explain ${tool.name} to me like I'm building an MVP.`)}>
              <Icon name="sparkle" size={14} /> Ask AI
            </button>
          </div>
        </div>

        {/* Quick meta strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 14 }}>
          {[
            { k: 'Category', v: cat.short },
            { k: 'Pricing', v: ['Free','Freemium','Paid'][tool.id.length % 3] },
            { k: 'Users', v: ['12k','84k','320k','1.2M'][tool.id.length % 4] },
          ].map(m => (
            <div key={m.k} className="glass" style={{ padding: '12px 10px', textAlign: 'center' }}>
              <div className="eyebrow" style={{ fontSize: 9 }}>{m.k}</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 14, marginTop: 4 }}>{m.v}</div>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div className="accordion mt-16">
          <div className={`acc-item ${openAcc.has('about') ? 'open' : ''}`}>
            <button className="acc-head" onClick={() => toggle('about')}>
              <span>About {tool.name}</span>
              <Icon name="chev-r" size={16} className="acc-chev" />
            </button>
            <div className="acc-body"><div className="acc-body-inner">
              {tool.desc} Built by a thriving community, {tool.name} integrates cleanly with the rest of the modern AI stack — pairs well with the tools in the <b>{cat.short}</b> collection.
            </div></div>
          </div>
          <div className={`acc-item ${openAcc.has('features') ? 'open' : ''}`}>
            <button className="acc-head" onClick={() => toggle('features')}>
              <span>Key features</span>
              <Icon name="chev-r" size={16} className="acc-chev" />
            </button>
            <div className="acc-body"><div className="acc-body-inner">
              <div className="feat-list">
                {tool.features.map((f, i) => (
                  <div key={i} className="feat-row">
                    <span className="tick"><Icon name="check" size={13} stroke={2.4} /></span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div></div>
          </div>
          <div className={`acc-item ${openAcc.has('when') ? 'open' : ''}`}>
            <button className="acc-head" onClick={() => toggle('when')}>
              <span>When to reach for it</span>
              <Icon name="chev-r" size={16} className="acc-chev" />
            </button>
            <div className="acc-body"><div className="acc-body-inner">
              Pick {tool.name} when you need the strengths above with minimal setup. Pair it with other tools in <b>{cat.name}</b> for a full workflow, and swap in <b>{related[0]?.name}</b> if you outgrow it.
            </div></div>
          </div>
        </div>

        {/* Related */}
        <div className="section-title"><h2>Related tools</h2><span className="see-all" onClick={() => nav({ route: 'category', catId: tool.cat })}>In {cat.short} ›</span></div>
      </div>

      <div className="rail">
        {related.map(r => (
          <div key={r.id} className="mini-card" onClick={() => nav({ route: 'detail', toolId: r.id })}>
            <Glyph tool={r} />
            <h4>{r.name}</h4>
            <div className="mc-sub">{r.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ height: 20 }} />
    </div>
  );
}

Object.assign(window, { HomePage, CategoryPage, DetailPage });
