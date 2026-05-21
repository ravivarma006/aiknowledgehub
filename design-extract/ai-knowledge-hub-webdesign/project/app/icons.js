// Brand icon overrides — Simple Icons slugs for tools that have them.
// Slugs come from simpleicons.org (verified live). Tools omitted from this
// map keep the gradient-letter fallback, which is fine for Lovable, Claude
// Code, MCP, Stitch, Antigravity, Azure/AWS services, VS Code, etc. —
// Simple Icons removed those brands for trademark reasons.
//
// Loaded after data.js — merges iconSlug onto each tool by id.

(function () {
  const slugs = {
    // AI & Automation
    'cursor':         'cursor',
    'claude-code':    'anthropic',
    'copilot':        'githubcopilot',
    'huggingface':    'huggingface',
    'langchain':      'langchain',
    'langgraph':      'langchain',
    'vercel-ai':      'vercel',
    'github-mcp':     'github',
    'postgres-mcp':   'postgresql',

    // Data & Analytics
    'looker':         'looker',
    'ga':             'googleanalytics',
    'gtm':            'googletagmanager',

    // Backend & Infra
    'n8n':            'n8n',
    'supabase':       'supabase',
    'firebase':       'firebase',
    'vercel':         'vercel',
    'railway':        'railway',
    'cloudflare':     'cloudflare',
    'namecheap':      'namecheap',
    'erpnext':        'frappe',
    'odoo':           'odoo',
    'stripe':         'stripe',

    // Frontend & Mobile
    'react':          'react',
    'nextjs':         'nextdotjs',
    'rn':             'react',
    'expo':           'expo',
    'flutter':        'flutter',
    'codemagic':      'codemagic',
    'firebase-dist':  'firebase',
    'gplay':          'googleplay',

    // Dev Tools
    'terraform':      'terraform',
    'github':         'github',

    // Design & Animation
    'figma':          'figma',
    'figjam':         'figma',
    'miro':           'miro',
    'ionicons':       'ionic',
    'gsap':           'greensock',
    'lottie':         'lottiefiles',
    'motion':         'framer',

    // Productivity
    'notion':         'notion',
    'ticktick':       'ticktick',
  };

  if (window.TOOLS) {
    for (const t of window.TOOLS) {
      if (slugs[t.id]) t.iconSlug = slugs[t.id];
    }
  }
})();
