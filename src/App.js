import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './views/auth/LoginForm'; // Adjusted path to the LoginForm
import SignupForm from './views/auth/SignUpForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        {/* Add other routes like Dashboard or other views */}
      </Routes>
    </Router>
  );
}

export default App;
