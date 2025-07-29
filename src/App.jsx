// src/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import CreateBook from './pages/CreateBook'; 
import AdminRoute from './components/AdminRoute'; 

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* The Routes component wraps all our individual routes */}
        <Routes>
           {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/books/create" element={<CreateBook />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;