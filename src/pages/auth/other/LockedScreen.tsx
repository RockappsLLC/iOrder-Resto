import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import Box from '@mui/material/Box';
import { Stack, Avatar, Typography } from '@mui/material';

export default function DateScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const formattedTime = currentTime.toLocaleTimeString('en-US', timeOptions);
  const timeParts = formattedTime.split(' ');

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };

  const formattedDate = currentTime.toLocaleDateString('en-US', options);
  const modifiedDate = formattedDate.replace(',', '');

  return (
    <>
      <Helmet>
        <title>Auth: Lock Screen</title>
      </Helmet>

      <Box
        component="main"
        sx={{
          py: 5,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          textAlign: 'center',
          px: { xs: 1, md: 0 },
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          '&:before': {
            width: 1,
            height: 1,
            zIndex: -1,
            content: "''",
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(/assets/background/overlay_6.png)',
          },
        }}
      >
        <Box pt={20}>
          <Typography
            color="#fff"
            fontWeight={200}
            fontSize={160}
            display="inline"
            style={{ lineHeight: '150px' }}
          >
            {timeParts[0]}
          </Typography>
          <Typography color="#fff" fontWeight={200} fontSize={44} display="inline">
            {timeParts[1]}
          </Typography>
        </Box>

        <Typography color="#fff" fontWeight={400} variant="h4">
          {modifiedDate}
        </Typography>

        <Stack mt="auto" direction={{ xs: 'row', sm: 'row' }}>
          <Avatar src="a" alt="a" sx={{ width: 80, height: 80 }} />

          <Stack ml={2} textAlign="left" direction={{ xs: 'column', sm: 'column' }}>
            <Typography fontWeight={600} fontSize={28} color="#fff">
              Coca Coffeetalk
            </Typography>
            <Typography variant="h6" color="#fff" fontWeight={300}>
              Logged in as, <span style={{ fontWeight: 600 }}>Bean Kean</span>
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}