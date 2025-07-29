// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar'; 
// Import the pages
import Home from './pages/Home'; // We will create this next
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* The Routes component wraps all our individual routes */}
        <Routes>
          {/* Each Route defines a path and the component to render */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;