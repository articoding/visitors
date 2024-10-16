import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './views/auth/LoginForm'; // Adjusted path to the LoginForm

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        {/* Add other routes like Dashboard or other views */}
      </Routes>
    </Router>
  );
}

export default App;
