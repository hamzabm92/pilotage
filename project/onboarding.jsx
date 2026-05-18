/* Onboarding flow sketches — public app */

// ─── Reusable input primitives ─────────────────────────────────
function SketchInput({ label, value, placeholder, suffix }) {
  return (
    <div style={{ marginBottom: 8 }}>
      {label && <div style={{ fontSize: 11, color: '#7a7770', marginBottom: 2 }}>{label}</div>}
      <div style={{ display: 'flex', alignItems: 'center', border: '1.2px solid #1F1F1F', borderRadius: 8, padding: '6px 10px', background: 'var(--paper)' }}>
        <div style={{ flex: 1, fontFamily: "'Patrick Hand', sans-serif", fontSize: 16, color: value ? '#1F1F1F' : '#bbb6a8' }}>
          {value || placeholder}
        </div>
        {suffix && <div style={{ color: '#7a7770', fontSize: 14 }}>{suffix}</div>}
      </div>
    </div>
  );
}

function BigButton({ children, accent, onClick, secondary }) {
  const color = accent === 'pro' ? '#2563EB' : accent === 'perso' ? '#7C3AED' : '#1F1F1F';
  return (
    <button onClick={onClick} style={{
      width: '100%',
      padding: '12px 14px',
      border: `1.4px solid ${color}`,
      background: secondary ? 'transparent' : color,
      color: secondary ? color : '#fff',
      borderRadius: 12,
      fontFamily: "'Patrick Hand', sans-serif",
      fontSize: 17,
      cursor: 'pointer',
      boxShadow: secondary ? 'none' : '2px 2px 0 0 rgba(31,31,31,0.12)',
    }}>{children}</button>
  );
}

function ChoiceCard({ children, selected, accent, sub, emoji }) {
  const color = accent === 'pro' ? 'var(--pro)' : accent === 'perso' ? 'var(--perso)' : '#1F1F1F';
  return (
    <div style={{
      border: selected ? `2px solid ${color}` : '1.4px solid #1F1F1F',
      borderRadius: 12,
      padding: '10px 12px',
      background: 'var(--paper)',
      boxShadow: selected ? '3px 3px 0 0 rgba(31,31,31,0.12)' : '2px 2px 0 0 rgba(31,31,31,0.06)',
      display: 'flex', gap: 10, alignItems: 'center',
      marginBottom: 8,
    }}>
      {emoji && <div style={{ fontSize: 22, opacity: 0.85, fontFamily: "'Caveat', cursive" }}>{emoji}</div>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600 }}>{children}</div>
        {sub && <div style={{ fontSize: 11, color: '#6b6b6b' }}>{sub}</div>}
      </div>
      <div style={{
        width: 18, height: 18, borderRadius: 4,
        border: `1.4px solid ${selected ? color : '#1F1F1F'}`,
        background: selected ? color : 'transparent',
        position: 'relative',
      }}>
        {selected && (
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ position: 'absolute', top: 1, left: 1 }}>
            <path d="M2 7 L 6 11 L 12 3" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </div>
  );
}

