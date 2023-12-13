import { useState } from 'react';
import Lightbox from 'react-datatrans-light-box';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();
  const [lightbox, showLightbox] = useState(false);

  const transactionId = '231213122734000445';

  const onLoaded = () => console.log('Loaded');
  const onOpened = () => console.log('Opened');
  const onCancelled = () => showLightbox(false);
  const onError = (data: any) => {
    console.log('Error:', data);
    showLightbox(false);
  };

  console.log('lightbox', lightbox);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4"> Page Home </Typography>

      {lightbox && transactionId ? (
        <Lightbox
          transactionId={transactionId}
          // production
          production={false}
          onLoaded={onLoaded}
          onOpened={onOpened}
          onCancelled={onCancelled}
          onError={onError}
        />
      ) : (
        <Button onClick={() => showLightbox(true)}>Start Lightbox</Button>
      )}

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
