import React from 'react';
import './ExerciseCardContainer.css'; // Import your CSS file
import ExerciseCard from './ExerciseCard'; // Ensure this component exists
import { FaVolumeUp, FaDrum, FaMusic, FaBook } from 'react-icons/fa';
import { FaEarListen } from "react-icons/fa6"; // Import icons
import { MdOutlinePiano } from "react-icons/md";

const ExerciseCardContainer = () => {
    // Updated example exercise data with icons
    const exercises = [
        { id: 1, title: 'Ear Training Exercise 1', description: 'Identify the pitch intervals.', duration: '5 min', icon: <FaVolumeUp />, link: '/ear-training' },
        { id: 2, title: 'Rhythm Practice', description: 'Practice clapping to the beat.', duration: '10 min', icon: <FaDrum />, link: '/rhythm-practice' },
        { id: 3, title: 'Chord Recognition', description: 'Identify major and minor chords.', duration: '7 min', icon: <FaMusic />, link: '/chord-recognition' },
        { id: 4, title: 'Theory', description: 'Learn about scales, keys, and chords.', duration: '15 min', icon: <FaBook />, link: '/theory' },
        { id: 5, title: 'Scale Exercises', description: 'Practice different musical scales.', duration: '15 min', icon: <MdOutlinePiano />, link: '/scale-exercises' },
        { id: 6, title: 'Absolute Pitch Trainer', description: 'Train your ability to identify pitches.', duration: '12 min', icon: <FaEarListen />, link: '/absolute-pitch' }, // Link to Absolute Pitch Training
    ];

    return (
        <div className="exercise-card-container">
            <h2>Exercises</h2>
            <div className="exercise-cards">
                {exercises.map(exercise => (
                    <ExerciseCard
                        key={exercise.id}
                        title={exercise.title}
                        description={exercise.description}
                        duration={exercise.duration}
                        icon={exercise.icon}
                        link={exercise.link} // Pass the link prop
                    />
                ))}
            </div>
        </div>
    );
};

export default ExerciseCardContainer;
