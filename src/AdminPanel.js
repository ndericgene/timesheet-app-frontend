import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'employee',
  });

  useEffect(() => {
    axios.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(() => alert('Failed to fetch users'));
  }, []);

  const handleAdd = () => {
    axios.post('/api/users', form)
      .then(res => {
        setUsers([...users, res.data]);
        setForm({ username: '', email: '', password: '', role: 'employee' });
      })
      .catch(() => alert('Failed to add user'));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(() => setUsers(users.filter(user => user._id !== id)))
      .catch(() => alert('Failed to delete user'));
  };

  return (
    <div className="container mt-5">
      <h2>User Management</h2>
      <div className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="form-select mb-2"
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
        <button className="btn btn-success" onClick={handleAdd}>Add User</button>
      </div>
      <ul className="list-group">
        {users.map(user => (
          <li key={user._id} className="list-group-item d-flex justify-content-between">
            <span>{user.username} ({user.role})</span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
