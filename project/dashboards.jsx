/* Dashboard wireframe variations */

// Realistic placeholder data
const DATA = {
  healthy: {
    netWorth: 168540,
    netWorthEstime: 172300,
    pro: { tresorerie: 42800, invest: 28100, total: 70900, runway: 14, dca: 1000, nextDiv: 18500, missionEnd: 'mars 2027', tjm: 650, jours: 18, ca: 11700 },
    perso: { cash: 16000, etf: 22914, tanger: 35000, tangerTotal: 85000, total: 73914, runway: 11, dca: 550, target2027: 62 },
    score: 72,
    note: "Situation saine, mais mission à surveiller après mars 2027.",
  },
  watch: {
    netWorth: 142100,
    netWorthEstime: 144500,
    pro: { tresorerie: 18200, invest: 26900, total: 45100, runway: 6, dca: 1000, nextDiv: 9000, missionEnd: 'janv. 2027', tjm: 600, jours: 16, ca: 9600 },
    perso: { cash: 9400, etf: 22914, tanger: 35000, tangerTotal: 85000, total: 67314, runway: 7, dca: 400, target2027: 41 },
    score: 54,
    note: "Trésorerie SASU sous le seuil. Reconstituer 3 mois de charges avant dividende.",
  },
  risk: {
    netWorth: 118200,
    netWorthEstime: 119000,
    pro: { tresorerie: 6800, invest: 21400, total: 28200, runway: 2, dca: 500, nextDiv: 0, missionEnd: 'nov. 2026', tjm: 550, jours: 12, ca: 6600 },
    perso: { cash: 4200, etf: 22914, tanger: 35000, tangerTotal: 85000, total: 62114, runway: 3, dca: 200, target2027: 28 },
    score: 28,
    note: "Risque élevé : runway SASU < 3 mois. Pas de dividende, viser remontée TJM.",
  },
};

const fmt = n => n.toLocaleString('fr-FR').replace(/\u202f/g, ' ') + ' €';
const fmtShort = n => n >= 1000 ? Math.round(n/100)/10 + 'k €' : n + ' €';

// ─── Vue globale card (used by V1, V2-ish) ─────────────────────
function VueGlobaleCard({ d, layout = 'inside' }) {
  // layout: 'inside' = PRO/PERSO sub-cards inside parent; 'split' = two halves
  return (
    <SketchCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 12, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Net worth</div>
        <div className="mono" style={{ fontSize: 10, color: '#9a9a9a' }}>au 18 mai</div>
      </div>
      <div className="caveat" style={{ fontSize: 38, fontWeight: 700, lineHeight: 1, margin: '4px 0 10px' }}>
        {fmt(d.netWorth)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <SketchCard accent="pro" style={{ padding: '8px 10px 9px 12px' }}>
          <div style={{ fontSize: 11, color: 'var(--pro)', fontWeight: 700, letterSpacing: 0.5 }}>PRO</div>
          <div className="mono" style={{ fontSize: 15, fontWeight: 600, marginTop: 1 }}>{fmt(d.pro.total)}</div>
          <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 4, lineHeight: 1.35 }}>
            Trésorerie {fmtShort(d.pro.tresorerie)}<br/>
            Invest. {fmtShort(d.pro.invest)}
          </div>
        </SketchCard>
        <SketchCard accent="perso" style={{ padding: '8px 10px 9px 12px' }}>
          <div style={{ fontSize: 11, color: 'var(--perso)', fontWeight: 700, letterSpacing: 0.5 }}>PERSO</div>
          <div className="mono" style={{ fontSize: 15, fontWeight: 600, marginTop: 1 }}>{fmt(d.perso.total)}</div>
          <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 4, lineHeight: 1.35 }}>
            Cash {fmtShort(d.perso.cash)} · ETF {fmtShort(d.perso.etf)}<br/>
            Apt Tanger {fmtShort(d.perso.tanger)}
          </div>
        </SketchCard>
      </div>

      <div style={{ borderTop: '1px dashed #c9c6bd', marginTop: 10, paddingTop: 6, display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
        <span style={{ color: '#6b6b6b' }}>Net worth estimé fin 2026</span>
        <span className="mono" style={{ fontWeight: 600 }}>{fmt(d.netWorthEstime)}</span>
      </div>
    </SketchCard>
  );
}

