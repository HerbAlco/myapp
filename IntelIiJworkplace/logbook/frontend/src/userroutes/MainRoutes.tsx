import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import TableRoutes from './TableRoutes';
import { useNavigate } from 'react-router-dom';

interface MainRoutesProps {
  isUserLoggedIn: boolean;
}

export default function MainRoutes({ isUserLoggedIn }: MainRoutesProps) {
  const [vehicle, setVehicle] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [calendarSelectedDate, setCalendarSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const navigate = useNavigate();

  if (!isUserLoggedIn) {
    navigate('/login');
    return null;
  }

  const styles: Record<string, React.CSSProperties> = {
    container: {
      display: 'flex',
      alignItems: 'flex-start',
    },
    formControl: {
      marginTop: '25px',
      width: '100%',
      marginRight: '50px',
    },
    select: {
      width: '100%',
    },
    buttonContainer: {
      flexDirection: 'column',
      marginTop: '10px',
    },
    button: {
      marginBottom: '10px',
      marginLeft: "5px",
      justifyContent: 'space-between',
    },
    icon: {
      marginRight: '5px',
    },
    calendarContainer: {
      width: '400px',
    },
    tableContainer: {
    },
  };

  const handleChange = (event: SelectChangeEvent) => {
    setVehicle(event.target.value as string);
  };

  const handlePrevDayClick = () => {
    const newSelectedDate = selectedDate.subtract(1, 'day');
    setSelectedDate(newSelectedDate);
    setCalendarSelectedDate(newSelectedDate);
  };

  const handleNextDayClick = () => {
    const newSelectedDate = selectedDate.add(1, 'day');
    setSelectedDate(newSelectedDate);
    setCalendarSelectedDate(newSelectedDate);
  };

  const handleCalendarDateClick = (date: dayjs.Dayjs | null) => {
    if (date) {
      setCalendarSelectedDate(date);
      setSelectedDate(date);
    }
  };

  return (
    <Box sx={styles.container}>
      <div>
        <FormControl sx={styles.formControl}>
          <InputLabel id="demo-simple-select-label">Vozidlo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vehicle}
            label="Vehicle"
            onChange={handleChange}
            sx={styles.select}
          >
            <MenuItem value="Audi A3">Audi A3</MenuItem>
            <MenuItem value="Octavia 1">Octavia 1</MenuItem>
            <MenuItem value="Seat Leon">Seat Leon</MenuItem>
          </Select>
        </FormControl>
        <div style={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrevDayClick}
            style={styles.button}
          >
            <KeyboardArrowLeftIcon sx={styles.icon} />
            Předchozí den
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextDayClick}
            style={styles.button}
          >
            Následující den
            <KeyboardArrowRightIcon sx={styles.icon} />
          </Button>
        </div>
      </div>
      <div style={styles.calendarContainer}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={calendarSelectedDate}
            onChange={handleCalendarDateClick}
          />
        </LocalizationProvider>
      </div>
      <div style={styles.tableContainer}>
        <TableRoutes apiUrl="http://10.1.1.5:8080/api/v1/auth/route/routes" />
      </div>
    </Box>
  );
}
