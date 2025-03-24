import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import TimesheetForm from './TimesheetForm';
import ManagerApproval from './ManagerApproval';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="collapse navbar-collapse">
          <div className="navbar-nav">
            {isAuthenticated ? (
              <>
                <Link to="/form" className="btn btn-light mx-1">Timesheet</Link>
                <Link to="/approve" className="btn btn-light mx-1">Manager Panel</Link>
                <button onClick={handleLogout} className="btn btn-danger mx-1">Logout</button>
              </>
            ) : null}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated ? (
          <>
            <Route path="/form" element={<TimesheetForm />} />
            <Route path="/approve" element={<ManagerApproval />} />
            <Route path="*" element={<Navigate to="/form" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
