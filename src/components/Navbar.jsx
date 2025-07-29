// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
  // Get user and logout function from the context
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}>
          E-Library
        </Typography>
        
        {user ? (
          // If user is logged in
          <Box>
            <Typography component="span" sx={{ mr: 2 }}>Welcome, {user.name}</Typography>
            {user.is_admin ? (
                <Button color="inherit" component={Link} to="/books/create">Add Book</Button>
            ) : null}
            <Button color="inherit" component={Link} to="/profile">My Profile</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </Box>
        ) : (
          // If user is a guest
          <Box>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;