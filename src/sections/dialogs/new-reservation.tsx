import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import Iconify from 'src/components/iconify';
import SelectDate from 'src/components/select-date';
import SelectTime from 'src/components/select-time';
import SelectPartySize from 'src/components/select-partysize';

const NewReservation = ({ open, hide }: any) => {
  const [partySize, setPartySize] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const handleReservation = () => {
    console.log(
      partySize,
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      )
    );
    hide();
  };

  return (
    <Dialog open={open} onClose={hide}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E4E4E4',
        }}
      >
        <DialogTitle sx={{ py: 2 }}>New Reservation</DialogTitle>
        <Button onClick={hide}>
          <Iconify icon="tabler:x" />
        </Button>
      </div>
      <SelectPartySize partySize={partySize} setPartySize={setPartySize} />
      <SelectDate date={date} setDate={setDate} />
      <SelectTime time={time} setTime={setTime} />
      <DialogActions>
        <Button
          fullWidth
          onClick={hide}
          color="primary"
          variant="outlined"
          sx={{ borderRadius: '58px', p: '10px' }}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          onClick={handleReservation}
          color="primary"
          variant="contained"
          sx={{ borderRadius: '58px', p: '10px', ':hover': { bgcolor: '#f2734e' } }}
        >
          <Typography fontSize={16} fontWeight={600}>
            Continue
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewReservation;
