import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
            dts: fileURLToPath(new URL('./auto-imports.d.ts', import.meta.url))
        }),
        Components({
            resolvers: [ElementPlusResolver()],
            dts: fileURLToPath(new URL('./components.d.ts', import.meta.url)),
            dirs: [fileURLToPath(new URL('./src/components', import.meta.url))]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            replacement: fileURLToPath(new URL('./src/components', import.meta.url))
        }
    },
    server: {
        port: 8081
    },
    build: {
        // outDir: 'dist',
        // emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vue: ['vue'],
                    'vue-router': ['vue-router'],
                    about: ['./src/views/AboutView.vue'],
                    // 'user-detail': ['./src/views/UserDetails.vue'],
                    // 'user-dashboard': ['./src/views/UserDashboard.vue'],
                    // 'user-edit': ['./src/views/UserProfileEdit.vue']
                    'group-user': [
                        './src/views/UserDetails.vue',
                        './src/views/UserDashboard.vue',
                        './src/views/UserProfileEdit.vue'
                    ]
                }
            }
        }
    }
});
