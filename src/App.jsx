// src/App.jsx

import { useState, useEffect } from 'react';
import BookList from './components/BookList';
// Import the main layout and typography components from MUI
import { Container, Typography, CssBaseline } from '@mui/material';
import './App.css'; // We can keep this for any future custom styles

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/books')
      .then(response => response.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the books:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* CssBaseline provides a consistent baseline style */}
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom align="center">
          E-Library Collection
        </Typography>
        <BookList loading={loading} books={books} />
      </Container>
    </>
  );
}

export default App;