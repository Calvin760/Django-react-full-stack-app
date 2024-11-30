import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure you have axios installed
import ProgressCardContainer from '../components/ProgressCardContainer';
import ExerciseCardContainer from '../components/ExerciseCardContainer';
import { ACCESS_TOKEN } from '../constants'; // Assuming token is stored in localStorage
import api from "../api"; // Assuming this is your custom axios instance

const HomePage = () => {
  const [userName, setUserName] = useState('');  // Initialize with an empty string for better UX
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variables for quiz data
  const [data, setData] = useState([]);  // Store the data returned from your API
  const [points, setPoints] = useState(0);  // Assuming you want to track points
  const [exercisesCompleted, setExercisesCompleted] = useState(0);  // Number of exercises completed
  const [secondsSpent, setSecondsSpent] = useState(0);  // Time spent in seconds
  const [averageTime, setAverageTime] = useState(0);  // Average time per question

  // Fetch data when component mounts
  useEffect(() => {
    getData();
 
  }, []);

  // Fetch user data
  
  const [username, setUsername] = useState(null);
  useEffect(() => {
    // Fetch user profile from the backend
    api.get('/api/username/') // Replace with your actual API endpoint to get user data
      .then((response) => {
        setUsername(response.data.username); // Set the username from the response
        setLoading(false); // Set loading state to false
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data'); // Set error message
        setLoading(false); // Set loading state to false
      });
  }, []);

  // Fetch quiz data
  const getData = () => {
    api
      .get("/api/data/")
      .then((res) => {
        const fetchedData = res.data;
        console.log(fetchedData);  // Log the response to check its structure

        // Check if fetchedData is an array before using reduce
        if (Array.isArray(fetchedData)) {
          const totalPoints = fetchedData.reduce((acc, curr) => acc + curr.points, 0);
          const totalExercises = fetchedData.length;
          const totalSeconds = fetchedData.reduce((acc, curr) => acc + curr.total_time, 0);
          const averageTimePerExercise = totalExercises > 0 ? totalSeconds / totalExercises : 0;

          setPoints(totalPoints);
          setExercisesCompleted(totalExercises);
          setSecondsSpent(totalSeconds);
          setAverageTime(averageTimePerExercise);
        } else {
          setError('Fetched data is not in expected format (Array).');
          console.error('Error: Fetched data is not an array', fetchedData);
        }
      })
      .catch((err) => {
        console.error('Error fetching quiz data:', err);
        setError('Failed to fetch quiz data.');
        setLoading(false);
      });
  };

  // Display loading state or errors
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Welcome, {username}!</h2>

      {/* Show progress cards and exercise cards */}
      <ProgressCardContainer
        points={points}
        exercisesCompleted={exercisesCompleted}
        secondsSpent={secondsSpent}
        averageTime={averageTime}
      />
      <ExerciseCardContainer />
    </div>
  );
};

export default HomePage;
