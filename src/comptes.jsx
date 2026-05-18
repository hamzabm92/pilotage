/* comptes.jsx — Comptes, Revenus, Dépenses, Pro tabs */

function ComptesScreen({ nav }) {
  const { state, calcs } = useStore();
  const hasSociete = calcs.hasSociete;
  const tabs = ['Comptes', 'Revenus', 'Dépenses', ...(hasSociete ? ['Pro'] : [])];
  const [activeTab, setActiveTab] = React.useState('Comptes');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top header */}
      <div style={{ padding: '16px 18px 0', borderBottom: `1px solid ${C.inkFaint}`, background: C.paper, flexShrink: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: C.ink }}>Finances</div>
        {/* Horizontal tabs */}
        <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{
              flex: 'none',
              padding: '8px 14px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === t ? `2.5px solid ${C.ink}` : '2.5px solid transparent',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 14, fontWeight: activeTab === t ? 700 : 400,
              color: activeTab === t ? C.ink : C.inkSoft,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'Comptes' && <ComptesTab />}
        {activeTab === 'Revenus' && <RevenusTab />}
        {activeTab === 'Dépenses' && <DepensesTab />}
        {activeTab === 'Pro' && <ProTab />}
      </div>
    </div>
  );
}

// ── Comptes Tab ────────────────────────────────────────────────
function ComptesTab() {
  const { state, dispatch, calcs } = useStore();
  const [showSheet, setShowSheet] = React.useState(false);
  const [form, setForm] = React.useState({ label: '', categorie: 'cash', etablissement: '', valeur: '' });

  const categories = [
    { id: 'cash', label: 'CASH', color: C.ink, accent: undefined },
    { id: 'investissement', label: 'INVESTISSEMENTS', color: C.perso, accent: 'perso' },
    { id: 'immobilier', label: 'IMMOBILIER', color: '#c08a2e', accent: undefined },
    { id: 'societe', label: 'SOCIÉTÉ', color: C.pro, accent: 'pro' },
    { id: 'dette', label: 'DETTES', color: C.risk, accent: undefined },
  ];

  function handleAdd() {
    if (!form.label.trim()) return;
    dispatch('ADD_COMPTE', { ...form, valeur: parseFloat(form.valeur) || 0 });
    setForm({ label: '', categorie: 'cash', etablissement: '', valeur: '' });
    setShowSheet(false);
  }

  const total = state.comptes.reduce((s, c) => c.categorie !== 'dette' ? s + (c.valeur || 0) : s, 0);
  const dettes = state.comptes.filter(c => c.categorie === 'dette').reduce((s, c) => s + (c.valeur || 0), 0);

  const catIconMap = { cash: '€', investissement: '↗', immobilier: '⌂', societe: '□', dette: '↘' };

  return (
    <div style={{ padding: '14px 18px 20px' }}>
      {/* Summary card */}
      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: C.inkSoft, textTransform: 'uppercase', letterSpacing: 1 }}>Patrimoine brut</div>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 34, fontWeight: 700, lineHeight: 1 }}>{fmt(total)}</div>
        {dettes > 0 && <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>
          dettes <span style={{ fontFamily: 'JetBrains Mono, monospace', color: C.risk }}>−{fmt(dettes)}</span>
          {' · '}net <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{fmt(total - dettes)}</span>
        </div>}
      </Card>

      {state.comptes.length === 0 ? (
        <Empty icon="◻" label="Aucun compte ajouté" action="+ Ajouter un compte" onAction={() => setShowSheet(true)} />
      ) : (
        <>
          {categories.map(cat => {
            const items = state.comptes.filter(c => c.categorie === cat.id);
            if (items.length === 0) return null;
            return (
              <div key={cat.id}>
                <div style={{ fontSize: 11, color: cat.color, fontWeight: 700, letterSpacing: 1, marginTop: 10, marginBottom: 4 }}>{cat.label}</div>
                {items.map(c => (
                  <ListItem
                    key={c.id}
                    icon={catIconMap[cat.id] || '●'}
                    label={c.label}
                    sub={c.etablissement}
                    value={fmt(c.valeur)}
                    accent={cat.accent}
                    onDelete={() => dispatch('DELETE_COMPTE', c.id)}
                  />
                ))}
              </div>
            );
          })}
        </>
      )}

      <button onClick={() => setShowSheet(true)} style={{
        width: '100%', marginTop: 16,
        padding: '10px', border: `1.4px dashed ${C.inkFaint}`, borderRadius: 10,
        background: 'transparent', color: C.inkSoft, fontSize: 13, cursor: 'pointer',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>+ Ajouter un compte</button>

      {showSheet && (
        <Sheet title="Ajouter un compte" onClose={() => setShowSheet(false)}>
          <Select label="Catégorie" value={form.categorie} onChange={v => setForm(f => ({ ...f, categorie: v }))}
            options={[
              { value: 'cash', label: 'Cash / Épargne' },
              { value: 'investissement', label: 'Investissement (PEA, ETF…)' },
              { value: 'immobilier', label: 'Immobilier' },
              { value: 'societe', label: 'Compte société' },
              { value: 'dette', label: 'Crédit / Dette' },
            ]}
          />
          <Input label="Libellé" value={form.label} onChange={v => setForm(f => ({ ...f, label: v }))} placeholder="Livret A, PEA…" />
          <Input label="Établissement" value={form.etablissement} onChange={v => setForm(f => ({ ...f, etablissement: v }))} placeholder="Boursorama, Qonto…" />
          <Input label="Valeur actuelle" value={form.valeur} onChange={v => setForm(f => ({ ...f, valeur: v }))} placeholder="0" suffix="€" type="number" />
          <Btn onClick={handleAdd} accent="pro">Ajouter</Btn>
        </Sheet>
      )}
    </div>
  );
}

