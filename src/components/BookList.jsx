// src/components/BookList.jsx

import React from 'react';
import BookItem from './BookItem';
// Import Grid for layout, Box for centering, and CircularProgress for loading
import { Grid, Box, CircularProgress, Typography } from '@mui/material';

function BookList({ books, loading }) {
  if (loading) {
    // Center the loading spinner
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (books.length === 0) {
    return <Typography>No books found.</Typography>;
  }

  return (
    // Grid container manages the layout of its Grid item children
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {books.map(book => (
        <BookItem key={book.id} book={book} />
      ))}
    </Grid>
  );
}

export default BookList;