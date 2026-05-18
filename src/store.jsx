/* store.jsx — global state + localStorage persistence */

const STORAGE_KEY = 'pilotage:v1';

const COUNTRIES = [
  { code: 'FR', flag: '🇫🇷', name: 'France', currency: 'EUR', symbol: '€' },
  { code: 'BE', flag: '🇧🇪', name: 'Belgique', currency: 'EUR', symbol: '€' },
  { code: 'MA', flag: '🇲🇦', name: 'Maroc', currency: 'MAD', symbol: 'MAD' },
  { code: 'ES', flag: '🇪🇸', name: 'Espagne', currency: 'EUR', symbol: '€' },
  { code: 'DE', flag: '🇩🇪', name: 'Allemagne', currency: 'EUR', symbol: '€' },
  { code: 'PT', flag: '🇵🇹', name: 'Portugal', currency: 'EUR', symbol: '€' },
  { code: 'CH', flag: '🇨🇭', name: 'Suisse', currency: 'CHF', symbol: 'CHF' },
  { code: 'UK', flag: '🇬🇧', name: 'Royaume-Uni', currency: 'GBP', symbol: '£' },
];

const DIV_REGIMES = {
  FR: { flag: '🇫🇷', name: 'France', currency: '€', rate: 0.30, label: 'PFU 30%', breakdown: 'IR 12,8% + PS 17,2%', note: 'Option barème progressif possible si plus avantageux.' },
  BE: { flag: '🇧🇪', name: 'Belgique', currency: '€', rate: 0.30, label: 'Précompte mobilier 30%', breakdown: 'précompte libératoire', note: 'Régime VVPRbis : 15% si conditions réunies.' },
  MA: { flag: '🇲🇦', name: 'Maroc', currency: 'MAD', rate: 0.15, label: 'TPA 15%', breakdown: 'Taxe sur Produits des Actions · libératoire', note: 'Retenue à la source par la société distributrice.' },
  ES: { flag: '🇪🇸', name: 'Espagne', currency: '€', rate: 0.21, label: 'Tranches 19→27%', breakdown: '19% < 6k · 21% < 50k · 23% < 200k · 27% au-delà', note: 'Barème progressif appliqué automatiquement.' },
  DE: { flag: '🇩🇪', name: 'Allemagne', currency: '€', rate: 0.26375, label: 'Abgeltungsteuer 26,4%', breakdown: '25% + Soli 5,5% + Kirchensteuer (opt.)', note: 'Abattement annuel : 1 000 € (Sparerpauschbetrag).' },
  PT: { flag: '🇵🇹', name: 'Portugal', currency: '€', rate: 0.28, label: 'Flat 28%', breakdown: 'retenue libératoire', note: 'Option pour englobement dans IR si tranche basse.' },
  CH: { flag: '🇨🇭', name: 'Suisse', currency: 'CHF', rate: 0.35, label: 'Impôt anticipé 35%', breakdown: 'récupérable via déclaration · taux effectif variable', note: 'Imposition cantonale + fédérale finale.' },
  UK: { flag: '🇬🇧', name: 'Royaume-Uni', currency: '£', rate: 0.3375, label: 'Tranches 8,75→39,35%', breakdown: '£500 abattement · 8,75 / 33,75 / 39,35%', note: 'Taux médian (higher rate) appliqué par défaut.' },
};

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function fmt(n) {
  if (n == null || isNaN(n)) return '—';
  return Math.round(n).toLocaleString('fr-FR') + ' €';
}

function fmtShort(n) {
  if (n == null || isNaN(n)) return '—';
  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  if (abs >= 1000000) return sign + Math.round(abs / 100000) / 10 + 'M €';
  if (abs >= 1000) return sign + Math.round(abs / 100) / 10 + 'k €';
  return sign + Math.round(abs) + ' €';
}

function fmtDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
}

const DEFAULT_STATE = {
  // Auth
  users: [],
  currentUserId: null,

  // Onboarding done flag
  onboardingDone: false,

  // User profile
  profile: {
    name: '',
    email: '',
    country: 'FR',
    currency: '€',
    profileType: 'freelance-societe', // salarié|freelance-micro|freelance-societe|mixte|investisseur|curieux
    objectifPrincipal: '',
  },

  // Comptes
  comptes: [],
  // { id, label, categorie (cash|investissement|immobilier|societe|dette), etablissement, valeur }

  // Revenus
  revenus: [],
  // { id, label, type, montant, frequence (mensuel|annuel), stabilite (elevee|moyenne|faible|variable), finPrevue, tjm }

  // Depenses
  depenses: [],
  // { id, label, categorie, montant }

  // Objectifs
  objectifs: [],
  // { id, label, type, montantCible, montantActuel, dateCible, priorite }

  // Pro / Société
  pro: {
    tjm: 0,
    joursParMois: 0,
    ca: 0,
    tresorerie: 0,
    tresorerieBrute: 0,
    charges: 0,
    remuneration: 0,
    dcaSociete: 0,
    missionFin: '',
    investSociete: 0,
  },

  // Quick figures from onboarding
  revenuMensuel: 0,
  depensesTotal: 0,
  cashPerso: 0,
  dcaTotal: 0,
  investTotal: 0,
};

