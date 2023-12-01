import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();

    // Check if there's a token in local storage
    if (!token) {
        // If not, redirect to the login page
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If there's a token, render the children components
    return children;
};

export default ProtectedRoute;
