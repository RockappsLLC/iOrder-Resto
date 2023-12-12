import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import React, { lazy, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker/TimePicker';
import {
  Box,
  Card,
  Stack,
  Alert,
  Button,
  Divider,
  Container,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { getMe } from 'src/api/users';
import { createRestaurant } from 'src/api/restaurants';
import { Plus, Home, Staff, RiceBowl, ArrowLeft, LockClose, ArrowRight } from 'src/assets/icons';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// import { postUpload } from 'src/api/files';

// const HomeFloorPlanContent = lazy(() => import('src/pages/auth/other/owner-login/Home'));
const FloorPlanContent = lazy(() => import('src/pages/auth/other/owner-login/floor-plan'));
const StaffContent = lazy(() => import('src/pages/auth/other/owner-login/Staff'));
// const PaymentContent = lazy(() => import('src/pages/auth/other/owner-login/Payment'));
const MenuContent = lazy(() => import('src/pages/auth/other/owner-login/Menu'));

const contentData = [
  {
    name: 'Home',
    active: true,
    icon: <Home />,
    contentComponent: {} as React.FC,
  },
  {
    name: 'Floor Plan',
    active: false,
    icon: <Plus />,
    contentComponent: FloorPlanContent,
  },
  {
    name: 'Staff',
    active: false,
    icon: <Staff />,
    contentComponent: StaffContent,
  },
  {
    name: 'Menu',
    active: false,
    icon: <RiceBowl />,
    contentComponent: MenuContent,
  },
  // {
  //   name: 'Payment',
  //   active: false,
  //   icon: <Money />,
  //   contentComponent: PaymentContent,
  // },
];

export default function OwnerForm() {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const handleLinkClick = (content: any, index: any) => {
    contentData.forEach((data, i) => {
      data.active = i === index;
    });
    setCurrentContentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = currentContentIndex + 1;
    if (nextIndex < contentData.length) {
      const nextContent = contentData[nextIndex];
      handleLinkClick(nextContent.name, nextIndex);
    }
  };

  const handleBack = () => {
    const previousIndex = currentContentIndex - 1;
    if (previousIndex >= 0) {
      const previousContent = contentData[previousIndex];
      handleLinkClick(previousContent.name, previousIndex);
    }
  };

  const [fromWeek, setFromWeek] = useState(dayjs());
  const [toWeek, setToWeek] = useState(dayjs());
  const [fromWeekend, setFromWeekend] = useState(dayjs());
  const [toWeekend, setToWeenkend] = useState(dayjs());

  const themeStretch = true;
  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();
  const confirmPassword = useBoolean();

  const LoginSchema = Yup.object().shape({
    restaurantName: Yup.string(),
    email: Yup.string(),
    password: Yup.string(),
    confirmPassword: Yup.string(),
    restaurantLogo: Yup.string(),
  });

  const defaultValues = {
    restaurantName: '',
    email: '',
    password: '',
    confirmPassword: '',
    restaurantLogo: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (dataSubmit) => {
    const { data } = await getMe();
    const profile = data.data;

    const theStartDate = fromWeek.toDate();
    const theEndDate = toWeek.toDate();

    try {
      await createRestaurant({
        name: dataSubmit.restaurantName || '',
        taxId: 'T9964tK',
        categoryId: '653668edf59627bc3d02b573',
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        contactNumber: profile.contactNumber,
        password: dataSubmit.password,
        icon: 'asd',
        startDate: theStartDate,
        endDate: theEndDate,
      });

      handleNext();
    } catch (error) {
      console.log('error', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        flex: 1,
        maxWidth: '443px',
      }}
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Stack spacing={2} sx={{ width: '100%' }} mt={3}>
          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

          <Stack spacing={0.1} direction="column">
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', alignSelf: 'start', mb: -0.1 }}
            >
              Restaurant Name
            </Typography>

            <RHFTextField
              name="restaurantName"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton edge="start">
                      <Home />
                    </IconButton>
                  </InputAdornment>
                ),
                style: { borderRadius: '58px' },
              }}
            />
          </Stack>

          <Stack direction={{ xs: 'row', sm: 'row' }} gap={1}>
            <Stack spacing={0.1} direction="column">
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', alignSelf: 'start', mb: -0.1 }}
              >
                Password
              </Typography>

              <RHFTextField
                name="password"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={password.onToggle} edge="start">
                        <LockClose />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { borderRadius: '58px' },
                }}
              />
            </Stack>

            <Stack spacing={0.1} direction="column">
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', alignSelf: 'start', mb: -0.1 }}
              >
                Repeat Password
              </Typography>

              <RHFTextField
                name="confirmPassword"
                type="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton onClick={confirmPassword.onToggle} edge="start">
                        <LockClose />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: { borderRadius: '58px' },
                }}
              />
            </Stack>
          </Stack>

          <Typography textAlign="left" variant="caption">
            Working Hours
          </Typography>

          <Stack>
            <Typography variant="caption" textAlign="left">
              Week days
            </Typography>

            <Stack direction={{ xs: 'row', sm: 'row' }} gap={1} alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="From"
                  value={fromWeek}
                  onChange={(newValue: any) => {
                    setFromWeek(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                    },
                  }}
                />

                <TimePicker
                  label="To"
                  value={toWeek}
                  onChange={(newValue: any) => {
                    setToWeek(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                    },
                  }}
                />
              </LocalizationProvider>

              <Button
                title="Unlock"
                variant="contained"
                color="error"
                sx={{
                  '&:hover': { backgroundColor: '#F15F34' },
                  borderRadius: 30,
                  minWidth: '40px',
                  height: '40px',
                  backgroundColor: '#FF7527',
                }}
              >
                <Iconify icon="ic:baseline-plus" />
              </Button>
            </Stack>
          </Stack>

          <Stack>
            <Typography textAlign="left" variant="caption">
              Weekend
            </Typography>

            <Stack direction={{ xs: 'row', sm: 'row' }} gap={1} alignItems="center">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="From"
                  value={fromWeekend}
                  onChange={(newValue: any) => {
                    setFromWeekend(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                    },
                  }}
                />

                <TimePicker
                  label="To"
                  value={toWeekend}
                  onChange={(newValue: any) => {
                    setToWeenkend(newValue);
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: 'normal',
                    },
                  }}
                />
              </LocalizationProvider>

              <Button
                title="Unlock"
                variant="contained"
                sx={{
                  '&:hover': { backgroundColor: '#F15F34' },
                  borderRadius: 30,
                  minWidth: '40px',
                  height: '40px',
                  backgroundColor: '#FF7527',
                }}
              >
                <Plus />
              </Button>
            </Stack>
          </Stack>

          {/* <Stack spacing={0.1} direction="column">
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', alignSelf: 'start', mb: -0.1 }}
            >
              Restaurant Logo
            </Typography>

            <RHFTextField
              name="restaurantLogo"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <UploadBox />
                  </InputAdornment>
                ),
                style: { borderRadius: '58px' },
              }}
            />
          </Stack> */}
        </Stack>
      </Container>
    </Box>
  );

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
          backgroundImage: 'url(/assets/background/overlay_5.png)',
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
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Logo />
            <Typography fontWeight={600} variant="subtitle1">
              iOrder
            </Typography>
          </Stack>
        </Stack>

        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 0.5, sm: 2 }}
        >
          {contentData.map((data, index) => (
            <Button
              key={data.name}
              onClick={() => handleLinkClick(data.name, index)}
              disabled={data.active}
            >
              {React.cloneElement(data.icon, {
                color: data.active ? '#F15F34' : '#828487',
              })}

              <Typography ml={1} color={data.active ? 'primary' : '#828487'}>
                {data.name}
              </Typography>
            </Button>
          ))}
        </Stack>

        <Divider
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: '#C2C2C2',
          }}
        />

        {contentData.map(
          (data, index) =>
            data.active &&
            data.contentComponent && (
              <Box key={index} sx={{ minHeight: 400 }}>
                {index === 0 ? (
                  <FormProvider methods={methods} onSubmit={onSubmit}>
                    {renderForm}
                  </FormProvider>
                ) : (
                  <data.contentComponent />
                )}
              </Box>
            )
        )}

        <Box display="flex" justifyContent="space-between" mt={5}>
          {currentContentIndex >= 0 && currentContentIndex < 4 && (
            <Button
              variant="contained"
              onClick={handleBack}
              disabled={currentContentIndex === 0}
              color="error"
              sx={{ borderRadius: 5 }}
            >
              <ArrowLeft />
              <Typography mr={1} color="#fff">
                Back
              </Typography>
            </Button>
          )}

          {currentContentIndex < 4 && (
            <Button
              variant="contained"
              onClick={async () => {
                if (currentContentIndex === 0) {
                  await onSubmit();
                } else {
                  handleNext();
                }
              }}
              disabled={currentContentIndex === contentData.length - 1}
              color="error"
              sx={{ borderRadius: 5 }}
            >
              <Typography ml={1}>Next</Typography>
              <ArrowRight />
            </Button>
          )}
        </Box>

        <Typography variant="subtitle1" color="#828487" fontWeight={400} mt={6}>
          End user agreement
        </Typography>
      </Card>
    </Box>
  );
}
