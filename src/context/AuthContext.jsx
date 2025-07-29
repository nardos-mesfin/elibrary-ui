// src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    // Configure axios to always send the token
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch the user data if we have a token but no user object
            if (!user) {
                axios.get('http://127.0.0.1:8000/api/user')
                    .then(response => setUser(response.data))
                    .catch(() => {
                        // If token is invalid, log out
                        logout();
                    });
            }
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = (userData, userToken) => {
        setToken(userToken);
        setUser(userData);
        localStorage.setItem('token', userToken);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    // 3. Provide the context value to children
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;