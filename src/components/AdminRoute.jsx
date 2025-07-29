// src/components/AdminRoute.jsx

import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function AdminRoute() {
    const { user } = useContext(AuthContext);

    // Check if a user exists AND if they are an admin.
    // If not, redirect them to the home page.
    return user && user.is_admin ? <Outlet /> : <Navigate to="/" replace />;
}

export default AdminRoute;