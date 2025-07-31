// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import NotificationContext from '../context/NotificationContext'; 

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showNotification } = useContext(NotificationContext);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', formData);
      login(response.data.user, response.data.access_token);
      navigate('/');
    } catch (err) {
      // Use the notification system for errors
      showNotification(err.response?.data?.message || 'Login failed. Please check your credentials.', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-parchment-cream/70 rounded-lg shadow-xl border border-dusty-rose">
      <h1 className="font-serif-display text-4xl text-center mb-6">Welcome Back</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-old-book-brown">Email Address</label>
          <input type="email" name="email" id="email" onChange={handleChange} className="form-input mt-1" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-old-book-brown">Password</label>
          <input type="password" name="password" id="password" onChange={handleChange} className="form-input mt-1" required />
        </div>
        <div>
          <button type="submit" className="btn w-full">Sign In</button>
        </div>
      </form>
      <p className="text-center mt-4 text-sm">
        Don't have an account? <Link to="/register" className="text-enchanted-teal hover:underline">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;