// src/components/ProtectedRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProtectedRoute() {
    const { user } = useContext(AuthContext);

    // The AuthProvider handles the loading state. By the time this component
    // renders, we have a definitive answer about the user's auth status.
    
    // If a user object exists, we are authenticated, so render the child component.
    // Otherwise, we are not authenticated, so redirect to the login page.
    // 'replace' prevents the user from going back to the protected route with the browser's back button.
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;