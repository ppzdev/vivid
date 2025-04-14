import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  base: '/vivid/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    manifest: true, // ← 必須
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0',  // ← ここがポイント
    port: 5173,       // ← 必要に応じて変更可
  },
})
