import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(localStorage.getItem('username') || null);

  const handleLogin = (username) => {
    localStorage.setItem('username', username);
    setLoggedInUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    setLoggedInUser(null);
  };

  return (
    <Router>
      <ThemeToggle /> {/* Added Here - Always Visible Top-Right */}
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={loggedInUser ? <Dashboard username={loggedInUser} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;