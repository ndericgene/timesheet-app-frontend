import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TimesheetForm = () => {
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  // Initial state for the timesheet
  const [timesheet, setTimesheet] = useState({
    name: "",
    weekEnding: "",
    jobName: "",
    workClass: "",
    hours: {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    },
  });

  // Handle text input changes
  const handleChange = (e) => {
    setTimesheet({ ...timesheet, [e.target.name]: e.target.value });
  };

  // Handle numeric hour changes
  const handleHourChange = (day, value) => {
    setTimesheet({
      ...timesheet,
      hours: { ...timesheet.hours, [day]: value },
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("https://centralmechanical.org/api/timesheets", timesheet, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Timesheet submitted successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error submitting timesheet. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Submit Timesheet</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={timesheet.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Week Ending</label>
          <input
            type="date"
            className="form-control"
            name="weekEnding"
            value={timesheet.weekEnding}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Job Name</label>
          <input
            type="text"
            className="form-control"
            name="jobName"
            value={timesheet.jobName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Work Class</label>
          <input
            type="text"
            className="form-control"
            name="workClass"
            value={timesheet.workClass}
            onChange={handleChange}
            required
          />
        </div>

        <h4>Hours Worked</h4>
        {Object.keys(timesheet.hours).map((day) => (
          <div className="mb-2" key={day}>
            <label className="form-label">{day}</label>
            <input
              type="number"
              className="form-control"
              min="0"
              max="24"
              value={timesheet.hours[day]}
              onChange={(e) => handleHourChange(day, e.target.value)}
              required
            />
          </div>
        ))}

        <button type="submit" className="btn btn-success mt-3">
          Submit Timesheet
        </button>
      </form>
    </div>
  );
};

export default TimesheetForm;
