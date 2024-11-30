import React from 'react';
import AbsolutePitchTraining from './AbsolutePitchTraining'; // Import the piano component
import IntervalsQuizz from './IntervalsQuizz'; // Import the IntervalsQuizz component

const Intervals = () => {
    return (
        <div className="piano-card-holder">
            <h2>Intervals</h2>
            <div className="piano-container">
                <AbsolutePitchTraining />
            </div>
            <hr /> {/* Optional: Adds a horizontal line for separation */}
            {/* <h2>Intervals Quiz</h2> */}
            <IntervalsQuizz />
        </div>
    );
}

export default Intervals;
