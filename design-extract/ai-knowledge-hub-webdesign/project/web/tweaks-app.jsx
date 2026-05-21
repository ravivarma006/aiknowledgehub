/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */
// Wraps the page-level <App /> with a Tweaks panel + live theme syncing.

const App = window.App;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "accent": "aurora",
  "density": "regular",
  "radius": "default",
  "orb": true,
  "glow": true,
  "grain": true,
  "spotlight": true
}/*EDITMODE-END*/;

function TweakedApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Sync tweaks → body attributes / classes
  React.useEffect(() => {
    const b = document.body;
    b.classList.toggle('theme-light', t.theme === 'light');
    b.setAttribute('data-accent', t.accent);
    b.setAttribute('data-density', t.density);
    b.setAttribute('data-radius', t.radius);
    b.setAttribute('data-orb',       t.orb       ? 'on' : 'off');
    b.setAttribute('data-glow',      t.glow      ? 'on' : 'off');
    b.setAttribute('data-grain',     t.grain     ? 'on' : 'off');
    b.setAttribute('data-spotlight', t.spotlight ? 'on' : 'off');
    // strip the legacy inline background-color if present
    if (b.style.backgroundColor) b.style.removeProperty('background-color');
  }, [t.theme, t.accent, t.density, t.radius, t.orb, t.glow, t.grain, t.spotlight]);

  // Accent palette swatches (display only — the actual override is CSS-driven)
  const accentSwatches = {
    aurora:  ['#b68cff', '#5ac8ff', '#3bd7c0'],
    sunset:  ['#ff5e8a', '#ff9a5a', '#ffd166'],
    forest:  ['#5ae8a8', '#3bd7c0', '#b4e85a'],
    mono:    ['#f6f4ff', '#d9d6f2', '#a5a1c9'],
  };

  return (
    <>
      <App />
      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakRadio
          label="Background"
          value={t.theme}
          options={[
            { value: 'dark',  label: 'Dark'  },
            { value: 'light', label: 'White' },
          ]}
          onChange={(v) => setTweak('theme', v)}
        />
        <TweakColor
          label="Accent palette"
          value={accentSwatches[t.accent]}
          options={[
            accentSwatches.aurora,
            accentSwatches.sunset,
            accentSwatches.forest,
            accentSwatches.mono,
          ]}
          onChange={(palette) => {
            const key = Object.keys(accentSwatches).find(
              (k) => accentSwatches[k].join(',') === palette.join(',')
            );
            if (key) setTweak('accent', key);
          }}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Density"
          value={t.density}
          options={['compact', 'regular', 'spacious']}
          onChange={(v) => setTweak('density', v)}
        />
        <TweakRadio
          label="Corners"
          value={t.radius}
          options={[
            { value: 'sharp',   label: 'Sharp' },
            { value: 'default', label: 'Round' },
            { value: 'pill',    label: 'Pill'  },
          ]}
          onChange={(v) => setTweak('radius', v)}
        />

        <TweakSection label="Effects" />
        <TweakToggle label="Hero orb"          value={t.orb}       onChange={(v) => setTweak('orb', v)} />
        <TweakToggle label="Backdrop glows"    value={t.glow}      onChange={(v) => setTweak('glow', v)} />
        <TweakToggle label="Film grain"        value={t.grain}     onChange={(v) => setTweak('grain', v)} />
        <TweakToggle label="Cursor spotlight"  value={t.spotlight} onChange={(v) => setTweak('spotlight', v)} />
      </TweaksPanel>
    </>
  );
}

// Replace the root render with the tweaked wrapper.
const __root = document.getElementById('root');
if (__root && !__root.__tweakedMounted) {
  __root.__tweakedMounted = true;
  ReactDOM.createRoot(__root).render(<TweakedApp />);
}
