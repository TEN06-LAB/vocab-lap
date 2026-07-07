import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { POS_OPTIONS } from '../utils/helpers.js';
import { DISPLAY_FONT, MINT } from '../styles/tokens.js';

export default function EntryForm({ initial, topics, onCancel, onSubmit }) {
  const [form, setForm] = useState(initial);
  const wordRef = useRef(null);

  useEffect(() => {
    wordRef.current && wordRef.current.focus();
  }, []);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const canSubmit = form.word.trim() && form.meaning.trim();

  return (
    <div className="vl-card" style={{ padding: 16, marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{ fontFamily: DISPLAY_FONT, fontSize: 22, fontWeight: 700, color: '#2A2A22' }}>
          {initial.id ? 'Sửa từ' : 'Thêm từ mới'}
        </span>
        <button className="vl-btn" onClick={onCancel} style={{ background: 'none', color: '#6b6550' }}>
          <X size={18} />
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: 10, marginBottom: 10 }}>
        <div>
          <label className="vl-label" style={{ color: '#6b6550' }}>Từ / cụm từ *</label>
          <input ref={wordRef} className="vl-input" value={form.word} onChange={set('word')} placeholder="e.g. beat" />
        </div>
        <div>
          <label className="vl-label" style={{ color: '#6b6550' }}>Từ loại</label>
          <select className="vl-input" value={form.pos} onChange={set('pos')}>
            {POS_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <label className="vl-label" style={{ color: '#6b6550' }}>Nghĩa *</label>
        <input className="vl-input" value={form.meaning} onChange={set('meaning')} placeholder="e.g. đánh bại" />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label className="vl-label" style={{ color: '#6b6550' }}>Ví dụ</label>
        <input className="vl-input" value={form.example} onChange={set('example')} placeholder="e.g. No one beats him at chess." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <div>
          <label className="vl-label" style={{ color: '#6b6550' }}>Pattern</label>
          <input className="vl-input" value={form.pattern} onChange={set('pattern')} placeholder="beat sb at sth" />
        </div>
        <div>
          <label className="vl-label" style={{ color: '#6b6550' }}>Collocation</label>
          <input className="vl-input" value={form.collocation} onChange={set('collocation')} placeholder="team captain" />
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <label className="vl-label" style={{ color: '#6b6550' }}>Chủ đề</label>
        <input className="vl-input" list="topic-list" value={form.topic} onChange={set('topic')} placeholder="Fun and games" />
        <datalist id="topic-list">
          {topics.map((t) => (
            <option key={t} value={t} />
          ))}
        </datalist>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          className="vl-btn"
          disabled={!canSubmit}
          onClick={() => canSubmit && onSubmit(form)}
          style={{
            flex: 1, padding: '11px', borderRadius: 7, background: canSubmit ? MINT : '#c9c2ae',
            color: '#16302B', fontWeight: 700, fontSize: 14,
          }}
        >
          {initial.id ? 'Lưu thay đổi' : 'Thêm vào sổ'}
        </button>
        <button className="vl-btn" onClick={onCancel} style={{ padding: '11px 16px', borderRadius: 7, background: '#e4ddc7', color: '#2A2A22', fontSize: 14 }}>
          Hủy
        </button>
      </div>
    </div>
  );
}
