// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [input, setInput] = useState(''); // could be email or username
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

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
      if (error.response && error.response.status === 401) {
        console.error('Login failed: Invalid credentials', error.response.data);
      } else {
        console.error('Login error', error);
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
    </form>
  );
};

export default Login;
