export default function FilterRow({ topicFilter, setTopicFilter, topics }) {
  return (
    <select className="vl-input" value={topicFilter} onChange={(e) => setTopicFilter(e.target.value)}>
      <option value="all">Tất cả chủ đề</option>
      {topics.map((t) => (
        <option key={t} value={t}>{t}</option>
      ))}
    </select>
  );
}
