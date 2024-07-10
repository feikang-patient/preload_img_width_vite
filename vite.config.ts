import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            replacement: fileURLToPath(new URL('./src/components', import.meta.url))
        }
    },
    build: {
        // outDir: 'dist',
        // emptyOutDir: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    vue: ['vue'],
                    'vue-router': ['vue-router'],
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
