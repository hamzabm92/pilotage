/* auth.jsx — Welcome, SignUp, SignIn screens */

// ─── Pilot Logo ─────────────────────────────────────────────────
function PilotLogo({ size = 40 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#1F1F1F" strokeWidth="1.6" />
        <path d="M6 20 Q 20 6 34 20" stroke="#2563EB" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M6 20 Q 20 34 34 20" stroke="#7C3AED" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <circle cx="20" cy="20" r="2.5" fill="#1F1F1F" />
      </svg>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: size * 0.75, fontWeight: 700, color: '#1F1F1F', lineHeight: 1 }}>Pilotage</div>
    </div>
  );
}

// ─── Auth Welcome ───────────────────────────────────────────────
function AuthWelcome({ onSignUp, onSignIn }) {
  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      padding: '32px 24px 28px',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ marginBottom: 28 }}>
          <PilotLogo size={48} />
        </div>

        <div style={{ fontSize: 28, lineHeight: 1.2, fontWeight: 700, color: '#1F1F1F', marginBottom: 12 }}>
          Le cockpit financier pour piloter ta trajectoire.
        </div>
        <div style={{ fontSize: 14, color: '#4a4a4a', lineHeight: 1.5, marginBottom: 8 }}>
          Patrimoine, sécurité, scénarios. Sache combien tu peux dépenser, investir ou sortir sans mettre ta sécurité en danger.
        </div>

        <svg width="120" height="6" style={{ marginBottom: 32 }}>
          <path d="M2 4 Q 30 1 60 4 T 118 3" stroke="#2563EB" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </svg>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Btn onClick={onSignUp}>Créer un compte</Btn>
          <Btn variant="secondary" onClick={onSignIn}>J'ai déjà un compte</Btn>
        </div>

        <div style={{ fontSize: 12, color: '#7a7770', textAlign: 'center', marginTop: 20 }}>
          Saisie manuelle · pas de connexion bancaire requise.
        </div>
      </div>

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', fontSize: 11, color: '#7a7770' }}>
        <span>CGU</span><span>·</span><span>Confidentialité</span>
      </div>
    </div>
  );
}

// ─── Auth Sign Up ────────────────────────────────────────────────
function AuthSignUp({ onBack, onDone }) {
  const { dispatch } = useStore();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [country, setCountry] = React.useState('FR');
  const [error, setError] = React.useState('');

  function handleSubmit() {
    if (!name.trim()) return setError('Ton prénom est requis.');
    if (!email.includes('@')) return setError('Email invalide.');
    if (password.length < 6) return setError('Mot de passe trop court (6 min).');
    setError('');
    const cur = COUNTRIES.find(c => c.code === country);
    dispatch('SIGNUP', { name: name.trim(), email: email.trim(), password, country, currency: cur ? cur.symbol : '€' });
    onDone && onDone();
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', padding: '20px 24px 40px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <button onClick={onBack} style={{ border: 'none', background: 'transparent', fontSize: 22, color: '#7a7770', cursor: 'pointer', marginBottom: 16, padding: 0 }}>←</button>

      <PilotLogo size={36} />

      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 20, marginBottom: 6 }}>Créer un compte</div>
      <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 20 }}>Gratuit · données locales uniquement.</div>

      <Input label="Prénom" value={name} onChange={setName} placeholder="Ton prénom" />
      <Input label="Email" value={email} onChange={setEmail} placeholder="toi@exemple.com" type="email" />
      <Input label="Mot de passe" value={password} onChange={setPassword} placeholder="6+ caractères" type="password" />

      <div style={{ fontSize: 12, fontWeight: 700, color: '#1F1F1F', marginTop: 12, marginBottom: 8 }}>PAYS DE RÉSIDENCE</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {COUNTRIES.map(c => (
          <button key={c.code} onClick={() => setCountry(c.code)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '5px 10px', borderRadius: 999,
            border: country === c.code ? '1.6px solid #1F1F1F' : '1.2px solid #c9c6bd',
            background: country === c.code ? '#1F1F1F' : '#FAF8F1',
            color: country === c.code ? '#fff' : '#1F1F1F',
            fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap',
            boxShadow: country === c.code ? '2px 2px 0 0 rgba(31,31,31,0.12)' : 'none',
            fontFamily: 'Inter, system-ui, sans-serif',
          }}>
            <span>{c.flag}</span>{c.name}
          </button>
        ))}
      </div>

      {error && <div style={{ color: '#DC2626', fontSize: 13, marginBottom: 10, padding: '8px 12px', border: '1px solid #DC2626', borderRadius: 8 }}>{error}</div>}

      <Btn onClick={handleSubmit} accent="pro">Créer mon compte →</Btn>
    </div>
  );
}

// ─── Auth Sign In ────────────────────────────────────────────────
function AuthSignIn({ onBack, onDone }) {
  const { dispatch, state } = useStore();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  function handleSubmit() {
    const user = state.users.find(u => u.email === email && u.password === password);
    if (!user) return setError('Email ou mot de passe incorrect.');
    setError('');
    dispatch('SIGNIN', { email, password });
    onDone && onDone();
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '20px 24px 40px', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <button onClick={onBack} style={{ border: 'none', background: 'transparent', fontSize: 22, color: '#7a7770', cursor: 'pointer', marginBottom: 16, padding: 0 }}>←</button>

      <PilotLogo size={36} />

      <div style={{ fontSize: 22, fontWeight: 700, marginTop: 20, marginBottom: 6 }}>Connexion</div>
      <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 20 }}>Bon retour dans le cockpit.</div>

      <Input label="Email" value={email} onChange={setEmail} placeholder="toi@exemple.com" type="email" />
      <Input label="Mot de passe" value={password} onChange={setPassword} placeholder="••••••••" type="password" />

      {error && <div style={{ color: '#DC2626', fontSize: 13, marginBottom: 10, padding: '8px 12px', border: '1px solid #DC2626', borderRadius: 8 }}>{error}</div>}

      <div style={{ marginTop: 8 }}>
        <Btn onClick={handleSubmit} accent="pro">Se connecter →</Btn>
      </div>

      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <button onClick={onBack} style={{ border: 'none', background: 'transparent', color: '#6b6b6b', fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, system-ui, sans-serif' }}>
          Pas encore de compte ? Créer un compte
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { PilotLogo, AuthWelcome, AuthSignUp, AuthSignIn });
