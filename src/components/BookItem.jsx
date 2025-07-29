// src/components/BookItem.jsx

import React from 'react';
// Import the MUI components we need
import { Grid, Card, CardContent, Typography } from '@mui/material';

function BookItem({ book }) {
  return (
    // Grid item will manage the responsive layout
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            by {book.author}
          </Typography>
          <Typography variant="body2">
            {book.summary || 'No summary available.'}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default BookItem;