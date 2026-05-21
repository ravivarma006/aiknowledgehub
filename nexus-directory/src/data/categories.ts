export interface Category {
  id: string;
  name: string;
  short: string;
  emoji: string;
  hue: number;
  accent: string;
  desc: string;
}

export const CATEGORIES: Category[] = [
  { id: 'ai',        name: 'AI & Automation',     short: 'AI',        emoji: '◎', hue: 280, accent: '#b68cff', desc: 'Editors, agents, MCP servers, model SDKs — the layer that thinks.' },
  { id: 'google',    name: 'Google AI',           short: 'Google',    emoji: '⬡', hue: 50,  accent: '#4285f4', desc: "Gemini models, Vertex AI, NotebookLM, Antigravity — Google's full AI stack for 2026." },
  { id: 'data',      name: 'Data & Analytics',    short: 'Data',      emoji: '▦', hue: 200, accent: '#5ac8ff', desc: 'BI, semantic layers, search, web analytics — the layer that measures.' },
  { id: 'backend',   name: 'Backend & Infra',     short: 'Backend',   emoji: '▤', hue: 160, accent: '#3bd7c0', desc: 'BaaS, workflows, scraping, payments, ERP — the layer that runs.' },
  { id: 'cloud',     name: 'Cloud Platforms',     short: 'Cloud',     emoji: '◈', hue: 220, accent: '#6aa9ff', desc: 'Azure, AWS primitives — the layer the platforms are built on.' },
  { id: 'frontend',  name: 'Frontend & Mobile',   short: 'Frontend',  emoji: '◊', hue: 330, accent: '#ff7ac3', desc: 'React, Next, Native, Flutter, CI/CD — the layer that ships pixels.' },
  { id: 'devtools',  name: 'Dev Tools & Testing', short: 'DevOps',    emoji: '◉', hue: 20,  accent: '#ffab66', desc: 'IaC, source control, testing, deployment — the layer that automates.' },
  { id: 'design',    name: 'Design & Animation',  short: 'Design',    emoji: '✶', hue: 300, accent: '#e07aff', desc: 'Figma, motion, color, icons, whiteboards — the layer that designs.' },
  { id: 'productivity', name: 'Productivity',     short: 'Productivity', emoji: '◐', hue: 140, accent: '#7ae38a', desc: 'Notes, tasks, knowledge — the layer that keeps the team in flow.' },
  { id: 'skills',    name: 'Skills & Learning',   short: 'Skills',    emoji: '◑', hue: 170, accent: '#00e5a0', desc: 'Courses, GitHub roadmaps, docs — every skill to build AI products end-to-end.' },
];
