/* global React, ReactDOM */
// Web root app (no AI assistant)

const { useState, useEffect, useRef, useCallback } = React;

function App() {
  const [bookmarks, setBookmarks] = useState(new Set(['cursor','motion','nextjs','supabase']));
  const [spotlightId, setSpotlightId] = useState('cursor');
  const [libraryCat, setLibraryCat] = useState(null);
  const [cmdOpen, setCmdOpen] = useState(false);

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const pickTool = useCallback((id, catId) => {
    if (id) {
      setSpotlightId(id);
      requestAnimationFrame(() => {
        document.getElementById('spotlight')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else if (catId) {
      setLibraryCat(catId);
      requestAnimationFrame(() => {
        document.getElementById('library')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  // Cursor spotlight follower
  useEffect(() => {
    const el = document.getElementById('cursor-spotlight');
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--mx', `${e.clientX}px`);
        el.style.setProperty('--my', `${e.clientY}px`);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  // ⌘K shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Nav onCmdK={() => setCmdOpen(true)} />
      <Hero onCmdK={() => setCmdOpen(true)} onPickTool={pickTool} />
      <TrendingBento onPickTool={pickTool} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />
      <CategoriesGrid onPickCat={(id) => pickTool(null, id)} />
      <Library
        onPickTool={pickTool}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
        initialCat={libraryCat}
      />
      <Spotlight
        toolId={spotlightId}
        onPickTool={pickTool}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
      />
      <Changelog onPickTool={pickTool} />
      <Footer />

      <CmdK
        open={cmdOpen}
        onClose={() => setCmdOpen(false)}
        onPickTool={pickTool}
        onAsk={() => {}}
      />
    </>
  );
}

// Expose App globally; the mount happens in tweaks-app.jsx so the panel can wrap it.
window.App = App;
