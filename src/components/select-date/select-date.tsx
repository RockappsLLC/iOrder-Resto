import { useState } from 'react';
import { enUS } from 'date-fns/locale';
import { format, endOfMonth, startOfMonth, eachDayOfInterval } from 'date-fns';

import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Iconify from 'src/components/iconify';

const SelectDate = () => {
  const [openDatepicker, setOpenDatepicker] = useState(false);

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
    setSelectedDay(newMonth);
    setWeekDay(selectedDay.getDate());
  };

  let minDate: Date;

  if (selectedMonth?.getMonth() === currentMonth.getMonth()) {
    minDate = selectedMonth;
  } else {
    minDate = startOfMonth(selectedMonth);
  }

  const maxDate = endOfMonth(selectedMonth);

  let daysOfWeek;

  const currentDate = new Date();
  const actualMonth = currentDate.getMonth();
  const selectedMonthYear = selectedDay.getFullYear();
  const monthOfSelectedDay = selectedDay.getMonth();
  const monthOfSelectedMonth = selectedMonth.getMonth();
  const dateOfSelectedDay = selectedDay.getDate();
  const dateOfToday = currentDate.getDate();
  const totalDaysInSelectedMonth = new Date(selectedMonthYear, monthOfSelectedDay + 1, 0).getDate();

  const tempSelectedDay = new Date(selectedDay);

  if (
    selectedDay.toDateString() === currentDate.toDateString() ||
    (monthOfSelectedDay === monthOfSelectedMonth && dateOfSelectedDay === 1)
  ) {
    daysOfWeek = eachDayOfInterval({
      start: new Date(tempSelectedDay.setDate(dateOfSelectedDay)),
      end: new Date(tempSelectedDay.setDate(dateOfSelectedDay + 6)),
    });
  } else if (
    (monthOfSelectedDay === actualMonth && dateOfSelectedDay - dateOfToday === 1) ||
    (monthOfSelectedDay === monthOfSelectedMonth && dateOfSelectedDay === 2)
  ) {
    daysOfWeek = eachDayOfInterval({
      start: new Date(tempSelectedDay.setDate(dateOfSelectedDay - 1)),
      end: new Date(tempSelectedDay.setDate(dateOfSelectedDay + 5)),
    });
  } else if (
    (monthOfSelectedDay === actualMonth && dateOfSelectedDay - dateOfToday === 2) ||
    (monthOfSelectedDay === monthOfSelectedMonth && dateOfSelectedDay === 3)
  ) {
    daysOfWeek = eachDayOfInterval({
      start: new Date(tempSelectedDay.setDate(dateOfSelectedDay - 2)),
      end: new Date(tempSelectedDay.setDate(dateOfSelectedDay + 4)),
    });
  } else if (
    (dateOfSelectedDay === 31 && totalDaysInSelectedMonth === 31) ||
    (dateOfSelectedDay === 30 && totalDaysInSelectedMonth === 30) ||
    (dateOfSelectedDay === 29 && totalDaysInSelectedMonth === 29) ||
    (dateOfSelectedDay === 28 && totalDaysInSelectedMonth === 28)
  ) {
    daysOfWeek = eachDayOfInterval({
      start: new Date(tempSelectedDay.setDate(dateOfSelectedDay - 6)),
      end: new Date(tempSelectedDay.setDate(dateOfSelectedDay)),
    });
  } else if (
    (dateOfSelectedDay === 30 && totalDaysInSelectedMonth === 31) ||
    (dateOfSelectedDay === 29 && totalDaysInSelectedMonth === 30) ||
    (dateOfSelectedDay === 28 && totalDaysInSelectedMonth === 29) ||
    (dateOfSelectedDay === 27 && totalDaysInSelectedMonth === 28)
  ) {
    daysOfWeek = eachDayOfInterval({
      start: new Date(tempSelectedDay.setDate(dateOfSelectedDay - 5)),
      end: new Date(tempSelectedDay.setDate(dateOfSelectedDay + 1)),
    });
  } else if (
    (dateOfSelectedDay === 29 && totalDaysInSelectedMonth === 31) ||
    (dateOfSelectedDay === 28 && totalDaysInSelectedMonth === 30) ||
    (dateOfSelectedDay === 27 && totalDaysInSelectedMonth === 29) ||
    (dateOfSelectedDay === 26 && totalDaysInSelectedMonth === 28)
  ) {
    daysOfWeek = eachDayOfInterval({
      start: new Date(tempSelectedDay.setDate(dateOfSelectedDay - 4)),
      end: new Date(tempSelectedDay.setDate(dateOfSelectedDay + 2)),
    });
  } else {
    daysOfWeek = eachDayOfInterval({
      start: new Date(tempSelectedDay.setDate(dateOfSelectedDay - 3)),
      end: new Date(tempSelectedDay.setDate(dateOfSelectedDay + 3)),
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MobileDatePicker
            value={selectedDay}
            onChange={(newValue: any) => {
              setSelectedDay(newValue);
              setWeekDay(newValue.getDate());
            }}
            minDate={minDate}
            maxDate={maxDate}
            sx={{ display: 'none' }}
            open={openDatepicker}
            onClose={() => setOpenDatepicker(false)}
          />

          <Grid
            item
            onClick={() => setOpenDatepicker(true)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E4E4E4',
              p: 2,
              width: '68px',
              borderTopLeftRadius: '16px',
              borderBottomLeftRadius: '16px',
              ':hover': { cursor: 'pointer', bgcolor: '#FFF5EE' },
            }}
          >
            <Iconify width="24px" height="24px" icon="solar:calendar-linear" color="#F15F34" />
          </Grid>
        </LocalizationProvider>
        {weekdays.map((day, index) => (
          <Grid
            key={day}
            item
            onClick={() => {
              setWeekDay(+dateNumbers[index]);
              setSelectedDay((prevDate) => {
                const newDate = new Date(prevDate);
                newDate.setDate(+dateNumbers[index]);
                return newDate;
              });
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
