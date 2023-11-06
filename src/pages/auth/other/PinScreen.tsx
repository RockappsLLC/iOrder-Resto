import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import { Stack, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

const setPadding = (value: any) => `${value}px`;

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

function CustomKeyboard({ onKeyPress, onClear, onBackspace }: any) {
  const [pin, setPin] = useState('');

  const handleKeyPress = (value: any) => {
    setPin((prevPin) => prevPin + value);
    onKeyPress(value);
  };

  const handleBackspace = () => {
    const newPin = pin.slice(0, -1);
    setPin(newPin);
    onBackspace();
  };

  const handleClear = () => {
    setPin('');
    onClear();
  };

  return (
    <Box mt={5}>
      <input
        type="text"
        value={pin}
        placeholder="Enter your PIN"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#fff',
          marginBottom: 10,
          textAlign: 'center',
          outline: 'none',
          fontSize: '28px',
        }}
      />

      <Box
        mt={2}
        mb={5}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Button
            variant="outlined"
            onClick={() => handleKeyPress(item)}
            style={{
              borderColor: '#fff',
              color: '#fff',
              backdropFilter: `blur(8px)`,
              borderRadius: 160,
              padding: `${setPadding(16)} ${setPadding(30)}`,
            }}
          >
            {item}
          </Button>
        ))}

        <Button
          variant="outlined"
          onClick={handleClear}
          style={{
            borderColor: '#fff',
            color: '#fff',
            backdropFilter: `blur(8px)`,
            borderRadius: 160,
            padding: `${setPadding(16)} ${setPadding(30)}`,
          }}
        >
          C
        </Button>

        <Button
          variant="outlined"
          onClick={() => handleKeyPress('0')}
          style={{
            borderColor: '#fff',
            color: '#fff',
            backdropFilter: `blur(8px)`,
            borderRadius: 160,
            padding: `${setPadding(16)} ${setPadding(30)}`,
          }}
        >
          0
        </Button>

        <Button
          variant="outlined"
          onClick={handleBackspace}
          style={{
            borderColor: '#fff',
            color: '#fff',
            backdropFilter: `blur(8px)`,
            borderRadius: 160,
          }}
        >
          <Iconify icon="eva:backspace-fill" width={22} sx={{ color: '#fff' }} />
        </Button>
      </Box>

      <Button
        title="Unlock"
        variant="contained"
        color="error"
        sx={{
          '&:hover': { backgroundColor: '#F15F34' },
          paddingY: 1,
          borderRadius: 10,
          width: '100%',
        }}
      >
        Unlock
      </Button>
    </Box>
  );
}

export default function PinScreen() {
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
        <title> Auth: Pin Screen</title>
      </Helmet>

      <Box
        component="main"
        sx={{
          py: 5,
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

        <CustomKeyboard
          onKeyPress={(value: any) => console.log(`Pressed ${value}`)}
          onBackspace={() => console.log('Backspace')}
          onClear={() => console.log('Clear')}
        />

        <Stack mt="auto" direction={{ xs: 'row', sm: 'row' }}>
          <Typography variant="h6" fontWeight={400} color="#fff" mt={3}>
            Clock in / Clock out
          </Typography>
        </Stack>
      </Box>
    </>
  );
}

// <TextField
// id="pin"
// label="Enter your PIN"
// value={pin}
// margin="normal"
// style={{ color: 'red', fontSize: '16px', border: 'none' }}
// InputProps={{
// style: { color: 'white', borderColor: 'white' },
// }}
// />