// ── Revenus Tab ────────────────────────────────────────────────
function RevenusTab() {
  const { state, dispatch, calcs } = useStore();
  const [showSheet, setShowSheet] = React.useState(false);
  const [form, setForm] = React.useState({
    label: '', type: 'salaire', montant: '', frequence: 'mensuel',
    stabilite: 'elevee', finPrevue: '', tjm: '',
  });

  function handleAdd() {
    if (!form.label.trim()) return;
    dispatch('ADD_REVENU', { ...form, montant: parseFloat(form.montant) || 0, tjm: parseFloat(form.tjm) || 0 });
    setForm({ label: '', type: 'salaire', montant: '', frequence: 'mensuel', stabilite: 'elevee', finPrevue: '', tjm: '' });
    setShowSheet(false);
  }

  const stabColor = s => s === 'elevee' ? C.safe : s === 'moyenne' ? C.watch : C.risk;
  const stabLabel = s => s === 'elevee' ? 'élevée' : s === 'moyenne' ? 'moyenne' : s === 'variable' ? 'variable' : 'faible';

  const totalMensuel = calcs.revenuMensuelCalc;

  return (
    <div style={{ padding: '14px 18px 20px' }}>
      <Card style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, color: C.inkSoft, textTransform: 'uppercase', letterSpacing: 1 }}>Revenu mensuel moyen</div>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 34, fontWeight: 700, lineHeight: 1 }}>{fmt(totalMensuel)}</div>
      </Card>

      {state.revenus.length === 0 ? (
        <Empty icon="€" label="Aucune source de revenu" action="+ Ajouter une source" onAction={() => setShowSheet(true)} />
      ) : (
        state.revenus.map(r => (
          <Card key={r.id} accent={r.type === 'mission' ? 'pro' : undefined} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{r.label}</div>
                <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 1 }}>
                  {r.tjm > 0 ? `${fmt(r.tjm)}/j · ` : ''}{r.frequence}{r.finPrevue ? ` · jusqu'à ${fmtDate(r.finPrevue)}` : ''}
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 8 }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 600 }}>{fmt(r.montant)}</div>
                <button onClick={() => dispatch('DELETE_REVENU', r.id)} style={{ border: 'none', background: 'transparent', color: C.inkSoft, fontSize: 14, cursor: 'pointer', padding: 0 }}>×</button>
              </div>
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 3,
                border: `1.2px solid ${stabColor(r.stabilite)}`,
                color: stabColor(r.stabilite),
                padding: '1px 7px', borderRadius: 999,
                fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              }}>● {stabLabel(r.stabilite)}</span>
            </div>
          </Card>
        ))
      )}

      <button onClick={() => setShowSheet(true)} style={{
        width: '100%', marginTop: 12,
        padding: '10px', border: `1.4px dashed ${C.inkFaint}`, borderRadius: 10,
        background: 'transparent', color: C.inkSoft, fontSize: 13, cursor: 'pointer',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>+ Ajouter une source</button>

      {showSheet && (
        <Sheet title="Ajouter un revenu" onClose={() => setShowSheet(false)}>
          <Input label="Libellé" value={form.label} onChange={v => setForm(f => ({ ...f, label: v }))} placeholder="Mission freelance, Salaire…" />
          <Select label="Type" value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))}
            options={[
              { value: 'salaire', label: 'Salaire' },
              { value: 'mission', label: 'Mission freelance' },
              { value: 'dividendes', label: 'Dividendes' },
              { value: 'side', label: 'Side / passion' },
              { value: 'location', label: 'Location / immobilier' },
              { value: 'autre', label: 'Autre' },
            ]}
          />
          <Input label="Montant" value={form.montant} onChange={v => setForm(f => ({ ...f, montant: v }))} placeholder="0" suffix="€" type="number" />
          <Select label="Fréquence" value={form.frequence} onChange={v => setForm(f => ({ ...f, frequence: v }))}
            options={[{ value: 'mensuel', label: 'Mensuel' }, { value: 'annuel', label: 'Annuel' }]}
          />
          <Select label="Stabilité" value={form.stabilite} onChange={v => setForm(f => ({ ...f, stabilite: v }))}
            options={[
              { value: 'elevee', label: 'Élevée (CDI, récurrent)' },
              { value: 'moyenne', label: 'Moyenne (mission en cours)' },
              { value: 'faible', label: 'Faible (irrégulier)' },
              { value: 'variable', label: 'Variable (dividendes…)' },
            ]}
          />
          {form.type === 'mission' && (
            <Input label="TJM" value={form.tjm} onChange={v => setForm(f => ({ ...f, tjm: v }))} placeholder="0" suffix="€/jour" type="number" />
          )}
          <Input label="Fin prévue" value={form.finPrevue} onChange={v => setForm(f => ({ ...f, finPrevue: v }))} placeholder="" type="date" />
          <Btn onClick={handleAdd} accent="pro">Ajouter</Btn>
        </Sheet>
      )}
    </div>
  );
}

