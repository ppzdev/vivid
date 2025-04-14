import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
    base: '/vivid/',
    plugins: [
        vue(),
        vueDevTools(),
    ],
    build: {
        manifest: true,
        outDir: 'dist',
        rollupOptions: {
            input: [
                path.resolve(__dirname, 'index.html'),
                path.resolve(__dirname, 'src/main.js'),
            ],
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
    },
})
