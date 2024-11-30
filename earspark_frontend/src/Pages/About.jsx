import React from 'react';
import './About.css'; // Import CSS for styling

const About = () => {
    return (
        <div className="about-container">
            <h1>About EarSpark</h1>
            <p>
                Welcome to EarSpark, your go-to destination for music education and ear training! Our mission is to empower musicians of all levels by providing engaging resources that enhance musical skills and deepen understanding.
            </p>
            <h2>Our Story</h2>
            <p>
                Founded by a group of passionate musicians and educators, EarSpark was created out of a desire to make music learning accessible and enjoyable. We believe that everyone can develop their musical abilities with the right tools and guidance.
            </p>
            <h2>What We Offer</h2>
            <ul>
                <li>Interactive lessons covering music theory, ear training, and more.</li>
                <li>Quizzes and exercises to test your knowledge and improve your skills.</li>
                <li>A supportive community of fellow learners and experienced musicians.</li>
                <li>Resources and tips for practice and performance.</li>
            </ul>
            <h2>Join Us</h2>
            <p>
                Whether you're a beginner picking up an instrument for the first time or an experienced musician looking to refine your skills, EarSpark has something for you. Join our community today and start your musical journey!
            </p>
        </div>
    );
};

export default About;
