import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Employee Dashboard</h2>
      <p>Welcome! What would you like to do?</p>
      <Link to="/submit-timesheet" className="btn btn-primary">Submit Timesheet</Link>
      <Link to="/past-timesheets" className="btn btn-secondary ml-3">View Past Timesheets</Link>
      <Link to="/profile" className="btn btn-info ml-3">View PTO Balance</Link>
    </div>
  );
};
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};


export default Dashboard;
