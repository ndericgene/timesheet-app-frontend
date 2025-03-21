import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagerApproval = () => {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    axios.get('/api/timesheets/pending')
      .then(res => setTimesheets(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleApprove = (id) => {
    axios.post(`/api/timesheets/${id}/approve`)
      .then(() => setTimesheets(timesheets.filter(ts => ts._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-5">
      <h2>Pending Timesheets</h2>
      {timesheets.length === 0 ? (
        <p>No timesheets pending approval.</p>
      ) : (
        <ul className="list-group">
          {timesheets.map((ts) => (
            <li key={ts._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{ts.employeeName} - {ts.weekOf}</span>
              <button className="btn btn-success" onClick={() => handleApprove(ts._id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManagerApproval;
