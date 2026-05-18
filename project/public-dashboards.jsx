/* Universal dashboard — adapts to user profile */

// Three profile data sets
const PROFILES = {
  salarie: {
    name: 'Léa', profile: 'Salariée · CDI',
    netWorth: 84500, runwayPerso: 9, runwayPro: null,
    dca: 600, dcaPctRevenu: 18,
    revenu: 3300, depenses: 1700,
    objectif: { label: 'Apport appartement', target: 45000, current: 18500, pct: 41 },
    insight: 'Situation saine. Ton cash couvre 9 mois et ton DCA est soutenable. Tu pourrais accélérer vers l\'apport.',
    insightTone: 'safe',
    breakdown: { cash: 22000, etf: 18500, av: 9000, immo: 0, perso: 49500, pro: 0 },
    score: 78,
  },
  societe: {
    name: 'Karim', profile: 'Freelance · SASU',
    netWorth: 168540, runwayPerso: 6, runwayPro: 14,
    dca: 1550, dcaPctRevenu: 24,
    revenu: 6500, depenses: 2800,
    objectif: { label: 'Solder appartement Tanger', target: 85000, current: 35000, pct: 41 },
    insight: 'Situation saine, mais mission à surveiller après mars 2027. Cash libre SASU : 35 k€.',
    insightTone: 'safe',
    breakdown: { cash: 16000, etf: 22914, av: 0, immo: 35000, perso: 73914, pro: 70900 },
    score: 72,
  },
  mixte: {
    name: 'Sofiane', profile: 'Salarié + side missions',
    netWorth: 124200, runwayPerso: 11, runwayPro: 4,
    dca: 900, dcaPctRevenu: 16,
    revenu: 5800, depenses: 2400,
    objectif: { label: 'Liberté 500 €/mois passifs', target: 150000, current: 42000, pct: 28 },
    insight: 'Côté perso solide. Attention : ton activité side ne couvre que 4 mois — diversifie tes clients.',
    insightTone: 'watch',
    breakdown: { cash: 28000, etf: 32000, av: 14000, immo: 50000, perso: 124000, pro: 8200 },
    score: 64,
  },
};

const fmtN = n => n.toLocaleString('fr-FR') + ' €';
const fmtNs = n => n >= 1000 ? Math.round(n/100)/10 + 'k €' : n + ' €';

