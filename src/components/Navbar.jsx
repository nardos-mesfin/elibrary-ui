// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav className="bg-old-book-brown text-parchment-cream shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="font-serif-display text-3xl hover:text-gilded-gold transition-colors">
            E-Library
          </Link>
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <span className="hidden md:inline">Welcome, {user.name}</span>
                {user.is_admin === 1 && <Link to="/books/create" className="btn">Add Book</Link>}
                <Link to="/profile" className="hover:text-gilded-gold transition-colors">Profile</Link>
                <button onClick={handleLogout} className="hover:text-gilded-gold transition-colors">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="hover:text-gilded-gold transition-colors">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;