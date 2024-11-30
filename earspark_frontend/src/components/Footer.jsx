import React from 'react';
import './Footer.css'; // Import CSS for styling


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>&copy; 2024 EarSpark. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="/about">Privacy Policy</a></li>
                    <li><a href="/about">Terms of Service</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
