import Container from '@mui/material/Container';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const SelectTime = ({ time, setTime }: any) => {
  return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticTimePicker
          value={time}
          onChange={(newValue: any) => setTime(newValue)}
          orientation="landscape"
          minutesStep={5}
        />
      </LocalizationProvider>
    </Container>
  );
};

export default SelectTime;