function computeCalcs(state) {
  const { comptes, revenus, depenses, pro, profile } = state;

  // Patrimoine by category
  const cashComptes = comptes.filter(c => c.categorie === 'cash').reduce((s, c) => s + (c.valeur || 0), 0);
  const investComptes = comptes.filter(c => c.categorie === 'investissement').reduce((s, c) => s + (c.valeur || 0), 0);
  const immoComptes = comptes.filter(c => c.categorie === 'immobilier').reduce((s, c) => s + (c.valeur || 0), 0);
  const societeComptes = comptes.filter(c => c.categorie === 'societe').reduce((s, c) => s + (c.valeur || 0), 0);
  const detteComptes = comptes.filter(c => c.categorie === 'dette').reduce((s, c) => s + (c.valeur || 0), 0);

  // Use quick figures if no comptes entered
  const cashTotal = cashComptes > 0 ? cashComptes : (state.cashPerso || 0);
  const investTotal = investComptes > 0 ? investComptes : (state.investTotal || 0);
  const proAsset = societeComptes > 0 ? societeComptes : (pro.tresorerie || 0) + (pro.investSociete || 0);

  // Patrimoine net
  const patrimoineNet = cashTotal + investTotal + immoComptes + proAsset - detteComptes;

  // Depenses total
  const depensesTotalCalc = depenses.length > 0
    ? depenses.reduce((s, d) => s + (d.montant || 0), 0)
    : (state.depensesTotal || 0);

  // Revenus mensuel
  const revenuMensuelCalc = revenus.length > 0
    ? revenus.filter(r => r.frequence === 'mensuel' || !r.frequence)
        .reduce((s, r) => s + (r.montant || 0), 0) +
      revenus.filter(r => r.frequence === 'annuel')
        .reduce((s, r) => s + (r.montant || 0) / 12, 0)
    : (state.revenuMensuel || 0);

  // Runway perso
  const runwayPerso = depensesTotalCalc > 0 ? cashTotal / depensesTotalCalc : 0;

  // Runway pro
  const runwayPro = (pro.charges + pro.remuneration) > 0
    ? pro.tresorerie / (pro.charges + pro.remuneration)
    : pro.tresorerie > 0 && revenuMensuelCalc > 0
      ? pro.tresorerie / (revenuMensuelCalc * 0.3)
      : 0;

  // DCA
  const dcaTotal = state.dcaTotal || 0;
  const dcaPct = revenuMensuelCalc > 0 ? (dcaTotal / revenuMensuelCalc) * 100 : 0;

  // Score
  const runwayScore = Math.min(100, (runwayPerso / 12) * 100);
  const dcaScore = dcaPct >= 10 && dcaPct <= 30 ? 100 : dcaPct < 10 ? (dcaPct / 10) * 100 : Math.max(0, 100 - (dcaPct - 30) * 3);
  const proScore = profile.profileType === 'freelance-societe' || profile.profileType === 'mixte'
    ? Math.min(100, (runwayPro / 12) * 100)
    : runwayScore;
  const score = Math.round(0.45 * runwayScore + 0.30 * dcaScore + 0.25 * proScore);

  // Objectif principal progress
  const mainObjectif = state.objectifs.find(o => o.priorite === 'haute') || state.objectifs[0];

  // Insight
  let insightTone = 'safe';
  let insight = '';
  if (runwayPerso < 3) {
    insightTone = 'risk';
    insight = `Attention : ton runway est de seulement ${Math.round(runwayPerso * 10) / 10} mois. Priorité : renforcer ton cash de sécurité.`;
  } else if (runwayPerso < 6) {
    insightTone = 'watch';
    insight = `Runway à ${Math.round(runwayPerso * 10) / 10} mois — sous le seuil recommandé de 6 mois. Continue à consolider.`;
  } else if (dcaPct < 10 && dcaPct > 0) {
    insightTone = 'watch';
    insight = `Situation sécurisée. Ton DCA est timide (${Math.round(dcaPct)}%). Pense à automatiser un virement épargne.`;
  } else if (runwayPro > 0 && runwayPro < 4) {
    insightTone = 'watch';
    insight = `Trésorerie société à surveiller : ${Math.round(runwayPro * 10) / 10} mois de runway. Anticipe ta prochaine mission.`;
  } else {
    insightTone = 'safe';
    insight = `Situation saine. Runway perso ${Math.round(runwayPerso * 10) / 10} mois${runwayPro > 0 ? ', société ' + Math.round(runwayPro * 10) / 10 + ' mois' : ''}. ${dcaPct > 0 ? 'DCA ' + Math.round(dcaPct) + '% du revenu.' : ''}`;
  }

  const hasSociete = profile.profileType === 'freelance-societe' || profile.profileType === 'mixte';

  return {
    cashTotal, investTotal, immoComptes, societeComptes: proAsset, detteComptes,
    patrimoineNet, depensesTotalCalc, revenuMensuelCalc,
    runwayPerso, runwayPro, dcaTotal, dcaPct,
    score, mainObjectif, insightTone, insight, hasSociete,
    breakdown: {
      cash: cashTotal,
      invest: investTotal,
      immo: immoComptes,
      pro: proAsset,
      dettes: detteComptes,
    },
  };
}

