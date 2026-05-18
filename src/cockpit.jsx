/* cockpit.jsx — main dashboard screen */

function CockpitScreen({ nav }) {
  const { state, calcs, dispatch } = useStore();
  const { profile } = state;

  const {
    patrimoineNet, runwayPerso, runwayPro,
    dcaTotal, dcaPct, score, mainObjectif,
    insightTone, insight, hasSociete,
    breakdown,
  } = calcs;

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  const runwayPersoColor = runwayPerso < 3 ? C.risk : runwayPerso < 6 ? C.watch : C.safe;
  const runwayProColor = runwayPro < 3 ? C.risk : runwayPro < 6 ? C.watch : C.safe;
  const toneLabel = insightTone === 'safe' ? 'SITUATION SAINE' : insightTone === 'watch' ? 'À SURVEILLER' : 'RISQUE';

  const totalForBar = breakdown.cash + breakdown.invest + breakdown.immo + breakdown.pro;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: '16px 18px 12px',
        background: C.paper,
        borderBottom: `1px solid ${C.inkFaint}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, color: C.ink }}>
              Bonjour{profile.name ? `, ${profile.name.split(' ')[0]}` : ''} 👋
            </div>
            <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 3 }}>{today}</div>
          </div>
          <div style={{
            width: 36, height: 36,
            border: `1.4px solid ${C.ink}`, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Caveat, cursive', fontSize: 20, fontWeight: 700, color: C.ink,
          }}>
            {profile.name ? profile.name[0].toUpperCase() : 'P'}
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 90px' }}>

        {/* Card 1 — Situation nette */}
        <SectionHdr accent="perso">Situation nette</SectionHdr>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: C.inkSoft, textTransform: 'uppercase', letterSpacing: 1 }}>Patrimoine net</div>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 40, fontWeight: 700, lineHeight: 1, color: C.ink }}>
            {fmt(patrimoineNet)}
          </div>

          {/* Stacked bar */}
          {totalForBar > 0 && (
            <>
              <div style={{ display: 'flex', height: 12, marginTop: 10, borderRadius: 6, overflow: 'hidden', border: `1px solid ${C.ink}` }}>
                {breakdown.cash > 0 && <div style={{ flex: breakdown.cash, background: C.ink }} title="Cash" />}
                {breakdown.invest > 0 && <div style={{ flex: breakdown.invest, background: C.perso }} title="Invest" />}
                {breakdown.immo > 0 && <div style={{ flex: breakdown.immo, background: '#c08a2e' }} title="Immo" />}
                {breakdown.pro > 0 && <div style={{ flex: breakdown.pro, background: C.pro }} title="Pro" />}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', marginTop: 6, fontSize: 11, color: '#3a3a3a' }}>
                {breakdown.cash > 0 && <span><span style={{ display: 'inline-block', width: 8, height: 8, background: C.ink, marginRight: 4 }} />Cash {fmtShort(breakdown.cash)}</span>}
                {breakdown.invest > 0 && <span><span style={{ display: 'inline-block', width: 8, height: 8, background: C.perso, marginRight: 4 }} />Invest. {fmtShort(breakdown.invest)}</span>}
                {breakdown.immo > 0 && <span><span style={{ display: 'inline-block', width: 8, height: 8, background: '#c08a2e', marginRight: 4 }} />Immo {fmtShort(breakdown.immo)}</span>}
                {breakdown.pro > 0 && <span><span style={{ display: 'inline-block', width: 8, height: 8, background: C.pro, marginRight: 4 }} />Pro {fmtShort(breakdown.pro)}</span>}
              </div>
            </>
          )}
          {totalForBar === 0 && (
            <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 8, fontStyle: 'italic' }}>
              → Ajouter tes comptes dans l'onglet Comptes
            </div>
          )}
        </Card>

        {/* Card 2 — Sécurité */}
        <SectionHdr>Sécurité</SectionHdr>
        <div style={{ display: 'grid', gridTemplateColumns: hasSociete ? '1fr 1fr' : '1fr', gap: 8, marginBottom: 12 }}>
          <Card accent={hasSociete ? 'perso' : undefined} accentSide="top" style={{ padding: '10px 12px' }}>
            <div style={{ fontSize: 11, color: hasSociete ? C.perso : C.inkSoft, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>RUNWAY PERSO</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 32, fontWeight: 700, lineHeight: 1, color: runwayPersoColor }}>
                {Math.round(runwayPerso * 10) / 10}
              </div>
              <div style={{ color: C.inkSoft, fontSize: 12 }}>mois</div>
            </div>
            <ProgressBar value={Math.min(100, runwayPerso * 8.33)} color={runwayPersoColor} height={6} />
          </Card>
          {hasSociete && (
            <Card accent="pro" accentSide="top" style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 11, color: C.pro, fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>RUNWAY PRO</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 6 }}>
                <div style={{ fontFamily: 'Caveat, cursive', fontSize: 32, fontWeight: 700, lineHeight: 1, color: runwayProColor }}>
                  {Math.round(runwayPro * 10) / 10}
                </div>
                <div style={{ color: C.inkSoft, fontSize: 12 }}>mois</div>
              </div>
              <ProgressBar value={Math.min(100, runwayPro * 8.33)} color={runwayProColor} height={6} />
            </Card>
          )}
        </div>

        {/* Card 3 — Objectif principal */}
        <SectionHdr>Objectif principal</SectionHdr>
        {mainObjectif ? (
          <Card style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>{mainObjectif.label}</div>
                {mainObjectif.dateCible && (
                  <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 2 }}>cible · {fmtDate(mainObjectif.dateCible)}</div>
                )}
                <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 2 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{fmtShort(mainObjectif.montantActuel || 0)}</span>
                  {' / '}
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{fmtShort(mainObjectif.montantCible || 0)}</span>
                </div>
              </div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 28, fontWeight: 700, color: C.ink, flexShrink: 0, marginLeft: 8 }}>
                {mainObjectif.montantCible > 0
                  ? Math.round((mainObjectif.montantActuel || 0) / mainObjectif.montantCible * 100)
                  : 0}%
              </div>
            </div>
            <ProgressBar
              value={mainObjectif.montantCible > 0 ? Math.min(100, ((mainObjectif.montantActuel || 0) / mainObjectif.montantCible) * 100) : 0}
              color={C.ink} height={10}
            />
          </Card>
        ) : (
          <Card dashed style={{ marginBottom: 12 }} onClick={() => nav.tab('objectifs')}>
            <div style={{ fontSize: 13, color: C.inkSoft, textAlign: 'center', fontStyle: 'italic', padding: '8px 0' }}>
              → Définir un objectif principal
            </div>
          </Card>
        )}

        {/* Card 4 — Investissements */}
        <SectionHdr>Investissements</SectionHdr>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontSize: 13, color: C.ink }}>DCA mensuel</div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, color: C.ink }}>
              {fmt(dcaTotal)}<span style={{ fontSize: 12, color: C.inkSoft }}>/mois</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.inkSoft, marginTop: 4 }}>
            <span>{Math.round(dcaPct)}% du revenu</span>
            <span style={{ color: dcaPct < 10 ? C.watch : dcaPct > 30 ? C.watch : C.safe, fontWeight: 600 }}>
              {dcaPct === 0 ? '—' : dcaPct < 10 ? '• timide' : dcaPct > 30 ? '• agressif' : '• soutenable'}
            </span>
          </div>
          {dcaTotal === 0 && (
            <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 6, fontStyle: 'italic' }}>
              → Configure ton DCA dans les Comptes
            </div>
          )}
        </Card>

        {/* Card 5 — Copilote */}
        <SectionHdr>Copilote</SectionHdr>
        <Card style={{ marginBottom: 12, borderColor: toneColor(insightTone), borderWidth: '1.6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: toneColor(insightTone), display: 'inline-block' }} />
            <div style={{ fontSize: 11, color: toneColor(insightTone), fontWeight: 700, letterSpacing: 1 }}>{toneLabel}</div>
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.5, color: '#2a2a2a' }}>« {insight} »</div>
          <button
            onClick={() => nav.push('scenarios')}
            style={{
              marginTop: 8, fontSize: 12, color: C.pro,
              border: 'none', background: 'transparent',
              cursor: 'pointer', padding: 0,
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 600,
            }}
          >
            → Simuler un scénario
          </button>
        </Card>

      </div>
    </div>
  );
}

Object.assign(window, { CockpitScreen });
