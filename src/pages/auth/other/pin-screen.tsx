import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import { Stack, Button, Typography } from '@mui/material';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useGetUsers } from 'src/api/users';
import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';

const setPadding = (value: any) => `${value}px`;

function CustomKeyboard({
  onKeyPress,
  onClear,
  onBackspace,
  onSubmit,
  onClick,
  isActiveUser,
}: any) {
  const [pin, setPin] = useState('');

  const handleKeyPress = useCallback(
    (value: any) => {
      setPin((prevPin) => prevPin + value);
      onKeyPress(value);
    },
    [onKeyPress]
  );

  const handleBackspace = useCallback(() => {
    const newPin = pin.slice(0, -1);
    setPin(newPin);
    onBackspace();
  }, [pin, onBackspace]);

  const handleClear = () => {
    setPin('');
    onClear();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') {
        handleKeyPress(event.key);
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (event.key === 'Enter') {
        onSubmit(pin);
        onClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress, handleBackspace, onSubmit, onClick, pin]);

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
            disabled={!isActiveUser}
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
          disabled={!isActiveUser}
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
          disabled={!isActiveUser}
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
        onClick={() => {
          onSubmit(pin);
          onClick();
        }}
        disabled={!isActiveUser}
      >
        Unlock
      </Button>
    </Box>
  );
}

export default function PinScreen() {
  const { loginWithPin } = useAuthContext();
  const router = useRouter();

  const searchParams = useSearchParams();

  const paramId = searchParams.get('id');
  const returnTo = searchParams.get('returnTo');

  const [users, setUsers] = useState([]);
  const [pinFromKeyboard, setPinFromKeyboard] = useState('');

  const usersData = useGetUsers();
  const user = usersData?.users as any;

  const handleSubmit = (pin: string) => {
    setPinFromKeyboard(pin);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersWithIsActive = user.map((item: any) => ({
          ...item,
          isActive: item._id === paramId,
        }));
        setUsers(usersWithIsActive);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [user, paramId]);

  const changeActive = (id: any) => {
    setUsers((prevUsers2: any) =>
      prevUsers2.map((user2: any) => ({
        ...user2,
        isActive: user2._id === id,
      }))
    );
  };

  const activeUser = users.find((item: any) => item.isActive === true) as any;

  const [loginCompleted, setLoginCompleted] = useState(false);

  useEffect(() => {
    if (loginCompleted) {
      router.push(returnTo || PATH_AFTER_LOGIN);
    }
  }, [loginCompleted, router, returnTo]);

  const onSubmit = async () => {
    try {
      await loginWithPin?.(activeUser?.email, pinFromKeyboard);

      setLoginCompleted(true);
    } catch (error) {
      console.error('Pin screen error', error);
    }
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
          {users.map((item2: any, num: number) => (
            <Stack direction={{ xs: 'column', sm: 'column' }} key={num}>
              <Box
                width={item2.isActive ? 124 : 100}
                height={item2.isActive ? 124 : 100}
                borderRadius={100}
                sx={{
                  backgroundColor: 'red',
                  opacity: item2.isActive ? 1 : 0.5,
                }}
                onClick={() => changeActive(item2._id)}
              />
              <Typography color="#fff" width="max-content" textAlign="center">
                {item2.firstName} {item2.lastName}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <CustomKeyboard
          onKeyPress={(value: any) => console.log(`Pressed ${value}`)}
          onBackspace={() => console.log('Backspace')}
          onClear={() => console.log('Clear')}
          onSubmit={handleSubmit}
          onClick={() => onSubmit()}
          isActiveUser={activeUser}
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
