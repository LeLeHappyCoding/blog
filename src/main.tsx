/*
 * @Description:
 * @Author: lele
 * @Date: 2025-08-30 16:27:44
 */
import {createRoot} from 'react-dom/client';
import Layout from './Layout.tsx';
import App from './App.tsx';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
    <Layout>
        <App />
    </Layout>
);
