/* V1 MVP scope card — what we ship */

function V1Scope() {
  const buckets = [
    {
      title: 'Compte & onboarding',
      color: '#1F1F1F',
      items: [
        { label: 'Création de compte (email · pays · devise)', done: true },
        { label: 'Onboarding 6 étapes', done: true },
        { label: 'Sélection du profil', done: true },
      ],
    },
    {
      title: 'Saisie & données',
      color: '#1F1F1F',
      items: [
        { label: 'Ajout manuel des comptes', done: true },
        { label: 'Ajout des revenus (sources + stabilité)', done: true },
        { label: 'Ajout des dépenses mensuelles', done: true },
        { label: 'Ajout des objectifs', done: true },
      ],
    },
    {
      title: 'Cockpit & calculs',
      color: '#1F1F1F',
      items: [
        { label: 'Dashboard personnalisé par profil', done: true },
        { label: 'Calcul du runway perso (et pro si société)', done: true },
        { label: 'Calcul du DCA total mensuel', done: true },
      ],
    },
    {
      title: 'Scénarios (le différenciateur)',
      color: '#1F1F1F',
      items: [
        { label: '« Et si je perds ma mission ? »', done: true },
        { label: '« Puis-je acheter ce bien ? »', done: true },
        { label: '« Combien sortir en dividende ? » — pays-aware', done: true, badge: '8 pays' },
      ],
    },
  ];

  const outOfScope = [
    'Connexion bancaire automatique',
    'IA conversationnelle / coach',
    '50+ graphiques avancés',
    'Backtests historiques',
    'Multi-utilisateur · couples',
    'Suivi des transactions au détail',
  ];

  return (
    <div style={{
      width: 720, height: 720, padding: 28,
      background: 'var(--paper)',
      border: '1.4px solid #1F1F1F', borderRadius: 16,
      fontFamily: "'Patrick Hand', sans-serif",
      overflow: 'auto',
      boxShadow: '3px 3px 0 0 rgba(31,31,31,0.06)',
      position: 'relative',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Pilotage · MVP</div>
          <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 36, margin: '4px 0 0', lineHeight: 1 }}>V1 — scope</h2>
        </div>
        <div style={{
          padding: '6px 12px', border: '1.6px solid #1F1F1F', borderRadius: 999,
          background: '#1F1F1F', color: '#fff', fontSize: 13,
          boxShadow: '2px 2px 0 0 rgba(31,31,31,0.12)',
        }}>
          ◐ wireframes couverts
        </div>
      </div>

      <div style={{ fontSize: 14, color: '#3a3a3a', marginTop: 10, lineHeight: 1.45, maxWidth: 580 }}>
        Une seule question : <b>« Est-ce que ma trajectoire est saine ou fragile ? »</b>
        Tout le reste vient après.
      </div>

      <Wobble width={120} style={{ marginTop: 8, marginBottom: 16 }} />

      {/* Buckets grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {buckets.map((b, i) => (
          <div key={i} style={{
            border: '1.4px solid #1F1F1F', borderRadius: 12,
            padding: '10px 12px', background: 'var(--paper)',
            boxShadow: '2px 2px 0 0 rgba(31,31,31,0.06)',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: b.color, marginBottom: 6, textTransform: 'uppercase' }}>{b.title}</div>
            {b.items.map((it, j) => (
              <div key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '3px 0', fontSize: 13, lineHeight: 1.3 }}>
                <div style={{
                  width: 14, height: 14, marginTop: 2, flexShrink: 0,
                  border: '1.4px solid #1F1F1F', borderRadius: 3,
                  background: it.done ? '#1F1F1F' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {it.done && (
                    <svg width="10" height="10" viewBox="0 0 14 14">
                      <path d="M2 7 L 6 11 L 12 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <div style={{ flex: 1, color: '#2a2a2a' }}>{it.label}</div>
                {it.badge && (
                  <span style={{
                    fontSize: 10, padding: '0px 6px', borderRadius: 999,
                    border: '1.2px solid var(--pro)', color: 'var(--pro)',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>{it.badge}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Out of scope */}
      <div style={{
        marginTop: 14, padding: '10px 12px',
        border: '1.4px dashed #b8b4a8', borderRadius: 12,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#7a7770', marginBottom: 4 }}>
          ✗ HORS PÉRIMÈTRE V1
        </div>
        <div style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.5 }}>
          {outOfScope.map((it, i) => (
            <span key={i}>
              <span style={{ textDecoration: 'line-through', textDecorationThickness: 1 }}>{it}</span>
              {i < outOfScope.length - 1 && <span style={{ margin: '0 8px', color: '#bdb9ad' }}>·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div style={{ marginTop: 14, fontSize: 12, color: '#6b6b6b', fontStyle: 'italic', lineHeight: 1.45 }}>
        Pas de connexion bancaire au début · pas d'IA avancée · pas de 50 graphiques.
        La saisie manuelle propre + les bons calculs suffisent pour répondre à la question centrale.
      </div>

      <div style={{ position: 'absolute', right: 22, bottom: 16, fontFamily: "'Caveat', cursive", color: '#c08a2e', fontSize: 18, transform: 'rotate(-3deg)' }}>
        MVP · à shipper
      </div>
    </div>
  );
}

Object.assign(window, { V1Scope });
