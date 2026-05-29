import React, { useState } from 'react';

interface FloatingPipProps {
  rawText: string;
  setRawText: (text: string) => void;
  processedText: string;
}

export const FloatingPip: React.FC<FloatingPipProps> = ({
  rawText,
  setRawText,
  processedText
}) => {
  const [isPipActive, setIsPipActive] = useState(false);

  const handleOpenPip = async () => {
    // Check if the HTML5 Document Picture-in-Picture API is supported
    const pipApi = (window as any).documentPictureInPicture;
    if (!pipApi) {
      alert("Your browser does not support Chrome's interactive Document Picture-in-Picture API yet. Please use a chromium browser like Chrome 116+ or Edge.");
      return;
    }

    try {
      setIsPipActive(true);
      const pipWindow = await pipApi.requestWindow({
        width: 380,
        height: 320,
      });

      // Copy stylesheet link styles into the PiP window's head so styling works
      document.querySelectorAll('link[rel="stylesheet"]').forEach((styleLink) => {
        const clone = styleLink.cloneNode(true);
        pipWindow.document.head.appendChild(clone);
      });

      // Inject custom styling
      const style = pipWindow.document.createElement('style');
      style.textContent = `
        body {
          background: #0f1015 !important;
          color: #f5f5f7 !important;
          font-family: 'Inter', sans-serif;
          padding: 16px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow: hidden;
        }
        .pip-header {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 16px;
          display: flex;
          justify-content: space-between;
          color: #ff3b30;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 8px;
        }
        textarea {
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          color: #fff;
          font-size: 12px;
          padding: 8px;
          height: 70px;
          resize: none;
          outline: none;
        }
        textarea:focus {
          border-color: #ff3b30;
        }
        .output-box {
          background: rgba(48, 209, 88, 0.05);
          border: 1px solid rgba(48, 209, 88, 0.2);
          border-radius: 6px;
          padding: 10px;
          font-size: 12px;
          font-family: monospace;
          min-height: 50px;
          user-select: all;
          color: #30d158;
          word-break: break-all;
        }
        .btn-copy {
          background: #30d158;
          color: #fff;
          border: none;
          padding: 8px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          font-size: 12px;
          text-align: center;
        }
      `;
      pipWindow.document.head.appendChild(style);

      // Create container inside the PiP window
      const container = pipWindow.document.createElement('div');
      container.innerHTML = `
        <div class="pip-header">
          <span>LifeInvader PiP Editor</span>
          <span style="font-size: 10px; color: #8e8e93;">EN3 OFFICIAL</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 10px; color: #8e8e93; text-transform: uppercase;">Raw Input</span>
          <textarea id="pip-raw-input" placeholder="Enter advertisement content..."></textarea>
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <span style="font-size: 10px; color: #8e8e93; text-transform: uppercase;">Processed Output</span>
          <div class="output-box" id="pip-output-box">Processed text will sync here...</div>
        </div>
        <button class="btn-copy" id="pip-copy-btn">Copy Processed Text</button>
      `;
      pipWindow.document.body.appendChild(container);

      // Bind dynamic input synchronization
      const pipInput = pipWindow.document.getElementById('pip-raw-input') as HTMLTextAreaElement;
      const pipOutput = pipWindow.document.getElementById('pip-output-box') as HTMLDivElement;
      const pipCopy = pipWindow.document.getElementById('pip-copy-btn') as HTMLButtonElement;

      // Sync initial states
      pipInput.value = rawText;
      pipOutput.textContent = processedText || "Processed text will sync here...";

      pipInput.addEventListener('input', (e: any) => {
        setRawText(e.target.value);
      });

      pipCopy.addEventListener('click', () => {
        const textToCopy = pipOutput.textContent;
        if (textToCopy && textToCopy !== "Processed text will sync here...") {
          pipWindow.navigator.clipboard.writeText(textToCopy);
          pipCopy.textContent = "Copied!";
          setTimeout(() => {
            pipCopy.textContent = "Copy Processed Text";
          }, 1500);
        }
      });

      // Synchronize back from main window updates
      const interval = setInterval(() => {
        if (pipWindow.closed) {
          clearInterval(interval);
          setIsPipActive(false);
          return;
        }
        // Sync outputs
        const currentOutput = document.querySelector('.processed-text')?.textContent || '';
        if (currentOutput && currentOutput !== 'Processed ad will appear here...') {
          pipOutput.textContent = currentOutput;
        }
      }, 300);

      pipWindow.addEventListener('pagehide', () => {
        clearInterval(interval);
        setIsPipActive(false);
      });

    } catch (err) {
      console.error(err);
      setIsPipActive(false);
    }
  };

  return (
    <div>
      <button 
        className="btn-preset" 
        onClick={handleOpenPip}
        style={{ 
          background: isPipActive ? 'var(--color-primary-glow)' : 'rgba(255, 255, 255, 0.03)',
          borderColor: isPipActive ? 'var(--color-primary)' : 'var(--border-color)',
          color: '#fff',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px'
        }}
      >
        <i className="fa-solid fa-wand-magic-sparkles" style={{ color: 'var(--color-primary)' }}></i>
        <span>{isPipActive ? 'Magic PiP Mode Active' : 'Open Magic Editor Mode'}</span>
      </button>
    </div>
  );
};
