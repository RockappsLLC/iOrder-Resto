import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Link, Alert, Stack, IconButton, Typography, InputAdornment } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import Money from 'src/assets/icons/money';
import LockClose from 'src/assets/icons/lock-close';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function HomeFloor() {
  const [errorMsg, setErrorMsg] = useState('');
  const privateKey = useBoolean();

  const LoginSchema = Yup.object().shape({
    publicKey: Yup.string(),
    privateKey: Yup.string(),
  });

  const defaultValues = {
    publicKey: '',
    privateKey: '',
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
      console.log('data', data);
    } catch (error) {
      console.error('error', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
    <Stack spacing={2} sx={{ width: '100%' }} mt={3}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Typography variant="h4" fontWeight={600}>
        Payment details
      </Typography>

      <Typography color="#828487" variant="subtitle1" fontWeight={400}>
        Enter the Datatrans credentials
      </Typography>

      <Stack spacing={0.1} direction="column">
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', alignSelf: 'start', mb: -0.1 }}
        >
          Public Key
        </Typography>

        <RHFTextField
          name="publicKey"
          placeholder="API KEY"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start">
                  <Money />
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
          Private Key
        </Typography>

        <RHFTextField
          name="privateKey"
          placeholder="Private Key"
          type={privateKey.value ? 'text' : 'password'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={privateKey.onToggle} edge="start">
                  <LockClose />
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
        Finish the setup
      </LoadingButton>
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
