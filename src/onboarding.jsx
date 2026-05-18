/* onboarding.jsx — 6-step onboarding wizard */

// Defined outside OnbWizard to avoid re-creating on every render
function OnbStepShell({ footer, children }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex', flexDirection: 'column',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 8px' }}>
        {children}
      </div>
      <div style={{
        flexShrink: 0,
        padding: '10px 20px 32px',
        background: '#FAF8F1',
        borderTop: '1px solid #f0ede6',
      }}>
        {footer}
      </div>
    </div>
  );
}

function OnbWizard({ onDone }) {
  const { state, dispatch } = useStore();
  const [step, setStep] = React.useState(1);

  const [country, setCountry] = React.useState(state.profile.country || 'FR');
  const [profileType, setProfileType] = React.useState(state.profile.profileType || '');
  const [selectedComptes, setSelectedComptes] = React.useState([]);
  const [objectifPrincipal, setObjectifPrincipal] = React.useState(state.profile.objectifPrincipal || '');
  const [figures, setFigures] = React.useState({
    revenuMensuel: state.revenuMensuel || 0,
    depensesTotal: state.depensesTotal || 0,
    cashPerso: state.cashPerso || 0,
    tresorerie: state.pro.tresorerie || 0,
    dcaTotal: state.dcaTotal || 0,
    investTotal: state.investTotal || 0,
  });

  const isSociete = profileType === 'freelance-societe' || profileType === 'mixte';
  const totalSteps = 6;

  function goNext() { setStep(s => Math.min(s + 1, totalSteps)); }
  function goBack() { setStep(s => Math.max(s - 1, 1)); }

  function handleFinish() {
    dispatch('SET_PROFILE', { profileType, objectifPrincipal, country, currency: (COUNTRIES.find(c => c.code === country) || {}).symbol || '€' });
    dispatch('FINISH_ONBOARDING', {
      revenuMensuel: Number(figures.revenuMensuel) || 0,
      depensesTotal: Number(figures.depensesTotal) || 0,
      cashPerso: Number(figures.cashPerso) || 0,
      dcaTotal: Number(figures.dcaTotal) || 0,
      investTotal: Number(figures.investTotal) || 0,
      pro: { ...state.pro, tresorerie: Number(figures.tresorerie) || 0 },
    });
    onDone && onDone();
  }

  const previewRunwayPerso = figures.depensesTotal > 0 ? figures.cashPerso / figures.depensesTotal : 0;
  const previewRunwayPro = isSociete && figures.tresorerie > 0 && figures.revenuMensuel > 0
    ? figures.tresorerie / (figures.revenuMensuel * 0.3) : 0;
  const previewDcaPct = figures.revenuMensuel > 0 ? (figures.dcaTotal / figures.revenuMensuel) * 100 : 0;
  const previewPatrimoine = (Number(figures.cashPerso) || 0) + (Number(figures.investTotal) || 0) + (Number(figures.tresorerie) || 0);
  const previewInsightTone = previewRunwayPerso < 3 ? 'risk' : previewRunwayPerso < 6 ? 'watch' : 'safe';

  // ── Step 1: Pays ────────────────────────────────────────────────
  if (step === 1) {
    return (
      <OnbStepShell footer={<Btn onClick={goNext} accent="pro">Continuer →</Btn>}>
        <StepDots step={1} total={totalSteps} />
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Étape 1 / 6</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>Ton compte</div>
        <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 16, lineHeight: 1.4 }}>
          Pays et devise déterminent la fiscalité (dividendes, plus-values) appliquée par défaut.
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#1F1F1F', marginBottom: 8 }}>PAYS DE RÉSIDENCE</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
          {COUNTRIES.map(c => (
            <button key={c.code} onClick={() => setCountry(c.code)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 10px', borderRadius: 999,
              border: country === c.code ? '1.6px solid #1F1F1F' : '1.2px solid #c9c6bd',
              background: country === c.code ? '#1F1F1F' : '#FAF8F1',
              color: country === c.code ? '#fff' : '#1F1F1F',
              fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
              fontFamily: 'Inter, system-ui, sans-serif',
            }}>
              <span>{c.flag}</span>{c.name}
            </button>
          ))}
        </div>
        {(() => {
          const c = COUNTRIES.find(x => x.code === country);
          const regime = DIV_REGIMES[country];
          return c && regime ? (
            <Card dashed style={{ marginBottom: 12, padding: '8px 12px' }}>
              <div style={{ fontSize: 12, color: '#6b6b6b', lineHeight: 1.5 }}>
                <b style={{ color: '#1F1F1F' }}>{c.flag} {c.name}</b> · les dividendes seront calculés avec <b>{regime.label}</b> par défaut.
                <span style={{ fontStyle: 'italic' }}> Modifiable à tout moment.</span>
              </div>
            </Card>
          ) : null;
        })()}
      </OnbStepShell>
    );
  }

  // ── Step 2: Profil ──────────────────────────────────────────────
  if (step === 2) {
    const profiles = [
      { id: 'salarie', emoji: '◐', label: 'Salarié', sub: 'CDI · CDD · fonctionnaire' },
      { id: 'freelance-micro', emoji: '◑', label: 'Freelance micro-entreprise', sub: 'auto-entrepreneur · BNC' },
      { id: 'freelance-societe', emoji: '◧', label: 'Freelance en société', sub: 'SASU · EURL · SARL' },
      { id: 'mixte', emoji: '◨', label: 'Revenus mixtes', sub: 'salaire + missions + dividendes' },
      { id: 'investisseur', emoji: '◇', label: 'Investisseur', sub: 'immobilier · bourse · crypto' },
      { id: 'curieux', emoji: '○', label: 'Curieux', sub: 'juste suivre mon patrimoine' },
    ];
    return (
      <OnbStepShell footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="secondary" onClick={goBack} style={{ flex: 1 }}>← Retour</Btn>
          <Btn onClick={goNext} accent="pro" disabled={!profileType} style={{ flex: 2 }}>Continuer →</Btn>
        </div>
      }>
        <StepDots step={2} total={totalSteps} />
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Étape 2 / 6</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>Quel est ton profil ?</div>
        <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 14, lineHeight: 1.4 }}>
          Sélectionne ce qui te ressemble le plus. Tu pourras affiner ensuite.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {profiles.map(p => (
            <ChoiceCard key={p.id} emoji={p.emoji} sub={p.sub} selected={profileType === p.id} accent={p.id === 'freelance-societe' ? 'pro' : undefined} onClick={() => setProfileType(p.id)}>
              {p.label}
            </ChoiceCard>
          ))}
        </div>
      </OnbStepShell>
    );
  }

  // ── Step 3: Comptes ─────────────────────────────────────────────
  if (step === 3) {
    const opts = [
      { id: 'courant', label: 'Compte courant' },
      { id: 'livret', label: 'Livrets · épargne' },
      { id: 'pea', label: 'PEA · CTO' },
      { id: 'av', label: 'Assurance-vie' },
      { id: 'crypto', label: 'Crypto' },
      { id: 'societe', label: 'Compte société', accent: 'pro' },
      { id: 'immo', label: 'Immobilier' },
      { id: 'dettes', label: 'Crédits · dettes' },
    ];
    function toggle(id) {
      setSelectedComptes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    }
    return (
      <OnbStepShell footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="secondary" onClick={goBack} style={{ flex: 1 }}>← Retour</Btn>
          <Btn onClick={goNext} accent="pro" style={{ flex: 2 }}>Continuer →</Btn>
        </div>
      }>
        <StepDots step={3} total={totalSteps} />
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Étape 3 / 6</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>Que veux-tu suivre ?</div>
        <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 14, lineHeight: 1.4 }}>
          Coche tout ce que tu possèdes. Détails à remplir plus tard.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {opts.map(o => (
            <ChoiceCard key={o.id} selected={selectedComptes.includes(o.id)} accent={o.accent} onClick={() => toggle(o.id)}>
              {o.label}
            </ChoiceCard>
          ))}
        </div>
      </OnbStepShell>
    );
  }

  // ── Step 4: Objectif ────────────────────────────────────────────
  if (step === 4) {
    const goals = [
      { id: 'tresorerie', emoji: '$', label: 'Sécuriser ma trésorerie', sub: 'constituer 3-12 mois de runway' },
      { id: 'immo', emoji: '⌂', label: 'Acheter un bien immobilier', sub: 'résidence ou investissement' },
      { id: 'investir', emoji: '↗', label: 'Investir régulièrement', sub: 'DCA régulier ETF/PEA' },
      { id: 'dividendes', emoji: '◐', label: 'Sortir des dividendes', sub: 'optimiser flat tax + cash libre' },
      { id: 'transition', emoji: '◠', label: 'Préparer une période sans revenu', sub: 'sabbatique · transition pro' },
      { id: 'liberte', emoji: '∞', label: 'Liberté financière', sub: 'long terme · revenus passifs' },
    ];
    return (
      <OnbStepShell footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="secondary" onClick={goBack} style={{ flex: 1 }}>← Retour</Btn>
          <Btn onClick={goNext} accent="pro" disabled={!objectifPrincipal} style={{ flex: 2 }}>Continuer →</Btn>
        </div>
      }>
        <StepDots step={4} total={totalSteps} />
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Étape 4 / 6</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 6 }}>Quel est ton objectif principal ?</div>
        <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 14, lineHeight: 1.4 }}>
          Un seul, pour l'instant. On en ajoutera d'autres ensuite.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {goals.map(g => (
            <ChoiceCard key={g.id} emoji={g.emoji} sub={g.sub} selected={objectifPrincipal === g.id} onClick={() => setObjectifPrincipal(g.id)}>
              {g.label}
            </ChoiceCard>
          ))}
        </div>
      </OnbStepShell>
    );
  }

  // ── Step 5: Chiffres ────────────────────────────────────────────
  if (step === 5) {
    function setFig(key, val) { setFigures(f => ({ ...f, [key]: val })); }
    return (
      <OnbStepShell footer={
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="secondary" onClick={goBack} style={{ flex: 1 }}>← Retour</Btn>
          <Btn onClick={goNext} accent="pro" style={{ flex: 2 }}>Voir mon cockpit →</Btn>
        </div>
      }>
        <StepDots step={5} total={totalSteps} />
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Étape 5 / 6</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 4 }}>Quelques chiffres clés</div>
        <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 14, lineHeight: 1.4 }}>
          Estimation suffit. Tu pourras ajuster à tout moment.
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, marginTop: 4 }}>REVENUS</div>
        <Input label="Revenu mensuel net moyen" value={figures.revenuMensuel || ''} onChange={v => setFig('revenuMensuel', v)} placeholder="3 000" suffix="€/mois" type="number" />
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, marginTop: 4 }}>DÉPENSES</div>
        <Input label="Dépenses mensuelles" value={figures.depensesTotal || ''} onChange={v => setFig('depensesTotal', v)} placeholder="1 800" suffix="€/mois" type="number" />
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, marginTop: 4 }}>CASH</div>
        <Input label="Cash perso disponible" value={figures.cashPerso || ''} onChange={v => setFig('cashPerso', v)} placeholder="10 000" suffix="€" type="number" />
        {isSociete && (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#2563EB', marginBottom: 4, marginTop: 4 }}>SOCIÉTÉ (optionnel)</div>
            <Input label="Trésorerie société" value={figures.tresorerie || ''} onChange={v => setFig('tresorerie', v)} placeholder="30 000" suffix="€" type="number" />
          </>
        )}
        <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, marginTop: 4 }}>INVESTISSEMENTS</div>
        <Input label="Total investi (ETF, crypto…)" value={figures.investTotal || ''} onChange={v => setFig('investTotal', v)} placeholder="0" suffix="€" type="number" />
        <Input label="DCA mensuel total" value={figures.dcaTotal || ''} onChange={v => setFig('dcaTotal', v)} placeholder="0" suffix="€/mois" type="number" />
      </OnbStepShell>
    );
  }

  // ── Step 6: Insight ─────────────────────────────────────────────
  if (step === 6) {
    const toneLabel = previewInsightTone === 'safe' ? 'SITUATION SAINE' : previewInsightTone === 'watch' ? 'À SURVEILLER' : 'ATTENTION';
    const toneCol = toneColor(previewInsightTone);
    return (
      <OnbStepShell footer={<Btn onClick={handleFinish}>Entrer dans le cockpit →</Btn>}>
        <StepDots step={6} total={totalSteps} />
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Étape 6 / 6</div>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 14 }}>Voilà ton point de départ.</div>
        <Card style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Patrimoine net estimé</div>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 42, fontWeight: 700, lineHeight: 1 }}>{fmtShort(previewPatrimoine)}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 12, flexWrap: 'wrap' }}>
            <span style={{ color: '#1F1F1F' }}>● Cash {fmtShort(figures.cashPerso || 0)}</span>
            <span style={{ color: '#7C3AED' }}>● Invest. {fmtShort(figures.investTotal || 0)}</span>
            {isSociete && <span style={{ color: '#2563EB' }}>● Société {fmtShort(figures.tresorerie || 0)}</span>}
          </div>
        </Card>
        <Card style={{ marginBottom: 10, borderColor: toneCol }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: toneCol, display: 'inline-block' }} />
            <div style={{ fontSize: 12, color: toneCol, fontWeight: 700, letterSpacing: 1 }}>{toneLabel}</div>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: '#2a2a2a' }}>
            Tu as <b>{Math.round(previewRunwayPerso * 10) / 10} mois</b> de sécurité perso
            {isSociete && previewRunwayPro > 0 && <> et <b>{Math.round(previewRunwayPro * 10) / 10} mois</b> de sécurité société</>}.
            {figures.dcaTotal > 0 && <> Ton DCA de <b>{fmt(figures.dcaTotal)}</b> représente <b>{Math.round(previewDcaPct)}%</b> de tes revenus.</>}
          </div>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>PROCHAINES ÉTAPES</div>
          <div style={{ fontSize: 13, color: '#3a3a3a', lineHeight: 1.6 }}>
            → Ajouter tes comptes et dépenses réels<br/>
            → Tester un scénario : <i>« et si je perds ma mission ? »</i><br/>
            → Créer tes objectifs financiers
          </div>
        </Card>
      </OnbStepShell>
    );
  }

  return null;
}

Object.assign(window, { OnbWizard });
