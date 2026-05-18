/* Scénarios — the differentiating feature. Three scenario sketches. */

function ScenarioCard({ children, accent }) {
  return (
    <div style={{
      border: '1.4px solid #1F1F1F', borderRadius: 12, padding: '10px 12px',
      background: 'var(--paper)', marginBottom: 8,
      boxShadow: '2px 2px 0 0 rgba(31,31,31,0.06)',
    }}>{children}</div>
  );
}

function SliderRow({ label, value, min, max, unit, color = '#1F1F1F' }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 12, color: '#3a3a3a' }}>{label}</div>
        <div className="mono" style={{ fontSize: 15, fontWeight: 600, color }}>{value.toLocaleString('fr-FR')} {unit}</div>
      </div>
      <div style={{ position: 'relative', height: 22, marginTop: 4 }}>
        <div style={{ position: 'absolute', top: 9, left: 0, right: 0, height: 4, background: '#e6e2d4', borderRadius: 2, border: '0.8px solid #1F1F1F' }} />
        <div style={{ position: 'absolute', top: 9, left: 0, width: pct + '%', height: 4, background: color, borderRadius: 2 }} />
        <div style={{ position: 'absolute', top: 5, left: `calc(${pct}% - 7px)`, width: 14, height: 14, borderRadius: '50%', background: '#fff', border: `1.6px solid ${color}`, boxShadow: '1px 1px 0 0 rgba(31,31,31,0.12)' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#7a7770' }}>
        <span>{min.toLocaleString('fr-FR')}{unit}</span><span>{max.toLocaleString('fr-FR')}{unit}</span>
      </div>
    </div>
  );
}

