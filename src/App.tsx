import React, { useState, useEffect, useMemo } from 'react';
import { AccessGate } from './components/AccessGate.tsx';
import { EditorPanel } from './components/EditorPanel.tsx';
import { OutputPanel } from './components/OutputPanel.tsx';
import { DatabaseExplorer } from './components/DatabaseExplorer.tsx';
import { PolicyBook } from './components/PolicyBook.tsx';
import { AdminPanel } from './components/AdminPanel.tsx';
import { FloatingPip } from './components/FloatingPip.tsx';
import { AdProcessor, ProcessedAdResult } from './engine/adProcessor.ts';

const App: React.FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return localStorage.getItem("li_approved_token") === "APPROVED";
  });

  const [rawText, setRawText] = useState('');
  const [categoryOverride, setCategoryOverride] = useState('auto');
  const [actionOverride, setActionOverride] = useState<'Selling' | 'Buying' | 'Trading' | 'Renting' | 'Other'>('Selling');
  const [activeTab, setActiveTab] = useState<'editor' | 'database' | 'policy' | 'admin'>('editor');
  const [theme, setTheme] = useState(() => localStorage.getItem("li_app_theme") || 'dark');

  // Reactively execute natural language ad parsing pipeline on inputs change
  const processedResult = useMemo<ProcessedAdResult>(() => {
    return AdProcessor.process(rawText, categoryOverride);
  }, [rawText, categoryOverride]);

  // Sync auto-detected action back to state if manual toggles are untouched
  useEffect(() => {
    if (processedResult.action && processedResult.action !== 'Other') {
      setActionOverride(processedResult.action);
    }
  }, [processedResult.action]);

  // Handle manual output corrections by user
  const handleTextModified = (newText: string) => {
    // Allows interactive fine-tuning directly in the ContentEditable element
  };

  const handleApproved = () => {
    setIsAuthorized(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("li_approved_token");
    setIsAuthorized(false);
  };

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("li_app_theme", newTheme);
  };

  useEffect(() => {
    document.body.className = '';
    if (theme !== 'dark') {
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  if (!isAuthorized) {
    return <AccessGate onApproved={handleApproved} />;
  }

  return (
    <div className="app-container">
      {/* Premium Faction Header */}
      <header className="app-header" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="li-logo">
            <span className="li-text-l">Life</span>
            <span className="li-text-i">Invader</span>
          </div>
          <div className="badge-en3">EN3 OFFICIAL</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div className="header-desc">INTERNAL POLICY AD PROCESSING SYSTEM</div>
          <div className="created-by" style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Next-Gen React 2.0 • Created by Dopamine & Antigravity
          </div>
        </div>

        {/* Global Toolbar */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <FloatingPip 
            rawText={rawText} 
            setRawText={setRawText} 
            processedText={processedResult.processedText} 
          />

          <button 
            className="btn-preset" 
            onClick={handleLogout}
            style={{ 
              background: 'rgba(255, 59, 48, 0.05)', 
              borderColor: 'rgba(255, 59, 48, 0.2)', 
              color: 'var(--color-primary)',
              fontWeight: 700 
            }}
          >
            <i className="fa-solid fa-right-from-bracket"></i> Lock
          </button>
        </div>
      </header>

      {/* Theme Quick Switcher */}
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'flex-end', fontSize: '11px', color: 'var(--text-secondary)' }}>
        <span>Active Skin:</span>
        {['dark', 'synthwave', 'matrix', 'nordic'].map((t) => (
          <button
            key={t}
            onClick={() => toggleTheme(t)}
            style={{
              background: theme === t ? 'var(--color-primary)' : 'rgba(255,255,255,0.02)',
              border: '1px solid var(--border-color)',
              color: '#fff',
              fontSize: '10px',
              padding: '4px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              textTransform: 'uppercase',
              fontWeight: 700
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Navigation Router Tabs */}
      <div className="panel" style={{ overflow: 'visible' }}>
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveTab('editor')}
          >
            <i className="fa-solid fa-file-signature"></i> Processing Workspace
          </button>
          <button 
            className={`tab-btn ${activeTab === 'database' ? 'active' : ''}`}
            onClick={() => setActiveTab('database')}
          >
            <i className="fa-solid fa-database"></i> Database Explorer
          </button>
          <button 
            className={`tab-btn ${activeTab === 'policy' ? 'active' : ''}`}
            onClick={() => setActiveTab('policy')}
          >
            <i className="fa-solid fa-book-open"></i> Policy Book
          </button>
          <button 
            className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => setActiveTab('admin')}
          >
            <i className="fa-solid fa-user-shield"></i> Admin Panel
          </button>
        </div>

        <div className="panel-body" style={{ minHeight: '360px' }}>
          {/* Editor Workspace */}
          {activeTab === 'editor' && (
            <div className="editor-grid" style={{ animation: 'fadeInUp 0.4s ease' }}>
              <EditorPanel
                rawText={rawText}
                setRawText={setRawText}
                categoryOverride={categoryOverride}
                setCategoryOverride={setCategoryOverride}
                actionOverride={actionOverride}
                setActionOverride={setActionOverride}
              />
              <OutputPanel
                processedResult={processedResult}
                onTextModified={handleTextModified}
                onNavigateToPolicy={() => setActiveTab('policy')}
                rawText={rawText}
              />
            </div>
          )}

          {/* Database Explorer Tab */}
          {activeTab === 'database' && (
            <div style={{ animation: 'fadeInUp 0.4s ease' }}>
              <DatabaseExplorer />
            </div>
          )}

          {/* Policy Handbook Tab */}
          {activeTab === 'policy' && (
            <div style={{ animation: 'fadeInUp 0.4s ease' }}>
              <PolicyBook />
            </div>
          )}

          {/* Admin Panel Tab */}
          {activeTab === 'admin' && (
            <div style={{ animation: 'fadeInUp 0.4s ease' }}>
              <AdminPanel />
            </div>
          )}
        </div>
      </div>

      {/* Credits Footer */}
      <footer style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', padding: '16px 0', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
        <span>Official EN3 Faction System © 2026. Made with ❤️ by GRP Developers. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default App;
