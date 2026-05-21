'use client';

import { CATEGORIES } from '@/data/categories';
import { TOOLS } from '@/data/tools';

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

function ThemeSwitch({ theme, setTheme }: { theme: string; setTheme: (t: string) => void }) {
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
        className={theme === 'vintage' ? 'on' : ''}
        onClick={() => setTheme('vintage')}
        role="radio"
        aria-checked={theme === 'vintage'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3c-4.97 0-9 2.69-9 6v6c0 3.31 4.03 6 9 6s9-2.69 9-6V9c0-3.31-4.03-6-9-6z" />
          <path d="M3 9c0 3.31 4.03 6 9 6s9-2.69 9-6" />
        </svg>
        Vintage
      </button>
      <button
        className={theme === 'dark' ? 'on' : ''}
        onClick={() => setTheme('dark')}
        role="radio"
        aria-checked={theme === 'dark'}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z" />
        </svg>
        Dark
      </button>
    </div>
  );
}

interface SidebarProps {
  activeCat: string;
  setActiveCat: (cat: string) => void;
  query: string;
  setQuery: (q: string) => void;
  counts: Record<string, number>;
  onlyNew: boolean;
  setOnlyNew: (fn: (v: boolean) => boolean) => void;
  onlyDocs: boolean;
  setOnlyDocs: (fn: (v: boolean) => boolean) => void;
  theme: string;
  setTheme: (t: string) => void;
}

export function Sidebar({
  activeCat, setActiveCat, query, setQuery,
  counts, onlyNew, setOnlyNew, onlyDocs, setOnlyDocs,
  theme, setTheme,
}: SidebarProps) {
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
          placeholder="Search tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className="clear" onClick={() => setQuery('')} aria-label="Clear search">&times;</button>
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
          <span className="sb-dot" />
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
            <span className="sb-dot" />
            <span className="sb-label">{c.name}</span>
            <span className="sb-ct">{counts[c.id] || 0}</span>
          </button>
        ))}
      </nav>

      <div className="sb-section">Filters</div>
      <button
        className={`sb-toggle ${onlyNew ? 'on' : ''}`}
        onClick={() => setOnlyNew((v: boolean) => !v)}
        aria-pressed={onlyNew}
      >
        <span>New only</span>
        <span className="knob" />
      </button>
      <button
        className={`sb-toggle ${onlyDocs ? 'on' : ''}`}
        onClick={() => setOnlyDocs((v: boolean) => !v)}
        aria-pressed={onlyDocs}
      >
        <span>Has docs</span>
        <span className="knob" />
      </button>

      <div className="sb-section sb-theme-wrap">Theme</div>
      <div className="sb-theme-wrap">
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </div>

      <div className="sb-foot">
        {TOOLS.length} tools &middot; {CATEGORIES.length} categories<br />
        Updated {new Date().getFullYear()}
      </div>
    </aside>
  );
}