// ─── Score card (gauge variants) ───────────────────────────────
function ScoreCard({ d, variant = 'circular' }) {
  return (
    <SketchCard>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {variant === 'circular' && <GaugeCircular value={d.score} size={108} />}
        {variant === 'bar' && (
          <div style={{ flex: 1 }}><GaugeBar value={d.score} width={280} /></div>
        )}
        {variant === 'split' && <GaugeSplit value={d.score} pro={Math.max(20, d.score + 6)} perso={Math.max(20, d.score - 4)} size={108} />}
        {variant === 'dial' && (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}><GaugeDial value={d.score} size={150} /></div>
        )}
        {variant !== 'bar' && variant !== 'dial' && (
          <div style={{ flex: 1, fontSize: 13, lineHeight: 1.35, color: '#3a3a3a' }}>
            <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Copilote</div>
            <div style={{ marginTop: 4 }}>« {d.note} »</div>
          </div>
        )}
      </div>
      {(variant === 'bar' || variant === 'dial') && (
        <div style={{ fontSize: 13, color: '#3a3a3a', marginTop: 10, paddingTop: 8, borderTop: '1px dashed #c9c6bd' }}>
          <span style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1, marginRight: 6 }}>Copilote</span>
          « {d.note} »
        </div>
      )}
    </SketchCard>
  );
}

