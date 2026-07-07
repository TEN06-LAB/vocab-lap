import { useState } from 'react';
import { Brain, Check, ChevronRight } from 'lucide-react';
import { shuffle } from '../utils/helpers.js';
import { DISPLAY_FONT, MONO_FONT, PAPER, MINT, CORAL, YELLOW } from '../styles/tokens.js';
import FilterRow from './FilterRow.jsx';

function buildQuestions(pool, count) {
  const chosen = shuffle(pool).slice(0, count);
  return chosen.map((item) => {
    const distractorPool = pool.filter((e) => e.id !== item.id);
    const distractors = shuffle(distractorPool).slice(0, 3).map((e) => e.meaning);
    const options = shuffle([item.meaning, ...distractors]);
    return { item, options, correct: item.meaning };
  });
}

export default function QuizView({ entries, topics }) {
  const [topicFilter, setTopicFilter] = useState('all');
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);

  const pool = topicFilter === 'all' ? entries : entries.filter((e) => e.topic === topicFilter);
  const enough = pool.length >= 4;

  const start = () => {
    setQuestions(buildQuestions(pool, Math.min(10, pool.length)));
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setStarted(true);
  };

  const choose = (opt) => {
    if (selected) return;
    setSelected(opt);
    if (opt === questions[qIndex].correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    setSelected(null);
    setQIndex((i) => i + 1);
  };

  if (!enough) {
    return (
      <div style={{ color: 'rgba(241,237,227,0.7)', textAlign: 'center', padding: 30 }}>
        Cần ít nhất 4 từ (cùng chủ đề đã chọn) để tạo quiz — thêm từ ở tab "Từ vựng" nhé.
      </div>
    );
  }

  if (!started) {
    return (
      <div>
        <FilterRow topicFilter={topicFilter} setTopicFilter={setTopicFilter} topics={topics} />
        <div className="vl-card" style={{ padding: 24, textAlign: 'center', marginTop: 8 }}>
          <Brain size={26} color="#6b6550" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 15, color: '#3a3728', marginBottom: 14 }}>
            Quiz trắc nghiệm gồm <strong>{Math.min(10, pool.length)}</strong> câu, chọn đúng nghĩa của từ.
          </div>
          <button className="vl-btn" onClick={start} style={{ padding: '11px 22px', borderRadius: 7, background: MINT, color: '#16302B', fontWeight: 700 }}>
            Bắt đầu kiểm tra
          </button>
        </div>
      </div>
    );
  }

  if (qIndex >= questions.length) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="vl-card" style={{ padding: 24, textAlign: 'center' }}>
        <div style={{ fontFamily: DISPLAY_FONT, fontSize: 30, color: '#2A2A22', marginBottom: 6 }}>Kết quả</div>
        <div style={{ fontSize: 32, fontWeight: 700, color: pct >= 70 ? '#3f7a5c' : '#b0563f', marginBottom: 4 }}>
          {score}/{questions.length}
        </div>
        <div style={{ fontSize: 13, color: '#6b6550', marginBottom: 16 }}>{pct}% chính xác</div>
        <button className="vl-btn" onClick={start} style={{ padding: '10px 20px', borderRadius: 7, background: MINT, color: '#16302B', fontWeight: 700, marginRight: 8 }}>
          Làm lại
        </button>
        <button className="vl-btn" onClick={() => setStarted(false)} style={{ padding: '10px 20px', borderRadius: 7, background: '#e4ddc7', color: '#2A2A22' }}>
          Đổi chủ đề
        </button>
      </div>
    );
  }

  const q = questions[qIndex];

  return (
    <div>
      <div style={{ color: 'rgba(241,237,227,0.7)', fontSize: 12, marginBottom: 10 }}>
        Câu {qIndex + 1} / {questions.length} · Điểm: {score}
      </div>
      <div className="vl-card" style={{ padding: 20, marginBottom: 12 }}>
        <div className="vl-tape" />
        <div style={{ fontSize: 12, color: '#8a8368', marginBottom: 4 }}>Nghĩa của từ này là gì?</div>
        <div style={{ fontFamily: DISPLAY_FONT, fontWeight: 700, fontSize: 32, color: '#2A2A22', marginBottom: 6 }}>
          {q.item.word}
        </div>
        {q.item.example && (
          <div style={{ fontFamily: MONO_FONT, fontSize: 12, color: '#5a5642' }}>{q.item.example}</div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {q.options.map((opt) => {
          const isCorrect = opt === q.correct;
          const isSelected = opt === selected;
          let bg = PAPER;
          let txt = '#2A2A22';
          if (selected) {
            if (isCorrect) { bg = MINT; txt = '#16302B'; }
            else if (isSelected) { bg = CORAL; txt = '#2A2A22'; }
          }
          return (
            <button
              key={opt}
              className="vl-btn"
              onClick={() => choose(opt)}
              style={{ textAlign: 'left', padding: '12px 14px', borderRadius: 7, background: bg, color: txt, fontSize: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              {opt}
              {selected && isCorrect && <Check size={16} />}
            </button>
          );
        })}
      </div>

      {selected && (
        <button className="vl-btn" onClick={nextQuestion} style={{ width: '100%', marginTop: 14, padding: '12px', borderRadius: 7, background: YELLOW, color: '#2A2A22', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          Câu tiếp theo <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
}
