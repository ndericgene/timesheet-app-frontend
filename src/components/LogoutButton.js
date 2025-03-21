import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';

const LogoutButton = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Perform logout logic (e.g., clear auth tokens)
    history.push('/login');
  };

  return (
    <Button variant="contained" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
