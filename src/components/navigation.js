import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const Navigation = () => (
  <nav>
    <Link to="/dashboard">
      <Button variant="contained">Dashboard</Button>
    </Link>
    <Link to="/profile">
      <Button variant="contained">Profile</Button>
    </Link>
    {/* Add more navigation buttons as needed */}
  </nav>
);

export default Navigation;
