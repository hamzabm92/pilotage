/* ui.jsx — design system components for Pilotage */

const C = {
  paper: '#FAF8F1',
  ink: '#1F1F1F',
  inkSoft: '#6b6b6b',
  inkFaint: '#c9c6bd',
  pro: '#2563EB',
  perso: '#7C3AED',
  safe: '#1F9D55',
  watch: '#F59E0B',
  risk: '#DC2626',
};

function toneColor(tone) {
  if (tone === 'safe') return C.safe;
  if (tone === 'watch') return C.watch;
  if (tone === 'risk') return C.risk;
  if (tone === 'pro') return C.pro;
  if (tone === 'perso') return C.perso;
  return C.ink;
}

function accentColor(accent) {
  if (accent === 'pro') return C.pro;
  if (accent === 'perso') return C.perso;
  return C.ink;
}

// ─── Card ───────────────────────────────────────────────────────
function Card({ children, accent, accentSide = 'left', style, dashed, onClick }) {
  const border = dashed ? `1.4px dashed ${C.ink}` : `1.4px solid ${C.ink}`;
  const ac = accentColor(accent);
  return (
    <div onClick={onClick} style={{
      position: 'relative',
      border,
      borderRadius: 12,
      padding: '12px 14px',
      background: C.paper,
      boxShadow: '2px 2px 0 0 rgba(31,31,31,0.06)',
      cursor: onClick ? 'pointer' : undefined,
      ...(style || {}),
    }}>
      {accent && accentSide === 'left' && (
        <div style={{ position: 'absolute', left: -1.5, top: -1.5, bottom: -1.5, width: 5, background: ac, borderRadius: '12px 0 0 12px' }} />
      )}
      {accent && accentSide === 'top' && (
        <div style={{ position: 'absolute', top: -1.5, left: -1.5, right: -1.5, height: 5, background: ac, borderRadius: '12px 12px 0 0' }} />
      )}
      {children}
    </div>
  );
}

// ─── Btn ────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', accent, onClick, style, small, disabled }) {
  const ac = accent ? accentColor(accent) : C.ink;
  const base = {
    display: 'block',
    width: '100%',
    padding: small ? '7px 12px' : '12px 14px',
    border: `1.4px solid ${ac}`,
    borderRadius: 12,
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: small ? 14 : 16,
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all .15s',
    textAlign: 'center',
  };
  if (variant === 'primary') {
    return <button onClick={disabled ? undefined : onClick} style={{ ...base, background: ac, color: '#fff', boxShadow: '2px 2px 0 0 rgba(31,31,31,0.12)', ...(style || {}) }}>{children}</button>;
  }
  if (variant === 'secondary') {
    return <button onClick={disabled ? undefined : onClick} style={{ ...base, background: 'transparent', color: ac, ...(style || {}) }}>{children}</button>;
  }
  // ghost
  return <button onClick={disabled ? undefined : onClick} style={{ ...base, background: 'transparent', border: 'none', color: ac, padding: small ? '4px 8px' : '8px 12px', width: 'auto', ...(style || {}) }}>{children}</button>;
}

// ─── Input ──────────────────────────────────────────────────────
function Input({ label, value, onChange, placeholder, suffix, type = 'text' }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 3, fontWeight: 500 }}>{label}</div>}
      <div style={{ display: 'flex', alignItems: 'center', border: `1.4px solid ${C.ink}`, borderRadius: 8, padding: '8px 10px', background: C.paper, gap: 6 }}>
        <input
          type={type}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 15,
            color: C.ink,
            outline: 'none',
          }}
        />
        {suffix && <div style={{ color: C.inkSoft, fontSize: 13, whiteSpace: 'nowrap' }}>{suffix}</div>}
      </div>
    </div>
  );
}

// ─── Select ─────────────────────────────────────────────────────
function Select({ label, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 3, fontWeight: 500 }}>{label}</div>}
      <div style={{ border: `1.4px solid ${C.ink}`, borderRadius: 8, overflow: 'hidden', background: C.paper }}>
        <select
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px',
            border: 'none',
            background: 'transparent',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 15,
            color: C.ink,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ─── ProgressBar ────────────────────────────────────────────────
