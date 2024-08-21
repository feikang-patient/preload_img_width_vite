import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import * as Babel from '@babel/core';
import traverse from '@babel/traverse';
import generate from '@babel/generator';

const isSuff = (id: string) => {
    if (id.endsWith('.vue')) {
        return true;
    } else {
        return false;
    }
};
const terserPlugin = (text: '') => {
    return {
        name: 'terserPlugin',
        // vite插件里面有很多钩子，transform钩子就是用来做代码转换的
        transform(code, id) {
            // 我们要处理什么文件呢？ vue  ts js 文件
            if (isSuff(id)) {
                // console.log('id', id);
                const { ast } = Babel.transformSync(code, {
                    ast: true
                });
                traverse.default(ast, {
                    StringLiteral(path) {
                        console.log(path.node.value);
                        // path.node.value = path.node.value + '大伟公司';
                    }
                });
            }
        }
    };
};
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        terserPlugin('大伟公司'),
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
                    terser: ['./src/views/terser/index.vue'],
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
