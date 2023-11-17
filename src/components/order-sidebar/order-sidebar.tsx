import * as yup from 'yup';
import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const defaultValues = {
  name: '',
  code: '',
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
  name: yup
    .string()
    .min(3, (obj) => showErrors('Customer Name', obj.value.length, obj.min))
    .required(),
  code: yup
    .string()
    .min(3, (obj) => showErrors('Code', obj.value.length, obj.min))
    .required(),
});

const OrderSidebar = () => {
  const [currentTab2, setCurrentTab2] = useState('buy');

  const {
    // reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleChangeTab2 = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab2(newValue);
  }, []);

  const onSubmit = (data: any) => {
    // addData(data)
  };

  return (
    <>
      <div style={{ marginLeft: '20px', marginRight: '20px' }}>
        <Tabs
          value={currentTab2}
          onChange={handleChangeTab2}
          sx={{
            bgcolor: '#F8F9FD',
            borderRadius: '80px',
            my: 2,
          }}
        >
          <Tab
            value="buy"
            label="Buy"
            sx={{
              px: 6,
              mx: 'auto',
              // ml: '6px',
              my: '6px',
              borderRadius: '80px',
              bgcolor: currentTab2 === 'buy' ? 'white' : '',
            }}
          />
          <Tab
            value="reservation"
            label="Reservation"
            sx={{
              px: 6,
              mx: 'auto',
              my: '6px',
              borderRadius: '80px',
              bgcolor: currentTab2 === 'reservation' ? 'white' : '',
            }}
          />
        </Tabs>
        {currentTab2 === 'buy' ? (
          <Box sx={{ pb: 4 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>Customer Information</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 20 }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      label="Costumer Name"
                      value={value}
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(errors.name)}
                      aria-describedby="validation-schema-name"
                      {...(errors.name && { helperText: errors.name.message })}
                    />
                  )}
                />
                <Controller
                  name="code"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      label="T-08"
                      value={value}
                      onChange={onChange}
                      placeholder="T-08"
                      error={Boolean(errors.code)}
                      aria-describedby="validation-schema-code"
                      {...(errors.code && { helperText: errors.code.message })}
                    />
                  )}
                />
              </div>
              <Fab
                type="submit"
                size="small"
                color="default"
                variant="soft"
                sx={{ width: '100%', borderRadius: '58px', marginTop: '16px' }}
              >
                <Typography color="#9C9C9C" fontWeight={600} fontSize="16px">
                  Add Note
                </Typography>
              </Fab>
            </form>
          </Box>
        ) : (
          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'background.neutral',
            }}
          >
            Reservation
          </Box>
        )}
      </div>
      <Divider />
    </>
  );
};

export default OrderSidebar;
