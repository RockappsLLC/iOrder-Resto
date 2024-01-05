import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { Grid, Stack, DialogContentText } from '@mui/material';

import Iconify from 'src/components/iconify';
import SelectDate from 'src/components/select-date';
import SelectTime from 'src/components/select-time';
import SelectPartySize from 'src/components/select-partysize';

import { useReservationContext } from '../reservation';

const tags = [1, 2, 3, 4, 5];

const NewReservation = ({ open }: any) => {
  const { reservation, setReservation, setReservationTab } = useReservationContext();
  const [partySize, setPartySize] = useState(1);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [hours, setHours] = useState(0);

  const handleReservation = () => {
    const startDateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );

    const endDateTime = new Date(startDateTime.getTime() + hours * 60 * 60 * 1000);

    setReservation({
      ...reservation,
      startTime: startDateTime,
      endTime: endDateTime,
      guestNumber: partySize,
    });
    setReservationTab('guest');
  };

  const handleClose = () => {
    setReservation(null);
    setReservationTab(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E4E4E4',
        }}
      >
        <DialogTitle sx={{ py: 2 }}>New Reservation</DialogTitle>
        <Button onClick={handleClose}>
          <Iconify icon="tabler:x" />
        </Button>
      </div>
      <SelectPartySize partySize={partySize} setPartySize={setPartySize} />

      <SelectDate date={date} setDate={setDate} />

      <SelectTime time={time} setTime={setTime} />

      <Grid
        container
        sx={{
          p: 3,
          pt: 2,
          width: '100%',
          justifyContent: 'flex-start',
          borderRadius: '58px',
        }}
      >
        <Stack direction="column">
          <DialogContentText pb={1}>Event duration</DialogContentText>
          <Stack direction="row">
            {tags.map((tag: any, index: any) => (
              <Grid
                key={index}
                onClick={() => setHours(tag)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  width: 80,
                  bgcolor: tag === hours ? '#FFF5EE' : '',
                  color: tag === hours ? '#F15F34' : 'black',
                  '&:hover': { bgcolor: '#FFF5EE', color: '#F15F34', cursor: 'pointer' },
                  border: '1px solid #E4E4E4',
                  p: 2,
                  '&:first-of-type': {
                    borderTopLeftRadius: '16px',
                    borderBottomLeftRadius: '16px',
                  },
                  '&:last-of-type': {
                    borderTopRightRadius: '16px',
                    borderBottomRightRadius: '16px',
                  },
                }}
              >
                {tag === 1 ? `${tag} hour` : `${tag} hours`}
              </Grid>
            ))}
          </Stack>
        </Stack>
      </Grid>

      <DialogActions>
        <Button
          fullWidth
          onClick={handleClose}
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
