/*
 * @Description: App
 * @Author: lele
 * @Date: 2025-08-30 15:04:29
 */
import {Suspense, useState} from 'react';
import useEvent from '@hooks/useEvent';
import {getAllQueryParams} from '@utils/query';
import {Link, useRoutes} from 'react-router';
import routeList from './routeList';
import './global.css';

const Ele = () => {
    const ele = useRoutes(routeList);
    return ele;
};

function App() {
    const [count, setCount] = useState(0);

    const obj = {} as any;

    const setC = useEvent((val) => {
        setCount(++val);
    });

    console.log(obj?.a?.b?.c);

    console.log(getAllQueryParams('https://www.baidu.com?key=123&b=2'));

    return (
        <div className="bg-[red]">
            <h1>Home</h1>
            <div>{count}</div>
            <img src="/duola.jpeg" alt="" />
            <Link to="/works" onClick={() => setC(count)}>
                按钮
            </Link>
            <Suspense fallback={<div>loading</div>}>
                <Ele />
            </Suspense>
        </div>
    );
}

export default App;
