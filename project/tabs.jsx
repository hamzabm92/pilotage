/* PRO and PERSO tab wireframes */

// ════════════════════════════════════════════════════════════════
// PRO Tab
// ════════════════════════════════════════════════════════════════
function TabPRO({ data }) {
  const d = data;
  const [divBrut, setDivBrut] = React.useState(15000);
  const flatTax = 0.30;
  const divNet = Math.round(divBrut * (1 - flatTax));
  const cashRestant = Math.max(0, d.pro.tresorerie - divBrut);
  const risque = cashRestant < 10000 ? 'risk' : cashRestant < 20000 ? 'watch' : 'safe';
  const risqueLabel = risque === 'safe' ? 'OK' : risque === 'watch' ? 'À surveiller' : 'Risqué';
  const risqueColor = risque === 'safe' ? 'var(--safe)' : risque === 'watch' ? 'var(--watch)' : 'var(--risk)';

  return (
    <PhoneFrame label="pro">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1 }}>PRO · SASU</div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Société</div>
        </div>
        <Chip accent="pro">freelance</Chip>
      </div>
      <div style={{ fontSize: 12, color: '#7a7770', padding: '2px 2px 8px' }}>K. Bensaïd Consulting · SASU</div>

      {/* Mission + activity card */}
      <SketchCard accent="pro" accentSide="top" style={{ marginBottom: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>TJM</div>
            <div className="caveat" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{d.pro.tjm} €</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Jours / mois</div>
            <div className="caveat" style={{ fontSize: 26, fontWeight: 700, lineHeight: 1 }}>{d.pro.jours}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>CA mensuel est.</div>
            <div className="mono" style={{ fontSize: 17, fontWeight: 600 }}>{(d.pro.ca).toLocaleString('fr-FR')} €</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Mission jusqu'à</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{d.pro.missionEnd}</div>
            <Wobble width={70} color="var(--pro)" style={{ marginTop: 2 }} />
          </div>
        </div>
      </SketchCard>

      {/* Trésorerie */}
      <SketchCard accent="pro" style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 12, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1 }}>TRÉSORERIE SASU</div>
          <div className="mono" style={{ fontSize: 10, color: '#7a7770' }}>Qonto · IBKR</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 6 }}>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770' }}>Brut</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 600 }}>{(d.pro.tresorerie).toLocaleString('fr-FR')} €</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770' }}>Libre après obligations</div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 600, color: 'var(--pro)' }}>{Math.round(d.pro.tresorerie * 0.62).toLocaleString('fr-FR')} €</div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: '#8a8a8a', marginTop: 4, fontStyle: 'italic' }}>
          — IS, TVA, charges sociales déduites
        </div>
      </SketchCard>

      {/* DCA */}
      <SketchCard accent="pro" style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1 }}>DCA IBKR</div>
            <div style={{ fontSize: 11, color: '#7a7770', marginTop: 1 }}>auto · le 5 du mois</div>
          </div>
          <div className="caveat" style={{ fontSize: 26, fontWeight: 700 }}>{d.pro.dca} €<span style={{ fontSize: 12, color: '#7a7770' }}>/mois</span></div>
        </div>
      </SketchCard>

      {/* Simulateur dividende */}
      <SketchCard accent="pro" style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1 }}>SIMULATEUR DIVIDENDE</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: '#7a7770', marginBottom: 2 }}>Montant brut</div>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.2px solid #1F1F1F', borderRadius: 8, padding: '4px 8px' }}>
              <input
                type="number"
                value={divBrut}
                onChange={e => setDivBrut(Number(e.target.value) || 0)}
                style={{ border: 0, outline: 0, width: '100%', background: 'transparent', fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 600 }}
              />
              <span style={{ color: '#7a7770' }}>€</span>
            </div>
            <input type="range" min="0" max={d.pro.tresorerie} step="500" value={Math.min(divBrut, d.pro.tresorerie)}
              onChange={e => setDivBrut(Number(e.target.value))}
              style={{ width: '100%', marginTop: 6, accentColor: '#2563EB' }} />
          </div>
        </div>
        <div style={{ borderTop: '1px dashed #c9c6bd', marginTop: 8, paddingTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770' }}>Net estimé (PFU 30%)</div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 600 }}>{divNet.toLocaleString('fr-FR')} €</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#7a7770' }}>Cash restant SASU</div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 600 }}>{cashRestant.toLocaleString('fr-FR')} €</div>
          </div>
        </div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 11, color: '#7a7770' }}>Niveau de risque</div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            border: `1.2px solid ${risqueColor}`, color: risqueColor,
            padding: '1px 8px', borderRadius: 999,
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 0.5,
          }}>● {risqueLabel}</span>
        </div>
      </SketchCard>

      {/* Runway */}
      <SketchCard accent="pro">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 12, color: 'var(--pro)', fontWeight: 700, letterSpacing: 1 }}>RUNWAY SASU</div>
          <div className="mono" style={{ fontSize: 10, color: '#7a7770' }}>sans nouveau CA</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
          <div className="caveat" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>{d.pro.runway}</div>
          <div style={{ color: '#7a7770' }}>mois</div>
        </div>
        <div style={{ marginTop: 6 }}>
          <ProgressBar value={Math.min(100, d.pro.runway * 8)} color={d.pro.runway < 6 ? 'var(--watch)' : 'var(--pro)'} height={10} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#888', marginTop: 2 }}>
            <span>0</span><span>6 mois (cible)</span><span>12+</span>
          </div>
        </div>
      </SketchCard>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// PERSO Tab
