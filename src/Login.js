import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [input, setInput] = useState(''); // could be email or username
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

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

      console.log('Login successful', response.data);
      // store token or redirect...
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid credentials');
          console.error('Login failed: Invalid credentials', error.response.data);
        } else {
          setError(`An error occurred: ${error.response.status} ${error.response.statusText}`);
          console.error('Login error', error.response.data);
        }
      } else if (error.request) {
        setError('No response received from server. Please try again later.');
        console.error('No response received', error.request);
      } else {
        setError('An error occurred. Please try again.');
        console.error('Login error', error.message);
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
