import React from 'react';
import './ProgressCardContainer.css'; // Import your CSS
import ProgressCard from './ProgressCard';

const ProgressCardContainer = () => {
    const userStats = {
        points: 120,
        exercisesCompleted: 15,
        secondsSpent: 300,
    };

    return (
        <div className="info-card-container">
            <h2></h2> {/* Add a heading for clarity */}
            <ProgressCard
                points={userStats.points}
                exercisesCompleted={userStats.exercisesCompleted}
                secondsSpent={userStats.secondsSpent}
            />
        </div>
    );
}

export default ProgressCardContainer;
