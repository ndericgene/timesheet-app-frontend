import { useEffect, useState } from 'react';
import axios from 'axios';

const Management = () => {
  const [timecards, setTimecards] = useState([]);

  useEffect(() => {
    // Fetch submitted timecards from the backend
    axios.get('/api/timecards')
      .then(response => setTimecards(response.data))
      .catch(error => console.error('Error fetching timecards:', error));
  }, []);

  return (
    <div>
      <h2>Timecard Management</h2>
      {/* Render timecards for review */}
    </div>
  );
};

export default Management;
