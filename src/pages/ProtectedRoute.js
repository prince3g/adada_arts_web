import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, isAdmin }) => {
    const { user } = useContext(AuthContext);

    if (isAdmin) {
        // If it's an admin route and the user is either not logged in or not an admin
        if (!user || user.role !== 'admin') {
            return <Navigate to="/" />; // Redirect to home page
        }
    } else {
        // If it's not an admin route and the user is an admin, allow access
        // by returning the children components
        if (user && user.role === 'admin') {
            // return children;
            return <Navigate to="/admin" />
        }
    }

    return children; // Render children by default if no conditions are met
};

export default ProtectedRoute;
