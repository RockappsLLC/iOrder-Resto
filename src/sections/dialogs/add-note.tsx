import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';

const AddNote = ({ open, hide }: any) => {
  const { t } = useTranslate();

  const handleAddNote = () => {
    hide();
  };

  return (
    <Dialog open={open} onClose={hide}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle sx={{ py: 2 }}>{t('add_note')}</DialogTitle>
        <Button onClick={hide}>
          <Iconify icon="tabler:x" />
        </Button>
      </div>
      <DialogContent sx={{ width: '470px' }}>
        <Typography color="#828487" fontSize={12} fontWeight={500}>
          {t('enter_order_note')}
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={5}
          sx={{ mt: '5px' }}
          placeholder={`${t('write_your_order_note_here')}...`}
        />
      </DialogContent>
      <DialogActions>
        <Button
          fullWidth
          onClick={hide}
          color="primary"
          variant="outlined"
          sx={{ borderRadius: '58px', p: '10px' }}
        >
          {t('cancel')}
        </Button>
        <Button
          fullWidth
          onClick={handleAddNote}
          color="primary"
          variant="contained"
          sx={{ borderRadius: '58px', p: '10px', ':hover': { bgcolor: '#f2734e' } }}
        >
          <Typography fontSize={16} fontWeight={600}>
            {t('add_to_order')}
          </Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNote;
