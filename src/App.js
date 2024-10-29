import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './views/auth/LoginForm'; // Adjusted path to the LoginForm
import SignupForm from './views/auth/SignUpForm';
import Dashboard from './views/admin/Dashboard';
import Practicantes from './views/admin/Interns';
import Visitantes from './views/admin/Visitors';
import './index.css'; // Make sure to import the CSS file where the font is defined


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/admin/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
        <Route path="/admin/practicantes" element={<Practicantes />} /> {/* Add Practicantes Route */}
        <Route path="/admin/visitantes" element={<Visitantes />} /> {/* Add Visitantes Route */}

        {/* Add other routes like Dashboard or other views */}
      </Routes>
    </Router>
  );
}

export default App;
