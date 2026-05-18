/* Module screens — Comptes, Revenus, Dépenses, Objectifs, Insights, Pro */

// ─── Row item for lists ────────────────────────────────────────
function ListRow({ icon, label, sub, value, accent, right }) {
  const color = accent === 'pro' ? 'var(--pro)' : accent === 'perso' ? 'var(--perso)' : '#1F1F1F';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 2px', borderBottom: '1px dashed #d4d0c2' }}>
      {icon !== undefined && (
        <div style={{ width: 32, height: 32, borderRadius: 8, border: `1.2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Caveat', cursive", color, fontSize: 18, fontWeight: 700 }}>{icon}</div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: '#6b6b6b' }}>{sub}</div>}
      </div>
      <div style={{ textAlign: 'right' }}>
        {value && <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{value}</div>}
        {right && <div style={{ fontSize: 11, color: '#6b6b6b' }}>{right}</div>}
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px 6px' }}>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: '#7a7770', marginTop: 2 }}>{subtitle}</div>}
      </div>
      {action && (
        <button style={{
          padding: '4px 10px', border: '1.4px solid #1F1F1F', borderRadius: 999,
          background: 'var(--paper)', fontFamily: "'Patrick Hand', sans-serif", fontSize: 13, cursor: 'pointer'
        }}>+ {action}</button>
      )}
    </div>
  );
}

function StabilityChip({ level }) {
  const color = level === 'élevée' ? 'var(--safe)' : level === 'moyenne' ? 'var(--watch)' : 'var(--risk)';
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      border: `1.2px solid ${color}`, color,
      padding: '0px 6px', borderRadius: 999,
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 0.5,
    }}>● {level}</span>
  );
}

// ════════════════════════════════════════════════════════════════
// Comptes / actifs
// ════════════════════════════════════════════════════════════════
function ScreenComptes() {
  const total = 168540;
  return (
    <PhoneFrame label="comptes" tabSet="public">
      <PageHeader title="Comptes & actifs" subtitle="9 comptes · mis à jour il y a 2 j" action="ajouter" />

      <SketchCard style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Patrimoine brut</div>
        <div className="caveat" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1 }}>{fmtN(total)}</div>
        <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 2 }}>dettes — · net <span className="mono">{fmtN(total)}</span></div>
      </SketchCard>

      <div style={{ fontSize: 11, color: '#7a7770', fontWeight: 700, letterSpacing: 1, marginTop: 6, marginBottom: 2 }}>CASH</div>
      <ListRow icon="€" label="Compte courant" sub="Boursorama" value="11 240 €" />
      <ListRow icon="€" label="Livret A" sub="LBP" value="4 760 €" />

      <div style={{ fontSize: 11, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1, marginTop: 10, marginBottom: 2 }}>SOCIÉTÉ</div>
      <ListRow icon="□" label="Compte SASU" sub="Qonto · K. Bensaïd" value="42 800 €" accent="pro" right="brut" />
      <ListRow icon="↗" label="Invest. SASU" sub="IBKR" value="28 100 €" accent="pro" />

      <div style={{ fontSize: 11, color: 'var(--perso)', fontWeight: 700, letterSpacing: 1, marginTop: 10, marginBottom: 2 }}>INVESTISSEMENTS</div>
      <ListRow icon="◐" label="PEA" sub="Boursobank" value="4 336 €" accent="perso" right="+12% YTD" />
      <ListRow icon="◑" label="eToro" sub="ETF World" value="12 370 €" accent="perso" />
      <ListRow icon="◒" label="Revolut Trading" sub="" value="6 208 €" accent="perso" />

      <div style={{ fontSize: 11, color: '#7a7770', fontWeight: 700, letterSpacing: 1, marginTop: 10, marginBottom: 2 }}>IMMOBILIER</div>
      <ListRow icon="⌂" label="Appartement Tanger" sub="35 000 / 85 000 €" value="35 000 €" right="41% versé" />

      <div style={{ marginTop: 14, fontSize: 12, color: '#7a7770', textAlign: 'center', fontStyle: 'italic' }}>
        Glisse vers le bas pour rafraîchir
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// Revenus
// ════════════════════════════════════════════════════════════════
function ScreenRevenus() {
  const total = 11700 + 800;
  return (
    <PhoneFrame label="comptes" tabSet="public">
      <PageHeader title="Revenus" subtitle="par stabilité" action="source" />

      <SketchCard style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Revenu mensuel moyen</div>
        <div className="caveat" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1 }}>{fmtN(total)}</div>
        <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 2 }}>sur 3 derniers mois</div>
      </SketchCard>

      <div style={{ fontSize: 12, color: '#1F1F1F', fontWeight: 700, marginTop: 4, marginBottom: 6 }}>SOURCES</div>

      <SketchCard accent="pro" style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Mission freelance · Technip</div>
            <div style={{ fontSize: 11, color: '#6b6b6b' }}>650 €/jour · 18 j · jusqu'à mars 2027</div>
          </div>
          <div className="mono" style={{ fontSize: 15, fontWeight: 600 }}>11 700 €</div>
        </div>
        <div style={{ marginTop: 6 }}><StabilityChip level="moyenne" /></div>
      </SketchCard>

      <SketchCard style={{ marginBottom: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Side · cours en ligne</div>
            <div style={{ fontSize: 11, color: '#6b6b6b' }}>moyenne 12 mois</div>
          </div>
          <div className="mono" style={{ fontSize: 15, fontWeight: 600 }}>800 €</div>
        </div>
        <div style={{ marginTop: 6 }}><StabilityChip level="faible" /></div>
      </SketchCard>

      <SketchCard style={{ marginBottom: 8, opacity: 0.7 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#7a7770' }}>Dividendes SASU</div>
            <div style={{ fontSize: 11, color: '#6b6b6b' }}>annuel · estimé Q4 2026</div>
          </div>
          <div className="mono" style={{ fontSize: 15, fontWeight: 600, color: '#7a7770' }}>~12 950 €</div>
        </div>
        <div style={{ marginTop: 6 }}><StabilityChip level="variable" /></div>
      </SketchCard>

      <SketchCard style={{ marginTop: 10, borderStyle: 'dashed' }}>
        <div style={{ fontSize: 12, color: '#7a7770', textAlign: 'center', fontStyle: 'italic' }}>
          + ajouter une source (salaire · location · allocation…)
        </div>
      </SketchCard>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// Dépenses & runway
// ════════════════════════════════════════════════════════════════
function ScreenDepenses() {
  return (
    <PhoneFrame label="comptes" tabSet="public">
      <PageHeader title="Dépenses & runway" subtitle="le cœur de la sécurité" />

      {/* Hero — runway */}
      <SketchCard style={{ marginBottom: 10, textAlign: 'center', padding: '16px 14px' }}>
        <div style={{ fontSize: 12, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Si je perds mes revenus</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginTop: 4 }}>
          <div className="caveat" style={{ fontSize: 60, fontWeight: 700, lineHeight: 1, color: 'var(--safe)' }}>5,7</div>
          <div style={{ fontSize: 16, color: '#3a3a3a' }}>mois</div>
        </div>
        <div style={{ fontSize: 13, color: '#3a3a3a', marginTop: 4 }}>de cash perso disponible</div>
        <Wobble width={120} color="var(--safe)" style={{ margin: '8px auto 0' }} />
      </SketchCard>

      <div style={{ fontSize: 12, color: '#1F1F1F', fontWeight: 700, marginBottom: 6 }}>DÉPENSES MENSUELLES</div>
      <ListRow icon="⌂" label="Loyer" sub="appart Paris 11e" value="1 200 €" />
      <ListRow icon="◐" label="Charges fixes" sub="énergie · télécom · abos" value="380 €" />
      <ListRow icon="○" label="Alimentation" sub="moyenne 6 mois" value="520 €" />
      <ListRow icon="◇" label="Transport" sub="navigo + uber" value="180 €" />
      <ListRow icon="◢" label="Loisirs & variable" sub="moyenne" value="520 €" />

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, padding: '8px 2px', borderTop: '1.4px solid #1F1F1F' }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Total</div>
        <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>2 800 €</div>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: '#6b6b6b', fontStyle: 'italic' }}>
        Cible runway : <b>6 mois</b> · tu y es presque. Maintenir cash &gt; <span className="mono">16 800 €</span>.
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// Objectifs
// ════════════════════════════════════════════════════════════════
function ScreenObjectifs() {
  const goals = [
    { id: 1, label: 'Solder appartement Tanger', sub: 'cible · déc. 2027', pct: 41, current: 35000, target: 85000, priority: 'haute' },
    { id: 2, label: 'Sécurité perso 6 mois', sub: 'cible · juin 2026', pct: 95, current: 16000, target: 16800, priority: 'haute' },
    { id: 3, label: '100k€ ETF', sub: 'cible · 2030', pct: 23, current: 22914, target: 100000, priority: 'moyenne' },
    { id: 4, label: '500 €/mois passifs', sub: 'cible · 2032', pct: 8, current: 41, target: 500, priority: 'basse', unit: '€/mois' },
  ];

  return (
    <PhoneFrame label="objectifs" tabSet="public">
      <PageHeader title="Objectifs" subtitle="4 actifs · 1 en retard" action="objectif" />

      {goals.map(g => (
        <SketchCard key={g.id} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{g.label}</div>
              <div style={{ fontSize: 11, color: '#6b6b6b' }}>{g.sub}</div>
            </div>
            <div className="caveat" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{g.pct}%</div>
          </div>
          <div style={{ marginTop: 6 }}>
            <ProgressBar value={g.pct} color={g.pct > 80 ? 'var(--safe)' : g.pct > 30 ? '#1F1F1F' : 'var(--watch)'} height={9} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: '#6b6b6b' }}>
            <span className="mono">{(g.current).toLocaleString('fr-FR')} {g.unit || '€'}</span>
            <span className="mono">/ {(g.target).toLocaleString('fr-FR')} {g.unit || '€'}</span>
          </div>
        </SketchCard>
      ))}

      <SketchCard style={{ marginTop: 6, borderStyle: 'dashed' }}>
        <div style={{ fontSize: 12, color: '#7a7770', textAlign: 'center', fontStyle: 'italic' }}>
          + créer un objectif
        </div>
      </SketchCard>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// Insights
// ════════════════════════════════════════════════════════════════
function ScreenInsights() {
  return (
    <PhoneFrame label="comptes" tabSet="public">
      <PageHeader title="Insights" subtitle="3 nouvelles · 1 alerte" />

      <SketchCard style={{ marginBottom: 10, borderColor: 'var(--watch)', borderWidth: 1.6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--watch)' }} />
          <div style={{ fontSize: 11, color: 'var(--watch)', fontWeight: 700, letterSpacing: 1 }}>ALERTE · MISSION</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 10, color: '#7a7770' }}>il y a 2 j</div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.4 }}>
          Ta mission se termine dans <b>10 mois</b>. Sans nouveau contrat, ton runway société tombera à <b>6 mois</b>.
        </div>
        <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--pro)' }}>→ Simuler</span>
          <span style={{ fontSize: 12, color: '#7a7770' }}>· Ignorer</span>
        </div>
      </SketchCard>

      <SketchCard style={{ marginBottom: 10, borderColor: 'var(--safe)', borderWidth: 1.6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--safe)' }} />
          <div style={{ fontSize: 11, color: 'var(--safe)', fontWeight: 700, letterSpacing: 1 }}>OPPORTUNITÉ</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 10, color: '#7a7770' }}>il y a 5 j</div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.4 }}>
          Tu pourrais sortir <b>~35 000 €</b> de dividende net sans passer sous ton seuil de sécurité SASU.
        </div>
        <div style={{ marginTop: 6, fontSize: 12, color: 'var(--pro)' }}>→ Simuler le dividende</div>
      </SketchCard>

      <SketchCard style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1F1F1F' }} />
          <div style={{ fontSize: 11, color: '#1F1F1F', fontWeight: 700, letterSpacing: 1 }}>HABITUDE</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 10, color: '#7a7770' }}>auto</div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.4 }}>
          Ton DCA est de <b>24 %</b> du revenu — au-dessus de la médiane (15 %) mais reste soutenable.
        </div>
      </SketchCard>

      <SketchCard style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1F1F1F' }} />
          <div style={{ fontSize: 11, color: '#1F1F1F', fontWeight: 700, letterSpacing: 1 }}>OBJECTIF</div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 10, color: '#7a7770' }}>hier</div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.4 }}>
          Tu as franchi <b>40 %</b> sur Tanger. Au rythme actuel, livraison validée pour Q3 2027.
        </div>
      </SketchCard>
    </PhoneFrame>
  );
}

Object.assign(window, { ListRow, PageHeader, StabilityChip, ScreenComptes, ScreenRevenus, ScreenDepenses, ScreenObjectifs, ScreenInsights });
