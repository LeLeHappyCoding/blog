/*
 * @Description: 布局组件
 * @Author: lele
 * @Date: 2025-08-30 15:02:17
 */
import React from 'react';
import {BrowserRouter} from 'react-router';
import {Provider} from 'jotai';
import {QueryClientProvider} from '@tanstack/react-query';
import store from './store';
import queryClient from '@store/queryClient';

const basename = process.env.NODE_ENV === 'production' ? '/builder/blog' : '';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter basename={basename}>
                    <div>{props.children}</div>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    );
};

export default Layout;
