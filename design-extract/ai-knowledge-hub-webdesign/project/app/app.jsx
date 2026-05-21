/* global React, ReactDOM */
// Root app: routing, bookmarks, AI assistant sheet, bottom nav

const { useState, useEffect, useCallback } = React;

function BottomNav({ current, onNav, onAI }) {
  return (
    <nav className="bottom-nav">
      <button className={`nav-item ${current === 'home' ? 'active' : ''}`} onClick={() => onNav({ route: 'home' })}>
        <span className="indicator" />
        <Icon name="home" size={20} />
        <span>Home</span>
      </button>
      <button className={`nav-item ${current === 'category' ? 'active' : ''}`} onClick={() => onNav({ route: 'category' })}>
        <span className="indicator" />
        <Icon name="grid" size={20} />
        <span>Browse</span>
      </button>
      <button className="nav-orb" onClick={() => onAI()}>
        <Icon name="sparkle" size={22} stroke={2.2} />
      </button>
      <button className={`nav-item ${current === 'saved' ? 'active' : ''}`} onClick={() => onNav({ route: 'saved' })}>
        <span className="indicator" />
        <Icon name="bookmark" size={20} />
        <span>Saved</span>
      </button>
      <button className={`nav-item ${current === 'profile' ? 'active' : ''}`} onClick={() => onNav({ route: 'profile' })}>
        <span className="indicator" />
        <Icon name="user" size={20} />
        <span>Profile</span>
      </button>
    </nav>
  );
}

