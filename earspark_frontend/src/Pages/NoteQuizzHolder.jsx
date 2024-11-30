import React from 'react';
import './NoteQuizHolder.css'; // Create a CSS file for styling
import NoteQuiz from './NoteQuiz'; // Import the NoteQuiz component

const NoteQuizHolder = () => {
    return (
        <div className="note-quiz-holder">
            {/* <h2>Note Quiz</h2> */}
            <NoteQuiz />
        </div>
    );
};

export default NoteQuizHolder;
