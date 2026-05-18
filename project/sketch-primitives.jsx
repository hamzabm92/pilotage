/* Sketch primitives — hand-drawn-ish UI atoms for wireframes */

const TAB_SETS = {
  v0: [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', color: '#1F1F1F' },
    { id: 'pro', label: 'PRO', icon: 'briefcase', color: 'var(--pro)' },
    { id: 'perso', label: 'PERSO', icon: 'person', color: 'var(--perso)' },
  ],
  public: [
    { id: 'dashboard', label: 'Cockpit', icon: 'home', color: '#1F1F1F' },
    { id: 'comptes', label: 'Comptes', icon: 'wallet', color: '#1F1F1F' },
    { id: 'scenarios', label: 'Scénarios', icon: 'sliders', color: '#1F1F1F' },
    { id: 'objectifs', label: 'Objectifs', icon: 'target', color: '#1F1F1F' },
  ],
};

// ─── Phone frame ───────────────────────────────────────────────
function PhoneFrame({ children, label, tabSet = 'v0', noTabs = false, contentPad = '14px 18px 88px' }) {
  // 360 x 720 inner canvas inside a minimal phone outline
  return (
    <div style={{ width: 392, position: 'relative', fontFamily: "'Patrick Hand', sans-serif" }}>
      <div style={{
        position: 'relative',
        width: 392,
        height: 760,
        borderRadius: 38,
        border: '1.5px solid #1F1F1F',
        background: 'var(--paper)',
        overflow: 'hidden',
        boxShadow: '4px 4px 0 0 rgba(31,31,31,0.06)',
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 110, height: 18, borderRadius: 12, border: '1.2px solid #1F1F1F',
          background: 'var(--paper)',
        }} />
        {/* Status bar */}
        <div style={{ position: 'absolute', top: 14, left: 24, fontSize: 13, color: '#1F1F1F' }}>9:41</div>
        <div style={{ position: 'absolute', top: 14, right: 24, fontSize: 13, color: '#1F1F1F', letterSpacing: 1 }}>•••</div>

        {/* Inner screen scroll area */}
        <div style={{
          position: 'absolute', inset: noTabs ? '40px 0 0 0' : '40px 0 0 0',
          padding: noTabs ? '14px 18px 18px' : contentPad,
          overflow: 'hidden',
          color: '#1F1F1F',
        }}>
          {children}
        </div>

        {/* Bottom tab bar */}
        {!noTabs && <BottomTabs active={label} tabs={TAB_SETS[tabSet] || TAB_SETS.v0} />}
      </div>
    </div>
  );
}

// ─── Bottom tab bar ────────────────────────────────────────────
function BottomTabs({ active, tabs }) {
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: 72, borderTop: '1.2px solid #1F1F1F',
      background: 'var(--paper)',
      display: 'flex',
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        const color = on ? t.color : '#9a9a9a';
        return (
          <div key={t.id} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 4,
            color,
            fontWeight: on ? 700 : 400,
            position: 'relative',
          }}>
            <TabIcon kind={t.icon} color={color} on={on} />
            <div style={{ fontSize: 12 }}>{t.label}</div>
            {on && (
              <svg width="34" height="6" style={{ position: 'absolute', bottom: 6 }}>
                <path d="M2 3 Q 17 1 32 3" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TabIcon({ kind, color, on }) {
  const sw = on ? 1.8 : 1.4;
  if (kind === 'home') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11 L12 4 L21 11 L21 20 L14 20 L14 14 L10 14 L10 20 L3 20 Z" />
      </svg>
    );
  }
  if (kind === 'briefcase') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="7" width="18" height="13" rx="1.5" />
        <path d="M8 7 V 5 Q 8 4 9 4 H 15 Q 16 4 16 5 V 7" />
        <path d="M3 12 H 21" />
      </svg>
    );
  }
  if (kind === 'wallet') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10 H 21" />
        <circle cx="16.5" cy="14.5" r="1.2" />
      </svg>
    );
  }
  if (kind === 'sliders') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7 H 20" />
        <circle cx="9" cy="7" r="2.2" fill="var(--paper)" />
        <path d="M4 17 H 20" />
        <circle cx="15" cy="17" r="2.2" fill="var(--paper)" />
      </svg>
    );
  }
  if (kind === 'target') {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.2" fill={color} stroke="none" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20 Q 12 13 19 20" />
    </svg>
  );
}

