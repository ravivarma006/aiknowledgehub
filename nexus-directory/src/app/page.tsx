'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { TOOLS } from '@/data/tools';
import { CATEGORIES } from '@/data/categories';
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/Card';
import { Modal } from '@/components/Modal';
import type { Tool } from '@/data/tools';

export default function Home() {
  const [activeCat, setActiveCat] = useState('all');
  const [query, setQuery] = useState('');
  const [openTool, setOpenTool] = useState<Tool | null>(null);
  const [onlyNew, setOnlyNew] = useState(false);
  const [onlyDocs, setOnlyDocs] = useState(false);
  const [theme, setTheme] = useState('vintage');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nexus-theme');
      if (saved === 'clean' || saved === 'vintage' || saved === 'dark') setTheme(saved);
      else setTheme('vintage');
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    document.body.classList.remove('theme-vintage', 'theme-dark');
    if (theme === 'vintage') document.body.classList.add('theme-vintage');
    if (theme === 'dark') document.body.classList.add('theme-dark');
    try { localStorage.setItem('nexus-theme', theme); } catch { /* noop */ }
  }, [theme]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: TOOLS.length };
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

  const open = useCallback((t: Tool) => setOpenTool(t), []);
  const close = useCallback(() => setOpenTool(null), []);

  const activeCatName =
    activeCat === 'all'
      ? 'All tools'
      : (CATEGORIES.find(c => c.id === activeCat))?.name || activeCat;

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
          setOnlyNew={setOnlyNew as unknown as (fn: (v: boolean) => boolean) => void}
          onlyDocs={onlyDocs}
          setOnlyDocs={setOnlyDocs as unknown as (fn: (v: boolean) => boolean) => void}
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
              <div className="hero-eyebrow"><span className="dot" />The modern web stack &middot; 2026 edition</div>
              <h1>
                {activeCat === 'all'
                  ? <>A clean <em>directory</em> of the tools we actually use.</>
                  : <>{activeCatName} <em>tools</em>, in one place.</>}
              </h1>
              <p className="lede">
                {activeCat === 'all'
                  ? `${TOOLS.length} hand-picked tools across AI, data, backend, cloud, frontend, dev tools, design, and productivity — each with a short description, the trade-offs, and a link to the source.`
                  : (CATEGORIES.find(c => c.id === activeCat))?.desc}
              </p>
              <div className="hero-meta">
                <div className="stat"><div className="n">{filtered.length}</div><div className="l">Showing</div></div>
                <div className="stat"><div className="n">{TOOLS.length}</div><div className="l">Total</div></div>
                <div className="stat"><div className="n">{TOOLS.filter(t => t.isNew).length}</div><div className="l">New in 2024-26</div></div>
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
                <div>Nexus directory &middot; {TOOLS.length} tools &middot; curated {new Date().getFullYear()}</div>
                <div className="links">
                  <a href="#top">Top</a>
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
