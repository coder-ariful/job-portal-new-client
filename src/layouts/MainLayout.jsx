import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Common/Navbar';
import Footer from '../Common/Footer';

const MainLayout = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;