function Verdict({ tone, title, children }) {
  const color = tone === 'safe' ? 'var(--safe)' : tone === 'watch' ? 'var(--watch)' : 'var(--risk)';
  return (
    <div style={{ border: `1.6px solid ${color}`, borderRadius: 12, padding: '10px 12px', background: 'var(--paper)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
        <div style={{ fontSize: 11, color, fontWeight: 700, letterSpacing: 1 }}>{title}</div>
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.45, color: '#2a2a2a' }}>{children}</div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// Scénarios — index
// ════════════════════════════════════════════════════════════════
function ScreenScenariosList() {
  const items = [
    { emoji: '◔', title: 'Et si je perds ma mission ?', sub: 'projection runway sans CA', tone: 'watch' },
    { emoji: '$', title: 'Combien sortir en dividende ?', sub: 'brut → net + risque', tone: 'safe' },
    { emoji: '⌂', title: 'Puis-je acheter ce bien ?', sub: 'impact cash + objectifs', tone: 'safe' },
    { emoji: '↗', title: 'Et si je baisse mon DCA ?', sub: 'cash récupéré · trajectoire', tone: 'safe' },
    { emoji: '∞', title: 'Combien pour 500 €/mois passifs ?', sub: 'horizon · DCA cible', tone: 'safe' },
    { emoji: '◯', title: 'Augmenter mon TJM de X% ?', sub: 'impact CA + dividende', tone: 'safe' },
  ];
  return (
    <PhoneFrame label="scenarios" tabSet="public">
      <PageHeader title="Scénarios" subtitle="simuler avant de décider" action="scénario" />

      <SketchCard style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: '#3a3a3a', fontStyle: 'italic', lineHeight: 1.4 }}>
          Pose une question à ton cockpit. Il calcule l'impact sur ton cash, ton runway et tes objectifs.
        </div>
      </SketchCard>

      <div style={{ fontSize: 11, color: '#7a7770', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>SUGGÉRÉS POUR TOI</div>

      {items.map((it, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', marginBottom: 6,
          border: '1.4px solid #1F1F1F', borderRadius: 12,
          background: 'var(--paper)',
          boxShadow: '2px 2px 0 0 rgba(31,31,31,0.06)',
        }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, border: '1.2px solid #1F1F1F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Caveat', cursive", fontSize: 20, fontWeight: 700 }}>{it.emoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{it.title}</div>
            <div style={{ fontSize: 11, color: '#6b6b6b' }}>{it.sub}</div>
          </div>
          <div style={{ fontSize: 18, color: '#7a7770' }}>→</div>
        </div>
      ))}
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// Scénario A — Et si je perds ma mission ?
// ════════════════════════════════════════════════════════════════
function ScreenScenarioMission() {
  return (
    <PhoneFrame label="scenarios" tabSet="public">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 2px 6px' }}>
        <div style={{ fontSize: 20, color: '#7a7770' }}>←</div>
        <div>
          <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Scénario</div>
          <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1 }}>Et si je perds ma mission ?</div>
        </div>
      </div>

      {/* Inputs */}
      <ScenarioCard>
        <div style={{ fontSize: 12, color: '#7a7770', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>PARAMÈTRES</div>
        <SliderRow label="Mois sans CA" value={6} min={0} max={18} unit=" mois" />
        <SliderRow label="Réduction des dépenses" value={20} min={0} max={50} unit="%" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#3a3a3a' }}>
          <div style={{ width: 14, height: 14, border: '1.2px solid #1F1F1F', borderRadius: 3, background: '#1F1F1F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 14 14"><path d="M2 7 L 6 11 L 12 3" stroke="#fff" strokeWidth="2" fill="none" /></svg>
          </div>
          Maintenir le DCA
        </div>
      </ScenarioCard>

      {/* Projection */}
      <ScenarioCard>
        <div style={{ fontSize: 12, color: '#7a7770', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>PROJECTION</div>
        {/* mini chart: trésorerie SASU over 12 mois */}
        <svg width="100%" height="90" viewBox="0 0 320 90" preserveAspectRatio="none">
          <line x1="0" y1="80" x2="320" y2="80" stroke="#1F1F1F" strokeWidth="1" />
          <line x1="0" y1="0" x2="0" y2="80" stroke="#1F1F1F" strokeWidth="1" />
          {/* Threshold */}
          <line x1="0" y1="60" x2="320" y2="60" stroke="var(--watch)" strokeWidth="0.8" strokeDasharray="3 3" />
          <text x="318" y="56" textAnchor="end" fontSize="9" fill="var(--watch)">seuil 10k€</text>
          {/* SASU line */}
          <path d="M 0 12 L 30 16 L 60 24 L 90 32 L 120 40 L 150 50 L 180 58 L 210 66 L 240 72 L 270 76 L 300 78" fill="none" stroke="var(--pro)" strokeWidth="2" />
          {/* Perso line */}
          <path d="M 0 28 L 40 38 L 80 48 L 120 56 L 160 62 L 200 70 L 240 74 L 280 78 L 320 79" fill="none" stroke="var(--perso)" strokeWidth="2" />
          {/* Crossing */}
          <circle cx="155" cy="51" r="3" fill="var(--watch)" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#7a7770', marginTop: 2 }}>
          <span>M0</span><span>M3</span><span>M6</span><span>M9</span><span>M12</span>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 11 }}>
          <span style={{ color: 'var(--pro)' }}>● Trésorerie SASU</span>
          <span style={{ color: 'var(--perso)' }}>● Cash perso</span>
        </div>
      </ScenarioCard>

      {/* Verdict */}
      <Verdict tone="watch" title="VIVABLE MAIS À SURVEILLER">
        Tu tiens <b>10,5 mois</b> avant de passer sous ton seuil de sécurité.
        En <b>M6</b>, ta trésorerie SASU touche le seuil 10 k€.<br/>
        <span style={{ color: '#6b6b6b' }}>Recommandé : suspendre le DCA SASU en M4.</span>
      </Verdict>

      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <BigButton secondary>Sauvegarder</BigButton>
        <BigButton>Appliquer →</BigButton>
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// Tax regimes — dividend taxation by country
// ════════════════════════════════════════════════════════════════
const DIV_REGIMES = {
  FR: {
    flag: '🇫🇷', name: 'France', currency: '€',
    rate: 0.30, label: 'PFU 30%',
    breakdown: 'IR 12,8% + PS 17,2%',
    note: 'Option barème progressif possible si plus avantageux.',
  },
  BE: {
    flag: '🇧🇪', name: 'Belgique', currency: '€',
    rate: 0.30, label: 'Précompte mobilier 30%',
    breakdown: 'précompte libératoire',
    note: 'Régime VVPRbis : 15% si conditions réunies.',
  },
  MA: {
    flag: '🇲🇦', name: 'Maroc', currency: 'MAD',
    rate: 0.15, label: 'TPA 15%',
    breakdown: 'Taxe sur Produits des Actions · libératoire',
    note: 'Retenue à la source par la société distributrice.',
  },
  ES: {
    flag: '🇪🇸', name: 'Espagne', currency: '€',
    rate: 0.21, label: 'Tranches 19→27%',
    breakdown: '19% < 6k · 21% < 50k · 23% < 200k · 27% au-delà',
    note: 'Barème progressif appliqué automatiquement.',
  },
  DE: {
    flag: '🇩🇪', name: 'Allemagne', currency: '€',
    rate: 0.26375, label: 'Abgeltungsteuer 26,4%',
    breakdown: '25% + Soli 5,5% + Kirchensteuer (opt.)',
    note: 'Abattement annuel : 1 000 € (Sparerpauschbetrag).',
  },
  PT: {
    flag: '🇵🇹', name: 'Portugal', currency: '€',
    rate: 0.28, label: 'Flat 28%',
    breakdown: 'retenue libératoire',
    note: 'Option pour englobement dans IR si tranche basse.',
  },
  CH: {
    flag: '🇨🇭', name: 'Suisse', currency: 'CHF',
    rate: 0.35, label: 'Impôt anticipé 35%',
    breakdown: 'récupérable via déclaration · taux effectif variable',
    note: 'Imposition cantonale + fédérale finale.',
  },
  UK: {
    flag: '🇬🇧', name: 'Royaume-Uni', currency: '£',
    rate: 0.3375, label: 'Tranches 8,75→39,35%',
    breakdown: '£500 abattement · 8,75 / 33,75 / 39,35%',
    note: 'Taux médian (higher rate) appliqué par défaut.',
  },
};

function CountryChip({ regime, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '4px 9px', borderRadius: 999,
      border: active ? '1.6px solid #1F1F1F' : '1.2px solid #d4d0c2',
      background: active ? '#1F1F1F' : 'var(--paper)',
      color: active ? '#fff' : '#1F1F1F',
      fontFamily: "'Patrick Hand', sans-serif", fontSize: 12,
      cursor: 'pointer', whiteSpace: 'nowrap',
      boxShadow: active ? '2px 2px 0 0 rgba(31,31,31,0.12)' : 'none',
    }}>
      <span style={{ fontSize: 14 }}>{regime.flag}</span>
      {regime.name}
    </button>
  );
}

// ════════════════════════════════════════════════════════════════
// Scénario B — Combien sortir en dividende ? (country-aware)
// ════════════════════════════════════════════════════════════════
function ScreenScenarioDividende({ defaultCountry = 'FR' }) {
  const [country, setCountry] = React.useState(defaultCountry);
  const [brut, setBrut] = React.useState(30000);
  const tresorerie = 42800;
  const regime = DIV_REGIMES[country];
  const cur = regime.currency;

  // Per-country: convert tresorerie if non-EUR (simple wireframe approximation)
  const fxFromEUR = country === 'MA' ? 10.85 : country === 'CH' ? 0.95 : country === 'UK' ? 0.85 : 1;
  const tresoLocal = Math.round(tresorerie * fxFromEUR);
  const brutLocal = Math.min(brut, tresoLocal);
  const net = Math.round(brutLocal * (1 - regime.rate));
  const tax = brutLocal - net;
  const cashRestant = tresoLocal - brutLocal;
  const runwayBefore = 14;
  const runwayAfter = Math.max(0, Math.round((cashRestant / tresoLocal) * runwayBefore));
  const tone = runwayAfter < 4 ? 'risk' : runwayAfter < 7 ? 'watch' : 'safe';
  const toneTitle = tone === 'safe' ? 'OK · MARGE CONFORTABLE' : tone === 'watch' ? 'OK MAIS LIMITE' : 'TROP AGRESSIF';

  return (
    <PhoneFrame label="scenarios" tabSet="public">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 2px 6px' }}>
        <div style={{ fontSize: 20, color: '#7a7770' }}>←</div>
        <div>
          <div style={{ fontSize: 11, color: 'var(--pro)', textTransform: 'uppercase', letterSpacing: 1 }}>Scénario · pro</div>
          <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1 }}>Combien sortir en dividende ?</div>
        </div>
      </div>

      {/* Country selector */}
      <ScenarioCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <div style={{ fontSize: 12, color: '#7a7770', fontWeight: 700, letterSpacing: 1 }}>RÉGIME FISCAL</div>
          <div style={{ fontSize: 10, color: '#7a7770' }}>réglé sur ton pays</div>
        </div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4, marginBottom: 6 }}>
          {Object.entries(DIV_REGIMES).map(([code, r]) => (
            <CountryChip key={code} regime={r} active={code === country} onClick={() => setCountry(code)} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px dashed #c9c6bd', paddingTop: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>{regime.flag} {regime.label}</div>
          <div style={{ fontSize: 11, color: '#6b6b6b' }}>{cur}</div>
        </div>
        <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 2, lineHeight: 1.35 }}>
          {regime.breakdown}<br/>
          <span style={{ fontStyle: 'italic' }}>{regime.note}</span>
        </div>
      </ScenarioCard>

      {/* Input — brut */}
      <ScenarioCard>
        <div style={{ fontSize: 12, color: '#7a7770', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>MONTANT BRUT</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, justifyContent: 'center', padding: '4px 0' }}>
          <div className="caveat" style={{ fontSize: 52, fontWeight: 700, lineHeight: 1 }}>{brutLocal.toLocaleString('fr-FR')}</div>
          <div style={{ fontSize: 18, color: '#7a7770' }}>{cur}</div>
        </div>
        <input type="range" min={0} max={tresoLocal} step={500}
          value={brutLocal}
          onChange={(e) => setBrut(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#2563EB' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#7a7770' }}>
          <span>0</span><span>plafond {tresoLocal.toLocaleString('fr-FR')} {cur}</span>
        </div>
      </ScenarioCard>

      {/* Impact 3 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 8 }}>
        <SketchCard style={{ padding: '8px 6px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#7a7770', textTransform: 'uppercase' }}>Net</div>
          <div className="caveat" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1 }}>{net.toLocaleString('fr-FR')}</div>
          <div style={{ fontSize: 9, color: '#7a7770' }}>{cur} · {regime.label}</div>
        </SketchCard>
        <SketchCard style={{ padding: '8px 6px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#7a7770', textTransform: 'uppercase' }}>Impôt</div>
          <div className="caveat" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: 'var(--risk)' }}>{tax.toLocaleString('fr-FR')}</div>
          <div style={{ fontSize: 9, color: '#7a7770' }}>{cur}</div>
        </SketchCard>
        <SketchCard accent="pro" style={{ padding: '8px 6px', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: 'var(--pro)', textTransform: 'uppercase' }}>Reste</div>
          <div className="caveat" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1, color: 'var(--pro)' }}>{cashRestant.toLocaleString('fr-FR')}</div>
          <div style={{ fontSize: 9, color: '#7a7770' }}>société</div>
        </SketchCard>
      </div>

      {/* Niveau risque */}
      <ScenarioCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 12, color: '#7a7770', fontWeight: 700, letterSpacing: 1 }}>RUNWAY APRÈS DISTRIBUTION</div>
          <div className="mono" style={{ fontSize: 13, fontWeight: 600, color: tone === 'safe' ? 'var(--safe)' : tone === 'watch' ? 'var(--watch)' : 'var(--risk)' }}>
            {runwayAfter} m <span style={{ color: '#bdb9ad' }}>vs {runwayBefore} m</span>
          </div>
        </div>
        <div style={{ marginTop: 6 }}>
          <ProgressBar value={Math.min(100, runwayAfter * 8)} color={tone === 'safe' ? 'var(--safe)' : tone === 'watch' ? 'var(--watch)' : 'var(--risk)'} height={10} />
        </div>
      </ScenarioCard>

      <Verdict tone={tone} title={toneTitle}>
        Brut <b>{brutLocal.toLocaleString('fr-FR')} {cur}</b> → net <b>{net.toLocaleString('fr-FR')} {cur}</b> ({regime.label}).
        Cash société restant : <b>{cashRestant.toLocaleString('fr-FR')} {cur}</b> — runway ~{runwayAfter} mois.
        {tone === 'risk' && <><br/><span style={{ color: '#6b6b6b' }}>Suggéré : viser <b>~{Math.round(tresoLocal * 0.4).toLocaleString('fr-FR')} {cur}</b> pour rester &gt; 6 m.</span></>}
      </Verdict>

      <div style={{ marginTop: 10 }}>
        <BigButton accent="pro">Programmer la distribution</BigButton>
      </div>
    </PhoneFrame>
  );
}

function ScreenScenarioDividendeMA() {
  return <ScreenScenarioDividende defaultCountry="MA" />;
}

// ════════════════════════════════════════════════════════════════
// Scénario C — Puis-je acheter ce bien ?
// ════════════════════════════════════════════════════════════════
function ScreenScenarioAchat() {
  return (
    <PhoneFrame label="scenarios" tabSet="public">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 2px 6px' }}>
        <div style={{ fontSize: 20, color: '#7a7770' }}>←</div>
        <div>
          <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Scénario</div>
          <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1 }}>Puis-je acheter ce bien ?</div>
        </div>
      </div>

      <ScenarioCard>
        <div style={{ fontSize: 12, color: '#7a7770', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>LE BIEN</div>
        <SketchInput label="Prix" value="85 000" suffix="€" />
        <SketchInput label="Apport souhaité" value="20 000" suffix="€" />
        <SketchInput label="Mensualité crédit" value="380" suffix="€/mois" />
      </ScenarioCard>

      <ScenarioCard>
        <div style={{ fontSize: 12, color: '#7a7770', fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>IMPACT</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770' }}>Cash perso après apport</div>
            <div className="mono" style={{ fontSize: 17, fontWeight: 600 }}>—4 000 €</div>
            <div style={{ fontSize: 10, color: 'var(--risk)' }}>insuffisant</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770' }}>Runway perso</div>
            <div className="mono" style={{ fontSize: 17, fontWeight: 600, color: 'var(--risk)' }}>—1,4 mois</div>
            <div style={{ fontSize: 10, color: 'var(--risk)' }}>passe sous 6 m</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770' }}>Dépenses /mois</div>
            <div className="mono" style={{ fontSize: 17, fontWeight: 600 }}>+380 €</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770' }}>Objectif Tanger</div>
            <div className="mono" style={{ fontSize: 17, fontWeight: 600, color: 'var(--watch)' }}>—8 mois</div>
            <div style={{ fontSize: 10, color: '#7a7770' }}>décalage</div>
          </div>
        </div>
      </ScenarioCard>

      <Verdict tone="risk" title="DÉCONSEILLÉ EN L'ÉTAT">
        Apport épuise ton cash perso. Plan B : <b>sortir 10 k€ de dividende</b> + apport réduit à 15 k€ → faisable, runway à 6 m, Tanger préservé.
      </Verdict>

      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <BigButton secondary>Tester plan B</BigButton>
        <BigButton>Modifier</BigButton>
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, {
  ScenarioCard, SliderRow, Verdict,
  DIV_REGIMES, CountryChip,
  ScreenScenariosList, ScreenScenarioMission, ScreenScenarioDividende, ScreenScenarioDividendeMA, ScreenScenarioAchat,
});
