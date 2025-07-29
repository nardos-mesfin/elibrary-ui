// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.password_confirmation) {
        setError("Passwords do not match.");
        return;
    }
    try {
      await axios.post('http://127.0.0.1:8000/api/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-parchment-cream/70 rounded-lg shadow-xl border border-dusty-rose">
      <h1 className="font-serif-display text-4xl text-center mb-6">Join the Library</h1>
      {error && <p className="bg-red-200 text-red-800 p-3 rounded-md mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-old-book-brown">Your Name</label>
          <input type="text" name="name" id="name" onChange={handleChange} className="form-input mt-1" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-old-book-brown">Email Address</label>
          <input type="email" name="email" id="email" onChange={handleChange} className="form-input mt-1" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-old-book-brown">Password</label>
          <input type="password" name="password" id="password" onChange={handleChange} className="form-input mt-1" required />
        </div>
        <div>
          <label htmlFor="password_confirmation" className="block text-sm font-medium text-old-book-brown">Confirm Password</label>
          <input type="password" name="password_confirmation" id="password_confirmation" onChange={handleChange} className="form-input mt-1" required />
        </div>
        <div>
          <button type="submit" className="btn w-full">Create Account</button>
        </div>
      </form>
      <p className="text-center mt-4 text-sm">
        Already have an account? <Link to="/login" className="text-enchanted-teal hover:underline">Sign in</Link>
      </p>
    </div>
  );
}

export default Register;