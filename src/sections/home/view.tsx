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
  const [transactionId, setTransactionId] = useState();

  // const transactionId = '231213122734000445';

  const onLoaded = () => console.log('Loaded');
  const onOpened = () => console.log('Opened');
  const onCancelled = () => showLightbox(false);
  const onError = (data: any) => {
    console.log('Error:', data);
    showLightbox(false);
  };

  const handleClick = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY0YWRhMjgxZWU4OTY5ZjBkOTNiNmYiLCJpYXQiOjE3MDI0NjUzNDAsImV4cCI6MTcwMjU1MTc0MH0.8OIbQurV20IXzbL9bH-tbphjtN0pgdtrNlug98ISXNM'
    );
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      orderId: '65799401a47e1a5495925265',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://backend.iorder.ch/api/v1/payments', requestOptions as any)
      .then((response) => response.json())
      .then((result) => {
        // console.log(JSON.parse(result));
        setTransactionId(result.data.transactionId);
        showLightbox(true);
      })
      .catch((error) => console.log('error', error));
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
        <Button onClick={handleClick}>Start Lightbox</Button>
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
