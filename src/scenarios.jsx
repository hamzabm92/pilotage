/* scenarios.jsx — Scénarios screen + A/B/C */

// ── Scenarios List Screen ──────────────────────────────────────
function ScenariosScreen({ nav }) {
  const items = [
    { id: 'mission', emoji: '◔', title: 'Et si je perds ma mission ?', sub: 'projection runway sans CA', tone: 'watch' },
    { id: 'dividende', emoji: '$', title: 'Combien sortir en dividende ?', sub: 'brut → net + risque', tone: 'safe' },
    { id: 'achat', emoji: '⌂', title: 'Puis-je acheter ce bien ?', sub: 'impact cash + objectifs', tone: 'safe' },
    { id: 'dca', emoji: '↗', title: 'Et si je baisse mon DCA ?', sub: 'cash récupéré · trajectoire', tone: 'safe' },
    { id: 'passifs', emoji: '∞', title: 'Combien pour 500 €/mois passifs ?', sub: 'horizon · DCA cible', tone: 'safe' },
    { id: 'tjm', emoji: '◯', title: 'Augmenter mon TJM de X% ?', sub: 'impact CA + dividende', tone: 'safe' },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 18px 12px', borderBottom: `1px solid ${C.inkFaint}`, flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.ink }}>Scénarios</div>
        <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 3 }}>simuler avant de décider</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 90px' }}>
        <Card style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13, color: '#3a3a3a', fontStyle: 'italic', lineHeight: 1.5 }}>
            Pose une question à ton cockpit. Il calcule l'impact sur ton cash, ton runway et tes objectifs.
          </div>
        </Card>

        <div style={{ fontSize: 11, color: C.inkSoft, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>SUGGÉRÉS POUR TOI</div>

        {items.map(it => (
          <div key={it.id} onClick={() => nav.push(it.id)} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 14px', marginBottom: 8,
            border: `1.4px solid ${C.ink}`, borderRadius: 12,
            background: C.paper, boxShadow: '2px 2px 0 0 rgba(31,31,31,0.06)',
            cursor: 'pointer',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              border: `1.2px solid ${C.ink}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Caveat, cursive', fontSize: 20, fontWeight: 700,
              flexShrink: 0,
            }}>{it.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{it.title}</div>
              <div style={{ fontSize: 11, color: C.inkSoft }}>{it.sub}</div>
            </div>
            <div style={{ fontSize: 18, color: C.inkSoft }}>→</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Scénario A — Mission ───────────────────────────────────────
function ScenarioMission({ nav }) {
  const { calcs, state } = useStore();
  const [moisSansCA, setMoisSansCA] = React.useState(6);
  const [reductionDepenses, setReductionDepenses] = React.useState(20);
  const [maintienDCA, setMaintienDCA] = React.useState(true);

  const cash = calcs.cashTotal;
  const tresorerie = state.pro.tresorerie || 0;
  const depenses = calcs.depensesTotalCalc || 2000;
  const dca = calcs.dcaTotal;

  const depensesReduites = depenses * (1 - reductionDepenses / 100);
  const sortiesMensuelles = maintienDCA ? depensesReduites + dca : depensesReduites;
  const runwayPerso = sortiesMensuelles > 0 ? cash / sortiesMensuelles : 99;
  const runwayPro = tresorerie > 0 ? calcs.runwayPro : 0;
  const runwayTotal = Math.min(runwayPerso + runwayPro, 36);

  const survie = Math.min(moisSansCA, runwayTotal);
  const critique = runwayTotal - moisSansCA;

  const tone = critique > 3 ? 'safe' : critique > 0 ? 'watch' : 'risk';
  const toneTitle = tone === 'safe' ? 'SITUATION GÉRABLE' : tone === 'watch' ? 'VIVABLE MAIS À SURVEILLER' : 'RISQUE ÉLEVÉ';

  // Chart data
  const mois = 12;
  const chartW = 300, chartH = 80;
  const maxV = Math.max(cash, tresorerie, 1);
  function cashAt(m) { return Math.max(0, cash - sortiesMensuelles * m); }
  function tresoAt(m) { return Math.max(0, tresorerie - (depenses * 0.3) * m); }

  const persoPoints = Array.from({ length: mois + 1 }, (_, m) => {
    const x = (m / mois) * chartW;
    const y = chartH - (cashAt(m) / maxV) * (chartH - 10);
    return `${x},${y}`;
  }).join(' ');
  const proPoints = tresorerie > 0 ? Array.from({ length: mois + 1 }, (_, m) => {
    const x = (m / mois) * chartW;
    const y = chartH - (tresoAt(m) / maxV) * (chartH - 10);
    return `${x},${y}`;
  }).join(' ') : null;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <BackBar title="Et si je perds ma mission ?" subtitle="Scénario" onBack={() => nav.pop()} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 90px' }}>

        {/* Paramètres */}
        <Card style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>PARAMÈTRES</div>
          <SliderRow label="Mois sans CA" value={moisSansCA} onChange={setMoisSansCA} min={0} max={18} step={1} unit=" mois" color={C.watch} />
          <SliderRow label="Réduction des dépenses" value={reductionDepenses} onChange={setReductionDepenses} min={0} max={50} step={5} unit="%" color={C.ink} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <div
              onClick={() => setMaintienDCA(!maintienDCA)}
              style={{
                width: 18, height: 18, borderRadius: 4,
                border: `1.4px solid ${C.ink}`,
                background: maintienDCA ? C.ink : 'transparent',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {maintienDCA && <svg width="12" height="12" viewBox="0 0 14 14"><path d="M2 7 L 6 11 L 12 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>}
            </div>
            <span style={{ fontSize: 13, color: C.ink }}>Maintenir le DCA ({fmt(dca)}/mois)</span>
          </div>
        </Card>

        {/* Projection chart */}
        <Card style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>PROJECTION TRÉSORERIE</div>
          <svg width="100%" height="90" viewBox={`0 0 ${chartW} ${chartH + 10}`} preserveAspectRatio="none">
            <line x1="0" y1={chartH} x2={chartW} y2={chartH} stroke={C.ink} strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2={chartH} stroke={C.ink} strokeWidth="1" />
            {/* Danger threshold line */}
            <line x1="0" y1={chartH * 0.75} x2={chartW} y2={chartH * 0.75} stroke={C.watch} strokeWidth="0.8" strokeDasharray="3 3" />
            <polyline points={persoPoints} fill="none" stroke={C.perso} strokeWidth="2" />
            {proPoints && <polyline points={proPoints} fill="none" stroke={C.pro} strokeWidth="2" />}
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: C.inkSoft, marginTop: 2 }}>
            {Array.from({ length: 5 }, (_, i) => <span key={i}>M{i * 3}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 11 }}>
            <span style={{ color: C.perso }}>● Cash perso</span>
            {tresorerie > 0 && <span style={{ color: C.pro }}>● Trésorerie société</span>}
          </div>
        </Card>

        {/* Résultat */}
        <Card style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>RÉSULTAT</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <div style={{ fontSize: 11, color: C.inkSoft }}>Runway total</div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 28, fontWeight: 700, color: toneColor(tone) }}>
                {Math.round(runwayTotal * 10) / 10} <span style={{ fontSize: 13 }}>mois</span>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.inkSoft }}>Marge après crise</div>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 28, fontWeight: 700, color: toneColor(tone) }}>
                {Math.round(critique * 10) / 10} <span style={{ fontSize: 13 }}>mois</span>
              </div>
            </div>
          </div>
        </Card>

        <Verdict tone={tone} title={toneTitle}>
          Tu tiens <b>{Math.round(runwayTotal * 10) / 10} mois</b> au total.
          {critique > 0
            ? <> Après {moisSansCA} mois sans CA, il te resterait <b>{Math.round(critique * 10) / 10} mois</b> de marge.</>
            : <> Ton cash s'épuise avant la fin de la période de {moisSansCA} mois.</>}
          {reductionDepenses > 0 && <><br/><span style={{ color: C.inkSoft }}>Réduction de {reductionDepenses}% des dépenses = économie de {fmt(depenses * reductionDepenses / 100)}/mois.</span></>}
        </Verdict>

      </div>
    </div>
  );
}

// ── Scénario B — Dividende ─────────────────────────────────────
function ScenarioDividende({ nav }) {
  const { state, calcs } = useStore();
  const [country, setCountry] = React.useState(state.profile.country || 'FR');
  const [brutAmount, setBrutAmount] = React.useState(10000);

  const tresorerie = state.pro.tresorerie || calcs.societeComptes || 0;
  const regime = DIV_REGIMES[country] || DIV_REGIMES['FR'];
  const cur = regime.currency;

  const fxFromEUR = country === 'MA' ? 10.85 : country === 'CH' ? 0.95 : country === 'UK' ? 0.85 : 1;
  const tresoLocal = Math.round(tresorerie * fxFromEUR);
  const brut = Math.min(brutAmount, tresoLocal);
  const net = Math.round(brut * (1 - regime.rate));
  const tax = brut - net;
  const cashRestant = tresoLocal - brut;
  const runwayBefore = Math.round(calcs.runwayPro * 10) / 10 || 12;
  const runwayAfter = tresoLocal > 0 ? Math.max(0, Math.round((cashRestant / tresoLocal) * runwayBefore * 10) / 10) : 0;
  const tone = runwayAfter < 4 ? 'risk' : runwayAfter < 7 ? 'watch' : 'safe';
  const toneTitle = tone === 'safe' ? 'OK · MARGE CONFORTABLE' : tone === 'watch' ? 'OK MAIS LIMITE' : 'TROP AGRESSIF';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <BackBar title="Combien sortir en dividende ?" subtitle="Scénario · Pro" onBack={() => nav.pop()} accent="pro" />

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 90px' }}>

        {/* Régime fiscal */}
        <Card style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 700, letterSpacing: 1 }}>RÉGIME FISCAL</div>
            <div style={{ fontSize: 11, color: C.inkSoft }}>réglé sur ton pays</div>
          </div>
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6, marginBottom: 8 }}>
            {Object.entries(DIV_REGIMES).map(([code, r]) => (
              <CountryChip key={code} regime={r} active={code === country} onClick={() => setCountry(code)} />
            ))}
          </div>
          <div style={{ borderTop: `1px dashed ${C.inkFaint}`, paddingTop: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{regime.flag} {regime.label}</div>
            <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 3, lineHeight: 1.4 }}>
              {regime.breakdown}<br />
              <span style={{ fontStyle: 'italic' }}>{regime.note}</span>
            </div>
          </div>
        </Card>

        {/* Montant brut slider */}
        <Card style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>MONTANT BRUT</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'center', padding: '4px 0 8px' }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 52, fontWeight: 700, lineHeight: 1, color: C.ink }}>
              {brut.toLocaleString('fr-FR')}
            </div>
            <div style={{ fontSize: 18, color: C.inkSoft }}>{cur}</div>
          </div>
          <SliderRow
            label=""
            value={brut}
            onChange={setBrutAmount}
            min={0}
            max={Math.max(tresoLocal, 1)}
            step={Math.max(500, Math.floor(tresoLocal / 20))}
            unit={` ${cur}`}
            color={C.pro}
          />
          {tresoLocal === 0 && (
            <div style={{ fontSize: 12, color: C.inkSoft, fontStyle: 'italic', textAlign: 'center' }}>
              → Renseigner la trésorerie dans le module Pro
            </div>
          )}
        </Card>

        {/* Impact 3 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 10 }}>
          <Card style={{ padding: '8px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: C.inkSoft, textTransform: 'uppercase', marginBottom: 2 }}>Net</div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 20, fontWeight: 700, lineHeight: 1 }}>
              {(net / 1000).toFixed(1)}k
            </div>
            <div style={{ fontSize: 9, color: C.inkSoft }}>{cur}</div>
          </Card>
          <Card style={{ padding: '8px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: C.inkSoft, textTransform: 'uppercase', marginBottom: 2 }}>Impôt</div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 20, fontWeight: 700, lineHeight: 1, color: C.risk }}>
              {(tax / 1000).toFixed(1)}k
            </div>
            <div style={{ fontSize: 9, color: C.inkSoft }}>{cur}</div>
          </Card>
          <Card accent="pro" style={{ padding: '8px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: 10, color: C.pro, textTransform: 'uppercase', marginBottom: 2 }}>Reste</div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 20, fontWeight: 700, lineHeight: 1, color: C.pro }}>
              {(cashRestant / 1000).toFixed(1)}k
            </div>
            <div style={{ fontSize: 9, color: C.inkSoft }}>société</div>
          </Card>
        </div>

        {/* Runway après distribution */}
        <Card style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>RUNWAY APRÈS DISTRIBUTION</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, fontWeight: 600, color: toneColor(tone) }}>
              {runwayAfter} m <span style={{ color: C.inkFaint }}>vs {runwayBefore} m</span>
            </div>
          </div>
          <ProgressBar value={Math.min(100, runwayAfter * 8.33)} color={toneColor(tone)} height={10} />
        </Card>

        <Verdict tone={tone} title={toneTitle}>
          Brut <b>{brut.toLocaleString('fr-FR')} {cur}</b> → net <b>{net.toLocaleString('fr-FR')} {cur}</b> ({regime.label}).
          Cash société restant : <b>{cashRestant.toLocaleString('fr-FR')} {cur}</b> — runway ~{runwayAfter} mois.
          {tone === 'risk' && <><br /><span style={{ color: C.inkSoft }}>Suggéré : viser <b>~{Math.round(tresoLocal * 0.4).toLocaleString('fr-FR')} {cur}</b> pour rester &gt; 6 m.</span></>}
        </Verdict>

      </div>
    </div>
  );
}

// ── Scénario C — Achat immobilier ──────────────────────────────
function ScenarioAchat({ nav }) {
  const { calcs } = useStore();
  const [prix, setPrix] = React.useState('');
  const [apport, setApport] = React.useState('');
  const [mensualite, setMensualite] = React.useState('');

  const prixN = parseFloat(prix) || 0;
  const apportN = parseFloat(apport) || 0;
  const mensualiteN = parseFloat(mensualite) || 0;

  const cash = calcs.cashTotal;
  const depenses = calcs.depensesTotalCalc || 1;
  const runwayAvant = cash / depenses;

  const cashApres = cash - apportN;
  const depensesApres = depenses + mensualiteN;
  const runwayApres = depensesApres > 0 ? cashApres / depensesApres : 0;
  const deltaRunway = runwayApres - runwayAvant;

  const peutAcheter = cashApres >= 0 && runwayApres >= 3;
  const tone = cashApres < 0 ? 'risk' : runwayApres < 3 ? 'risk' : runwayApres < 6 ? 'watch' : 'safe';
  const toneTitle = tone === 'safe' ? 'FAISABLE' : tone === 'watch' ? 'FAISABLE AVEC PRUDENCE' : 'DÉCONSEILLÉ EN L\'ÉTAT';

  const hasInputs = prixN > 0 && apportN > 0;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <BackBar title="Puis-je acheter ce bien ?" subtitle="Scénario" onBack={() => nav.pop()} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 90px' }}>

        <Card style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>LE BIEN</div>
          <Input label="Prix du bien" value={prix} onChange={setPrix} placeholder="250 000" suffix="€" type="number" />
          <Input label="Apport souhaité" value={apport} onChange={setApport} placeholder="50 000" suffix="€" type="number" />
          <Input label="Mensualité crédit" value={mensualite} onChange={setMensualite} placeholder="800" suffix="€/mois" type="number" />
        </Card>

        {hasInputs && (
          <>
            <Card style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>IMPACT</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 11, color: C.inkSoft }}>Cash après apport</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600, color: cashApres < 0 ? C.risk : C.ink }}>
                    {cashApres >= 0 ? fmt(cashApres) : `−${fmt(Math.abs(cashApres))}`}
                  </div>
                  {cashApres < 0 && <div style={{ fontSize: 10, color: C.risk }}>insuffisant</div>}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.inkSoft }}>Runway perso</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600, color: runwayApres < 6 ? C.risk : C.ink }}>
                    {Math.round(runwayApres * 10) / 10} mois
                  </div>
                  {deltaRunway < 0 && <div style={{ fontSize: 10, color: C.risk }}>{Math.round(deltaRunway * 10) / 10} mois</div>}
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.inkSoft }}>Dépenses /mois</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600 }}>+{fmt(mensualiteN)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.inkSoft }}>Apport / Cash</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600, color: apportN / (cash || 1) > 0.5 ? C.risk : C.ink }}>
                    {Math.round(apportN / (cash || 1) * 100)}%
                  </div>
                  {apportN / (cash || 1) > 0.5 && <div style={{ fontSize: 10, color: C.risk }}>{'> 50% du cash'}</div>}
                </div>
              </div>
            </Card>

            <Verdict tone={tone} title={toneTitle}>
              {cashApres < 0
                ? <>Ton apport dépasse ton cash disponible de <b>{fmt(Math.abs(cashApres))}</b>. Réduire l'apport ou renforcer le cash d'abord.</>
                : runwayApres < 3
                  ? <>Après apport, ton runway tombe à <b>{Math.round(runwayApres * 10) / 10} mois</b> — trop risqué. Objectif : maintenir 3+ mois.</>
                  : <>Faisable. Après apport il te reste <b>{fmt(cashApres)}</b> · runway <b>{Math.round(runwayApres * 10) / 10} mois</b>.</>
              }
            </Verdict>
          </>
        )}

        {!hasInputs && (
          <Card dashed>
            <div style={{ fontSize: 13, color: C.inkSoft, textAlign: 'center', fontStyle: 'italic', padding: '12px 0' }}>
              Renseigne le prix et l'apport pour voir l'impact.
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}

// ── Scénario DCA — simpliste ───────────────────────────────────
function ScenarioDCA({ nav }) {
  const { calcs } = useStore();
  const [nouveauDCA, setNouveauDCA] = React.useState(calcs.dcaTotal || 0);

  const ancienDCA = calcs.dcaTotal || 0;
  const revenu = calcs.revenuMensuelCalc || 1;
  const gainMensuel = ancienDCA - nouveauDCA;
  const nouvellesPct = revenu > 0 ? (nouveauDCA / revenu) * 100 : 0;
  const tone = nouvellesPct < 5 ? 'watch' : nouvellesPct > 30 ? 'watch' : 'safe';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <BackBar title="Et si je baisse mon DCA ?" subtitle="Scénario" onBack={() => nav.pop()} />
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 90px' }}>
        <Card style={{ marginBottom: 10 }}>
          <SliderRow label="Nouveau DCA mensuel" value={nouveauDCA} onChange={setNouveauDCA} min={0} max={Math.max(ancienDCA * 2, 2000)} step={50} unit=" €" color={C.perso} />
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div><div style={{ fontSize: 11, color: C.inkSoft }}>DCA actuel</div><div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600 }}>{fmt(ancienDCA)}</div></div>
            <div><div style={{ fontSize: 11, color: C.inkSoft }}>Nouveau DCA</div><div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600, color: C.perso }}>{fmt(nouveauDCA)}</div></div>
            <div><div style={{ fontSize: 11, color: C.inkSoft }}>Cash récupéré/mois</div><div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600, color: gainMensuel > 0 ? C.safe : C.ink }}>{gainMensuel >= 0 ? '+' : ''}{fmt(gainMensuel)}</div></div>
            <div><div style={{ fontSize: 11, color: C.inkSoft }}>% du revenu</div><div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600 }}>{Math.round(nouvellesPct)}%</div></div>
          </div>
        </Card>
        <Verdict tone={tone} title={tone === 'safe' ? 'SOUTENABLE' : 'À SURVEILLER'}>
          Nouveau DCA : <b>{fmt(nouveauDCA)}/mois</b> ({Math.round(nouvellesPct)}% du revenu).
          {gainMensuel > 0 ? <> Tu libères <b>{fmt(gainMensuel)}</b>/mois.</> : <> Tu investis <b>{fmt(Math.abs(gainMensuel))}</b>/mois de plus.</>}
        </Verdict>
      </div>
    </div>
  );
}

Object.assign(window, { ScenariosScreen, ScenarioMission, ScenarioDividende, ScenarioAchat, ScenarioDCA });
