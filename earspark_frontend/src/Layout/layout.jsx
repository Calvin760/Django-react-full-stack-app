import React from 'react';
import NavBar from '../components/NavBar'; // Import your NavBar component
import Footer from '../components/Footer'; // Import your Footer component
import { Outlet } from 'react-router-dom'; // Import Outlet for rendering child routes

const Layout = () => {
    return (
        <>
            <NavBar /> {/* Render the NavBar */}
            <main>
                <Outlet /> {/* This will render the matched child route components */}
            </main>
            <Footer /> {/* Render the Footer */}
        </>
    );
};

export default Layout;
