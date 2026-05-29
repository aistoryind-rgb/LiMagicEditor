import React, { useState } from 'react';

export const PolicyBook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 2);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 2);
    }
  };

  return (
    <div className="policy-card policy-book-card" style={{ width: '100%' }}>
      <div className="book-header-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <i className="fa-solid fa-book-open" style={{ color: 'var(--color-primary)' }}></i>
          <span>Official Policy Handbook</span>
        </h3>
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          Grand RP LifeInvader Faction Guidelines
        </span>
      </div>

      <div className="book-container">
        <div className="book-pages-wrapper">
          {/* Left Page */}
          {currentPage === 1 ? (
            <div className="book-page left-page">
              <h4 className="page-title-header">General Rules (Page 1)</h4>
              <div className="page-content-body">
                <p style={{ marginBottom: '12px' }}>
                  All advertisements processed by the LifeInvader faction must comply with GRP server policies. Follow these formatting guidelines:
                </p>
                <ul className="policy-list">
                  <li><strong>Formats:</strong> Always start with <code>Buying</code>, <code>Selling</code>, <code>Trading</code>, or <code>Renting</code>.</li>
                  <li><strong>Accurate Labels:</strong> Buying mode must use <code>Budget:</code> prefix. Selling mode must use <code>Price:</code>.</li>
                  <li><strong>Currency Format:</strong> Capitalize first letters, include a dollar sign (<code>$</code>) and write out values fully (no 'k' or 'm' inside published results).</li>
                  <li><strong>Quantity Limits:</strong> Max 1 vehicle or 3 non-vehicle items per advertisement panel.</li>
                  <li><strong>Locations:</strong> We do not advertise black market, gang HQs, ghetto hubs, or state offices.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="book-page left-page">
              <h4 className="page-title-header">Rejection Only (Page 3)</h4>
              <div className="page-content-body">
                <p style={{ marginBottom: '12px' }}>
                  The following items are restricted from being advertised and must be immediately rejected:
                </p>
                <ul className="policy-list" style={{ color: 'var(--color-warning)' }}>
                  <li>Crowbar, all fabrics, animal skin, and armor skin.</li>
                  <li>Head bags (except luminous variants), air horns.</li>
                  <li>Barricades, traps, poison darts, and army uniforms.</li>
                  <li>Tracking sensors, dangerous razors, resource scanners.</li>
                  <li>First aid kits, medkits, pills of all kinds.</li>
                  <li>Standard food items, steak, burgers, bananas.</li>
                </ul>
              </div>
            </div>
          )}

          <div className="book-divider-line"></div>

          {/* Right Page */}
          {currentPage === 1 ? (
            <div className="book-page right-page">
              <h4 className="page-title-header">Prohibited & Blacklisted (Page 2)</h4>
              <div className="page-content-body">
                <p style={{ marginBottom: '12px' }}>
                  Entering the following words or items will trigger a blacklist warning:
                </p>
                <ul className="policy-list" style={{ color: 'var(--color-primary)' }}>
                  <li><strong>Weapons:</strong> Firearms, ammunition, snipers, rifles, shotguns, lockpicks.</li>
                  <li><strong>Defense:</strong> Bulletproof vests, dark armored vests, tactical shields.</li>
                  <li><strong>Illegal Drugs:</strong> Weed, cocaine, drug, cannabis, seeds.</li>
                  <li><strong>Masks:</strong> EMS surgical mask, surgical masks, medical mask.</li>
                  <li><strong>Scanners:</strong> Radars, vehicle scanners, people scanners.</li>
                  <li><strong>Ropes:</strong> Rope, lock picks, hacker tools, virus USBs.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="book-page right-page">
              <h4 className="page-title-header">Banned Content (Page 4)</h4>
              <div className="page-content-body">
                <p style={{ marginBottom: '12px' }}>
                  These references are strictly banned on advertisement panels and will cause strikes:
                </p>
                <ul className="policy-list">
                  <li><strong>Server Economy:</strong> Grand Coins, Battlepass tickets, GC.</li>
                  <li><strong>Identities:</strong> State Org Leaders, Deputy Leaders (names and titles).</li>
                  <li><strong>Crime:</strong> Gang references, gang HQs, unofficial family names.</li>
                  <li><strong>Trolls:</strong> Prostitution, sexual references, hints, or slave trades.</li>
                  <li><strong>Personal:</strong> Birthday celebrations or celebratory panels.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Footer */}
      <div 
        className="book-footer" 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '16px',
          padding: '12px 24px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)'
        }}
      >
        <button 
          className="btn-preset" 
          onClick={handlePrev} 
          disabled={currentPage === 1}
          style={{ opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
        >
          <i className="fa-solid fa-chevron-left"></i> Previous Page
        </button>
        <span id="book-page-indicator" style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 600 }}>
          Pages {currentPage} - {currentPage + 1} of {totalPages}
        </span>
        <button 
          className="btn-preset" 
          onClick={handleNext} 
          disabled={currentPage === totalPages - 1}
          style={{ opacity: currentPage === totalPages - 1 ? 0.4 : 1, cursor: currentPage === totalPages - 1 ? 'not-allowed' : 'pointer' }}
        >
          Next Page <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};
