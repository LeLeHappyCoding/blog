/*
 * @Description: 首页
 * @Author: lele
 * @Date: 2025-08-30 18:18:02
 */
import React from 'react';
import BaseInfo from './modules/BaseInfo';

interface HomeProps {}

const Home = (props: HomeProps) => {
    return (
        <div>
            <h1 className="text-content">Home</h1>
            <BaseInfo />
        </div>
    );
};

export default Home;
