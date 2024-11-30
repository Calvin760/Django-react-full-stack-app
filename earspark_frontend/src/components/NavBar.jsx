import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import logo from '../assets/logo.png'; // Adjust the path based on where your logo is located

const NavBar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false); // State for toggling mobile navbar visibility

    // Check if the user is logged in (by verifying the presence of the access token)
    useEffect(() => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        setIsLoggedIn(!!token); // Set the logged-in status based on the token presence
    }, []);

    // Handle Logout functionality
    const handleLogout = () => {
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('REFRESH_TOKEN');
        setIsLoggedIn(false); // Update the state to reflect that the user has logged out
        navigate('/login'); // Redirect the user to the login page
    };

    // Handle mobile nav toggle
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <img src={logo} alt="Logo" className="logo" />
                {/* Hamburger Icon for Mobile */}
                <div className="hamburger" onClick={toggleNav}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
                <ul className={`nav-links ${isNavOpen ? 'active' : ''}`}>
                    <li><a href="/">Home</a></li>
                    <li><a href="/theory">Lessons</a></li>
                    <li className="dropdown">
                        <a href="/rhythm-practice">Practice</a>
                        <div className="dropdown-content">
                            <a href="/scale-exercises">Exercises</a>
                            <a href="/absolute-pitch">Quizzes</a>
                        </div>
                    </li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/logout">Sign out</a></li>
                    {/* Conditionally render the logout option */}
                    {isLoggedIn && (
                        <li>
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
