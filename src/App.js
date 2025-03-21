import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import TimesheetForm from './TimesheetForm';
import ManagerApproval from './ManagerApproval';

function App() {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link to="/" className="navbar-brand">Timekeeper</Link>
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            <Link to="/form" className="nav-link btn btn-light mx-1">Timesheet</Link>
            <Link to="/approve" className="nav-link btn btn-light mx-1">Manager Panel</Link>
            <button onClick={handleLogout} className="btn btn-danger mx-1">Logout</button>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/form" element={<TimesheetForm />} />
        <Route path="/approve" element={<ManagerApproval />} />
      </Routes>
    </Router>
  );
}

export default App;
