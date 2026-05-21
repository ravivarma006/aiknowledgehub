'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { Tool } from '@/data/tools';
import { CATEGORIES } from '@/data/categories';
import { TOOL_URLS } from '@/data/urls';
import { ToolIcon } from './ToolIcon';

function ArrowIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

export function Modal({ tool, onClose }: { tool: Tool | null; onClose: () => void }) {
  const open = !!tool;
  const stableClose = useCallback(onClose, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') stableClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, stableClose]);

  const renderTool = useRef<Tool | null>(null);
  if (tool) renderTool.current = tool;
  const t = renderTool.current;

  return (
    <div
      className={`modal-back ${open ? 'open' : ''}`}
      onClick={onClose}
      aria-hidden={!open}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={t ? t.name : ''}>
        {t && (
          <>
            <div className="modal-hd">
              <div className="icon"><ToolIcon tool={t} /></div>
              <div className="titles">
                <h2>{t.name}</h2>
                <div className="sub">{t.sub}</div>
              </div>
              <button className="close" onClick={onClose} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              {t.tagline && <p className="modal-tagline">&ldquo;{t.tagline}&rdquo;</p>}
              <p className="modal-desc">{t.longDesc || t.desc}</p>

              {t.features && t.features.length > 0 && (
                <div className="modal-section">
                  <h4>Features</h4>
                  <ul className="feat-grid">
                    {t.features.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
              )}

              {(t.pros || t.cons) && (
                <div className="modal-section">
                  <h4>Pros &amp; trade-offs</h4>
                  <div className="proscons">
                    {t.pros && (
                      <div className="pc pros">
                        <h5>Strengths</h5>
                        <ul>{t.pros.map((p, i) => <li key={i}>{p}</li>)}</ul>
                      </div>
                    )}
                    {t.cons && (
                      <div className="pc cons">
                        <h5>Watch-outs</h5>
                        <ul>{t.cons.map((p, i) => <li key={i}>{p}</li>)}</ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {t.bestFor && t.bestFor.length > 0 && (
                <div className="modal-section">
                  <h4>Best for</h4>
                  <ul className="feat-grid">
                    {t.bestFor.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              )}

              <div className="meta-row">
                {t.pricing && <div className="m"><b>Pricing</b>{t.pricing}</div>}
                {t.year && <div className="m"><b>Since</b>{t.year}</div>}
                <div className="m"><b>Category</b>{(CATEGORIES.find(c => c.id === t.cat))?.name || t.cat}</div>
              </div>
            </div>

            <div className="modal-foot">
              <a
                className="btn btn-primary"
                href={TOOL_URLS[t.id] || `https://www.google.com/search?q=${encodeURIComponent(t.name)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit {t.name}
                <span className="arrow"><ArrowIcon /></span>
              </a>
              <button className="btn btn-ghost" onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
