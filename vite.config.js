import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base path phải khớp với tên repo GitHub (username.github.io/vocab-lap/)
// Nếu bạn đổi tên repo, nhớ sửa lại giá trị base bên dưới.
export default defineConfig({
  plugins: [react()],
  base: '/vocab-lap/',
});
