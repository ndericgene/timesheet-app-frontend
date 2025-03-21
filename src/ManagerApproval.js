import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManagerApproval = () => {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://centralmechanical.org/api/timesheets/pending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTimesheets(response.data);
      } catch (error) {
        toast.error("Failed to load pending timesheets");
      }
    };
    fetchTimesheets();
  }, []);

  const handleApproval = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`https://centralmechanical.org/api/timesheets/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Timesheet ${status}`);
      setTimesheets(timesheets.filter((ts) => ts.id !== id));
    } catch (error) {
      toast.error("Error updating timesheet");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manager Approval</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Week Ending</th>
            <th>Job Name</th>
            <th>Hours</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((ts) => (
            <tr key={ts.id}>
              <td>{ts.name}</td>
              <td>{ts.weekEnding}</td>
              <td>{ts.jobName}</td>
              <td>{Object.values(ts.hours).reduce((a, b) => a + b, 0)}</td>
              <td>
                <button className="btn btn-success btn-sm" onClick={() => handleApproval(ts.id, "approved")}>
                  Approve
                </button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleApproval(ts.id, "rejected")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerApproval;
