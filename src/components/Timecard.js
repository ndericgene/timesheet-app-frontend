import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Button from '@mui/material/Button';

const Timecard = ({ timecardData }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div ref={componentRef}>
      {/* Render timecard data */}
      <Button variant="contained" onClick={handlePrint}>
        Print Timecard
      </Button>
    </div>
  );
};

export default Timecard;
