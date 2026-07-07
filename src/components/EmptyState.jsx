import { Sparkles } from 'lucide-react';

export default function EmptyState({ hasEntries }) {
  return (
    <div style={{ textAlign: 'center', padding: '36px 16px', color: 'rgba(241,237,227,0.6)' }}>
      <Sparkles size={22} style={{ marginBottom: 8 }} />
      <div style={{ fontSize: 14 }}>
        {hasEntries ? 'Không tìm thấy từ nào khớp.' : 'Sổ tay đang trống — thêm từ đầu tiên của bạn!'}
      </div>
    </div>
  );
}