// ─── Sketchy card with optional side-border accent ────────────
function SketchCard({ children, accent, accentSide = 'left', style, dashed }) {
  // accent: 'pro' | 'perso' | undefined
  const border = dashed ? '1.4px dashed #1F1F1F' : '1.4px solid #1F1F1F';
  const accentColor = accent === 'pro' ? 'var(--pro)' : accent === 'perso' ? 'var(--perso)' : null;
  return (
    <div style={{
      position: 'relative',
      border,
      borderRadius: 12,
      padding: '12px 14px',
      background: 'var(--paper)',
      boxShadow: '2px 2px 0 0 rgba(31,31,31,0.06)',
      ...(style || {}),
    }}>
      {accentColor && accentSide === 'left' && (
        <div style={{ position: 'absolute', left: -1.5, top: -1.5, bottom: -1.5, width: 5, background: accentColor, borderRadius: '12px 0 0 12px' }} />
      )}
      {accentColor && accentSide === 'top' && (
        <div style={{ position: 'absolute', top: -1.5, left: -1.5, right: -1.5, height: 5, background: accentColor, borderRadius: '12px 12px 0 0' }} />
      )}
      {children}
    </div>
  );
}

// ─── Section header (hand-drawn underline) ─────────────────────
function SectionHeader({ index, children, accent }) {
  const color = accent === 'pro' ? 'var(--pro)' : accent === 'perso' ? 'var(--perso)' : '#1F1F1F';
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, margin: '14px 2px 8px' }}>
      <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 700, fontSize: 22, color }}>
        {index ? `§${index}` : null}
      </span>
      <div style={{ display: 'inline-block' }}>
        <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1, color: '#1F1F1F' }}>{children}</div>
        <svg width="120" height="8" style={{ marginTop: -1 }}>
          <path d="M2 5 Q 30 1 60 5 T 118 4" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

// ─── Wobble underline ─────────────────────────────────────────
function Wobble({ width = 60, color = '#1F1F1F', style }) {
  return (
    <svg width={width} height="6" style={{ display: 'block', ...(style || {}) }}>
      <path d={`M2 3 Q ${width/4} 0 ${width/2} 3 T ${width-2} 3`} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ─── Label + value row ─────────────────────────────────────────
function KV({ label, value, sub, accent, big }) {
  const accentColor = accent === 'pro' ? 'var(--pro)' : accent === 'perso' ? 'var(--perso)' : null;
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '3px 0' }}>
      <div style={{ fontSize: 14, color: '#4a4a4a' }}>{label}</div>
      <div style={{ textAlign: 'right' }}>
        <div className="mono" style={{ fontSize: big ? 17 : 14, fontWeight: big ? 600 : 500, color: accentColor || '#1F1F1F' }}>{value}</div>
        {sub && <div style={{ fontSize: 11, color: '#8a8a8a', marginTop: -2 }}>{sub}</div>}
      </div>
    </div>
  );
}

// ─── Circular gauge (V1) ───────────────────────────────────────
function GaugeCircular({ value = 72, size = 130, label }) {
  const r = (size - 16) / 2;
  const cx = size / 2, cy = size / 2;
  const start = Math.PI * 0.75; // -135°
  const end = Math.PI * 0.25 + Math.PI; // 225° (i.e. 45° from right going up)
  // simpler: 3/4 arc from 135° to 45° (clockwise via bottom)
  const startAngle = 135; const endAngle = 45;
  const sweep = 270; // degrees
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const color = value >= 70 ? 'var(--safe)' : value >= 40 ? 'var(--watch)' : 'var(--risk)';
  function pt(angDeg) {
    const a = (angDeg * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }
  const a0 = startAngle, a1 = startAngle + sweep * pct;
  const aEnd = startAngle + sweep;
  const [x0, y0] = pt(a0);
  const [x1, y1] = pt(a1);
  const [xE, yE] = pt(aEnd);
  const largeBg = sweep > 180 ? 1 : 0;
  const largeFg = sweep * pct > 180 ? 1 : 0;
  return (
    <svg width={size} height={size}>
      <path d={`M ${x0} ${y0} A ${r} ${r} 0 ${largeBg} 1 ${xE} ${yE}`} stroke="#e1ddd0" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d={`M ${x0} ${y0} A ${r} ${r} 0 ${largeFg} 1 ${x1} ${y1}`} stroke={color} strokeWidth="10" fill="none" strokeLinecap="round" />
      <text x={cx} y={cy - 2} textAnchor="middle" fontSize="34" fontFamily="'Caveat', cursive" fontWeight="700" fill="#1F1F1F">{value}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize="11" fill="#6b6b6b">/100</text>
      {label && <text x={cx} y={cy + 36} textAnchor="middle" fontSize="11" fill="#6b6b6b">{label}</text>}
    </svg>
  );
}

// ─── Horizontal bar (V2) ───────────────────────────────────────
function GaugeBar({ value = 72, width = 280 }) {
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const color = value >= 70 ? 'var(--safe)' : value >= 40 ? 'var(--watch)' : 'var(--risk)';
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <div className="caveat" style={{ fontSize: 30, fontWeight: 700, lineHeight: 1 }}>{value}<span style={{ fontSize: 14, color: '#888' }}>/100</span></div>
        <div className="mono" style={{ fontSize: 11, color: color }}>{value >= 70 ? 'SAFE' : value >= 40 ? 'WATCH' : 'RISK'}</div>
      </div>
      <svg width={width} height="22">
        <rect x="1" y="6" width={width - 2} height="10" rx="5" fill="#f0ece0" stroke="#1F1F1F" strokeWidth="1" />
        {/* zone ticks */}
        <line x1={width * 0.4} y1="3" x2={width * 0.4} y2="19" stroke="#1F1F1F" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1={width * 0.7} y1="3" x2={width * 0.7} y2="19" stroke="#1F1F1F" strokeWidth="0.8" strokeDasharray="2 2" />
        <rect x="2" y="7" width={(width - 4) * pct} height="8" rx="4" fill={color} />
        {/* needle */}
        <path d={`M ${(width - 4) * pct + 2} 2 L ${(width - 4) * pct - 2} 6 L ${(width - 4) * pct + 6} 6 Z`} fill="#1F1F1F" />
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2, fontSize: 10, color: '#888' }}>
        <span>risk</span><span style={{ marginLeft: width * 0.4 - 40 }}>watch</span><span style={{ marginLeft: 'auto' }}>safe</span>
      </div>
    </div>
  );
}

