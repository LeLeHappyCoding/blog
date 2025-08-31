/**
 * @Description:  
 * @Author: lele
 * @Date: 2025-08-30 20:35:58
 */
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    plugins: [
        require('@tailwindcss/postcss'),
        require('autoprefixer'),
        isProd && require('cssnano')({
            preset: 'default'
        }),
    ].filter(Boolean)
};
