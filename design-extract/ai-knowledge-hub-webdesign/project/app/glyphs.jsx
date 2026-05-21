/* global React */
// Glyph: tool "logo" placeholder — gradient block with letter + accent pattern

const { useMemo } = React;

function Glyph({ tool, size = 'md' }) {
  const hue = tool.hue ?? 260;
  const letter = tool.name.replace(/[^A-Za-z0-9]/g, '').charAt(0).toUpperCase();
  const bg = `linear-gradient(135deg,
    hsl(${hue} 80% 62%) 0%,
    hsl(${(hue + 40) % 360} 75% 55%) 100%)`;
  const pat = useMemo(() => {
    const seed = tool.id.charCodeAt(0) + tool.id.charCodeAt(tool.id.length - 1);
    return seed % 4;
  }, [tool.id]);
  const iconSize = size === 'lg' ? 30 : 22;
  const [iconOk, setIconOk] = React.useState(!!tool.iconSlug);

  return (
    <div className={`glyph ${size === 'lg' ? 'lg' : ''}`} style={{ boxShadow: `0 8px 24px -8px hsla(${hue}, 80%, 50%, .55)` }}>
      <div className="gl-bg" style={{ background: bg }} />
      {!iconOk && (
        <svg className="gl-bg" viewBox="0 0 40 40" style={{ opacity: .35 }}>
          {pat === 0 && <circle cx="32" cy="8" r="14" fill="#fff" />}
          {pat === 1 && <rect x="22" y="-8" width="28" height="28" fill="#fff" transform="rotate(15 36 6)" />}
          {pat === 2 && <path d="M-4 28 L22 -4 L44 14 L44 44 L-4 44 Z" fill="#fff" />}
          {pat === 3 && <g fill="#fff"><circle cx="30" cy="10" r="6"/><circle cx="10" cy="30" r="4"/></g>}
        </svg>
      )}
      {iconOk ? (
        <img
          className="gl-letter"
          src={`https://cdn.simpleicons.org/${tool.iconSlug}/ffffff`}
          alt=""
          style={{ width: iconSize, height: iconSize, display: 'block', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.25))' }}
          onError={() => setIconOk(false)}
        />
      ) : (
        <span className="gl-letter" style={{ fontSize: size === 'lg' ? 24 : 18 }}>{letter}</span>
      )}
    </div>
  );
}

function CatAura({ hue, accent }) {
  return <div className="ct-aura" style={{ background: accent }} />;
}

Object.assign(window, { Glyph, CatAura });