function StepDots({ step, total }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '10px 0' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i + 1 === step ? 22 : 8, height: 6,
          borderRadius: 4,
          background: i + 1 === step ? '#1F1F1F' : i + 1 < step ? '#6b6b6b' : '#d4d0c2',
          transition: 'all .2s',
        }} />
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// 01 — Welcome / Sign-up
// ════════════════════════════════════════════════════════════════
function OnbWelcome() {
  return (
    <PhoneFrame noTabs>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8px' }}>
          {/* Logo / mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <svg width="36" height="36" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#1F1F1F" strokeWidth="1.6" />
              <path d="M6 18 Q 18 6 30 18" stroke="var(--pro)" strokeWidth="1.6" fill="none" />
              <path d="M6 18 Q 18 30 30 18" stroke="var(--perso)" strokeWidth="1.6" fill="none" />
              <circle cx="18" cy="18" r="2.2" fill="#1F1F1F" />
            </svg>
            <div className="caveat" style={{ fontSize: 30, fontWeight: 700 }}>Pilotage</div>
          </div>

          <div style={{ fontSize: 26, lineHeight: 1.15, fontWeight: 700, marginBottom: 8 }}>
            Le cockpit financier pour piloter ta trajectoire.
          </div>
          <div style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.4 }}>
            Patrimoine, sécurité, scénarios. Sache combien tu peux dépenser, investir ou sortir sans mettre ta sécurité en danger.
          </div>

          <Wobble width={120} style={{ marginTop: 18 }} />

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <BigButton>Créer un compte</BigButton>
            <BigButton secondary>J'ai déjà un compte</BigButton>
          </div>

          <div style={{ fontSize: 11, color: '#7a7770', textAlign: 'center', marginTop: 18 }}>
            Saisie manuelle · pas de connexion bancaire requise.
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', fontSize: 11, color: '#7a7770' }}>
          <span>CGU</span><span>·</span><span>Confidentialité</span>
        </div>
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// 02 — Compte · pays · devise
// ════════════════════════════════════════════════════════════════
function OnbAccount() {
  const countries = [
    { code: 'FR', flag: '🇫🇷', name: 'France', cur: '€' },
    { code: 'BE', flag: '🇧🇪', name: 'Belgique', cur: '€' },
    { code: 'MA', flag: '🇲🇦', name: 'Maroc', cur: 'MAD' },
    { code: 'ES', flag: '🇪🇸', name: 'Espagne', cur: '€' },
    { code: 'DE', flag: '🇩🇪', name: 'Allemagne', cur: '€' },
    { code: 'PT', flag: '🇵🇹', name: 'Portugal', cur: '€' },
    { code: 'CH', flag: '🇨🇭', name: 'Suisse', cur: 'CHF' },
    { code: 'UK', flag: '🇬🇧', name: 'Royaume-Uni', cur: '£' },
  ];
  return (
    <PhoneFrame noTabs>
      <StepDots step={1} total={6} />
      <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Étape 1 / 6</div>
      <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, margin: '4px 0 4px' }}>
        Ton compte
      </div>
      <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 12 }}>
        Pays et devise déterminent la fiscalité (dividendes, plus-values) appliquée par défaut.
      </div>

      <SketchInput label="Email" value="" placeholder="toi@exemple.com" />
      <SketchInput label="Mot de passe" value="" placeholder="•••••••• (12+ caractères)" />

      <div style={{ fontSize: 12, color: '#1F1F1F', fontWeight: 700, marginTop: 8, marginBottom: 4 }}>PAYS DE RÉSIDENCE</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
        {countries.map((c, i) => (
          <div key={c.code} style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            padding: '4px 9px', borderRadius: 999,
            border: i === 0 ? '1.6px solid #1F1F1F' : '1.2px solid #d4d0c2',
            background: i === 0 ? '#1F1F1F' : 'var(--paper)',
            color: i === 0 ? '#fff' : '#1F1F1F',
            fontSize: 12, whiteSpace: 'nowrap',
            boxShadow: i === 0 ? '2px 2px 0 0 rgba(31,31,31,0.12)' : 'none',
          }}>
            <span style={{ fontSize: 14 }}>{c.flag}</span>{c.name}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <SketchInput label="Devise principale" value="EUR · €" />
        <SketchInput label="Fuseau" value="Europe/Paris" />
      </div>

      <SketchCard style={{ marginTop: 8, padding: '8px 10px', borderStyle: 'dashed' }}>
        <div style={{ fontSize: 11, color: '#6b6b6b', lineHeight: 1.4 }}>
          <b style={{ color: '#1F1F1F' }}>🇫🇷 France</b> · les dividendes seront calculés avec <b>PFU 30%</b> par défaut.
          <span style={{ fontStyle: 'italic' }}> Modifiable à tout moment dans les paramètres.</span>
        </div>
      </SketchCard>

      <div style={{ marginTop: 10 }}>
        <BigButton accent="pro">Continuer →</BigButton>
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// 03 — Profil
// ════════════════════════════════════════════════════════════════
function OnbProfile() {
  return (
    <PhoneFrame noTabs>
      <StepDots step={2} total={6} />
      <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Étape 2 / 6</div>
      <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, margin: '4px 0 10px' }}>
        Quel est ton profil ?
      </div>
      <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 14 }}>
        Sélectionne ce qui te ressemble le plus. Tu pourras affiner ensuite.
      </div>

      <ChoiceCard emoji="◐" sub="CDI · CDD · fonctionnaire">Salarié</ChoiceCard>
      <ChoiceCard emoji="◑" sub="auto-entrepreneur · BNC">Freelance micro-entreprise</ChoiceCard>
      <ChoiceCard emoji="◧" sub="SASU · EURL · SARL" selected accent="pro">Freelance en société</ChoiceCard>
      <ChoiceCard emoji="◨" sub="salaire + missions + dividendes">Revenus mixtes</ChoiceCard>
      <ChoiceCard emoji="◇" sub="immobilier · bourse · crypto">Investisseur</ChoiceCard>
      <ChoiceCard emoji="○" sub="juste suivre mon patrimoine">Curieux</ChoiceCard>

      <div style={{ marginTop: 12 }}>
        <BigButton accent="pro">Continuer →</BigButton>
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// 03 — Comptes à suivre
// ════════════════════════════════════════════════════════════════
function OnbAccounts() {
  return (
    <PhoneFrame noTabs>
      <StepDots step={3} total={6} />
      <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Étape 3 / 6</div>
      <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, margin: '4px 0 10px' }}>
        Que veux-tu suivre ?
      </div>
      <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 12 }}>
        Coche tout ce que tu possèdes. Détails à remplir plus tard.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <ChoiceCard selected>Compte courant</ChoiceCard>
        <ChoiceCard selected>Livrets · épargne</ChoiceCard>
        <ChoiceCard selected>PEA · CTO</ChoiceCard>
        <ChoiceCard>Assurance-vie</ChoiceCard>
        <ChoiceCard selected>Crypto</ChoiceCard>
        <ChoiceCard selected accent="pro">Compte société</ChoiceCard>
        <ChoiceCard selected>Immobilier</ChoiceCard>
        <ChoiceCard>Crédits · dettes</ChoiceCard>
      </div>

      <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
        <BigButton secondary>← Retour</BigButton>
        <BigButton accent="pro">Continuer</BigButton>
      </div>

      <div style={{ marginTop: 10, fontSize: 12, color: '#7a7770', textAlign: 'center', fontStyle: 'italic' }}>
        + ajouter un autre actif
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// 04 — Objectif principal
// ════════════════════════════════════════════════════════════════
function OnbGoal() {
  return (
    <PhoneFrame noTabs>
      <StepDots step={4} total={6} />
      <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Étape 4 / 6</div>
      <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, margin: '4px 0 10px' }}>
        Quel est ton objectif principal ?
      </div>
      <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 14 }}>
        Un seul, pour l'instant. On en ajoutera d'autres ensuite.
      </div>

      <ChoiceCard emoji="$" sub="constituer 3-12 mois de runway">Sécuriser ma trésorerie</ChoiceCard>
      <ChoiceCard emoji="⌂" sub="résidence ou investissement" selected>Acheter un bien immobilier</ChoiceCard>
      <ChoiceCard emoji="↗" sub="DCA régulier ETF/PEA">Investir régulièrement</ChoiceCard>
      <ChoiceCard emoji="◐" sub="optimiser flat tax + cash libre">Sortir des dividendes</ChoiceCard>
      <ChoiceCard emoji="◠" sub="sabbatique · transition pro">Préparer une période sans revenu</ChoiceCard>
      <ChoiceCard emoji="∞" sub="long terme · revenus passifs">Liberté financière</ChoiceCard>

      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <BigButton secondary>← Retour</BigButton>
        <BigButton accent="pro">Continuer</BigButton>
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// 05 — Chiffres clés (saisie rapide)
// ════════════════════════════════════════════════════════════════
function OnbFigures() {
  return (
    <PhoneFrame noTabs>
      <StepDots step={5} total={6} />
      <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Étape 5 / 6</div>
      <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, margin: '4px 0 4px' }}>
        Quelques chiffres clés
      </div>
      <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 12 }}>
        Estimation suffit. Tu pourras ajuster à tout moment.
      </div>

      <div style={{ fontSize: 12, color: '#1F1F1F', fontWeight: 700, marginTop: 8 }}>REVENUS</div>
      <SketchInput label="Revenu mensuel net (moyenne)" value="6 500" suffix="€/mois" />

      <div style={{ fontSize: 12, color: '#1F1F1F', fontWeight: 700, marginTop: 4 }}>DÉPENSES</div>
      <SketchInput label="Dépenses mensuelles" value="2 800" suffix="€/mois" />

      <div style={{ fontSize: 12, color: '#1F1F1F', fontWeight: 700, marginTop: 4 }}>CASH</div>
      <SketchInput label="Cash perso disponible" value="16 000" suffix="€" />

      <div style={{ fontSize: 12, color: 'var(--pro)', fontWeight: 700, marginTop: 4 }}>SOCIÉTÉ (optionnel)</div>
      <SketchInput label="Trésorerie SASU" value="42 800" suffix="€" />

      <div style={{ fontSize: 12, color: '#1F1F1F', fontWeight: 700, marginTop: 4 }}>INVESTISSEMENTS</div>
      <SketchInput label="Total investi (ETF, crypto…)" value="22 914" suffix="€" />
      <SketchInput label="DCA mensuel total" value="1 550" suffix="€/mois" />

      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
        <BigButton secondary>← Retour</BigButton>
        <BigButton accent="pro">Voir mon cockpit →</BigButton>
      </div>
    </PhoneFrame>
  );
}

// ════════════════════════════════════════════════════════════════
// 06 — Première phrase de feedback (l'app parle)
// ════════════════════════════════════════════════════════════════
function OnbFirstInsight() {
  return (
    <PhoneFrame noTabs>
      <StepDots step={6} total={6} />
      <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Étape 6 / 6</div>
      <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, margin: '4px 0 12px' }}>
        Voilà ton point de départ.
      </div>

      <SketchCard style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Patrimoine net estimé</div>
        <div className="caveat" style={{ fontSize: 42, fontWeight: 700, lineHeight: 1 }}>168 540 €</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 12 }}>
          <span style={{ color: 'var(--perso)' }}>● Perso 73 914 €</span>
          <span style={{ color: 'var(--pro)' }}>● Pro 70 900 €</span>
          <span style={{ color: '#6b6b6b' }}>● Immo 35k</span>
        </div>
      </SketchCard>

      <SketchCard style={{ marginBottom: 10, borderColor: 'var(--safe)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--safe)' }} />
          <div style={{ fontSize: 12, color: 'var(--safe)', fontWeight: 700, letterSpacing: 1 }}>SITUATION SAINE</div>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.4, color: '#2a2a2a' }}>
          Tu as <b>5,7 mois</b> de sécurité perso et <b>14 mois</b> de sécurité société.
          Ton DCA de <b>1 550 €</b> représente <b>24 %</b> de tes revenus — soutenable.
        </div>
        <Wobble width={80} color="var(--safe)" style={{ marginTop: 6 }} />
      </SketchCard>

      <SketchCard style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 12, color: '#1F1F1F', fontWeight: 700, letterSpacing: 1 }}>NEXT STEPS</div>
        <div style={{ fontSize: 13, color: '#3a3a3a', marginTop: 4, lineHeight: 1.5 }}>
          → Compléter tes 2 objectifs secondaires<br/>
          → Tester un scénario : <i>« et si je perds ma mission ? »</i><br/>
          → Activer le module Société pour suivre runway SASU
        </div>
      </SketchCard>

      <div style={{ marginTop: 8 }}>
        <BigButton>Entrer dans le cockpit →</BigButton>
      </div>
    </PhoneFrame>
  );
}

Object.assign(window, {
  SketchInput, BigButton, ChoiceCard, StepDots,
  OnbWelcome, OnbAccount, OnbProfile, OnbAccounts, OnbGoal, OnbFigures, OnbFirstInsight,
});