// ─── Store context ──────────────────────────────────────────────
const StoreContext = React.createContext(null);

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return Object.assign({}, DEFAULT_STATE, JSON.parse(raw));
  } catch (e) {}
  return Object.assign({}, DEFAULT_STATE);
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {}
}

function StoreProvider({ children }) {
  const [state, setStateRaw] = React.useState(() => loadState());

  const setState = React.useCallback((updater) => {
    setStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : Object.assign({}, prev, updater);
      saveState(next);
      return next;
    });
  }, []);

  const dispatch = React.useCallback((action, payload) => {
    setState(prev => {
      switch (action) {
        // Auth
        case 'SIGNUP': {
          const user = { id: uid(), ...payload };
          const users = [...prev.users, user];
          return { ...prev, users, currentUserId: user.id, profile: { ...prev.profile, name: payload.name, email: payload.email, country: payload.country || 'FR', currency: payload.currency || '€' } };
        }
        case 'SIGNIN': {
          const user = prev.users.find(u => u.email === payload.email && u.password === payload.password);
          if (!user) return prev;
          return { ...prev, currentUserId: user.id, profile: { ...prev.profile, name: user.name, email: user.email, country: user.country || 'FR', currency: user.currency || '€' } };
        }
        case 'SIGNOUT':
          return { ...prev, currentUserId: null, onboardingDone: false };

        // Onboarding
        case 'SET_PROFILE':
          return { ...prev, profile: { ...prev.profile, ...payload } };
        case 'FINISH_ONBOARDING':
          return { ...prev, onboardingDone: true, ...payload };

        // Comptes
        case 'ADD_COMPTE':
          return { ...prev, comptes: [...prev.comptes, { id: uid(), ...payload }] };
        case 'UPDATE_COMPTE':
          return { ...prev, comptes: prev.comptes.map(c => c.id === payload.id ? { ...c, ...payload } : c) };
        case 'DELETE_COMPTE':
          return { ...prev, comptes: prev.comptes.filter(c => c.id !== payload) };

        // Revenus
        case 'ADD_REVENU':
          return { ...prev, revenus: [...prev.revenus, { id: uid(), ...payload }] };
        case 'UPDATE_REVENU':
          return { ...prev, revenus: prev.revenus.map(r => r.id === payload.id ? { ...r, ...payload } : r) };
        case 'DELETE_REVENU':
          return { ...prev, revenus: prev.revenus.filter(r => r.id !== payload) };

        // Depenses
        case 'ADD_DEPENSE':
          return { ...prev, depenses: [...prev.depenses, { id: uid(), ...payload }] };
        case 'UPDATE_DEPENSE':
          return { ...prev, depenses: prev.depenses.map(d => d.id === payload.id ? { ...d, ...payload } : d) };
        case 'DELETE_DEPENSE':
          return { ...prev, depenses: prev.depenses.filter(d => d.id !== payload) };

        // Objectifs
        case 'ADD_OBJECTIF':
          return { ...prev, objectifs: [...prev.objectifs, { id: uid(), ...payload }] };
        case 'UPDATE_OBJECTIF':
          return { ...prev, objectifs: prev.objectifs.map(o => o.id === payload.id ? { ...o, ...payload } : o) };
        case 'DELETE_OBJECTIF':
          return { ...prev, objectifs: prev.objectifs.filter(o => o.id !== payload) };

        // Pro
        case 'UPDATE_PRO':
          return { ...prev, pro: { ...prev.pro, ...payload } };

        // Quick figures
        case 'UPDATE_FIGURES':
          return { ...prev, ...payload };

        default:
          return prev;
      }
    });
  }, [setState]);

  const calcs = React.useMemo(() => computeCalcs(state), [state]);

  const value = React.useMemo(() => ({ state, dispatch, calcs }), [state, dispatch, calcs]);

  return React.createElement(StoreContext.Provider, { value }, children);
}

function useStore() {
  return React.useContext(StoreContext);
}

Object.assign(window, {
  COUNTRIES, DIV_REGIMES, uid, fmt, fmtShort, fmtDate,
  computeCalcs, StoreProvider, useStore,
});
