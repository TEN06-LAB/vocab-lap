import { Pencil, Trash2 } from 'lucide-react';
import { getPosColor } from '../utils/helpers.js';
import { DISPLAY_FONT, MONO_FONT } from '../styles/tokens.js';
import Chip from './Chip.jsx';

export default function EntryCard({ entry, rotate, onEdit, onDelete }) {
  const color = getPosColor(entry.pos);
  return (
    <div className="vl-card" style={{ padding: '18px 16px 14px', transform: `rotate(${rotate}deg)` }}>
      <div className="vl-tape" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 26, color: '#2A2A22' }}>
            {entry.word}
          </span>
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              background: color,
              color: '#2A2A22',
              padding: '2px 7px',
              borderRadius: 4,
            }}
          >
            {entry.pos}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="vl-btn" onClick={onEdit} style={{ background: 'none', padding: 4, color: '#6b6550' }}>
            <Pencil size={15} />
          </button>
          <button className="vl-btn" onClick={onDelete} style={{ background: 'none', padding: 4, color: '#6b6550' }}>
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div style={{ fontSize: 14.5, color: '#3a3728', marginBottom: 8 }}>{entry.meaning}</div>

      {entry.example && (
        <div style={{ fontFamily: MONO_FONT, fontSize: 12.5, color: '#5a5642', background: '#EAE3CB', padding: '7px 9px', borderRadius: 5, marginBottom: 8, lineHeight: 1.5 }}>
          {entry.example}
        </div>
      )}

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {entry.pattern && <Chip label={`pattern: ${entry.pattern}`} bg="#DDE6DA" />}
        {entry.collocation && <Chip label={`colloc: ${entry.collocation}`} bg="#E4DCEE" />}
        {entry.topic && <Chip label={entry.topic} bg="#F0E6C8" />}
      </div>
    </div>
  );
}
