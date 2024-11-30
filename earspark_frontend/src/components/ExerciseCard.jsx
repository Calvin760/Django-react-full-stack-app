import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ExerciseCard.css'; // Import CSS for ExerciseCard if you have specific styles

const ExerciseCard = ({ title, description, duration, icon, link }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleClick = () => {
        navigate(link); // Navigate to the provided link
    };

    return (
        <div className="exercise-card" onClick={handleClick} role="button" tabIndex="0" onKeyPress={(e) => e.key === 'Enter' && handleClick()}>
            <div className="icon">{icon}</div>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{duration}</p>
        </div>
    );
};

export default ExerciseCard;
