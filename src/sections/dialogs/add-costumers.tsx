import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { InputAdornment } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { CheveronIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';

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

// const tags = ['VIP', 'Birthday', 'Anniversary', 'Private Dining', 'First time'];

const GuestDetail = ({ open, hide, stepBack }: any) => {
  const [tagName, setTagName] = useState('VIP');

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

  const onSubmit = (data: any) => {
    try {
      console.log({ ...data, tag: tagName });
      hide();
      reset(defaultValues);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onClose={hide}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E4E4E4',
        }}
      >
        <Grid sx={{ display: 'flex' }}>
          <DialogTitle sx={{ pl: 5 }}>Add Costumers</DialogTitle>
        </Grid>
        <Button onClick={hide}>
          <Iconify icon="tabler:x" />
        </Button>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container gap={0.2}>
            <Grid item xs={12} sx={{ pt: 4 }}>
              <TextField
                fullWidth
                label="Name"
                placeholder="Enter name"
                InputProps={{
                  inputProps: {
                    pattern: '^[A-Za-züöäÜÖÄ]+$',
                    title: 'Only characters from A to Z are allowed',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ pt: 4 }}>
              <TextField
                fullWidth
                type="tel"
                label="Phone number"
                placeholder="Enter phone number"
                InputProps={{
                  inputProps: {
                    pattern: '^[0-9+]*$',
                    title: 'Only + and 0-9 numbers are allowed',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ pt: 4 }}>
              <TextField
                fullWidth
                label="Email"
                placeholder="Email"
                InputProps={{
                  inputProps: {
                    pattern: '^[A-Za-züöäÜÖÄ]+$',
                    title: 'Only characters from A to Z are allowed',
                  },
                }}
              />
            </Grid>

            <Box display="flex" width="100%" gap={2}>
              <Grid item xs={12} sx={{ pt: 4 }}>
                <TextField
                  fullWidth
                  label="Sex"
                  placeholder="Male"
                  InputProps={{
                    inputProps: {
                      pattern: '^[A-Za-züöäÜÖÄ., ]+$',
                      title: 'Only characters from A to Z are allowed',
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheveronIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ pt: 4 }}>
                <TextField
                  fullWidth
                  type="number"
                  label="Street"
                  placeholder="Enter street"
                  InputProps={{
                    inputProps: {
                      pattern: '^[0-9]+$',
                      title: 'Only numbers from 0 to 9 are allowed',
                    },
                  }}
                />
              </Grid>
            </Box>
            <Box display="flex" width="100%" gap={1.5}>
              <Grid item xs={2.5} sx={{ pt: 3 }}>
                <TextField
                  fullWidth
                  label="Date of birth"
                  placeholder="Day"
                  InputProps={{
                    style: {
                      borderRadius: 58,
                    },
                    inputProps: {
                      pattern: '^[A-Za-züöäÜÖÄ., ]+$',
                      title: 'Only characters from A to Z are allowed',
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheveronIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={2.5} sx={{ pt: 3 }}>
                <TextField
                  fullWidth
                  label=""
                  placeholder="Month"
                  InputProps={{
                    style: {
                      borderRadius: 58,
                    },
                    inputProps: {
                      pattern: '^[A-Za-züöäÜÖÄ., ]+$',
                      title: 'Only characters from A to Z are allowed',
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheveronIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={2.5} sx={{ pt: 3 }}>
                <TextField
                  fullWidth
                  label="Year"
                  placeholder="Year"
                  InputProps={{
                    style: {
                      borderRadius: 58,
                    },
                    inputProps: {
                      pattern: '^[A-Za-züöäÜÖÄ., ]+$',
                      title: 'Only characters from A to Z are allowed',
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <CheveronIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={5} sx={{ pt: 3 }}>
                <TextField
                  fullWidth
                  label="City"
                  placeholder="Enter City"
                  InputProps={{
                    style: {
                      borderRadius: 58,
                    },
                    inputProps: {
                      pattern: '^[A-Za-züöäÜÖÄ., ]+$',
                      title: 'Only characters from A to Z are allowed',
                    },
                  }}
                />
              </Grid>
            </Box>
            <Grid item xs={30} sx={{ pt: 3 }}>
              <TextField
                fullWidth
                label="Canton"
                placeholder="Select Canton"
                InputProps={{
                  style: {
                    borderRadius: 58,
                  },
                  inputProps: {
                    pattern: '^[A-Za-züöäÜÖÄ., ]+$',
                    title: 'Only characters from A to Z are allowed',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <CheveronIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            fullWidth
            onClick={() => {
              hide();
              reset(defaultValues);
            }}
            color="primary"
            variant="outlined"
            sx={{ borderRadius: '58px', p: '10px', textAlign: 'center' }}
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
            sx={{
              borderRadius: '58px',
              p: '10px',
              ':hover': { bgcolor: '#f2734e' },
              textAlign: 'center',
            }}
          >
            <Typography fontSize={16} fontWeight={600}>
              Save
            </Typography>
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default GuestDetail;
