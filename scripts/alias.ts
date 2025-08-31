/**
 * @Description: alias
 * @Author: lele
 * @Date: 2025-08-30 15:01:18
 */
import path from 'path';

const srcDir = path.resolve(__dirname, '../src/');

const alias = {
    '@components': path.resolve(srcDir, './components'),
    '@hooks': path.resolve(srcDir, './hooks'),
    '@pages': path.resolve(srcDir, './pages'),
    '@store': path.resolve(srcDir, './store'),
    '@utils': path.resolve(srcDir, './utils'),
};

export default alias;
