import React from 'react';
import './PianoCardHolder.css'; // Import CSS for styling
import AbsolutePitchTraining from './AbsolutePitchTraining'; // Import the piano component
import NoteQuizz from './NoteQuizz'; // Import the NoteQuiz component

const PianoCardHolder = () => {
    return (
        <div className="piano-card-holder">
            <h2>Absolute Pitch Training</h2>
            <div className="piano-container">
                <AbsolutePitchTraining />
            </div>
            <h2>Note Quizz</h2>
            <NoteQuizz />
        </div>
    );
};

export default PianoCardHolder;
