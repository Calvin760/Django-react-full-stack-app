import React, { useState, useEffect, useRef } from 'react';
import './IntervalsQuiz.css'; // Import CSS for styling

const INTERVALS = [
    { type: 'Minor Second', audio: 'intervals/minorsec1.mp3' },
    { type: 'Minor Second', audio: 'intervals/minorsec2.mp3' },
    { type: 'Minor Second', audio: 'intervals/minorsec3.mp3' },
    { type: 'Minor Second', audio: 'intervals/minorsec4.mp3' },
    { type: 'Minor Second', audio: 'intervals/minorsec5.mp3' },
    { type: 'Minor Second', audio: 'intervals/minorsec6.mp3' },
    { type: 'Major Second', audio: 'intervals/Msec1.mp3' },
    { type: 'Major Second', audio: 'intervals/Msec2.mp3' },
    { type: 'Major Second', audio: 'intervals/Msec3.mp3' },
    { type: 'Major Second', audio: 'intervals/Msec4.mp3' },
    { type: 'Major Second', audio: 'intervals/Msec5.mp3' },
    { type: 'Major Second', audio: 'intervals/Msec6.mp3' },
    { type: 'Minor Third', audio: 'intervals/minorthird1.mp3' },
    { type: 'Minor Third', audio: 'intervals/minorthird2.mp3' },
    { type: 'Minor Third', audio: 'intervals/minorthird3.mp3' },
    { type: 'Minor Third', audio: 'intervals/minorthird4.mp3' },
    { type: 'Minor Third', audio: 'intervals/minorthird5.mp3' },
    { type: 'Minor Third', audio: 'intervals/minorthird6.mp3' },
    { type: 'Major Third', audio: 'intervals/Mthird1.mp3' },
    { type: 'Major Third', audio: 'intervals/Mthird2.mp3' },
    { type: 'Major Third', audio: 'intervals/Mthird3.mp3' },
    { type: 'Major Third', audio: 'intervals/Mthird4.mp3' },
    { type: 'Perfect Fourth', audio: 'intervals/p41.mp3' },
    { type: 'Perfect Fourth', audio: 'intervals/p42.mp3' },
    { type: 'Perfect Fourth', audio: 'intervals/p43.mp3' },
    { type: 'Perfect Fourth', audio: 'intervals/p44.mp3' },
    { type: 'Perfect Fourth', audio: 'intervals/p45.mp3' },
    { type: 'Perfect Fourth', audio: 'intervals/p46.mp3' },
    { type: 'Perfect Fifth', audio: 'intervals/p51.mp3' },
    { type: 'Perfect Fifth', audio: 'intervals/p52.mp3' },
    { type: 'Perfect Fifth', audio: 'intervals/p53.mp3' },
    { type: 'Perfect Fifth', audio: 'intervals/p54.mp3' },
    { type: 'Perfect Fifth', audio: 'intervals/p55.mp3' },
    { type: 'Perfect Fifth', audio: 'intervals/p56.mp3' },
    { type: 'Octave', audio: 'intervals/oct1.mp3' },
    { type: 'Octave', audio: 'intervals/oct2.mp3' },
    { type: 'Octave', audio: 'intervals/oct3.mp3' },
    { type: 'Octave', audio: 'intervals/oct4.mp3' },
    { type: 'Octave', audio: 'intervals/oct5.mp3' },
    { type: 'Octave', audio: 'intervals/oct6.mp3' },
];

const IntervalsQuiz = () => {
    const [currentInterval, setCurrentInterval] = useState(null);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState('');
    const [correct, setCorrect] = useState(null);
    const audioRef = useRef(null); // Reference for the audio element

    useEffect(() => {
        loadNewInterval();
    }, []);

    const loadNewInterval = () => {
        const randomInterval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
        setCurrentInterval(randomInterval);
        playAudio(randomInterval.audio);
        setSelected('');
        setCorrect(null);
        setOptions(shuffleArray(generateOptions(randomInterval.type)));
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
        setCorrect(answer === currentInterval.type);
    };

    const generateOptions = (correctAnswer) => {
        const uniqueOptions = new Set([correctAnswer]);

        while (uniqueOptions.size < 4) {
            const randomInterval = INTERVALS[Math.floor(Math.random() * INTERVALS.length)];
            uniqueOptions.add(randomInterval.type);
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
        return options.map((intervalType, index) => (
            <button
                key={index}
                onClick={() => handleAnswer(intervalType)}
                disabled={selected !== ''}
                className={`option-button ${selected === intervalType ? (correct ? 'correct' : 'incorrect') : ''}`}
            >
                {intervalType}
            </button>
        ));
    };

    const renderResult = () => {
        if (correct === null) return null;
        return (
            <div className="result">
                {correct ? 'Correct!' : `Wrong! The correct answer was ${currentInterval.type}.`}
                <button onClick={loadNewInterval} className="next-button">Next Interval</button>
            </div>
        );
    };

    return (
        <div className="quiz-container">
            <h1>Interval Quiz</h1>
            <p>Listen to the interval and select the correct type:</p>
            <button onClick={() => playAudio(currentInterval.audio)} className="play-button">Play Interval</button>
            <div className="options-container">{renderOptions()}</div>
            {renderResult()}
        </div>
    );
};

export default IntervalsQuiz;
