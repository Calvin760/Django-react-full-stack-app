import React, { useState, useEffect } from "react";
import api from "../api";
import { ACCESS_TOKEN } from "../constants"; // Assuming ACCESS_TOKEN is defined in constants
import { FaStar, FaCheckCircle, FaClock } from "react-icons/fa"; // Import icons
import './ProgressCard.css'; // Import your CSS file
import axios from 'axios';

const ProgressCard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]); // Store API response data
    const [points, setPoints] = useState(0); // Initialize as numbers, not arrays
    const [exercisesCompleted, setExercisesCompleted] = useState(0);
    const [secondsSpent, setSecondsSpent] = useState(0);
    const [averageTime, setAverageTime] = useState(0);
    const [userName, setUserName] = useState('Guest'); // User name state

    // Fetch data when component mounts
    useEffect(() => {
        getData();
        fetchUserData();
    }, []);

    // Fetch user data
    const fetchUserData = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);

        if (!token) {
            setError('No token found. Please log in again.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get('/api/data/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Set the user name after fetching
            
            setLoading(false);
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError('Failed to fetch user data.');
            setLoading(false);
        }
    };

    // Fetch quiz data
    const getData = () => {
        api
            .get("/api/data/")
            .then((res) => {
                const fetchedData = res.data;
                setData(fetchedData);

                // Calculate stats from the fetched data
                const totalPoints = fetchedData.reduce((acc, curr) => acc + curr.points, 0);
                const totalExercises = fetchedData.length;
                const totalSeconds = fetchedData.reduce((acc, curr) => acc + curr.total_time, 0);
                const averageTimePerExercise = totalExercises > 0 ? totalSeconds / totalExercises : 0;

                setPoints(totalPoints);
                setExercisesCompleted(totalExercises);
                setSecondsSpent(totalSeconds);
                setAverageTime(averageTimePerExercise);
            })
            .catch((err) => {
                console.error('Error fetching quiz data:', err);
                setError('Failed to fetch quiz data.');
                setLoading(false);
            });
    };

    // Show loading or error message
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="progress-card">
            <div className="statistic">
                <FaStar className="icon" />
                <div className="info">
                    <h2>{points}</h2>  {/* Display points */}
                    <p>Points</p>
                </div>
            </div>
            <div className="statistic">
                <FaCheckCircle className="icon" />
                <div className="info">
                    <h2>{exercisesCompleted}</h2>  {/* Display exercises completed */}
                    <p>Exercises Completed</p>
                </div>
            </div>
            <div className="statistic">
                <FaClock className="icon" />
                <div className="info">
                    <h2>{secondsSpent} sec</h2>  {/* Display time spent */}
                    <p>Time Spent</p>
                </div>
            </div>
        </div>
    );
};

export default ProgressCard;