// ─── Split donut (V3) ──────────────────────────────────────────
function GaugeSplit({ value = 72, pro = 78, perso = 66, size = 130 }) {
  const r = (size - 18) / 2;
  const cx = size / 2, cy = size / 2;
  function arc(startDeg, endDeg, color, stroke = 9) {
    const a0 = (startDeg * Math.PI) / 180;
    const a1 = (endDeg * Math.PI) / 180;
    const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
    const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0;
    return <path d={`M ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1}`} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" />;
  }
  // PRO half: 180→360 (top-left semicircle going CW) — use 180 to 350
  const proPct = Math.max(0, Math.min(100, pro)) / 100;
  const persoPct = Math.max(0, Math.min(100, perso)) / 100;
  // top-left half: 180° to 360°  (i.e. left side); top-right half: 0° to 180°? Let me do top arcs
  // We'll do: PRO arc goes from 200° to 340°, PERSO arc goes from 20° to 160° (both top arcs split)
  // Simpler: PRO is left half (90→270 going CW via 180), PERSO is right half (270→90 via 0)
  return (
    <svg width={size} height={size}>
      {/* PRO background — left half */}
      {arc(90, 270, '#e1ddd0', 10)}
      {/* PRO fg */}
      {arc(90, 90 + 180 * proPct, 'var(--pro)', 10)}
      {/* PERSO background — right half */}
      {arc(270, 90 + 360, '#e1ddd0', 10)}
      {/* PERSO fg — from 270 going CW for 180*pct */}
      {arc(270, 270 + 180 * persoPct, 'var(--perso)', 10)}
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize="32" fontFamily="'Caveat', cursive" fontWeight="700" fill="#1F1F1F">{value}</text>
      <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#6b6b6b">/100</text>
      <text x={cx - r - 4} y={cy + r + 12} textAnchor="middle" fontSize="10" fill="var(--pro)" fontWeight="700">PRO</text>
      <text x={cx + r + 4} y={cy + r + 12} textAnchor="middle" fontSize="10" fill="var(--perso)" fontWeight="700">PERSO</text>
    </svg>
  );
}

