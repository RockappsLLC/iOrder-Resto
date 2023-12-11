import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';

import Container from '@mui/material/Container';
import { useEffect } from 'react';

const SelectTime = ({time, setTime}: any) => {


  // useEffect(() => {console.log(time)}, [time]);

  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticTimePicker
          value={time}
          onChange={(newValue: any) => setTime(newValue)}
          orientation="landscape"
        />
      </LocalizationProvider>
    </Container>
  );
};

export default SelectTime;
