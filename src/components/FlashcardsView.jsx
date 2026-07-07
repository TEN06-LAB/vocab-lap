import { useState } from 'react';
import { Layers } from 'lucide-react';
import { shuffle, getPosColor } from '../utils/helpers.js';
import { DISPLAY_FONT, MONO_FONT, MINT, CORAL } from '../styles/tokens.js';
import FilterRow from './FilterRow.jsx';
import Chip from './Chip.jsx';

export default function FlashcardsView({ entries, topics }) {
  const [topicFilter, setTopicFilter] = useState('all');
  const [deck, setDeck] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);
  const [started, setStarted] = useState(false);

  const pool = topicFilter === 'all' ? entries : entries.filter((e) => e.topic === topicFilter);

  const startDeck = () => {
    setDeck(shuffle(pool));
    setIndex(0);
    setFlipped(false);
    setKnown(0);
    setLearning(0);
    setStarted(true);
  };

  const next = (result) => {
    if (result === 'known') setKnown((k) => k + 1);
    if (result === 'learning') setLearning((l) => l + 1);
    setFlipped(false);
    setIndex((i) => i + 1);
  };

  if (pool.length < 1) {
    return (
      <div style={{ color: 'rgba(241,237,227,0.7)', textAlign: 'center', padding: 30 }}>
        Chưa có từ nào để ôn tập — sang tab "Từ vựng" để thêm từ trước nhé.
      </div>
    );
  }

  if (!started) {
    return (
      <div>
        <FilterRow topicFilter={topicFilter} setTopicFilter={setTopicFilter} topics={topics} />
        <div className="vl-card" style={{ padding: 24, textAlign: 'center', marginTop: 8 }}>
          <Layers size={26} color="#6b6550" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 15, color: '#3a3728', marginBottom: 14 }}>
            Bộ thẻ gồm <strong>{pool.length}</strong> từ. Lật thẻ để xem nghĩa, tự đánh giá bạn đã nhớ chưa.
          </div>
          <button className="vl-btn" onClick={startDeck} style={{ padding: '11px 22px', borderRadius: 7, background: MINT, color: '#16302B', fontWeight: 700 }}>
            Bắt đầu ôn tập
          </button>
        </div>
      </div>
    );
  }

  if (index >= deck.length) {
    return (
      <div className="vl-card" style={{ padding: 24, textAlign: 'center' }}>
        <div style={{ fontFamily: DISPLAY_FONT, fontSize: 30, color: '#2A2A22', marginBottom: 6 }}>Xong rồi!</div>
        <div style={{ fontSize: 14, color: '#3a3728', marginBottom: 4 }}>Đã nhớ: <strong style={{ color: '#3f7a5c' }}>{known}</strong></div>
        <div style={{ fontSize: 14, color: '#3a3728', marginBottom: 16 }}>Cần ôn thêm: <strong style={{ color: '#b0563f' }}>{learning}</strong></div>
        <button className="vl-btn" onClick={startDeck} style={{ padding: '10px 20px', borderRadius: 7, background: MINT, color: '#16302B', fontWeight: 700, marginRight: 8 }}>
          Ôn lại
        </button>
        <button className="vl-btn" onClick={() => setStarted(false)} style={{ padding: '10px 20px', borderRadius: 7, background: '#e4ddc7', color: '#2A2A22' }}>
          Đổi chủ đề
        </button>
      </div>
    );
  }

  const card = deck[index];
  const color = getPosColor(card.pos);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, color: 'rgba(241,237,227,0.7)', fontSize: 12 }}>
        <span>{index + 1} / {deck.length}</span>
        <span>Đã nhớ {known} · Cần ôn {learning}</span>
      </div>

      <div
        className="vl-card vl-flip"
        onClick={() => setFlipped((f) => !f)}
        style={{ padding: '30px 20px', minHeight: 220, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.15s ease' }}
      >
        <div className="vl-tape" />
        {!flipped ? (
          <>
            <span style={{ fontSize: 11, fontWeight: 700, background: color, color: '#2A2A22', padding: '2px 8px', borderRadius: 4, marginBottom: 12 }}>
              {card.pos}
            </span>
            <div style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 40, color: '#2A2A22' }}>
              {card.word}
            </div>
            <div style={{ fontSize: 12, color: '#8a8368', marginTop: 14 }}>chạm để xem nghĩa</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#2A2A22', marginBottom: 10 }}>{card.meaning}</div>
            {card.example && (
              <div style={{ fontFamily: MONO_FONT, fontSize: 12.5, color: '#5a5642', background: '#EAE3CB', padding: '7px 9px', borderRadius: 5, marginBottom: 8 }}>
                {card.example}
              </div>
            )}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
              {card.pattern && <Chip label={`pattern: ${card.pattern}`} bg="#DDE6DA" />}
              {card.collocation && <Chip label={`colloc: ${card.collocation}`} bg="#E4DCEE" />}
            </div>
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <button className="vl-btn" onClick={() => next('learning')} style={{ flex: 1, padding: '12px', borderRadius: 7, background: CORAL, color: '#2A2A22', fontWeight: 700 }}>
          Chưa nhớ
        </button>
        <button className="vl-btn" onClick={() => next('known')} style={{ flex: 1, padding: '12px', borderRadius: 7, background: MINT, color: '#16302B', fontWeight: 700 }}>
          Đã nhớ
        </button>
      </div>
    </div>
  );
}
