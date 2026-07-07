import { DISPLAY_FONT, CHALK } from '../styles/tokens.js';

export default function Header() {
  return (
    <div style={{ padding: '28px 18px 18px', textAlign: 'center' }}>
      <div
        style={{
          fontFamily: DISPLAY_FONT,
          fontWeight: 700,
          fontSize: 44,
          color: CHALK,
          letterSpacing: 1,
          lineHeight: 1,
        }}
      >
        Vocab Lab
      </div>
      <div
        className="vl-dash"
        style={{
          display: 'inline-block',
          marginTop: 8,
          paddingBottom: 8,
          color: 'rgba(241,237,227,0.7)',
          fontSize: 13,
        }}
      >
        Sổ tay từ vựng của bạn — ghi lại, ôn tập, kiểm tra
      </div>
    </div>
  );
}