// ─── Big radial dial (V4) ──────────────────────────────────────
function GaugeDial({ value = 72, size = 180 }) {
  const r = (size - 24) / 2;
  const cx = size / 2, cy = size / 2;
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const color = value >= 70 ? 'var(--safe)' : value >= 40 ? 'var(--watch)' : 'var(--risk)';
  // half-dial from 180° (left) through 270° (top) to 360°/0° (right): sweep 180°
  function pt(angDeg) {
    const a = (angDeg * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }
  const startA = 180, sweep = 180;
  const [xS, yS] = pt(startA);
  const [xE, yE] = pt(startA + sweep);
  const [xV, yV] = pt(startA + sweep * pct);
  return (
    <svg width={size} height={size * 0.66}>
      {/* tick marks */}
      {Array.from({ length: 21 }).map((_, i) => {
        const a = (startA + (sweep * i) / 20) * Math.PI / 180;
        const r0 = r + 2, r1 = i % 5 === 0 ? r - 10 : r - 4;
        const x0 = cx + r0 * Math.cos(a), y0 = cy + r0 * Math.sin(a);
        const x1 = cx + r1 * Math.cos(a), y1 = cy + r1 * Math.sin(a);
        return <line key={i} x1={x0} y1={y0} x2={x1} y2={y1} stroke="#bdb9ad" strokeWidth={i % 5 === 0 ? 1.4 : 0.8} />;
      })}
      {/* arc bg */}
      <path d={`M ${xS} ${yS} A ${r} ${r} 0 0 1 ${xE} ${yE}`} stroke="#e1ddd0" strokeWidth="6" fill="none" />
      <path d={`M ${xS} ${yS} A ${r} ${r} 0 0 1 ${xV} ${yV}`} stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* needle */}
      <line x1={cx} y1={cy} x2={xV} y2={yV} stroke="#1F1F1F" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="4" fill="#1F1F1F" />
      {/* labels */}
      <text x={xS - 4} y={yS + 14} textAnchor="middle" fontSize="10" fill="#888">0</text>
      <text x={cx} y={cy - r - 6} textAnchor="middle" fontSize="10" fill="#888">50</text>
      <text x={xE + 4} y={yE + 14} textAnchor="middle" fontSize="10" fill="#888">100</text>
      <text x={cx} y={cy + 30} textAnchor="middle" fontSize="42" fontFamily="'Caveat', cursive" fontWeight="700" fill="#1F1F1F">{value}</text>
    </svg>
  );
}

// ─── Sketchy progress bar ──────────────────────────────────────
function ProgressBar({ value = 50, color = '#1F1F1F', width = '100%', height = 8, label }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div style={{ width }}>
      <div style={{
        position: 'relative', height, borderRadius: height,
        border: '1px solid #1F1F1F', overflow: 'hidden', background: '#f0ece0',
      }}>
        <div style={{ width: pct + '%', height: '100%', background: color }} />
      </div>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6b6b6b', marginTop: 2 }}>
          <span>{label}</span><span className="mono">{pct}%</span>
        </div>
      )}
    </div>
  );
}

// ─── Placeholder image / chart ─────────────────────────────────
function Placeholder({ width = '100%', height = 80, label }) {
  return (
    <div style={{
      width, height,
      border: '1.2px dashed #b8b4a8',
      borderRadius: 8,
      background: 'repeating-linear-gradient(45deg, transparent 0 6px, rgba(0,0,0,0.025) 6px 8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, color: '#7a7770',
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      {label}
    </div>
  );
}

// ─── Annotation / margin note ──────────────────────────────────
function MarginNote({ children, color = '#c08a2e', side = 'right' }) {
  return (
    <div style={{
      fontFamily: "'Caveat', cursive",
      fontSize: 14,
      color,
      lineHeight: 1.1,
      textAlign: side === 'right' ? 'left' : 'right',
      opacity: 0.85,
    }}>{children}</div>
  );
}

// ─── Segmented control (sketchy) ───────────────────────────────
function Segmented({ items, value, onChange }) {
  return (
    <div style={{ display: 'flex', border: '1.4px solid #1F1F1F', borderRadius: 999, padding: 3, gap: 2, background: 'var(--paper)' }}>
      {items.map(it => {
        const on = it.id === value;
        const color = it.color || '#1F1F1F';
        return (
          <button key={it.id} onClick={() => onChange && onChange(it.id)} style={{
            flex: 1, padding: '5px 10px',
            border: 0,
            background: on ? color : 'transparent',
            color: on ? '#fff' : '#1F1F1F',
            borderRadius: 999,
            fontFamily: "'Patrick Hand', sans-serif",
            fontSize: 14,
            cursor: 'pointer',
          }}>{it.label}</button>
        );
      })}
    </div>
  );
}

// ─── Chip ──────────────────────────────────────────────────────
function Chip({ children, accent }) {
  const color = accent === 'pro' ? 'var(--pro)' : accent === 'perso' ? 'var(--perso)' : '#1F1F1F';
  return (
    <span style={{
      display: 'inline-block',
      border: `1.2px solid ${color}`,
      color,
      borderRadius: 999,
      padding: '1px 8px',
      fontSize: 11,
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: 0.5,
    }}>{children}</span>
  );
}

Object.assign(window, {
  PhoneFrame, BottomTabs, TabIcon, SketchCard, SectionHeader, Wobble, KV,
  GaugeCircular, GaugeBar, GaugeSplit, GaugeDial,
  ProgressBar, Placeholder, MarginNote, Segmented, Chip,
});
