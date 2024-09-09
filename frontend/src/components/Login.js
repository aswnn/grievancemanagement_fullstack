import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

const API_BASE_URL = 'http://localhost:8080';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, null, {
        params: { username, password }
      });
      setUser(response.data);
      switch (response.data.role) {
        case 'STUDENT':
          navigate('/student');
          break;
        case 'SUPERVISOR':
          navigate('/supervisor');
          break;
        case 'ASSIGNEE':
          navigate('/assignee');
          break;
        default:
          console.error('Unknown user role');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Invalid username or password');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
  <div className="login-container">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account?</p>
    <button className="register-button" onClick={handleRegisterClick}>Register Now</button>
  </div>
);

}

export default Login;
