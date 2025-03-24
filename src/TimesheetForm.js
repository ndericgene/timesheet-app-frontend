import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const TimesheetForm = () => {
  const componentRef = useRef();

  const [user_id, setUserId] = useState('');
  const [week_ending, setWeekEnding] = useState('');
  const [job_name, setJobName] = useState('');
  const [work_class, setWorkClass] = useState('');
  const [monday_hours, setMondayHours] = useState('');
  const [tuesday_hours, setTuesdayHours] = useState('');
  const [wednesday_hours, setWednesdayHours] = useState('');
  const [thursday_hours, setThursdayHours] = useState('');
  const [friday_hours, setFridayHours] = useState('');
  const [saturday_hours, setSaturdayHours] = useState('');
  const [sunday_hours, setSundayHours] = useState('');
  const [total_hours, setTotalHours] = useState('');
  const [status, setStatus] = useState('');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/timesheets`, {
        user_id,
        week_ending,
        job_name,
        work_class,
        monday_hours,
        tuesday_hours,
        wednesday_hours,
        thursday_hours,
        friday_hours,
        saturday_hours,
        sunday_hours,
        total_hours,
        status
      });
      alert('Timesheet submitted!');
    } catch (err) {
      console.error(err);
      alert('Error submitting timesheet');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Timesheet Entry</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label>User ID</label>
          <input
            type="text"
            className="form-control"
            value={user_id}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Week Ending</label>
          <input
            type="date"
            className="form-control"
            value={week_ending}
            onChange={(e) => setWeekEnding(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Job Name</label>
          <input
            type="text"
            className="form-control"
            value={job_name}
            onChange={(e) => setJobName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Work Class</label>
          <input
            type="text"
            className="form-control"
            value={work_class}
            onChange={(e) => setWorkClass(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Monday Hours</label>
          <input
            type="number"
            className="form-control"
            value={monday_hours}
            onChange={(e) => setMondayHours(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Tuesday Hours</label>
          <input
            type="number"
            className="form-control"
            value={tuesday_hours}
            onChange={(e) => setTuesdayHours(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Wednesday Hours</label>
          <input
            type="number"
            className="form-control"
            value={wednesday_hours}
            onChange={(e) => setWednesdayHours(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Thursday Hours</label>
          <input
            type="number"
            className="form-control"
            value={thursday_hours}
            onChange={(e) => setThursdayHours(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Friday Hours</label>
          <input
            type="number"
            className="form-control"
            value={friday_hours}
            onChange={(e) => setFridayHours(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Saturday Hours</label>
          <input
            type="number"
            className="form-control"
            value={saturday_hours}
            onChange={(e) => setSaturdayHours(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Sunday Hours</label>
          <input
            type="number"
            className="form-control"
            value={sunday_hours}
            onChange={(e) => setSundayHours(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Total Hours</label>
          <input
            type="number"
            className="form-control"
            value={total_hours}
            onChange={(e) => setTotalHours(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <input
            type="text"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          Submit Timesheet
        </button>
        <button type="button" className="btn btn-secondary" onClick={handlePrint}>
          Print Timecard
        </button>
      </form>
    </div>
  );
};

export default TimesheetForm;
