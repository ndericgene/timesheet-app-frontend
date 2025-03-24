import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const TimesheetForm = () => {
  const componentRef = useRef();

  const [employeeName, setEmployeeName] = useState('');
  const [entries, setEntries] = useState([
    { date: '', jobName: '', workClass: '', hours: '' }
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

  const addEntry = () => {
    setEntries([...entries, { date: '', jobName: '', workClass: '', hours: '' }]);
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const filteredEntries = entries.filter(entry =>
      entry.date || entry.jobName || entry.workClass || entry.hours
    );

    if (!employeeName || filteredEntries.length === 0) {
      alert('Please enter your name and at least one timesheet entry.');
      return;
    }

    try {
      await axios.post('https://centralmechanical.org/api/timesheets', {
        employeeName,
        records: filteredEntries, // Ensure the key matches the backend expectation
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
          <label>Employee Name</label>
          <input
            type="text"
            className="form-control"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            required
          />
        </div>

        <div ref={componentRef}>
          {entries.map((entry, index) => (
            <div key={index} className="row mb-3">
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  value={entry.date}
                  onChange={(e) => handleChange(index, 'date', e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Job Name"
                  value={entry.jobName}
                  onChange={(e) => handleChange(index, 'jobName', e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Work Class"
                  value={entry.workClass}
                  onChange={(e) => handleChange(index, 'workClass', e.target.value)}
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Hours"
                  value={entry.hours}
                  onChange={(e) => handleChange(index, 'hours', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn btn-outline-primary me-2" onClick={addEntry}>
          Add Line
        </button>
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
