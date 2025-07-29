// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import axios from 'axios'; // <-- Import axios
import './index.css';

// === THIS IS THE CRITICAL FIX ===
// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://127.0.0.1:8000';
// =================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);