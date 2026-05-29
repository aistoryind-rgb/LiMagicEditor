import React, { useState } from 'react';
import { ProcessedAdResult } from '../engine/adProcessor';

interface OutputPanelProps {
  processedResult: ProcessedAdResult;
  onTextModified: (newText: string) => void;
  onNavigateToPolicy: () => void;
  rawText: string;
}

export const OutputPanel: React.FC<OutputPanelProps> = ({
  processedResult,
  onTextModified,
  onNavigateToPolicy,
  rawText
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!processedResult.processedText) return;
    navigator.clipboard.writeText(processedResult.processedText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      // Save to presets
      const saved = localStorage.getItem("li_most_used_ads");
      let presets = [];
      try {
        presets = saved ? JSON.parse(saved) : [];
      } catch (e) {
        presets = [];
      }

      const cleanRaw = rawText.trim().toLowerCase();
      const existing = presets.find((p: any) => p.raw.toLowerCase() === cleanRaw);
      if (existing) {
        existing.count += 1;
      } else {
        // Truncate raw text to make label
        const truncated = rawText.length > 20 ? rawText.substring(0, 17) + "..." : rawText;
        presets.push({ label: `Auto: ${truncated}`, raw: rawText, count: 1 });
      }
      localStorage.setItem("li_most_used_ads", JSON.stringify(presets));
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <i className="fa-solid fa-circle-check"></i>;
      case 'rejected':
        return <i className="fa-solid fa-circle-exclamation"></i>;
      case 'blacklisted':
        return <i className="fa-solid fa-ban"></i>;
      default:
        return <i className="fa-solid fa-hourglass-half"></i>;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'passed':
        return 'Policy Approved';
      case 'rejected':
        return 'Policy Rejected';
      case 'blacklisted':
        return 'Blacklist Warning';
      default:
        return 'Awaiting Input...';
    }
  };

  return (
    <section className="panel output-panel">
      <div className="panel-header">
        <i className="fa-solid fa-square-poll-vertical panel-icon"></i>
        <h2>Processed Output</h2>
      </div>
      <div className="panel-body">
        {/* Output Text Field */}
        <div className="form-group">
          <label><i className="fa-solid fa-bullhorn"></i> Final Advertisement Text</label>
          <div className="processed-container" style={{ minHeight: '100px', height: 'auto' }}>
            <div className="processed-text-wrapper" style={{ padding: '16px' }}>
              <div
                className={`processed-text ${processedResult.status === 'pending' ? 'placeholder' : ''}`}
                contentEditable={processedResult.status !== 'pending'}
                suppressContentEditableWarning
                onBlur={(e) => onTextModified(e.target.textContent || '')}
                style={{ outline: 'none', minHeight: '40px', width: '100%' }}
              >
                {processedResult.processedText || 'Processed ad will appear here...'}
              </div>
            </div>
          </div>
          <div className="processed-action-row" style={{ marginTop: '8px' }}>
            <button
              className={`btn-copy ${copied ? 'copied' : ''}`}
              disabled={processedResult.status === 'pending'}
              onClick={handleCopy}
              style={{ width: '100%' }}
            >
              {copied ? (
                <>
                  <i className="fa-solid fa-check"></i> Copied to Clipboard!
                </>
              ) : (
                <>
                  <i className="fa-solid fa-copy"></i> Copy Advertisement
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="status-banner" data-status={processedResult.status} style={{ margin: '8px 0' }}>
          <span className="status-icon">{getStatusIcon(processedResult.status)}</span>
          <span className="status-title">{getStatusLabel(processedResult.status)}</span>
        </div>

        {/* Rejection / Warning Card */}
        {processedResult.status === 'rejected' && (
          <div className="notice-container" style={{ animation: 'shake 0.4s ease' }}>
            <div className="notice-box rejection">
              <div className="notice-header">
                <i className="fa-solid fa-circle-xmark"></i> Rejection Reason
              </div>
              <div className="notice-body">{processedResult.rejectionReason}</div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  className="btn-preset"
                  onClick={onNavigateToPolicy}
                  style={{ flexGrow: 1, textAlign: 'center', background: 'rgba(255, 159, 10, 0.1)', color: 'var(--color-warning)' }}
                >
                  <i className="fa-solid fa-book-open"></i> Open Policy Handbook
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Blacklist Card */}
        {processedResult.status === 'blacklisted' && (
          <div className="notice-container" style={{ animation: 'shake 0.4s ease' }}>
            <div className="notice-box blacklist">
              <div className="notice-header">
                <i className="fa-solid fa-ban"></i> Blacklisted Item Found
              </div>
              <div className="notice-body">{processedResult.blacklistReason}</div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                <button
                  className="btn-preset"
                  onClick={onNavigateToPolicy}
                  style={{ flexGrow: 1, textAlign: 'center', background: 'rgba(255, 59, 48, 0.1)', color: 'var(--color-primary)' }}
                >
                  <i className="fa-solid fa-circle-question"></i> View Blacklist Guidelines
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Applied Rules / Audit Logs */}
        <div style={{ marginTop: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '8px' }}>
            <i className="fa-solid fa-list-check"></i> Applied corrections and audits
          </div>
          <ul
            style={{
              padding: '12px 16px',
              background: 'rgba(0, 0, 0, 0.25)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              listStyle: 'none',
              maxHeight: '120px',
              overflowY: 'auto',
              fontSize: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}
          >
            {processedResult.logs.length === 0 ? (
              <li style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                No operations performed yet. Enter raw text to execute audits.
              </li>
            ) : (
              processedResult.logs.map((log, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: log }} style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '8px', color: 'var(--text-secondary)' }}></li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};
