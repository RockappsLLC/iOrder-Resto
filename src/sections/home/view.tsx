// import { useState } from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';

// import {
//   LightboxModal,
//   TipAmountModal,
//   OrderPaymentDrawer,
//   OrderConfirmationModal,
// } from '../modals';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();

  // const [showLightboxModal, setShowLightboxModal] = useState(false);
  // const [showOrderModal, setShowOrderModal] = useState(false);
  // const [showTipsModal, setShowTipsModal] = useState(false);
  // const [showTipModal, setShowTipModal] = useState(false);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page Home </Typography>

      {/* <Button onClick={() => setShowTipModal(true)}> Show Drawer </Button>
      <Button onClick={() => setShowOrderModal(true)}> Show order modal </Button>
      <Button onClick={() => setShowTipsModal(true)}> Show tip amount </Button> */}

      {/* <OrderConfirmationModal
        showOrderModal={showOrderModal}
        setShowOrderModal={() => setShowOrderModal(false)}
      />

      <TipAmountModal
        showTipsModal={showTipsModal}
        setShowTipsModal={() => setShowTipsModal(false)}
      />

      <OrderPaymentDrawer showModal={showTipModal} setShowModal={() => setShowTipModal(false)} />

      <LightboxModal
        showModal={showLightboxModal}
        setShowModal={() => setShowLightboxModal(false)}
      /> */}

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      />
    </Container>
  );
}
