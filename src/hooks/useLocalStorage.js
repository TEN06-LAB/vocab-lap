import { useState, useCallback } from 'react';

/**
 * Hook lưu trữ state vào localStorage của trình duyệt.
 * Thay thế cho window.storage (chỉ tồn tại trong môi trường artifact cũ).
 *
 * @param {string} key - khóa lưu trong localStorage
 * @param {*} initialValue - giá trị mặc định nếu chưa có gì trong storage
 * @returns {[value, setValue, { error }]}
 *   - value: giá trị hiện tại
 *   - setValue(next | updaterFn): cập nhật + tự động ghi xuống localStorage
 *   - error: true nếu lần ghi gần nhất thất bại (ví dụ localStorage đầy hoặc bị chặn)
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });
  const [error, setError] = useState(false);

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
          setError(false);
        } catch (e) {
          setError(true);
        }
        return next;
      });
    },
    [key]
  );

  return [storedValue, setValue, { error }];
}
