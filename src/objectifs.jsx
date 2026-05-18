/* objectifs.jsx — Goals screen */

function ObjectifsScreen({ nav }) {
  const { state, dispatch } = useStore();
  const [showSheet, setShowSheet] = React.useState(false);
  const [form, setForm] = React.useState({
    label: '',
    type: 'epargne',
    montantCible: '',
    montantActuel: '',
    dateCible: '',
    priorite: 'moyenne',
  });

  function handleAdd() {
    if (!form.label.trim()) return;
    dispatch('ADD_OBJECTIF', {
      ...form,
      montantCible: parseFloat(form.montantCible) || 0,
      montantActuel: parseFloat(form.montantActuel) || 0,
    });
    setForm({ label: '', type: 'epargne', montantCible: '', montantActuel: '', dateCible: '', priorite: 'moyenne' });
    setShowSheet(false);
  }

  const sorted = [...state.objectifs].sort((a, b) => {
    const pOrder = { haute: 0, moyenne: 1, basse: 2 };
    return (pOrder[a.priorite] || 1) - (pOrder[b.priorite] || 1);
  });

  const prioColor = p => p === 'haute' ? C.risk : p === 'moyenne' ? C.watch : C.inkSoft;
  const typeEmoji = { epargne: '$', immo: '⌂', investissement: '↗', liberte: '∞', retraite: '◎', autre: '●' };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 18px 12px', borderBottom: `1px solid ${C.inkFaint}`, background: C.paper, flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.ink }}>Objectifs</div>
            <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 3 }}>
              {sorted.length > 0 ? `${sorted.length} objectif${sorted.length > 1 ? 's' : ''} actif${sorted.length > 1 ? 's' : ''}` : 'Aucun objectif'}
            </div>
          </div>
          <button onClick={() => setShowSheet(true)} style={{
            padding: '5px 12px', border: `1.4px solid ${C.ink}`, borderRadius: 999,
            background: C.paper, fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 13, cursor: 'pointer', color: C.ink,
          }}>+ objectif</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 18px 90px' }}>

        {sorted.length === 0 ? (
          <Empty icon="◎" label="Pas encore d'objectif" action="Créer mon premier objectif" onAction={() => setShowSheet(true)} />
        ) : (
          sorted.map(g => {
            const pct = g.montantCible > 0 ? Math.min(100, Math.round(((g.montantActuel || 0) / g.montantCible) * 100)) : 0;
            const barColor = pct > 80 ? C.safe : pct > 30 ? C.ink : C.watch;

            return (
              <Card key={g.id} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontFamily: 'Caveat, cursive', fontSize: 18 }}>{typeEmoji[g.type] || '●'}</span>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{g.label}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 2, flexWrap: 'wrap' }}>
                      {g.dateCible && <div style={{ fontSize: 11, color: C.inkSoft }}>cible · {fmtDate(g.dateCible)}</div>}
                      <span style={{
                        fontSize: 10, color: prioColor(g.priorite),
                        border: `1px solid ${prioColor(g.priorite)}`,
                        borderRadius: 999, padding: '0 5px', lineHeight: '16px',
                        fontFamily: 'JetBrains Mono, monospace',
                      }}>
                        {g.priorite}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ fontFamily: 'Caveat, cursive', fontSize: 26, fontWeight: 700, color: C.ink }}>{pct}%</div>
                    <button onClick={() => dispatch('DELETE_OBJECTIF', g.id)} style={{
                      border: 'none', background: 'transparent', color: C.inkSoft,
                      fontSize: 16, cursor: 'pointer', padding: 0,
                    }}>×</button>
                  </div>
                </div>

                <ProgressBar value={pct} color={barColor} height={10} />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: C.inkSoft }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{fmtShort(g.montantActuel || 0)}</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>/ {fmtShort(g.montantCible || 0)}</span>
                </div>
              </Card>
            );
          })
        )}

        <button onClick={() => setShowSheet(true)} style={{
          width: '100%', marginTop: 8,
          padding: '10px', border: `1.4px dashed ${C.inkFaint}`, borderRadius: 10,
          background: 'transparent', color: C.inkSoft, fontSize: 13, cursor: 'pointer',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}>+ créer un objectif</button>

      </div>

      {showSheet && (
        <Sheet title="Nouvel objectif" onClose={() => setShowSheet(false)}>
          <Input label="Libellé" value={form.label} onChange={v => setForm(f => ({ ...f, label: v }))} placeholder="Acheter un appartement…" />
          <Select label="Type" value={form.type} onChange={v => setForm(f => ({ ...f, type: v }))}
            options={[
              { value: 'epargne', label: 'Épargne de sécurité' },
              { value: 'immo', label: 'Immobilier' },
              { value: 'investissement', label: 'Investissement' },
              { value: 'liberte', label: 'Liberté financière' },
              { value: 'retraite', label: 'Retraite' },
              { value: 'autre', label: 'Autre' },
            ]}
          />
          <Input label="Montant cible" value={form.montantCible} onChange={v => setForm(f => ({ ...f, montantCible: v }))} placeholder="50 000" suffix="€" type="number" />
          <Input label="Montant actuel" value={form.montantActuel} onChange={v => setForm(f => ({ ...f, montantActuel: v }))} placeholder="0" suffix="€" type="number" />
          <Input label="Date cible" value={form.dateCible} onChange={v => setForm(f => ({ ...f, dateCible: v }))} type="date" />
          <Select label="Priorité" value={form.priorite} onChange={v => setForm(f => ({ ...f, priorite: v }))}
            options={[
              { value: 'haute', label: '🔴 Haute' },
              { value: 'moyenne', label: '🟡 Moyenne' },
              { value: 'basse', label: '⚪ Basse' },
            ]}
          />
          <Btn onClick={handleAdd} accent="pro">Créer l'objectif</Btn>
        </Sheet>
      )}
    </div>
  );
}

Object.assign(window, { ObjectifsScreen });