// ── Dépenses Tab ───────────────────────────────────────────────
function DepensesTab() {
  const { state, dispatch, calcs } = useStore();
  const [showSheet, setShowSheet] = React.useState(false);
  const [form, setForm] = React.useState({ label: '', categorie: 'logement', montant: '' });

  function handleAdd() {
    if (!form.label.trim()) return;
    dispatch('ADD_DEPENSE', { ...form, montant: parseFloat(form.montant) || 0 });
    setForm({ label: '', categorie: 'logement', montant: '' });
    setShowSheet(false);
  }

  const total = calcs.depensesTotalCalc;
  const cash = calcs.cashTotal;
  const runway = calcs.runwayPerso;
  const runwayColor = runway < 3 ? C.risk : runway < 6 ? C.watch : C.safe;

  const depList = state.depenses.length > 0 ? state.depenses : [];
  const catIcon = { logement: '⌂', transport: '◇', alimentation: '○', loisirs: '◢', abonnements: '◐', sante: '+', autre: '●' };

  return (
    <div style={{ padding: '14px 18px 20px' }}>
      {/* Hero runway */}
      <Card style={{ marginBottom: 14, textAlign: 'center', padding: '18px 14px' }}>
        <div style={{ fontSize: 12, color: C.inkSoft, textTransform: 'uppercase', letterSpacing: 1 }}>Si je perds mes revenus</div>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6, marginTop: 4 }}>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 60, fontWeight: 700, lineHeight: 1, color: runwayColor }}>
            {Math.round(runway * 10) / 10}
          </div>
          <div style={{ fontSize: 16, color: '#3a3a3a' }}>mois</div>
        </div>
        <div style={{ fontSize: 13, color: '#3a3a3a', marginTop: 4 }}>de cash perso disponible</div>
        <svg width="120" height="6" style={{ margin: '8px auto 0', display: 'block' }}>
          <path d="M2 4 Q 30 1 60 4 T 118 3" stroke={runwayColor} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700 }}>DÉPENSES MENSUELLES</div>
        <button onClick={() => setShowSheet(true)} style={{
          padding: '4px 10px', border: `1.4px solid ${C.ink}`, borderRadius: 999,
          background: C.paper, fontFamily: 'Inter, system-ui, sans-serif', fontSize: 12, cursor: 'pointer',
        }}>+ ajouter</button>
      </div>

      {depList.length === 0 ? (
        <Empty icon="◻" label="Aucune dépense renseignée" action="+ Ajouter une dépense" onAction={() => setShowSheet(true)} />
      ) : (
        depList.map(d => (
          <ListItem
            key={d.id}
            icon={catIcon[d.categorie] || '●'}
            label={d.label}
            sub={d.categorie}
            value={fmt(d.montant)}
            onDelete={() => dispatch('DELETE_DEPENSE', d.id)}
          />
        ))
      )}

      {depList.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, padding: '8px 2px', borderTop: `1.4px solid ${C.ink}` }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Total</div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 700 }}>{fmt(total)}</div>
        </div>
      )}

      {total > 0 && (
        <div style={{ marginTop: 8, fontSize: 12, color: C.inkSoft, fontStyle: 'italic' }}>
          Cible runway : <b>6 mois</b> · maintenir cash &gt; <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{fmt(total * 6)}</span>.
        </div>
      )}

      {showSheet && (
        <Sheet title="Ajouter une dépense" onClose={() => setShowSheet(false)}>
          <Input label="Libellé" value={form.label} onChange={v => setForm(f => ({ ...f, label: v }))} placeholder="Loyer, Courses…" />
          <Select label="Catégorie" value={form.categorie} onChange={v => setForm(f => ({ ...f, categorie: v }))}
            options={[
              { value: 'logement', label: 'Logement' },
              { value: 'transport', label: 'Transport' },
              { value: 'alimentation', label: 'Alimentation' },
              { value: 'loisirs', label: 'Loisirs & variable' },
              { value: 'abonnements', label: 'Abonnements' },
              { value: 'sante', label: 'Santé' },
              { value: 'autre', label: 'Autre' },
            ]}
          />
          <Input label="Montant mensuel" value={form.montant} onChange={v => setForm(f => ({ ...f, montant: v }))} placeholder="0" suffix="€/mois" type="number" />
          <Btn onClick={handleAdd} accent="pro">Ajouter</Btn>
        </Sheet>
      )}
    </div>
  );
}

