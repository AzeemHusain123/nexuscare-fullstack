import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      const loggedUser = res.data.username;

      localStorage.setItem('username', loggedUser);
      const userRole = loggedUser === 'admin' ? 'admin' : 'user';
      localStorage.setItem('role', userRole);

      onLogin(loggedUser);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <>
      <div className="background-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="form-container">
        <div className="form-box">
          <div className="header">
            <h2>Welcome Back!</h2>
            <p>Enter your credentials to access NexusCare</p>
          </div>

          {error && <div className="error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <span className="input-icon">👤</span>
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="input-icon">🔒</span>
            </div>

            <button type="submit" className="submit-btn">
              Login to NexusCare
            </button>
          </form>

          <p className="footer-text">
            Don't have an account? <a href="/register">Register..</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;