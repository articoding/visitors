// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // If there's no user, redirect to login page
  return currentUser ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
