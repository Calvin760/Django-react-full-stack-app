import React, { useState, useEffect, useRef } from 'react';
import './ChordQuiz.css'; // Import CSS for styling
import api from '../api'; // Assuming you have an api.js file for making API requests
import { ACCESS_TOKEN } from '../constants'; // To get the token for authentication

const CHORDS = [
    { type: 'Major', audio: 'chords/M1.mp3' },
    { type: 'Major', audio: 'chords/M2.mp3' },
    { type: 'Major', audio: 'chords/M3.mp3' },
    { type: 'Major', audio: 'chords/M4.mp3' },
    { type: 'Minor', audio: 'chords/minor1.mp3' },
    { type: 'Minor', audio: 'chords/minor2.mp3' },
    { type: 'Minor', audio: 'chords/minor3.mp3' },
    { type: 'Minor', audio: 'chords/minor4.mp3' },
    { type: 'Diminished', audio: 'chords/diminished1.mp3' },
    { type: 'Diminished', audio: 'chords/diminished2.mp3' },
    { type: 'Diminished', audio: 'chords/diminished3.mp3' },
    { type: 'Diminished', audio: 'chords/diminished4.mp3' },
    { type: 'Sus2', audio: 'chords/sus1.mp3' },
    { type: 'Sus4', audio: 'chords/sus2.mp3' },
];

const ChordQuiz = ({ updateProgress }) => {
    const [currentChord, setCurrentChord] = useState(null);
    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState('');
    const [correct, setCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [questionCount, setQuestionCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]); // Added state to store the fetched data
    const audioRef = useRef(null);

    const getData = () => {
        api
            .get("/api/data/")
            .then((res) => res.data)
            .then((data) => {
                setData(data); // Update the data state with the fetched data
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    // Load a new chord when the component mounts
    useEffect(() => {
        loadNewChord();
    }, []);

    useEffect(() => {
        getData();
    }, []);

    const createData = (e) => {
        e.preventDefault();
        api
            .post("/api/data/", { content, title })
            .then((res) => {
                if (res.status === 201) {
                    alert("Data Created!");
                } else {
                    alert("Failed to create data!");
                }
            })
            .catch((err) => alert(err));

        getData();
    };

    // Load a random chord and start the quiz
    const loadNewChord = () => {
        const randomChord = CHORDS[Math.floor(Math.random() * CHORDS.length)];
        setCurrentChord(randomChord);
        playAudio(randomChord.audio);
        setSelected('');
        setCorrect(null);
        setOptions(shuffleArray(generateOptions(randomChord.type)));
        setStartTime(Date.now());
    };

    // Play the audio for the current chord
    const playAudio = (audio) => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        audioRef.current = new Audio(audio);
        audioRef.current.play().catch((error) => console.error('Error playing audio:', error));
    };

    // Handle the answer selection
    const handleAnswer = (answer) => {
        setSelected(answer);
        const timeSpent = (Date.now() - startTime) / 1000;
        setTotalTime((prevTime) => prevTime + timeSpent);
        if (answer === currentChord.type) {
            setCorrect(true);
            setScore((prevScore) => prevScore + 5);
        } else {
            setCorrect(false);
        }
        setQuestionCount(prevCount => prevCount + 1);
    };

    // Generate options for the multiple-choice answers
    const generateOptions = (correctAnswer) => {
        const uniqueOptions = new Set([correctAnswer]);

        while (uniqueOptions.size < 3) {
            const randomChord = CHORDS[Math.floor(Math.random() * CHORDS.length)];
            uniqueOptions.add(randomChord.type);
        }

        return Array.from(uniqueOptions);
    };

    // Shuffle array to randomize the order of the options
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Render the options as buttons
    const renderOptions = () => {
        return options.map((chordType, index) => (
            <button
                key={index}
                onClick={() => handleAnswer(chordType)}
                disabled={selected !== ''}
                className={`option-button ${selected === chordType ? (correct ? 'correct' : 'incorrect') : ''}`}
            >
                {chordType}
            </button>
        ));
    };

    // Render the result of the current question
    const renderResult = () => {
        if (correct === null) return null;
        return (
            <div className="result">
                {correct ? 'Correct!' : `Wrong! The correct answer was ${currentChord.type}.`}
                <button onClick={loadNewChord} className="next-button">Next Chord</button>
            </div>
        );
    };

    // Submit the progress data
    const handleSubmit = async () => {
        setIsLoading(true);
        const data = {
            points: score,
            timeSpent: totalTime,
            averageTime: questionCount > 0 ? totalTime / questionCount : 0,
        };

        try {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                console.error("No token found");
                return;
            }

            await api.post('/api/data/create/', data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Progress data sent successfully");
            updateProgress(data);
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Show loading state if progress data is being sent
    const renderLoading = () => {
        return isLoading && <div className="loading">Sending progress...</div>;
    };

    return (
        <div className="quiz-container">
            <h1>Chord Quiz</h1>
            <p>Listen to the chord and select whether it is Major, Minor, Diminished, or Suspended:</p>
            <button onClick={() => playAudio(currentChord.audio)} className="play-button">Play Chord</button>

            {/* Progress Bar */}
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${(questionCount / 5) * 100}%` }}></div>
            </div>

            <div className="options-container">{renderOptions()}</div>
            {renderResult()}

            {/* Display score and time statistics */}
            <div className="stats">
                <p>Score: {score}</p>
                <p>Total Time: {totalTime.toFixed(2)} seconds</p>
                <p>Question {questionCount} of 5</p>
            </div>

            {/* Show message when all questions are done */}
            {questionCount === 5 && (
                <div className="final-message">
                    <h2>Quiz Completed!</h2>
                    <p>You scored {score} points!</p>
                    <p>Average Time per Question: {(totalTime / questionCount).toFixed(2)} seconds</p>
                    <button onClick={handleSubmit} className="submit-button">Submit Progress</button>
                </div>
            )}

            {/* Show loading state if progress data is being sent */}
            {renderLoading()}
        </div>
    );
};

export default ChordQuiz;
