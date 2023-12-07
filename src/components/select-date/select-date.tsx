import { useState } from 'react';
import { enUS } from 'date-fns/locale';
import { format, endOfMonth, startOfMonth, eachDayOfInterval } from 'date-fns';

import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Iconify from 'src/components/iconify';

const SelectDate = () => {
  const currentMonth = new Date();

  const [selectedMonth, setSelectedMonth]: any = useState(currentMonth);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [weekDay, setWeekDay] = useState(selectedDay.getDate());

  const nextMonth = new Date(currentMonth);
  nextMonth.setMonth(currentMonth.getMonth() + 1);
  const nextNextMonth = new Date(currentMonth);
  nextNextMonth.setMonth(currentMonth.getMonth() + 2);

  const months = [currentMonth, nextMonth, nextNextMonth];

  const handleMonthChange = (event: any) => {
    const newMonthIndex = event.target.value as number;
    const newMonth = months[newMonthIndex];
    setSelectedMonth(newMonth);
  };

  let minDate: Date;

  if (selectedMonth?.getMonth() === currentMonth.getMonth()) {
    minDate = selectedMonth;
  } else {
    minDate = startOfMonth(selectedMonth);
  }

  const maxDate = endOfMonth(selectedMonth);

  let daysOfWeek;
  if (selectedDay.toDateString() === new Date().toDateString()) {
    daysOfWeek = eachDayOfInterval({
      start: new Date(new Date().setDate(selectedDay.getDate())),
      end: new Date(new Date().setDate(selectedDay.getDate() + 6)),
    });
  } else if (
    selectedDay.getMonth() === new Date().getMonth() &&
    selectedDay.getDate() - new Date().getDate() == 1
  ) {
    daysOfWeek = eachDayOfInterval({
      start: new Date(new Date().setDate(selectedDay.getDate() - 1)),
      end: new Date(new Date().setDate(selectedDay.getDate() + 5)),
    });
  } else if (
    selectedDay.getMonth() === new Date().getMonth() &&
    selectedDay.getDate() - new Date().getDate() == 2
  ) {
    daysOfWeek = eachDayOfInterval({
      start: new Date(new Date().setDate(selectedDay.getDate() - 2)),
      end: new Date(new Date().setDate(selectedDay.getDate() + 4)),
    });
  } else {
    daysOfWeek = eachDayOfInterval({
      start: new Date(new Date().setDate(selectedDay.getDate() - 3)),
      end: new Date(new Date().setDate(selectedDay.getDate() + 3)),
    });
  }

  const weekdays = daysOfWeek.map((day) => format(day, 'EEE', { locale: enUS }));
  const dateNumbers = daysOfWeek.map((day) => format(day, 'd'));

  return (
    <Container sx={{ p: 3, pt: 2, borderRadius: 0, bgcolor: 'white' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '5px',
        }}
      >
        <Typography color="#828487" fontSize={14}>
          Select date
        </Typography>
        <FormControl variant="standard" sx={{ minWidth: 140 }}>
          <Select defaultValue={0} onChange={handleMonthChange}>
            {months.map((month, index) => (
              <MenuItem key={index} value={index}>
                {format(month, 'MMMM yyyy', { locale: enUS })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={selectedDay}
            onChange={(newValue: any) => {
              setSelectedDay(newValue);
              setWeekDay(newValue.getDate());
            }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </LocalizationProvider>
      </div>
      <Grid
        container
        sx={{
          pt: 1,
          pb: 3,
          width: '100%',
          justifyContent: 'center',
          borderRadius: '58px',
        }}
      >
        <Grid
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E4E4E4',
            p: 2,
            width: '68px',
            borderTopLeftRadius: '16px',
            borderBottomLeftRadius: '16px',
          }}
        >
          <Iconify width="24px" height="24px" icon="solar:calendar-linear" color="#F15F34" />
        </Grid>
        {weekdays.map((day, index) => (
          <Grid
            key={day}
            item
            onClick={() => {
              setWeekDay(+dateNumbers[index]);
              // setSelectedDay(new Date(dateNumbers[index]));
            }}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '68px',
              bgcolor: weekDay === +dateNumbers[index] ? '#FFF5EE' : '',
              color: weekDay === +dateNumbers[index] ? '#F15F34' : 'black',
              '&:hover': { bgcolor: '#FFF5EE', color: '#F15F34', cursor: 'pointer' },
              border: '1px solid #E4E4E4',
              p: 2,
              '&:last-of-type': {
                borderTopRightRadius: '16px',
                borderBottomRightRadius: '16px',
              },
            }}
          >
            <Typography sx={{ display: 'flex', justifyContent: 'center' }}>{day}</Typography>
            <Typography
              sx={{ display: 'flex', justifyContent: 'center' }}
              fontSize={16}
              fontWeight={600}
            >
              {dateNumbers[index]}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SelectDate;
