import { PAPER, PAPER_LINE, MINT, YELLOW, BODY_FONT } from '../styles/tokens.js';

export default function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Be+Vietnam+Pro:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

      * { box-sizing: border-box; }
      body { margin: 0; }

      .vl-dash {
        border-bottom: 2px dashed rgba(241,237,227,0.35);
      }
      .vl-btn {
        font-family: ${BODY_FONT};
        cursor: pointer;
        border: none;
        transition: transform 0.12s ease, opacity 0.12s ease;
      }
      .vl-btn:active { transform: scale(0.96); }
      .vl-btn:focus-visible {
        outline: 3px solid ${YELLOW};
        outline-offset: 2px;
      }
      .vl-card {
        background: ${PAPER};
        border-radius: 4px;
        box-shadow: 0 6px 14px rgba(0,0,0,0.28);
        position: relative;
      }
      .vl-tape {
        position: absolute;
        top: -10px;
        left: 20px;
        width: 46px;
        height: 18px;
        background: rgba(241,237,227,0.5);
        border: 1px solid rgba(0,0,0,0.05);
        transform: rotate(-3deg);
      }
      .vl-input {
        font-family: ${BODY_FONT};
        background: ${PAPER};
        border: 1px solid ${PAPER_LINE};
        border-radius: 6px;
        padding: 9px 11px;
        font-size: 14px;
        color: #2A2A22;
        width: 100%;
      }
      .vl-input:focus {
        outline: 2px solid ${MINT};
        outline-offset: 0;
      }
      .vl-label {
        font-size: 12px;
        font-weight: 600;
        color: rgba(241,237,227,0.75);
        margin-bottom: 4px;
        display: block;
      }

      @media (prefers-reduced-motion: reduce) {
        .vl-btn, .vl-flip { transition: none !important; }
      }
    `}</style>
  );
}
