import React, { useState } from 'react';
import styled from 'styled-components';
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


const Container = styled.div`
  display: flex;
  align-items: flex-start;
`;

const FormControlContainer = styled.div`
  margin-top: 25px;
  width: 100%;
  margin-right: 50px;
`;

const SelectWrapper = styled(FormControl)``;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const StyledButton = styled(Button)`
  margin-bottom: 10px;
  margin-left: 5px;
  justify-content: space-between;
`;

const CalendarContainer = styled.div`
  width: 400px;
`;

const TableContainer = styled.div``;

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
  
  const handleChange = (event: SelectChangeEvent<string>) => {
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
    <Container>
      <div>
        <FormControlContainer>
          <InputLabel id="demo-simple-select-label">Vozidlo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={vehicle}
            label="Vehicle"
            onChange={handleChange}
          >
            <MenuItem value="Audi A3">Audi A3</MenuItem>
            <MenuItem value="Octavia 1">Octavia 1</MenuItem>
            <MenuItem value="Seat Leon">Seat Leon</MenuItem>
          </Select>
        </FormControlContainer>
        <ButtonContainer>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handlePrevDayClick}
          >
            <KeyboardArrowLeftIcon />
            Předchozí den
          </StyledButton>
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleNextDayClick}
          >
            Následující den
            <KeyboardArrowRightIcon />
          </StyledButton>
        </ButtonContainer>
      </div>
      <CalendarContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={calendarSelectedDate}
            onChange={handleCalendarDateClick}
          />
        </LocalizationProvider>
      </CalendarContainer>
      <TableContainer>
        <TableRoutes selectedDate={selectedDate}/>
      </TableContainer>
    </Container>
  );
}
