// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Box, CircularProgress } from '@mui/material';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [loading, setLoading] = useState(true); // Manages the initial user verification

    useEffect(() => {
        // This effect runs only once when the component mounts
        const verifyUser = async () => {
            if (token) {
                try {
                    // Set the token for all subsequent axios requests
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    
                    // Fetch user data
                    const response = await axios.get('http://127.0.0.1:8000/api/user');
                    
                    if (response.data) {
                        setUser(response.data);
                    }
                } catch (error) {
                    // If token is invalid or expired, clear it
                    console.error("Authentication Error:", error);
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                }
            }
            // Mark the initial verification as complete
            setLoading(false);
        };

        verifyUser();
    }, []); // Empty dependency array ensures this runs only once

    const login = (userData, userToken) => {
        localStorage.setItem('token', userToken);
        setToken(userToken);
        setUser(userData);
        axios.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    // While verifying the user for the first time, show a full-page loader.
    // This prevents any part of the app from rendering with incorrect auth state.
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Once verification is done, render the app and provide the context value.
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;