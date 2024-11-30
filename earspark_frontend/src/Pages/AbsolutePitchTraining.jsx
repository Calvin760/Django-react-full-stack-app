import React from 'react';
import './AbsolutePitchTraining.css';

const AbsolutePitchTraining = () => {
    const audioFiles = {
        C5: 'single-notes/C5.mp3',
        'C#5': 'single-notes/Csharp.mp3',
        D5: 'single-notes/D5.mp3',
        'D#5': 'single-notes/Dsharp.mp3',
        E5: 'single-notes/E5.mp3',
        F5: 'single-notes/F5.mp3',
        'F#5': 'single-notes/Fsharp.mp3',
        G5: 'single-notes/G5.mp3',
        'G#5': 'single-notes/Gsharp.mp3',
        A5: 'single-notes/A5.mp3',
        'A#5': 'single-notes/Asharp.mp3',
        B5: 'single-notes/B5.mp3',
        C6: 'single-notes/C6.mp3',
        A2: 'single-notes/A2.mp3',
        B2: 'single-notes/B2.mp3',
        C3: 'single-notes/C3.mp3',
        G6: 'single-notes/G6.mp3',
    };

    const playNote = (note) => {
        const audioSrc = audioFiles[note];
        if (audioSrc) {
            const audio = new Audio(audioSrc);
            audio.play().catch((error) => {
                console.error('Error playing audio:', error);
                alert('Error playing audio. Please check the console for more details.');
            });
        } else {
            console.warn(`No audio found for note: ${note}`);
        }
    };

    return (
        <div className="piano">
            {['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'].map((note) => (
                <div
                    key={note}
                    className="white-key"
                    onClick={() => playNote(note)}
                />
            ))}
            {['C#5', 'D#5', 'F#5', 'G#5', 'A#5'].map((note, index) => {
                const position = [0, 1, 3, 4, 5]; // Indices for black key positioning
                return (
                    <div
                        key={note}
                        className="black-key"
                        style={{ left: `${(position[index]) * 75 + 60}px` }} // Adjust position for centering
                        onClick={() => playNote(note)}
                    />
                );
            })}
        </div>
    );
};

export default AbsolutePitchTraining;
