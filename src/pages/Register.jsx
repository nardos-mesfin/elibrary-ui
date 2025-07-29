// src/pages/Register.jsx

import React from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

function Register() {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <TextField margin="normal" required fullWidth id="name" label="Full Name" name="name" autoFocus />
          <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" />
          <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" />
          <TextField margin="normal" required fullWidth name="password_confirmation" label="Confirm Password" type="password" id="password_confirmation" />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;