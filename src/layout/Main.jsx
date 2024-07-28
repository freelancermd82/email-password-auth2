import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';


const Main = () => {
    return (
        <div className='w-50 mx-auto mt-5'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;