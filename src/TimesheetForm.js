// src/TimesheetForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReactToPrint } from 'react-to-print';
import React, { useRef } from 'react';

const TimesheetForm = () => {
  const navigate = useNavigate();
  const [weekStart, setWeekStart] = useState("");
  const [entries, setEntries] = useState([
    { day: "Monday", job_name: "", work_class: "", hours: "" },
    { day: "Tuesday", job_name: "", work_class: "", hours: "" },
    { day: "Wednesday", job_name: "", work_class: "", hours: "" },
    { day: "Thursday", job_name: "", work_class: "", hours: "" },
    { day: "Friday", job_name: "", work_class: "", hours: "" },
  ]);

  const handleChange = (index, field, value) => {
    const newEntries = [...entries];
    newEntries[index][field] = value;
    setEntries(newEntries);
  };

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const payload = {
        week_start: weekStart,
        times: entries.filter(e => e.job_name && e.work_class && e.hours !== "")
      };

      const response = await axios.post("/api/timesheets", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Timesheet submitted");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Timesheet Summary", 10, 10);
    entries.forEach((entry, i) => {
      doc.text(
        `${entry.day}: ${entry.job_name} | ${entry.work_class} | ${entry.hours} hrs`,
        10,
        20 + i * 10
      );
    });
    doc.save("timesheet.pdf");
  };

  return (
    <div className="container mt-4">
      <h2>Submit Timesheet</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Week Starting</label>
          <input type="date" className="form-control" value={weekStart} onChange={(e) => setWeekStart(e.target.value)} required />
        </div>
        {entries.map((entry, idx) => (
          <div key={idx} className="card p-3 mb-2">
            <strong>{entry.day}</strong>
            <input
              type="text"
              placeholder="Job Name"
              className="form-control my-1"
              value={entry.job_name}
              onChange={(e) => handleChange(idx, "job_name", e.target.value)}
            />
            <input
              type="text"
              placeholder="Work Class"
              className="form-control my-1"
              value={entry.work_class}
              onChange={(e) => handleChange(idx, "work_class", e.target.value)}
            />
            <input
              type="number"
              placeholder="Hours"
              className="form-control my-1"
              value={entry.hours}
              onChange={(e) => handleChange(idx, "hours", e.target.value)}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={handlePrint}>Print PDF</button>
      </form>
    </div>
  );
};

export default TimesheetForm;
