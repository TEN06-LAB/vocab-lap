export default function Chip({ label, bg }) {
  return (
    <span style={{ fontSize: 11, background: bg, color: '#3a3728', padding: '3px 8px', borderRadius: 999 }}>
      {label}
    </span>
  );
}
