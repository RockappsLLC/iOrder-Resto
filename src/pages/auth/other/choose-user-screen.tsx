import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useGetUsers } from 'src/api/users';

export default function ChooseUserScreen() {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  const usersData = useGetUsers();
  const userItem = usersData?.users as any;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersWithIsActive = userItem.map((item: any) => ({
          ...item,
          isActive: false,
        }));
        setUsers(usersWithIsActive);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, [userItem]);

  const changeActive = (id: number) => {
    setUsers((prevUsers: any) =>
      prevUsers.map((activeItem: any) => ({
        ...activeItem,
        isActive: activeItem._id === id,
      }))
    );
  };

  const activeUsers = users.filter((activeUser: any) => activeUser.isActive === true) as any;
  const onlyUser = activeUsers[0]?._id;

  const handleLoginClick = () => {
    const pinScreenPath = '/auth/other/pin-screen';
    const params = onlyUser;
    router.push(`${pinScreenPath}?id=${params}`);
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
          {users.map((user: any, num: number) => (
            <Stack direction={{ xs: 'column', sm: 'column' }} key={num}>
              <Box
                width={user.isActive ? 124 : 100}
                height={user.isActive ? 124 : 100}
                borderRadius={100}
                sx={{
                  backgroundColor: 'red',
                  opacity: user.isActive ? 1 : 0.5,
                }}
                onClick={() => changeActive(user._id)}
              />
              <Typography color="#fff" width="max-content" textAlign="center">
                {user.firstName} {user.lastName}
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
            onClick={() => handleLoginClick()}
          >
            Login
          </Button>
        </Stack>
      </Box>
    </>
  );
}
