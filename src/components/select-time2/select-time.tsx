import { useState } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const times = [
  { hour: '07:00', noon: 'AM' },
  { hour: '08:00', noon: 'PM' },
  { hour: '09:00', noon: 'AM' },
  { hour: '10:00', noon: 'AM' },
  { hour: '09:15', noon: 'PM' },
  { hour: '12:00', noon: 'AM' },
  { hour: '07:20', noon: 'PM' },
  { hour: '08:50', noon: 'AM' },
  { hour: '10:25', noon: 'AM' },
  { hour: '09:05', noon: 'PM' },
  { hour: '06:00', noon: 'PM' },
  { hour: '07:15', noon: 'AM' },
  { hour: '11:40', noon: 'AM' },
  { hour: '08:30', noon: 'AM' },
  { hour: '05:00', noon: 'PM' },
];

const SelectTime = () => {
  const [selectHour, setSelectHour] = useState('');

  return (
    <Container>
      <Typography color="#828487" fontSize={14} sx={{ mb: 2 }}>
        Time slot available
      </Typography>
      <Grid container columns={5} sx={{ mb: 1 }}>
        {times.map((time: any, index: number) => (
          <Grid
            sm={1}
            item
            key={index}
            onClick={() => setSelectHour(time)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: selectHour === time ? '#FFF5EE' : '',
              color: selectHour === time ? '#F15F34' : 'black',
              '&:hover': { bgcolor: '#FFF5EE', color: '#F15F34', cursor: 'pointer' },
              border: '1px solid #E4E4E4',
              p: 2,
              '&:nth-of-type(1)': {
                borderTopLeftRadius: '16px',
              },
              '&:nth-of-type(5)': {
                borderTopRightRadius: '16px',
              },
              '&:nth-of-type(11)': {
                borderBottomLeftRadius: '16px',
              },
              '&:nth-of-type(15)': {
                borderBottomRightRadius: '16px',
              },
            }}
          >
            <Typography fontSize={16} fontWeight={600}>
              {time.hour}
            </Typography>
            <Typography
              fontSize={12}
              fontWeight={500}
              color={selectHour === time ? '#F15F34' : '#9C9C9C'}
            >
              {time.noon}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SelectTime;
