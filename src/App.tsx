/*
 * @Description: App
 * @Author: lele
 * @Date: 2025-08-30 15:04:29
 */
import {Suspense} from 'react';
import {useRoutes} from 'react-router';
import routeList from './routeList';

const Ele = () => {
    const ele = useRoutes(routeList);
    return ele;
};

function App() {
    return (
        <Suspense fallback={<div>loading</div>}>
            <Ele />
        </Suspense>
    );
}

export default App;
