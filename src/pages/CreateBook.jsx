// src/pages/CreateBook.jsx

import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateBook() {
  const [formData, setFormData] = useState({ title: '', author: '', summary: '', publisher: '', pages: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    try {
      await axios.post('http://127.0.0.1:8000/api/books', formData);
      setMessage('Book created successfully!');
      setTimeout(() => navigate('/'), 2000); // Go home after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create book.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>Add a New Book</Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField name="title" label="Title" onChange={handleChange} fullWidth required margin="normal" />
          <TextField name="author" label="Author" onChange={handleChange} fullWidth required margin="normal" />
          <TextField name="publisher" label="Publisher" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="pages" label="Pages" type="number" onChange={handleChange} fullWidth margin="normal" />
          <TextField name="summary" label="Summary" onChange={handleChange} fullWidth multiline rows={4} margin="normal" />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>Create Book</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default CreateBook;