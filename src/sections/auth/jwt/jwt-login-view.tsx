import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { getMe } from 'src/api/users';
import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    // email: 'info@iorder.ch',
    email: 'ereza@iorder.ch',
    password: 'password',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);

      const response = await getMe();
      const profile = response.data;

      if (profile.data?.restaurantId) {
        router.push(returnTo || PATH_AFTER_LOGIN);
      } else {
        router.replace('/other/owner-form');
      }
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
        <Logo />
        <Typography fontWeight={600} variant="subtitle1">
          iOrder
        </Typography>
      </Stack>

      <Typography variant="h4" mt={5}>
        Login form
      </Typography>

      <Typography variant="subtitle1" fontWeight={400}>
        Lorem Ipsum has been the industrys standard dummy text ever since.
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Stack spacing={0.1} direction="column">
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', alignSelf: 'start', mb: -0.1 }}
        >
          Username
        </Typography>
        <RHFTextField
          name="email"
          placeholder="Enter username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start">
                  <Iconify icon="eva:person-outline" />
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
          Password
        </Typography>
        <RHFTextField
          name="password"
          placeholder="Enter password"
          type={password.value ? 'text' : 'password'}
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

      <Link variant="subtitle2" color="primary" sx={{ alignSelf: 'flex-start' }}>
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        style={{ borderRadius: 58 }}
      >
        Log in
      </LoadingButton>
      <Typography variant="body2">End user agreement</Typography>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
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
            maxWidth: 520,
          }}
        >
          {renderHead}

          {renderForm}
        </Card>
      </Box>
    </FormProvider>
  );
}