// ─── Universal dashboard component ─────────────────────────────
function PublicDashboard({ profile = 'societe' }) {
  const d = PROFILES[profile];
  const toneColor = d.insightTone === 'safe' ? 'var(--safe)' : d.insightTone === 'watch' ? 'var(--watch)' : 'var(--risk)';
  const toneLabel = d.insightTone === 'safe' ? 'SITUATION SAINE' : d.insightTone === 'watch' ? 'À SURVEILLER' : 'RISQUE';
  const hasPro = d.runwayPro != null;

  return (
    <PhoneFrame label="dashboard" tabSet="public">
      {/* Header with name + profile chip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Bonjour, {d.name}</div>
          <div style={{ fontSize: 11, color: '#7a7770', marginTop: 2 }}>{d.profile} · lundi 18 mai</div>
        </div>
        <div style={{ width: 32, height: 32, border: '1.4px solid #1F1F1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Caveat', cursive", fontSize: 18, fontWeight: 700 }}>
          {d.name[0]}
        </div>
      </div>

      {/* Card 1 — Situation nette */}
      <SectionHeader>Situation nette</SectionHeader>
      <SketchCard style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Patrimoine net</div>
        <div className="caveat" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1 }}>{fmtN(d.netWorth)}</div>
        {/* Stacked bar */}
        <div style={{ display: 'flex', height: 12, marginTop: 8, borderRadius: 6, overflow: 'hidden', border: '1px solid #1F1F1F' }}>
          <div style={{ flex: d.breakdown.cash, background: '#1F1F1F' }} title="Cash" />
          <div style={{ flex: d.breakdown.etf, background: 'var(--perso)' }} title="ETF" />
          {d.breakdown.av > 0 && <div style={{ flex: d.breakdown.av, background: '#9b6bf0' }} title="AV" />}
          {d.breakdown.immo > 0 && <div style={{ flex: d.breakdown.immo, background: '#c08a2e' }} title="Immo" />}
          {d.breakdown.pro > 0 && <div style={{ flex: d.breakdown.pro, background: 'var(--pro)' }} title="Pro" />}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', marginTop: 6, fontSize: 11, color: '#3a3a3a' }}>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, background: '#1F1F1F', marginRight: 4 }}/>Cash {fmtNs(d.breakdown.cash)}</span>
          <span><span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--perso)', marginRight: 4 }}/>Invest. {fmtNs(d.breakdown.etf + d.breakdown.av)}</span>
          {d.breakdown.immo > 0 && <span><span style={{ display: 'inline-block', width: 8, height: 8, background: '#c08a2e', marginRight: 4 }}/>Immo {fmtNs(d.breakdown.immo)}</span>}
          {d.breakdown.pro > 0 && <span><span style={{ display: 'inline-block', width: 8, height: 8, background: 'var(--pro)', marginRight: 4 }}/>Pro {fmtNs(d.breakdown.pro)}</span>}
        </div>
      </SketchCard>

      {/* Card 2 — Sécurité (runway) */}
      <SectionHeader>Sécurité</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: hasPro ? '1fr 1fr' : '1fr', gap: 8, marginBottom: 10 }}>
        <SketchCard accent={hasPro ? 'perso' : null} accentSide="top" style={{ padding: '10px 11px' }}>
          <div style={{ fontSize: 11, color: hasPro ? 'var(--perso)' : '#7a7770', fontWeight: 700, letterSpacing: 1 }}>RUNWAY PERSO</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
            <div className="caveat" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{d.runwayPerso}</div>
            <div style={{ color: '#6b6b6b', fontSize: 12 }}>mois</div>
          </div>
          <ProgressBar value={Math.min(100, d.runwayPerso * 8)} color={d.runwayPerso < 3 ? 'var(--risk)' : d.runwayPerso < 6 ? 'var(--watch)' : 'var(--safe)'} height={6} />
        </SketchCard>
        {hasPro && (
          <SketchCard accent="pro" accentSide="top" style={{ padding: '10px 11px' }}>
            <div style={{ fontSize: 11, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1 }}>RUNWAY PRO</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
              <div className="caveat" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{d.runwayPro}</div>
              <div style={{ color: '#6b6b6b', fontSize: 12 }}>mois</div>
            </div>
            <ProgressBar value={Math.min(100, d.runwayPro * 8)} color={d.runwayPro < 3 ? 'var(--risk)' : d.runwayPro < 6 ? 'var(--watch)' : 'var(--safe)'} height={6} />
          </SketchCard>
        )}
      </div>

      {/* Card 3 — Objectif principal */}
      <SectionHeader>Objectif principal</SectionHeader>
      <SketchCard style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{d.objectif.label}</div>
            <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 1 }}>
              <span className="mono">{fmtNs(d.objectif.current)}</span> / <span className="mono">{fmtNs(d.objectif.target)}</span>
            </div>
          </div>
          <div className="caveat" style={{ fontSize: 28, fontWeight: 700 }}>{d.objectif.pct}%</div>
        </div>
        <div style={{ marginTop: 6 }}><ProgressBar value={d.objectif.pct} color="#1F1F1F" height={10} /></div>
      </SketchCard>

      {/* Card 4 — DCA */}
      <SectionHeader>Investissements</SectionHeader>
      <SketchCard style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 13 }}>DCA mensuel</div>
          <div className="caveat" style={{ fontSize: 26, fontWeight: 700 }}>{d.dca} €<span style={{ fontSize: 11, color: '#7a7770' }}>/mois</span></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#6b6b6b', marginTop: 2 }}>
          <span>{d.dcaPctRevenu}% du revenu</span>
          <span style={{ color: d.dcaPctRevenu < 10 ? 'var(--watch)' : d.dcaPctRevenu > 30 ? 'var(--watch)' : 'var(--safe)' }}>
            {d.dcaPctRevenu < 10 ? '• timide' : d.dcaPctRevenu > 30 ? '• agressif' : '• soutenable'}
          </span>
        </div>
      </SketchCard>

      {/* Card 5 — Recommandation */}
      <SectionHeader>Copilote</SectionHeader>
      <SketchCard style={{ borderColor: toneColor, borderWidth: 1.6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: toneColor }} />
          <div style={{ fontSize: 11, color: toneColor, fontWeight: 700, letterSpacing: 1 }}>{toneLabel}</div>
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.4, color: '#2a2a2a' }}>
          « {d.insight} »
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: '#6b6b6b' }}>
          → Simuler un scénario
        </div>
      </SketchCard>
    </PhoneFrame>
  );
}

function PublicDashboardSalarie() { return <PublicDashboard profile="salarie" />; }
function PublicDashboardSociete() { return <PublicDashboard profile="societe" />; }
function PublicDashboardMixte() { return <PublicDashboard profile="mixte" />; }

Object.assign(window, { PROFILES, fmtN, fmtNs, PublicDashboard, PublicDashboardSalarie, PublicDashboardSociete, PublicDashboardMixte });
