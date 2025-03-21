import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import TimesheetForm from "./TimesheetForm";
import TimesheetList from "./TimesheetList";
import ManagerApproval from "./ManagerApproval";
import Profile from "./Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit-timesheet" element={<TimesheetForm />} />
        <Route path="/past-timesheets" element={<TimesheetList />} />
        <Route path="/manager-approval" element={<ManagerApproval />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
