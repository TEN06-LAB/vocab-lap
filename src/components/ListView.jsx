import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { EMPTY_FORM } from '../data/seed.js';
import { MINT, CORAL } from '../styles/tokens.js';
import EntryForm from './EntryForm.jsx';
import EntryCard from './EntryCard.jsx';
import EmptyState from './EmptyState.jsx';

export default function ListView({ entries, topics, onAdd, onUpdate, onDelete, onReset, onClear, saveError }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState('');
  const [topicFilter, setTopicFilter] = useState('all');
  const [confirmClear, setConfirmClear] = useState(false);

  const filtered = entries.filter((e) => {
    const matchesTopic = topicFilter === 'all' || e.topic === topicFilter;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || e.word.toLowerCase().includes(q) || e.meaning.toLowerCase().includes(q);
    return matchesTopic && matchesQuery;
  });

  const startEdit = (entry) => {
    setEditing(entry);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div>
      {saveError && (
        <div style={{ background: CORAL, color: '#2A2A22', padding: 10, borderRadius: 8, marginBottom: 12, fontSize: 13 }}>
          Không lưu được thay đổi — kiểm tra kết nối rồi thử lại.
        </div>
      )}

      {!showForm && (
        <button
          className="vl-btn"
          onClick={() => setShowForm(true)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '13px',
            borderRadius: 8,
            background: MINT,
            color: '#16302B',
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 14,
          }}
        >
          <Plus size={17} /> Thêm từ mới
        </button>
      )}

      {showForm && (
        <EntryForm
          initial={editing || EMPTY_FORM}
          topics={topics}
          onCancel={closeForm}
          onSubmit={(data) => {
            if (editing) onUpdate({ ...data, id: editing.id });
            else onAdd(data);
            closeForm();
          }}
        />
      )}

      {!showForm && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={14} style={{ position: 'absolute', left: 10, top: 11, color: '#8a8368' }} />
              <input
                className="vl-input"
                style={{ paddingLeft: 30 }}
                placeholder="Tìm từ hoặc nghĩa..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select
              className="vl-input"
              style={{ flex: '0 0 130px' }}
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
            >
              <option value="all">Tất cả chủ đề</option>
              {topics.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState hasEntries={entries.length > 0} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filtered.map((entry, i) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  rotate={i % 2 === 0 ? -0.6 : 0.6}
                  onEdit={() => startEdit(entry)}
                  onDelete={() => onDelete(entry.id)}
                />
              ))}
            </div>
          )}

          <div style={{ marginTop: 28, textAlign: 'center' }}>
            {!confirmClear ? (
              <button
                className="vl-btn"
                onClick={() => setConfirmClear(true)}
                style={{ background: 'none', color: 'rgba(241,237,227,0.45)', fontSize: 12, padding: 6 }}
              >
                Xóa toàn bộ dữ liệu
              </button>
            ) : (
              <div style={{ fontSize: 12, color: 'rgba(241,237,227,0.75)' }}>
                Xóa hết {entries.length} từ đã lưu?{' '}
                <button className="vl-btn" onClick={() => { onClear(); setConfirmClear(false); }} style={{ background: 'none', color: CORAL, fontWeight: 700, textDecoration: 'underline' }}>Xóa</button>
                {'  '}
                <button className="vl-btn" onClick={() => setConfirmClear(false)} style={{ background: 'none', color: 'rgba(241,237,227,0.6)', textDecoration: 'underline' }}>Hủy</button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
