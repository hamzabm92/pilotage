/* Main app: design canvas of wireframe variations + Tweaks panel */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "scenario": "healthy",
  "showColor": true,
  "showNotes": true
}/*EDITMODE-END*/;

function PilotageApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const data = DATA[t.scenario] || DATA.healthy;

  // Toggle color accents off by overriding CSS vars on the root
  React.useEffect(() => {
    const root = document.documentElement;
    if (t.showColor) {
      root.style.setProperty('--pro', '#2563EB');
      root.style.setProperty('--perso', '#7C3AED');
    } else {
      root.style.setProperty('--pro', '#1F1F1F');
      root.style.setProperty('--perso', '#1F1F1F');
    }
  }, [t.showColor]);

  return (
    <>
      <DesignCanvas>
        {/* ───── PUBLIC APP — v0.2 ───── */}
        <DCSection
          id="overview"
          title="Pilotage — produit grand public"
          subtitle="Le cockpit financier pour piloter sa trajectoire · architecture modulaire"
        >
          <DCArtboard id="v1-scope" label="V1 · scope MVP" width={720} height={720}>
            <V1Scope />
          </DCArtboard>
          <DCArtboard id="map" label="Architecture · modules" width={760} height={760}>
            <ProductMap />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="onboarding"
          title="Onboarding"
          subtitle="6 étapes · compte → profil → comptes → objectif → chiffres → premier insight"
        >
          <DCArtboard id="welcome" label="00 · Welcome" width={392} height={760}><OnbWelcome /></DCArtboard>
          <DCArtboard id="account" label="01 · Compte · pays · devise" width={392} height={760}><OnbAccount /></DCArtboard>
          <DCArtboard id="profile" label="02 · Profil" width={392} height={760}><OnbProfile /></DCArtboard>
          <DCArtboard id="accounts" label="03 · Comptes à suivre" width={392} height={760}><OnbAccounts /></DCArtboard>
          <DCArtboard id="goal" label="04 · Objectif" width={392} height={760}><OnbGoal /></DCArtboard>
          <DCArtboard id="figures" label="05 · Chiffres clés" width={392} height={760}><OnbFigures /></DCArtboard>
          <DCArtboard id="first-insight" label="06 · Premier insight" width={392} height={760}><OnbFirstInsight /></DCArtboard>
        </DCSection>

        <DCSection
          id="cockpit-profiles"
          title="Cockpit — adapté au profil"
          subtitle="Même logique, 3 profils — l'app recompose ses cartes"
        >
          <DCArtboard id="p-salarie" label="A · Salariée (simple)" width={392} height={760}><PublicDashboardSalarie /></DCArtboard>
          <DCArtboard id="p-societe" label="B · Freelance société (perso + pro)" width={392} height={760}><PublicDashboardSociete /></DCArtboard>
          <DCArtboard id="p-mixte" label="C · Mixte (alerte côté pro)" width={392} height={760}><PublicDashboardMixte /></DCArtboard>
        </DCSection>

        <DCSection
          id="scenarios"
          title="Scénarios — le différenciateur"
          subtitle="« Est-ce que je peux ? » — index + 3 scénarios types"
        >
          <DCArtboard id="sc-list" label="Index des scénarios" width={392} height={760}><ScreenScenariosList /></DCArtboard>
          <DCArtboard id="sc-mission" label="A · Et si je perds ma mission ?" width={392} height={760}><ScreenScenarioMission /></DCArtboard>
          <DCArtboard id="sc-div-fr" label="B · Dividende · 🇫🇷 France · interactif" width={392} height={760}><ScreenScenarioDividende /></DCArtboard>
          <DCArtboard id="sc-div-ma" label="B′ · Dividende · 🇲🇦 Maroc (variante)" width={392} height={760}><ScreenScenarioDividendeMA /></DCArtboard>
          <DCArtboard id="sc-achat" label="C · Puis-je acheter ce bien ?" width={392} height={760}><ScreenScenarioAchat /></DCArtboard>
        </DCSection>

        <DCSection
          id="modules"
          title="Modules"
          subtitle="Comptes · Revenus · Dépenses · Objectifs · Insights"
        >
          <DCArtboard id="m-comptes" label="Comptes & actifs" width={392} height={760}><ScreenComptes /></DCArtboard>
          <DCArtboard id="m-revenus" label="Revenus · stabilité" width={392} height={760}><ScreenRevenus /></DCArtboard>
          <DCArtboard id="m-depenses" label="Dépenses & runway" width={392} height={760}><ScreenDepenses /></DCArtboard>
          <DCArtboard id="m-objectifs" label="Objectifs" width={392} height={760}><ScreenObjectifs /></DCArtboard>
          <DCArtboard id="m-insights" label="Insights & alertes" width={392} height={760}><ScreenInsights /></DCArtboard>
        </DCSection>

        {/* ───── v0 — earlier exploration kept for reference ───── */}
        <DCSection
          id="v0-dashboard"
          title="v0 — explorations initiales (cas Karim/SASU)"
          subtitle="4 variations du dashboard · axes : séparation PRO/PERSO × jauge"
        >
          <DCArtboard id="v1" label="V1 · Classique stacked · circulaire" width={392} height={760}>
            <DashboardV1 data={data} />
          </DCArtboard>
          <DCArtboard id="v2" label="V2 · Colonnes · barre horizontale" width={392} height={760}>
            <DashboardV2 data={data} />
          </DCArtboard>
          <DCArtboard id="v3" label="V3 · Toggle · donut séparé" width={392} height={760}>
            <DashboardV3 data={data} />
          </DCArtboard>
          <DCArtboard id="v4" label="V4 · Score-led · grand cadran" width={392} height={760}>
            <DashboardV4 data={data} />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="v0-tabs"
          title="v0 — onglets PRO & PERSO"
          subtitle="Modules détaillés (réutilisables dans la v0.2)"
        >
          <DCArtboard id="pro" label="PRO · SASU" width={392} height={760}>
            <TabPRO data={data} />
          </DCArtboard>
          <DCArtboard id="perso" label="PERSO" width={392} height={760}>
            <TabPERSO data={data} />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="notes"
          title="Notes du designer"
          subtitle="Système · pivot v0 → v0.2 · prochaines étapes"
        >
          <DCArtboard id="system" label="Notes" width={520} height={540}>
            <DesignerNotes />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Données v0 (cas Karim)">
          <TweakRadio
            label="Scénario"
            value={t.scenario}
            onChange={(v) => setTweak('scenario', v)}
            options={[
              { value: 'healthy', label: 'Saine' },
              { value: 'watch', label: 'À surveiller' },
              { value: 'risk', label: 'Risque' },
            ]}
          />
        </TweakSection>
        <TweakSection label="Sketch">
          <TweakToggle
            label="Accents PRO/PERSO (bleu/violet)"
            value={t.showColor}
            onChange={(v) => setTweak('showColor', v)}
          />
          <TweakToggle
            label="Annotations & marges"
            value={t.showNotes}
            onChange={(v) => setTweak('showNotes', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

function DesignerNotes() {
  return (
    <div style={{
      width: 520, height: 540, padding: 24,
      background: 'var(--paper)',
      border: '1.4px solid #1F1F1F', borderRadius: 16,
      fontFamily: "'Patrick Hand', sans-serif",
      overflow: 'auto',
      boxShadow: '3px 3px 0 0 rgba(31,31,31,0.06)',
      position: 'relative',
    }}>
      <div style={{ fontSize: 12, color: '#7a7770', textTransform: 'uppercase', letterSpacing: 1 }}>Pilotage · wireframes v0.2</div>
      <h2 style={{ fontFamily: "'Caveat', cursive", fontSize: 30, margin: '4px 0 12px' }}>Notes du designer</h2>

      <div style={{ fontSize: 13, lineHeight: 1.5, color: '#2a2a2a' }}>
        <p style={{ margin: '0 0 8px' }}>
          <b>Pivot v0 → v0.2.</b> Passage d'une app perso « Hamza » à un produit grand public.
          L'app n'est plus « SASU + Tanger + Technip », c'est <i>« le cockpit qui te dit si tu peux »</i>.
        </p>
        <p style={{ margin: '0 0 8px' }}>
          <b>Identités persistantes maintenues.</b> Bleu <span style={{ color: 'var(--pro)' }}>●</span> = Pro/Société,
          violet <span style={{ color: 'var(--perso)' }}>●</span> = Perso. Toujours en bordure, jamais en remplissage.
        </p>
        <p style={{ margin: '0 0 8px' }}>
          <b>Modules activables selon profil.</b> Salariée → pas de Pro. Freelance société → tout activé.
          Le cockpit recompose ses cartes (cf. profils A/B/C).
        </p>
        <p style={{ margin: '0 0 8px' }}>
          <b>Scénarios = cœur produit.</b> 3 sketches : « si je perds ma mission », « combien sortir »,
          « puis-je acheter ». Chaque écran combine inputs + projection + verdict.
        </p>
        <p style={{ margin: '0 0 8px' }}>
          <b>Tabs grand public.</b> Cockpit · Comptes · Scénarios · Objectifs. Le reste (Revenus,
          Dépenses, Insights, Pro) accessible depuis Comptes ou le cockpit.
        </p>
        <p style={{ margin: '12px 0 0', fontSize: 12, color: '#6b6b6b', fontStyle: 'italic' }}>
          <b>Prochaines étapes.</b> Choisir 1 cockpit + 1 style de scénario, monter en fidélité,
          ajouter l'écran Pro public + onboarding société, états vides, dark mode, paramètres.
        </p>
      </div>

      <div style={{ position: 'absolute', right: 18, bottom: 14, fontFamily: "'Caveat', cursive", color: '#c08a2e', fontSize: 18, transform: 'rotate(-3deg)' }}>
        v0.2 · à valider →
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PilotageApp />);
