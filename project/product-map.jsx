/* Product map — info architecture overview for the public app */

function ProductMap() {
  return (
    <div style={{
      width: 760, height: 760, padding: 24,
      background: 'var(--paper)',
      border: '1.4px solid #1F1F1F', borderRadius: 16,
      fontFamily: "'Patrick Hand', sans-serif",
      overflow: 'hidden',
      boxShadow: '3px 3px 0 0 rgba(31,31,31,0.06)',
      position: 'relative',
    }}>
      <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Pilotage · architecture v0.2</div>
      <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 34, margin: '4px 0 16px' }}>
        Le cockpit financier <span style={{ color: '#7a7770' }}>— vue d'ensemble</span>
      </h2>

      {/* Onboarding row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <div style={{ fontSize: 12, color: '#7a7770', fontWeight: 700, letterSpacing: 1, width: 100 }}>ONBOARDING</div>
        {['Welcome', 'Profil', 'Comptes', 'Objectif', 'Chiffres', 'Insight'].map((s, i) => (
          <React.Fragment key={s}>
            <div style={{ flex: 1, padding: '6px 8px', border: '1.2px solid #1F1F1F', borderRadius: 8, fontSize: 12, textAlign: 'center', background: '#fff' }}>{s}</div>
            {i < 5 && <div style={{ color: '#7a7770' }}>→</div>}
          </React.Fragment>
        ))}
      </div>

      {/* Main app — central Cockpit with spokes */}
      <div style={{ position: 'relative', height: 380, marginBottom: 12 }}>
        {/* Central node */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: 160, height: 160, borderRadius: '50%',
          border: '2px solid #1F1F1F', background: 'var(--paper)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxShadow: '3px 3px 0 0 rgba(31,31,31,0.12)',
        }}>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="14" fill="none" stroke="#1F1F1F" strokeWidth="1.5" />
            <path d="M6 18 Q 18 8 30 18" stroke="var(--pro)" strokeWidth="1.5" fill="none" />
            <path d="M6 18 Q 18 28 30 18" stroke="var(--perso)" strokeWidth="1.5" fill="none" />
            <circle cx="18" cy="18" r="2" fill="#1F1F1F" />
          </svg>
          <div className="caveat" style={{ fontSize: 26, fontWeight: 700, marginTop: 4 }}>Cockpit</div>
          <div style={{ fontSize: 10, color: '#6b6b6b' }}>dashboard universel</div>
        </div>

        {/* Spoke nodes (6) — positioned around */}
        {[
          { label: 'Comptes', sub: 'actifs', x: 12, y: 8, accent: null },
          { label: 'Revenus', sub: 'stabilité', x: 86, y: 8, accent: null },
          { label: 'Dépenses', sub: 'runway', x: 0, y: 50, accent: null },
          { label: 'Pro · SASU', sub: 'optionnel', x: 90, y: 50, accent: 'pro' },
          { label: 'Objectifs', sub: 'progression', x: 12, y: 88, accent: null },
          { label: 'Insights', sub: 'recos', x: 86, y: 88, accent: null },
        ].map((n, i) => {
          const color = n.accent === 'pro' ? 'var(--pro)' : '#1F1F1F';
          return (
            <div key={i} style={{
              position: 'absolute', left: n.x + '%', top: n.y + '%',
              transform: 'translate(-50%, -50%)',
              padding: '6px 12px',
              border: `1.4px solid ${color}`,
              borderRadius: 10,
              background: 'var(--paper)',
              textAlign: 'center', minWidth: 90,
              boxShadow: '2px 2px 0 0 rgba(31,31,31,0.08)',
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color }}>{n.label}</div>
              <div style={{ fontSize: 10, color: '#6b6b6b' }}>{n.sub}</div>
            </div>
          );
        })}

        {/* Scénarios — special node, larger, beneath Cockpit */}
        <div style={{
          position: 'absolute', left: '50%', top: '88%', transform: 'translate(-50%, -50%)',
          padding: '8px 14px', border: '1.8px solid #1F1F1F', borderRadius: 12,
          background: '#1F1F1F', color: '#fff',
          boxShadow: '3px 3px 0 0 rgba(31,31,31,0.15)',
        }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Scénarios</div>
          <div style={{ fontSize: 10, opacity: 0.7 }}>simulateur — différenciateur</div>
        </div>

        {/* Connecting lines — center to each */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* center is 50%, 50% */}
          {[
            [12, 8], [86, 8], [0, 50], [90, 50], [12, 88], [86, 88], [50, 88],
          ].map(([x, y], i) => (
            <line key={i} x1="50%" y1="50%" x2={x + '%'} y2={y + '%'} stroke="#bdb9ad" strokeWidth="1" strokeDasharray="3 3" />
          ))}
        </svg>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        <div style={{ fontSize: 12, color: '#6b6b6b', maxWidth: 360, lineHeight: 1.45 }}>
          <b>Architecture modulaire.</b> Les modules s'activent selon le profil : un salarié n'a pas Pro,
          un freelance société active tout. Le cockpit recompose son layout en conséquence.
        </div>
        <div style={{ fontSize: 12, color: '#6b6b6b', maxWidth: 320, lineHeight: 1.45, textAlign: 'right' }}>
          <b>Scénarios = cœur produit.</b> Chaque module produit des données, le simulateur les combine
          pour répondre à <i>« est-ce que je peux ? »</i>.
        </div>
      </div>

      <div style={{ position: 'absolute', right: 18, bottom: 14, fontFamily: "'Caveat', cursive", color: '#c08a2e', fontSize: 18, transform: 'rotate(-3deg)' }}>
        v0.2 · public app
      </div>
    </div>
  );
}

Object.assign(window, { ProductMap });
