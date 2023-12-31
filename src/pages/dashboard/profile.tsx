import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Stack,
  Alert,
  Divider,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetMe, updateUserById } from 'src/api/users';
import { UserResponseSchema } from 'src/api/api-schemas';
import { postChangePin, postChangePassword } from 'src/api/auth';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

type FormValuesProps = UserResponseSchema;

export default function Profile() {
  const { usersMe } = useGetMe();

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
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Logo />
            <Typography fontWeight={600} variant="subtitle1">
              iOrder
            </Typography>
          </Stack>
        </Stack>

        <Divider
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: '#C2C2C2',
            mb: 3,
          }}
        />

        <EditPersonalForm usersMe={usersMe} />
        <EditPasswordForm usersMe={usersMe} />
        <EditPinForm usersMe={usersMe} />
      </Card>
    </Box>
  );
}

const EditPersonalForm = ({ usersMe }: any) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const EditProfileSchema: Yup.ObjectSchema<FormValuesProps> = Yup.object().shape({
    _id: Yup.string(),
    firstName: Yup.string().required('Name is a required field'),
    lastName: Yup.string().required('Email is a required field'),
    email: Yup.string(),
    contactNumber: Yup.string().required('Contact nummber is a required field'),
    restaurantId: Yup.string(),
    password: Yup.string(),
    role: Yup.mixed(),
    status: Yup.boolean(),
    profileImage: Yup.string(),
  });

  const defaultValues: FormValuesProps = {
    _id: '',
    firstName: usersMe?.firstName || '',
    email: '',
    lastName: usersMe?.lastName || '',
    contactNumber: usersMe?.contactNumber || '',
    restaurantId: '',
    password: '',
    role: 1,
    status: true,
    profileImage: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(EditProfileSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset({
      firstName: usersMe?.firstName || '',
      lastName: usersMe?.lastName || '',
      contactNumber: usersMe?.contactNumber || '',
    });
  }, [reset, usersMe]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateUserById(usersMe?._id as string, data);
      setSuccessMsg('Data is updated successfully!');
    } catch (error) {
      console.error('error', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Typography my={2} fontWeight={500} textAlign="start">
        Edit personal info
      </Typography>

      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {!!successMsg && <Alert severity="success">{successMsg}</Alert>}

      <Stack direction="column">
        <Stack direction="row" gap={1}>
          <RHFTextField name="firstName" label="First Name" />
          <RHFTextField name="lastName" label="Last Name" />
          <RHFTextField name="contactNumber" label="Contact Number" />
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            fullWidth
            color="primary"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ fontWeight: 400, width: 300, mt: 2 }}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

const EditPasswordForm = ({ usersMe }: any) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const password = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(6, 'Password must be at least 6 characters')
      .test(
        'no-match',
        'New password must be different than old password',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await postChangePassword({
        email: usersMe?.email || '',
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      reset();
      setSuccessMsg('Password is changed!');
    } catch (error) {
      console.error('error', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Typography my={2} fontWeight={500} textAlign="start">
        Edit password
      </Typography>

      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {!!successMsg && <Alert severity="success">{successMsg}</Alert>}

      <Stack direction="column">
        <Stack direction="row" gap={1}>
          <RHFTextField
            name="oldPassword"
            type={password.value ? 'text' : 'password'}
            label="Old Password"
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="newPassword"
            label="New Password"
            type={password.value ? 'text' : 'password'}
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={
              <Stack component="span" direction="row" alignItems="center" sx={{ mb: 1 }}>
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be
                minimum 6+
              </Stack>
            }
          />

          <RHFTextField
            name="confirmNewPassword"
            type={password.value ? 'text' : 'password'}
            label="Re-Enter Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={password.onToggle} edge="end">
                    <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            fullWidth
            color="primary"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ fontWeight: 400, width: 300, mt: 1 }}
          >
            Update password
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

const EditPinForm = ({ usersMe }: any) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const pin = useBoolean();

  const EditPinSchema = Yup.object().shape({
    oldPin: Yup.string().required('Old Pin is required'),
    newPin: Yup.string()
      .required('New Pin is required')
      .min(4, 'Pin must be at least 4 characters')
      .test(
        'no-match',
        'New pin must be different than old pin',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmNewPin: Yup.string().oneOf([Yup.ref('newPin')], 'Pin must match'),
  });

  const defaultValues = {
    oldPin: '',
    newPin: '',
    confirmNewPin: '',
  };

  const methods = useForm({
    resolver: yupResolver(EditPinSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await postChangePin({
        email: usersMe?.email || '',
        oldPin: data.oldPin,
        newPin: data.newPin,
      });
      reset();
      setSuccessMsg('Pin is changed!');
    } catch (error) {
      console.error('error', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Typography my={2} fontWeight={500} textAlign="start">
        Edit Pin
      </Typography>

      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {!!successMsg && <Alert severity="success">{successMsg}</Alert>}

      <Stack direction="column">
        <Stack direction="row" gap={1}>
          <RHFTextField
            name="oldPin"
            type={pin.value ? 'text' : 'password'}
            label="Old Pin"
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={pin.onToggle} edge="end">
                    <Iconify icon={pin.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RHFTextField
            name="newPin"
            label="New Pin"
            type={pin.value ? 'text' : 'password'}
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={pin.onToggle} edge="end">
                    <Iconify icon={pin.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText={
              <Stack component="span" direction="row" alignItems="center" sx={{ mb: 1 }}>
                <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Pin must be minimum 4+
              </Stack>
            }
          />

          <RHFTextField
            name="confirmNewPin"
            type={pin.value ? 'text' : 'password'}
            label="Re-Enter Pin"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={pin.onToggle} edge="end">
                    <Iconify icon={pin.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack direction="row" justifyContent="flex-end">
          <LoadingButton
            fullWidth
            color="primary"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ fontWeight: 400, width: 300, mt: 1 }}
          >
            Update pin
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};
