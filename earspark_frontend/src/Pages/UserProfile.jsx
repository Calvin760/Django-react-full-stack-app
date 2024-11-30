// UserProfile.js
import React, { useEffect, useState } from 'react';
import api from "../api"; // Import the axios instance that handles the JWT token

const UserProfile = () => {
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, []); // Run only once when the component mounts

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching
    }

    if (error) {
        return <div>{error}</div>; // Show error message if fetching fails
    }

    return (
        <div>
            <h1>Username: {username}</h1> {/* Display the username */}
        </div>
    );
};

export default UserProfile;
