'use client';

import type { Tool } from '@/data/tools';
import { ToolIcon } from './ToolIcon';

function ArrowIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function Card({ tool, onOpen }: { tool: Tool; onOpen: (t: Tool) => void }) {
  return (
    <button className="card" onClick={() => onOpen(tool)} aria-label={`Open ${tool.name}`}>
      <div className="head">
        <div className="icon"><ToolIcon tool={tool} /></div>
        <div className="badges">
          {tool.isNew && <span className="badge new">New</span>}
          {tool.hasDocs && <span className="badge">Docs</span>}
        </div>
      </div>
      <h3>{tool.name}</h3>
      <div className="sub">{tool.sub}</div>
      <p>{tool.desc}</p>
      <div className="foot">
        <span>{tool.year || ''}</span>
        <span className="open">
          Open
          <span className="arrow"><ArrowIcon /></span>
        </span>
      </div>
    </button>
  );
}
