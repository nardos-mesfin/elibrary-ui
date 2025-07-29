// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

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
    // This is the part we are changing to use Tailwind CSS.
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-parchment-cream">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-enchanted-teal"></div>
            </div>
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