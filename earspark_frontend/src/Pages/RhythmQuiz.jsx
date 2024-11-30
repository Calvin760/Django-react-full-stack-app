import React, { useState, useEffect, useRef } from 'react';
import './RhythmQuiz.css'; // Import CSS for styling

const RHYTHMS = [
    { type: 'Quarter Notes', audio: 'Rythm/Quarter_rest1.mp3' },
    { type: 'Quarter Notes', audio: 'Rythm/Quarter_rest2.mp3' },
    { type: 'Quarter Notes', audio: 'Rythm/Quarter_rest3.mp3' },
    { type: 'Eighth Notes', audio: 'Rythm/8thNote2.mp3' },
    { type: 'Eighth Notes', audio: 'Rythm/8thNote1.mp3' },
    { type: 'Eighth Notes', audio: 'Rythm/8thNote3.mp3' },
    { type: 'Triplets', audio: 'Rythm/Triplet.mp3' },
    { type: 'Whole Note', audio: 'Rythm/whole_note.mp3' },
    { type: 'Sixteenth Notes', audio: 'Rythm/16thNote2.mp3' },
    { type: 'Sixteenth Notes', audio: 'Rythm/16thNote.mp3' },
];

const RhythmQuiz = () => {
    const [currentRhythm, setCurrentRhythm] = useState(null);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState('');
    const [correct, setCorrect] = useState(null);
    const audioRef = useRef(null); // Reference for the audio element

    useEffect(() => {
        loadNewRhythm();
    }, []);

    const loadNewRhythm = () => {
        const randomRhythm = RHYTHMS[Math.floor(Math.random() * RHYTHMS.length)];
        setCurrentRhythm(randomRhythm);
        playAudio(randomRhythm.audio);
        setSelected('');
        setCorrect(null);
        setOptions(shuffleArray(generateOptions(randomRhythm.type)));
    };

    const playAudio = (audio) => {
        // Stop the currently playing audio if it exists
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0; // Reset to start
        }

        audioRef.current = new Audio(audio);
        audioRef.current.play().catch((error) => {
            console.error('Error playing audio:', error);
        });
    };

    const handleAnswer = (answer) => {
        setSelected(answer);
        setCorrect(answer === currentRhythm.type);
    };

    const generateOptions = (correctAnswer) => {
        const uniqueOptions = new Set([correctAnswer]);

        while (uniqueOptions.size < 4) {
            const randomRhythm = RHYTHMS[Math.floor(Math.random() * RHYTHMS.length)];
            uniqueOptions.add(randomRhythm.type);
        }

        return Array.from(uniqueOptions);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const renderOptions = () => {
        return options.map((rhythmType, index) => (
            <button
                key={index}
                onClick={() => handleAnswer(rhythmType)}
                disabled={selected !== ''}
                className={`option-button ${selected === rhythmType ? (correct ? 'correct' : 'incorrect') : ''}`}
            >
                {rhythmType}
            </button>
        ));
    };

    const renderResult = () => {
        if (correct === null) return null;
        return (
            <div className="result">
                {correct ? 'Correct!' : `Wrong! The correct answer was ${currentRhythm.type}.`}
                <button onClick={loadNewRhythm} className="next-button">Next Rhythm</button>
            </div>
        );
    };

    return (
        <div className="quiz-container">
            <h1>Rhythm Quiz</h1>
            <p>Listen to the rhythm and select the correct type:</p>
            <button onClick={() => playAudio(currentRhythm.audio)} className="play-button">Play Rhythm</button>
            <div className="options-container">{renderOptions()}</div>
            {renderResult()}
        </div>
    );
};

export default RhythmQuiz;
