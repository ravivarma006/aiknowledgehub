'use client';

import { useState } from 'react';
import type { Tool } from '@/data/tools';

function iconUrl(slug: string) {
  return `https://cdn.simpleicons.org/${slug}/0a0a0a`;
}

export function ToolIcon({ tool }: { tool: Tool }) {
  const slug = tool.iconSlug;
  const [failed, setFailed] = useState(false);

  if (slug && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={iconUrl(slug)}
        alt=""
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return <span className="letter">{tool.name.charAt(0)}</span>;
}
