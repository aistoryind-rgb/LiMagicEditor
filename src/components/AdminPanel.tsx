import React, { useState } from 'react';

export const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("li_gemini_api_key") || '');
  const [scriptUrl, setScriptUrl] = useState(() => localStorage.getItem("li_script_url") || '');

  const handleUnlock = () => {
    // Master bypass or developer key
    if (passcode === "DOPAMINE_CREATOR" || passcode === "12345") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid Passcode.");
    }
  };

  const handleSaveConfig = () => {
    localStorage.setItem("li_gemini_api_key", apiKey);
    localStorage.setItem("li_script_url", scriptUrl);
    alert("Configuration parameters updated successfully!");
  };

  return (
    <div style={{ position: 'relative', minHeight: '300px' }}>
      {!isAuthenticated ? (
        <div 
          className="admin-auth-container" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            padding: '40px 20px',
            background: 'rgba(0,0,0,0.2)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)'
          }}
        >
          <i className="fa-solid fa-lock" style={{ fontSize: '32px', color: 'var(--color-primary)', marginBottom: '16px' }}></i>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px' }}>Creator Authorization Required</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '12px', textAlign: 'center', maxWidth: '320px', marginTop: '6px', marginBottom: '16px' }}>
            This panel contains advanced configurations and is restricted to system administrators.
          </p>
          <div className="form-group" style={{ maxWidth: '300px', width: '100%', marginBottom: '12px' }}>
            <input 
              type="password" 
              placeholder="Enter Admin Passcode" 
              value={passcode} 
              onChange={(e) => setPasscode(e.target.value)}
              style={{ textAlign: 'center', fontFamily: 'monospace' }}
            />
          </div>
          <button className="btn-action" onClick={handleUnlock} style={{ maxWidth: '200px', width: '100%' }}>
            <i className="fa-solid fa-unlock"></i> Unlock Panel
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeInUp 0.4s ease' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px' }}>API Configurations Vault</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '4px' }}>
              Configure secure integration credentials and natural language processing settings.
            </p>
          </div>

          <div className="form-row">
            <div className="form-group col-6">
              <label>Gemini API Token Key</label>
              <input 
                type="password" 
                placeholder="AIzaSy..." 
                value={apiKey} 
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
            <div className="form-group col-6">
              <label>Google Apps Script URL (Triage)</label>
              <input 
                type="text" 
                placeholder="https://script.google.com/macros/s/..." 
                value={scriptUrl} 
                onChange={(e) => setScriptUrl(e.target.value)}
              />
            </div>
          </div>

          <button className="btn-action" onClick={handleSaveConfig} style={{ alignSelf: 'flex-start' }}>
            <i className="fa-solid fa-cloud-arrow-up"></i> Save API Configuration
          </button>

          {/* Audit Metrics */}
          <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', marginBottom: '12px' }}>Faction Processing Audit Logs</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
              <div className="metric-box" style={{ background: 'rgba(10, 132, 255, 0.05)', borderColor: 'rgba(10, 132, 255, 0.2)' }}>
                <span className="metric-value" style={{ color: 'var(--color-info)' }}>1,492</span>
                <span className="metric-label">Approved Ads</span>
              </div>
              <div className="metric-box" style={{ background: 'rgba(255, 159, 10, 0.05)', borderColor: 'rgba(255, 159, 10, 0.2)' }}>
                <span className="metric-value" style={{ color: 'var(--color-warning)' }}>218</span>
                <span className="metric-label">Policy Rejections</span>
              </div>
              <div className="metric-box" style={{ background: 'rgba(255, 59, 48, 0.05)', borderColor: 'rgba(255, 59, 48, 0.2)' }}>
                <span className="metric-value" style={{ color: 'var(--color-primary)' }}>45</span>
                <span className="metric-label">Blacklist Triggers</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
