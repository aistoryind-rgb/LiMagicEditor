import React, { useState, useEffect } from 'react';
import { PRESET_BUTTONS_DEFAULT } from '../engine/rules.ts';

interface EditorPanelProps {
  rawText: string;
  setRawText: (text: string) => void;
  categoryOverride: string;
  setCategoryOverride: (cat: string) => void;
  actionOverride: 'Selling' | 'Buying' | 'Trading' | 'Renting' | 'Other';
  setActionOverride: (action: 'Selling' | 'Buying' | 'Trading' | 'Renting' | 'Other') => void;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({
  rawText,
  setRawText,
  categoryOverride,
  setCategoryOverride,
  actionOverride,
  setActionOverride
}) => {
  const [presets, setPresets] = useState(PRESET_BUTTONS_DEFAULT);

  useEffect(() => {
    const saved = localStorage.getItem("li_most_used_ads");
    if (saved) {
      try {
        setPresets(JSON.parse(saved));
      } catch (e) {
        // Fallback
      }
    }
  }, [rawText]);

  const handleClear = () => {
    setRawText('');
    setCategoryOverride('auto');
    setActionOverride('Selling');
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRawText(text);
    } catch (err) {
      alert("Clipboard access blocked. Please paste manually.");
    }
  };

  const handlePresetClick = (presetRaw: string) => {
    setRawText(presetRaw);
  };

  return (
    <section className="panel input-panel">
      <div className="panel-header">
        <i className="fa-solid fa-file-pen panel-icon"></i>
        <h2>Raw Advertisement</h2>
      </div>
      <div className="panel-body">
        {/* Raw Text Input */}
        <div className="form-group">
          <label style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Paste raw ad text</span>
            <span style={{ color: rawText.length > 80 ? 'var(--color-primary)' : 'inherit' }}>
              {rawText.length} characters
            </span>
          </label>
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder="e.g. buying fully upgraded sandking xl 12m budget negotiable or trade for obay r8..."
          />
          <div className="processed-action-row" style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button className="btn-clear" onClick={handleClear} style={{ flexGrow: 1 }}>
              <i className="fa-solid fa-trash-can"></i> Clear
            </button>
            <button className="btn-paste" onClick={handlePaste} style={{ flexGrow: 2 }}>
              <i className="fa-solid fa-paste"></i> Paste From Clipboard
            </button>
          </div>
        </div>

        {/* Configurations Row */}
        <div className="form-row">
          <div className="form-group col-6">
            <label>Action Mode</label>
            <div className="action-toggle-group">
              <button 
                className={`btn-toggle ${actionOverride === 'Selling' ? 'active' : ''}`}
                onClick={() => setActionOverride('Selling')}
              >
                <i className="fa-solid fa-tags"></i> Sell
              </button>
              <button 
                className={`btn-toggle ${actionOverride === 'Buying' ? 'active' : ''}`}
                onClick={() => setActionOverride('Buying')}
              >
                <i className="fa-solid fa-cart-shopping"></i> Buy
              </button>
            </div>
          </div>
          <div className="form-group col-6">
            <label>Category Override</label>
            <select 
              value={categoryOverride}
              onChange={(e) => setCategoryOverride(e.target.value)}
            >
              <option value="auto">Auto-Detect Category</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Auto">Auto</option>
              <option value="Businesses">Businesses</option>
              <option value="Work">Work</option>
              <option value="Dating">Dating</option>
              <option value="Services">Services</option>
              <option value="Discounts">Discounts</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Preset Buttons Grid */}
        <div className="presets-section" style={{ marginTop: '10px' }}>
          <h3>
            <i className="fa-solid fa-wand-magic-sparkles"></i> 
            <span>Most Used Presets</span>
          </h3>
          <div className="preset-buttons" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '8px' }}>
            {presets.slice(0, 12).map((preset, index) => (
              <button
                key={index}
                type="button"
                className="btn-preset"
                title={preset.raw}
                onClick={() => handlePresetClick(preset.raw)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
