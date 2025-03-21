import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TimesheetList = () => {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://centralmechanical.org/api/timesheets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTimesheets(response.data);
      } catch (error) {
        toast.error("Failed to load timesheets");
      }
    };
    fetchTimesheets();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Past Timesheets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Week Ending</th>
            <th>Job Name</th>
            <th>Work Class</th>
            <th>Hours</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((ts) => (
            <tr key={ts.id}>
              <td>{ts.weekEnding}</td>
              <td>{ts.jobName}</td>
              <td>{ts.workClass}</td>
              <td>{Object.values(ts.hours).reduce((a, b) => a + b, 0)}</td>
              <td>{ts.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetList;
