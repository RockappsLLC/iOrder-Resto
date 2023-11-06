import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const data = [
  {
    id: 0,
    isActive: false,
    name: 'Beby Jovancy',
  },
  {
    id: 1,
    isActive: false,
    name: 'Aisyah Zidni',
  },
  {
    id: 2,
    isActive: true,
    name: 'Nirmala Azalea',
  },
  {
    id: 3,
    isActive: false,
    name: 'Bena Kane',
  },
  {
    id: 4,
    isActive: false,
    name: 'Firmino Kudo',
  },
];

export default function ChooseUserScreen() {
  const [Users, setUsers] = useState(data);

  const ChangeActive = (id: any) => {
    const newData = [...Users] as any;
    newData.find((item: any) => item.isActive === true).isActive = false;
    newData[id].isActive = true;
    setUsers(newData);
  };

  return (
    <>
      <Helmet>
        <title> Auth: Choose user</title>
      </Helmet>

      <Box
        component="main"
        sx={{
          py: 12,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          textAlign: 'center',
          px: { xs: 2, md: 0 },
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
        <Stack
          direction={{ xs: 'row', sm: 'row' }}
          width="min-content"
          maxWidth="60%"
          gap={5}
          overflow="scroll"
        >
          {Users.map((user: any, num: number) => (
            <Stack direction={{ xs: 'column', sm: 'column' }} key={num}>
              <Box
                width={user.isActive ? 124 : 100}
                height={user.isActive ? 124 : 100}
                borderRadius={100}
                sx={{
                  backgroundColor: 'red',
                  opacity: user.isActive ? 1 : 0.5,
                }}
                onClick={() => ChangeActive(user.id)}
              />
              <Typography color="#fff" width="max-content" textAlign="center">
                {user.name}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack mt={10} direction={{ xs: 'column', sm: 'column' }} spacing={2}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              variant="contained"
              color="error"
              sx={{
                '&:hover': { backgroundColor: '#F15F34' },
                paddingInline: 7,
                paddingY: 1,
                borderRadius: 10,
              }}
            >
              Clock in
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'white',
                color: '#F15F34',
                '&:hover': { backgroundColor: '#FFF' },
                paddingInline: 7,
                borderRadius: 10,
              }}
            >
              Clock out
            </Button>
          </Stack>

          <Button
            variant="outlined"
            color="error"
            sx={{ backdropFilter: `blur(10px)`, borderRadius: 10 }}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </>
  );
}
