import { Box, Modal, Stack, Button, Divider, TextField, Typography } from '@mui/material';

import { CloseIcon } from 'src/assets/icons';

interface TipAmountProps {
  showTipsModal: boolean;
  setShowTipsModal: (value: boolean) => void;
}

const TipAmountModal = ({ showTipsModal, setShowTipsModal }: TipAmountProps) => {
  const handleCloseTipModal = () => {
    setShowTipsModal(false);
  };

  return (
    <Modal open={showTipsModal} onClose={handleCloseTipModal}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 24,
          minWidth: 500,
        }}
      >
        <Stack direction="row" justifyContent="space-between" p={2.5}>
          <Typography variant="h5">Tip amount</Typography>
          <CloseIcon onClick={handleCloseTipModal} />
        </Stack>

        <Divider
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: '#E4E4E4',
          }}
        />

        <Stack p={2.5}>
          <TextField
            placeholder="Input amount"
            sx={{
              mt: 2,
              '& .MuiInputBase-root': {
                padding: '20px 10px',
              },
              '& .MuiInputBase-input': {
                textAlign: 'center',
              },
            }}
          />

          <Stack direction="row" width="100%" gap={2} mt={4}>
            <Button
              variant="outlined"
              color="error"
              sx={{ height: '50px', borderRadius: 10, px: 5, width: '50%' }}
              onClick={handleCloseTipModal}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              color="error"
              sx={{ height: '50px', borderRadius: 10, px: 5, width: '50%' }}
            >
              Add tip amount
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default TipAmountModal;