// ════════════════════════════════════════════════════════════════
function TabPERSO({ data }) {
  const d = data;
  const breakdown = [
    { label: 'Cash', value: 16000, color: '#1F1F1F' },
    { label: 'eToro', value: 12370, color: '#7C3AED' },
    { label: 'Revolut Trading', value: 6208, color: '#9b6bf0' },
    { label: 'PEA', value: 4336, color: '#b58df3' },
  ];
  const totalFin = breakdown.reduce((a, b) => a + b.value, 0);

  const tangerProgress = Math.round((d.perso.tanger / d.perso.tangerTotal) * 100);

  return (
    <PhoneFrame label="perso">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '0 2px' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--perso)', fontWeight: 700, letterSpacing: 1 }}>PERSO</div>
          <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>Patrimoine perso</div>
        </div>
        <Chip accent="perso">vous</Chip>
      </div>

      {/* Total patrimoine */}
      <SketchCard accent="perso" accentSide="top" style={{ margin: '8px 0 10px' }}>
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Patrimoine financier perso</div>
        <div className="caveat" style={{ fontSize: 38, fontWeight: 700, lineHeight: 1, marginTop: 2 }}>{(totalFin).toLocaleString('fr-FR')} €</div>
        <div style={{ fontSize: 11, color: '#6b6b6b', marginTop: 4 }}>hors immobilier · {fmt(totalFin + d.perso.tanger)} avec Tanger versé</div>

        {/* Stacked bar breakdown */}
        <div style={{ display: 'flex', height: 10, marginTop: 8, borderRadius: 6, overflow: 'hidden', border: '1px solid #1F1F1F' }}>
          {breakdown.map((b, i) => (
            <div key={i} style={{ flex: b.value, background: b.color }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px', marginTop: 6, fontSize: 11, color: '#3a3a3a' }}>
          {breakdown.map(b => (
            <span key={b.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: b.color, display: 'inline-block' }} />
              {b.label} · <span className="mono">{b.value.toLocaleString('fr-FR')}</span>
            </span>
          ))}
        </div>
      </SketchCard>

      {/* DCA PEA */}
      <SketchCard accent="perso" style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--perso)', fontWeight: 700, letterSpacing: 1 }}>DCA PEA</div>
            <div style={{ fontSize: 11, color: '#7a7770', marginTop: 1 }}>auto · le 10 du mois</div>
          </div>
          <div className="caveat" style={{ fontSize: 26, fontWeight: 700 }}>{d.perso.dca} €<span style={{ fontSize: 12, color: '#7a7770' }}>/mois</span></div>
        </div>
      </SketchCard>

      {/* Appartement Tanger */}
      <SketchCard accent="perso" style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 12, color: 'var(--perso)', fontWeight: 700, letterSpacing: 1 }}>APPARTEMENT TANGER</div>
          <div className="mono" style={{ fontSize: 10, color: '#7a7770' }}>livraison Q3 2027</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 6 }}>
          <div>
            <div style={{ fontSize: 10, color: '#7a7770' }}>Total</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{d.perso.tangerTotal.toLocaleString('fr-FR')} €</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#7a7770' }}>Versé</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 600, color: 'var(--perso)' }}>{d.perso.tanger.toLocaleString('fr-FR')} €</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: '#7a7770' }}>Restant</div>
            <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>{(d.perso.tangerTotal - d.perso.tanger).toLocaleString('fr-FR')} €</div>
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <ProgressBar value={tangerProgress} color="var(--perso)" height={10} label="Avancement paiement" />
        </div>
      </SketchCard>

      {/* Runway perso */}
      <SketchCard accent="perso" style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontSize: 12, color: 'var(--perso)', fontWeight: 700, letterSpacing: 1 }}>RUNWAY PERSO</div>
          <div className="mono" style={{ fontSize: 10, color: '#7a7770' }}>cash dispo / dépenses</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
          <div className="caveat" style={{ fontSize: 36, fontWeight: 700, lineHeight: 1 }}>{d.perso.runway}</div>
          <div style={{ color: '#7a7770' }}>mois de cash</div>
        </div>
        <div style={{ marginTop: 4, fontSize: 11, color: '#7a7770' }}>
          base : <span className="mono">~{Math.round(d.perso.cash / d.perso.runway).toLocaleString('fr-FR')} €/mois</span>
        </div>
      </SketchCard>

      {/* Objectif 2027 */}
      <SketchCard accent="perso" accentSide="top">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--perso)', fontWeight: 700, letterSpacing: 1 }}>OBJECTIF 2027</div>
            <div style={{ fontSize: 12, color: '#3a3a3a', marginTop: 1 }}>Solder Tanger + 30 k€ ETF</div>
          </div>
          <div className="caveat" style={{ fontSize: 28, fontWeight: 700 }}>{d.perso.target2027}%</div>
        </div>
        <div style={{ marginTop: 6 }}>
          <ProgressBar value={d.perso.target2027} color="var(--perso)" height={12} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: '#7a7770' }}>
          <span>Démarré jan. 2025</span><span>cible · déc. 2027</span>
        </div>
      </SketchCard>
    </PhoneFrame>
  );
}

Object.assign(window, { TabPRO, TabPERSO });
