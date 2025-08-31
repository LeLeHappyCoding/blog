/*
 * @Description: 路由
 * @Author: lele
 * @Date: 2025-08-30 18:15:10
 */

import {lazy} from 'react';

const Home = lazy(() => import('./pages/Home'));
const Works = lazy(() => import('./pages/Works'));

const routeList = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/works',
        element: <Works />,
    },
];

export default routeList;