// ── AI Assistant sheet ──────────────────────────────
function AISheet({ open, onClose, seed }) {
  const [msgs, setMsgs] = useState([
    { role: 'ai', text: "Hi Prasanna — I'm Nexus AI. Ask me anything about the 75+ tools in your hub, or tell me what you're building." }
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const bodyRef = React.useRef(null);

  useEffect(() => {
    if (open && seed && seed.trim()) {
      send(seed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, seed]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, typing]);

  const send = (text) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { role: 'me', text }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, suggestReply(text)]);
    }, 900 + Math.random() * 500);
  };

  return (
    <>
      <div className={`ai-backdrop ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`ai-sheet ${open ? 'open' : ''}`} role="dialog" aria-label="AI Assistant">
        <div className="ai-sheet-grip" />
        <div className="ai-sheet-head">
          <div className="ai-avatar">✶</div>
          <div style={{ flex: 1 }}>
            <h3>Nexus AI</h3>
            <div className="sub">Always-on · Haiku 4.5</div>
          </div>
          <button className="iconbtn" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>

        <div className="ai-body" ref={bodyRef}>
          {msgs.map((m, i) => (
            <div key={i} className={`msg ${m.role}`}>
              <div className="bubble">
                {m.text}
                {m.chips && (
                  <div className="chip-row">
                    {m.chips.map(c => <span key={c} className="chip">{c}</span>)}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="msg ai">
              <div className="bubble">
                <span className="typing"><span/><span/><span/></span>
              </div>
            </div>
          )}
          {msgs.length === 1 && !typing && (
            <div className="chip-row" style={{ marginTop: 8 }}>
              {['Best AI coding stack?', 'How to use MCP?', 'Compare Supabase vs Firebase', 'RAG with Azure AI Search'].map(s => (
                <span key={s} className="chip" style={{ cursor: 'pointer' }} onClick={() => send(s)}>{s}</span>
              ))}
            </div>
          )}
        </div>

        <div className="ai-input-wrap">
          <form className="ai-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
            <Icon name="sparkle" size={16} />
            <input
              placeholder="Ask Nexus AI…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="ai-send" aria-label="Send">
              <Icon name="send" size={16} stroke={2.2} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

function suggestReply(q) {
  const low = q.toLowerCase();
  // keyword routing for demo replies
  if (/skill|learn|course|roadmap|study|how to|where to|resource|tutorial|beginner|prompt engineer|rag|agent dev|mlops|llmops|finance ai|frontend skill|backend skill|security skill/.test(low)) {
    return { role: 'ai', text: "The Skills & Learning category has 26 curated resources across 9 domains. Start here: DeepLearning.AI for AI fundamentals (free, 100+ short courses), DAIR.AI Prompt Engineering Guide for prompting, LangGraph course for agents, RAG All-in-One for vector DBs, and MLOps Zoomcamp for production ML. Pick your domain below.", chips: ['AI Fundamentals','Prompt Engineering','Agent Development','RAG & Vector DBs','Finance & Accounting'] };
  }
  if (/gemini spark|spark/.test(low)) {
    return { role: 'ai', text: "Gemini Spark (I/O 2026) is Google's 24/7 personal AI agent. It runs on Google Cloud VMs even when your laptop is closed — connected to Gmail, Docs, and Chrome. Teach it recurring tasks like daily inbox summaries or monthly bill audits. Beta for AI Ultra subscribers now.", chips: ['Gemini Spark','Daily Brief','Gemini 3.5 Flash','Antigravity 2.0'] };
  }
  if (/antigravity|agent.?first|agent platform/.test(low)) {
    return { role: 'ai', text: "Antigravity 2.0 (I/O 2026) is Google's agent-first dev platform — a standalone desktop app, CLI, and SDK for building and orchestrating AI agents powered by Gemini 3.5 Flash. Think of it as the agentic IDE Google uses to build its own products.", chips: ['Antigravity 2.0','Jules','Gemini 3.5 Flash','Vertex AI'] };
  }
  if (/google.?io.?2026|io 2026|gemini 3|3\.5 flash|omni|google pics|daily brief|universal cart|docs live|nano banana/.test(low)) {
    return { role: 'ai', text: "Google I/O 2026's headline: the Agentic Era. Key launches — Gemini 3.5 Flash (frontier speed), Antigravity 2.0 (agent IDE), Gemini Spark (24/7 personal agent), Gemini Omni (any-input-to-video), Google Pics (Nano Banana 2 image editor), Daily Brief (overnight digest agent).", chips: ['Gemini 3.5 Flash','Gemini Spark','Antigravity 2.0','Gemini Omni','Google Pics'] };
  }
  if (/gemini|google ai|vertex|jules|veo|imagen|notebooklm|genkit|gemma|astra|whisk/.test(low)) {
    return { role: 'ai', text: "Google's AI stack spans frontier models to creative tools. Gemini 3.5 Flash is the latest (I/O 2026). Jules handles async coding tasks from GitHub issues. NotebookLM turns your documents into a grounded expert. Veo 2 and Gemini Omni generate cinematic video.", chips: ['Gemini 3.5 Flash','Jules','NotebookLM','Gemini Omni','Vertex AI'] };
  }
  if (/mcp/.test(low)) {
    return { role: 'ai', text: "MCP (Model Context Protocol) lets AI agents talk to real tools. Start with the base server, then add domain servers like Postgres MCP, GitHub MCP, or Azure MCP.", chips: ['MCP Tools','GitHub MCP','Postgres MCP','Composio'] };
  }
  if (/rag|vector|search/.test(low)) {
    return { role: 'ai', text: "For RAG, pair Firecrawl (for clean markdown ingest) with Azure AI Search or Supabase pgvector. Vercel AI SDK makes the streaming UI trivial.", chips: ['Firecrawl','Azure AI Search','Supabase','Vercel AI SDK'] };
  }
  if (/supabase|firebase/.test(low)) {
    return { role: 'ai', text: "Supabase = open-source Postgres + Auth + pgvector. Firebase = battle-tested realtime + generous free tier. Pick Supabase for SQL-first apps, Firebase for fast mobile.", chips: ['Supabase','Firebase'] };
  }
  if (/stack|best|recommend/.test(low)) {
    return { role: 'ai', text: "A solid 2026 stack: Next.js + Vercel AI SDK on Vercel, Supabase for data & auth, Motion for animations, Cursor or Claude Code for dev velocity.", chips: ['Next.js','Vercel AI SDK','Supabase','Cursor','Motion'] };
  }
  if (/mvp|prototype|fast/.test(low)) {
    return { role: 'ai', text: "Fastest path to an MVP: Lovable for the prompt → app scaffold, Supabase for data, Vercel to deploy. Iterate in Cursor once you outgrow the generator.", chips: ['Lovable','Supabase','Vercel','Cursor'] };
  }
  return { role: 'ai', text: "Good question. I'd look at the tools tagged with that keyword in the hub — tap any of these to jump to its detail page:", chips: window.TOOLS.slice(0, 4).map(t => t.name) };
}

// ── Saved page (simple) ──────────────────────────────
function SavedPage({ nav, bookmarks, toggleBookmark }) {
  const saved = window.TOOLS.filter(t => bookmarks.has(t.id));
  return (
    <div className="page">
      <div className="screen-bg" />
      <div className="topbar">
        <div className="topbar-title">Saved</div>
        <button className="iconbtn"><Icon name="filter" size={18} /></button>
      </div>
      <div className="page-inner">
        <div className="eyebrow">Your collection</div>
        <div className="h-display" style={{ fontSize: 28, marginTop: 4 }}>
          {saved.length} <span className="grad-text">bookmarks</span>
        </div>
        <div className="muted" style={{ fontSize: 13, marginTop: 6, marginBottom: 16 }}>
          Tap the bookmark icon on any tool to add it here.
        </div>
        <div className="stagger">
          {saved.length === 0 ? (
            <div className="glass" style={{ padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>✶</div>
              <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, marginBottom: 4 }}>Nothing saved yet</div>
              <div className="muted" style={{ fontSize: 13 }}>Start bookmarking — try tapping the ribbon on Cursor or Motion.</div>
            </div>
          ) : saved.map(t => (
            <ToolCard key={t.id} tool={t}
              onOpen={(id) => nav({ route: 'detail', toolId: id })}
              bookmarked={true}
              onBookmark={() => toggleBookmark(t.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Profile page ──────────────────────────────
function ProfilePage({ nav, theme, toggleTheme }) {
  const [openAcc, setOpenAcc] = React.useState(new Set());
  const toggleAcc = (k) => setOpenAcc(prev => {
    const n = new Set(prev);
    n.has(k) ? n.delete(k) : n.add(k);
    return n;
  });

  return (
    <div className="page">
      <div className="screen-bg" />
      <div className="topbar">
        <div className="topbar-title">Profile</div>
        <button className="iconbtn"><Icon name="share" size={18} /></button>
      </div>
      <div className="page-inner stagger">
        <div className="hero-card glass-rim" style={{ textAlign: 'center' }}>
          <div className="hc-aura" style={{ background: '#b68cff' }} />
          <div style={{ width: 80, height: 80, borderRadius: '50%', margin: '6px auto 12px', background: 'var(--grad-primary)', display: 'grid', placeItems: 'center', fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 28, color: '#0a0520', boxShadow: '0 0 40px rgba(182,140,255,.4)' }}>PC</div>
          <div className="h-display" style={{ fontSize: 22 }}>Prasanna Cantulum</div>
          <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>prasanna.cantulum@gmail.com</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 20, padding: '14px 0 4px', borderTop: '1px solid var(--line)' }}>
            {[['120','Explored'],['12','Saved'],['43','Days']].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 700, fontSize: 20 }} className="grad-text">{n}</div>
                <div className="eyebrow" style={{ fontSize: 10 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick theme toggle strip — always visible */}
        <div className="glass" style={{ padding: '14px 16px', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--grad-soft)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: theme === 'dark' ? '#b68cff' : '#e08800' }}>
              <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={18} stroke={1.8} />
            </div>
            <div>
              <div style={{ fontFamily: 'var(--ff-display)', fontWeight: 600, fontSize: 14 }}>Appearance</div>
              <div className="muted" style={{ fontSize: 11, marginTop: 1 }}>{theme === 'dark' ? 'Dark mode' : 'Light mode'} active</div>
            </div>
          </div>
          {/* Toggle pill */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{
              width: 52, height: 28, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 3,
              background: theme === 'dark'
                ? 'linear-gradient(90deg,#b68cff,#5ac8ff)'
                : 'linear-gradient(90deg,#f4a823,#ff7a3d)',
              transition: 'background .3s',
              display: 'flex', alignItems: 'center',
              justifyContent: theme === 'dark' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,.25)', transition: 'transform .25s var(--ease-spring)' }} />
          </button>
        </div>

        {/* Theme preview cards */}
        <div className="appearance-opts">
          <button className={`theme-opt ${theme === 'dark' ? 'active' : ''}`} onClick={() => { if (theme !== 'dark') toggleTheme(); }}>
            <div className="theme-opt-preview dark-prev">
              <div className="prev-bar" />
            </div>
            <span className="theme-opt-label">Dark</span>
          </button>
          <button className={`theme-opt ${theme === 'light' ? 'active' : ''}`} onClick={() => { if (theme !== 'light') toggleTheme(); }}>
            <div className="theme-opt-preview light-prev">
              <div className="prev-bar" />
            </div>
            <span className="theme-opt-label">Light</span>
          </button>
        </div>

        <div className="accordion" style={{ marginTop: 8 }}>
          {['Notifications','Privacy','Help & Feedback','About Nexus'].map(s => (
            <div key={s} className={`acc-item ${openAcc.has(s) ? 'open' : ''}`}>
              <button className="acc-head" onClick={() => toggleAcc(s)}>
                <span>{s}</span>
                <Icon name="chev-r" size={16} className="acc-chev" />
              </button>
              <div className="acc-body">
                <div className="acc-body-inner" style={{ color: 'var(--ink-3)', fontStyle: 'italic' }}>Coming soon.</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── App Shell ──────────────────────────────
function App() {
  const [state, setState] = useState({ route: 'home' });
  const [history, setHistory] = useState([]);
  const [bookmarks, setBookmarks] = useState(new Set(['motion','cursor','nextjs']));
  const [aiOpen, setAiOpen] = useState(false);
  const [aiSeed, setAiSeed] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('nexus-theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
    localStorage.setItem('nexus-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const nav = useCallback((next) => {
    setHistory(h => [...h, state]);
    setState(next);
    // reset scroll
    requestAnimationFrame(() => {
      const p = document.querySelector('.page');
      if (p) p.scrollTop = 0;
    });
  }, [state]);
  nav.back = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory(h => h.slice(0, -1));
      setState(prev);
    } else {
      setState({ route: 'home' });
    }
  };

  const toggleBookmark = (id) => {
    setBookmarks(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const openAI = (seed = '') => {
    setAiSeed(seed);
    setAiOpen(true);
  };

  let page = null;
  switch (state.route) {
    case 'category':
      page = <CategoryPage key={state.catId || 'all'} nav={nav} catId={state.catId} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />; break;
    case 'detail':
      page = <DetailPage key={state.toolId} nav={nav} toolId={state.toolId} bookmarks={bookmarks} toggleBookmark={toggleBookmark} openAI={openAI} />; break;
    case 'saved':
      page = <SavedPage nav={nav} bookmarks={bookmarks} toggleBookmark={toggleBookmark} />; break;
    case 'profile':
      page = <ProfilePage nav={nav} theme={theme} toggleTheme={toggleTheme} />; break;
    case 'home':
    default:
      page = <HomePage nav={nav} bookmarks={bookmarks} toggleBookmark={toggleBookmark} openAI={openAI} theme={theme} toggleTheme={toggleTheme} />;
  }

  return (
    <>
      {page}
      <BottomNav
        current={state.route === 'detail' ? 'home' : state.route}
        onNav={nav}
        onAI={() => openAI('')}
      />
      <AISheet open={aiOpen} onClose={() => setAiOpen(false)} seed={aiSeed} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
