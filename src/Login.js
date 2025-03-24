import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [input, setInput] = useState(''); // could be email or username
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state before new login attempt

    try {
      const requestData = input.includes('@')
        ? { email: input, password }
        : { username: input, password };

      const response = await axios.post('https://centralmechanical.org/api/auth/login', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true); // Update the authentication state
      navigate('/form'); // Redirect to the timesheet form after successful login
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid credentials');
        } else {
          setError(`An error occurred: ${error.response.status} ${error.response.statusText}`);
        }
      } else if (error.request) {
        setError('No response received from server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Username or Email"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
