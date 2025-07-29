// src/pages/Register.jsx

import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://127.0.0.1:8000/api/register', formData);
      navigate('/login'); // Redirect to login page on success
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
      console.error(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* ... MUI Box structure ... */}
      <Typography component="h1" variant="h5">Sign up</Typography>
      {error && <Alert severity="error" sx={{ width: '100%', mt: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField onChange={handleChange} margin="normal" required fullWidth name="name" label="Full Name" autoFocus />
        <TextField onChange={handleChange} margin="normal" required fullWidth name="email" label="Email Address" />
        <TextField onChange={handleChange} margin="normal" required fullWidth name="password" label="Password" type="password" />
        <TextField onChange={handleChange} margin="normal" required fullWidth name="password_confirmation" label="Confirm Password" type="password" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Sign Up</Button>
      </Box>
    </Container>
  );
}

export default Register;