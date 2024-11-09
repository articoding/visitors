import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './views/auth/LoginForm';
import SignupForm from './views/auth/SignUpForm';
import Dashboard from './views/admin/Dashboard';
import Practicantes from './views/admin/Interns';
import Visitantes from './views/admin/Visitors';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute component
import './index.css'; // Import the CSS file where the font is defined

function App() {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/practicantes"
            element={
              <ProtectedRoute>
                <Practicantes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/visitantes"
            element={
              <ProtectedRoute>
                <Visitantes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