function ProgressBar({ value = 0, color = C.ink, height = 8, label }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div style={{
        position: 'relative', height, borderRadius: height,
        border: `1px solid ${C.ink}`, overflow: 'hidden', background: '#f0ece0',
      }}>
        <div style={{ width: pct + '%', height: '100%', background: color, transition: 'width .3s' }} />
      </div>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: C.inkSoft, marginTop: 2 }}>
          <span>{label}</span><span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{Math.round(pct)}%</span>
        </div>
      )}
    </div>
  );
}

// ─── GaugeCircular ──────────────────────────────────────────────
function GaugeCircular({ value = 0, size = 120 }) {
  const r = (size - 16) / 2;
  const cx = size / 2, cy = size / 2;
  const startAngle = 135, sweep = 270;
  const pct = Math.max(0, Math.min(100, value)) / 100;
  const color = value >= 70 ? C.safe : value >= 40 ? C.watch : C.risk;

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
      {pct > 0 && <path d={`M ${x0} ${y0} A ${r} ${r} 0 ${largeFg} 1 ${x1} ${y1}`} stroke={color} strokeWidth="10" fill="none" strokeLinecap="round" />}
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize={size * 0.28} fontFamily="Caveat, cursive" fontWeight="700" fill={C.ink}>{value}</text>
      <text x={cx} y={cy + size * 0.16} textAnchor="middle" fontSize={size * 0.09} fill={C.inkSoft}>/100</text>
    </svg>
  );
}

// ─── SectionHdr ─────────────────────────────────────────────────
function SectionHdr({ children, action, accent }) {
  const color = accentColor(accent);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '14px 0 8px' }}>
      <div style={{ display: 'inline-block' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{children}</div>
        <svg width="100" height="6" style={{ marginTop: -1 }}>
          <path d="M2 4 Q 25 1 50 4 T 98 3" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </div>
      {action}
    </div>
  );
}

// ─── Badge ──────────────────────────────────────────────────────
function Badge({ children, tone, accent }) {
  const color = tone ? toneColor(tone) : accent ? accentColor(accent) : C.ink;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      border: `1.2px solid ${color}`, color,
      padding: '1px 7px', borderRadius: 999,
      fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: 0.5,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
      {children}
    </span>
  );
}

