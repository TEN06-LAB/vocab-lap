import { BookOpen, Layers, Brain } from 'lucide-react';
import { PAPER } from '../styles/tokens.js';

export default function TabBar({ tab, setTab }) {
  const items = [
    { id: 'list', label: 'Từ vựng', icon: BookOpen },
    { id: 'flashcards', label: 'Flashcard', icon: Layers },
    { id: 'quiz', label: 'Quiz', icon: Brain },
  ];
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, padding: '0 14px' }}>
      {items.map(({ id, label, icon: Icon }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            className="vl-btn"
            onClick={() => setTab(id)}
            style={{
              flex: 1,
              maxWidth: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              padding: '10px 8px',
              borderRadius: '8px 8px 0 0',
              background: active ? PAPER : 'rgba(241,237,227,0.08)',
              color: active ? '#2A2A22' : 'rgba(241,237,227,0.75)',
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            <Icon size={15} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