// ── Pro Tab ────────────────────────────────────────────────────
function ProTab() {
  const { state, dispatch, calcs } = useStore();
  const { pro } = state;
  const [showSheet, setShowSheet] = React.useState(false);
  const [form, setForm] = React.useState({ ...pro });

  function handleSave() {
    dispatch('UPDATE_PRO', {
      tjm: parseFloat(form.tjm) || 0,
      joursParMois: parseFloat(form.joursParMois) || 0,
      tresorerie: parseFloat(form.tresorerie) || 0,
      tresorerieBrute: parseFloat(form.tresorerieBrute) || 0,
      charges: parseFloat(form.charges) || 0,
      remuneration: parseFloat(form.remuneration) || 0,
      dcaSociete: parseFloat(form.dcaSociete) || 0,
      missionFin: form.missionFin || '',
      investSociete: parseFloat(form.investSociete) || 0,
    });
    setShowSheet(false);
  }

  const caEstime = (pro.tjm || 0) * (pro.joursParMois || 0);
  const runwayPro = calcs.runwayPro;
  const runwayProColor = runwayPro < 3 ? C.risk : runwayPro < 6 ? C.watch : C.safe;
  const libre = (pro.tresorerie || 0) - (pro.charges || 0) - (pro.remuneration || 0);

  return (
    <div style={{ padding: '14px 18px 20px' }}>
      {/* Mission card */}
      <Card accent="pro" accentSide="top" style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.pro }}>MODULE PRO / SOCIÉTÉ</div>
          <button onClick={() => { setForm({ ...pro }); setShowSheet(true); }} style={{
            border: `1px solid ${C.pro}`, borderRadius: 6, padding: '3px 8px',
            background: 'transparent', color: C.pro, fontSize: 11, cursor: 'pointer',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>Modifier</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <div style={{ fontSize: 11, color: C.inkSoft }}>TJM</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600 }}>{fmt(pro.tjm || 0)}/j</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.inkSoft }}>Jours / mois</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600 }}>{pro.joursParMois || 0} j</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.inkSoft }}>CA estimé</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 16, fontWeight: 600 }}>{fmt(caEstime)}</div>
          </div>
          {pro.missionFin && (
            <div>
              <div style={{ fontSize: 11, color: C.inkSoft }}>Fin de mission</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, fontWeight: 600 }}>{fmtDate(pro.missionFin)}</div>
            </div>
          )}
        </div>
      </Card>

      {/* Trésorerie card */}
      <Card style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.ink, letterSpacing: 1, marginBottom: 8 }}>TRÉSORERIE</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
          <span style={{ fontSize: 13, color: C.inkSoft }}>Brute</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 600 }}>{fmt(pro.tresorerie || 0)}</span>
        </div>
        {(pro.charges > 0 || pro.remuneration > 0) && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: C.inkSoft }}>Charges + rémunération</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 14, color: C.risk }}>−{fmt((pro.charges || 0) + (pro.remuneration || 0))}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `1px dashed ${C.inkFaint}`, paddingTop: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700 }}>Libre</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 15, fontWeight: 700, color: libre > 0 ? C.safe : C.risk }}>{fmt(libre)}</span>
            </div>
          </>
        )}
      </Card>

      {/* DCA société */}
      {pro.dcaSociete > 0 && (
        <Card style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ fontSize: 13, color: C.ink }}>DCA Société</div>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700 }}>{fmt(pro.dcaSociete)}<span style={{ fontSize: 11, color: C.inkSoft }}>/mois</span></div>
          </div>
        </Card>
      )}

      {/* Runway bar */}
      <Card style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Runway société</div>
          <div style={{ fontFamily: 'Caveat, cursive', fontSize: 22, fontWeight: 700, color: runwayProColor }}>
            {Math.round(runwayPro * 10) / 10} <span style={{ fontSize: 13 }}>mois</span>
          </div>
        </div>
        <ProgressBar value={Math.min(100, runwayPro * 8.33)} color={runwayProColor} height={8} />
      </Card>

      {showSheet && (
        <Sheet title="Modifier le module Pro" onClose={() => setShowSheet(false)}>
          <Input label="TJM" value={form.tjm || ''} onChange={v => setForm(f => ({ ...f, tjm: v }))} placeholder="600" suffix="€/jour" type="number" />
          <Input label="Jours facturés / mois" value={form.joursParMois || ''} onChange={v => setForm(f => ({ ...f, joursParMois: v }))} placeholder="18" suffix="j" type="number" />
          <Input label="Trésorerie société" value={form.tresorerie || ''} onChange={v => setForm(f => ({ ...f, tresorerie: v }))} placeholder="0" suffix="€" type="number" />
          <Input label="Charges mensuelles" value={form.charges || ''} onChange={v => setForm(f => ({ ...f, charges: v }))} placeholder="0" suffix="€/mois" type="number" />
          <Input label="Rémunération mensuelle" value={form.remuneration || ''} onChange={v => setForm(f => ({ ...f, remuneration: v }))} placeholder="0" suffix="€/mois" type="number" />
          <Input label="DCA société" value={form.dcaSociete || ''} onChange={v => setForm(f => ({ ...f, dcaSociete: v }))} placeholder="0" suffix="€/mois" type="number" />
          <Input label="Investissements société" value={form.investSociete || ''} onChange={v => setForm(f => ({ ...f, investSociete: v }))} placeholder="0" suffix="€" type="number" />
          <Input label="Fin de mission" value={form.missionFin || ''} onChange={v => setForm(f => ({ ...f, missionFin: v }))} type="date" />
          <Btn onClick={handleSave} accent="pro">Sauvegarder</Btn>
        </Sheet>
      )}
    </div>
  );
}

Object.assign(window, { ComptesScreen });
