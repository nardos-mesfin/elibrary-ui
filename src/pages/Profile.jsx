// src/pages/Profile.jsx

import React, { useContext } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import AuthContext from '../context/AuthContext';

function Profile() {
    // Get the user object from the context
    const { user } = useContext(AuthContext);

    // If the user data hasn't loaded yet, show a loading message
    if (!user) {
        return <Typography>Loading profile...</Typography>;
    }

    // Once the user is loaded, display their details
    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Profile
                </Typography>
                <Typography variant="h6">
                    <strong>Name:</strong> {user.name}
                </Typography>
                <Typography variant="h6">
                    <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="h6">
                    <strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}
                </Typography>
            </Paper>
        </Box>
    );
}

export default Profile;