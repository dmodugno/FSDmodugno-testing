import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import PickOils from './components/PickOils';
import ProtocolOutput from './components/ProtocolOutput';
import SavedSets from './components/SavedSets';
import Overrides from './components/Overrides';
import Backup from './components/Backup';
import type { EffectiveRules } from './engine/types';
import { loadBaseRules, applyOverrides } from './engine/rulesLoader';
import { loadOverrides } from './db';

function App() {
  const [effectiveRules, setEffectiveRules] = useState<EffectiveRules | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const baseRules = await loadBaseRules();
        const overrides = await loadOverrides();
        const effective = applyOverrides(baseRules, overrides);
        setEffectiveRules(effective);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load rules');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error || !effectiveRules) {
    return <div className="error">Error: {error || 'Failed to load rules'}</div>;
  }

  return (
    <HashRouter>
      <div className="app">
        <nav>
          <h1>Essential Oil Protocol</h1>
          <ul>
            <li><Link to="/">Pick Oils</Link></li>
            <li><Link to="/saved">Saved Sets</Link></li>
            <li><Link to="/overrides">Overrides</Link></li>
            <li><Link to="/backup">Backup</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<PickOils effectiveRules={effectiveRules} />} />
            <Route path="/protocol" element={<ProtocolOutput effectiveRules={effectiveRules} />} />
            <Route path="/saved" element={<SavedSets />} />
            <Route path="/overrides" element={<Overrides effectiveRules={effectiveRules} onUpdate={async () => {
              const baseRules = await loadBaseRules();
              const overrides = await loadOverrides();
              setEffectiveRules(applyOverrides(baseRules, overrides));
            }} />} />
            <Route path="/backup" element={<Backup />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
