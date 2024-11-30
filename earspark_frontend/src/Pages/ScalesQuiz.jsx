import React, { useState, useEffect, useRef } from 'react';
import './ScalesQuiz.css'; // Import CSS for styling

const SCALES = [
    { type: 'Major', audio: 'scales/Major1.mp3' },
    { type: 'Major', audio: 'scales/Major2.mp3' },
    { type: 'Major', audio: 'scales/Major3.mp3' },
    { type: 'Major', audio: 'scales/Major4.mp3' },
    { type: 'Minor', audio: 'scales/Minor1.mp3' },
    { type: 'Minor', audio: 'scales/Minor2.mp3' },
    { type: 'Minor', audio: 'scales/Minor3.mp3' },
    { type: 'Minor', audio: 'scales/Minor4.mp3' },
    { type: 'Harmonic Minor', audio: 'scales/Minorhamonic1.mp3' },
    { type: 'Harmonic Minor', audio: 'scales/Minorhamonic2.mp3' },
    { type: 'Harmonic Minor', audio: 'scales/Minorhamonic3.mp3' },
];

const ScalesQuiz = () => {
    const [currentScale, setCurrentScale] = useState(null);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState('');
    const [correct, setCorrect] = useState(null);
    const audioRef = useRef(null); // Reference for the audio element

    useEffect(() => {
        loadNewScale();
    }, []);

    const loadNewScale = () => {
        const randomScale = SCALES[Math.floor(Math.random() * SCALES.length)];
        setCurrentScale(randomScale);
        playAudio(randomScale.audio);
        setSelected('');
        setCorrect(null);
        setOptions(shuffleArray(generateOptions(randomScale.type)));
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
        setCorrect(answer === currentScale.type);
    };

    const generateOptions = (correctAnswer) => {
        const uniqueOptions = new Set([correctAnswer]);

        while (uniqueOptions.size < 3) {
            const randomScale = SCALES[Math.floor(Math.random() * SCALES.length)];
            uniqueOptions.add(randomScale.type);
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
        return options.map((scaleType, index) => (
            <button
                key={index}
                onClick={() => handleAnswer(scaleType)}
                disabled={selected !== ''}
                className={`option-button ${selected === scaleType ? (correct ? 'correct' : 'incorrect') : ''}`}
            >
                {scaleType}
            </button>
        ));
    };

    const renderResult = () => {
        if (correct === null) return null;
        return (
            <div className="result">
                {correct ? 'Correct!' : `Wrong! The correct answer was ${currentScale.type}.`}
                <button onClick={loadNewScale} className="next-button">Next Scale</button>
            </div>
        );
    };

    return (
        <div className="quiz-container">
            <h1>Scale Quiz</h1>
            <p>Listen to the scale and select whether it is Major, Minor, or Harmonic Minor:</p>
            <button onClick={() => playAudio(currentScale.audio)} className="play-button">Play Scale</button>
            <div className="options-container">{renderOptions()}</div>
            {renderResult()}
        </div>
    );
};

export default ScalesQuiz;
