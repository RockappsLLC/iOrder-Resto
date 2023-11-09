import dayjs from 'dayjs';
import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker/TimePicker';
import { Box, Alert, Stack, Button, IconButton, Typography, InputAdornment } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function HomeFloor() {
  const [value, setValue] = useState(dayjs());
  const [errorMsg, setErrorMsg] = useState('');

  const router = useRouter();
  const password = useBoolean();
  const confirmPassword = useBoolean();

  const LoginSchema = Yup.object().shape({
    restaurant: Yup.string(),
    email: Yup.string(),
    password: Yup.string(),
    confirmPassword: Yup.string(),
  });

  const defaultValues = {
    restaurant: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    // formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('router', router);
    } catch (error) {
      console.error('error', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
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
          name="restaurant"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start">
                  <Iconify icon="mdi:home" />
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={password.onToggle} edge="start">
                    <Iconify
                      icon={password.value ? 'zondicons:lock-open' : 'zondicons:lock-closed'}
                    />
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton onClick={confirmPassword.onToggle} edge="start">
                    <Iconify
                      icon={confirmPassword.value ? 'zondicons:lock-open' : 'zondicons:lock-closed'}
                    />
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
              value={value}
              onChange={(newValue: any) => {
                setValue(newValue);
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
              value={value}
              onChange={(newValue: any) => {
                setValue(newValue);
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
              value={value}
              onChange={(newValue: any) => {
                setValue(newValue);
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
              value={value}
              onChange={(newValue: any) => {
                setValue(newValue);
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
            }}
          >
            <Iconify icon="ic:baseline-plus" />
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
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
        {renderForm}
      </Box>
    </FormProvider>
  );
}
