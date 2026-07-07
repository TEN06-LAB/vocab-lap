import { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { STORAGE_KEY, SEED } from './data/seed.js';
import { uid } from './utils/helpers.js';
import { BOARD, BODY_FONT } from './styles/tokens.js';
import GlobalStyle from './components/GlobalStyle.jsx';
import Header from './components/Header.jsx';
import TabBar from './components/TabBar.jsx';
import ListView from './components/ListView.jsx';
import FlashcardsView from './components/FlashcardsView.jsx';
import QuizView from './components/QuizView.jsx';

export default function App() {
  const [entries, setEntries, { error: saveError }] = useLocalStorage(STORAGE_KEY, SEED);
  const [tab, setTab] = useState('list');

  const addEntry = (entry) => setEntries((prev) => [{ ...entry, id: uid() }, ...prev]);
  const updateEntry = (entry) => setEntries((prev) => prev.map((e) => (e.id === entry.id ? entry : e)));
  const deleteEntry = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));
  const resetAll = () => setEntries(SEED);
  const clearAll = () => setEntries([]);

  const topics = useMemo(() => {
    const set = new Set(entries.map((e) => e.topic).filter(Boolean));
    return Array.from(set).sort();
  }, [entries]);

  return (
    <div style={{ minHeight: '100vh', background: BOARD, fontFamily: BODY_FONT }}>
      <GlobalStyle />
      <Header />
      <TabBar tab={tab} setTab={setTab} />
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '16px 14px 64px' }}>
        {tab === 'list' ? (
          <ListView
            entries={entries}
            topics={topics}
            onAdd={addEntry}
            onUpdate={updateEntry}
            onDelete={deleteEntry}
            onReset={resetAll}
            onClear={clearAll}
            saveError={saveError}
          />
        ) : tab === 'flashcards' ? (
          <FlashcardsView entries={entries} topics={topics} />
        ) : (
          <QuizView entries={entries} topics={topics} />
        )}
      </main>
    </div>
  );
}
