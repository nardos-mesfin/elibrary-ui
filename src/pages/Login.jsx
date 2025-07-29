// src/pages/Login.jsx

import React, { useState, useContext } from 'react';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext'; // <-- Import the context

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // <-- Get the login function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      // Call the context login function with the user and token
      login(response.data.user, response.data.access_token);
      navigate('/'); // Redirect to home page on success
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
        {/* ... MUI Box structure ... */}
        <Typography component="h1" variant="h5">Sign in</Typography>
        {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField onChange={handleChange} margin="normal" required fullWidth name="email" label="Email Address" autoFocus />
            <TextField onChange={handleChange} margin="normal" required fullWidth name="password" label="Password" type="password" />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign In</Button>
        </Box>
    </Container>
  );
}

export default Login;