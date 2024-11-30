import React from 'react';

const Theory = () => {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Introduction to Music Theory</h1>

            <section>
                <h2>Intervals</h2>
                <p>
                    An interval is the distance between two notes, measured in scale degrees. Understanding intervals is crucial for building chords and melodies.
                </p>
                <ul>
                    <li>
                        <strong>Unison:</strong> Same note (0 half steps)
                    </li>
                    <li>
                        <strong>Minor Second:</strong> One half step (e.g., C to C#)
                    </li>
                    <li>
                        <strong>Major Second:</strong> Two half steps (e.g., C to D)
                    </li>
                    <li>
                        <strong>Perfect Fifth:</strong> Seven half steps (e.g., C to G)
                    </li>
                    <li>
                        <strong>Octave:</strong> Twelve half steps (e.g., C to the next C)
                    </li>
                </ul>
            </section>

            <section>
                <h2>Scales</h2>
                <p>
                    A scale is a series of notes in a specific order. The most common scales are the major and minor scales.
                </p>
                <h3>Major Scale</h3>
                <p>
                    The major scale follows the pattern: whole, whole, half, whole, whole, whole, half.
                    For example, the C major scale is: C, D, E, F, G, A, B, C.
                </p>
                <h3>Minor Scale</h3>
                <p>
                    The natural minor scale follows the pattern: whole, half, whole, whole, half, whole, whole.
                    For example, the A natural minor scale is: A, B, C, D, E, F, G, A.
                </p>
            </section>

            <section>
                <h2>Chords</h2>
                <p>
                    A chord is a group of notes played simultaneously. The most common type of chord is the triad, which consists of three notes.
                </p>
                <h3>Triads</h3>
                <p>
                    A triad is formed by stacking two intervals of a third on top of a root note.
                    <ul>
                        <li><strong>Major Triad:</strong> Root, Major Third, Perfect Fifth (e.g., C-E-G)</li>
                        <li><strong>Minor Triad:</strong> Root, Minor Third, Perfect Fifth (e.g., A-C-E)</li>
                        <li><strong>Diminished Triad:</strong> Root, Minor Third, Diminished Fifth (e.g., B-D-F)</li>
                        <li><strong>Augmented Triad:</strong> Root, Major Third, Augmented Fifth (e.g., C-E-G#)</li>
                    </ul>
                </p>
            </section>

            <section>
                <h2>Rhythm</h2>
                <p>
                    Rhythm refers to the timing of music, including the duration of notes and rests. It is one of the fundamental aspects of music.
                </p>
                <h3>Basic Rhythmic Values</h3>
                <ul>
                    <li><strong>Whole Note:</strong> 4 beats</li>
                    <li><strong>Half Note:</strong> 2 beats</li>
                    <li><strong>Quarter Note:</strong> 1 beat</li>
                    <li><strong>Eighth Note:</strong> 1/2 beat</li>
                    <li><strong>Sixteenth Note:</strong> 1/4 beat</li>
                </ul>
                <h3>Time Signatures</h3>
                <p>
                    Time signatures indicate how many beats are in a measure and which note value gets one beat. Common time signatures include:
                    <ul>
                        <li><strong>4/4:</strong> Four beats per measure, quarter note gets one beat (common in many genres).</li>
                        <li><strong>3/4:</strong> Three beats per measure, often used in waltzes.</li>
                        <li><strong>6/8:</strong> Six beats per measure, with a feel of two beats (often used in faster music).</li>
                    </ul>
                </p>
            </section>

            <section>
                <h2>Conclusion</h2>
                <p>
                    Understanding intervals, scales, chords, and rhythm is essential for any musician. These concepts form the foundation of music and can greatly enhance your ability to create and perform.
                </p>
            </section>
        </div>
    );
};

export default Theory;