// ─── ListItem ───────────────────────────────────────────────────
function ListItem({ icon, label, sub, value, right, accent, onDelete, onClick }) {
  const color = accent ? accentColor(accent) : C.ink;
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 2px', borderBottom: `1px dashed ${C.inkFaint}`,
      cursor: onClick ? 'pointer' : undefined,
    }}>
      {icon !== undefined && (
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          border: `1.2px solid ${color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color, fontSize: 16, fontWeight: 700, flexShrink: 0,
          fontFamily: 'Caveat, cursive',
        }}>{icon}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: C.inkSoft }}>{sub}</div>}
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        {value && <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: C.ink }}>{value}</div>}
        {right && <div style={{ fontSize: 11, color: C.inkSoft }}>{right}</div>}
      </div>
      {onDelete && (
        <button onClick={e => { e.stopPropagation(); onDelete(); }} style={{
          border: 'none', background: 'transparent', color: C.inkSoft,
          fontSize: 16, cursor: 'pointer', padding: '0 4px', flexShrink: 0,
        }}>×</button>
      )}
    </div>
  );
}

// ─── StepDots ───────────────────────────────────────────────────
function StepDots({ step, total }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '8px 0' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i + 1 === step ? 22 : 8, height: 6,
          borderRadius: 4,
          background: i + 1 === step ? C.ink : i + 1 < step ? C.inkSoft : C.inkFaint,
          transition: 'all .2s',
        }} />
      ))}
    </div>
  );
}

// ─── ChoiceCard ─────────────────────────────────────────────────
function ChoiceCard({ children, sub, emoji, selected, accent, onClick }) {
  const color = accent ? accentColor(accent) : C.ink;
  return (
    <div onClick={onClick} style={{
      border: selected ? `2px solid ${color}` : `1.4px solid ${C.ink}`,
      borderRadius: 12,
      padding: '10px 12px',
      background: C.paper,
      boxShadow: selected ? '3px 3px 0 0 rgba(31,31,31,0.12)' : '2px 2px 0 0 rgba(31,31,31,0.06)',
      display: 'flex', gap: 10, alignItems: 'center',
      cursor: 'pointer',
    }}>
      {emoji && <div style={{ fontSize: 20, opacity: 0.85, fontFamily: 'Caveat, cursive', flexShrink: 0 }}>{emoji}</div>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{children}</div>
        {sub && <div style={{ fontSize: 11, color: C.inkSoft }}>{sub}</div>}
      </div>
      <div style={{
        width: 18, height: 18, borderRadius: 4,
        border: `1.4px solid ${selected ? color : C.ink}`,
        background: selected ? color : 'transparent',
        position: 'relative', flexShrink: 0,
      }}>
        {selected && (
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: 'absolute', top: 1, left: 1 }}>
            <path d="M2 7 L 6 11 L 12 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

// ─── SliderRow ──────────────────────────────────────────────────
function SliderRow({ label, value, onChange, min, max, step = 1, unit = '', color = C.ink }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
        <div style={{ fontSize: 13, color: '#3a3a3a' }}>{label}</div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 600, color }}>{value.toLocaleString('fr-FR')}{unit}</div>
      </div>
      <div style={{ position: 'relative', height: 22 }}>
        <div style={{ position: 'absolute', top: 9, left: 0, right: 0, height: 4, background: '#e6e2d4', borderRadius: 2, border: `0.8px solid ${C.ink}` }} />
        <div style={{ position: 'absolute', top: 9, left: 0, width: pct + '%', height: 4, background: color, borderRadius: 2 }} />
        <input
          type="range"
          min={min} max={max} step={step}
          value={value}
          onChange={e => onChange && onChange(Number(e.target.value))}
          style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', cursor: 'pointer' }}
        />
        <div style={{
          position: 'absolute', top: 5, left: `calc(${pct}% - 7px)`,
          width: 14, height: 14, borderRadius: '50%',
          background: '#fff', border: `1.6px solid ${color}`,
          boxShadow: '1px 1px 0 0 rgba(31,31,31,0.12)',
          pointerEvents: 'none',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.inkSoft, marginTop: 2 }}>
        <span>{min.toLocaleString('fr-FR')}{unit}</span>
        <span>{max.toLocaleString('fr-FR')}{unit}</span>
      </div>
    </div>
  );
}

// ─── Verdict ────────────────────────────────────────────────────
function Verdict({ tone, title, children }) {
  const color = toneColor(tone);
  return (
    <div style={{ border: `1.6px solid ${color}`, borderRadius: 12, padding: '12px 14px', background: C.paper, marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
        <div style={{ fontSize: 11, color, fontWeight: 700, letterSpacing: 1 }}>{title}</div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.45, color: '#2a2a2a' }}>{children}</div>
    </div>
  );
}

// ─── CountryChip ────────────────────────────────────────────────
function CountryChip({ regime, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 9px', borderRadius: 999,
      border: active ? `1.6px solid ${C.ink}` : `1.2px solid ${C.inkFaint}`,
      background: active ? C.ink : C.paper,
      color: active ? '#fff' : C.ink,
      fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12,
      cursor: 'pointer', whiteSpace: 'nowrap',
      boxShadow: active ? '2px 2px 0 0 rgba(31,31,31,0.12)' : 'none',
    }}>
      <span style={{ fontSize: 14 }}>{regime.flag}</span>
      {regime.name}
    </button>
  );
}

// ─── PageShell ──────────────────────────────────────────────────
function PageShell({ title, subtitle, action, children, style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', ...(style || {}) }}>
      <div style={{
        padding: '16px 18px 10px',
        borderBottom: `1px solid ${C.inkFaint}`,
        background: C.paper,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, color: C.ink }}>{title}</div>
            {subtitle && <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 3 }}>{subtitle}</div>}
          </div>
          {action}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 90px' }}>
        {children}
      </div>
    </div>
  );
}

// ─── BottomTabs ─────────────────────────────────────────────────
function BottomTabs({ active, onTab }) {
  const tabs = [
    { id: 'cockpit', label: 'Cockpit', icon: 'home' },
    { id: 'comptes', label: 'Comptes', icon: 'wallet' },
    { id: 'scenarios', label: 'Scénarios', icon: 'sliders' },
    { id: 'objectifs', label: 'Objectifs', icon: 'target' },
  ];

  function Icon({ kind, color, on }) {
    const sw = on ? 2 : 1.5;
    if (kind === 'home') return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11L12 4L21 11V20H14V14H10V20H3Z" />
      </svg>
    );
    if (kind === 'wallet') return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10H21" />
        <circle cx="16.5" cy="14.5" r="1.2" />
      </svg>
    );
    if (kind === 'sliders') return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7H20" />
        <circle cx="9" cy="7" r="2.2" fill={C.paper} />
        <path d="M4 17H20" />
        <circle cx="15" cy="17" r="2.2" fill={C.paper} />
      </svg>
    );
    if (kind === 'target') return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="1.2" fill={color} stroke="none" />
      </svg>
    );
    return null;
  }

  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      height: 72, borderTop: `1.2px solid ${C.ink}`,
      background: C.paper,
      display: 'flex',
      zIndex: 100,
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        const color = on ? C.ink : '#9a9a9a';
        return (
          <button key={t.id} onClick={() => onTab && onTab(t.id)} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 3,
            color,
            fontWeight: on ? 700 : 400,
            border: 'none', background: 'transparent',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 11,
            cursor: 'pointer',
            position: 'relative',
          }}>
            <Icon kind={t.icon} color={color} on={on} />
            <div>{t.label}</div>
            {on && (
              <svg width="32" height="5" style={{ position: 'absolute', bottom: 6 }}>
                <path d="M2 3 Q 16 1 30 3" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Sheet (bottom sheet modal) ──────────────────────────────────
function Sheet({ title, onClose, children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      zIndex: 200,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{
        position: 'relative',
        background: C.paper,
        borderRadius: '20px 20px 0 0',
        padding: '0 18px 32px',
        maxHeight: '90vh',
        overflowY: 'auto',
        border: `1.4px solid ${C.ink}`,
        borderBottom: 'none',
        zIndex: 1,
        maxWidth: 430,
        width: '100%',
        alignSelf: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0 14px' }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>{title}</div>
          <button onClick={onClose} style={{
            border: 'none', background: 'transparent',
            fontSize: 22, color: C.inkSoft, cursor: 'pointer', lineHeight: 1,
          }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─── BackBar ────────────────────────────────────────────────────
function BackBar({ title, subtitle, onBack, accent }) {
  const color = accent ? accentColor(accent) : C.ink;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 18px 10px', borderBottom: `1px solid ${C.inkFaint}` }}>
      <button onClick={onBack} style={{
        border: 'none', background: 'transparent',
        fontSize: 20, color: C.inkSoft, cursor: 'pointer',
        padding: 0, lineHeight: 1,
      }}>←</button>
      <div>
        {subtitle && <div style={{ fontSize: 11, color, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 700 }}>{subtitle}</div>}
        <div style={{ fontSize: 18, fontWeight: 700, color: C.ink, lineHeight: 1 }}>{title}</div>
      </div>
    </div>
  );
}

// ─── Empty ──────────────────────────────────────────────────────
function Empty({ icon = '◻', label, action, onAction }) {
  return (
    <div style={{ textAlign: 'center', padding: '32px 0', color: C.inkSoft }}>
      <div style={{ fontSize: 40, marginBottom: 10, fontFamily: 'Caveat, cursive' }}>{icon}</div>
      <div style={{ fontSize: 14, marginBottom: 12 }}>{label}</div>
      {action && (
        <button onClick={onAction} style={{
          border: `1.4px dashed ${C.inkFaint}`, borderRadius: 10,
          padding: '8px 16px', background: 'transparent',
          fontFamily: 'Inter, system-ui, sans-serif', fontSize: 13,
          color: C.inkSoft, cursor: 'pointer',
        }}>{action}</button>
      )}
    </div>
  );
}

Object.assign(window, {
  C, toneColor, accentColor,
  Card, Btn, Input, Select, ProgressBar, GaugeCircular,
  SectionHdr, Badge, ListItem, StepDots, ChoiceCard,
  SliderRow, Verdict, CountryChip,
  PageShell, BottomTabs, Sheet, BackBar, Empty,
});
