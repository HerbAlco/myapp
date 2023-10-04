import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import moment from 'moment';
import dayjs from 'dayjs';


interface Route {
  routeId: number;
  userId: number;
  userName: string;
  routeStartDate: string;
  routeEndDate: string;
  distance: number;
  startLocation: string;
  endLocation: string;
  routeDuration: number;
  purpose: string;
  routeCost: number;
}

interface TableRoutesProps {
  selectedDate: dayjs.Dayjs | null;
}

const StyledTableCell = styled(TableCell)`
  border: 1px solid lightgray;
`;

const StyledTableContainer = styled(TableContainer)`
  border: 1px solid lightgray;
`;

export default function TableRoutes({ selectedDate }: TableRoutesProps) {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [apiUrl] = useState<string>('http://10.1.1.5:8080/api/v1/auth/route/routes');

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      const newApiUrl = `http://10.1.1.5:8080/api/v1/auth/route/routesByDate/${formattedDate}`;
      axios
        .get<Route[]>(newApiUrl)
        .then((response) => {
          setRoutes(response.data);
        })
        .catch((error) => {
          console.error('Chyba při načítání dat:', error);
        });
    } else {
      axios
        .get<Route[]>(apiUrl)
        .then((response) => {
          setRoutes(response.data);
        })
        .catch((error) => {
          console.error('Chyba při načítání dat:', error);
        });
    }
  }, [selectedDate, apiUrl]);
  

  function calculateRouteDuration(startDate: string, endDate: string): number {
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    const durationInMinutes = endMoment.diff(startMoment, 'minutes');
    return durationInMinutes;
  }

  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 1150 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">ID Trasy</StyledTableCell>
            <StyledTableCell align="right">Jméno&nbsp;(ID)</StyledTableCell>
            <StyledTableCell align="right">Datum</StyledTableCell>
            <StyledTableCell align="right">
              <div>Odjezd</div>
              <div>Příjezd</div>
            </StyledTableCell>
            <StyledTableCell align="right">Vzdálenost&nbsp;(km)</StyledTableCell>
            <StyledTableCell align="right">Trasa odkud</StyledTableCell>
            <StyledTableCell align="right">Trasa kam</StyledTableCell>
            <StyledTableCell align="right">Trvání&nbsp;(min)</StyledTableCell>
            <StyledTableCell align="right">Druh</StyledTableCell>
            <StyledTableCell align="right">Cena&nbsp;(Kč)</StyledTableCell>
          </TableRow>
        </TableHead>
        <tbody>
        {routes.map(route => (
          <TableRow key={route.routeId}>
            <StyledTableCell >{route.routeId}</StyledTableCell>
            <StyledTableCell >{route.userName} <strong>({route.userId})</strong></StyledTableCell>
            <StyledTableCell >Od: 
              {moment(route.routeStartDate).format('DD-MM-YYYY')}
              <br />
              Do: 
              {moment(route.routeEndDate).format('DD-MM-YYYY')}
            </StyledTableCell>
            <StyledTableCell >
              Od: 
              {moment(route.routeStartDate).format('HH:mm')}
              <br />
              Do: 
              {moment(route.routeEndDate).format('HH:mm')}
            </StyledTableCell>
            <StyledTableCell >{route.distance}</StyledTableCell>
            <StyledTableCell>{route.startLocation}</StyledTableCell>
            <StyledTableCell>{route.endLocation}</StyledTableCell>
            <StyledTableCell>{calculateRouteDuration(route.routeStartDate, route.routeEndDate)}</StyledTableCell>
            <StyledTableCell>{route.purpose}</StyledTableCell>
            <StyledTableCell>{route.routeCost}&nbsp;(Kč)</StyledTableCell>
          </TableRow>
        ))}
      </tbody>
      </Table>
    </StyledTableContainer>
  );
}