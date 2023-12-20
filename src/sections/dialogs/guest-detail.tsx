import * as yup from 'yup';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { createCustomer } from 'src/api/customers';
import { createReservation } from 'src/api/reservations';

import Iconify from 'src/components/iconify';
import { useOrderContext } from 'src/components/order-sidebar/context';

import { useReservationContext } from '../reservation';

const defaultValues = {
  fullName: '',
  email: '',
  phoneNumber: '',
  tag: 'VIP',
  visitNote: '',
  initials: '',
  pagerNumber: 0,
};

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} is required`;
  }
  if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  }
  return '';
};

const schema = yup.object().shape({
  fullName: yup
    .string()
    .min(3, (obj) => showErrors('Full Name', obj.value.length, obj.min))
    .required(),
  email: yup.string().email().required('Email is required'),
  phoneNumber: yup
    .string()
    .min(6, (obj) => showErrors('Phone Number', obj.value.length, obj.min))
    .required(),
  tag: yup.string().required('Tag is required'),
  visitNote: yup
    .string()
    .min(5, (obj) => showErrors('Visit Note', obj.value.length, obj.min))
    .required(),
  initials: yup
    .string()
    .min(2, (obj) => showErrors('Initials', obj.value.length, obj.min))
    .required(),
  pagerNumber: yup.number().required(),
});

const tags = ['VIP', 'Birthday', 'Anniversary', 'Private Dining', 'First time'];

const GuestDetail = ({ open }: any) => {
  const [tagName, setTagName] = useState('VIP');
  const { reservation, setReservation, setReservationTab } = useReservationContext();
  const { activeTable, setActiveTable } = useOrderContext();

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      console.log({ ...data, tag: tagName });
      const restaurantId = await localStorage.getItem('restaurantId');
      const {
        data: { _id },
      } = await createCustomer({
        name: data.fullName,
        email: data.email,
        contactNumber: data.phoneNumber,
        // Todo update (make Mr Ms option)
        sex: 'male',
        restaurantId: String(restaurantId),
        // Todo remove (not required)
        //   street: '',
        //   city: '',
        //   canton: '',
        //   dateOfBirth: null
      });

      createReservation({
        ...reservation,
        name: data.fullName,
        initials: data.initials,
        pagerNumber: data.pagerNumber,
        tag: data.tag,
        visitNote: data.visitNote,
        userId: _id,
        restaurantId: String(restaurantId),
        tableId: activeTable._id,
      });

      handleClose();
      reset(defaultValues);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setReservation(null);
    setReservationTab(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E4E4E4',
        }}
      >
        <Grid sx={{ display: 'flex' }}>
          <Button
            onClick={() => {
              setReservationTab('new');
              reset(defaultValues);
            }}
          >
            <Iconify icon="formkit:arrowleft" width="24px" height="24px" />
          </Button>
          <DialogTitle sx={{ pl: 0 }}>Guest Detail</DialogTitle>
        </Grid>
        <Button onClick={handleClose}>
          <Iconify icon="tabler:x" />
        </Button>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container gap={3}>
            <Grid item xs={12} sx={{ pt: 4 }}>
              <Controller
                control={control}
                name="fullName"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Full name"
                    placeholder="Enter name"
                    {...field}
                    error={Boolean(errors.fullName)}
                    {...(errors.fullName && { helperText: errors.fullName.message })}
                  />
                )}
              />
            </Grid>
            <Box display="flex" width="100%" gap={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="email"
                      label="Email"
                      placeholder="Enter email address"
                      {...field}
                      error={Boolean(errors.email)}
                      {...(errors.email && { helperText: errors.email.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="tel"
                      label="Phone number"
                      placeholder="Enter phone number"
                      {...field}
                      error={Boolean(errors.phoneNumber)}
                      {...(errors.phoneNumber && { helperText: errors.phoneNumber.message })}
                    />
                  )}
                />
              </Grid>
            </Box>
            <Grid item>
              <DialogContentText pb={1}>Tag</DialogContentText>
              <Grid item display="flex" alignItems="center" gap={1}>
                {tags.map((tag: string) => (
                  <Button
                    key={tag}
                    onClick={() => setTagName(tag)}
                    sx={{
                      borderRadius: '40px',
                      fontWeight: 400,
                      bgcolor: tag === tagName ? '#FFF5EE' : 'inherit',
                    }}
                    variant="outlined"
                    color={tag === tagName ? 'primary' : 'inherit'}
                  >
                    {tag}
                  </Button>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Controller
                control={control}
                name="visitNote"
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Visit note"
                    placeholder="Write reservation note here..."
                    multiline
                    rows={5}
                    {...field}
                    InputProps={{
                      inputProps: {
                        pattern: '^[A-Za-züöäÜÖÄ., ]+$',
                        title: 'Only characters from A to Z are allowed',
                      },
                    }}
                    error={Boolean(errors.visitNote)}
                    {...(errors.visitNote && { helperText: errors.visitNote.message })}
                  />
                )}
              />
            </Grid>
            <Box display="flex" width="100%" gap={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="initials"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Taken by (initials)"
                      placeholder="Taken by"
                      {...field}
                      InputProps={{
                        inputProps: {
                          pattern: '^[A-Za-züöäÜÖÄ., ]+$',
                          title: 'Only characters from A to Z are allowed',
                        },
                      }}
                      error={Boolean(errors.initials)}
                      {...(errors.initials && { helperText: errors.initials.message })}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  control={control}
                  name="pagerNumber"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="number"
                      label="Pager number"
                      placeholder="Enter pager number"
                      {...field}
                      InputProps={{
                        inputProps: {
                          pattern: '^[0-9]+$',
                          title: 'Only numbers from 0 to 9 are allowed',
                        },
                      }}
                      error={Boolean(errors.pagerNumber)}
                      {...(errors.pagerNumber && { helperText: errors.pagerNumber.message })}
                    />
                  )}
                />
              </Grid>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            onClick={() => {
              handleClose();
              reset(defaultValues);
            }}
            color="primary"
            variant="outlined"
            sx={{ borderRadius: '58px', p: '10px' }}
          >
            <Typography fontSize={16} fontWeight={600}>
              Cancel
            </Typography>
          </Button>
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            sx={{ borderRadius: '58px', p: '10px', ':hover': { bgcolor: '#f2734e' } }}
          >
            <Typography fontSize={16} fontWeight={600}>
              Add to reservation
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GuestDetail;
