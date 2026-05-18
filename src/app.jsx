/* app.jsx — root component, routing, auth/onboarding/main flow */

function MainApp() {
  const [activeTab, setActiveTab] = React.useState('cockpit');
  // Stack: each item is { screen, params }
  const [stack, setStack] = React.useState([]);

  const nav = React.useMemo(() => ({
    push(screen, params) {
      // 'scenarios' shortcut: just switch tab
      if (screen === 'scenarios') {
        setStack([]);
        setActiveTab('scenarios');
        return;
      }
      setStack(s => [...s, { screen, params: params || {} }]);
    },
    pop() {
      setStack(s => s.slice(0, -1));
    },
    tab(t) {
      setStack([]);
      setActiveTab(t);
    },
  }), []);

  // Resolve the current screen to render
  const topScreen = stack.length > 0 ? stack[stack.length - 1].screen : null;

  let screenContent = null;
  if (topScreen) {
    switch (topScreen) {
      case 'mission':
        screenContent = <ScenarioMission nav={nav} />;
        break;
      case 'dividende':
        screenContent = <ScenarioDividende nav={nav} />;
        break;
      case 'achat':
        screenContent = <ScenarioAchat nav={nav} />;
        break;
      case 'dca':
        screenContent = <ScenarioDCA nav={nav} />;
        break;
      default:
        screenContent = (
          <div style={{ padding: 24, textAlign: 'center', color: C.inkSoft }}>
            <div style={{ fontSize: 14, marginBottom: 16 }}>Scénario à venir</div>
            <Btn variant="secondary" onClick={() => nav.pop()} style={{ width: 'auto' }}>← Retour</Btn>
          </div>
        );
    }
  } else {
    switch (activeTab) {
      case 'cockpit':
        screenContent = <CockpitScreen nav={nav} />;
        break;
      case 'comptes':
        screenContent = <ComptesScreen nav={nav} />;
        break;
      case 'scenarios':
        screenContent = <ScenariosScreen nav={nav} />;
        break;
      case 'objectifs':
        screenContent = <ObjectifsScreen nav={nav} />;
        break;
      default:
        screenContent = <CockpitScreen nav={nav} />;
    }
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: '0 0 72px 0', overflowY: 'auto' }}>
        {screenContent}
      </div>
      <BottomTabs active={activeTab} onTab={nav.tab} />
    </div>
  );
}

function App() {
  const { state } = useStore();
  const [authScreen, setAuthScreen] = React.useState('welcome'); // welcome | signup | signin

  const isLoggedIn = !!state.currentUserId;
  const needsOnboarding = isLoggedIn && !state.onboardingDone;

  if (!isLoggedIn) {
    if (authScreen === 'signup') {
      return <AuthSignUp onBack={() => setAuthScreen('welcome')} onDone={() => setAuthScreen('welcome')} />;
    }
    if (authScreen === 'signin') {
      return <AuthSignIn onBack={() => setAuthScreen('welcome')} onDone={() => setAuthScreen('welcome')} />;
    }
    return <AuthWelcome onSignUp={() => setAuthScreen('signup')} onSignIn={() => setAuthScreen('signin')} />;
  }

  if (needsOnboarding) {
    return <OnbWizard onDone={() => {}} />;
  }

  return <MainApp />;
}

function Root() {
  return (
    <StoreProvider>
      <App />
    </StoreProvider>
  );
}

const rootEl = document.getElementById('root');
ReactDOM.createRoot(rootEl).render(React.createElement(Root));
