import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
// import {viteExternalsPlugin} from 'vite-plugin-externals';
import svgr from 'vite-plugin-svgr';
import {createHtmlPlugin} from 'vite-plugin-html';
import alias from './scripts/alias';

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        babel({
            filter: /src\/.*\.[jt]sx?$/, // 强制 js/ts/jsx/tsx 文件都走 Babel
        }),
        // viteExternalsPlugin({}),
        svgr(),
        createHtmlPlugin({
            template: '/template/index.html',
            entry: '/src/main.tsx',
            inject: {
                data: {},
            },
        }),
    ],
    resolve: {
        alias,
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || ''),
    },
    server: {
        port: 8000,
        open: true,
        cors: true,
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
        modules: {
            hashPrefix: 'prefix',
            localsConvention: 'dashes',
            generateScopedName: isDev
                ? '[name]_[local]'
                : '[name]_[local]_[hash:base64:5]',
        },
    },
    build: {
        sourcemap: isProd ? 'hidden' : false,
        minify: isProd ? 'terser' : false,
        outDir: 'dist',
        assetsDir: 'assets',
        terserOptions: isProd
            ? {
                  compress: {
                      drop_console: true, // 移除所有 console
                      drop_debugger: true,
                  },
              }
            : undefined,
        // 打包大小警告阈值
        chunkSizeWarningLimit: 1000,
        // 资源压缩
        assetsInlineLimit: 4096,
        rollupOptions: {
            output: {
                // 控制静态资源输出路径和文件名
                chunkFileNames: 'assets/js/[name]-chunk-[hash].js',
                entryFileNames: 'assets/js/[name]-bundle-[hash].js',
                assetFileNames: (assetInfo) => {
                    if (/\.(css)$/.test(assetInfo.name ?? '')) {
                        return 'assets/css/[name]-[hash][extname]';
                    }
                    if (
                        /\.(png|jpg|jpeg|gif|svg)$/.test(assetInfo.name ?? '')
                    ) {
                        return 'assets/img/[name]-[hash][extname]';
                    }
                    if (/\.(woff2?|ttf|eot)$/.test(assetInfo.name ?? '')) {
                        return 'assets/fonts/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },

                // 分包策略
                manualChunks: {
                    react: ['react', 'react-dom'],
                    router: ['react-router'],
                },
            },
        },
    },
    optimizeDeps: {
        include: ['react', 'react-dom'],
    },
});
