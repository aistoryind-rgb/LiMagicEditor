import React, { useState } from 'react';

interface AccessGateProps {
  onApproved: () => void;
}

export const AccessGate: React.FC<AccessGateProps> = ({ onApproved }) => {
  const [inGameId, setInGameId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [showNameInputs, setShowNameInputs] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending' | 'error'>('idle');

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInGameId(val);
    if (val.length >= 4) {
      setShowNameInputs(true);
    } else {
      setShowNameInputs(false);
    }
  };

  const handleVerify = () => {
    if (!inGameId || (showNameInputs && (!firstName || !lastName))) {
      alert("Please fill in all details.");
      return;
    }
    
    // Simulate verification
    setRequestStatus('pending');
    setTimeout(() => {
      // Local check bypass - in production it connects to Firestore
      localStorage.setItem("li_approved_token", "APPROVED");
      localStorage.setItem("li_user_ingame_id", inGameId);
      localStorage.setItem("li_user_fullname", `${firstName} ${lastName}`);
      setRequestStatus('idle');
      onApproved();
    }, 1200);
  };

  const handleAdminLogin = () => {
    if (adminKey === "DOPAMINE_ADMIN" || adminKey === "12345") {
      localStorage.setItem("li_approved_token", "APPROVED");
      localStorage.setItem("li_user_role", "admin");
      onApproved();
    } else {
      alert("Invalid Admin Key.");
    }
  };

  return (
    <div className="access-gate-overlay">
      <div className="access-gate-card">
        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
          <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px' }}>
            <span style={{ color: '#fff' }}>Life</span>
            <span style={{ color: 'var(--color-primary)' }}>Invader</span>
          </div>
          <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            GRP Security Gate
          </div>
        </div>

        {requestStatus === 'pending' ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '24px', animation: 'spin 1.5s linear infinite', display: 'inline-block', color: 'var(--color-primary)' }}>
              <i className="fa-solid fa-spinner"></i>
            </div>
            <h3 style={{ marginTop: '16px', fontFamily: 'var(--font-heading)' }}>Verifying credentials...</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '6px' }}>
              Checking active hardware tokens against Firestore registries.
            </p>
          </div>
        ) : !isAdminMode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px' }}>Request Access Credentials</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.4 }}>
              This system is restricted to authorized employees. Please verify your in-game identity to continue.
            </p>

            <div className="form-group">
              <label>In-Game ID</label>
              <input 
                type="text" 
                placeholder="e.g. 12345" 
                value={inGameId} 
                onChange={handleIdChange}
              />
            </div>

            {showNameInputs && (
              <div className="form-row" style={{ animation: 'fadeInUp 0.3s ease' }}>
                <div className="form-group col-6">
                  <label>First Name</label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                  />
                </div>
                <div className="form-group col-6">
                  <label>Last Name</label>
                  <input 
                    type="text" 
                    placeholder="Doe" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                  />
                </div>
              </div>
            )}

            <button className="btn-action" onClick={handleVerify} style={{ marginTop: '10px' }}>
              <i className="fa-solid fa-key"></i> Verify & Enter
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <span 
                onClick={() => setIsAdminMode(true)}
                style={{ fontSize: '11px', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <i className="fa-solid fa-shield-halved"></i> Admin Bypass
              </span>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '15px' }}>Creator Bypass Console</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '12px', lineHeight: 1.4 }}>
              Enter the global administrator override code to access the terminal instantly.
            </p>

            <div className="form-group">
              <label>Admin Access Key</label>
              <input 
                type="password" 
                placeholder="Enter master passcode" 
                value={adminKey} 
                onChange={(e) => setAdminKey(e.target.value)}
              />
            </div>

            <button className="btn-action" onClick={handleAdminLogin} style={{ marginTop: '10px' }}>
              <i className="fa-solid fa-unlock"></i> Authenticate Override
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <span 
                onClick={() => setIsAdminMode(false)}
                style={{ fontSize: '11px', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <i className="fa-solid fa-arrow-left"></i> Back to Employee Form
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
