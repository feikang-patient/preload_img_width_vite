import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import type { UserConfig, ConfigEnv } from 'vite';
import { preloadImagePlugin } from './src/plugins/preloadImagePlugin';
// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
    // 获取当前工作目录
    const root = process.cwd();
    // 获取环境变量
    const env = loadEnv(mode, root);
    console.log(env.VITE_BASE_PUGLIC_URL);
    return {
        base: env.VITE_BASE_PUGLIC_URL,
        plugins: [
            preloadImagePlugin({
                dir: '*.{jpg,png,svg}',
                attrs: {
                    rel: 'prefetch'
                }
            }),
            vue(),
            // terserPlugin('大伟公司'),
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
            outDir: 'dist',
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    entryFileNames: 'js/[name].js',
                    chunkFileNames: 'js/[name].js',
                    // 静态资源
                    assetFileNames: (assetInfo) => {
                        if (assetInfo?.name?.endsWith('.css')) {
                            return 'css/[name].[hash].css';
                        } else if (assetInfo?.name?.endsWith('.png')) {
                            return 'img/[name].[hash].[ext]';
                        } else if (assetInfo?.name?.endsWith('.jpg')) {
                            return 'img/[name].[hash].[ext]';
                        }
                    }
                }
            }
        }
    };
});
