import { Box, Card } from '@mui/material';

export default function Profile() {
  return (
    <Box
      component="main"
      sx={{
        py: 5,
        display: 'flex',
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
      <Card
        sx={{
          py: 6,
          px: 10,
          width: '90%',
          minHeight: 600,
        }}
      >
        {/* <Typography>asd</Typography> */}
        <RenderForm />
      </Card>
    </Box>
  );
}

const RenderForm = () => {
  // const { usersMe, usersMeLoading } = useGetMe();

  // const [usersData, setUsersData] = useState<UserResponseSchema[]>([]);

  // useEffect(() => {
  //   if (!usersMeLoading && usersMe.length) {
  //     setUsersData(usersMe);
  //   }
  // }, [usersMeLoading, usersMe]);

  // console.log('usersData', usersData);

  return (
    // <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
    <Box>{/* <RHFTextField name= />  */}</Box>
    // </FormProvider>
  );
};