// ─── Résumé PRO/PERSO cards ────────────────────────────────────
function ResumePro({ d, compact }) {
  return (
    <SketchCard accent="pro">
      <div style={{ fontSize: 12, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>RÉSUMÉ PRO</div>
      <KV label="Trésorerie SASU" value={fmt(d.pro.tresorerie)} />
      <KV label="Runway société" value={`${d.pro.runway} mois`} sub={d.pro.runway < 6 ? '⚠ sous seuil' : null} />
      <KV label="DCA SASU" value={`${d.pro.dca} €/mois`} />
      <KV label="Prochain dividende est." value={d.pro.nextDiv ? fmt(d.pro.nextDiv) : '—'} sub="Q4 2026" />
    </SketchCard>
  );
}
function ResumePerso({ d, compact }) {
  return (
    <SketchCard accent="perso">
      <div style={{ fontSize: 12, color: 'var(--perso)', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>RÉSUMÉ PERSO</div>
      <KV label="Cash dispo" value={fmt(d.perso.cash)} />
      <KV label="Runway perso" value={`${d.perso.runway} mois`} />
      <KV label="DCA PEA" value={`${d.perso.dca} €/mois`} />
      <KV label="Objectif 2027" value={`${d.perso.target2027}%`} sub="Apt Tanger soldé" />
    </SketchCard>
  );
}

// ════════════════════════════════════════════════════════════════
// V1 — Stacked classic / circular gauge
// ════════════════════════════════════════════════════════════════
function DashboardV1({ data }) {
  const d = data;
  return (
    <PhoneFrame label="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>Bonjour, Karim</div>
        <Chip>v1 · classic</Chip>
      </div>
      <div style={{ fontSize: 12, color: '#7a7770', padding: '0 2px 6px' }}>Lundi 18 mai · semaine 21</div>

      <SectionHeader index="1">Vue globale</SectionHeader>
      <VueGlobaleCard d={d} />

      <SectionHeader index="2">Score de sécurité</SectionHeader>
      <ScoreCard d={d} variant="circular" />

      <SectionHeader index="3">Résumé</SectionHeader>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <ResumePro d={d} />
        <ResumePerso d={d} />
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// V2 — Hard split columns / horizontal bar gauge
// ════════════════════════════════════════════════════════════════
function DashboardV2({ data }) {
  const d = data;
  return (
    <PhoneFrame label="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>Pilotage</div>
        <Chip>v2 · split</Chip>
      </div>
      <div style={{ fontSize: 12, color: '#7a7770', padding: '0 2px 6px' }}>Net worth · 18 mai</div>

      {/* Net worth banner */}
      <SketchCard style={{ textAlign: 'center', padding: '10px 14px' }}>
        <div className="caveat" style={{ fontSize: 42, fontWeight: 700, lineHeight: 1 }}>{fmt(d.netWorth)}</div>
        <div style={{ fontSize: 11, color: '#7a7770', marginTop: 2 }}>
          estimé fin 2026 · <span className="mono">{fmt(d.netWorthEstime)}</span>
        </div>
      </SketchCard>

      <SectionHeader index="1">Vue globale</SectionHeader>
      {/* Two hard columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
        <SketchCard accent="pro" accentSide="top" style={{ padding: '10px 11px' }}>
          <div style={{ fontSize: 11, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1 }}>PRO · SASU</div>
          <div className="caveat" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>{fmt(d.pro.total)}</div>
          <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 6, lineHeight: 1.45 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Trésorerie</span><span className="mono">{fmtShort(d.pro.tresorerie)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Invest.</span><span className="mono">{fmtShort(d.pro.invest)}</span></div>
          </div>
        </SketchCard>
        <SketchCard accent="perso" accentSide="top" style={{ padding: '10px 11px' }}>
          <div style={{ fontSize: 11, color: 'var(--perso)', fontWeight: 700, letterSpacing: 1 }}>PERSO</div>
          <div className="caveat" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>{fmt(d.perso.total)}</div>
          <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 6, lineHeight: 1.45 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Cash</span><span className="mono">{fmtShort(d.perso.cash)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>ETF</span><span className="mono">{fmtShort(d.perso.etf)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tanger</span><span className="mono">{fmtShort(d.perso.tanger)}</span></div>
          </div>
        </SketchCard>
      </div>

      <SectionHeader index="2">Score de sécurité</SectionHeader>
      <ScoreCard d={d} variant="bar" />

      <SectionHeader index="3">Résumé</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <SketchCard accent="pro" accentSide="top" style={{ padding: '10px 11px' }}>
          <div style={{ fontSize: 11, color: 'var(--pro)', fontWeight: 700 }}>PRO</div>
          <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 4, lineHeight: 1.55 }}>
            <div>Tréso · <span className="mono">{fmtShort(d.pro.tresorerie)}</span></div>
            <div>Runway · <span className="mono">{d.pro.runway} mois</span></div>
            <div>DCA · <span className="mono">{d.pro.dca}€/m</span></div>
            <div>Div. Q4 · <span className="mono">{d.pro.nextDiv ? fmtShort(d.pro.nextDiv) : '—'}</span></div>
          </div>
        </SketchCard>
        <SketchCard accent="perso" accentSide="top" style={{ padding: '10px 11px' }}>
          <div style={{ fontSize: 11, color: 'var(--perso)', fontWeight: 700 }}>PERSO</div>
          <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 4, lineHeight: 1.55 }}>
            <div>Cash · <span className="mono">{fmtShort(d.perso.cash)}</span></div>
            <div>Runway · <span className="mono">{d.perso.runway} mois</span></div>
            <div>DCA PEA · <span className="mono">{d.perso.dca}€/m</span></div>
            <div>Obj. 2027 · <span className="mono">{d.perso.target2027}%</span></div>
          </div>
        </SketchCard>
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// V3 — Segmented toggle / split donut gauge
// ════════════════════════════════════════════════════════════════
function DashboardV3({ data }) {
  const d = data;
  const [view, setView] = React.useState('both');
  return (
    <PhoneFrame label="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>Pilotage</div>
        <Chip>v3 · toggle</Chip>
      </div>

      <div style={{ margin: '6px 0 10px' }}>
        <Segmented
          value={view}
          onChange={setView}
          items={[
            { id: 'both', label: 'Tout' },
            { id: 'pro', label: 'PRO', color: '#2563EB' },
            { id: 'perso', label: 'PERSO', color: '#7C3AED' },
          ]}
        />
      </div>

      <SectionHeader index="1">Vue globale</SectionHeader>
      {view === 'both' && (
        <SketchCard>
          <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Net worth</div>
          <div className="caveat" style={{ fontSize: 38, fontWeight: 700, lineHeight: 1, margin: '2px 0 8px' }}>{fmt(d.netWorth)}</div>
          {/* Stacked bar visualizing split */}
          <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', border: '1px solid #1F1F1F' }}>
            <div style={{ width: `${(d.pro.total / d.netWorth) * 100}%`, background: 'var(--pro)' }} />
            <div style={{ flex: 1, background: 'var(--perso)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginTop: 4 }}>
            <span style={{ color: 'var(--pro)' }}>PRO {fmtShort(d.pro.total)} · {Math.round(d.pro.total/d.netWorth*100)}%</span>
            <span style={{ color: 'var(--perso)' }}>PERSO {fmtShort(d.perso.total)} · {Math.round(d.perso.total/d.netWorth*100)}%</span>
          </div>
          <div style={{ borderTop: '1px dashed #c9c6bd', marginTop: 8, paddingTop: 6, fontSize: 11, color: '#6b6b6b', display: 'flex', justifyContent: 'space-between' }}>
            <span>Estimé fin 2026</span><span className="mono">{fmt(d.netWorthEstime)}</span>
          </div>
        </SketchCard>
      )}
      {view === 'pro' && (
        <SketchCard accent="pro">
          <div style={{ fontSize: 11, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1 }}>PATRIMOINE PRO</div>
          <div className="caveat" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, margin: '2px 0 8px' }}>{fmt(d.pro.total)}</div>
          <KV label="Trésorerie SASU" value={fmt(d.pro.tresorerie)} />
          <KV label="Investissements SASU" value={fmt(d.pro.invest)} />
        </SketchCard>
      )}
      {view === 'perso' && (
        <SketchCard accent="perso">
          <div style={{ fontSize: 11, color: 'var(--perso)', fontWeight: 700, letterSpacing: 1 }}>PATRIMOINE PERSO</div>
          <div className="caveat" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, margin: '2px 0 8px' }}>{fmt(d.perso.total)}</div>
          <KV label="Cash perso" value={fmt(d.perso.cash)} />
          <KV label="ETF perso" value={fmt(d.perso.etf)} />
          <KV label="Apt Tanger (versé)" value={fmt(d.perso.tanger)} />
        </SketchCard>
      )}

      <SectionHeader index="2">Score de sécurité</SectionHeader>
      <ScoreCard d={d} variant="split" />

      <SectionHeader index="3">Résumé</SectionHeader>
      {view !== 'perso' && (<div style={{ marginBottom: 8 }}><ResumePro d={d} /></div>)}
      {view !== 'pro' && (<ResumePerso d={d} />)}
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// V4 — Score-led hero / big dial
// ════════════════════════════════════════════════════════════════
function DashboardV4({ data }) {
  const d = data;
  return (
    <PhoneFrame label="dashboard">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
        <div style={{ fontSize: 22, fontWeight: 700 }}>Pilotage</div>
        <Chip>v4 · score first</Chip>
      </div>

      {/* HERO: score dial */}
      <div style={{
        margin: '8px 0 12px',
        padding: '8px 12px 14px',
        border: '1.4px solid #1F1F1F',
        borderRadius: 16,
        background: 'var(--paper)',
        position: 'relative',
        boxShadow: '2px 2px 0 0 rgba(31,31,31,0.06)',
      }}>
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Score de sécurité</div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: -2 }}>
          <GaugeDial value={d.score} size={210} />
        </div>
        <div style={{ fontSize: 13, color: '#3a3a3a', marginTop: -10, textAlign: 'center', padding: '0 10px' }}>
          « {d.note} »
        </div>
      </div>

      <SectionHeader index="1">Vue globale</SectionHeader>
      <SketchCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Net worth</div>
            <div className="caveat" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1 }}>{fmt(d.netWorth)}</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: 11, color: '#6b6b6b' }}>
            estimé fin 2026<br/>
            <span className="mono" style={{ color: '#1F1F1F' }}>{fmt(d.netWorthEstime)}</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
          <SketchCard accent="pro" style={{ padding: '8px 10px 9px 12px' }}>
            <div style={{ fontSize: 11, color: 'var(--pro)', fontWeight: 700 }}>PRO</div>
            <div className="mono" style={{ fontSize: 15, fontWeight: 600 }}>{fmt(d.pro.total)}</div>
            <div style={{ fontSize: 10, color: '#6b6b6b', marginTop: 2 }}>Tréso · Invest.</div>
          </SketchCard>
          <SketchCard accent="perso" style={{ padding: '8px 10px 9px 12px' }}>
            <div style={{ fontSize: 11, color: 'var(--perso)', fontWeight: 700 }}>PERSO</div>
            <div className="mono" style={{ fontSize: 15, fontWeight: 600 }}>{fmt(d.perso.total)}</div>
            <div style={{ fontSize: 10, color: '#6b6b6b', marginTop: 2 }}>Cash · ETF · Tanger</div>
          </SketchCard>
        </div>
      </SketchCard>

      <SectionHeader>Résumé</SectionHeader>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <SketchCard accent="pro" accentSide="top" style={{ padding: '10px 11px' }}>
          <div style={{ fontSize: 11, color: 'var(--pro)', fontWeight: 700 }}>PRO</div>
          <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 4, lineHeight: 1.55 }}>
            <div>Runway · <span className="mono">{d.pro.runway} m</span></div>
            <div>DCA · <span className="mono">{d.pro.dca}€/m</span></div>
            <div>Div. · <span className="mono">{d.pro.nextDiv ? fmtShort(d.pro.nextDiv) : '—'}</span></div>
          </div>
        </SketchCard>
        <SketchCard accent="perso" accentSide="top" style={{ padding: '10px 11px' }}>
          <div style={{ fontSize: 11, color: 'var(--perso)', fontWeight: 700 }}>PERSO</div>
          <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 4, lineHeight: 1.55 }}>
            <div>Cash · <span className="mono">{fmtShort(d.perso.cash)}</span></div>
            <div>Runway · <span className="mono">{d.perso.runway} m</span></div>
            <div>Obj. 27 · <span className="mono">{d.perso.target2027}%</span></div>
          </div>
        </SketchCard>
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, { DATA, fmt, fmtShort, DashboardV1, DashboardV2, DashboardV3, DashboardV4, VueGlobaleCard, ScoreCard, ResumePro, ResumePerso });
