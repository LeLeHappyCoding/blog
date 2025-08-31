module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                useBuiltIns: 'usage', // ✅ 按需引入 polyfill
                corejs: 3, // ✅ 使用 core-js 3
            },
        ],
        '@babel/preset-typescript',
        [
            '@babel/preset-react',
            {
                runtime: 'automatic'
            }
        ],
    ],
    plugins: [
        [
            '@babel/plugin-transform-runtime',
            {
                corejs: false, // ✅ 避免与 preset-env 冲突
                helpers: true,
                regenerator: true,
            },
        ],
    ],
};