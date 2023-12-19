import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';

import ManageCustomer from '../dialogs/manage-customer';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();
  const [manageCustomer, setManageCustomer] = useState(false);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Page Home </Typography>
        <Button color="primary" variant="contained" onClick={() => setManageCustomer(true)}>
          OPEN MANAGE CUSTOMER
        </Button>
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
      <ManageCustomer open={manageCustomer} hide={() => setManageCustomer(false)} />
    </>
  );
}
