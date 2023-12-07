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
  const handleReservation = () => {
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
      <SelectPartySize />
      <SelectDate />
      <SelectTime />
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
