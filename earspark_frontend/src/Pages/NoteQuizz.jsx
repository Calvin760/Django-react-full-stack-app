import React, { useState } from 'react';
import './NoteQuizz.css'; // Ensure you have appropriate styles

const notes = ['C5', 'Csharp', 'D5', 'Dsharp', 'E5', 'F5', 'Fsharp', 'G5', 'Gsharp', 'A5', 'Asharp', 'B5'];

const NoteQuiz = () => {
    const [options, setOptions] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [lastAudio, setLastAudio] = useState(null); // State to store last played audio

    const playRandomNote = () => {
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        const audioSrc = `single-notes/${randomNote}.mp3`; // Ensure your audio files are named accordingly
        const audio = new Audio(audioSrc);

        setIsPlaying(true);
        setLastAudio(audio); // Store reference to the last audio
        audio.play().catch((error) => {
            console.error('Error playing audio:', error);
            setFeedback('Error playing audio. Please check the files.');
            setIsPlaying(false);
        });

        audio.onended = () => {
            setIsPlaying(false);
        };

        // Generate options
        const uniqueOptions = generateOptions(randomNote);
        setOptions(shuffleArray(uniqueOptions)); // Shuffle options
        setCorrectAnswer(randomNote);
        setFeedback('');
    };

    const repeatLastNote = () => {
        if (lastAudio) {
            lastAudio.currentTime = 0; // Reset to the start
            lastAudio.play().catch((error) => {
                console.error('Error replaying audio:', error);
            });
        }
    };

    const generateOptions = (correctNote) => {
        const uniqueOptions = new Set([correctNote]);

        while (uniqueOptions.size < 4) {
            const randomNote = notes[Math.floor(Math.random() * notes.length)];
            uniqueOptions.add(randomNote);
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

    const checkAnswer = (option) => {
        if (option === correctAnswer) {
            setFeedback('Correct!');
        } else {
            setFeedback(`Wrong! The correct answer was ${correctAnswer}.`);
        }
    };

    return (
        <div className="note-quiz">
            {/* <h1>Note Quiz</h1> */}
            <button onClick={playRandomNote} disabled={isPlaying} className="play-button">
                {isPlaying ? 'Playing...' : 'Play Random Note'}
            </button>
            <button onClick={repeatLastNote} disabled={!lastAudio} className="repeat-button">
                Repeat Last Note
            </button>
            {options.length > 0 && (
                <div className="options">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            className="option-button"
                            onClick={() => checkAnswer(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
            {feedback && <div className="feedback">{feedback}</div>}
        </div>
    );
};

export default NoteQuiz;
