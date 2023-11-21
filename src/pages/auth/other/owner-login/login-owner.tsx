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

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { User } from 'src/assets/icons';
import LockClose from 'src/assets/icons/lock-close';
import { PATH_AFTER_LOGIN_OWNER } from 'src/config-global';

import Logo from 'src/components/logo';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function LoginOwner() {
  const router = useRouter();
  const password = useBoolean();

  const [errorMsg, setErrorMsg] = useState('');

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'john@doe.com',
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
      console.log('router', router);
      router.push(PATH_AFTER_LOGIN_OWNER);
    } catch (error) {
      console.error('error', error);
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

      <Typography variant="h4" mt={5} textAlign="center">
        Login form
      </Typography>

      <Stack direction="row" spacing={0.5}>
        Lorem Ipsum has been the industrys standard dummy text ever since.
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} sx={{ width: '100%' }}>
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
          placeholder="Username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start">
                  <User />
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
          placeholder="Password"
          type={password.value ? 'text' : 'password'}
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

      <Link variant="subtitle2" color="primary" fontWeight={600} sx={{ alignSelf: 'flex-start' }}>
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
        Next
      </LoadingButton>

      <Typography variant="body2" mt={3} color="#828487">
        End user agreement
      </Typography>
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
            width: '90%',
          }}
        >
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
            {renderHead}

            {renderForm}
          </Box>
        </Card>
      </Box>
    </FormProvider>
  );
}
