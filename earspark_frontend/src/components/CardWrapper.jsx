import React from 'react';
import './CardWrapper.css'; // We'll define the styles in this CSS file.

const CardWrapper = ({ children }) => {
    return (
        <div className="card-wrapper">
            <div className="card">
                {children}
            </div>
        </div>
    );
};

export default CardWrapper;
